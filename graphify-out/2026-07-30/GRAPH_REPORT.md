# Graph Report - showcase  (2026-07-30)

## Corpus Check
- 153 files · ~41,617 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 863 nodes · 1927 edges · 72 communities (48 shown, 24 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd974ac5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RafScheduler
- Showcase Portfolio Foundation
- scene-host.tsx
- factories.ts
- hooks/index.ts
- scripts
- dependencies
- quality-guardian.ts
- compilerOptions
- scene-manager.ts
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
- experience.tsx
- include
- lib
- graphify
- graphify
- package.json
- intersection.ts
- eslint-config-prettier
- sort-scrub.tsx
- prettier-plugin-tailwindcss
- constants/index.ts
- prettier
- @next/bundle-analyzer
- @tailwindcss/postcss
- getRafScheduler
- @types/react
- @types/three
- typescript
- cn
- types/index.ts
- SoundSystem
- playground-shell.tsx
- achievements.ts
- delight-hooks.tsx
- scroll-provider.tsx
- scheduler/raf.ts
- camera-rig.tsx
- resize.ts
- eslint
- achievements.test.ts
- useReducedMotion
- layout.tsx
- math.ts
- analytics.ts
- immersive-project.tsx
- getQualityGuardian
- idle.ts
- apple-icon.tsx
- icon.tsx
- opengraph-image.tsx
- privacy/page.tsx
- twitter-image.tsx
- motion-intensity.test.ts

## God Nodes (most connected - your core abstractions)
1. `ScrollManager` - 29 edges
2. `getScrollManager()` - 29 edges
3. `getRafScheduler()` - 25 edges
4. `cn()` - 24 edges
5. `useReducedMotion()` - 22 edges
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

## Communities (72 total, 24 thin omitted)

### Community 0 - "RafScheduler"
Cohesion: 0.16
Nodes (3): createId(), RafScheduler, resetRafScheduler()

### Community 1 - "Showcase Portfolio Foundation"
Cohesion: 0.06
Nodes (48): Next.js Dist Docs Guide, Next.js (Project-Specific Breaking APIs), Next.js Agent Rules, CLAUDE.md Agents Pointer, Act I — Introduction, Act II — Craft, Act III — Projects, Act IV — Proof (+40 more)

### Community 2 - "scene-host.tsx"
Cohesion: 0.10
Nodes (44): SceneHost(), SceneHostProps, createAboutScene(), createContactScene(), createHeroScene(), createIntroScene(), chapterLocal(), morphAmount() (+36 more)

### Community 3 - "factories.ts"
Cohesion: 0.10
Nodes (25): AssetOptions, font(), image(), loadFont(), loadImage(), loadModel(), loadTexture(), loadVideo() (+17 more)

### Community 4 - "hooks/index.ts"
Cohesion: 0.07
Nodes (32): ScrollMesh(), getPerfFlag(), PerfOverlay(), subscribePerfFlag(), ActIndicators(), ScrollProgress(), ScrollRoot(), Section (+24 more)

### Community 5 - "scripts"
Cohesion: 0.11
Nodes (18): scripts, analyze, build, dev, format, format:check, graphify:mcp, graphify:open (+10 more)

### Community 6 - "dependencies"
Cohesion: 0.06
Nodes (35): class-variance-authority, clsx, gsap, lenis, lucide-react, next, dependencies, class-variance-authority (+27 more)

### Community 7 - "quality-guardian.ts"
Cohesion: 0.17
Nodes (10): PERFORMANCE, flagsFor(), QualityGuardian, resetQualityGuardian(), TIER_ORDER, CanvasContext, CanvasContextValue, QualityFlags (+2 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, baseUrl, esModuleInterop, exactOptionalPropertyTypes, incremental, isolatedModules, jsx (+10 more)

### Community 9 - "scene-manager.ts"
Cohesion: 0.31
Nodes (10): approachProgress(), resetSceneManager(), resolveRange(), SceneManager, sectionProgress(), RafFrame, SceneContext, SceneDefinition (+2 more)

### Community 10 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint-config-next, @lhci/cli, devDependencies, eslint-config-next, @lhci/cli, raw-loader, tailwindcss, @types/node (+7 more)

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

### Community 27 - "experience.tsx"
Cohesion: 0.13
Nodes (13): Experience(), HeroField, SceneHost, AppShell(), Footer(), Header(), SkipLink(), ErrorBoundary (+5 more)

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

### Community 37 - "constants/index.ts"
Cohesion: 0.16
Nodes (8): PROOF, SCENE_LABELS, AboutChapter, CareerStop, SkillCluster, SkillEdge, SkillNode, StackLayer

### Community 42 - "getRafScheduler"
Cohesion: 0.16
Nodes (18): HeroField(), PARTICLE_POSITIONS, CursorMode, CustomCursor(), Magnetic(), MagneticProps, mulberry32(), WaveFieldExperiment() (+10 more)

### Community 46 - "cn"
Cohesion: 0.17
Nodes (12): ContactForm(), Field(), AboutSection(), AboutSectionProps, ProofSection, ProofSectionProps, SkillsSection(), SkillsSectionProps (+4 more)

### Community 48 - "types/index.ts"
Cohesion: 0.24
Nodes (11): ProjectArchEdge, ProjectChapter, ProjectChapterId, ProjectMetric, ProjectStackNode, ProofComparison, ProofEvidence, ProofMetric (+3 more)

### Community 49 - "SoundSystem"
Cohesion: 0.23
Nodes (3): resetSoundSystem(), SoundCue, SoundSystem

### Community 50 - "playground-shell.tsx"
Cohesion: 0.18
Nodes (11): metadata, SoundToggle(), ExperimentId, ExperimentMeta, EXPERIMENTS, FPS_COST_LABEL, FpsCost, PlaygroundShell() (+3 more)

### Community 51 - "achievements.ts"
Cohesion: 0.21
Nodes (9): AchievementToasts(), Toast, Achievement, AchievementId, ACHIEVEMENTS, Listener, listeners, subscribeAchievements() (+1 more)

### Community 52 - "delight-hooks.tsx"
Cohesion: 0.40
Nodes (8): DelightHooks(), getSoundSystem(), getServerSnapshot(), getSnapshot(), playSound(), subscribe(), toggleSound(), useSoundEnabled()

### Community 53 - "scroll-provider.tsx"
Cohesion: 0.10
Nodes (35): useMotionIntensity(), useMotionRestricted(), useAccentColor(), useSetThemeMode(), useTheme(), getMotionIntensity(), Listener, listeners (+27 more)

### Community 54 - "scheduler/raf.ts"
Cohesion: 0.43
Nodes (6): RAF_PRIORITIES, RafCallback, RafPriority, RafSchedulerApi, RafSchedulerOptions, RafSubscription

### Community 55 - "camera-rig.tsx"
Cohesion: 0.19
Nodes (11): CameraRig(), CanvasRoot(), R3FCanvas, Effects, PostFX(), CameraState, createCameraState(), dampCamera() (+3 more)

### Community 56 - "resize.ts"
Cohesion: 0.50
Nodes (3): observeResize(), ResizeHandler, SharedResizeObserver

### Community 59 - "useReducedMotion"
Cohesion: 0.25
Nodes (10): HeroSection(), HeroSectionProps, ExperienceLoader(), LoaderProps, SITE, ensureGsap(), prefersReducedMotion(), useRaf() (+2 more)

### Community 60 - "layout.tsx"
Cohesion: 0.22
Nodes (7): body, display, jsonLd, metadata, mono, viewport, SOCIALS

### Community 61 - "math.ts"
Cohesion: 0.47
Nodes (6): approx(), clamp(), inverseLerp(), lerp(), mapRange(), mod()

### Community 62 - "analytics.ts"
Cohesion: 0.39
Nodes (6): AnalyticsPayload, firedActs, plausibleDomain(), resetAnalyticsSession(), trackActEnter(), trackEvent()

### Community 63 - "immersive-project.tsx"
Cohesion: 0.47
Nodes (4): ImmersiveProject, ImmersiveProjectProps, OrbitProject, ProjectCaseStudy

### Community 64 - "getQualityGuardian"
Cohesion: 0.67
Nodes (3): Particle, ThankYouBurst(), getQualityGuardian()

### Community 65 - "idle.ts"
Cohesion: 0.67
Nodes (3): IdleTask, runWhenIdle(), schedulePrefetch()

## Knowledge Gaps
- **223 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi`, `singleQuote`, `trailingComma` (+218 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScrollManager` connect `hooks/index.ts` to `scene-manager.ts`, `scroll-provider.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `RafScheduler` connect `RafScheduler` to `getRafScheduler`, `scheduler/raf.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `getRafScheduler()` connect `getRafScheduler` to `getQualityGuardian`, `hooks/index.ts`, `quality-guardian.ts`, `scene-manager.ts`, `scroll-provider.tsx`, `scheduler/raf.ts`, `useReducedMotion`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `${userHome}/.local/bin/graphify-mcp`, `semi` to the rest of the system?**
  _223 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Showcase Portfolio Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Should `scene-host.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10100603621730382 - nodes in this community are weakly interconnected._
- **Should `factories.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10220673635307782 - nodes in this community are weakly interconnected._