import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DataTestId } from "@/lib/constants/data-test-id";

let pathname = "/login";
const assign = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

vi.mock("@/components/i18n/LocaleProvider", () => ({
  useLocale: () => "en",
  useT: () => (key: string) => key,
}));

import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    assign.mockClear();
    pathname = "/login";
    window.history.replaceState({}, "", "/login");
    vi.stubGlobal("location", {
      ...window.location,
      search: "",
      assign,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("preserves the next query when switching locale", () => {
    vi.stubGlobal("location", {
      ...window.location,
      search: "?next=%2Fdashboard%2Fbilling",
      assign,
    });

    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByTestId(DataTestId.LocaleSwitcher));
    fireEvent.click(
      screen.getByTestId(
        DataTestId.SelectOption(DataTestId.LocaleSwitcher, "de"),
      ),
    );

    expect(assign).toHaveBeenCalledWith(
      "/de/login?next=%2Fdashboard%2Fbilling",
    );
  });

  it("assigns locale path without query when search is empty", () => {
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByTestId(DataTestId.LocaleSwitcher));
    fireEvent.click(
      screen.getByTestId(
        DataTestId.SelectOption(DataTestId.LocaleSwitcher, "fr"),
      ),
    );

    expect(assign).toHaveBeenCalledWith("/fr/login");
  });

  it("renders a visible label when showLabel is set", () => {
    render(<LocaleSwitcher showLabel fullWidth />);

    expect(
      screen.getByTestId(DataTestId.LocaleSwitcherLabel),
    ).toHaveTextContent("nav.language");
    expect(screen.getByTestId(DataTestId.LocaleSwitcher)).toBeTruthy();
  });
});
