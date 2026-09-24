import type { AppLocale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";

/** Server-safe localized href (path may include query string). */
export function localizedHrefForLocale(
  locale: AppLocale,
  href: string,
): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("#")
  ) {
    return href;
  }
  const [path, query = ""] = href.split("?");
  const localized = localizedPath(locale, path || "/");
  return query ? `${localized}?${query}` : localized;
}
