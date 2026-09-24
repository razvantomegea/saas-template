"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import {
  CookieConsentProvider,
  useOptionalCookieConsent,
} from "@/lib/analytics/cookie-consent-context";
import type { AppLocale } from "@/lib/i18n/locales";

function ConsentGatedAnalytics() {
  const consent = useOptionalCookieConsent();
  if (!consent?.analyticsEnabled) {
    return null;
  }
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: AppLocale;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10_000,
            retry: 1,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider locale={locale}>
        <ThemeProvider>
          <CookieConsentProvider>
            {children}
            <CookieConsentBanner />
            <ConsentGatedAnalytics />
          </CookieConsentProvider>
        </ThemeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
