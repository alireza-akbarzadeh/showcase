import type { Breakpoint } from "@/types/scroll";
import type { ActId, SceneId } from "@/types/scene";
import type { ProjectCaseStudy } from "@/types/project";
import type { ProofStripContent } from "@/types/proof";
import type {
  AboutChapter,
  CareerStop,
  SkillCluster,
  SkillEdge,
  SkillNode,
  StackLayer,
} from "@/types/craft";

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
  /** FPS below this for qualityDegradeMs → drop from high → medium. */
  lowFpsThreshold: 45,
  /** FPS below this for qualityDegradeMs → drop to low. */
  criticalFpsThreshold: 30,
  /** FPS at/above this for qualityRecoverMs → bump one tier. */
  recoverFpsThreshold: 50,
  qualityDegradeMs: 2000,
  qualityRecoverMs: 3000,
  dprMax: 2,
  dprMin: 1,
  /** Prefetch when section approach progress exceeds this (unclamped). */
  assetApproach: -0.15,
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

/** Acid-lime signal — WebGL/canvas hex (matches --signal-hex). */
export const SIGNAL_HEX = "#b8ff2e";

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
    immersive: true,
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
      {
        label: "Rows",
        display: "50k+",
        target: 50,
        prefix: "",
        suffix: "k+",
      },
    ],
    chapters: [
      {
        id: "hook",
        label: "Hook",
        title: "Signals without the stutter.",
        body: "Pulse turns live telemetry into a calm instrument panel — dense data, steady frames.",
      },
      {
        id: "problem",
        label: "Problem",
        title: "DOM charts hit a wall.",
        body: "Thousands of SVG nodes updated every tick. The UI looked expensive and felt worse.",
      },
      {
        id: "approach",
        label: "Approach",
        title: "Canvas first. Virtualize the rest.",
        body: "Streams into Offscreen-friendly canvases, windowed tables, DPR that backs off under load.",
      },
      {
        id: "architecture",
        label: "Architecture",
        title: "Ingest → buffer → paint.",
        body: "Workers normalize samples; the main thread only composites what is on screen.",
      },
      {
        id: "stack",
        label: "Stack",
        title: "Observability as a product surface.",
        body: "From edge ingest to GPU paint — each layer earns its place in the frame budget.",
      },
      {
        id: "impact",
        label: "Impact",
        title: "Dense, still smooth.",
        body: "LCP under budget, sustained FPS with 50k+ live rows in the viewport window.",
      },
    ],
    stack: [
      { id: "ingest", label: "Stream ingest", layer: "edge" },
      { id: "buffer", label: "Ring buffer", layer: "data" },
      { id: "canvas", label: "Canvas charts", layer: "app" },
      { id: "virt", label: "Virtualized table", layer: "app" },
      { id: "dpr", label: "Adaptive DPR", layer: "infra" },
    ],
    architecture: {
      nodes: [
        { id: "edge", label: "Ingest", x: 40, y: 110 },
        { id: "worker", label: "Worker", x: 140, y: 60 },
        { id: "buffer", label: "Buffer", x: 140, y: 160 },
        { id: "paint", label: "Paint", x: 260, y: 110 },
        { id: "ui", label: "UI", x: 340, y: 110 },
      ],
      edges: [
        { from: "edge", to: "worker" },
        { from: "worker", to: "buffer" },
        { from: "buffer", to: "paint" },
        { from: "paint", to: "ui" },
      ],
    },
  },
  {
    id: "lattice",
    name: "Lattice",
    role: "Design systems · architecture",
    tagline: "A design system that scales teams, not just tokens.",
    problem: "Eleven apps diverged into eleven visual languages.",
    approach: "Token architecture, documented motion language, enforced imports.",
    immersive: true,
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
      {
        label: "Drift",
        display: "−70%",
        target: 70,
        prefix: "−",
        suffix: "%",
      },
    ],
    chapters: [
      {
        id: "hook",
        label: "Hook",
        title: "One language. Eleven products.",
        body: "Lattice is the shared grammar — type, color, motion — that keeps a fleet coherent.",
      },
      {
        id: "problem",
        label: "Problem",
        title: "Tokens without enforcement.",
        body: "Figma said one thing, code said another. Reviews became archaeology.",
      },
      {
        id: "approach",
        label: "Approach",
        title: "Contracts at the import boundary.",
        body: "Typed tokens, linted imports, motion presets documented next to components.",
      },
      {
        id: "architecture",
        label: "Architecture",
        title: "Tokens → primitives → patterns.",
        body: "A layered kit where apps consume patterns, never raw hex or orphan easings.",
      },
      {
        id: "stack",
        label: "Stack",
        title: "System as product.",
        body: "Docs, packages, and CI gates — the boring parts that make craft scale.",
      },
      {
        id: "impact",
        label: "Impact",
        title: "Less drift. Faster ships.",
        body: "240+ tokens across 11 apps with visual drift cut by roughly seventy percent.",
      },
    ],
    stack: [
      { id: "tokens", label: "Design tokens", layer: "data" },
      { id: "primitives", label: "Primitives", layer: "app" },
      { id: "patterns", label: "Patterns", layer: "app" },
      { id: "lint", label: "Import lint", layer: "infra" },
      { id: "docs", label: "Living docs", layer: "edge" },
    ],
    architecture: {
      nodes: [
        { id: "figma", label: "Figma", x: 40, y: 80 },
        { id: "tokens", label: "Tokens", x: 140, y: 110 },
        { id: "kit", label: "Kit", x: 240, y: 110 },
        { id: "apps", label: "Apps", x: 340, y: 70 },
        { id: "ci", label: "CI", x: 340, y: 150 },
      ],
      edges: [
        { from: "figma", to: "tokens" },
        { from: "tokens", to: "kit" },
        { from: "kit", to: "apps" },
        { from: "kit", to: "ci" },
      ],
    },
  },
] as const satisfies readonly ProjectCaseStudy[];

export const ORBIT_PROJECT = PROJECTS[0];

/** Act IV — measurable proof strip (Orbit evidence + site budgets). */
export const PROOF: ProofStripContent = {
  headline: "Measurable impact.",
  support:
    "Numbers that survive scrutiny — portfolio budgets and the Orbit case side by side.",
  siteMetrics: [
    {
      id: "fps",
      label: "Target FPS",
      target: 120,
      display: "60–120",
      note: "Desktop sustained · 120 capable",
    },
    {
      id: "lcp",
      label: "LCP budget",
      target: 2000,
      display: "≤2.0s",
      suffix: "",
      note: "Brand text as LCP candidate",
    },
    {
      id: "rerenders",
      label: "Scroll re-renders",
      target: 0,
      display: "0",
      note: "Refs + RAF — never setState on scroll",
    },
  ],
  evidence: [
    {
      projectId: "orbit",
      title: "Orbit — verified outcomes",
      summary:
        "Moving presence and sync off React recovered interaction latency without stripping the craft layer.",
      metrics: [
        {
          id: "inp",
          label: "INP",
          target: 62,
          display: "−62%",
          prefix: "−",
          suffix: "%",
        },
        {
          id: "bundle",
          label: "Bundle",
          target: 180,
          display: "−180KB",
          prefix: "−",
          suffix: "KB",
        },
        {
          id: "sync",
          label: "Sync lag",
          target: 40,
          display: "−40ms",
          prefix: "−",
          suffix: "ms",
        },
      ],
      comparisons: [
        {
          id: "inp-wipe",
          projectId: "orbit",
          label: "Interaction latency",
          beforeLabel: "Before",
          afterLabel: "After",
          beforeValue: "480ms INP",
          afterValue: "180ms INP",
          detail: "Shared RAF + predictive merge vs re-render gossip.",
        },
        {
          id: "fps-wipe",
          projectId: "orbit",
          label: "Scroll while syncing",
          beforeLabel: "Before",
          afterLabel: "After",
          beforeValue: "38–45 FPS",
          afterValue: "58–60 FPS",
          detail: "Mid-tier laptop, dual cursors + document edits.",
        },
      ],
      links: [
        { label: "Case chapters", href: "#orbit" },
        { label: "Architecture", href: "#orbit" },
      ],
    },
  ],
  closing: "Proof is part of the brand — if the numbers hitch, the story breaks.",
};

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
] as const satisfies readonly AboutChapter[];

export const CAREER_JOURNEY = [
  {
    id: "origin",
    year: "2018",
    role: "Frontend engineer",
    place: "Product studios",
    achievement: "Shipped scroll-heavy marketing sites that stayed above 50 FPS on mid phones.",
    lesson: "Motion without a frame budget is decoration.",
  },
  {
    id: "systems",
    year: "2021",
    role: "Creative technologist",
    place: "Realtime / collab products",
    achievement: "Moved presence sync off React — recovered INP without killing craft.",
    lesson: "React mounts shells; engines own frames.",
  },
  {
    id: "now",
    year: "Now",
    role: "Lead creative engineer",
    place: "Select projects",
    achievement: "Building living systems where architecture is part of the brand.",
    lesson: "Proof beats pitch decks.",
  },
] as const satisfies readonly CareerStop[];

export const SKILL_CLUSTERS = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "GSAP", "R3F"],
    focus: "Interfaces that stay calm under scroll and concurrency.",
  },
  {
    id: "systems",
    label: "Systems",
    skills: ["Scroll engines", "RAF schedulers", "Asset pipelines"],
    focus: "One clock, predictable progress, aggressive unload.",
  },
  {
    id: "design",
    label: "Design",
    skills: ["Motion language", "Typography", "Design systems"],
    focus: "Type and motion as hierarchy — not ornament.",
  },
  {
    id: "craft",
    label: "Craft",
    skills: ["Shaders", "Performance", "Accessibility"],
    focus: "Spectacle that survives reduced motion and mid-tier GPUs.",
  },
] as const satisfies readonly SkillCluster[];

/** Prebaked knowledge graph — no runtime force layout. */
export const SKILL_NODES = [
  { id: "react", label: "React", clusterId: "frontend", how: "Shells and discrete UI — never the scroll frame.", x: 0.18, y: 0.28 },
  { id: "next", label: "Next.js", clusterId: "frontend", how: "RSC for content; client islands for engines.", x: 0.32, y: 0.18 },
  { id: "ts", label: "TypeScript", clusterId: "frontend", how: "Contracts for scenes, assets, and proof data.", x: 0.22, y: 0.48 },
  { id: "gsap", label: "GSAP", clusterId: "frontend", how: "One-shot reveals and UI tweens — not the scroll SoT.", x: 0.38, y: 0.38 },
  { id: "r3f", label: "R3F", clusterId: "frontend", how: "Shared canvas behind DOM; kill on reduced motion.", x: 0.48, y: 0.22 },
  { id: "scroll", label: "Scroll", clusterId: "systems", how: "Lenis + snapshot SoT; sections register bounds.", x: 0.58, y: 0.42 },
  { id: "raf", label: "RAF", clusterId: "systems", how: "Single scheduler; priorities for camera vs idle.", x: 0.68, y: 0.28 },
  { id: "assets", label: "Assets", clusterId: "systems", how: "Prefetch near, unload on leave.", x: 0.72, y: 0.52 },
  { id: "motion", label: "Motion", clusterId: "design", how: "Easing tokens and purpose-built timelines.", x: 0.42, y: 0.62 },
  { id: "type", label: "Type", clusterId: "design", how: "Display serif + geometric sans as brand signal.", x: 0.28, y: 0.72 },
  { id: "ds", label: "Systems UI", clusterId: "design", how: "Tokens and import boundaries over component soup.", x: 0.52, y: 0.78 },
  { id: "shaders", label: "Shaders", clusterId: "craft", how: "Uniforms from scroll velocity — mobile variants.", x: 0.78, y: 0.68 },
  { id: "perf", label: "Perf", clusterId: "craft", how: "Budgets, kill switches, ?debug=perf overlay.", x: 0.88, y: 0.48 },
  { id: "a11y", label: "A11y", clusterId: "craft", how: "Keyboard acts, reduced motion, real HTML copy.", x: 0.82, y: 0.32 },
] as const satisfies readonly SkillNode[];

export const SKILL_EDGES = [
  { from: "react", to: "next" },
  { from: "react", to: "ts" },
  { from: "next", to: "gsap" },
  { from: "gsap", to: "motion" },
  { from: "r3f", to: "raf" },
  { from: "r3f", to: "shaders" },
  { from: "scroll", to: "raf" },
  { from: "raf", to: "assets" },
  { from: "scroll", to: "motion" },
  { from: "ts", to: "ds" },
  { from: "type", to: "motion" },
  { from: "perf", to: "raf" },
  { from: "a11y", to: "scroll" },
  { from: "shaders", to: "perf" },
] as const satisfies readonly SkillEdge[];

export const TECH_STACK_LAYERS = [
  {
    id: "edge",
    label: "Edge",
    items: ["CDN", "WebSocket", "Feature flags"],
  },
  {
    id: "app",
    label: "App",
    items: ["Next.js", "Scene host", "GSAP reveals"],
  },
  {
    id: "runtime",
    label: "Runtime",
    items: ["RAF scheduler", "Scroll SoT", "Timelines"],
  },
  {
    id: "gpu",
    label: "GPU",
    items: ["R3F canvas", "Shader variants", "Adaptive DPR"],
  },
] as const satisfies readonly StackLayer[];

