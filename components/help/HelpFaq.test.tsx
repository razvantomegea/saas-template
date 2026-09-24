import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { HelpFaq } from "@/components/help/HelpFaq";
import { DataTestId } from "@/lib/constants/data-test-id";

afterEach(() => {
  cleanup();
  window.location.hash = "";
});

describe("HelpFaq", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders custom faq sections", () => {
    render(
      <HelpFaq
        sections={[
          {
            id: "billing",
            title: "Billing",
            items: [
              {
                id: "billing-trial",
                question: "How does the trial work?",
                answer: "Seven days on Starter.",
              },
            ],
          },
        ]}
        showDocsLink={false}
      />,
    );

    expect(
      screen.getByTestId(DataTestId.HelpFaqItem("billing-trial")),
    ).toHaveTextContent("How does the trial work?");
    expect(
      screen.queryByTestId(DataTestId.HelpFaqDocsLink),
    ).not.toBeInTheDocument();
  });

  it("opens the details element matching the location hash", () => {
    render(
      <HelpFaq
        sections={[
          {
            id: "billing",
            title: "Billing",
            items: [
              {
                id: "billing-trial",
                question: "How does the trial work?",
                answer: "Seven days on Starter.",
              },
            ],
          },
        ]}
        showDocsLink={false}
      />,
    );

    const details = screen.getByTestId(DataTestId.HelpFaqItem("billing-trial"));
    expect(details).toBeDefined();

    window.location.hash = "#billing-trial";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    expect(details).toHaveProperty("open", true);
  });
});
