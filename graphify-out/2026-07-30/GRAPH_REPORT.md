# Graph Report - showcase  (2026-07-30)

## Corpus Check
- 133 files · ~37,428 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 763 nodes · 1651 edges · 46 communities (29 shown, 17 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5c6cf49`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RafScheduler
- Showcase Portfolio Foundation
- scene-host.tsx
- factories.ts
- types/index.ts
- scripts
- dependencies
- scroll-provider.tsx
- compilerOptions
- ScrollManager
- devDependencies
- paths
- components.json
- @/constants/*
- .prettierrc.json
- global.d.ts
- contact-form.tsx
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
- package.json
- playground-shell.tsx
- eslint-config-prettier
- sort-scrub.tsx
- prettier-plugin-tailwindcss
- quality-guardian.ts
- eslint
- @next/bundle-analyzer
- raw-loader
- hero-section.tsx
- @types/react
- @types/three
- typescript

## God Nodes (most connected - your core abstractions)
1. `ScrollManager` - 27 edges
2. `getScrollManager()` - 25 edges
3. `getRafScheduler()` - 21 edges
4. `setTransform()` - 20 edges
5. `compilerOptions` - 20 edges
6. `RafScheduler` - 19 edges
7. `useReducedMotion()` - 18 edges
8. `ScrollSnapshot` - 18 edges
9. `scripts` - 17 edges
10. `easeOutCubic()` - 17 edges

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

## Communities (46 total, 17 thin omitted)

### Community 1 - "Showcase Portfolio Foundation"
Cohesion: 0.06
Nodes (48): Next.js Dist Docs Guide, Next.js (Project-Specific Breaking APIs), Next.js Agent Rules, CLAUDE.md Agents Pointer, Act I — Introduction, Act II — Craft, Act III — Projects, Act IV — Proof (+40 more)

### Community 2 - "scene-host.tsx"
Cohesion: 0.14
Nodes (36): SceneHost(), SceneHostProps, createAboutScene(), createContactScene(), createHeroScene(), createIntroScene(), chapterLocal(), morphAmount() (+28 more)

### Community 3 - "factories.ts"
Cohesion: 0.10
Nodes (25): AssetOptions, font(), image(), loadFont(), loadImage(), loadModel(), loadTexture(), loadVideo() (+17 more)

### Community 4 - "types/index.ts"
Cohesion: 0.06
Nodes (54): mulberry32(), WaveFieldExperiment(), Section, SectionProps, PROOF, RAF_PRIORITIES, SCENE_LABELS, SCROLL_DEFAULTS (+46 more)

### Community 5 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, analyze, build, dev, format, format:check, graphify:mcp, graphify:open (+9 more)

### Community 6 - "dependencies"
Cohesion: 0.06
Nodes (35): class-variance-authority, clsx, gsap, lenis, lucide-react, next, dependencies, class-variance-authority (+27 more)

### Community 7 - "scroll-provider.tsx"
Cohesion: 0.10
Nodes (27): body, display, jsonLd, metadata, mono, viewport, ensureGsap(), getSceneManager() (+19 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, baseUrl, esModuleInterop, exactOptionalPropertyTypes, incremental, isolatedModules, jsx (+10 more)

### Community 9 - "ScrollManager"
Cohesion: 0.14
Nodes (7): approachProgress(), resolveRange(), SceneManager, sectionProgress(), ScrollManager, ScrollContextValue, ScrollSnapshot

### Community 10 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint-config-next, devDependencies, eslint-config-next, prettier, tailwindcss, @tailwindcss/postcss, @types/node, @types/react-dom (+7 more)

### Community 11 - "paths"
Cohesion: 0.12
Nodes (17): ./src/assets/*, ./src/components/*, ./src/engine/*, ./src/hooks/*, ./src/providers/*, ./src/styles/*, ./src/types/*, ./src/utils/* (+9 more)

### Community 12 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 14 - ".prettierrc.json"
Cohesion: 0.17
Nodes (11): plugins, printWidth, semi, singleQuote, tabWidth, tailwindFunctions, tailwindStylesheet, trailingComma (+3 more)

### Community 15 - "global.d.ts"
Cohesion: 0.20
Nodes (9): *.frag, *.fs, *.glsl, RequestIdleCallbackDeadline, RequestIdleCallbackHandle, RequestIdleCallbackOptions, *.vert, *.vs (+1 more)

### Community 16 - "contact-form.tsx"
Cohesion: 0.09
Nodes (29): clientKey(), ContactActionResult, hits, rateLimited(), submitContact(), ContactForm(), Field(), Status (+21 more)

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
Cohesion: 0.08
Nodes (33): Experience(), HeroField, SceneHost, AppShell(), Footer(), Header(), SkipLink(), ErrorBoundary (+25 more)

### Community 28 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 29 - "lib"
Cohesion: 0.50
Nodes (4): dom, dom.iterable, esnext, lib

### Community 32 - "package.json"
Cohesion: 0.29
Nodes (6): engines, node, name, packageManager, private, version

### Community 33 - "playground-shell.tsx"
Cohesion: 0.10
Nodes (12): size, metadata, size, ExperimentId, ExperimentMeta, EXPERIMENTS, FPS_COST_LABEL, FpsCost (+4 more)

### Community 37 - "quality-guardian.ts"
Cohesion: 0.15
Nodes (12): Particle, ThankYouBurst(), PERFORMANCE, flagsFor(), getQualityGuardian(), QualityGuardian, resetQualityGuardian(), TIER_ORDER (+4 more)

### Community 42 - "hero-section.tsx"
Cohesion: 0.06
Nodes (43): CameraRig(), CanvasRoot(), R3FCanvas, HeroField(), PARTICLE_POSITIONS, Effects, PostFX(), ScrollMesh() (+35 more)

## Knowledge Gaps
- **203 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi`, `singleQuote`, `trailingComma` (+198 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RafScheduler` connect `RafScheduler` to `types/index.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ScrollManager` connect `ScrollManager` to `getScrollManager`, `types/index.ts`, `scroll-provider.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `getRafScheduler()` connect `types/index.ts` to `quality-guardian.ts`, `scroll-provider.tsx`, `ScrollManager`, `hero-section.tsx`, `getScrollManager`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi` to the rest of the system?**
  _203 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Showcase Portfolio Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Should `scene-host.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13659147869674185 - nodes in this community are weakly interconnected._
- **Should `factories.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09856035437430787 - nodes in this community are weakly interconnected._