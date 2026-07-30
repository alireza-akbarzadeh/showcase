# Graph Report - .  (2026-07-30)

## Corpus Check
- Corpus is ~21,464 words - fits in a single context window. You may not need a graph.

## Summary
- 582 nodes · 1135 edges · 27 communities (23 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- SEO Open Graph Images
- Docs and Narrative Acts
- 3D Scene Host Factory
- Asset Loaders Factories
- Home Page Canvas R3F
- ESLint Prettier Tooling
- Runtime NPM Dependencies
- Root Layout Metadata GSAP
- TypeScript Compiler Config
- RAF Scheduler Engine
- Scene Manager Lifecycle
- Path Alias Imports
- shadcn Components Config
- Idle Prefetch Intersection
- Prettier Tailwind Utils
- GLSL Global Type Decl
- Button UI Component
- Globe SVG Public Asset
- File SVG Public Asset
- Next.js Logo SVG
- Vercel Logo SVG
- Window SVG Public Asset
- Shader Source Loader
- ESLint Flat Config
- Next.js App Config
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `ScrollManager` - 27 edges
2. `compilerOptions` - 20 edges
3. `RafScheduler` - 19 edges
4. `ScrollSnapshot` - 17 edges
5. `SceneDefinition` - 15 edges
6. `setTransform()` - 15 edges
7. `getScrollManager()` - 14 edges
8. `setOpacity()` - 14 edges
9. `SceneManager` - 13 edges
10. `createTimeline()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Next.js (Project-Specific Breaking APIs)` --semantically_similar_to--> `Next.js 16 App Router`  [INFERRED] [semantically similar]
  AGENTS.md → FEATURE_ROADMAP.md
- `Showcase Portfolio Foundation` --semantically_similar_to--> `Scroll-Driven Developer Portfolio`  [INFERRED] [semantically similar]
  README.md → FEATURE_ROADMAP.md
- `RafScheduler` --semantically_similar_to--> `getRafScheduler`  [INFERRED] [semantically similar]
  FEATURE_ROADMAP.md → README.md
- `One RAF Rule` --semantically_similar_to--> `React Never Owns Scroll Frames`  [INFERRED] [semantically similar]
  README.md → FEATURE_ROADMAP.md
- `Scroll Outside React` --semantically_similar_to--> `React Never Owns Scroll Frames`  [INFERRED] [semantically similar]
  README.md → FEATURE_ROADMAP.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Runtime Topology: Providers → Scroll / RAF / Scenes** — feature_roadmap_app_providers, feature_roadmap_scroll_manager, feature_roadmap_raf_scheduler, feature_roadmap_scene_manager [EXTRACTED 1.00]
- **Five-Act Narrative Arc** — feature_roadmap_act_i_introduction, feature_roadmap_act_ii_craft, feature_roadmap_act_iii_projects, feature_roadmap_act_iv_proof, feature_roadmap_act_v_contact [EXTRACTED 1.00]
- **Shared Architecture Discipline (README + Roadmap)** — readme_one_raf, readme_scroll_outside_react, readme_gpu_props_only, feature_roadmap_react_never_owns_scroll, feature_roadmap_gpu_first, feature_roadmap_gsap_only [INFERRED 0.85]

## Communities (27 total, 4 thin omitted)

### Community 0 - "SEO Open Graph Images"
Cohesion: 0.07
Nodes (32): size, size, ScrollProgress(), ScrollRoot(), Section, SectionProps, SCROLL_DEFAULTS, SITE (+24 more)

### Community 1 - "Docs and Narrative Acts"
Cohesion: 0.06
Nodes (48): Next.js Dist Docs Guide, Next.js (Project-Specific Breaking APIs), Next.js Agent Rules, CLAUDE.md Agents Pointer, Act I — Introduction, Act II — Craft, Act III — Projects, Act IV — Proof (+40 more)

### Community 2 - "3D Scene Host Factory"
Cohesion: 0.14
Nodes (24): SceneHost(), createAboutScene(), createContactScene(), createHeroScene(), createIntroScene(), createProjectsScene(), createSkillsScene(), easeInOutCubic() (+16 more)

### Community 3 - "Asset Loaders Factories"
Cohesion: 0.10
Nodes (27): AssetOptions, font(), image(), loadFont(), loadImage(), loadModel(), loadTexture(), loadVideo() (+19 more)

### Community 4 - "Home Page Canvas R3F"
Cohesion: 0.09
Nodes (24): CameraRig(), CanvasRoot(), R3FCanvas, Effects, PostFX(), ScrollMesh(), AppShell(), Footer() (+16 more)

### Community 5 - "ESLint Prettier Tooling"
Cohesion: 0.05
Nodes (40): eslint, eslint-config-next, eslint-config-prettier, devDependencies, eslint, eslint-config-next, eslint-config-prettier, prettier (+32 more)

### Community 6 - "Runtime NPM Dependencies"
Cohesion: 0.05
Nodes (37): class-variance-authority, clsx, framer-motion, gsap, lenis, lucide-react, motion, next (+29 more)

### Community 7 - "Root Layout Metadata GSAP"
Cohesion: 0.11
Nodes (24): body, display, jsonLd, metadata, mono, viewport, ensureGsap(), getSceneManager() (+16 more)

### Community 8 - "TypeScript Compiler Config"
Cohesion: 0.06
Nodes (31): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+23 more)

### Community 9 - "RAF Scheduler Engine"
Cohesion: 0.13
Nodes (11): RAF_PRIORITIES, createId(), getRafScheduler(), RafScheduler, resetRafScheduler(), useRaf(), RafCallback, RafPriority (+3 more)

### Community 10 - "Scene Manager Lifecycle"
Cohesion: 0.18
Nodes (15): resolveRange(), SceneManager, sectionProgress(), lerp(), sampleTrack(), Timeline, RafFrame, SceneContext (+7 more)

### Community 11 - "Path Alias Imports"
Cohesion: 0.11
Nodes (19): ./src/assets/*, ./src/components/*, ./src/constants/*, ./src/engine/*, ./src/hooks/*, ./src/providers/*, ./src/styles/*, ./src/types/* (+11 more)

### Community 12 - "shadcn Components Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 13 - "Idle Prefetch Intersection"
Cohesion: 0.14
Nodes (11): IdleTask, runWhenIdle(), schedulePrefetch(), cacheKey(), IntersectionHandler, observeIntersection(), ObserveIntersectionOptions, observerCache (+3 more)

### Community 14 - "Prettier Tailwind Utils"
Cohesion: 0.17
Nodes (11): plugins, printWidth, semi, singleQuote, tabWidth, tailwindFunctions, tailwindStylesheet, trailingComma (+3 more)

### Community 15 - "GLSL Global Type Decl"
Cohesion: 0.20
Nodes (9): *.frag, *.fs, *.glsl, RequestIdleCallbackDeadline, RequestIdleCallbackHandle, RequestIdleCallbackOptions, *.vert, *.vs (+1 more)

### Community 16 - "Button UI Component"
Cohesion: 0.39
Nodes (4): Button, ButtonProps, buttonVariants, cn()

### Community 17 - "Globe SVG Public Asset"
Cohesion: 0.33
Nodes (6): Clip path #a, Fill color #666, Next.js starter globe icon, Static public asset, SVG vector graphic, Globe wireframe paths

### Community 18 - "File SVG Public Asset"
Cohesion: 0.33
Nodes (5): Text content lines, Document / file icon, Folded page corner, Neutral gray fill #666, Next.js starter public icon

### Community 19 - "Next.js Logo SVG"
Cohesion: 0.33
Nodes (5): Next.js, Black fill #000, Next.js logo wordmark, Public static asset, SVG format

### Community 20 - "Vercel Logo SVG"
Cohesion: 0.50
Nodes (4): White fill #fff, Vercel logo triangle, Triangle path d="m577.3 0 577.4 1000H0z", viewBox 0 0 1155 1000

### Community 21 - "Window SVG Public Asset"
Cohesion: 0.40
Nodes (4): Browser window icon, Window frame, Gray fill #666, Title bar control dots

## Knowledge Gaps
- **165 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `tabWidth` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScrollManager` connect `SEO Open Graph Images` to `Scene Manager Lifecycle`, `Root Layout Metadata GSAP`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `ScrollSnapshot` connect `Scene Manager Lifecycle` to `SEO Open Graph Images`, `Asset Loaders Factories`, `Home Page Canvas R3F`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SEO Open Graph Images` be split into smaller, more focused modules?**
  _Cohesion score 0.06506849315068493 - nodes in this community are weakly interconnected._
- **Should `Docs and Narrative Acts` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Should `3D Scene Host Factory` be split into smaller, more focused modules?**
  _Cohesion score 0.13636363636363635 - nodes in this community are weakly interconnected._
- **Should `Asset Loaders Factories` be split into smaller, more focused modules?**
  _Cohesion score 0.09797979797979799 - nodes in this community are weakly interconnected._