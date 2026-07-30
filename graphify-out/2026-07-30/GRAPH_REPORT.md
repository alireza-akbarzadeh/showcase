# Graph Report - showcase  (2026-07-30)

## Corpus Check
- 162 files · ~43,567 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 893 nodes · 2016 edges · 72 communities (50 shown, 22 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1dfa1dcf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types/index.ts
- Showcase Portfolio Foundation
- scene-host.tsx
- factories.ts
- engine/scroll/index.ts
- scripts
- dependencies
- RafScheduler
- compilerOptions
- constants/index.ts
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
- ScrollManager
- include
- lib
- graphify
- graphify
- package.json
- intersection.ts
- eslint-config-prettier
- sort-scrub.tsx
- hooks/index.ts
- scene-manager.ts
- eslint
- quality-guardian.ts
- @tailwindcss/postcss
- hero-field.tsx
- @types/react
- prettier-plugin-tailwindcss
- @types/three
- cn
- typescript
- SoundSystem
- getScrollManager
- delight-hooks.tsx
- monitoring.ts
- scroll-provider.tsx
- getRafScheduler
- camera-rig.tsx
- observers/index.ts
- playground-shell.tsx
- achievements.test.ts
- useReducedMotion
- @types/react-dom
- math.ts
- scene.ts
- experience.tsx
- button.tsx
- layout/index.ts
- apple-icon.tsx
- icon.tsx
- resume/page.tsx
- section.tsx
- prettier
- motion-intensity.test.ts

## God Nodes (most connected - your core abstractions)
1. `getScrollManager()` - 30 edges
2. `ScrollManager` - 29 edges
3. `cn()` - 26 edges
4. `getRafScheduler()` - 25 edges
5. `useReducedMotion()` - 24 edges
6. `setTransform()` - 20 edges
7. `compilerOptions` - 20 edges
8. `RafScheduler` - 19 edges
9. `scripts` - 18 edges
10. `ScrollSnapshot` - 18 edges

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

## Communities (72 total, 22 thin omitted)

### Community 0 - "types/index.ts"
Cohesion: 0.18
Nodes (14): ImmersiveProject, ImmersiveProjectProps, OrbitProject, ProjectArchEdge, ProjectCaseStudy, ProjectChapter, ProjectChapterId, ProjectMetric (+6 more)

### Community 1 - "Showcase Portfolio Foundation"
Cohesion: 0.06
Nodes (48): Next.js Dist Docs Guide, Next.js (Project-Specific Breaking APIs), Next.js Agent Rules, CLAUDE.md Agents Pointer, Act I — Introduction, Act II — Craft, Act III — Projects, Act IV — Proof (+40 more)

### Community 2 - "scene-host.tsx"
Cohesion: 0.14
Nodes (34): SceneHost(), SceneHostProps, createAboutScene(), createContactScene(), createHeroScene(), createIntroScene(), chapterLocal(), morphAmount() (+26 more)

### Community 3 - "factories.ts"
Cohesion: 0.10
Nodes (25): AssetOptions, font(), image(), loadFont(), loadImage(), loadModel(), loadTexture(), loadVideo() (+17 more)

### Community 4 - "engine/scroll/index.ts"
Cohesion: 0.23
Nodes (14): SCROLL_DEFAULTS, getBreakpoint(), getViewportSize(), prefersReducedMotion(), createInitialSnapshot(), emptySections(), useBreakpoint(), Breakpoint (+6 more)

### Community 5 - "scripts"
Cohesion: 0.11
Nodes (18): scripts, analyze, build, dev, format, format:check, graphify:mcp, graphify:open (+10 more)

### Community 6 - "dependencies"
Cohesion: 0.05
Nodes (39): class-variance-authority, clsx, gsap, lenis, lucide-react, next, dependencies, class-variance-authority (+31 more)

### Community 7 - "RafScheduler"
Cohesion: 0.14
Nodes (9): RAF_PRIORITIES, createId(), RafScheduler, resetRafScheduler(), RafCallback, RafPriority, RafSchedulerApi, RafSchedulerOptions (+1 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, baseUrl, esModuleInterop, exactOptionalPropertyTypes, incremental, isolatedModules, jsx (+10 more)

### Community 9 - "constants/index.ts"
Cohesion: 0.10
Nodes (15): size, metadata, size, PROOF, SCENE_LABELS, SITE, syncLocationChrome(), titleForHash() (+7 more)

### Community 10 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint-config-next, @lhci/cli, @next/bundle-analyzer, devDependencies, eslint-config-next, @lhci/cli, @next/bundle-analyzer, raw-loader (+7 more)

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
Cohesion: 0.20
Nodes (14): clientKey(), ContactActionResult, hits, rateLimited(), submitContact(), EmailLockup(), Status, ContactFieldErrors (+6 more)

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

### Community 28 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 29 - "lib"
Cohesion: 0.50
Nodes (4): dom, dom.iterable, esnext, lib

### Community 32 - "package.json"
Cohesion: 0.29
Nodes (6): engines, node, name, packageManager, private, version

### Community 33 - "intersection.ts"
Cohesion: 0.40
Nodes (5): cacheKey(), IntersectionHandler, observeIntersection(), ObserveIntersectionOptions, observerCache

### Community 36 - "hooks/index.ts"
Cohesion: 0.30
Nodes (11): getSoundSystem(), useIsMobile(), useMediaQuery(), useSectionProgress(), getServerSnapshot(), getSnapshot(), playSound(), subscribe() (+3 more)

### Community 37 - "scene-manager.ts"
Cohesion: 0.35
Nodes (8): approachProgress(), resolveRange(), SceneManager, sectionProgress(), RafFrame, SceneContext, SceneDefinition, ScrollSnapshot

### Community 39 - "quality-guardian.ts"
Cohesion: 0.17
Nodes (10): PERFORMANCE, flagsFor(), QualityGuardian, resetQualityGuardian(), TIER_ORDER, CanvasContext, CanvasContextValue, QualityFlags (+2 more)

### Community 42 - "hero-field.tsx"
Cohesion: 0.24
Nodes (10): HeroField(), PARTICLE_POSITIONS, client, getPointerState(), onPointerMove(), PointerClient, PointerState, retainPointerTracking() (+2 more)

### Community 46 - "cn"
Cohesion: 0.18
Nodes (13): Field(), AboutSection(), AboutSectionProps, ProofSection, ProofSectionProps, SkillsSection(), SkillsSectionProps, AchievementToasts() (+5 more)

### Community 49 - "SoundSystem"
Cohesion: 0.23
Nodes (3): resetSoundSystem(), SoundCue, SoundSystem

### Community 50 - "getScrollManager"
Cohesion: 0.23
Nodes (13): ScrollMesh(), getPerfFlag(), PerfOverlay(), subscribePerfFlag(), ActIndicators(), ScrollProgress(), ScrollRoot(), Section (+5 more)

### Community 51 - "delight-hooks.tsx"
Cohesion: 0.15
Nodes (13): DelightHooks(), resolveHashId(), ACHIEVEMENTS, Listener, listeners, unlockAchievement(), writeUnlocked(), AnalyticsPayload (+5 more)

### Community 52 - "monitoring.ts"
Cohesion: 0.18
Nodes (10): ErrorBoundary, Props, State, MonitoringBoot(), initMonitoring(), loadSentry(), reportError(), resetMonitoring() (+2 more)

### Community 53 - "scroll-provider.tsx"
Cohesion: 0.07
Nodes (45): display, jsonLd, metadata, mono, sans, viewport, ActTransitionVeil(), getSceneManager() (+37 more)

### Community 54 - "getRafScheduler"
Cohesion: 0.25
Nodes (11): Particle, ThankYouBurst(), CursorMode, CustomCursor(), Magnetic(), MagneticProps, mulberry32(), WaveFieldExperiment() (+3 more)

### Community 55 - "camera-rig.tsx"
Cohesion: 0.19
Nodes (11): CameraRig(), CanvasRoot(), R3FCanvas, Effects, PostFX(), CameraState, createCameraState(), dampCamera() (+3 more)

### Community 56 - "observers/index.ts"
Cohesion: 0.22
Nodes (6): IdleTask, runWhenIdle(), schedulePrefetch(), observeResize(), ResizeHandler, SharedResizeObserver

### Community 57 - "playground-shell.tsx"
Cohesion: 0.20
Nodes (9): metadata, ExperimentId, ExperimentMeta, EXPERIMENTS, FPS_COST_LABEL, FpsCost, PlaygroundShell(), SortScrubExperiment (+1 more)

### Community 59 - "useReducedMotion"
Cohesion: 0.29
Nodes (10): SignatureMotif(), SignatureMotifProps, SIZES, HeroSection(), HeroSectionProps, ExperienceLoader(), LoaderProps, ensureGsap() (+2 more)

### Community 61 - "math.ts"
Cohesion: 0.47
Nodes (6): approx(), clamp(), inverseLerp(), lerp(), mapRange(), mod()

### Community 62 - "scene.ts"
Cohesion: 0.26
Nodes (8): EasingFn, lerp(), sampleTrack(), Timeline, TimelineDefinition, TimelineInstance, TimelineKeyframe, TimelineTrack

### Community 63 - "experience.tsx"
Cohesion: 0.22
Nodes (7): ContactForm(), Experience(), HeroField, SceneHost, SHORTCUTS, ShortcutsOverlay(), useKeyboardNavigation()

### Community 64 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button, ButtonProps, buttonVariants

### Community 65 - "layout/index.ts"
Cohesion: 0.50
Nodes (5): AppShell(), Footer(), Header(), SkipLink(), SoundToggle()

### Community 68 - "resume/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PrintButton(), SOCIALS

### Community 69 - "section.tsx"
Cohesion: 0.83
Nodes (3): SectionProps, SceneId, SectionProgress

## Knowledge Gaps
- **229 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi`, `singleQuote`, `trailingComma` (+224 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScrollManager` connect `ScrollManager` to `scroll-provider.tsx`, `engine/scroll/index.ts`, `scene-manager.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `RafScheduler` connect `RafScheduler` to `getRafScheduler`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `getRafScheduler()` connect `getRafScheduler` to `engine/scroll/index.ts`, `scene-manager.ts`, `RafScheduler`, `quality-guardian.ts`, `getScrollManager`, `scroll-provider.tsx`, `camera-rig.tsx`, `ScrollManager`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi` to the rest of the system?**
  _229 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Showcase Portfolio Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Should `scene-host.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1414141414141414 - nodes in this community are weakly interconnected._
- **Should `factories.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10220673635307782 - nodes in this community are weakly interconnected._