import { clamp } from "@/utils/math";

/** Map a 0–1 local progress into a chapter window. */
export function chapterLocal(
  progress: number,
  start: number,
  end: number,
): number {
  return clamp((progress - start) / Math.max(end - start, 0.0001), 0, 1);
}

/** Peek → fullscreen morph scale (1 = peek, 0 = full immersion). */
export function morphAmount(progress: number): number {
  return 1 - chapterLocal(progress, 0.02, 0.22);
}

/** Throttle metric text updates to every N frames. */
export function shouldUpdateMetric(frameId: number, every = 2): boolean {
  return frameId % every === 0;
}
