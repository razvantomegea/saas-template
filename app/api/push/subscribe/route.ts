import { z } from "zod";
import { requireServerSession } from "@/lib/better-auth/session";
import { isAllowedPushEndpoint } from "@/lib/notifications/push-endpoint";
import { savePushSubscription } from "@/lib/notifications/push-subscriptions";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const subscriptionSchema = z.object({
  endpoint: z
    .string()
    .url()
    .refine(isAllowedPushEndpoint, "Unsupported push endpoint"),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    p256dh: z.string().min(20),
    auth: z.string().min(8),
  }),
});

export async function POST(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  const session = await requireServerSession().catch(() => null);
  if (!session?.user) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid push subscription" },
      { status: 400 },
    );
  }

  try {
    await savePushSubscription({ ...parsed.data, userId: session.user.id });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to store push subscription" },
      { status: 503 },
    );
  }
}
