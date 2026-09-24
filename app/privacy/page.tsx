import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { DataTestId } from "@/lib/constants/data-test-id";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";
import { getPrivacyPolicy } from "@/lib/legal/documents/load-legal";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getPageIntl();
  const base = createLocalizedPageMetadata({
    locale,
    pathname: "/privacy",
    page: "privacy",
  });
  return {
    ...base,
    title: messages.legal.privacyTitle,
    openGraph: {
      ...base.openGraph,
      title: messages.legal.privacyTitle,
    },
  };
}

export default async function PrivacyPage() {
  const { locale, messages } = await getPageIntl();
  const content = getPrivacyPolicy(locale);

  return (
    <LegalPageShell>
      <LegalDocument
        content={content}
        titleTestId={DataTestId.PrivacyTitle}
        disclaimer={
          locale !== DEFAULT_LOCALE
            ? messages.legal.translationDisclaimer
            : undefined
        }
      />
    </LegalPageShell>
  );
}
