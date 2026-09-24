import type { Metadata } from "next";
import Link from "next/link";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { planDisplayConfigs } from "@/lib/config/plans-display";
import { createSiteMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSiteMetadata({ title: "Pricing" });

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-50">
            Simple, transparent pricing
          </h1>
          <p className="mt-2 text-zinc-400">
            Start with a 14-day trial. Cancel anytime.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {planDisplayConfigs.map((plan) => (
            <div
              key={plan.key}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h2 className="text-lg font-semibold text-zinc-100">
                {plan.name}
              </h2>
              <p className="text-sm text-zinc-400">{plan.tagline}</p>
              <p className="mt-4 text-3xl font-semibold text-zinc-50">
                {plan.pricing.monthly.priceDisplay}
                <span className="text-sm font-normal text-zinc-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-1 text-sm text-zinc-400">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Start free trial
              </Link>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
