"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/marketing/Logo";
import {
  topNavDesktopNavClassName,
  topNavHeaderClassName,
  topNavMobileOnlyClassName,
  topNavMobilePanelClassName,
} from "@/components/layout/top-nav-styles";
import { DataTestId } from "@/lib/constants/data-test-id";

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type TopNavShellProps = {
  logoHref: string;
  maxWidthClass?: string;
  mobileNavId: string;
  children: (args: {
    layout: "desktop" | "mobile";
    closeMenu?: () => void;
  }) => ReactNode;
};

export function TopNavShell({
  logoHref,
  maxWidthClass = "max-w-6xl",
  mobileNavId,
  children,
}: TopNavShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={topNavHeaderClassName}
      data-testid={DataTestId.MarketingHeader}
    >
      <div
        className={`mx-auto flex ${maxWidthClass} items-center justify-between gap-4 px-4 py-3.5 sm:px-6`}
      >
        <Logo href={logoHref} />
        <nav className={topNavDesktopNavClassName} aria-label="Primary">
          {children({ layout: "desktop" })}
        </nav>
        <button
          type="button"
          className={`rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60 ${topNavMobileOnlyClassName}`}
          aria-expanded={menuOpen}
          aria-controls={mobileNavId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-testid={DataTestId.NavMenuToggle}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <nav
        id={mobileNavId}
        aria-label="Mobile"
        className={`border-t border-zinc-800/80 bg-zinc-950 ${topNavMobileOnlyClassName} ${menuOpen ? "block" : "hidden"}`}
      >
        <div className={`${topNavMobilePanelClassName} ${maxWidthClass}`}>
          {children({ layout: "mobile", closeMenu })}
        </div>
      </nav>
    </header>
  );
}
