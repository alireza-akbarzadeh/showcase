import type { Breakpoint } from "@/types/scroll";
import type { SceneId } from "@/types/scene";

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const satisfies Record<Breakpoint, number>;

export const SCENE_ORDER = [
  "hero",
  "intro",
  "projects",
  "about",
  "skills",
  "contact",
] as const satisfies readonly SceneId[];

export const SCENE_LABELS: Record<SceneId, string> = {
  hero: "Hero",
  intro: "Intro",
  projects: "Projects",
  about: "About",
  skills: "Skills",
  contact: "Contact",
};

export const RAF_PRIORITIES = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
  idle: 4,
} as const;

export const SCROLL_DEFAULTS = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
  velocityThreshold: 0.01,
} as const;

export const PERFORMANCE = {
  targetFps: 120,
  maxDeltaMs: 64,
  lowFpsThreshold: 45,
  dprMax: 2,
  dprMin: 1,
} as const;

export const SITE = {
  name: "Showcase",
  title: "Showcase — Creative Portfolio",
  description:
    "A next-generation scroll-driven portfolio experience. Continuous animation, GPU-accelerated scenes, and cinematic interaction.",
  url: "https://showcase.example.com",
  locale: "en_US",
  twitter: "@showcase",
  author: "Alireza Akbarzadeh",
} as const;
