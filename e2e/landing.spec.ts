import { expect, test } from "@playwright/test";

test("landing page renders hero and CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("SaaS Template");
  await expect(
    page.getByRole("link", { name: "Start free trial" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View pricing" })).toBeVisible();
});

test("pricing page lists plans", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: "Starter" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pro" })).toBeVisible();
});
