/* eslint-disable react-hooks/rules-of-hooks -- Playwright fixture, not React */
import { test as base, expect } from "@playwright/test";
import { COOKIE_CONSENT_STORAGE_KEY } from "../../lib/analytics/cookie-consent";
import { PWA_INSTALL_DISMISS_KEY } from "../../lib/pwa/install";
import { gotoWithRetry } from "./goto";

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript((storageKey) => {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          analytics: true,
          decidedAt: new Date().toISOString(),
        }),
      );
    }, COOKIE_CONSENT_STORAGE_KEY);
    await context.addInitScript((storageKey) => {
      window.localStorage.setItem(storageKey, "1");
    }, PWA_INSTALL_DISMISS_KEY);
    await use(context);
  },
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);
    page.goto = ((url, options) =>
      gotoWithRetry(originalGoto, url, options)) as typeof page.goto;
    await use(page);
  },
});

export { expect };
