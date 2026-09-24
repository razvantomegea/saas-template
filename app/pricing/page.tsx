import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { planDisplayConfigs } from "@/lib/config/plans-display";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getPageIntl();
  return createLocalizedPageMetadata({
    locale,
    pathname: "/pricing",
    page: "pricing",
  });
}

export default async function PricingPage() {
  const { t } = await getPageIntl();

  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-50">
            {t("pricing.headline")}
          </h1>
          <p className="mt-2 text-zinc-400">{t("pricing.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {planDisplayConfigs.map((plan) => (
            <div
              key={plan.key}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h2 className="text-lg font-semibold text-zinc-100">
                {t(plan.nameKey)}
              </h2>
              <p className="text-sm text-zinc-400">{t(plan.taglineKey)}</p>
              <p className="mt-4 text-3xl font-semibold text-zinc-50">
                {plan.pricing.monthly.priceDisplay}
                <span className="text-sm font-normal text-zinc-500">
                  {t("pricing.perMonth")}
                </span>
              </p>
              <ul className="mt-4 space-y-1 text-sm text-zinc-400">
                {plan.featureKeys.map((featureKey) => (
                  <li key={featureKey}>• {t(featureKey)}</li>
                ))}
              </ul>
              <LocalizedLink
                href="/signup"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                {t("pricing.cta")}
              </LocalizedLink>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
