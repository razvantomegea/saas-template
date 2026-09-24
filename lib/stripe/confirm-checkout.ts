import { getPlanFromPriceId } from "@/lib/config/stripe";
import { stripe } from "@/lib/stripe/client";
import {
  cancelOtherActiveSubscriptions,
  resolveActivePlanState,
} from "@/lib/stripe/subscription-billing";
import { updateUserSubscription } from "@/lib/stripe/subscription-helpers";

export async function syncProfileFromStripeCustomer(params: {
  userId: string;
  stripeCustomerId: string;
}): Promise<void> {
  const state = await resolveActivePlanState(params.stripeCustomerId);

  if (state.plan && state.subscription) {
    await updateUserSubscription({
      userId: params.userId,
      plan: state.plan,
      subscriptionStatus: state.subscription.status,
      stripeCustomerId: params.stripeCustomerId,
    });
    return;
  }

  await updateUserSubscription({
    userId: params.userId,
    plan: "none",
    subscriptionStatus: "canceled",
    stripeCustomerId: params.stripeCustomerId,
  });
}

export async function syncProfileFromCheckoutSession(params: {
  checkoutSessionId: string;
  userId: string;
}): Promise<boolean> {
  const session = await stripe.checkout.sessions.retrieve(
    params.checkoutSessionId,
  );

  if (session.client_reference_id !== params.userId) {
    return false;
  }

  if (!session.subscription || typeof session.subscription !== "string") {
    return false;
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription,
  );
  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId ? getPlanFromPriceId(priceId) : null;

  if (!plan) {
    return false;
  }

  const stripeCustomerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  await updateUserSubscription({
    userId: params.userId,
    plan,
    subscriptionStatus: subscription.status,
    stripeCustomerId,
  });

  if (stripeCustomerId) {
    await cancelOtherActiveSubscriptions({
      stripeCustomerId,
      keepSubscriptionId: subscription.id,
    });
  }

  return true;
}
