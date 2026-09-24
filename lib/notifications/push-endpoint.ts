import { isIP } from "node:net";

/** Host suffixes for known browser push services (FCM, Mozilla, Apple, WNS). */
const ALLOWED_PUSH_HOST_SUFFIXES = [
  ".googleapis.com",
  ".mozilla.com",
  ".mozilla.net",
  ".apple.com",
  ".windows.com",
  ".microsoft.com",
] as const;

const ALLOWED_PUSH_HOSTS = new Set([
  "fcm.googleapis.com",
  "android.googleapis.com",
  "updates.push.services.mozilla.com",
  "web.push.apple.com",
]);

function isPrivateOrLocalHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  const ipVersion = isIP(host);
  if (!ipVersion) {
    return false;
  }

  if (ipVersion === 4) {
    const parts = host.split(".").map((part) => Number(part));
    const [a, b] = parts;
    if (a === undefined || b === undefined) {
      return true;
    }
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }

  // IPv6 local/private ranges
  return (
    host === "::1" ||
    host.startsWith("fc") ||
    host.startsWith("fd") ||
    host.startsWith("fe80:")
  );
}

function isAllowedPushHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (ALLOWED_PUSH_HOSTS.has(host)) {
    return true;
  }
  return ALLOWED_PUSH_HOST_SUFFIXES.some(
    (suffix) => host === suffix.slice(1) || host.endsWith(suffix),
  );
}

/** True when endpoint is HTTPS to an allowlisted push provider (not private net). */
export function isAllowedPushEndpoint(endpoint: string): boolean {
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") {
    return false;
  }
  if (url.username || url.password) {
    return false;
  }
  if (isPrivateOrLocalHostname(url.hostname)) {
    return false;
  }
  return isAllowedPushHostname(url.hostname);
}
