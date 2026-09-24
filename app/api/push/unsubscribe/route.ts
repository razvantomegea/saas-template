import { z } from "zod";
import { requireServerSession } from "@/lib/better-auth/session";
import { deletePushSubscription } from "@/lib/notifications/push-subscriptions";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  endpoint: z.string().url(),
});

export async function POST(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  const session = await requireServerSession().catch(() => null);
  if (!session?.user) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid endpoint" },
      { status: 400 },
    );
  }

  try {
    await deletePushSubscription({
      endpoint: parsed.data.endpoint,
      userId: session.user.id,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to remove push subscription" },
      { status: 503 },
    );
  }
}
