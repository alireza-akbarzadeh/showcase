import { describe, expect, it } from "vitest";
import {
  chapterLocal,
  morphAmount,
  shouldUpdateMetric,
} from "@/components/creative/scenes/project-progress";

describe("chapterLocal", () => {
  it("maps progress into a chapter window", () => {
    expect(chapterLocal(0.1, 0.2, 0.4)).toBe(0);
    expect(chapterLocal(0.3, 0.2, 0.4)).toBeCloseTo(0.5);
    expect(chapterLocal(0.5, 0.2, 0.4)).toBe(1);
  });
});

describe("morphAmount", () => {
  it("starts near peek and settles to immersion", () => {
    expect(morphAmount(0)).toBeCloseTo(1);
    expect(morphAmount(0.22)).toBeCloseTo(0);
    expect(morphAmount(0.5)).toBe(0);
  });
});

describe("shouldUpdateMetric", () => {
  it("throttles by frame id", () => {
    expect(shouldUpdateMetric(0, 2)).toBe(true);
    expect(shouldUpdateMetric(1, 2)).toBe(false);
    expect(shouldUpdateMetric(2, 2)).toBe(true);
  });
});
