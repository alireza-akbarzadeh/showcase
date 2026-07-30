export type ScrollDirection = -1 | 0 | 1;

export type Breakpoint = "mobile" | "tablet" | "desktop" | "wide";

export interface ViewportSize {
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
}

export interface SectionBounds {
  readonly id: string;
  readonly element: HTMLElement;
  readonly top: number;
  readonly bottom: number;
  readonly height: number;
  readonly start: number;
  readonly end: number;
}

export interface SectionProgress {
  readonly id: string;
  /** 0–1 while section is in the progress window; clamped. */
  readonly progress: number;
  /** True when section intersects viewport. */
  readonly inView: boolean;
  /** Distance of section top from scroll (px). */
  readonly offset: number;
}

export interface ScrollSnapshot {
  /** Raw / smoothed scroll Y in pixels. */
  readonly y: number;
  /** Target scroll Y (Lenis target). */
  readonly target: number;
  /** Scroll velocity (px/ms approx via Lenis). */
  readonly velocity: number;
  /** -1 up, 0 idle, 1 down. */
  readonly direction: ScrollDirection;
  /** 0–1 document progress. */
  readonly progress: number;
  /** Alias of progress for clarity. */
  readonly normalized: number;
  /** Max scrollable distance. */
  readonly limit: number;
  readonly viewport: ViewportSize;
  readonly breakpoint: Breakpoint;
  readonly sections: ReadonlyMap<string, SectionProgress>;
  readonly reducedMotion: boolean;
  readonly timestamp: number;
}

export type ScrollListener = (snapshot: ScrollSnapshot) => void;

export interface ScrollManagerOptions {
  readonly lerp?: number;
  readonly smoothWheel?: boolean;
  readonly syncTouch?: boolean;
  readonly infinite?: boolean;
  readonly wrapper?: HTMLElement | Window;
  readonly content?: HTMLElement;
}

export interface ScrollManagerApi {
  readonly getSnapshot: () => ScrollSnapshot;
  readonly subscribe: (listener: ScrollListener) => () => void;
  readonly scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; offset?: number; duration?: number },
  ) => void;
  readonly registerSection: (id: string, element: HTMLElement) => () => void;
  readonly refresh: () => void;
  readonly start: () => void;
  readonly stop: () => void;
  readonly destroy: () => void;
  readonly resize: () => void;
  readonly setSmoothEnabled: (enabled: boolean) => void;
}
