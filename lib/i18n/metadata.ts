import type { Metadata } from "next";

import {
  APP_LOCALES,
  HREFLANG_BY_LOCALE,
  OPEN_GRAPH_LOCALE_BY_LOCALE,
  type AppLocale,
} from "@/lib/i18n/locales";
import { getMessages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/routing";
import { BRAND_NAME } from "@/lib/constants/branding";
import { createSiteMetadata, getSiteUrl } from "@/lib/seo/site";

export type SeoPageKey =
  | "home"
  | "pricing"
  | "help"
  | "login"
  | "signup"
  | "privacy"
  | "terms"
  | "cookies"
  | "dashboard";

type SeoPageContent = {
  title: string;
  description: string;
  keywords?: string[];
};

function resolveSeoPage(locale: AppLocale, page: SeoPageKey): SeoPageContent {
  const messages = getMessages(locale);
  const siteDescription =
    "SaaS Template ships Better Auth, Stripe billing, Supabase Postgres, and a demo Notes feature.";

  switch (page) {
    case "home":
      return {
        title: `${BRAND_NAME} — Ship your SaaS faster`,
        description: siteDescription,
      };
    case "pricing":
      return {
        title: messages.pricing?.title ?? "Pricing",
        description:
          messages.pricing?.subtitle ?? "Simple plans for your SaaS product.",
      };
    case "help":
      return {
        title: messages.help?.title ?? "Help",
        description: messages.help?.subtitle ?? "FAQ and support.",
      };
    case "login":
      return {
        title: messages.auth?.loginTitle ?? "Log in",
        description:
          messages.auth?.loginSubtitle ?? `Sign in to ${BRAND_NAME}.`,
      };
    case "signup":
      return {
        title: messages.auth?.signupTitle ?? "Sign up",
        description:
          messages.auth?.signupSubtitle ?? `Create your ${BRAND_NAME} account.`,
      };
    case "privacy":
      return {
        title: messages.legal.privacyTitle,
        description: `${BRAND_NAME} privacy policy.`,
      };
    case "terms":
      return {
        title: messages.legal.termsTitle,
        description: `${BRAND_NAME} terms of service.`,
      };
    case "cookies":
      return {
        title: messages.legal.cookiesTitle ?? "Cookies Policy",
        description: `${BRAND_NAME} cookies policy.`,
      };
    case "dashboard":
      return {
        title: "Dashboard",
        description: `${BRAND_NAME} dashboard.`,
      };
    default:
      return { title: BRAND_NAME, description: siteDescription };
  }
}

export function createLocalizedPageMetadata(params: {
  locale: AppLocale;
  pathname: string;
  page: SeoPageKey;
  keywords?: string[];
}): Metadata {
  const siteUrl = getSiteUrl();
  const content = resolveSeoPage(params.locale, params.page);
  const canonicalPath = localizedPath(params.locale, params.pathname);

  const languages: Record<string, string> = {
    "x-default": `${siteUrl}${localizedPath("en", params.pathname)}`,
  };
  for (const locale of APP_LOCALES) {
    languages[HREFLANG_BY_LOCALE[locale]] =
      `${siteUrl}${localizedPath(locale, params.pathname)}`;
  }

  return createSiteMetadata({
    title: content.title,
    description: content.description,
    keywords: params.keywords ?? content.keywords,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      locale: OPEN_GRAPH_LOCALE_BY_LOCALE[params.locale],
      url: `${siteUrl}${canonicalPath}`,
      title: content.title,
      description: content.description,
    },
  });
}
