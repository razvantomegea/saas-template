export const PLAN = {
  NONE: "none",
  STARTER: "starter",
  PRO: "pro",
} as const;

export type PlanKey = (typeof PLAN)[keyof typeof PLAN];

export const SUBSCRIPTION_STATUS = {
  NONE: "none",
  TRIALING: "trialing",
  ACTIVE: "active",
  PAST_DUE: "past_due",
  CANCELED: "canceled",
} as const;

export type SubscriptionStatus =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

/**
 * Demo limit for the Notes feature — swap for real plan gating.
 * A large finite sentinel (not Infinity) so the limit survives JSON
 * serialization in API responses (`JSON.stringify(Infinity) === "null"`).
 */
export const UNLIMITED_NOTE_LIMIT = 1_000_000;

export const PLAN_NOTE_LIMITS: Record<PlanKey, number> = {
  none: 3,
  starter: 25,
  pro: UNLIMITED_NOTE_LIMIT,
};

export function getNoteLimit(plan: PlanKey): number {
  return PLAN_NOTE_LIMITS[plan] ?? 0;
}

export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return (
    status === SUBSCRIPTION_STATUS.ACTIVE ||
    status === SUBSCRIPTION_STATUS.TRIALING
  );
}

export function isPlanKey(value: string): value is PlanKey {
  return (Object.values(PLAN) as string[]).includes(value);
}

export function isSubscriptionStatus(
  value: string,
): value is SubscriptionStatus {
  return (Object.values(SUBSCRIPTION_STATUS) as string[]).includes(value);
}
