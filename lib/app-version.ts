/** Synced from package.json by `pnpm version:bump`. */
export const PACKAGED_APP_VERSION = "1.0.0";

export const APP_VERSION = PACKAGED_APP_VERSION;

export function formatAppVersion(version: string = APP_VERSION): string {
  return `v${version}`;
}
