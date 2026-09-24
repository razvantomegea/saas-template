import {
  DEFAULT_LOCALE,
  type AppLocale,
  isAppLocale,
  resolveAppLocale,
} from "@/lib/i18n/locales";

export function localizedPath(locale: AppLocale, pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string): {
  locale: AppLocale;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isAppLocale(first)) {
    const rest = segments.slice(1);
    return {
      locale: first,
      pathname: rest.length === 0 ? "/" : `/${rest.join("/")}`,
    };
  }
  return { locale: DEFAULT_LOCALE, pathname };
}

export function switchLocalePath(
  currentPathname: string,
  targetLocale: AppLocale,
): string {
  const { pathname } = stripLocalePrefix(currentPathname);
  return localizedPath(targetLocale, pathname);
}

export { resolveAppLocale };
