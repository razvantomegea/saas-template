export const topNavHeaderClassName =
  "sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 pt-[env(safe-area-inset-top)] backdrop-blur";

export const topNavLinkClassName =
  "rounded-md px-2 py-1.5 text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60";

export const topNavLinkActiveClassName = "bg-zinc-900/80 text-zinc-50";

/** Mobile drawer link — 44px min touch target, shared horizontal rhythm. */
export const topNavMobileLinkClassName =
  "flex min-h-11 items-center rounded-lg px-3 text-base text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60 focus-visible:ring-inset";

export const topNavMobileLinkActiveClassName =
  "bg-zinc-900 text-zinc-50 font-medium";

export const topNavMobilePanelClassName =
  "mx-auto flex w-full flex-col px-3 py-3 sm:px-4";

export const topNavMobileSectionClassName =
  "mt-3 flex flex-col gap-3 border-t border-zinc-800/80 pt-3";

/** Desktop nav from 1000px so Login + CTA do not overlap primary links. */
export const topNavDesktopNavClassName =
  "hidden items-center gap-1 text-sm min-[1000px]:flex";

export const topNavDesktopActionsClassName = "ml-1 flex items-center gap-3";

export const topNavMobileOnlyClassName = "min-[1000px]:hidden";

export const topNavCtaClassName =
  "inline-flex h-8 items-center rounded-lg bg-emerald-600 px-3 font-medium text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70";

export const topNavSecondaryClassName =
  "inline-flex h-8 items-center rounded-lg border border-zinc-700/80 px-3 font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60";

export const topNavMobileCtaClassName =
  "flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-center text-base font-medium text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70";

export const topNavMobileSecondaryClassName =
  "flex min-h-11 w-full items-center justify-center rounded-lg border border-zinc-700/80 px-4 text-center text-base font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60";
