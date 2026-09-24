import { expect, test } from "@playwright/test";

// Requires E2E_MOCK_DASHBOARD=true (set by playwright.config.ts webServer.env),
// which bypasses the session gate in proxy.ts and dashboard pages.
test("mock dashboard home renders without a real session", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Welcome back" }),
  ).toBeVisible();
});

test("mock dashboard notes page renders the create form", async ({ page }) => {
  await page.goto("/dashboard/notes");
  await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();
});
