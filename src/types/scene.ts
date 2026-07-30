import type { ScrollSnapshot } from "@/types/scroll";
import type { RafFrame } from "@/types/raf";

export type SceneId =
  | "hero"
  | "intro"
  | "projects"
  | "about"
  | "skills"
  | "contact";

export interface SceneRange {
  /** Absolute scroll start (px) or normalized 0–1 if `normalized` is true. */
  readonly start: number;
  /** Absolute scroll end (px) or normalized 0–1 if `normalized` is true. */
  readonly end: number;
  readonly normalized?: boolean;
}

export interface SceneContext {
  readonly id: SceneId;
  readonly progress: number;
  readonly entered: boolean;
  readonly active: boolean;
  readonly scroll: ScrollSnapshot;
  readonly frame: RafFrame;
}

export interface SceneDefinition {
  readonly id: SceneId;
  readonly range: SceneRange;
  readonly label?: string;
  onEnter?: (ctx: SceneContext) => void;
  onLeave?: (ctx: SceneContext) => void;
  onProgress?: (ctx: SceneContext) => void;
  onUpdate?: (ctx: SceneContext) => void;
  onResize?: (ctx: SceneContext) => void;
  onDestroy?: () => void;
  /** Prefetch assets when approaching this scene. */
  prefetch?: () => Promise<void> | void;
  /** Unload heavy assets when leaving. */
  unload?: () => void;
}

export interface TimelineKeyframe<T = number> {
  readonly at: number;
  readonly value: T;
  readonly ease?: (t: number) => number;
}

export interface TimelineTrack<T = number> {
  readonly id: string;
  readonly keyframes: readonly TimelineKeyframe<T>[];
  readonly interpolate?: (a: T, b: T, t: number) => T;
}

export interface TimelineDefinition {
  readonly id: string;
  readonly tracks: readonly TimelineTrack[];
}

export interface TimelineInstance {
  readonly id: string;
  setProgress: (progress: number) => ReadonlyMap<string, number>;
  getValue: (trackId: string) => number;
  destroy: () => void;
}
