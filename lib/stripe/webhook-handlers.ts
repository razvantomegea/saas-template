import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPlanFromPriceId } from "@/lib/config/stripe";
import { stripe } from "@/lib/stripe/client";
import {
  getProfileByStripeCustomerId,
  updateUserSubscription,
} from "@/lib/stripe/subscription-helpers";
import {
  cancelOtherActiveSubscriptions,
  getActiveStripeSubscription,
  isCatalogSubscription,
} from "@/lib/stripe/subscription-billing";
import { isPlanKey, PLAN, type PlanKey } from "@/lib/subscription/plan-limits";

type WebhookHandlerResult = NextResponse | null;

function stripeCustomerIdFrom(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): string | undefined {
  if (typeof customer === "string") {
    return customer;
  }

  return customer?.id;
}

function resolveSubscriptionPlan(params: {
  eventType: string;
  subscription: Stripe.Subscription;
  currentPlan: PlanKey;
}): PlanKey {
  if (params.eventType === "customer.subscription.deleted") {
    return PLAN.NONE;
  }

  if (
    params.eventType === "customer.subscription.updated" &&
    (params.subscription.status === "active" ||
      params.subscription.status === "trialing")
  ) {
    const priceId = params.subscription.items.data[0]?.price.id;
    const resolvedPlan = priceId ? getPlanFromPriceId(priceId) : null;
    if (resolvedPlan) {
      return resolvedPlan;
    }
  }

  return params.currentPlan;
}

function isSubscriptionLifecycleEvent(type: string): boolean {
  return (
    type === "customer.subscription.updated" ||
    type === "customer.subscription.deleted" ||
    type === "customer.subscription.paused"
  );
}

export function constructStripeWebhookEvent(params: {
  body: string;
  signature: string | null;
  webhookSecret: string | undefined;
}): { ok: true; event: Stripe.Event } | { ok: false; response: NextResponse } {
  if (!params.signature || !params.webhookSecret) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Webhook not configured" },
        { status: 400 },
      ),
    };
  }

  try {
    const event = stripe.webhooks.constructEvent(
      params.body,
      params.signature,
      params.webhookSecret,
    );
    return { ok: true, event };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid signature";
    return {
      ok: false,
      response: NextResponse.json({ error: message }, { status: 400 }),
    };
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<WebhookHandlerResult> {
  const userId = session.client_reference_id;

  if (!session.subscription || !userId) {
    return null;
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );
  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId ? getPlanFromPriceId(priceId) : null;

  if (!plan) {
    console.info("[stripe-webhook] Ignoring checkout with unknown price", {
      priceId,
      sessionId: session.id,
    });
    return null;
  }

  const stripeCustomerId = stripeCustomerIdFrom(session.customer ?? null);

  try {
    await updateUserSubscription({
      userId,
      plan,
      subscriptionStatus: subscription.status,
      stripeCustomerId,
    });
  } catch (error) {
    console.error("[stripe-webhook] Failed to update profile from checkout", {
      userId,
      sessionId: session.id,
      subscriptionStatus: subscription.status,
      plan,
      stripeCustomerId,
      error,
    });
    throw error;
  }

  if (stripeCustomerId) {
    await cancelOtherActiveSubscriptions({
      stripeCustomerId,
      keepSubscriptionId: subscription.id,
    });
  }

  return null;
}

async function handleSubscriptionLifecycle(
  event: Stripe.Event,
): Promise<WebhookHandlerResult> {
  const subscription = event.data.object as Stripe.Subscription;
  const stripeCustomerId = stripeCustomerIdFrom(subscription.customer);

  if (!stripeCustomerId) {
    return NextResponse.json({ error: "Profile not found" }, { status: 400 });
  }

  if (!isCatalogSubscription(subscription)) {
    console.info(
      "[stripe-webhook] Ignoring non-catalog subscription lifecycle event",
      { eventType: event.type, stripeCustomerId },
    );
    return null;
  }

  const profile = await getProfileByStripeCustomerId(stripeCustomerId);
  if (!profile) {
    console.warn(
      "[stripe-webhook] Subscription event with no matching profile",
      { eventType: event.type, stripeCustomerId },
    );
    return null;
  }

  if (!isPlanKey(profile.plan)) {
    console.error("[stripe-webhook] Invalid plan on profile", {
      plan: profile.plan,
      stripeCustomerId,
    });
    return NextResponse.json(
      { error: "Invalid plan on profile" },
      { status: 500 },
    );
  }

  if (event.type === "customer.subscription.deleted") {
    const remaining = await getActiveStripeSubscription(stripeCustomerId);
    if (remaining) {
      const priceId = remaining.items.data[0]?.price.id;
      const resolvedPlan = priceId ? getPlanFromPriceId(priceId) : null;

      if (resolvedPlan) {
        await updateUserSubscription({
          userId: profile.userId,
          plan: resolvedPlan,
          subscriptionStatus: remaining.status,
        });
        await cancelOtherActiveSubscriptions({
          stripeCustomerId,
          keepSubscriptionId: remaining.id,
        });
        return null;
      }
    }
  }

  const plan = resolveSubscriptionPlan({
    eventType: event.type,
    subscription,
    currentPlan: profile.plan,
  });

  await updateUserSubscription({
    userId: profile.userId,
    plan,
    subscriptionStatus: subscription.status,
  });

  return null;
}

export async function processStripeWebhookEvent(
  event: Stripe.Event,
): Promise<WebhookHandlerResult> {
  if (event.type === "checkout.session.completed") {
    return handleCheckoutSessionCompleted(
      event.data.object as Stripe.Checkout.Session,
    );
  }

  if (isSubscriptionLifecycleEvent(event.type)) {
    return handleSubscriptionLifecycle(event);
  }

  return null;
}
