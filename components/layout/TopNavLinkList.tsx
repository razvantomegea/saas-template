"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isTopNavActive,
  topNavLinkClassNames,
} from "@/components/layout/nav-active";
import {
  topNavLinkActiveClassName,
  topNavLinkClassName,
  topNavMobileLinkActiveClassName,
  topNavMobileLinkClassName,
} from "@/components/layout/top-nav-styles";

export type TopNavLinkItem = {
  href: string;
  label: string;
  testId?: string;
  dataTour?: string;
};

type TopNavLinkListProps = {
  layout: "desktop" | "mobile";
  links: readonly TopNavLinkItem[];
  onNavigate?: () => void;
};

/** Shared top-nav link list used by marketing and dashboard headers. */
export function TopNavLinkList({
  layout,
  links,
  onNavigate,
}: TopNavLinkListProps) {
  const isMobile = layout === "mobile";
  const pathname = usePathname() ?? "/";

  return (
    <>
      {links.map((link) => {
        const active = isTopNavActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            data-testid={!isMobile ? link.testId : undefined}
            data-tour={link.dataTour}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={topNavLinkClassNames({
              layout,
              active,
              baseDesktop: topNavLinkClassName,
              baseMobile: topNavMobileLinkClassName,
              activeDesktop: topNavLinkActiveClassName,
              activeMobile: topNavMobileLinkActiveClassName,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
