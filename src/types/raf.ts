export type RafPriority = "critical" | "high" | "normal" | "low" | "idle";

export type RafCallback = (frame: RafFrame) => void;

export interface RafFrame {
  /** Elapsed time since scheduler start (ms). */
  readonly time: number;
  /** Delta since previous frame (ms). */
  readonly delta: number;
  /** Delta in seconds. */
  readonly deltaSeconds: number;
  /** Smoothed frames per second. */
  readonly fps: number;
  /** Absolute frame index. */
  readonly frame: number;
  /** Whether the tab is visible. */
  readonly visible: boolean;
}

export interface RafSubscription {
  readonly id: string;
  readonly callback: RafCallback;
  readonly priority: RafPriority;
  readonly label?: string;
}

export interface RafSchedulerOptions {
  readonly targetFps?: number;
  readonly maxDelta?: number;
  readonly pauseWhenHidden?: boolean;
}

export interface RafSchedulerApi {
  register: (
    callback: RafCallback,
    options?: { priority?: RafPriority; label?: string; id?: string },
  ) => string;
  unregister: (id: string) => void;
  pause: () => void;
  resume: () => void;
  isPaused: () => boolean;
  getFps: () => number;
  getFrame: () => number;
  destroy: () => void;
}
