import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { DataTestId } from "@/lib/constants/data-test-id";
import type { LegalDocumentContent } from "@/lib/legal/types";

const sampleContent: LegalDocumentContent = {
  title: "Sample Policy",
  lastUpdated: "9 June 2026",
  intro: ["Intro paragraph one.", "Intro paragraph two."],
  sections: [
    {
      title: "1. Overview",
      paragraphs: ["Section paragraph."],
      bullets: ["Bullet one", "Bullet two"],
    },
    {
      title: "2. Details",
      paragraphs: ["Another paragraph."],
    },
  ],
};

describe("LegalDocument", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders title, intro, sections, and bullets", () => {
    render(
      <LegalDocument
        content={sampleContent}
        titleTestId={DataTestId.PrivacyTitle}
      />,
    );

    const title = screen.getByTestId(DataTestId.PrivacyTitle);
    expect(title).toHaveTextContent("Sample Policy");
    const header = title.closest("header");
    expect(header).toHaveTextContent(/Last updated: 9 June 2026/);
    expect(header).toHaveTextContent("Intro paragraph one.");

    const overviewHeading = screen.getByTestId(
      DataTestId.LegalSectionHeading("1-overview"),
    );
    expect(overviewHeading).toHaveTextContent("1. Overview");
    expect(overviewHeading.closest("section")).toHaveTextContent("Bullet one");

    expect(
      screen.getByTestId(DataTestId.LegalSectionHeading("2-details")),
    ).toHaveTextContent("2. Details");
  });
});
