import { PERFORMANCE, RAF_PRIORITIES } from "@/constants";
import type {
  RafCallback,
  RafFrame,
  RafPriority,
  RafSchedulerApi,
  RafSchedulerOptions,
  RafSubscription,
} from "@/types/raf";

const PRIORITY_ORDER = RAF_PRIORITIES;

function createId(label?: string): string {
  const base = label?.replace(/\s+/g, "-").toLowerCase() ?? "cb";
  return `${base}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Single shared requestAnimationFrame loop.
 * All scroll, render, and animation work registers here — never spawn extra RAFs.
 */
export class RafScheduler implements RafSchedulerApi {
  private readonly subscriptions = new Map<string, RafSubscription>();
  private readonly ordered: RafSubscription[] = [];
  private readonly maxDelta: number;
  private readonly pauseWhenHidden: boolean;
  private readonly targetFrameMs: number;

  private rafId: number | null = null;
  private paused = false;
  private running = false;
  private startTime = 0;
  private lastTime = 0;
  private frame = 0;
  private fps = 60;
  private fpsAccum = 0;
  private fpsFrames = 0;
  private visible = true;
  private visibilityHandler: (() => void) | null = null;

  constructor(options: RafSchedulerOptions = {}) {
    this.maxDelta = options.maxDelta ?? PERFORMANCE.maxDeltaMs;
    this.pauseWhenHidden = options.pauseWhenHidden ?? true;
    this.targetFrameMs = 1000 / (options.targetFps ?? PERFORMANCE.targetFps);
  }

  register(
    callback: RafCallback,
    options: { priority?: RafPriority; label?: string; id?: string } = {},
  ): string {
    const id = options.id ?? createId(options.label);
    if (this.subscriptions.has(id)) {
      this.unregister(id);
    }

    const subscription: RafSubscription = {
      id,
      callback,
      priority: options.priority ?? "normal",
      label: options.label,
    };

    this.subscriptions.set(id, subscription);
    this.rebuildOrder();
    this.ensureRunning();
    return id;
  }

  unregister(id: string): void {
    if (!this.subscriptions.delete(id)) return;
    this.rebuildOrder();
    if (this.subscriptions.size === 0) {
      this.stopLoop();
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    if (!this.paused) return;
    this.paused = false;
    this.lastTime = performance.now();
    this.ensureRunning();
  }

  isPaused(): boolean {
    return this.paused;
  }

  getFps(): number {
    return this.fps;
  }

  getFrame(): number {
    return this.frame;
  }

  destroy(): void {
    this.stopLoop();
    this.subscriptions.clear();
    this.ordered.length = 0;
    if (this.visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }

  private rebuildOrder(): void {
    this.ordered.length = 0;
    for (const sub of this.subscriptions.values()) {
      this.ordered.push(sub);
    }
    this.ordered.sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
    );
  }

  private ensureRunning(): void {
    if (typeof window === "undefined") return;
    if (this.running) return;
    if (this.subscriptions.size === 0) return;

    this.bindVisibility();
    this.running = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stopLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.running = false;
  }

  private bindVisibility(): void {
    if (this.visibilityHandler || typeof document === "undefined") return;
    this.visibilityHandler = () => {
      this.visible = document.visibilityState === "visible";
      if (this.visible) {
        this.lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", this.visibilityHandler);
  }

  private readonly tick = (now: number): void => {
    this.rafId = requestAnimationFrame(this.tick);

    if (this.paused) return;
    if (this.pauseWhenHidden && !this.visible) return;

    const rawDelta = now - this.lastTime;
    if (rawDelta < this.targetFrameMs * 0.5) {
      // Skip over-sampled frames when targeting lower FPS budgets.
      return;
    }

    const delta = Math.min(rawDelta, this.maxDelta);
    this.lastTime = now;
    this.frame += 1;

    this.fpsAccum += delta;
    this.fpsFrames += 1;
    if (this.fpsAccum >= 500) {
      this.fps = (this.fpsFrames * 1000) / this.fpsAccum;
      this.fpsAccum = 0;
      this.fpsFrames = 0;
    }

    const frame: RafFrame = {
      time: now - this.startTime,
      delta,
      deltaSeconds: delta / 1000,
      fps: this.fps,
      frame: this.frame,
      visible: this.visible,
    };

    for (let i = 0; i < this.ordered.length; i += 1) {
      this.ordered[i]?.callback(frame);
    }
  };
}

let singleton: RafScheduler | null = null;

export function getRafScheduler(): RafScheduler {
  if (!singleton) {
    singleton = new RafScheduler();
  }
  return singleton;
}

export function resetRafScheduler(): void {
  singleton?.destroy();
  singleton = null;
}
