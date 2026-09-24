import type { AppLocale } from "@/lib/i18n/locales";
import {
  getMessages,
  getTranslator,
  type MessageCatalog,
  type Translator,
} from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/i18n/request";

export type PageIntl = {
  locale: AppLocale;
  messages: MessageCatalog;
  t: Translator;
};

/** Locale + messages + translator for App Router pages/metadata. */
export async function getPageIntl(): Promise<PageIntl> {
  const locale = await getRequestLocale();
  return {
    locale,
    messages: getMessages(locale),
    t: getTranslator(locale),
  };
}
