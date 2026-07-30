import { afterEach, describe, expect, it, vi } from "vitest";

const memory = new Map<string, string>();
const storage = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => {
    memory.set(key, value);
  },
  removeItem: (key: string) => {
    memory.delete(key);
  },
  clear: () => memory.clear(),
};

vi.stubGlobal("localStorage", storage);
vi.stubGlobal("window", {
  localStorage: storage,
  matchMedia: () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }),
});
vi.stubGlobal("document", {
  documentElement: { dataset: {} as Record<string, string> },
});
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
);

describe("motion intensity", () => {
  afterEach(() => {
    memory.clear();
    vi.resetModules();
  });

  it("defaults to full without OS reduce", async () => {
    const { resolveMotionIntensity } = await import("@/lib/motion-intensity");
    expect(resolveMotionIntensity(null)).toBe("full");
  });

  it("persists user override", async () => {
    const { setMotionIntensity, getMotionIntensity, isMotionRestricted } =
      await import("@/lib/motion-intensity");
    setMotionIntensity("off");
    expect(getMotionIntensity()).toBe("off");
    expect(isMotionRestricted()).toBe(true);
    expect(memory.get("showcase:motion-intensity")).toBe("off");
  });
});
