import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { DataTestId } from "@/lib/constants/data-test-id";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";
import { getCookiesPolicy } from "@/lib/legal/documents/load-legal";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getPageIntl();
  const base = createLocalizedPageMetadata({
    locale,
    pathname: "/cookies",
    page: "cookies",
  });
  return {
    ...base,
    title: messages.legal?.cookiesTitle ?? "Cookies Policy",
    openGraph: {
      ...base.openGraph,
      title: messages.legal?.cookiesTitle ?? "Cookies Policy",
    },
  };
}

export default async function CookiesPage() {
  const { locale, messages } = await getPageIntl();
  const content = getCookiesPolicy(locale);

  return (
    <LegalPageShell>
      <LegalDocument
        content={content}
        titleTestId={DataTestId.CookiesTitle}
        disclaimer={
          locale !== DEFAULT_LOCALE
            ? messages.legal.translationDisclaimer
            : undefined
        }
      />
    </LegalPageShell>
  );
}
