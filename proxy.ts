import { NextRequest, NextResponse } from "next/server";
import { getMiddlewareSession } from "@/lib/better-auth/middleware-session";
import { isE2eMockDashboard } from "@/lib/e2e/mock-dashboard";
import {
  isAppLocale,
  LOCALE_REQUEST_HEADER,
  type AppLocale,
} from "@/lib/i18n/locales";
import { localizedPath, stripLocalePrefix } from "@/lib/i18n/routing";
import { isBlockedScraperUserAgent } from "@/lib/security/scraper-bots";
import { isPublicRoute } from "@/lib/seo/site";

const AUTH_PATHS = ["/login", "/signup", "/forgot-password"];
const AUTH_ERROR_PARAMS = ["error", "error_description"] as const;

function redirectToLogin(
  request: NextRequest,
  nextPath: string,
  locale: AppLocale,
): NextResponse {
  const loginUrl = new URL(localizedPath(locale, "/login"), request.url);
  loginUrl.searchParams.set("next", nextPath);

  for (const key of AUTH_ERROR_PARAMS) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) {
      loginUrl.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(loginUrl);
}

function withLocaleHeader(
  request: NextRequest,
  locale: AppLocale,
  rewritePathname?: string,
): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_REQUEST_HEADER, locale);

  if (
    rewritePathname !== undefined &&
    rewritePathname !== request.nextUrl.pathname
  ) {
    const url = request.nextUrl.clone();
    url.pathname = rewritePathname;
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export async function proxy(request: NextRequest) {
  const rawPathname = request.nextUrl.pathname;

  if (rawPathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (isBlockedScraperUserAgent(request.headers.get("user-agent"))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const firstSegment = rawPathname.split("/").filter(Boolean)[0];
  const hadLocalePrefix = Boolean(firstSegment && isAppLocale(firstSegment));
  const { locale, pathname } = stripLocalePrefix(rawPathname);
  const rewriteTo = hadLocalePrefix ? pathname : undefined;

  if (isE2eMockDashboard()) {
    return withLocaleHeader(request, locale, rewriteTo);
  }

  const session = getMiddlewareSession(request);
  const isPublic = isPublicRoute(pathname);
  const isAuthPage = AUTH_PATHS.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  if (session?.user && isAuthPage) {
    return NextResponse.redirect(
      new URL(localizedPath(locale, "/dashboard"), request.url),
    );
  }

  if (!session?.user && isDashboard) {
    return redirectToLogin(request, localizedPath(locale, pathname), locale);
  }

  if (!session?.user && !isPublic && !pathname.startsWith("/_next")) {
    return redirectToLogin(request, localizedPath(locale, pathname), locale);
  }

  return withLocaleHeader(request, locale, rewriteTo);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
