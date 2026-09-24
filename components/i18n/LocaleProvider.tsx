"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n/locales";
import { DEFAULT_LOCALE, HREFLANG_BY_LOCALE } from "@/lib/i18n/locales";
import {
  getMessages,
  getTranslator,
  type MessageCatalog,
  type Translator,
} from "@/lib/i18n/messages";
import { stripLocalePrefix } from "@/lib/i18n/routing";

type LocaleContextValue = {
  locale: AppLocale;
  messages: MessageCatalog;
  t: Translator;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Prefer the URL locale over the server layout prop.
 * Soft-nav between `/` and `/pt` rewrites to the same route tree, so RootLayout
 * often does not re-render — the pathname is the reliable client signal.
 */
export function LocaleProvider({
  locale: serverLocale,
  children,
}: {
  locale: AppLocale;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const pathLocale = stripLocalePrefix(pathname).locale;
  const locale = pathLocale || serverLocale || DEFAULT_LOCALE;

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      messages: getMessages(locale),
      t: getTranslator(locale),
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = HREFLANG_BY_LOCALE[locale];
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): AppLocale {
  const ctx = useContext(LocaleContext);
  return ctx?.locale ?? DEFAULT_LOCALE;
}

export function useT(): Translator {
  const ctx = useContext(LocaleContext);
  return ctx?.t ?? getTranslator(DEFAULT_LOCALE);
}

export function useMessages(): MessageCatalog {
  const ctx = useContext(LocaleContext);
  return ctx?.messages ?? getMessages(DEFAULT_LOCALE);
}
