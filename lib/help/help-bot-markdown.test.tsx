import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  HelpBotMarkdown,
  renderHelpBotInline,
} from "@/lib/help/help-bot-markdown";

afterEach(() => {
  cleanup();
});

describe("renderHelpBotInline", () => {
  it("renders bold without leaving ** markers", () => {
    const { container } = render(
      <>{renderHelpBotInline("Status **BLOCKED** here", "t")}</>,
    );
    expect(container.textContent).toBe("Status BLOCKED here");
    expect(container.querySelector("strong")?.textContent).toBe("BLOCKED");
    expect(container.textContent).not.toContain("**");
  });

  it("renders inline code", () => {
    const { container } = render(
      <>{renderHelpBotInline("Use `Mirror Ownership`", "t")}</>,
    );
    expect(container.querySelector("code")?.textContent).toBe(
      "Mirror Ownership",
    );
  });
});

describe("HelpBotMarkdown", () => {
  it("renders BLOCKED/STANDBY list reply without raw markdown", () => {
    const text = [
      "Your Slave account might be showing one of two statuses:",
      "",
      "* **BLOCKED**: Same broker login as a Master path.",
      "* **STANDBY**: Another terminal took Mirror Ownership.",
      "",
      "If these do not cover your error, use the support form.",
    ].join("\n");

    const { container } = render(<HelpBotMarkdown text={text} />);

    const strongTexts = Array.from(container.querySelectorAll("strong")).map(
      (node) => node.textContent,
    );
    expect(strongTexts).toContain("BLOCKED");
    expect(strongTexts).toContain("STANDBY");
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toMatch(/^\s*\*\s/m);

    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(2);
    expect(items[0]?.textContent).toContain("Same broker login");
    expect(items[1]?.textContent).toContain("Mirror Ownership");
  });

  it("supports dash list markers", () => {
    const { container } = render(
      <HelpBotMarkdown text={"- first\n- second"} />,
    );
    expect(container.querySelectorAll("li")).toHaveLength(2);
  });

  it("preserves soft newlines inside a paragraph", () => {
    const { container } = render(
      <HelpBotMarkdown text={"Line one\nLine two"} />,
    );
    expect(container.querySelectorAll("br")).toHaveLength(1);
    expect(container.textContent).toBe("Line oneLine two");
  });

  it("returns null for blank text and supports plus list markers", () => {
    const { container: empty } = render(<HelpBotMarkdown text={"   \n\n"} />);
    expect(empty).toBeEmptyDOMElement();

    const { container } = render(
      <HelpBotMarkdown text={"+ first\n+ second\r\n\nplain"} />,
    );
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelector("p")?.textContent).toBe("plain");
  });

  it("ignores unmatched bold/code markers", () => {
    const { container } = render(
      <>{renderHelpBotInline("a *b* c `open", "x")}</>,
    );
    expect(container.textContent).toBe("a *b* c `open");
    expect(container.querySelector("strong")).toBeNull();
    expect(container.querySelector("code")).toBeNull();
  });
});
