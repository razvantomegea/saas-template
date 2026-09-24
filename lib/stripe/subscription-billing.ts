import type Stripe from "stripe";
import {
  getBillingIntervalFromPriceId,
  getPlanFromPriceId,
  type BillingInterval,
  type StripePlanKey,
} from "@/lib/config/stripe";
import { stripe } from "@/lib/stripe/client";

const ACTIVE_SUBSCRIPTION_STATUSES: Stripe.SubscriptionListParams["status"][] =
  ["active", "trialing"];

function priceIdFromSubscription(
  subscription: Stripe.Subscription,
): string | undefined {
  return subscription.items.data[0]?.price?.id;
}

export function isCatalogSubscription(
  subscription: Stripe.Subscription,
): boolean {
  const priceId = priceIdFromSubscription(subscription);
  return priceId ? getPlanFromPriceId(priceId) !== null : false;
}

export async function listActiveSubscriptions(
  stripeCustomerId: string,
): Promise<Stripe.Subscription[]> {
  const subscriptions: Stripe.Subscription[] = [];

  for (const status of ACTIVE_SUBSCRIPTION_STATUSES) {
    const page = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status,
      limit: 100,
    });
    subscriptions.push(...page.data);
  }

  return subscriptions;
}

function pickPrimaryCatalogSubscription(
  subscriptions: Stripe.Subscription[],
): Stripe.Subscription | null {
  const catalog = subscriptions.filter(isCatalogSubscription);
  return catalog[0] ?? null;
}

export async function getActiveCatalogSubscription(
  stripeCustomerId: string,
): Promise<Stripe.Subscription | null> {
  const subscriptions = await listActiveSubscriptions(stripeCustomerId);
  return pickPrimaryCatalogSubscription(subscriptions);
}

export type ResolvedStripePlanState = {
  plan: StripePlanKey | null;
  subscription: Stripe.Subscription | null;
};

/** Resolve catalog plan from active Stripe subscriptions. */
export function resolvePlanStateFromSubscriptions(
  subscriptions: Stripe.Subscription[],
): ResolvedStripePlanState {
  const primary = pickPrimaryCatalogSubscription(subscriptions);
  if (!primary) {
    return { plan: null, subscription: null };
  }

  const priceId = priceIdFromSubscription(primary);
  const plan = priceId ? getPlanFromPriceId(priceId) : null;
  if (!plan) {
    return { plan: null, subscription: null };
  }

  return { plan, subscription: primary };
}

export async function resolveActivePlanState(
  stripeCustomerId: string,
): Promise<ResolvedStripePlanState> {
  const subscriptions = await listActiveSubscriptions(stripeCustomerId);
  return resolvePlanStateFromSubscriptions(subscriptions);
}

export async function getActiveStripeSubscription(
  stripeCustomerId: string,
): Promise<Stripe.Subscription | null> {
  return getActiveCatalogSubscription(stripeCustomerId);
}

export async function getSubscriptionBillingInterval(
  stripeCustomerId: string,
): Promise<BillingInterval | null> {
  const subscription = await getActiveCatalogSubscription(stripeCustomerId);
  if (!subscription) {
    return null;
  }

  const priceId = priceIdFromSubscription(subscription);
  if (!priceId) {
    return null;
  }

  return getBillingIntervalFromPriceId(priceId);
}

type MigrateBillingIntervalParams = {
  stripeCustomerId: string;
  targetPriceId: string;
  targetBillingInterval: BillingInterval;
};

type MigrateBillingIntervalResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | "subscription_not_found"
        | "already_on_interval"
        | "item_not_found";
    };

export async function migrateSubscriptionBillingInterval(
  params: MigrateBillingIntervalParams,
): Promise<MigrateBillingIntervalResult> {
  const subscription = await getActiveCatalogSubscription(
    params.stripeCustomerId,
  );

  if (!subscription) {
    return { ok: false, error: "subscription_not_found" };
  }

  const currentPriceId = priceIdFromSubscription(subscription);
  const currentInterval = currentPriceId
    ? getBillingIntervalFromPriceId(currentPriceId)
    : null;

  if (currentInterval === params.targetBillingInterval) {
    return { ok: false, error: "already_on_interval" };
  }

  const itemId = subscription.items.data[0]?.id;
  if (!itemId) {
    return { ok: false, error: "item_not_found" };
  }

  await stripe.subscriptions.update(subscription.id, {
    items: [{ id: itemId, price: params.targetPriceId }],
    proration_behavior: "create_prorations",
  });

  return { ok: true };
}

export async function cancelOtherActiveSubscriptions(params: {
  stripeCustomerId: string;
  keepSubscriptionId: string;
}): Promise<void> {
  const subscriptions = await listActiveSubscriptions(params.stripeCustomerId);
  const catalogSubscriptions = subscriptions.filter(isCatalogSubscription);
  const keptSubscription = catalogSubscriptions.find(
    (subscription) => subscription.id === params.keepSubscriptionId,
  );

  if (!keptSubscription) {
    return;
  }

  for (const subscription of catalogSubscriptions) {
    if (subscription.id === params.keepSubscriptionId) {
      continue;
    }

    await stripe.subscriptions.cancel(subscription.id);
  }
}
