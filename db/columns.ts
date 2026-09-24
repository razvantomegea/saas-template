import { timestamp } from "drizzle-orm/pg-core";

const TIMESTAMP_TZ = { withTimezone: true, mode: "date" } as const;

/** New builder per call — Drizzle column instances cannot be shared across tables. */
export function timestamptz(name: string) {
  return timestamp(name, TIMESTAMP_TZ);
}

export function timestampNow(name: string) {
  return timestamptz(name).notNull().defaultNow();
}

export function createdAtNow() {
  return timestampNow("created_at");
}

export function updatedAtNow() {
  return timestampNow("updated_at");
}

export function auditTimestamps() {
  return {
    createdAt: createdAtNow(),
    updatedAt: updatedAtNow(),
  };
}
