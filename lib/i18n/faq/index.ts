import { FAQ_SECTIONS as EN_FAQ_SECTIONS } from "@/lib/i18n/faq/en";
import { FAQ_SECTIONS as DE_FAQ_SECTIONS } from "@/lib/i18n/faq/de";
import { FAQ_SECTIONS as ES_FAQ_SECTIONS } from "@/lib/i18n/faq/es";
import { FAQ_SECTIONS as FR_FAQ_SECTIONS } from "@/lib/i18n/faq/fr";
import { FAQ_SECTIONS as IT_FAQ_SECTIONS } from "@/lib/i18n/faq/it";
import { FAQ_SECTIONS as JA_FAQ_SECTIONS } from "@/lib/i18n/faq/ja";
import { FAQ_SECTIONS as KO_FAQ_SECTIONS } from "@/lib/i18n/faq/ko";
import { FAQ_SECTIONS as PT_FAQ_SECTIONS } from "@/lib/i18n/faq/pt";
import { FAQ_SECTIONS as RU_FAQ_SECTIONS } from "@/lib/i18n/faq/ru";
import { FAQ_SECTIONS as TR_FAQ_SECTIONS } from "@/lib/i18n/faq/tr";
import { FAQ_SECTIONS as ZH_FAQ_SECTIONS } from "@/lib/i18n/faq/zh";
import type { FaqItem, FaqSection } from "@/lib/i18n/faq/types";
import {
  DEFAULT_LOCALE,
  type AppLocale,
  resolveAppLocale,
} from "@/lib/i18n/locales";

export type { FaqItem, FaqSection } from "@/lib/i18n/faq/types";
export { FAQ_SECTIONS } from "@/lib/i18n/faq/en";

const FAQ_BY_LOCALE: Partial<Record<AppLocale, readonly FaqSection[]>> = {
  en: EN_FAQ_SECTIONS,
  ru: RU_FAQ_SECTIONS,
  de: DE_FAQ_SECTIONS,
  es: ES_FAQ_SECTIONS,
  fr: FR_FAQ_SECTIONS,
  zh: ZH_FAQ_SECTIONS,
  it: IT_FAQ_SECTIONS,
  pt: PT_FAQ_SECTIONS,
  tr: TR_FAQ_SECTIONS,
  ja: JA_FAQ_SECTIONS,
  ko: KO_FAQ_SECTIONS,
};

function faqSectionsForLocale(locale: AppLocale): readonly FaqSection[] {
  return FAQ_BY_LOCALE[locale] ?? EN_FAQ_SECTIONS;
}

export function getFaqSections(locale?: AppLocale): readonly FaqSection[] {
  return faqSectionsForLocale(resolveAppLocale(locale ?? DEFAULT_LOCALE));
}

/** Billing & account items for pricing-page FAQ reuse. */
export function getPricingFaqSections(locale?: AppLocale): FaqSection[] {
  return getFaqSections(locale).filter((section) => section.id === "billing");
}

/** Flat markdown used to ground the Help bot (no UI chrome). */
export function formatFaqForPrompt(locale?: AppLocale): string {
  const parts: string[] = [];
  for (const section of getFaqSections(locale)) {
    parts.push(`## ${section.title}`);
    for (const item of section.items) {
      parts.push(`### ${item.question}`);
      parts.push(item.answer);
    }
  }
  return parts.join("\n\n");
}

export function flattenFaqItems(
  sections: readonly FaqSection[] = EN_FAQ_SECTIONS,
): FaqItem[] {
  return sections.flatMap((section) => section.items);
}
