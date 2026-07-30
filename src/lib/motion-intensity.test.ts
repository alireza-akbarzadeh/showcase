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

vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  addListener: () => undefined,
  removeListener: () => undefined,
  dispatchEvent: () => false,
  onchange: null,
}));

describe("motion intensity", () => {
  afterEach(() => {
    memory.clear();
    vi.resetModules();
  });

  it("defaults to full when OS does not prefer reduced", async () => {
    const { resolveMotionIntensity, isMotionRestricted } = await import(
      "@/lib/motion-intensity"
    );
    expect(resolveMotionIntensity(null)).toBe("full");
    expect(isMotionRestricted()).toBe(false);
  });

  it("setMotionIntensity persists and restricts", async () => {
    const {
      setMotionIntensity,
      getMotionIntensity,
      isMotionRestricted,
    } = await import("@/lib/motion-intensity");

    setMotionIntensity("off");
    expect(getMotionIntensity()).toBe("off");
    expect(isMotionRestricted()).toBe(true);
    expect(memory.get("showcase:motion-intensity")).toBe("off");
  });
});
