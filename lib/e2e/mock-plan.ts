import { cookies } from "next/headers";
import {
  PLAN,
  type PlanKey,
  SUBSCRIPTION_STATUS,
} from "@/lib/subscription/plan-limits";

export const E2E_PLAN_COOKIE = "e2e_plan";

const E2E_MOCK_PLANS = new Set<PlanKey>([PLAN.NONE, PLAN.STARTER, PLAN.PRO]);

export async function getE2eMockPlan(): Promise<PlanKey> {
  const cookieStore = await cookies();
  const value = cookieStore.get(E2E_PLAN_COOKIE)?.value;

  if (value && E2E_MOCK_PLANS.has(value as PlanKey)) {
    return value as PlanKey;
  }

  return PLAN.PRO;
}

export function getE2eMockSubscriptionStatus(plan: PlanKey): string {
  return plan === PLAN.NONE
    ? SUBSCRIPTION_STATUS.NONE
    : SUBSCRIPTION_STATUS.ACTIVE;
}
