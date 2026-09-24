import {
  expect,
  type BrowserContext,
  type Locator,
  type Page,
  type Route,
} from "@playwright/test";

async function preparePageForLinkClick(
  page: Page,
  context: BrowserContext,
): Promise<void> {
  for (const openPage of context.pages()) {
    if (openPage !== page && !openPage.isClosed()) {
      await openPage.close();
    }
  }
  await page.bringToFront();
}

export function pageUrlMatches(
  pageUrl: string,
  expectedUrl: string | RegExp,
): boolean {
  if (expectedUrl instanceof RegExp) {
    return expectedUrl.test(pageUrl);
  }

  const { pathname } = new URL(pageUrl);
  return pathname === expectedUrl || pathname === `${expectedUrl}/`;
}

export async function clickUntil({
  control,
  assert,
  timeout = 20_000,
}: {
  control: Locator;
  assert: () => Promise<void>;
  timeout?: number;
}): Promise<void> {
  await expect(control).toBeVisible();
  await expect(async () => {
    await control.click();
    await assert();
  }).toPass({ timeout });
}

export async function clickUntilVisible({
  control,
  target,
}: {
  control: Locator;
  target: Locator;
}): Promise<void> {
  await clickUntil({
    control,
    timeout: 15_000,
    assert: async () => {
      await expect(target).toBeVisible({ timeout: 1_000 });
    },
  });
}

export async function clickUntilUrl({
  page,
  control,
  expectedUrl,
  timeout = 20_000,
}: {
  page: Page;
  control: Locator;
  expectedUrl: string | RegExp;
  timeout?: number;
}): Promise<void> {
  await expect(control).toBeVisible();
  await expect(async () => {
    if (!pageUrlMatches(page.url(), expectedUrl)) {
      await control.click();
    }
    // toHaveURL(predicate) uses waitForURL, which waits for `load` when the
    // URL already matches. Third-party iframes can delay `load` while the
    // pathname is already correct.
    await expect
      .poll(
        () => (pageUrlMatches(page.url(), expectedUrl) ? true : page.url()),
        {
          timeout: 5_000,
        },
      )
      .toBe(true);
  }).toPass({ timeout });
}

export async function clickOpensPageInSameTab({
  page,
  link,
  expectedUrl,
}: {
  page: Page;
  link: Locator;
  expectedUrl: string | RegExp;
}): Promise<void> {
  await link.scrollIntoViewIfNeeded();
  await clickUntilUrl({
    page,
    control: link,
    expectedUrl,
    timeout: 45_000,
  });
}

const STUBBED_EXTERNAL_PAGE_BODY =
  "<!DOCTYPE html><html><body>ok</body></html>";

export function destinationOriginFromHref(href: string): string {
  try {
    return new URL(href).origin;
  } catch {
    throw new Error(`External link href is not an absolute URL: ${href}`);
  }
}

async function fulfillStubbedExternalPage(route: Route): Promise<void> {
  await route.fulfill({
    status: 200,
    contentType: "text/html",
    body: STUBBED_EXTERNAL_PAGE_BODY,
  });
}

export async function clickOpensExternalPage({
  page,
  context,
  link,
  expectedUrl,
}: {
  page: Page;
  context: BrowserContext;
  link: Locator;
  expectedUrl: string | RegExp;
}): Promise<void> {
  await preparePageForLinkClick(page, context);
  await expect(link).toBeVisible();
  await link.scrollIntoViewIfNeeded();

  const href = await link.getAttribute("href");
  if (href == null || href === "") {
    throw new Error("External link is missing href");
  }
  const destinationOrigin = destinationOriginFromHref(href);
  const isDestinationOrigin = (url: URL) => url.origin === destinationOrigin;

  // Stub the destination so smoke tests do not depend on third-party sites being up.
  await context.route(isDestinationOrigin, fulfillStubbedExternalPage);
  try {
    const [externalPage] = await Promise.all([
      context.waitForEvent("page"),
      link.click(),
    ]);
    await expect(externalPage).toHaveURL(expectedUrl);
    await externalPage.close();
  } finally {
    await context.unroute(isDestinationOrigin, fulfillStubbedExternalPage);
  }
}

export async function clickKeepsPageOnSameUrl({
  page,
  context,
  link,
  expectedUrl,
}: {
  page: Page;
  context: BrowserContext;
  link: Locator;
  expectedUrl: string | RegExp;
}): Promise<void> {
  await expect(link).toBeVisible();

  const pageCountBefore = context.pages().length;
  const noPopupPromise = context
    .waitForEvent("page", { timeout: 500 })
    .then(async (newPage) => {
      await newPage.close().catch(() => undefined);
      throw new Error(
        "Expected link click to stay on the same page, but a new page opened.",
      );
    })
    .catch((error: unknown) => {
      if (
        error instanceof Error &&
        error.message.includes("Expected link click")
      ) {
        throw error;
      }
    });

  await Promise.all([link.click(), noPopupPromise]);
  await expect(page).toHaveURL(expectedUrl);
  await expect
    .poll(() => context.pages().length, { timeout: 500 })
    .toBe(pageCountBefore);
}
