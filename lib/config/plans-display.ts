export type BillingInterval = "monthly" | "annual";

export type StripePlanKey = "starter" | "pro";

export type PlanDisplayConfig = {
  key: StripePlanKey;
  name: string;
  tagline: string;
  features: string[];
  pricing: {
    monthly: { priceDisplay: string; trialDays: number };
    annual: { priceDisplay: string; savings: string; trialDays: number };
  };
};

export const planDisplayConfigs: PlanDisplayConfig[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "For individuals getting started",
    features: ["Up to 25 notes", "Email support", "Core dashboard"],
    pricing: {
      monthly: { priceDisplay: "$9", trialDays: 14 },
      annual: { priceDisplay: "$90", savings: "Save ~$18", trialDays: 14 },
    },
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For growing teams",
    features: ["Unlimited notes", "Priority support", "Push notifications"],
    pricing: {
      monthly: { priceDisplay: "$29", trialDays: 14 },
      annual: { priceDisplay: "$290", savings: "Save ~$58", trialDays: 14 },
    },
  },
];
