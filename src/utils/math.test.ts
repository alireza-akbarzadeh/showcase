import { describe, expect, it } from "vitest";
import {
  approx,
  clamp,
  damp,
  inverseLerp,
  lerp,
  mapRange,
  mod,
} from "@/utils/math";

describe("clamp", () => {
  it("clamps below min and above max", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("lerp", () => {
  it("interpolates between endpoints", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});

describe("inverseLerp", () => {
  it("returns normalized position in range", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
    expect(inverseLerp(0, 10, -5)).toBe(0);
    expect(inverseLerp(0, 10, 20)).toBe(1);
  });

  it("returns 0 when range collapses", () => {
    expect(inverseLerp(3, 3, 3)).toBe(0);
  });
});

describe("mapRange", () => {
  it("remaps across ranges", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 10, 100, 200)).toBe(100);
  });
});

describe("damp", () => {
  it("moves toward target without overshooting at rest", () => {
    const next = damp(0, 10, 5, 1 / 60);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(10);
    expect(approx(damp(10, 10, 5, 1 / 60), 10)).toBe(true);
  });
});

describe("mod", () => {
  it("wraps negative values into positive modulus", () => {
    expect(mod(-1, 4)).toBe(3);
    expect(mod(5, 4)).toBe(1);
  });
});

describe("approx", () => {
  it("compares within epsilon", () => {
    expect(approx(1, 1.00005, 0.0001)).toBe(true);
    expect(approx(1, 1.001, 0.0001)).toBe(false);
  });
});
