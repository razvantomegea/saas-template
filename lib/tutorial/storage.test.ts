import { describe, expect, it } from "vitest";
import {
  readTutorialCompleted,
  writeTutorialCompleted,
} from "@/lib/tutorial/storage";

describe("tutorial completion storage", () => {
  it("defaults to not completed", () => {
    const store = new Map<string, string>();
    const storage = { getItem: (key: string) => store.get(key) ?? null };
    expect(readTutorialCompleted(storage)).toBe(false);
  });

  it("round-trips through storage", () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    };

    writeTutorialCompleted(storage);
    expect(readTutorialCompleted(storage)).toBe(true);
  });

  it("fails closed when storage is unavailable", () => {
    expect(readTutorialCompleted(null)).toBe(false);
    expect(() => writeTutorialCompleted(null)).not.toThrow();
  });
});
