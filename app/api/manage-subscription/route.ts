import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/better-auth/session";
import { getProfileByUserId } from "@/lib/subscription/profiles";
import { resolveRequestOrigin } from "@/lib/resolve-origin";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";
import { stripe } from "@/lib/stripe/client";

export async function POST(req: NextRequest) {
  const blocked = requireTrustedOrigin(req);
  if (blocked) return blocked;

  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getProfileByUserId(session.user.id);
    if (!profile?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 },
      );
    }

    const origin = resolveRequestOrigin({
      originHeader: req.headers.get("origin"),
      nextUrlOrigin: req.nextUrl.origin,
      fallbackEnvUrl: process.env.BETTER_AUTH_URL,
      siteUrlEnv: process.env.NEXT_PUBLIC_SITE_URL,
    });
    if (!origin) {
      return NextResponse.json({ error: "Missing origin" }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripeCustomerId,
      return_url: `${origin}/dashboard/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("[manage-subscription]", error);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 },
    );
  }
}
