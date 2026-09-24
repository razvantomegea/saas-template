"use client";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { NotificationBell } from "@/components/dashboard/NotificationBell";
import {
  TopNavLinkList,
  type TopNavLinkItem,
} from "@/components/layout/TopNavLinkList";
import { TopNavShell } from "@/components/layout/TopNavShell";
import {
  topNavDesktopActionsClassName,
  topNavMobileSectionClassName,
} from "@/components/layout/top-nav-styles";

const NAV_LINKS: TopNavLinkItem[] = [
  { href: "/dashboard", label: "Home", dataTour: "nav-home" },
  { href: "/dashboard/notes", label: "Notes", dataTour: "nav-notes" },
  { href: "/dashboard/settings", label: "Settings", dataTour: "nav-settings" },
  { href: "/dashboard/billing", label: "Billing", dataTour: "nav-billing" },
];

export function DashboardHeader() {
  return (
    <TopNavShell
      logoHref="/dashboard"
      maxWidthClass="max-w-7xl"
      mobileNavId="dashboard-nav-mobile"
    >
      {({ layout, closeMenu }) => {
        const links = (
          <TopNavLinkList
            layout={layout}
            links={NAV_LINKS}
            onNavigate={closeMenu}
          />
        );

        if (layout === "mobile") {
          return (
            <>
              <div className="flex flex-col gap-0.5">{links}</div>
              <div className={topNavMobileSectionClassName}>
                <LogoutButton variant="mobile" testId={null} />
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
              <NotificationBell layout="desktop" />
              <LogoutButton />
            </div>
          </>
        );
      }}
    </TopNavShell>
  );
}
