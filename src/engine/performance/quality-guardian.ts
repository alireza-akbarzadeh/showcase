import { PERFORMANCE } from "@/constants";
import { getRafScheduler } from "@/engine/scheduler";
import type { QualityFlags, QualityListener, QualityTier } from "@/types/quality";

const TIER_ORDER: readonly QualityTier[] = ["low", "medium", "high"];

function flagsFor(tier: QualityTier): QualityFlags {
  switch (tier) {
    case "low":
      return {
        tier,
        dprMax: PERFORMANCE.dprMin,
        antialias: false,
        postFx: false,
        particles: false,
        simplifyShaders: true,
      };
    case "medium":
      return {
        tier,
        dprMax: Math.min(1.5, PERFORMANCE.dprMax),
        antialias: false,
        postFx: false,
        particles: true,
        simplifyShaders: false,
      };
    default:
      return {
        tier: "high",
        dprMax: PERFORMANCE.dprMax,
        antialias: true,
        postFx: true,
        particles: true,
        simplifyShaders: false,
      };
  }
}

/**
 * FPS → quality tiers. Updates only on tier change (no per-frame React work).
 * Kill switches from §6 Performance Budget.
 */
export class QualityGuardian {
  private tier: QualityTier = "high";
  private flags: QualityFlags = flagsFor("high");
  private readonly listeners = new Set<QualityListener>();
  private rafId: string | null = null;
  private lowAccumMs = 0;
  private criticalAccumMs = 0;
  private recoverAccumMs = 0;
  private destroyed = false;

  start(): void {
    if (this.rafId || this.destroyed || typeof window === "undefined") return;

    if (this.shouldForceLow()) {
      this.setTier("low");
    }

    this.rafId = getRafScheduler().register(
      (frame) => {
        if (!frame.visible) return;
        this.sample(frame.fps, frame.delta);
      },
      { priority: "idle", label: "quality-guardian", id: "quality-guardian" },
    );
  }

  stop(): void {
    if (this.rafId) {
      getRafScheduler().unregister(this.rafId);
      this.rafId = null;
    }
  }

  destroy(): void {
    this.destroyed = true;
    this.stop();
    this.listeners.clear();
  }

  getFlags(): QualityFlags {
    return this.flags;
  }

  getTier(): QualityTier {
    return this.tier;
  }

  /** Test / debug override. */
  setTier(tier: QualityTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    this.flags = flagsFor(tier);
    this.lowAccumMs = 0;
    this.criticalAccumMs = 0;
    this.recoverAccumMs = 0;
    for (const listener of this.listeners) listener(this.flags);
  }

  subscribe(listener: QualityListener): () => void {
    this.listeners.add(listener);
    listener(this.flags);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Drive kill-switch sampling (used by RAF + tests). */
  sample(fps: number, delta: number): void {
    const degradeMs = PERFORMANCE.qualityDegradeMs;
    const recoverMs = PERFORMANCE.qualityRecoverMs;

    if (fps < PERFORMANCE.criticalFpsThreshold) {
      this.criticalAccumMs += delta;
      this.lowAccumMs += delta;
      this.recoverAccumMs = 0;
    } else if (fps < PERFORMANCE.lowFpsThreshold) {
      this.lowAccumMs += delta;
      this.criticalAccumMs = 0;
      this.recoverAccumMs = 0;
    } else if (fps >= PERFORMANCE.recoverFpsThreshold) {
      this.recoverAccumMs += delta;
      this.lowAccumMs = 0;
      this.criticalAccumMs = 0;
    } else {
      this.lowAccumMs = 0;
      this.criticalAccumMs = 0;
      this.recoverAccumMs = 0;
    }

    if (
      this.criticalAccumMs >= degradeMs &&
      this.tier !== "low"
    ) {
      this.setTier("low");
      return;
    }

    if (
      this.lowAccumMs >= degradeMs &&
      this.tier === "high"
    ) {
      this.setTier("medium");
      return;
    }

    if (
      this.recoverAccumMs >= recoverMs &&
      this.tier !== "high"
    ) {
      const idx = TIER_ORDER.indexOf(this.tier);
      const next = TIER_ORDER[Math.min(idx + 1, TIER_ORDER.length - 1)];
      if (next) this.setTier(next);
    }
  }

  private shouldForceLow(): boolean {
    if (typeof navigator === "undefined") return false;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
        deviceMemory?: number;
      }
    ).connection;
    if (conn?.saveData) return true;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    return typeof memory === "number" && memory > 0 && memory <= 2;
  }
}

let singleton: QualityGuardian | null = null;

export function getQualityGuardian(): QualityGuardian {
  if (!singleton) {
    singleton = new QualityGuardian();
  }
  return singleton;
}

export function resetQualityGuardian(): void {
  singleton?.destroy();
  singleton = null;
}
