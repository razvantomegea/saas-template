import {
  getNoteLimit,
  isPlanKey,
  isSubscriptionActive,
  isSubscriptionStatus,
  PLAN,
  type PlanKey,
  type SubscriptionStatus,
} from "@/lib/subscription/plan-limits";

export type EntitlementsProfile = {
  plan: string;
  subscriptionStatus: string;
};

export type Entitlements = {
  plan: PlanKey;
  subscriptionStatus: SubscriptionStatus;
  subscriptionActive: boolean;
  noteLimit: number;
  trialEligible: boolean;
};

/** Single seam for layout/UI/API gates — extend here as the product grows. */
export function resolveEntitlements(
  profile: EntitlementsProfile,
): Entitlements {
  const plan: PlanKey = isPlanKey(profile.plan) ? profile.plan : PLAN.NONE;
  const subscriptionStatus: SubscriptionStatus = isSubscriptionStatus(
    profile.subscriptionStatus,
  )
    ? profile.subscriptionStatus
    : "none";

  const subscriptionActive = isSubscriptionActive(subscriptionStatus);

  return {
    plan,
    subscriptionStatus,
    subscriptionActive,
    noteLimit: getNoteLimit(plan),
    trialEligible: plan === PLAN.NONE || !subscriptionActive,
  };
}
