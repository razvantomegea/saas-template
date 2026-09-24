import { getProfileByUserId } from "@/lib/subscription/profiles";
import { stripe } from "@/lib/stripe/client";
import { listActiveSubscriptions } from "@/lib/stripe/subscription-billing";

/**
 * Cancel every active/trialing Stripe subscription for the user.
 * Fail-closed: throws if any cancel fails so account deletion does not proceed
 * while a paying subscription remains.
 */
export async function cancelSubscriptionsForUser(
  userId: string,
): Promise<void> {
  const profile = await getProfileByUserId(userId);
  const stripeCustomerId = profile?.stripeCustomerId?.trim();
  if (!stripeCustomerId) {
    return;
  }

  const subscriptions = await listActiveSubscriptions(stripeCustomerId);

  for (const subscription of subscriptions) {
    await stripe.subscriptions.cancel(subscription.id);
  }
}
