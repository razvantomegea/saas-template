import { getVapidPublicKey } from "@/lib/notifications/vapid";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  const publicKey = getVapidPublicKey();
  if (!publicKey) {
    return Response.json(
      { error: "VAPID public key is not configured" },
      { status: 503 },
    );
  }
  return Response.json({ publicKey });
}
