import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "@/lib/better-auth/session";
import { recordFunnelEvent } from "@/lib/analytics/funnel-events";
import { clientIpFromRequest } from "@/lib/help/client-ip";
import { consumeRateLimit } from "@/lib/help/rate-limit";
import { createSupportTicketSchema } from "@/lib/help/support-ticket-schema";
import { createSupportTicket } from "@/lib/help/support-tickets";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export async function POST(req: NextRequest) {
  const blocked = requireTrustedOrigin(req);
  if (blocked) return blocked;

  const ip = clientIpFromRequest(req);
  const rate = consumeRateLimit({
    key: `support:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createSupportTicketSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const session = await getServerSession();
  const userId = session?.user?.id ?? null;

  const { id } = await createSupportTicket({
    input: parsed.data,
    userId,
  });

  await recordFunnelEvent({
    event: "support_ticket_created",
    userId,
    metadata: { category: parsed.data.category, ticketId: id },
  });

  const { notifyOperatorOfTicket } = await import("@/lib/help/support-tickets");
  void notifyOperatorOfTicket({
    id,
    category: parsed.data.category,
    subject: parsed.data.subject,
    email: parsed.data.email,
  });

  return NextResponse.json({ id }, { status: 201 });
}
