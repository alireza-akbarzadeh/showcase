import type { Breakpoint } from "@/types/scroll";
import type { ActId, SceneId } from "@/types/scene";

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const satisfies Record<Breakpoint, number>;

/** Linear scroll order — five-act narrative. */
export const SCENE_ORDER = [
  "hero",
  "intro",
  "skills",
  "about",
  "projects",
  "proof",
  "contact",
] as const satisfies readonly SceneId[];

export const SCENE_LABELS: Record<SceneId, string> = {
  hero: "Hero",
  intro: "Intro",
  skills: "Craft",
  about: "About",
  projects: "Projects",
  proof: "Proof",
  contact: "Contact",
};

export const ACTS = [
  {
    id: "introduction",
    label: "I — Introduction",
    short: "Intro",
    scenes: ["hero", "intro"],
    range: [0, 0.24],
  },
  {
    id: "craft",
    label: "II — Craft",
    short: "Craft",
    scenes: ["skills", "about"],
    range: [0.24, 0.46],
  },
  {
    id: "projects",
    label: "III — Projects",
    short: "Work",
    scenes: ["projects"],
    range: [0.46, 0.76],
  },
  {
    id: "proof",
    label: "IV — Proof",
    short: "Proof",
    scenes: ["proof"],
    range: [0.76, 0.88],
  },
  {
    id: "contact",
    label: "V — Contact",
    short: "Contact",
    scenes: ["contact"],
    range: [0.88, 1],
  },
] as const satisfies readonly {
  id: ActId;
  label: string;
  short: string;
  scenes: readonly SceneId[];
  range: readonly [number, number];
}[];

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
  title: "Showcase — I build software differently",
  description:
    "A scroll-directed portfolio. Five acts. GPU-accelerated scenes. Engineering quality you can feel.",
  url: "https://showcase.example.com",
  locale: "en_US",
  twitter: "@showcase",
  author: "Alireza Akbarzadeh",
  email: "hello@example.com",
  availability: "Available for select projects",
  /** Deep link first — embed lazily only if needed later. */
  calendarUrl: "https://cal.com/",
} as const;

export const SOCIALS = [
  { id: "github", label: "GitHub", href: "https://github.com/alireza-akbarzadeh" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/alireza-akbarzadeh" },
] as const;

export const PROJECTS = [
  {
    id: "orbit",
    name: "Orbit",
    role: "Lead frontend · realtime systems",
    tagline: "Realtime collaboration without the lag tax.",
    problem: "Multiplayer edits were dropping frames on mid-tier laptops.",
    approach: "Moved scroll and sync off React. Shared RAF. Predictive merge.",
    metrics: [
      {
        label: "INP",
        display: "−62%",
        target: 62,
        prefix: "−",
        suffix: "%",
      },
      {
        label: "Bundle",
        display: "−180KB",
        target: 180,
        prefix: "−",
        suffix: "KB",
      },
    ],
  },
  {
    id: "pulse",
    name: "Pulse",
    role: "Creative engineer · observability UI",
    tagline: "Observability that stays at sixty frames.",
    problem: "Dashboards looked premium and felt sticky.",
    approach: "Canvas charts, virtualized streams, adaptive DPR.",
    metrics: [
      {
        label: "LCP",
        display: "1.4s",
        target: 14,
        prefix: "",
        suffix: "s",
        float: true,
        divisor: 10,
      },
      {
        label: "FPS",
        display: "60+",
        target: 60,
        prefix: "",
        suffix: "+",
      },
    ],
  },
  {
    id: "lattice",
    name: "Lattice",
    role: "Design systems · architecture",
    tagline: "A design system that scales teams, not just tokens.",
    problem: "Eleven apps diverged into eleven visual languages.",
    approach: "Token architecture, documented motion language, enforced imports.",
    metrics: [
      {
        label: "Tokens",
        display: "240+",
        target: 240,
        prefix: "",
        suffix: "+",
      },
      {
        label: "Apps",
        display: "11",
        target: 11,
        prefix: "",
        suffix: "",
      },
    ],
  },
] as const;

export const ABOUT_CHAPTERS = [
  {
    year: "01",
    title: "Systems before screens",
    body: "I start with engines — schedulers, scroll, assets — so creative work never fights the runtime.",
  },
  {
    year: "02",
    title: "Motion that teaches",
    body: "Every tween has a job: hierarchy, state, or narrative. Decoration get cut.",
  },
  {
    year: "03",
    title: "Ship the feeling",
    body: "Performance is part of the brand. If it hitchs, the story breaks.",
  },
] as const;


export const SKILL_CLUSTERS = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "GSAP", "R3F"],
  },
  {
    id: "systems",
    label: "Systems",
    skills: ["Scroll engines", "RAF schedulers", "Asset pipelines"],
  },
  {
    id: "design",
    label: "Design",
    skills: ["Motion language", "Typography", "Design systems"],
  },
  {
    id: "craft",
    label: "Craft",
    skills: ["Shaders", "Performance", "Accessibility"],
  },
] as const;
