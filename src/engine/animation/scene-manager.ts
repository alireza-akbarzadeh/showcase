import { getRafScheduler } from "@/engine/scheduler";
import { getScrollManager } from "@/engine/scroll";
import type { RafFrame } from "@/types/raf";
import type {
  SceneContext,
  SceneDefinition,
  SceneId,
} from "@/types/scene";
import type { ScrollSnapshot } from "@/types/scroll";

function resolveRange(
  start: number,
  end: number,
  normalized: boolean | undefined,
  scroll: ScrollSnapshot,
): { start: number; end: number } {
  if (normalized) {
    return {
      start: start * scroll.limit,
      end: end * scroll.limit,
    };
  }
  return { start, end };
}

function sectionProgress(
  id: SceneId,
  scroll: ScrollSnapshot,
  definition: SceneDefinition,
): number {
  const section = scroll.sections.get(id);
  if (section) return section.progress;

  const { start, end } = resolveRange(
    definition.range.start,
    definition.range.end,
    definition.range.normalized,
    scroll,
  );
  const range = Math.max(end - start, 1);
  return Math.min(Math.max((scroll.y - start) / range, 0), 1);
}

/**
 * Scene orchestrator — each scene owns enter/leave/progress.
 * Updates run on the shared RAF loop outside React.
 */
export class SceneManager {
  private readonly scenes = new Map<SceneId, SceneDefinition>();
  private readonly entered = new Set<SceneId>();
  private readonly active = new Set<SceneId>();
  private rafId: string | null = null;
  private unsubscribeScroll: (() => void) | null = null;
  private lastScroll: ScrollSnapshot | null = null;
  private lastFrame: RafFrame | null = null;
  private destroyed = false;

  register(scene: SceneDefinition): () => void {
    this.scenes.set(scene.id, scene);
    this.ensureRunning();
    return () => {
      this.unregister(scene.id);
    };
  }

  unregister(id: SceneId): void {
    const scene = this.scenes.get(id);
    if (!scene) return;
    if (this.entered.has(id)) {
      scene.onLeave?.(this.buildContext(scene, 0, false, false));
      scene.unload?.();
    }
    scene.onDestroy?.();
    this.scenes.delete(id);
    this.entered.delete(id);
    this.active.delete(id);
  }

  get(id: SceneId): SceneDefinition | undefined {
    return this.scenes.get(id);
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    for (const id of [...this.scenes.keys()]) {
      this.unregister(id);
    }
    if (this.rafId) {
      getRafScheduler().unregister(this.rafId);
      this.rafId = null;
    }
    this.unsubscribeScroll?.();
    this.unsubscribeScroll = null;
  }

  private ensureRunning(): void {
    if (this.rafId || this.destroyed || typeof window === "undefined") return;

    this.unsubscribeScroll = getScrollManager().subscribe((snapshot) => {
      this.lastScroll = snapshot;
      this.evaluateScenes(snapshot, this.lastFrame);
    });

    this.rafId = getRafScheduler().register(
      (frame) => {
        this.lastFrame = frame;
        if (this.lastScroll) {
          this.tickScenes(this.lastScroll, frame);
        }
      },
      { priority: "high", label: "scene-manager", id: "scene-manager" },
    );
  }

  private evaluateScenes(scroll: ScrollSnapshot, frame: RafFrame | null): void {
    for (const scene of this.scenes.values()) {
      const progress = sectionProgress(scene.id, scroll, scene);
      const inRange = progress > 0 && progress < 1;
      const near =
        progress >= -0.15 && progress <= 1.15
          ? true
          : scroll.sections.get(scene.id)?.inView ?? false;

      const wasEntered = this.entered.has(scene.id);
      const isActive = inRange || (scroll.sections.get(scene.id)?.inView ?? false);

      if (isActive && !wasEntered) {
        this.entered.add(scene.id);
        void scene.prefetch?.();
        scene.onEnter?.(this.buildContext(scene, progress, true, true, scroll, frame));
      } else if (!isActive && wasEntered && !near) {
        this.entered.delete(scene.id);
        this.active.delete(scene.id);
        scene.onLeave?.(this.buildContext(scene, progress, false, false, scroll, frame));
        scene.unload?.();
      }

      if (isActive) {
        this.active.add(scene.id);
        scene.onProgress?.(
          this.buildContext(scene, progress, true, true, scroll, frame),
        );
      } else {
        this.active.delete(scene.id);
      }
    }
  }

  private tickScenes(scroll: ScrollSnapshot, frame: RafFrame): void {
    for (const id of this.active) {
      const scene = this.scenes.get(id);
      if (!scene) continue;
      const progress = sectionProgress(id, scroll, scene);
      scene.onUpdate?.(
        this.buildContext(scene, progress, true, true, scroll, frame),
      );
    }
  }

  private buildContext(
    scene: SceneDefinition,
    progress: number,
    entered: boolean,
    active: boolean,
    scroll: ScrollSnapshot | null = this.lastScroll,
    frame: RafFrame | null = this.lastFrame,
  ): SceneContext {
    const fallbackScroll = scroll ?? getScrollManager().getSnapshot();
    const fallbackFrame: RafFrame = frame ?? {
      time: 0,
      delta: 16.67,
      deltaSeconds: 0.01667,
      fps: 60,
      frame: 0,
      visible: true,
    };

    return {
      id: scene.id,
      progress,
      entered,
      active,
      scroll: fallbackScroll,
      frame: fallbackFrame,
    };
  }
}

let sceneSingleton: SceneManager | null = null;

export function getSceneManager(): SceneManager {
  if (!sceneSingleton) {
    sceneSingleton = new SceneManager();
  }
  return sceneSingleton;
}

export function resetSceneManager(): void {
  sceneSingleton?.destroy();
  sceneSingleton = null;
}
