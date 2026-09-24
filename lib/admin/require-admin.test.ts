import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

vi.mock("@/lib/better-auth/session", () => ({
  getServerSession: vi.fn(),
}));

import { getServerSession } from "@/lib/better-auth/session";
import { requireAdminSession } from "@/lib/admin/require-admin";

const adminId = "5476860e-9646-44f6-8169-3e0fc686470d";

describe("requireAdminSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("returns 404 when session is missing", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);

    await expect(requireAdminSession()).rejects.toThrow("NOT_FOUND");
  });

  it("returns 404 when ADMIN_USER_IDS is empty", async () => {
    vi.stubEnv("ADMIN_USER_IDS", "");
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: adminId, email: "a@b.com", name: "Admin" },
    } as never);

    await expect(requireAdminSession()).rejects.toThrow("NOT_FOUND");
  });

  it("returns 404 when user is not listed as admin", async () => {
    vi.stubEnv("ADMIN_USER_IDS", adminId);
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: "other-user", email: "b@b.com", name: "User" },
    } as never);

    await expect(requireAdminSession()).rejects.toThrow("NOT_FOUND");
  });

  it("returns session for listed admin", async () => {
    vi.stubEnv("ADMIN_USER_IDS", adminId);
    const session = {
      user: { id: adminId, email: "a@b.com", name: "Admin" },
    };
    vi.mocked(getServerSession).mockResolvedValue(session as never);

    await expect(requireAdminSession()).resolves.toBe(session);
  });
});
