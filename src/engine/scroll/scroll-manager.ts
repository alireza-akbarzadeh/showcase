import Lenis from "lenis";
import { SCROLL_DEFAULTS } from "@/constants";
import { getRafScheduler } from "@/engine/scheduler";
import {
  getBreakpoint,
  getViewportSize,
  prefersReducedMotion,
} from "@/engine/scroll/breakpoints";
import type { RafFrame } from "@/types/raf";
import type {
  ScrollDirection,
  ScrollListener,
  ScrollManagerApi,
  ScrollManagerOptions,
  ScrollSnapshot,
  SectionBounds,
  SectionProgress,
} from "@/types/scroll";

function emptySections(): Map<string, SectionProgress> {
  return new Map();
}

function createInitialSnapshot(): ScrollSnapshot {
  const viewport = getViewportSize();
  return {
    y: 0,
    target: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
    normalized: 0,
    limit: 0,
    viewport,
    breakpoint: getBreakpoint(viewport.width),
    sections: emptySections(),
    reducedMotion: prefersReducedMotion(),
    timestamp: 0,
  };
}

/**
 * Single source of truth for scroll state.
 * React never re-renders on scroll — consumers subscribe via refs / callbacks.
 */
export class ScrollManager implements ScrollManagerApi {
  private lenis: Lenis | null = null;
  private snapshot: ScrollSnapshot = createInitialSnapshot();
  private readonly listeners = new Set<ScrollListener>();
  private readonly sections = new Map<string, SectionBounds>();
  private readonly options: ScrollManagerOptions;
  private rafId: string | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mediaQuery: MediaQueryList | null = null;
  private mediaHandler: ((event: MediaQueryListEvent) => void) | null = null;
  private lastDirection: ScrollDirection = 0;
  private started = false;

  constructor(options: ScrollManagerOptions = {}) {
    this.options = options;
  }

  start(): void {
    if (this.started || typeof window === "undefined") return;
    this.started = true;

    const reduced = prefersReducedMotion();

    this.lenis = new Lenis({
      wrapper: this.options.wrapper,
      content: this.options.content,
      lerp: reduced ? 1 : (this.options.lerp ?? SCROLL_DEFAULTS.lerp),
      smoothWheel: reduced
        ? false
        : (this.options.smoothWheel ?? SCROLL_DEFAULTS.smoothWheel),
      syncTouch: this.options.syncTouch ?? SCROLL_DEFAULTS.syncTouch,
      infinite: this.options.infinite ?? false,
      autoRaf: false,
    });

    this.lenis.on("scroll", this.onLenisScroll);
    this.bindResize();
    this.bindReducedMotion();
    this.refresh();

    this.rafId = getRafScheduler().register(this.onFrame, {
      priority: "critical",
      label: "scroll-manager",
      id: "scroll-manager",
    });
  }

  stop(): void {
    if (this.rafId) {
      getRafScheduler().unregister(this.rafId);
      this.rafId = null;
    }
    this.lenis?.stop();
  }

  destroy(): void {
    this.stop();
    this.lenis?.destroy();
    this.lenis = null;
    this.listeners.clear();
    this.sections.clear();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.mediaQuery && this.mediaHandler) {
      this.mediaQuery.removeEventListener("change", this.mediaHandler);
    }
    this.mediaQuery = null;
    this.mediaHandler = null;
    this.started = false;
  }

  getSnapshot(): ScrollSnapshot {
    return this.snapshot;
  }

  subscribe(listener: ScrollListener): () => void {
    this.listeners.add(listener);
    listener(this.snapshot);
    return () => {
      this.listeners.delete(listener);
    };
  }

  scrollTo(
    target: number | string | HTMLElement,
    options: { immediate?: boolean; offset?: number; duration?: number } = {},
  ): void {
    if (!this.lenis) return;

    let resolved: number | HTMLElement = 0;
    if (typeof target === "number") {
      resolved = target;
    } else if (typeof target === "string") {
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;
      resolved = el;
    } else {
      resolved = target;
    }

    this.lenis.scrollTo(resolved, {
      offset: options.offset ?? 0,
      immediate: options.immediate ?? this.snapshot.reducedMotion,
      duration: options.duration,
    });
  }

  registerSection(id: string, element: HTMLElement): () => void {
    this.measureSection(id, element);
    this.refresh();

    return () => {
      this.sections.delete(id);
      this.refresh();
    };
  }

  refresh(): void {
    for (const [id, bounds] of this.sections) {
      this.measureSection(id, bounds.element);
    }
    this.lenis?.resize();
    this.publish(this.computeSnapshot(performance.now()));
  }

  resize(): void {
    this.refresh();
  }

  private readonly onFrame = (frame: RafFrame): void => {
    this.lenis?.raf(frame.time);
  };

  private readonly onLenisScroll = (): void => {
    this.publish(this.computeSnapshot(performance.now()));
  };

  private computeSnapshot(timestamp: number): ScrollSnapshot {
    const viewport = getViewportSize();
    const y = this.lenis?.scroll ?? window.scrollY;
    const target = this.lenis?.targetScroll ?? y;
    const limit = this.lenis?.limit ?? Math.max(document.documentElement.scrollHeight - viewport.height, 0);
    const velocity = this.lenis?.velocity ?? 0;

    let direction: ScrollDirection = 0;
    if (velocity > SCROLL_DEFAULTS.velocityThreshold) direction = 1;
    else if (velocity < -SCROLL_DEFAULTS.velocityThreshold) direction = -1;
    else direction = this.lastDirection === 0 ? 0 : this.lastDirection;

    if (direction !== 0) this.lastDirection = direction;

    const progress = limit > 0 ? Math.min(Math.max(y / limit, 0), 1) : 0;
    const sectionProgress = this.computeSectionProgress(y, viewport.height);

    return {
      y,
      target,
      velocity,
      direction,
      progress,
      normalized: progress,
      limit,
      viewport,
      breakpoint: getBreakpoint(viewport.width),
      sections: sectionProgress,
      reducedMotion: prefersReducedMotion(),
      timestamp,
    };
  }

  private computeSectionProgress(
    scrollY: number,
    viewportHeight: number,
  ): Map<string, SectionProgress> {
    const map = new Map<string, SectionProgress>();

    for (const [id, bounds] of this.sections) {
      const start = bounds.top;
      const end = bounds.bottom - viewportHeight;
      const range = Math.max(end - start, 1);
      const raw = (scrollY - start) / range;
      const progress = Math.min(Math.max(raw, 0), 1);
      const inView =
        bounds.bottom > scrollY && bounds.top < scrollY + viewportHeight;

      map.set(id, {
        id,
        progress,
        inView,
        offset: bounds.top - scrollY,
      });
    }

    return map;
  }

  private measureSection(id: string, element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const scrollY = this.lenis?.scroll ?? window.scrollY;
    const top = rect.top + scrollY;
    const height = rect.height;
    const bottom = top + height;

    this.sections.set(id, {
      id,
      element,
      top,
      bottom,
      height,
      start: top,
      end: bottom,
    });
  }

  private publish(snapshot: ScrollSnapshot): void {
    this.snapshot = snapshot;
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }

  private bindResize(): void {
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", () => this.refresh(), { passive: true });
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.refresh();
    });
    this.resizeObserver.observe(document.documentElement);
    if (this.options.content) {
      this.resizeObserver.observe(this.options.content);
    }
  }

  private bindReducedMotion(): void {
    this.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.mediaHandler = () => {
      // OS change only; MotionProvider may override via setSmoothEnabled.
      const reduced = this.mediaQuery?.matches ?? false;
      this.rebuildLenis(reduced);
      this.publish(this.computeSnapshot(performance.now()));
    };
    this.mediaQuery.addEventListener("change", this.mediaHandler);
  }

  /** Toggle Lenis smoothing — called from MotionProvider. */
  setSmoothEnabled(enabled: boolean): void {
    if (!this.started || typeof window === "undefined") return;
    this.rebuildLenis(!enabled);
    this.snapshot = {
      ...this.snapshot,
      reducedMotion: !enabled,
    };
    this.publish(this.computeSnapshot(performance.now()));
  }

  private rebuildLenis(reduced: boolean): void {
    if (!this.lenis) return;
    const y = this.lenis.scroll;
    this.lenis.destroy();
    this.lenis = new Lenis({
      wrapper: this.options.wrapper,
      content: this.options.content,
      lerp: reduced ? 1 : (this.options.lerp ?? SCROLL_DEFAULTS.lerp),
      smoothWheel: reduced
        ? false
        : (this.options.smoothWheel ?? SCROLL_DEFAULTS.smoothWheel),
      syncTouch: this.options.syncTouch ?? SCROLL_DEFAULTS.syncTouch,
      infinite: this.options.infinite ?? false,
      autoRaf: false,
    });
    this.lenis.on("scroll", this.onLenisScroll);
    this.lenis.scrollTo(y, { immediate: true });
  }
}

let scrollSingleton: ScrollManager | null = null;

export function getScrollManager(): ScrollManager {
  if (!scrollSingleton) {
    scrollSingleton = new ScrollManager();
  }
  return scrollSingleton;
}

export function resetScrollManager(): void {
  scrollSingleton?.destroy();
  scrollSingleton = null;
}
