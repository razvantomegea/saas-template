"use client";

import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
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

const MARKETING_NAV_LINKS: TopNavLinkItem[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/help", label: "Help" },
];

export function MarketingHeader() {
  return (
    <TopNavShell logoHref="/" mobileNavId="marketing-nav-mobile">
      {({ layout, closeMenu }) => {
        const links = (
          <TopNavLinkList
            layout={layout}
            links={MARKETING_NAV_LINKS}
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
                  Log in
                </LocalizedLink>
                <LocalizedLink
                  href="/signup"
                  onClick={closeMenu}
                  className={topNavMobileCtaClassName}
                >
                  Sign up
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
                Log in
              </LocalizedLink>
              <LocalizedLink href="/signup" className={topNavCtaClassName}>
                Sign up
              </LocalizedLink>
            </div>
          </>
        );
      }}
    </TopNavShell>
  );
}
