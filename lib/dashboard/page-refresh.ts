/**
 * Loading-skeleton hint for admin pages while data refreshes.
 *
 * The template doesn't wire up pull-to-refresh chrome (no
 * `DashboardRefreshProvider`, `PullToRefresh`, or skeleton components), so
 * this binder is intentionally a no-op placeholder that keeps the call sites
 * in `app/dashboard/admin/*` type-safe. Wire up a real provider here if you
 * add a pull-to-refresh experience.
 */
export type PageRefreshSkeletonOptions =
  | { variant: "dashboard" }
  | { variant: "page"; className?: string; blocks?: number };

export function PageRefreshBinder(_props: {
  onRefresh?: () => Promise<void>;
  skeleton: PageRefreshSkeletonOptions;
}): null {
  void _props;
  return null;
}
