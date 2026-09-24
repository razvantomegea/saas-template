import { expect, test } from "../fixtures/test";

import { byTestId, DataTestId } from "../fixtures/test-id";

test("German locale prefix sets the document language", async ({ page }) => {
  await page.goto("/de");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(byTestId(page, DataTestId.MarketingHeader)).toBeVisible();
});

test("German help page shows translated title and chrome", async ({ page }) => {
  await page.goto("/de/help");

  await expect(byTestId(page, DataTestId.HelpTitle)).toBeVisible();
  await expect(byTestId(page, DataTestId.HelpSupportForm)).toBeVisible();
});

test("German privacy page shows translated title and disclaimer", async ({
  page,
}) => {
  await page.goto("/de/privacy");

  await expect(byTestId(page, DataTestId.PrivacyTitle)).toBeVisible();
  await expect(byTestId(page, DataTestId.PrivacyDisclaimer)).toBeVisible();
});
