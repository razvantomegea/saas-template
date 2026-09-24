"use client";

import { usePathname } from "next/navigation";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { Select } from "@/components/ui/Select";
import { DataTestId } from "@/lib/constants/data-test-id";
import { APP_LOCALES, type AppLocale } from "@/lib/i18n/locales";
import { switchLocalePath } from "@/lib/i18n/routing";

const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  zh: "中文",
  it: "Italiano",
  pt: "Português",
  tr: "Türkçe",
  ja: "日本語",
  ko: "한국어",
};

const LOCALE_OPTIONS = APP_LOCALES.map((code) => ({
  value: code,
  label: LOCALE_LABELS[code],
}));

export function LocaleSwitcher({
  className = "",
  fullWidth = false,
  showLabel = false,
}: {
  className?: string;
  fullWidth?: boolean;
  /** Visible label (use in mobile utility sections). */
  showLabel?: boolean;
}) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname() ?? "/";
  const label = t("nav.language");

  return (
    <div
      className={`inline-flex min-w-0 ${showLabel ? "w-full flex-col gap-1.5" : "items-center gap-2"} ${className}`.trim()}
    >
      {showLabel ? (
        <span
          className="px-0.5 text-xs font-medium uppercase tracking-wide text-zinc-500"
          data-testid={DataTestId.LocaleSwitcherLabel}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
      <Select
        aria-label={label}
        data-testid={DataTestId.LocaleSwitcher}
        fullWidth={fullWidth}
        size={showLabel ? "md" : "sm"}
        className={showLabel ? "min-h-11" : ""}
        value={locale}
        options={LOCALE_OPTIONS}
        onChange={(event) => {
          const next = event.target.value as AppLocale;
          // Preserve query (e.g. ?next=/dashboard/billing) across locale switches.
          const search = window.location.search;
          const target = switchLocalePath(pathname, next);
          // Full document navigation: soft router.push can skip RootLayout
          // re-render for rewritten locale routes, leaving SSR copy stale.
          window.location.assign(search ? `${target}${search}` : target);
        }}
      />
    </div>
  );
}
