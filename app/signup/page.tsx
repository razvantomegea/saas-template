import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getPageIntl();
  return {
    ...createLocalizedPageMetadata({
      locale,
      pathname: "/signup",
      page: "signup",
    }),
    robots: { index: false, follow: true },
  };
}

export default async function SignupPage() {
  const { t } = await getPageIntl();
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <AuthForm mode="signup" />
        <p className="mt-8 text-center text-sm text-zinc-500">
          <LocalizedLink href="/" className="hover:text-zinc-300">
            {t("common.backHome")}
          </LocalizedLink>
        </p>
      </main>
      <MarketingFooter />
    </div>
  );
}
