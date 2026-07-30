import { afterEach, describe, expect, it, vi } from "vitest";

const memory = new Map<string, string>();

vi.stubGlobal("localStorage", {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => {
    memory.set(key, value);
  },
  removeItem: (key: string) => {
    memory.delete(key);
  },
  clear: () => {
    memory.clear();
  },
});

describe("achievements", () => {
  afterEach(() => {
    memory.clear();
    vi.resetModules();
  });

  it("unlocks once and notifies listeners", async () => {
    const {
      unlockAchievement,
      isAchievementUnlocked,
      subscribeAchievements,
    } = await import("@/lib/achievements");

    const seen: string[] = [];
    const unsub = subscribeAchievements((id) => seen.push(id));

    expect(unlockAchievement("first-scroll")).toBe(true);
    expect(unlockAchievement("first-scroll")).toBe(false);
    expect(isAchievementUnlocked("first-scroll")).toBe(true);
    expect(seen).toEqual(["first-scroll"]);
    unsub();
  });
});
