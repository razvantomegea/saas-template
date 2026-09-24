"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n/routing";

type LocalizedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: ReactNode;
    /** Path without locale prefix, e.g. `/pricing`. */
    href: string;
  };

export function localizedHref(locale: string, href: string): string {
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
  const localized = localizedPath(
    locale as Parameters<typeof localizedPath>[0],
    path || "/",
  );
  return query ? `${localized}?${query}` : localized;
}

export function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const locale = useLocale();
  return <Link href={localizedHref(locale, href)} {...rest} />;
}
