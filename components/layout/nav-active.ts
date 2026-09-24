/** Match current route to a nav href. */
export function isTopNavActive(pathname: string, href: string): boolean {
  // Index routes: exact only so nested pages don't light up the parent.
  if (href === "/" || href === "/dashboard") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function topNavLinkClassNames(args: {
  layout: "desktop" | "mobile";
  active: boolean;
  baseDesktop: string;
  baseMobile: string;
  activeDesktop: string;
  activeMobile: string;
}): string {
  const base = args.layout === "mobile" ? args.baseMobile : args.baseDesktop;
  if (!args.active) {
    return base;
  }
  const active =
    args.layout === "mobile" ? args.activeMobile : args.activeDesktop;
  return `${base} ${active}`;
}
