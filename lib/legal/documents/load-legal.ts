import {
  DEFAULT_LOCALE,
  type AppLocale,
  resolveAppLocale,
} from "@/lib/i18n/locales";
import { privacyPolicyContent as privacyDe } from "@/lib/legal/documents/de/privacy-policy";
import { termsOfServiceContent as termsDe } from "@/lib/legal/documents/de/terms-of-service";
import { privacyPolicyContent as privacyEs } from "@/lib/legal/documents/es/privacy-policy";
import { termsOfServiceContent as termsEs } from "@/lib/legal/documents/es/terms-of-service";
import { privacyPolicyContent as privacyFr } from "@/lib/legal/documents/fr/privacy-policy";
import { termsOfServiceContent as termsFr } from "@/lib/legal/documents/fr/terms-of-service";
import { privacyPolicyContent as privacyIt } from "@/lib/legal/documents/it/privacy-policy";
import { termsOfServiceContent as termsIt } from "@/lib/legal/documents/it/terms-of-service";
import { privacyPolicyContent as privacyJa } from "@/lib/legal/documents/ja/privacy-policy";
import { termsOfServiceContent as termsJa } from "@/lib/legal/documents/ja/terms-of-service";
import { privacyPolicyContent as privacyKo } from "@/lib/legal/documents/ko/privacy-policy";
import { termsOfServiceContent as termsKo } from "@/lib/legal/documents/ko/terms-of-service";
import { cookiesPolicyContent } from "@/lib/legal/documents/cookies-policy";
import { privacyPolicyContent } from "@/lib/legal/documents/privacy-policy";
import { privacyPolicyContent as privacyPt } from "@/lib/legal/documents/pt/privacy-policy";
import { termsOfServiceContent as termsPt } from "@/lib/legal/documents/pt/terms-of-service";
import { privacyPolicyContent as privacyRu } from "@/lib/legal/documents/ru/privacy-policy";
import { termsOfServiceContent as termsRu } from "@/lib/legal/documents/ru/terms-of-service";
import { termsOfServiceContent } from "@/lib/legal/documents/terms-of-service";
import { privacyPolicyContent as privacyTr } from "@/lib/legal/documents/tr/privacy-policy";
import { termsOfServiceContent as termsTr } from "@/lib/legal/documents/tr/terms-of-service";
import { privacyPolicyContent as privacyZh } from "@/lib/legal/documents/zh/privacy-policy";
import { termsOfServiceContent as termsZh } from "@/lib/legal/documents/zh/terms-of-service";
import type { LegalDocumentContent } from "@/lib/legal/types";

const privacyByLocale: Partial<Record<AppLocale, LegalDocumentContent>> = {
  ru: privacyRu,
  de: privacyDe,
  es: privacyEs,
  fr: privacyFr,
  zh: privacyZh,
  it: privacyIt,
  pt: privacyPt,
  tr: privacyTr,
  ja: privacyJa,
  ko: privacyKo,
};

const termsByLocale: Partial<Record<AppLocale, LegalDocumentContent>> = {
  ru: termsRu,
  de: termsDe,
  es: termsEs,
  fr: termsFr,
  zh: termsZh,
  it: termsIt,
  pt: termsPt,
  tr: termsTr,
  ja: termsJa,
  ko: termsKo,
};

/**
 * Privacy Policy loader. EN is authoritative — missing locales fall back to EN.
 */
export function getPrivacyPolicy(locale?: AppLocale): LegalDocumentContent {
  const resolved = resolveAppLocale(locale ?? DEFAULT_LOCALE);
  if (resolved === DEFAULT_LOCALE) return privacyPolicyContent;
  return privacyByLocale[resolved] ?? privacyPolicyContent;
}

/**
 * Terms of Service loader. EN is authoritative — missing locales fall back to EN.
 */
export function getTermsOfService(locale?: AppLocale): LegalDocumentContent {
  const resolved = resolveAppLocale(locale ?? DEFAULT_LOCALE);
  if (resolved === DEFAULT_LOCALE) return termsOfServiceContent;
  return termsByLocale[resolved] ?? termsOfServiceContent;
}

/**
 * Cookies Policy loader. EN is authoritative for the template (no locale folders yet).
 */
export function getCookiesPolicy(_locale?: AppLocale): LegalDocumentContent {
  void _locale;
  return cookiesPolicyContent;
}
