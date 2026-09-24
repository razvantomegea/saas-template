import { NextRequest, NextResponse } from "next/server";
import {
  getPlanByKey,
  type BillingInterval,
  type StripePlanKey,
} from "@/lib/config/stripe";
import { getServerSession } from "@/lib/better-auth/session";
import { getProfileByUserId, type Profile } from "@/lib/subscription/profiles";
import { resolveRequestOrigin } from "@/lib/resolve-origin";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";
import { stripe } from "@/lib/stripe/client";
import { migrateSubscriptionBillingInterval } from "@/lib/stripe/subscription-billing";
import {
  isSubscriptionActive,
  isSubscriptionStatus,
  PLAN,
} from "@/lib/subscription/plan-limits";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

function missingOriginResponse() {
  return NextResponse.json({ error: "Missing origin" }, { status: 400 });
}

function hasActiveSubscription(profile: Profile): boolean {
  return (
    isSubscriptionStatus(profile.subscriptionStatus) &&
    isSubscriptionActive(profile.subscriptionStatus)
  );
}

async function ensureStripeCustomer(params: {
  userId: string;
  email: string;
  existingCustomerId: string | null;
}): Promise<string> {
  if (params.existingCustomerId) return params.existingCustomerId;

  const customer = await stripe.customers.create({
    email: params.email,
    metadata: { userId: params.userId },
  });

  await db
    .update(profiles)
    .set({ stripeCustomerId: customer.id, updatedAt: new Date() })
    .where(eq(profiles.userId, params.userId));

  return customer.id;
}

export async function POST(req: NextRequest) {
  const blocked = requireTrustedOrigin(req);
  if (blocked) return blocked;

  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as {
      plan?: StripePlanKey;
      billingInterval?: BillingInterval;
    };
    const plan = getPlanByKey(body.plan ?? "starter");
    const billingInterval = body.billingInterval ?? "monthly";
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }

    const priceId =
      billingInterval === "annual"
        ? plan.pricing.annual.priceId
        : plan.pricing.monthly.priceId;
    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price not configured" },
        { status: 400 },
      );
    }

    const profile = await getProfileByUserId(session.user.id);
    const origin = resolveRequestOrigin({
      originHeader: req.headers.get("origin"),
      nextUrlOrigin: req.nextUrl.origin,
      fallbackEnvUrl: process.env.BETTER_AUTH_URL,
    });
    if (!origin) return missingOriginResponse();

    // Same plan, different interval, already subscribed — migrate in place.
    if (
      profile?.stripeCustomerId &&
      profile.plan === plan.key &&
      hasActiveSubscription(profile)
    ) {
      const migration = await migrateSubscriptionBillingInterval({
        stripeCustomerId: profile.stripeCustomerId,
        targetPriceId: priceId,
        targetBillingInterval: billingInterval,
      });

      if (migration.ok) {
        return NextResponse.json({
          url: `${origin}/dashboard/billing?interval_updated=true`,
        });
      }
      if (migration.error === "already_on_interval") {
        return NextResponse.json(
          { error: "You already have this plan" },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { error: "Failed to update billing interval" },
        { status: 500 },
      );
    }

    const isFirstPaidSubscription = !profile || profile.plan === PLAN.NONE;
    const trialDays =
      billingInterval === "annual"
        ? plan.pricing.annual.trialDays
        : plan.pricing.monthly.trialDays;
    const shouldApplyTrial = isFirstPaidSubscription && trialDays > 0;

    const customerId = await ensureStripeCustomer({
      userId: session.user.id,
      email: session.user.email,
      existingCustomerId: profile?.stripeCustomerId ?? null,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      billing_address_collection: "required",
      allow_promotion_codes: true,
      customer_update: { address: "auto", name: "auto" },
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/billing?canceled=true`,
      client_reference_id: session.user.id,
      customer: customerId,
      metadata: {
        userId: session.user.id,
        planName: plan.key,
        billingInterval,
      },
      ...(shouldApplyTrial
        ? {
            subscription_data: {
              trial_period_days: trialDays,
              metadata: { originalPlan: plan.key },
            },
          }
        : {}),
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Checkout URL missing" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[create-checkout-session]", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
