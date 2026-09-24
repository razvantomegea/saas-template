import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { DataTestId } from "@/lib/constants/data-test-id";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";
import { getTermsOfService } from "@/lib/legal/documents/load-legal";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getPageIntl();
  const base = createLocalizedPageMetadata({
    locale,
    pathname: "/terms",
    page: "terms",
  });
  return {
    ...base,
    title: messages.legal.termsTitle,
    openGraph: {
      ...base.openGraph,
      title: messages.legal.termsTitle,
    },
  };
}

export default async function TermsPage() {
  const { locale, messages } = await getPageIntl();
  const content = getTermsOfService(locale);

  return (
    <LegalPageShell>
      <LegalDocument
        content={content}
        titleTestId={DataTestId.TermsTitle}
        disclaimer={
          locale !== DEFAULT_LOCALE
            ? messages.legal.translationDisclaimer
            : undefined
        }
      />
    </LegalPageShell>
  );
}
