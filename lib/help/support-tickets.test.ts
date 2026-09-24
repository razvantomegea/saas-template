import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db", () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
  },
}));

import { notifyOperatorOfTicket } from "@/lib/help/support-tickets";

describe("notifyOperatorOfTicket", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("no-ops when webhook env is unset", async () => {
    vi.stubEnv("SUPPORT_NOTIFY_WEBHOOK", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await notifyOperatorOfTicket({
      id: "ticket-1",
      category: "billing",
      subject: "Help",
      email: "a@example.com",
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("logs non-ok webhook responses without throwing", async () => {
    vi.stubEnv("SUPPORT_NOTIFY_WEBHOOK", "https://hooks.example/notify");
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 502 });
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      notifyOperatorOfTicket({
        id: "ticket-1",
        category: "billing",
        subject: "Help",
        email: "a@example.com",
      }),
    ).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      "[support] notifyOperator webhook failed",
      expect.objectContaining({ status: 502, id: "ticket-1" }),
    );
  });

  it("logs network exceptions without throwing", async () => {
    vi.stubEnv("SUPPORT_NOTIFY_WEBHOOK", "https://hooks.example/notify");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      notifyOperatorOfTicket({
        id: "ticket-1",
        category: "billing",
        subject: "Help",
        email: "a@example.com",
      }),
    ).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith(
      "[support] notifyOperator failed",
      expect.any(Error),
    );
  });
});
