import { resolveCallbackUrl } from "@/lib/better-auth/resolve-callback-url";

export type AuthCallbackUrls = {
  callbackURL: string;
  errorCallbackURL: string;
};

export type AuthCallbackSource = "login" | "signup";

export type BuildAuthCallbackUrlsOptions = {
  source?: AuthCallbackSource;
};

export function buildAuthCallbackUrls(
  next: string | null,
  options?: BuildAuthCallbackUrlsOptions,
): AuthCallbackUrls {
  const callbackURL = resolveCallbackUrl(next);
  const params = new URLSearchParams({ next: callbackURL });
  const source = options?.source ?? "login";

  return {
    callbackURL,
    errorCallbackURL: `/${source}?${params.toString()}`,
  };
}
