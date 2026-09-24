export type BillingInterval = "monthly" | "annual";

export type StripePlanKey = "starter" | "pro";

export type PlanDisplayConfig = {
  key: StripePlanKey;
  nameKey: string;
  taglineKey: string;
  featureKeys: string[];
  pricing: {
    monthly: { priceDisplay: string; trialDays: number };
    annual: {
      priceDisplay: string;
      savingsKey: string;
      trialDays: number;
    };
  };
};

export const planDisplayConfigs: PlanDisplayConfig[] = [
  {
    key: "starter",
    nameKey: "pricing.starterName",
    taglineKey: "pricing.starterTagline",
    featureKeys: [
      "pricing.starterFeatureNotes",
      "pricing.starterFeatureSupport",
      "pricing.starterFeatureDashboard",
    ],
    pricing: {
      monthly: { priceDisplay: "$9", trialDays: 14 },
      annual: {
        priceDisplay: "$90",
        savingsKey: "pricing.starterSavings",
        trialDays: 14,
      },
    },
  },
  {
    key: "pro",
    nameKey: "pricing.proName",
    taglineKey: "pricing.proTagline",
    featureKeys: [
      "pricing.proFeatureNotes",
      "pricing.proFeatureSupport",
      "pricing.proFeaturePush",
    ],
    pricing: {
      monthly: { priceDisplay: "$29", trialDays: 14 },
      annual: {
        priceDisplay: "$290",
        savingsKey: "pricing.proSavings",
        trialDays: 14,
      },
    },
  },
];
