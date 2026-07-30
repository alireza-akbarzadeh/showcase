import { describe, expect, it } from "vitest";
import { easeInQuad } from "@/engine/animation/easings";
import { createTimeline, keyframes } from "@/engine/animation/timeline";

describe("keyframes", () => {
  it("maps tuples into keyframe objects", () => {
    expect(keyframes([0, 0], [1, 10, easeInQuad])).toEqual([
      { at: 0, value: 0, ease: undefined },
      { at: 1, value: 10, ease: easeInQuad },
    ]);
  });
});

describe("Timeline", () => {
  it("samples endpoints and midpoints for a linear track", () => {
    const timeline = createTimeline({
      id: "hero",
      tracks: [
        {
          id: "opacity",
          keyframes: keyframes([0, 0], [1, 1]),
        },
      ],
    });

    expect(timeline.getValue("opacity")).toBe(0);
    expect(timeline.setProgress(0.5).get("opacity")).toBe(0.5);
    expect(timeline.setProgress(1).get("opacity")).toBe(1);
    expect(timeline.getValue("missing")).toBe(0);
  });

  it("holds first/last values outside the keyframe span", () => {
    const timeline = createTimeline({
      id: "hold",
      tracks: [
        {
          id: "y",
          keyframes: keyframes([0.2, 10], [0.8, 20]),
        },
      ],
    });

    expect(timeline.setProgress(0).get("y")).toBe(10);
    expect(timeline.setProgress(1).get("y")).toBe(20);
  });

  it("applies easing on the destination keyframe", () => {
    const timeline = createTimeline({
      id: "eased",
      tracks: [
        {
          id: "x",
          keyframes: keyframes([0, 0], [1, 100, easeInQuad]),
        },
      ],
    });

    // easeInQuad(0.5) = 0.25 → value 25
    expect(timeline.setProgress(0.5).get("x")).toBe(25);
  });

  it("supports custom interpolate", () => {
    const timeline = createTimeline({
      id: "custom",
      tracks: [
        {
          id: "angle",
          keyframes: keyframes([0, 0], [1, 10]),
          interpolate: (a, b, t) => a + (b - a) * t * 2,
        },
      ],
    });

    expect(timeline.setProgress(0.5).get("angle")).toBe(10);
  });

  it("clears values on destroy", () => {
    const timeline = createTimeline({
      id: "tmp",
      tracks: [{ id: "v", keyframes: keyframes([0, 1]) }],
    });
    timeline.destroy();
    expect(timeline.getValue("v")).toBe(0);
  });
});
