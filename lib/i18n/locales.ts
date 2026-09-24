/** Supported UI locales for the SaaS template (URL prefix + message catalogs). */
export const APP_LOCALES = [
  "en",
  "ru",
  "de",
  "es",
  "fr",
  "zh",
  "it",
  "pt",
  "tr",
  "ja",
  "ko",
] as const;

/** @deprecated Use APP_LOCALES — kept for gradual import migration. */
export const MQL5_LOCALES = APP_LOCALES;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

/** Header set by proxy when a locale prefix is rewritten. */
export const LOCALE_REQUEST_HEADER = "x-saas-template-locale";

/** BCP 47 tags for hreflang alternates. */
export const HREFLANG_BY_LOCALE: Record<AppLocale, string> = {
  en: "en",
  ru: "ru",
  de: "de",
  es: "es",
  fr: "fr",
  zh: "zh-Hans",
  it: "it",
  pt: "pt",
  tr: "tr",
  ja: "ja",
  ko: "ko",
};

/** Open Graph locale codes (underscore form). */
export const OPEN_GRAPH_LOCALE_BY_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  ru: "ru_RU",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  zh: "zh_CN",
  it: "it_IT",
  pt: "pt_PT",
  tr: "tr_TR",
  ja: "ja_JP",
  ko: "ko_KR",
};

export function isAppLocale(value: string): value is AppLocale {
  return (APP_LOCALES as readonly string[]).includes(value);
}

export function resolveAppLocale(value: string | null | undefined): AppLocale {
  if (value && isAppLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}
