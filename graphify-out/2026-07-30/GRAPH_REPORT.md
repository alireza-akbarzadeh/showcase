# Graph Report - showcase  (2026-07-30)

## Corpus Check
- 100 files · ~26,131 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 627 nodes · 1301 edges · 33 communities (26 shown, 7 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dbd6eba1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types/index.ts
- Showcase Portfolio Foundation
- scene-host.tsx
- factories.ts
- camera-rig.tsx
- devDependencies
- dependencies
- scroll-provider.tsx
- compilerOptions
- RafScheduler
- scene.ts
- paths
- components.json
- intersection.ts
- .prettierrc.json
- global.d.ts
- constants/index.ts
- globe.svg
- Document / file icon
- Next.js logo wordmark
- Triangle path d="m577.3 0 577.4 1000H0z"
- window.svg
- shaders/index.ts
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- getScrollManager
- include
- lib
- graphify
- graphify
- @/constants/*

## God Nodes (most connected - your core abstractions)
1. `ScrollManager` - 27 edges
2. `getScrollManager()` - 24 edges
3. `compilerOptions` - 20 edges
4. `RafScheduler` - 19 edges
5. `ScrollSnapshot` - 18 edges
6. `setTransform()` - 17 edges
7. `SceneDefinition` - 16 edges
8. `setOpacity()` - 16 edges
9. `easeOutCubic()` - 15 edges
10. `createTimeline()` - 15 edges

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

## Communities (33 total, 7 thin omitted)

### Community 0 - "types/index.ts"
Cohesion: 0.12
Nodes (16): SectionProps, getBreakpoint(), getViewportSize(), prefersReducedMotion(), createInitialSnapshot(), emptySections(), ScrollManager, SceneRange (+8 more)

### Community 1 - "Showcase Portfolio Foundation"
Cohesion: 0.06
Nodes (48): Next.js Dist Docs Guide, Next.js (Project-Specific Breaking APIs), Next.js Agent Rules, CLAUDE.md Agents Pointer, Act I — Introduction, Act II — Craft, Act III — Projects, Act IV — Proof (+40 more)

### Community 2 - "scene-host.tsx"
Cohesion: 0.17
Nodes (25): SceneHost(), SceneHostProps, createAboutScene(), createContactScene(), createHeroScene(), createIntroScene(), createProjectsScene(), createProofScene() (+17 more)

### Community 3 - "factories.ts"
Cohesion: 0.10
Nodes (25): AssetOptions, font(), image(), loadFont(), loadImage(), loadModel(), loadTexture(), loadVideo() (+17 more)

### Community 4 - "camera-rig.tsx"
Cohesion: 0.13
Nodes (14): CameraRig(), Effects, PostFX(), PERFORMANCE, CameraState, createCameraState(), dampCamera(), RendererConfig (+6 more)

### Community 5 - "devDependencies"
Cohesion: 0.04
Nodes (45): eslint, eslint-config-next, eslint-config-prettier, devDependencies, eslint, eslint-config-next, eslint-config-prettier, prettier (+37 more)

### Community 6 - "dependencies"
Cohesion: 0.06
Nodes (35): class-variance-authority, clsx, gsap, lenis, lucide-react, next, dependencies, class-variance-authority (+27 more)

### Community 7 - "scroll-provider.tsx"
Cohesion: 0.11
Nodes (27): CanvasRoot(), R3FCanvas, HeroSection(), HeroSectionProps, ExperienceLoader(), LoaderProps, ensureGsap(), getSceneManager() (+19 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, baseUrl, esModuleInterop, exactOptionalPropertyTypes, incremental, isolatedModules, jsx (+10 more)

### Community 9 - "RafScheduler"
Cohesion: 0.14
Nodes (9): createId(), getRafScheduler(), RafScheduler, resetRafScheduler(), RafCallback, RafPriority, RafSchedulerApi, RafSchedulerOptions (+1 more)

### Community 10 - "scene.ts"
Cohesion: 0.16
Nodes (17): EasingFn, linear(), resolveRange(), SceneManager, sectionProgress(), lerp(), sampleTrack(), Timeline (+9 more)

### Community 11 - "paths"
Cohesion: 0.12
Nodes (17): ./src/assets/*, ./src/components/*, ./src/engine/*, ./src/hooks/*, ./src/providers/*, ./src/styles/*, ./src/types/*, ./src/utils/* (+9 more)

### Community 12 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 13 - "intersection.ts"
Cohesion: 0.15
Nodes (11): IdleTask, runWhenIdle(), schedulePrefetch(), cacheKey(), IntersectionHandler, observeIntersection(), ObserveIntersectionOptions, observerCache (+3 more)

### Community 14 - ".prettierrc.json"
Cohesion: 0.17
Nodes (11): plugins, printWidth, semi, singleQuote, tabWidth, tailwindFunctions, tailwindStylesheet, trailingComma (+3 more)

### Community 15 - "global.d.ts"
Cohesion: 0.20
Nodes (9): *.frag, *.fs, *.glsl, RequestIdleCallbackDeadline, RequestIdleCallbackHandle, RequestIdleCallbackOptions, *.vert, *.vs (+1 more)

### Community 16 - "constants/index.ts"
Cohesion: 0.07
Nodes (24): body, display, jsonLd, metadata, mono, viewport, size, size (+16 more)

### Community 17 - "globe.svg"
Cohesion: 0.33
Nodes (6): Clip path #a, Fill color #666, Next.js starter globe icon, Static public asset, SVG vector graphic, Globe wireframe paths

### Community 18 - "Document / file icon"
Cohesion: 0.33
Nodes (5): Text content lines, Document / file icon, Folded page corner, Neutral gray fill #666, Next.js starter public icon

### Community 19 - "Next.js logo wordmark"
Cohesion: 0.33
Nodes (5): Next.js, Black fill #000, Next.js logo wordmark, Public static asset, SVG format

### Community 20 - "Triangle path d="m577.3 0 577.4 1000H0z""
Cohesion: 0.50
Nodes (4): White fill #fff, Vercel logo triangle, Triangle path d="m577.3 0 577.4 1000H0z", viewBox 0 0 1155 1000

### Community 21 - "window.svg"
Cohesion: 0.40
Nodes (4): Browser window icon, Window frame, Gray fill #666, Title bar control dots

### Community 27 - "getScrollManager"
Cohesion: 0.09
Nodes (28): HeroField(), ScrollMesh(), Experience(), AppShell(), Footer(), Header(), SkipLink(), ErrorBoundary (+20 more)

### Community 28 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 29 - "lib"
Cohesion: 0.50
Nodes (4): dom, dom.iterable, esnext, lib

## Knowledge Gaps
- **178 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi`, `singleQuote`, `trailingComma` (+173 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScrollManager` connect `types/index.ts` to `scene.ts`, `scroll-provider.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `ScrollSnapshot` connect `scene.ts` to `types/index.ts`, `getScrollManager`, `camera-rig.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi` to the rest of the system?**
  _178 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12195121951219512 - nodes in this community are weakly interconnected._
- **Should `Showcase Portfolio Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Should `factories.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10220673635307782 - nodes in this community are weakly interconnected._
- **Should `camera-rig.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._