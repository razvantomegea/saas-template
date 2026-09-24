"use client";

import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import {
  TopNavLinkList,
  type TopNavLinkItem,
} from "@/components/layout/TopNavLinkList";
import { TopNavShell } from "@/components/layout/TopNavShell";
import {
  topNavCtaClassName,
  topNavDesktopActionsClassName,
  topNavMobileCtaClassName,
  topNavMobileSecondaryClassName,
  topNavMobileSectionClassName,
  topNavSecondaryClassName,
} from "@/components/layout/top-nav-styles";

export function MarketingHeader() {
  const t = useT();
  const marketingNavLinks: TopNavLinkItem[] = [
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/help", label: t("nav.help") },
  ];

  return (
    <TopNavShell logoHref="/" mobileNavId="marketing-nav-mobile">
      {({ layout, closeMenu }) => {
        const links = (
          <TopNavLinkList
            layout={layout}
            links={marketingNavLinks}
            onNavigate={closeMenu}
          />
        );

        if (layout === "mobile") {
          return (
            <>
              <div className="flex flex-col gap-0.5">{links}</div>
              <div className={topNavMobileSectionClassName}>
                <LocaleSwitcher />
                <LocalizedLink
                  href="/login"
                  onClick={closeMenu}
                  className={topNavMobileSecondaryClassName}
                >
                  {t("nav.login")}
                </LocalizedLink>
                <LocalizedLink
                  href="/signup"
                  onClick={closeMenu}
                  className={topNavMobileCtaClassName}
                >
                  {t("nav.signup")}
                </LocalizedLink>
              </div>
            </>
          );
        }

        return (
          <>
            {links}
            <span
              className="mx-1 hidden h-4 w-px bg-zinc-800 lg:block"
              aria-hidden
            />
            <div className={topNavDesktopActionsClassName}>
              <LocaleSwitcher />
              <LocalizedLink href="/login" className={topNavSecondaryClassName}>
                {t("nav.login")}
              </LocalizedLink>
              <LocalizedLink href="/signup" className={topNavCtaClassName}>
                {t("nav.signup")}
              </LocalizedLink>
            </div>
          </>
        );
      }}
    </TopNavShell>
  );
}
