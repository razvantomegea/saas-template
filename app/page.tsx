import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { BRAND_NAME } from "@/lib/constants/branding";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";
import {
  createHomePageJsonLd,
  createOrganizationJsonLd,
} from "@/lib/seo/json-ld";

const FEATURE_KEYS = [
  { title: "home.featureAuthTitle", body: "home.featureAuthBody" },
  { title: "home.featureBillingTitle", body: "home.featureBillingBody" },
  { title: "home.featureDemoTitle", body: "home.featureDemoBody" },
  { title: "home.featurePushTitle", body: "home.featurePushBody" },
  { title: "home.featurePwaTitle", body: "home.featurePwaBody" },
  { title: "home.featureDeployTitle", body: "home.featureDeployBody" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getPageIntl();
  return createLocalizedPageMetadata({
    locale,
    pathname: "/",
    page: "home",
  });
}

export default async function LandingPage() {
  const { t } = await getPageIntl();

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: createHomePageJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: createOrganizationJsonLd() }}
      />
      <MarketingHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            {BRAND_NAME}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{t("home.tagline")}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <LocalizedLink
              href="/signup"
              className="inline-flex h-11 items-center rounded-lg bg-emerald-600 px-6 font-medium text-white hover:bg-emerald-500"
            >
              {t("home.ctaTrial")}
            </LocalizedLink>
            <LocalizedLink
              href="/pricing"
              className="inline-flex h-11 items-center rounded-lg border border-zinc-700 px-6 font-medium text-zinc-200 hover:bg-zinc-900"
            >
              {t("home.ctaPricing")}
            </LocalizedLink>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
              >
                <h2 className="text-lg font-semibold text-zinc-100">
                  {t(feature.title)}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">{t(feature.body)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
