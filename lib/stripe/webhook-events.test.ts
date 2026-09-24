import { describe, expect, it, vi } from "vitest";

const { insertMock, deleteMock } = vi.hoisted(() => ({
  insertMock: vi.fn(),
  deleteMock: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    insert: insertMock,
    delete: deleteMock,
  },
}));

vi.mock("@/db/schema", () => ({
  processedWebhookEvents: { eventId: "event_id" },
}));

import {
  releaseStripeWebhookEvent,
  reserveStripeWebhookEvent,
} from "@/lib/stripe/webhook-events";

describe("reserveStripeWebhookEvent", () => {
  it("returns true when the insert reserves a new row", async () => {
    insertMock.mockReturnValue({
      values: () => ({
        onConflictDoNothing: () => ({
          returning: () => Promise.resolve([{ eventId: "evt_1" }]),
        }),
      }),
    });

    await expect(reserveStripeWebhookEvent("evt_1")).resolves.toBe(true);
  });

  it("returns false when the event was already processed", async () => {
    insertMock.mockReturnValue({
      values: () => ({
        onConflictDoNothing: () => ({
          returning: () => Promise.resolve([]),
        }),
      }),
    });

    await expect(reserveStripeWebhookEvent("evt_1")).resolves.toBe(false);
  });
});

describe("releaseStripeWebhookEvent", () => {
  it("deletes the reservation row", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    deleteMock.mockReturnValue({ where });

    await releaseStripeWebhookEvent("evt_1");

    expect(deleteMock).toHaveBeenCalled();
    expect(where).toHaveBeenCalled();
  });
});
