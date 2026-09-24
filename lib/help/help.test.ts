import { beforeEach, describe, expect, it, vi } from "vitest";

import { FAQ_SECTIONS, formatFaqForPrompt } from "@/lib/docs/faq-content";
import { buildHelpBotSystemPrompt } from "@/lib/help/help-bot-prompt";
import {
  resolveGithubFeedbackUrl,
  resolveGithubNewIssueUrl,
} from "@/lib/help/constants";
import { createSupportTicketSchema } from "@/lib/help/support-ticket-schema";
import { LEGAL_CONTACT_EMAIL, LEGAL_PRODUCT_NAME } from "@/lib/legal/constants";

describe("faq-content", () => {
  it("has sections with Q&A", () => {
    expect(FAQ_SECTIONS.length).toBeGreaterThan(0);
    expect(FAQ_SECTIONS.every((s) => s.items.length > 0)).toBe(true);
  });

  it("formats prompt text with questions", () => {
    const prompt = formatFaqForPrompt();
    expect(prompt).toContain(`What is ${LEGAL_PRODUCT_NAME}?`);
    expect(prompt).toContain("## Getting started");
  });
});

describe("help-bot-prompt", () => {
  it("includes FAQ grounding and escalation rules", () => {
    const system = buildHelpBotSystemPrompt();
    expect(system).toContain(`${LEGAL_PRODUCT_NAME} Help assistant`);
    expect(system).toContain(LEGAL_CONTACT_EMAIL);
    expect(system).toContain("=== FAQ ===");
  });
});

describe("createSupportTicketSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = createSupportTicketSchema.safeParse({
      category: "bug",
      email: "user@example.com",
      subject: "Billing portal error",
      body: "Manage subscription fails after checkout with a 500 response.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects short bodies", () => {
    const parsed = createSupportTicketSchema.safeParse({
      category: "question",
      email: "user@example.com",
      subject: "Hi",
      body: "too short",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("github feedback urls", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GITHUB_FEEDBACK_URL", "");
    expect(resolveGithubFeedbackUrl()).toBeNull();
    expect(resolveGithubNewIssueUrl()).toBeNull();
  });

  it("appends new/choose for issues list urls", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_GITHUB_FEEDBACK_URL",
      "https://github.com/acme/feedback/issues/",
    );
    expect(resolveGithubFeedbackUrl()).toBe(
      "https://github.com/acme/feedback/issues",
    );
    expect(resolveGithubNewIssueUrl()).toBe(
      "https://github.com/acme/feedback/issues/new/choose",
    );
  });
});
