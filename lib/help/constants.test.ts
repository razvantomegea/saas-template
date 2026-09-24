import { afterEach, describe, expect, it, vi } from "vitest";

import {
  resolveGithubFeedbackUrl,
  resolveGithubNewIssueUrl,
} from "@/lib/help/constants";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("help constants", () => {
  it("returns null when feedback url is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GITHUB_FEEDBACK_URL", "");
    expect(resolveGithubFeedbackUrl()).toBeNull();
    expect(resolveGithubNewIssueUrl()).toBeNull();
  });

  it("strips trailing slashes from the feedback url", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_GITHUB_FEEDBACK_URL",
      "https://github.com/org/repo/issues///",
    );
    expect(resolveGithubFeedbackUrl()).toBe(
      "https://github.com/org/repo/issues",
    );
  });

  it("builds a new-issue url unless already present", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_GITHUB_FEEDBACK_URL",
      "https://github.com/org/repo/issues",
    );
    expect(resolveGithubNewIssueUrl()).toBe(
      "https://github.com/org/repo/issues/new/choose",
    );

    vi.stubEnv(
      "NEXT_PUBLIC_GITHUB_FEEDBACK_URL",
      "https://github.com/org/repo/issues/new",
    );
    expect(resolveGithubNewIssueUrl()).toBe(
      "https://github.com/org/repo/issues/new",
    );
  });
});
