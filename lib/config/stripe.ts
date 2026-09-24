import {
  planDisplayConfigs,
  type BillingInterval,
  type PlanDisplayConfig,
  type StripePlanKey,
} from "@/lib/config/plans-display";

export type { BillingInterval, StripePlanKey };

export type PlanConfig = PlanDisplayConfig & {
  pricing: {
    monthly: PlanDisplayConfig["pricing"]["monthly"] & {
      priceId: string | undefined;
    };
    annual: PlanDisplayConfig["pricing"]["annual"] & {
      priceId: string | undefined;
    };
  };
};

const priceIdEnvKeys: Record<
  StripePlanKey,
  { monthly: string; annual: string }
> = {
  starter: {
    monthly: "STRIPE_STARTER_MONTHLY_PRICE_ID",
    annual: "STRIPE_STARTER_ANNUAL_PRICE_ID",
  },
  pro: {
    monthly: "STRIPE_PRO_MONTHLY_PRICE_ID",
    annual: "STRIPE_PRO_ANNUAL_PRICE_ID",
  },
};

function buildPlans(): PlanConfig[] {
  return planDisplayConfigs.map((plan) => ({
    ...plan,
    pricing: {
      monthly: {
        ...plan.pricing.monthly,
        priceId: process.env[priceIdEnvKeys[plan.key].monthly],
      },
      annual: {
        ...plan.pricing.annual,
        priceId: process.env[priceIdEnvKeys[plan.key].annual],
      },
    },
  }));
}

function validateStripePriceIds(plansToValidate: PlanConfig[]): void {
  if (
    typeof window !== "undefined" ||
    process.env.VITEST === "true" ||
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.E2E_MOCK_DASHBOARD === "true"
  ) {
    return;
  }

  for (const plan of plansToValidate) {
    if (!plan.pricing.monthly.priceId) {
      throw new Error(`Missing Stripe monthly price ID for plan "${plan.key}"`);
    }
    if (!plan.pricing.annual.priceId) {
      throw new Error(`Missing Stripe annual price ID for plan "${plan.key}"`);
    }
  }
}

const plans: PlanConfig[] = buildPlans();

validateStripePriceIds(plans);

export function getPlanByKey(planKey: StripePlanKey): PlanConfig | undefined {
  return plans.find((plan) => plan.key === planKey);
}

export function getAllPlans(): PlanConfig[] {
  return plans;
}

export function getPlanFromPriceId(priceId: string): StripePlanKey | null {
  const plan = plans.find(
    (entry) =>
      entry.pricing.monthly.priceId === priceId ||
      entry.pricing.annual.priceId === priceId,
  );

  return plan?.key ?? null;
}

export function getBillingIntervalFromPriceId(
  priceId: string,
): BillingInterval | null {
  for (const plan of plans) {
    if (plan.pricing.monthly.priceId === priceId) {
      return "monthly";
    }
    if (plan.pricing.annual.priceId === priceId) {
      return "annual";
    }
  }

  return null;
}

export function mapStripeStatus(
  status: string,
): "none" | "trialing" | "active" | "past_due" | "canceled" {
  if (status === "trialing") return "trialing";
  if (status === "active") return "active";
  if (status === "past_due") return "past_due";
  if (status === "canceled" || status === "unpaid" || status === "paused") {
    return "canceled";
  }

  return "none";
}
