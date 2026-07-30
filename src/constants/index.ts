import type { Breakpoint } from "@/types/scroll";
import type { ActId, SceneId } from "@/types/scene";
import type { ProjectCaseStudy } from "@/types/project";

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
    immersive: true,
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
      {
        label: "Sync lag",
        display: "−40ms",
        target: 40,
        prefix: "−",
        suffix: "ms",
      },
    ],
    chapters: [
      {
        id: "hook",
        label: "Hook",
        title: "Presence without the jank.",
        body: "Orbit keeps collaborators in the same document — and on the same frame budget.",
      },
      {
        id: "problem",
        label: "Problem",
        title: "React owned the scroll.",
        body: "Every remote cursor update re-rendered the tree. Mid-tier machines paid sixty frames for gossip.",
      },
      {
        id: "approach",
        label: "Approach",
        title: "One clock. Predictive merge.",
        body: "Shared RAF, refs for presence, and optimistic ops that reconcile without layout thrash.",
      },
      {
        id: "architecture",
        label: "Architecture",
        title: "Sync outside the render path.",
        body: "Transport → CRDT → scene bus → DOM/WebGL writers. React only mounts the shell.",
      },
      {
        id: "stack",
        label: "Stack",
        title: "Systems that stay quiet.",
        body: "Each layer lights up in build order — edge ingress to infra telemetry.",
      },
      {
        id: "impact",
        label: "Impact",
        title: "Numbers that survive scrutiny.",
        body: "Interaction latency down, bundle leaner, sync lag cut — without killing the craft.",
      },
    ],
    stack: [
      { id: "ws", label: "WebSocket edge", layer: "edge" },
      { id: "crdt", label: "CRDT merge", layer: "data" },
      { id: "raf", label: "Shared RAF", layer: "app" },
      { id: "r3f", label: "Optional R3F", layer: "app" },
      { id: "otel", label: "OTel traces", layer: "infra" },
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Client", x: 40, y: 110 },
        { id: "raf", label: "RAF", x: 160, y: 40 },
        { id: "bus", label: "Scene bus", x: 160, y: 110 },
        { id: "crdt", label: "CRDT", x: 160, y: 180 },
        { id: "edge", label: "Edge", x: 300, y: 110 },
      ],
      edges: [
        { from: "client", to: "bus", label: "refs" },
        { from: "raf", to: "bus", label: "tick" },
        { from: "bus", to: "crdt", label: "ops" },
        { from: "crdt", to: "edge", label: "sync" },
      ],
    },
  },
  {
    id: "pulse",
    name: "Pulse",
    role: "Creative engineer · observability UI",
    tagline: "Observability that stays at sixty frames.",
    problem: "Dashboards looked premium and felt sticky.",
    approach: "Canvas charts, virtualized streams, adaptive DPR.",
    immersive: false,
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
    chapters: [],
    stack: [],
    architecture: { nodes: [], edges: [] },
  },
  {
    id: "lattice",
    name: "Lattice",
    role: "Design systems · architecture",
    tagline: "A design system that scales teams, not just tokens.",
    problem: "Eleven apps diverged into eleven visual languages.",
    approach: "Token architecture, documented motion language, enforced imports.",
    immersive: false,
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
    chapters: [],
    stack: [],
    architecture: { nodes: [], edges: [] },
  },
] as const satisfies readonly ProjectCaseStudy[];

export const ORBIT_PROJECT = PROJECTS[0];

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
