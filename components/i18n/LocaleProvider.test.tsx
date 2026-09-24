import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DataTestId } from "@/lib/constants/data-test-id";

vi.mock("next/navigation", () => ({
  usePathname: () => "/de/pricing",
}));

import {
  LocaleProvider,
  useLocale,
  useMessages,
  useT,
} from "@/components/i18n/LocaleProvider";

function Probe() {
  const locale = useLocale();
  const t = useT();
  const messages = useMessages();
  return (
    <div>
      <span data-testid={DataTestId.LocaleProbeLocale}>{locale}</span>
      <span data-testid={DataTestId.LocaleProbePricing}>
        {t("nav.pricing")}
      </span>
      <span data-testid={DataTestId.LocaleProbeHasNav}>
        {String(Boolean(messages.nav))}
      </span>
    </div>
  );
}

describe("LocaleProvider", () => {
  afterEach(() => {
    cleanup();
  });

  it("prefers pathname locale over server locale prop", () => {
    render(
      <LocaleProvider locale="en">
        <Probe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId(DataTestId.LocaleProbeLocale)).toHaveTextContent(
      "de",
    );
    expect(screen.getByTestId(DataTestId.LocaleProbePricing)).toHaveTextContent(
      "Preise",
    );
    expect(document.documentElement.lang).toBe("de");
  });

  it("falls back to defaults outside the provider", () => {
    render(<Probe />);

    expect(screen.getByTestId(DataTestId.LocaleProbeLocale)).toHaveTextContent(
      "en",
    );
    expect(screen.getByTestId(DataTestId.LocaleProbePricing)).toHaveTextContent(
      "Pricing",
    );
    expect(screen.getByTestId(DataTestId.LocaleProbeHasNav)).toHaveTextContent(
      "true",
    );
  });
});
