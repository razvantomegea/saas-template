import { BillingPageClient } from "@/components/dashboard/BillingPageClient";
import type { BillingInterval } from "@/lib/config/plans-display";
import { isE2eMockDashboard } from "@/lib/e2e/mock-dashboard";
import { requireServerSession } from "@/lib/better-auth/session";
import { getSubscriptionBillingInterval } from "@/lib/stripe/subscription-billing";
import { syncProfileFromStripeCustomer } from "@/lib/stripe/confirm-checkout";
import { getProfileByUserId } from "@/lib/subscription/profiles";
import {
  getE2eMockPlan,
  getE2eMockSubscriptionStatus,
} from "@/lib/e2e/mock-plan";

export default async function BillingPage() {
  if (isE2eMockDashboard()) {
    const plan = await getE2eMockPlan();
    return (
      <BillingPageClient
        plan={plan}
        subscriptionStatus={getE2eMockSubscriptionStatus(plan)}
        hasStripeCustomer={plan !== "none"}
      />
    );
  }

  const session = await requireServerSession();
  let profile = await getProfileByUserId(session.user.id);

  if (profile?.stripeCustomerId) {
    try {
      await syncProfileFromStripeCustomer({
        userId: session.user.id,
        stripeCustomerId: profile.stripeCustomerId,
      });
      profile = (await getProfileByUserId(session.user.id)) ?? profile;
    } catch (error) {
      console.error("[billing] syncProfileFromStripeCustomer failed", {
        userId: session.user.id,
        error,
      });
    }
  }

  let currentBillingInterval: BillingInterval | undefined;
  if (profile?.stripeCustomerId) {
    currentBillingInterval =
      (await getSubscriptionBillingInterval(profile.stripeCustomerId)) ??
      undefined;
  }

  return (
    <BillingPageClient
      plan={profile?.plan ?? "none"}
      subscriptionStatus={profile?.subscriptionStatus ?? "none"}
      currentBillingInterval={currentBillingInterval}
      hasStripeCustomer={Boolean(profile?.stripeCustomerId)}
    />
  );
}
