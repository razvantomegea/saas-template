import type { AppLocale } from "@/lib/i18n/locales";
import { APP_LOCALES, DEFAULT_LOCALE, MQL5_LOCALES } from "@/lib/i18n/locales";
import {
  deepMergeMessages,
  formatMessage,
  lookupMessagePath,
} from "@/lib/i18n/deep-merge";
import en from "@/lib/i18n/messages/en.json";
import de from "@/lib/i18n/messages/de.json";
import es from "@/lib/i18n/messages/es.json";
import fr from "@/lib/i18n/messages/fr.json";
import it from "@/lib/i18n/messages/it.json";
import ja from "@/lib/i18n/messages/ja.json";
import ko from "@/lib/i18n/messages/ko.json";
import pt from "@/lib/i18n/messages/pt.json";
import ru from "@/lib/i18n/messages/ru.json";
import tr from "@/lib/i18n/messages/tr.json";
import zh from "@/lib/i18n/messages/zh.json";

export type MessageCatalog = typeof en;

const overlays: Record<AppLocale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  ru: ru as Record<string, unknown>,
  de: de as Record<string, unknown>,
  es: es as Record<string, unknown>,
  fr: fr as Record<string, unknown>,
  zh: zh as Record<string, unknown>,
  it: it as Record<string, unknown>,
  pt: pt as Record<string, unknown>,
  tr: tr as Record<string, unknown>,
  ja: ja as Record<string, unknown>,
  ko: ko as Record<string, unknown>,
};

const cache = new Map<AppLocale, MessageCatalog>();

export function getMessages(
  locale: AppLocale = DEFAULT_LOCALE,
): MessageCatalog {
  const hit = cache.get(locale);
  if (hit) {
    return hit;
  }
  const merged =
    locale === DEFAULT_LOCALE
      ? (en as MessageCatalog)
      : deepMergeMessages(
          en as unknown as Record<string, unknown>,
          overlays[locale],
        );
  cache.set(locale, merged as MessageCatalog);
  return merged as MessageCatalog;
}

export type Translator = (
  path: string,
  vars?: Record<string, string | number>,
) => string;

export function getTranslator(locale: AppLocale = DEFAULT_LOCALE): Translator {
  const messages = getMessages(locale) as unknown as Record<string, unknown>;
  const fallback = en as unknown as Record<string, unknown>;
  return (path, vars) => {
    const value =
      lookupMessagePath(messages, path) ??
      lookupMessagePath(fallback, path) ??
      path;
    return formatMessage(value, vars);
  };
}

export { APP_LOCALES, MQL5_LOCALES };
