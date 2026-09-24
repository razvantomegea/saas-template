import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { DataTestId } from "@/lib/constants/data-test-id";

describe("LegalPageShell", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders header, main content, and footer", () => {
    render(
      <LegalPageShell>
        <p data-testid={DataTestId.PageContent}>Legal body</p>
      </LegalPageShell>,
    );

    expect(screen.getByTestId(DataTestId.MarketingHeader)).toBeInTheDocument();
    expect(screen.getByTestId(DataTestId.PageContent)).toHaveTextContent(
      "Legal body",
    );
    expect(screen.getByTestId(DataTestId.LegalMain)).toBeInTheDocument();
    expect(screen.getByTestId(DataTestId.MarketingFooter)).toBeInTheDocument();
  });
});
