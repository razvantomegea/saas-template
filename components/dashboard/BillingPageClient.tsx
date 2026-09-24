"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  planDisplayConfigs,
  type BillingInterval,
} from "@/lib/config/plans-display";

type BillingPageClientProps = {
  plan: string;
  subscriptionStatus: string;
  currentBillingInterval?: BillingInterval;
  hasStripeCustomer: boolean;
};

export function BillingPageClient({
  plan,
  subscriptionStatus,
  currentBillingInterval,
  hasStripeCustomer,
}: BillingPageClientProps) {
  const [interval, setInterval] = useState<BillingInterval>(
    currentBillingInterval ?? "monthly",
  );
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  async function startCheckout(planKey: string) {
    setLoadingPlan(planKey);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: planKey, billingInterval: interval }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.url) {
        toast.error(payload.error ?? "Failed to start checkout");
        return;
      }
      window.location.href = payload.url;
    } finally {
      setLoadingPlan(null);
    }
  }

  async function openPortal() {
    setPortalLoading(true);
    try {
      const response = await fetch("/api/manage-subscription", {
        method: "POST",
      });
      const payload = await response.json();
      if (!response.ok || !payload.url) {
        toast.error(payload.error ?? "Failed to open billing portal");
        return;
      }
      window.location.href = payload.url;
    } finally {
      setPortalLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">Billing</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Current plan:{" "}
          <span className="font-medium text-zinc-200">{plan}</span> (
          {subscriptionStatus})
        </p>
      </header>

      {hasStripeCustomer ? (
        <button
          type="button"
          onClick={() => void openPortal()}
          disabled={portalLoading}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900 disabled:opacity-50"
        >
          {portalLoading ? "Opening…" : "Manage subscription"}
        </button>
      ) : null}

      <div className="flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => setInterval("monthly")}
          className={`rounded-lg px-3 py-1.5 ${interval === "monthly" ? "bg-emerald-600 text-white" : "border border-zinc-700 text-zinc-300"}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setInterval("annual")}
          className={`rounded-lg px-3 py-1.5 ${interval === "annual" ? "bg-emerald-600 text-white" : "border border-zinc-700 text-zinc-300"}`}
        >
          Annual
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {planDisplayConfigs.map((planConfig) => {
          const pricing = planConfig.pricing[interval];
          const isCurrent = plan === planConfig.key;
          return (
            <div
              key={planConfig.key}
              className={`rounded-xl border p-6 ${isCurrent ? "border-emerald-600 bg-emerald-950/20" : "border-zinc-800 bg-zinc-900/40"}`}
            >
              <h2 className="text-lg font-semibold text-zinc-100">
                {planConfig.name}
              </h2>
              <p className="text-sm text-zinc-400">{planConfig.tagline}</p>
              <p className="mt-4 text-3xl font-semibold text-zinc-50">
                {pricing.priceDisplay}
                <span className="text-sm font-normal text-zinc-500">
                  /{interval === "monthly" ? "mo" : "yr"}
                </span>
              </p>
              <ul className="mt-4 space-y-1 text-sm text-zinc-400">
                {planConfig.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => void startCheckout(planConfig.key)}
                disabled={isCurrent || loadingPlan === planConfig.key}
                className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                {isCurrent
                  ? "Current plan"
                  : loadingPlan === planConfig.key
                    ? "Redirecting…"
                    : "Choose plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
