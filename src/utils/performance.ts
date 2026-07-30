import { PERFORMANCE } from "@/constants";

export function getAdaptiveDpr(fps: number, currentDpr: number): number {
  if (fps < PERFORMANCE.lowFpsThreshold) {
    return Math.max(PERFORMANCE.dprMin, currentDpr - 0.25);
  }
  if (fps > 55) {
    return Math.min(PERFORMANCE.dprMax, currentDpr + 0.1);
  }
  return currentDpr;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function canUseOffscreenCanvas(): boolean {
  return isBrowser() && typeof OffscreenCanvas !== "undefined";
}

/** Only animate GPU-friendly properties. */
export const GPU_PROPS = [
  "transform",
  "opacity",
  "filter",
  "clip-path",
] as const;

export type GpuProp = (typeof GPU_PROPS)[number];

export function setTransform(
  el: HTMLElement,
  {
    x = 0,
    y = 0,
    z = 0,
    scale = 1,
    scaleX,
    scaleY,
    rotate = 0,
    rotateX = 0,
    rotateY = 0,
  }: {
    x?: number;
    y?: number;
    z?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    rotate?: number;
    rotateX?: number;
    rotateY?: number;
  },
): void {
  const sx = scaleX ?? scale;
  const sy = scaleY ?? scale;
  el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${rotate}deg) scale(${sx}, ${sy})`;
}

export function setOpacity(el: HTMLElement, opacity: number): void {
  el.style.opacity = String(clamp01(opacity));
}

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

export function willChange(
  el: HTMLElement,
  props: readonly string[] = ["transform", "opacity"],
): void {
  el.style.willChange = props.join(", ");
}

export function clearWillChange(el: HTMLElement): void {
  el.style.willChange = "auto";
}
