import { expect, test } from "../fixtures/test";

import { formatAppVersion } from "../../lib/app-version";
import {
  getCopyrightNotice,
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
} from "../../lib/legal/constants";
import { expectFooterLinksOpenCorrectUrls } from "../fixtures/footer";
import { byTestId, DataTestId } from "../fixtures/test-id";

test("privacy page shows GDPR policy and company details", async ({ page }) => {
  await page.goto("/privacy");

  await expect(byTestId(page, DataTestId.PrivacyTitle)).toHaveText(
    "Privacy Policy",
  );
  const main = byTestId(page, DataTestId.LegalMain);
  await expect(main).toContainText(LEGAL_COMPANY_NAME);
  await expect(main).toContainText(LEGAL_CUI);
  await expect(byTestId(page, DataTestId.FooterContactLink)).toHaveText(
    LEGAL_CONTACT_EMAIL,
  );
});

test("terms page shows refund policy and company details", async ({ page }) => {
  await page.goto("/terms");

  await expect(byTestId(page, DataTestId.TermsTitle)).toHaveText(
    "Terms of Service",
  );
  await expect(byTestId(page, DataTestId.LegalMain)).toContainText(
    LEGAL_COMPANY_NAME,
  );
  await expect(
    byTestId(page, DataTestId.LegalSectionHeading("6-refund-policy")),
  ).toBeVisible();
  await expect(
    byTestId(page, DataTestId.LegalSectionHeading("7-right-of-withdrawal")),
  ).toBeVisible();
});

test("cookies page shows cookies policy", async ({ page }) => {
  await page.goto("/cookies");
  await expect(byTestId(page, DataTestId.CookiesTitle)).toHaveText(
    "Cookies Policy",
  );
  await expect(byTestId(page, DataTestId.LegalMain)).toContainText(
    LEGAL_COMPANY_NAME,
  );
});

test("login footer links open correct urls when clicked", async ({
  page,
  context,
}) => {
  await page.goto("/login");
  await expectFooterLinksOpenCorrectUrls({
    page,
    context,
    originPath: "/login",
  });
});

test("marketing footer links open correct urls when clicked", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await expectFooterLinksOpenCorrectUrls({ page, context, originPath: "/" });
  await expect(byTestId(page, DataTestId.FooterCopyright)).toHaveText(
    getCopyrightNotice(),
  );
  await expect(byTestId(page, DataTestId.FooterVersion)).toHaveText(
    formatAppVersion(),
  );
});

test("dashboard footer links open correct urls when clicked", async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("saas-template:tutorial-completed", "1");
  });
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Welcome back" }),
  ).toBeVisible();
  await expectFooterLinksOpenCorrectUrls({
    page,
    context,
    originPath: "/dashboard",
  });
  await expect(byTestId(page, DataTestId.FooterVersion)).toHaveText(
    formatAppVersion(),
  );
});
