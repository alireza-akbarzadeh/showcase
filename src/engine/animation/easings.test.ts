import { describe, expect, it } from "vitest";
import {
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  getEasing,
  linear,
} from "@/engine/animation/easings";

describe("easings", () => {
  it("anchors at 0 and 1", () => {
    for (const ease of [linear, easeInCubic, easeOutCubic, easeInOutCubic]) {
      expect(ease(0)).toBe(0);
      expect(ease(1)).toBe(1);
    }
  });

  it("resolves named easings", () => {
    expect(getEasing("linear")).toBe(linear);
    expect(getEasing("easeOutCubic")(0.5)).toBeCloseTo(easeOutCubic(0.5));
  });
});
