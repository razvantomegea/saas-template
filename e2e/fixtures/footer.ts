import { expect, type BrowserContext, type Page } from "@playwright/test";

import {
  LEGAL_COMPANY_WEBSITE_URL_PATTERN,
  LEGAL_PRIVACY_PATH,
  LEGAL_TERMS_PATH,
} from "../../lib/legal/constants";
import {
  clickKeepsPageOnSameUrl,
  clickOpensExternalPage,
  clickOpensPageInSameTab,
} from "./links";
import { byTestId, DataTestId } from "./test-id";

async function waitForFooter(page: Page): Promise<void> {
  await byTestId(page, DataTestId.FooterPrivacyLink).waitFor({
    state: "visible",
  });
}

export async function expectFooterLinksOpenCorrectUrls({
  page,
  context,
  originPath,
}: {
  page: Page;
  context: BrowserContext;
  originPath: string;
}) {
  for (const openPage of context.pages()) {
    if (openPage !== page && !openPage.isClosed()) {
      await openPage.close();
    }
  }
  await page.bringToFront();

  const privacyLink = byTestId(page, DataTestId.FooterPrivacyLink);
  await clickOpensPageInSameTab({
    page,
    link: privacyLink,
    expectedUrl: LEGAL_PRIVACY_PATH,
  });
  await expect(byTestId(page, DataTestId.PrivacyTitle)).toBeVisible();

  await page.goto(originPath);
  await waitForFooter(page);

  const termsLink = byTestId(page, DataTestId.FooterTermsLink);
  await clickOpensPageInSameTab({
    page,
    link: termsLink,
    expectedUrl: LEGAL_TERMS_PATH,
  });
  await expect(byTestId(page, DataTestId.TermsTitle)).toBeVisible();

  await page.goto(originPath);
  await waitForFooter(page);

  const contactLink = byTestId(page, DataTestId.FooterContactLink);
  await clickKeepsPageOnSameUrl({
    page,
    context,
    link: contactLink,
    expectedUrl: originPath,
  });

  await page.goto(originPath);
  await waitForFooter(page);

  const companyLink = byTestId(page, DataTestId.FooterCompanyLink);
  await clickOpensExternalPage({
    page,
    context,
    link: companyLink,
    expectedUrl: LEGAL_COMPANY_WEBSITE_URL_PATTERN,
  });
}
