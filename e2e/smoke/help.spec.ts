import { expect, test } from "../fixtures/test";

import { byTestId, DataTestId } from "../fixtures/test-id";

test.describe("help", () => {
  test("shows FAQ and private support form", async ({ page }) => {
    await page.goto("/help");

    await expect(byTestId(page, DataTestId.HelpTitle)).toHaveText(
      /Help & FAQ/i,
    );
    await expect(byTestId(page, DataTestId.HelpFaq)).toBeVisible();
    await expect(byTestId(page, DataTestId.HelpSupportForm)).toBeVisible();
    await expect(byTestId(page, DataTestId.HelpChatToggle)).toBeVisible();
    await expect(byTestId(page, DataTestId.FooterHelpLink)).toBeVisible();
  });
});
