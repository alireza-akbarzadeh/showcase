# FEATURE ROADMAP

**Showcase — Scroll-Driven Developer Portfolio**  
Blueprint for implementation · Living product document · 2026

> Do not treat this as inspiration. Treat it as the contract.
> Another engineer or AI agent should be able to ship the product from this file alone.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design Philosophy](#2-design-philosophy)
3. [Narrative Architecture (Five Acts)](#3-narrative-architecture-five-acts)
4. [Architecture Overview](#4-architecture-overview)
5. [Technology Decisions](#5-technology-decisions)
6. [Performance Budget](#6-performance-budget)
7. [Success Metrics](#7-success-metrics)
8. [Milestone Checklist](#8-milestone-checklist)
9. [Phase 0 — Research](#phase-0--research)
10. [Phase 1 — Infrastructure](#phase-1--infrastructure)
11. [Phase 2 — Navigation & Global Systems](#phase-2--navigation--global-systems)
12. [Phase 3 — Hero (Act I)](#phase-3--hero-act-i)
13. [Phase 4 — Projects (Act III)](#phase-4--projects-act-iii)
14. [Phase 5 — Skills (Act II / Craft)](#phase-5--skills-act-ii--craft)
15. [Phase 6 — About (Act II / Story)](#phase-6--about-act-ii--story)
16. [Phase 7 — Creative Playground](#phase-7--creative-playground)
17. [Phase 8 — Contact (Act V)](#phase-8--contact-act-v)
18. [Phase 9 — Performance Hardening](#phase-9--performance-hardening)
19. [Phase 10 — Polish & Delight](#phase-10--polish--delight)
20. [Act IV — Proof (Cross-Cutting)](#act-iv--proof-cross-cutting)
21. [Bonus Features (100+)](#21-bonus-features-100)
22. [Feature Dependency Graph](#22-feature-dependency-graph)
23. [Risk Assessment](#23-risk-assessment)
24. [Accessibility Checklist](#24-accessibility-checklist)
25. [SEO Checklist](#25-seo-checklist)
26. [QA Checklist](#26-qa-checklist)
27. [Browser Support Strategy](#27-browser-support-strategy)
28. [Mobile Strategy](#28-mobile-strategy)
29. [Launch Checklist](#29-launch-checklist)
30. [Future Expansion](#30-future-expansion)

---

## 1. Executive Summary

### What we are building

A single-page, scroll-directed portfolio experience that feels like an interactive digital world — not a marketing site with sections. Scroll is the primary interface. Every scene advances a narrative about how the author builds software.

### Why it exists

| Audience | Desired outcome |
|---|---|
| Recruiters | Bookmark, share, shortlist |
| Developers | Inspect source, learn patterns, respect craft |
| Clients | Understand capability → contact |
| Self | Living lab for creative engineering |

### Positioning statement

> “I build software differently.”  
> Proven through motion discipline, performance budgets, architectural clarity, and storytelling — not through buzzwords.

### Non-goals

- Generic React portfolio templates
- Card grids that could belong to anyone
- Framer Motion / Motion One for scroll (GSAP only)
- Decorative animation without narrative purpose
- Disabling creativity on mobile

### Current codebase status (as of foundation)

Phase 1 core is largely scaffolded:

- Next.js 16 · React 19 · TypeScript · pnpm · Tailwind v4
- RAF scheduler · Scroll manager (Lenis) · Timeline · Scene manager
- Asset loader · Observers · Canvas (R3F) · Theme · SEO stubs
- Scene hosts for Hero → Contact (boilerplate)

This roadmap defines what to build **on top of** that foundation.

---

## 2. Design Philosophy

### Core principles

1. **Motion has purpose** — every tween teaches hierarchy, state, or narrative progress.
2. **Scroll is storytelling** — progress maps to acts, not just opacity fades.
3. **GPU-first** — animate `transform`, `opacity`, shader uniforms, camera only.
4. **React never owns scroll frames** — RAF + refs + engines outside React.
5. **Performance over spectacle** — cut effects before cutting FPS.
6. **Accessibility-first** — `prefers-reduced-motion`, keyboard, semantics, focus.
7. **Progressive enhancement** — content readable without WebGL / smooth scroll.
8. **Mobile is equal** — different timelines, not a stripped corpse.
9. **Delight with restraint** — surprise moments earn their place.
10. **Engineering is visible** — architecture, metrics, and discipline are part of the brand.

### Visual direction (lock early in Phase 0)

| Axis | Decision |
|---|---|
| Mode | Dark-first |
| Accent | Dynamic CSS `--accent` (default electric mint) |
| Type | Display serif + geometric sans (already: Instrument Serif / Manrope) |
| Atmosphere | Depth via lighting, grain, vignette — not purple glow clichés |
| Layout | One composition per viewport; no dashboard chrome in heroes |
| Cards | Avoid by default; only for interactive containers |

### Anti-patterns (explicit ban list)

- Purple-on-white / indigo gradient defaults
- Cream + terracotta “AI portfolio” look
- Broadsheet newspaper layouts
- Floating badge / sticker overlays on heroes
- Animating `width` / `height` / `top` / `left` / margin / padding
- Multiple `requestAnimationFrame` loops
- `setState` on scroll

---

## 3. Narrative Architecture (Five Acts)

Differentiation for 2026: **do not stop at “everything moves on scroll.”**  
Make scroll a directed experience.

```
┌─────────────────────────────────────────────────────────────┐
│  ACT I — INTRODUCTION                                       │
│  Bold identity · cinematic entrance · world establishes     │
├─────────────────────────────────────────────────────────────┤
│  ACT II — CRAFT                                             │
│  How you think / design / engineer — visualizations > text  │
├─────────────────────────────────────────────────────────────┤
│  ACT III — PROJECTS                                         │
│  Each project = immersive scene tied to scroll progress     │
├─────────────────────────────────────────────────────────────┤
│  ACT IV — PROOF                                             │
│  Metrics · architecture · GitHub · before/after · case data │
├─────────────────────────────────────────────────────────────┤
│  ACT V — CONTACT                                            │
│  Journey completion · memorable send · invitation to work   │
└─────────────────────────────────────────────────────────────┘
```

### Act → Scene mapping

| Act | Primary scenes | Scroll progress (approx.) |
|---|---|---|
| I Introduction | Hero + Intro | 0% – 18% |
| II Craft | Skills + About (thinking) | 18% – 40% |
| III Projects | Projects (multi-scene) | 40% – 72% |
| IV Proof | Proof / Impact overlay within Projects + dedicated Proof strip | 60% – 85% |
| V Contact | Contact + Thank-you | 85% – 100% |

Playground is optional side quest (nav entry / deep link) — not mandatory in linear scroll.

### Narrative beats (must-ship copy/structure)

1. **Name as brand signal** in first viewport (stronger than headline).
2. **One promise sentence**: what you build differently.
3. **Craft demo**: interactive system showing engineering taste.
4. **Project immersion**: 3–5 deep scenes, not 12 shallow cards.
5. **Proof**: numbers that survive scrutiny.
6. **Contact**: completion ritual, not a form dump.

---

## 4. Architecture Overview

### Runtime topology

```
                    ┌──────────────────────┐
                    │   AppProviders       │
                    │ Theme · Motion ·     │
                    │ Scroll · Canvas      │
                    └──────────┬───────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ScrollManager   │  │ RafScheduler    │  │ SceneManager    │
│ (Lenis SoT)     │──▶│ (single RAF)    │◀─│ enter/leave/    │
│ y,v,dir,progress│  │ priorities      │  │ progress/update │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         │           ┌────────┴────────┐           │
         │           ▼                 ▼           │
         │    DOM transforms     R3F / shaders     │
         │    (GPU props)        (camera/uniforms) │
         ▼                                         ▼
   Section registry                        Timeline tracks
```

### Layer rules (non-negotiable)

| Layer | Owns | Must not own |
|---|---|---|
| `engine/` | RAF, scroll, timelines, assets, observers | JSX, page copy |
| `components/creative/scenes/` | Scene factories + DOM bindings | Global scroll loop |
| `components/canvas/` | WebGL world | Business copy |
| `app/` | Composition, metadata | Animation logic |
| React hooks | Subscription wiring | Per-frame `setState` |

### Animation ownership

| Concern | Tool |
|---|---|
| Scroll-linked motion | Custom Timeline + ScrollManager (+ GSAP ScrollTrigger when pinning/scrub helpers needed) |
| Imperative UI tweens | GSAP only |
| Smooth scroll | Lenis (driven by shared RAF) |
| 3D | Three / R3F / Drei / postprocessing |
| Micro CSS | CSS transitions for trivial hover (optional) |
| **Banned for scroll** | Framer Motion, Motion One |

---

## 5. Technology Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 App Router | RSC, metadata, OG, performance |
| UI | React 19 | Concurrent patterns where useful |
| Language | TypeScript strict | No `any` |
| Package manager | pnpm | Deterministic, fast |
| Styling | Tailwind v4 + CSS variables | Theme tokens |
| Animation | **GSAP only** | One runtime; scroll + UI |
| Smooth scroll | Lenis | Industry standard with RAF control |
| 3D | R3F + Three + Drei | React-friendly WebGL |
| Post FX | `@react-three/postprocessing` | Lazy-loaded |
| UI primitives | Radix + CVA + shadcn | A11y + consistency |
| Motion libs removed | `framer-motion`, `motion` | Bundle + architectural clarity |
| Analytics | Plausible or Vercel Analytics (privacy-first) | Recruiter metrics without creepy tracking |
| Errors | Error boundaries + optional Sentry | Production resilience |
| Testing | Vitest + Playwright + axe | Unit + e2e + a11y |

---

## 6. Performance Budget

### Targets (modern hardware)

| Metric | Budget |
|---|---|
| FPS (desktop scroll) | 60 sustained · 120 capable |
| FPS (mobile mid-tier) | ≥ 50 sustained |
| LCP | ≤ 2.0s |
| INP | ≤ 200ms |
| CLS | ≤ 0.05 |
| TBT | ≤ 150ms |
| Lighthouse Performance | ≥ 95 (target 100) |
| Lighthouse A11y / Best Practices / SEO | 100 |
| Initial JS (gzip) | ≤ 180KB critical path |
| Total JS interactive | ≤ 350KB before playground |
| Texture memory per scene | ≤ 40MB unpacked |
| DPR | Cap 2 · adaptive downshift under 45 FPS |

### Frame budget (16.7ms @ 60fps)

| Work | Max |
|---|---|
| Lenis + scroll snapshot | 1.5ms |
| Scene timelines (DOM) | 2.5ms |
| R3F render + FX | 8.0ms |
| Misc / GC headroom | 4.7ms |

### Kill switches (automatic)

1. FPS < 45 for 2s → reduce DPR, disable post FX.
2. FPS < 30 for 2s → pause particles, simplify shaders.
3. `prefers-reduced-motion` → no Lenis smoothing, no WebGL, CSS static layouts.
4. Data-saver / low memory → defer playground & video.

---

## 7. Success Metrics

### Qualitative

- Visitor can retell the five-act story after one visit.
- Developer opens DevTools and finds clean architecture.
- Recruiter can find contact + proof in < 30s with keyboard only.

### Quantitative (post-launch)

| Metric | Target (30 days) |
|---|---|
| Avg session duration | ≥ 90s |
| Scroll depth ≥ 75% | ≥ 40% of sessions |
| Contact conversion | ≥ 3% of engaged sessions |
| Returning visitors | ≥ 15% |
| Mobile bounce vs desktop gap | < 10pp |
| JS error rate | < 0.5% sessions |

---

## 8. Milestone Checklist

Use this as the project Kanban spine.

- [ ] **M0** Research locked (moodboard, refs, copy outline, metrics)
- [x] **M1** Infrastructure complete + CI green *(Lighthouse baseline still open)*
- [ ] **M2** Global nav / loader / cursor / a11y chrome
- [x] **M3** Act I Hero cinematic shippable *(P0 vertical slice)*
- [x] **M4** Act II Craft visualizations shippable
- [x] **M5** Act III ≥ 3 project scenes shippable *(Orbit + Pulse + Lattice immersive)*
- [x] **M6** Act IV Proof metrics live *(Orbit evidence strip)*
- [x] **M7** Act V Contact ritual shippable
- [x] **M8** Playground (optional) behind route / gate
- [ ] **M9** Performance pass meets budgets *(guardian + code-split + approach prefetch; Lighthouse CI still open)*
- [x] **M10** Polish + easter eggs + launch *(shortcuts, thank-you burst, micro-hover; remaining eggs optional)*

---

## Phase 0 — Research

### Purpose

Lock creative and technical direction before more surface area.

### User experience

Invisible to users — prevents a forgettable or inconsistent product.

### Deliverables

| Item | Output |
|---|---|
| Reference reel | 12–20 sites (Apple product pages, Active Theory, Bruno Simon, Dogstudio, Locomotive, Nothing, Stripe, Linear, Awwwards SOTD) |
| Moodboard | Color, type, motion curves, stills (Figma / Notion) |
| Interaction inventory | Scroll patterns: scrub, pin, morph, parallax, velocity stretch |
| Copy outline | Five-act script (headlines + 1-sentence supports only) |
| Benchmark harness | FPS meter, Lighthouse CI baseline on empty scenes |
| Decision log | Animation = GSAP; remove Motion/Framer |

### Feature: Reference Study Matrix

- **Purpose:** Avoid accidental cloning; extract principles.
- **UX:** N/A (internal).
- **Technical:** Spreadsheet: site → pattern → transferable principle → banned mimic.
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** N/A.

### Feature: Moodboard & Motion Language

- **Purpose:** Shared visual grammar for all phases.
- **UX:** Consistent emotional tone.
- **Technical:** Tokens for ease names (`easeOutCubic`, expo), duration scales, accent usage rules.
- **Dependencies:** Phase 1 theme tokens.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** Prevents later rework that causes effect stacking.

### Feature: Success Metrics Definition

- **Purpose:** Know when “done” is actually done.
- **UX:** Better product focus.
- **Technical:** Document KPIs in this file (§7) + analytics events map.
- **Dependencies:** Analytics choice.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** Prefer privacy-light analytics.

### Feature: Competitive Differentiation Brief

- **Purpose:** Explicitly choose narrative scroll over “parallax portfolio.”
- **UX:** Memorable arc.
- **Technical:** Five-act mapping locked; playground demoted to side quest.
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** Narrative focus reduces feature bloat.

**Phase 0 exit criteria:** Moodboard approved · GSAP-only decision recorded · Five-act script drafted · Performance budgets accepted.

---

## Phase 1 — Infrastructure

### Purpose

Production-ready substrate. Everything else plugs in.

### User experience

Fast first paint, stable scroll, no jank foundations, accessible shell.

### Status

**Mostly complete** in current repo. Remaining items listed as features below.

### Feature: Project Setup Hardening

- **Purpose:** Reproducible builds and DX.
- **UX:** Instant local `pnpm dev`.
- **Technical:** Scripts (`dev`, `build`, `lint`, `typecheck`, `test`, `format`), Engines field, CI (lint + typecheck + test + build).
- **Dependencies:** pnpm, Node 22+.
- **Priority:** P0.
- **Complexity:** S *(done)*.
- **Performance:** Turbopack for dev; production build gates regressions.

### Feature: Folder Architecture Freeze

- **Purpose:** Prevent logic leaking into pages.
- **UX:** Maintainable experience over time.
- **Technical:** Enforce `engine/` / `scenes/` / `canvas/` / `providers/` boundaries via docs + lint import rules if needed.
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** Enables code-splitting by scene.

### Feature: RAF Scheduler

- **Purpose:** Single frame clock.
- **UX:** Consistent motion timing.
- **Technical:** `getRafScheduler()` — register/unregister/pause/resume/priority/delta/FPS.
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** Critical path; no nested RAFs.

### Feature: Scroll Engine

- **Purpose:** Single source of truth for scroll state.
- **UX:** Buttery scroll; predictable progress.
- **Technical:** Lenis + `ScrollManager` snapshot: y, velocity, direction, progress, sections, breakpoints, reduced-motion.
- **Dependencies:** RAF scheduler.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** Subscribe via callbacks/refs only.

### Feature: Timeline System

- **Purpose:** Declarative progress → values without switch statements.
- **UX:** Smooth scene choreography.
- **Technical:** Tracks + keyframes + shared easings.
- **Dependencies:** Math utils.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** O(tracks) per active scene only.

### Feature: Scene Manager

- **Purpose:** Lifecycle for each section-world.
- **UX:** Enter/leave feel intentional; assets load just-in-time.
- **Technical:** `onEnter` / `onLeave` / `onProgress` / `onUpdate` / prefetch / unload.
- **Dependencies:** Scroll + RAF.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** Unload heavy scenes aggressively.

### Feature: Canvas Layer

- **Purpose:** Shared WebGL world behind DOM.
- **UX:** Depth without fighting text.
- **Technical:** Dynamic R3F canvas, camera rig, lazy post FX, reduced-motion kill switch.
- **Dependencies:** Scroll snapshot, RAF.
- **Priority:** P0.
- **Complexity:** M *(boilerplate done)*.
- **Performance:** `pointer-events: none`; adaptive DPR.

### Feature: Accessibility Baseline

- **Purpose:** Usable by everyone.
- **UX:** Skip link, focus rings, semantics, reduced motion.
- **Technical:** Landmark HTML, `data-motion`, keyboard anchors.
- **Dependencies:** Theme/layout.
- **Priority:** P0.
- **Complexity:** S *(partial)*.
- **Performance:** Reduced motion = fewer GPU jobs.

### Feature: SEO Foundation

- **Purpose:** Discoverability and share previews.
- **UX:** Rich link cards.
- **Technical:** Metadata, OG, Twitter image, robots, sitemap, JSON-LD.
- **Dependencies:** Constants `SITE`.
- **Priority:** P0.
- **Complexity:** S *(done stubs)*.
- **Performance:** Static generation preferred.

### Feature: Theme System

- **Purpose:** Dark-first brand with dynamic accent.
- **UX:** Cohesive world; future theme switch.
- **Technical:** CSS variables + `ThemeProvider` + localStorage.
- **Dependencies:** None.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** No runtime CSS-in-JS.

### Feature: Performance Monitoring

- **Purpose:** See FPS / long tasks in dev and optional prod overlay.
- **UX:** Invisible by default; `?debug=perf` dashboard.
- **Technical:** Hook into RAF FPS; PerformanceObserver for long tasks; overlay component.
- **Dependencies:** RAF scheduler.
- **Priority:** P1.
- **Complexity:** M *(done)*.
- **Performance:** Debug overlay must not tank FPS (sample, don’t spam DOM).

### Feature: Analytics

- **Purpose:** Measure scroll depth and contact conversion.
- **UX:** Privacy-respecting.
- **Technical:** Event map: `act_enter`, `project_view`, `contact_submit`, `playground_open`.
- **Dependencies:** Provider choice.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Async, deferred until idle.

### Feature: Error Boundaries

- **Purpose:** Canvas/scene failures don’t white-screen the story.
- **UX:** Graceful DOM fallback.
- **Technical:** Route + canvas boundaries; log to console/Sentry.
- **Dependencies:** Optional Sentry.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** Fail closed on WebGL → DOM-only mode.

### Feature: Testing Setup

- **Purpose:** Protect engines from regressions.
- **UX:** Reliability.
- **Technical:** Vitest for timeline/math/scroll pure logic; Playwright smoke; axe checks.
- **Dependencies:** CI.
- **Priority:** P1.
- **Complexity:** M *(Vitest + CI done; Playwright/axe deferred)*.
- **Performance:** Tests assert no layout thrash patterns where possible.

**Phase 1 exit criteria:** CI green · Lighthouse baseline captured · engines documented · GSAP-only deps · debug perf flag works.

> Status: CI (lint/typecheck/test/build) + Vitest engines + `?debug=perf` + error boundaries + `engines.node>=22` are in place. Remaining Phase 1 gap: Lighthouse baseline capture.

---

## Phase 2 — Navigation & Global Systems

### Purpose

Make the world feel inhabited before individual acts shine.

### User experience

Orientation, control, continuity, and personality in the chrome of the experience.

### Feature: Animated Loading Experience

- **Purpose:** Brand first paint; hide asset hydration.
- **UX:** Short cinematic boot (logo mark + progress), then seamless handoff to Hero.
- **Technical:** Preloader scene; progress from asset loader; GSAP outro; remove from DOM after complete.
- **Dependencies:** Asset loader, GSAP, reduced-motion alternate (simple fade).
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Cap loader assets ≤ 1 texture + logo SVG; never block LCP text alternative.

### Feature: Global Transitions

- **Purpose:** Continuity between deep links / playground route returns.
- **UX:** Soft veil + camera settle; no hard cuts.
- **Technical:** Shared transition controller subscribed to route + scene changes; GSAP timeline.
- **Dependencies:** Scene manager, GSAP.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Prefer opacity/transform overlays; no layout animation.

### Feature: Custom Cursor

- **Purpose:** Signal interactivity and craft.
- **UX:** Desktop: cursor morphs near magnetic targets / projects; hidden on touch.
- **Technical:** RAF-driven `translate3d` follower; state machine (`default`, `hover`, `drag`, `text`).
- **Dependencies:** RAF, reduced-motion (system cursor only).
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** One element; no React state per move.

### Feature: Smooth Scrolling

- **Purpose:** Cinematic pacing.
- **UX:** Inertia without loss of control; disabled when reduced-motion.
- **Technical:** Lenis via ScrollManager (exists); tune lerp per breakpoint.
- **Dependencies:** Phase 1 scroll.
- **Priority:** P0.
- **Complexity:** S *(tune)*.
- **Performance:** Mobile: lower lerp or native if jank detected.

### Feature: Progress Indicator

- **Purpose:** Show journey position.
- **UX:** Thin top bar maps to total progress; optional act ticks.
- **Technical:** Existing `ScrollProgress`; enhance with act markers.
- **Dependencies:** Scroll snapshot.
- **Priority:** P0.
- **Complexity:** S.
- **Performance:** Transform scaleX only.

### Feature: Section / Act Indicators

- **Purpose:** Wayfinding for long narrative.
- **UX:** Side dots or act labels; current act highlighted; click to scrollTo.
- **Technical:** Subscribe to section progress; `scrollTo` via ScrollManager; ARIA current.
- **Dependencies:** Sections registered.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Update via classList/transforms, not re-renders every frame.

### Feature: Magnetic Buttons

- **Purpose:** Tactile delight on CTAs.
- **UX:** Button gently follows pointer within radius; snaps back.
- **Technical:** Pointer move → damp toward cursor offset; GSAP or damp util on transform.
- **Dependencies:** RAF/damp; disabled touch / reduced-motion.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Only while hovered.

### Feature: Keyboard Navigation

- **Purpose:** Full journey without pointer.
- **UX:** `↑/↓` or `j/k` between acts; `1–5` jump acts; focus trap rules in dialogs.
- **Technical:** Keymap module; `scrollTo` section ids; visible focus.
- **Dependencies:** ScrollManager, a11y.
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Ignore key repeat storms (throttle).

### Feature: Context Menu (Branded)

- **Purpose:** Personality + shortcuts.
- **UX:** Custom right-click: Copy email, Toggle sound, Open proof, Developer mode.
- **Technical:** Radix context menu; preventDefault carefully; keep browser menu on inputs.
- **Dependencies:** Radix.
- **Priority:** P3.
- **Complexity:** S.
- **Performance:** Lazy mount.

### Feature: Sound System

- **Purpose:** Optional auditory layer for immersion.
- **UX:** Muted by default; explicit toggle; UI ticks + whooshes on act changes; respect autoplay policies.
- **Technical:** Web Audio graph; sprite sheet; volume persist; pause when hidden.
- **Dependencies:** User gesture gate.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Decode on idle; tiny sprites; never block main thread long.

**Phase 2 exit criteria:** Loader → Hero handoff · keyboard act travel · progress + section nav · cursor desktop-only · sound off by default.

---

## Phase 3 — Hero (Act I)

### Purpose

Establish identity as the hero-level brand signal. Make the first viewport unforgettable.

### User experience

Enter a world. Name dominates. One line of promise. Scroll begins the story. No clutter.

### Feature: Massive Typography

- **Purpose:** Brand-first composition.
- **UX:** “Showcase” / personal name at clamp scale; secondary line only.
- **Technical:** Display font; timeline y/opacity on scroll; split-text optional via GSAP.
- **Dependencies:** Timeline, fonts.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** Avoid per-glyph DOM if mobile; use word splits max.

### Feature: 3D Background

- **Purpose:** Spatial depth behind type.
- **UX:** Subtle sculpture/field that reacts to scroll progress and pointer.
- **Technical:** R3F scene object; scroll → camera/uniform; pointer parallax dampened.
- **Dependencies:** Canvas, scroll.
- **Priority:** P0.
- **Complexity:** L *(done — HeroField vertical slice)*.
- **Performance:** Low poly; bake where possible; pause when hero not near.

### Feature: Shader Distortion

- **Purpose:** Living material quality.
- **UX:** Soft refraction/noise on backdrop as scroll velocity rises.
- **Technical:** Custom GLSL; uniforms `uProgress`, `uVelocity`, `uTime`; lazy compile.
- **Dependencies:** Shader assets, canvas.
- **Priority:** P1.
- **Complexity:** L.
- **Performance:** Mobile: cheaper shader variant timeline.

### Feature: Dynamic Lighting

- **Purpose:** Cinematic mood shifts across Act I → II.
- **UX:** Light direction/color eases with progress.
- **Technical:** Light props updated in RAF from timeline values (not React).
- **Dependencies:** R3F lights, timeline.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Few lights; no shadows on mobile.

### Feature: Animated Grid

- **Purpose:** Suggest systems/engineering without UI chrome.
- **UX:** Perspective grid breathes under typography.
- **Technical:** Shader or line segments; opacity tied to intro progress.
- **Dependencies:** Canvas or DOM SVG.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Prefer single draw call shader plane.

### Feature: Floating Particles

- **Purpose:** Atmosphere.
- **UX:** Sparse particles; denser only on desktop high FPS.
- **Technical:** Points material / instanced mesh; velocity influence light.
- **Dependencies:** Canvas, perf monitor kill switch.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Cap counts by breakpoint (desktop 400 / tablet 150 / mobile 0–80).

### Feature: Interactive Cursor (Hero-local)

- **Purpose:** Hint the world is reactive.
- **UX:** Distortion follows cursor in hero bounds.
- **Technical:** Pointer → uniform; falloff radius.
- **Dependencies:** Custom cursor optional.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Update uniforms only; no raycast spam.

### Feature: Mouse Parallax

- **Purpose:** Depth cue.
- **UX:** Type and 3D layers shift subtly opposite to pointer.
- **Technical:** Damp parallax offsets in RAF.
- **Dependencies:** RAF.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** Disable on touch.

### Feature: Intro Reveal

- **Purpose:** Arrival moment after loader.
- **UX:** Mask/reveal of name + world lights up.
- **Technical:** GSAP timeline once; then scroll timelines take over.
- **Dependencies:** Loader completion event.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** One-shot; kill timeline after.

### Feature: Signature Animation

- **Purpose:** Personal mark / monogram as motif.
- **UX:** Brief signature stroke or monogram lockup.
- **Technical:** SVG path draw via GSAP; reuse later as favicon motif.
- **Dependencies:** GSAP.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** SVG not canvas unless needed.

**Phase 3 exit criteria:** First viewport brand test passes (remove nav → still recognizable) · 60fps desktop · reduced-motion static hero still strong.

> Status: P0 vertical slice shipped — massive brand type, clip-path intro reveal, DOM pointer parallax, scroll timeline exit, HeroField lighting/velocity/pointer distortion with mobile particle off + soft unload past Act I. Remaining: signature motif (P2), deeper mobile shader variant.

---

## Phase 4 — Projects (Act III)

### Purpose

Each project is an immersive scene, not a card in a grid.

### User experience

Scroll enters a project world → story → tech → proof snippets → exit to next. Depth over quantity (3–5 max featured).

### Feature: Project Scene Contract

- **Purpose:** Shared structure for every project.
- **UX:** Predictable storytelling rhythm, unique visuals.
- **Technical:** `ProjectSceneDefinition`: id, range, assets, timelines (desktop/mobile), chapters (`hook`, `problem`, `approach`, `impact`).
- **Dependencies:** Scene manager, asset loader.
- **Priority:** P0.
- **Complexity:** M *(done — `ProjectCaseStudy` + Orbit)*.
- **Performance:** Prefetch next project only.

### Feature: Card → Fullscreen Morph

- **Purpose:** Transition from index peek to immersion.
- **UX:** Project preview expands into fullscreen stage via scroll scrub (not click-only).
- **Technical:** Shared element via transforms (scale/position), FLIP with GSAP or manual rect interpolation — **no layout props**.
- **Dependencies:** GSAP, scroll progress.
- **Priority:** P0.
- **Complexity:** L *(done — transform morph on Orbit stage)*.
- **Performance:** Promote layers; avoid dual image decode.

### Feature: 3D Previews

- **Purpose:** Show product spatiality / UI planes in 3D.
- **UX:** Device frames or abstract architecture rotate with progress.
- **Technical:** GLTF or textured planes; compress Draco/meshopt.
- **Dependencies:** Model loader, canvas.
- **Priority:** P1.
- **Complexity:** L.
- **Performance:** One heavy model at a time; unload on leave.

### Feature: Video Backgrounds

- **Purpose:** Real product motion.
- **UX:** Muted looping plates scrub or play when in view.
- **Technical:** Video loader; IntersectionObserver play/pause; poster first.
- **Dependencies:** Asset loader.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** 720p max; `preload=none` until near; mobile poster-only option.

### Feature: Case Study Storytelling

- **Purpose:** Communicate product thinking.
- **UX:** Pin chapters with scrubbed typography; short lines only.
- **Technical:** ScrollTrigger pin **or** sticky sections + timeline progress.
- **Dependencies:** GSAP ScrollTrigger optional.
- **Priority:** P0.
- **Complexity:** L *(done — progress-mapped chapters)*.
- **Performance:** Pin sparingly (expensive); prefer progress mapping.

### Feature: Interactive Metrics

- **Purpose:** Make impact tangible inside the project scene.
- **UX:** Numbers count/scrub as user scrolls through impact chapter.
- **Technical:** Timeline → textContent updates throttled (every 2–3 frames).
- **Dependencies:** Timeline.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** Don’t React-render counters.

### Feature: Technology Visualization

- **Purpose:** Show stack choices as systems.
- **UX:** Nodes light up in build order.
- **Technical:** SVG/Canvas graph; progress reveals edges.
- **Dependencies:** Scene progress.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** SVG fine for < 30 nodes.

### Feature: GitHub Statistics

- **Purpose:** Credibility.
- **UX:** Live-ish contribution signal and repo highlights.
- **Technical:** Build-time fetch → static JSON; fallback cache; no runtime token in client.
- **Dependencies:** GitHub API at build; Act IV overlap.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Static data eliminates client API jank.

### Feature: Architecture Diagrams

- **Purpose:** Show engineering quality.
- **UX:** Diagram draws on scroll; hover for labels (desktop).
- **Technical:** Animated SVG paths; reduced-motion = final state.
- **Dependencies:** GSAP drawSVG-like manual stroke offsets.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Prefer SVG over WebGL diagrams.

### Feature: Performance Graphs

- **Purpose:** Proof of discipline.
- **UX:** Before/after Lighthouse or FPS charts animate in.
- **Technical:** Canvas/SVG chart; data from static JSON.
- **Dependencies:** Proof data model.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Precompute paths.

**Phase 4 exit criteria:** ≥ 3 immersive projects · morph works keyboard-accessible · assets unload · mobile alternate timelines.

> Status: **3 immersive projects** shipped (Orbit, Pulse, Lattice) via shared `ImmersiveProject` + `createProjectsScene` multi-panel driver. Peek→immersion morph, chapter runway, architecture SVG draw, stack reveal, scrubbed metrics. Remaining polish: deepen morph FLIP, 3D/video previews, asset unload hooks.

---

## Phase 5 — Skills (Act II / Craft)

### Purpose

Show how you think — interactive systems > skill tag clouds.

### User experience

Explore a knowledge ecosystem; understand depth and relationships.

### Feature: Animated Knowledge Graph

- **Purpose:** Skills as a connected system.
- **UX:** Graph focuses clusters (Frontend, Systems, Design, AI) as scroll progresses.
- **Technical:** Force layout precomputed or light simulation paused when offscreen; canvas/WebGL.
- **Dependencies:** RAF, scene.
- **Priority:** P0.
- **Complexity:** L *(done — prebaked SVG)*.
- **Performance:** Prebake positions for mobile; simulate only desktop if needed.

### Feature: Interactive Tech Ecosystem

- **Purpose:** Allow directed exploration.
- **UX:** Click/focus node → detail panel with “how I use it.”
- **Technical:** Selection state in React OK (discrete); motion via GSAP.
- **Dependencies:** A11y focus management.
- **Priority:** P1.
- **Complexity:** M *(done — focus/click detail panel)*.
- **Performance:** Panel mount lazy.

### Feature: 3D Network

- **Purpose:** Premium craft moment.
- **UX:** Optional depth layer behind graph.
- **Technical:** Instanced nodes; edge segments; scroll rotates camera.
- **Dependencies:** Canvas.
- **Priority:** P2.
- **Complexity:** L.
- **Performance:** Feature-flag; skip on mobile.

### Feature: Experience Timeline

- **Purpose:** Career progression without a boring list.
- **UX:** Horizontal/vertical scrub timeline with role milestones.
- **Technical:** Section progress → x translate track.
- **Dependencies:** Timeline engine.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Images lazy; virtualize if many.

### Feature: Growth Animation

- **Purpose:** Visualize learning velocity.
- **UX:** Area/line grows with scroll.
- **Technical:** SVG path length scrub.
- **Dependencies:** GSAP/timeline.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Single path.

### Feature: Tech Stack Visualization

- **Purpose:** Clear stack narrative for recruiters.
- **UX:** Layered stack (edge → app → data → infra) assembles.
- **Technical:** DOM layers with transform staging.
- **Dependencies:** Scene progress.
- **Priority:** P1.
- **Complexity:** M *(done — TECH_STACK_LAYERS)*.
- **Performance:** No blur animations on mobile.

**Phase 5 exit criteria:** Graph readable keyboard-only · recruiter can list top 5 skills in 20s · mobile non-WebGL fallback.

> Status: Shipped — prebaked SVG knowledge graph, focusable nodes + detail panel, stack layers assemble on scroll, cluster focus by progress. No WebGL required.

---

## Phase 6 — About (Act II / Story)

### Purpose

Human signal — trust, taste, trajectory.

### User experience

A short personal film via scroll: origin → principles → workflow → now.

### Feature: Storytelling Timeline

- **Purpose:** Career as narrative.
- **UX:** Chapters with year markers; photos/objects parallax lightly.
- **Technical:** Pinned or progress-mapped chapters.
- **Dependencies:** Scroll, assets.
- **Priority:** P0.
- **Complexity:** M *(done — principle chapters)*.
- **Performance:** Limit image weights; AVIF/WebP.

### Feature: Career Journey

- **Purpose:** Roles/impact condensed.
- **UX:** Each stop: role, one achievement, one lesson.
- **Technical:** Data-driven content module.
- **Dependencies:** Content MD/JSON.
- **Priority:** P0.
- **Complexity:** S *(done — CAREER_JOURNEY rail)*.
- **Performance:** Static content.

### Feature: Interactive Map

- **Purpose:** Geographic/personal context (optional).
- **UX:** Minimal map; cities lived/worked light up.
- **Technical:** SVG map; avoid heavy map SDKs.
- **Dependencies:** None.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** SVG only.

### Feature: Fun Facts

- **Purpose:** Memorability.
- **UX:** Rapid fact flips tied to scroll or hover.
- **Technical:** Small DOM rotator; GSAP.
- **Dependencies:** None.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Trivial.

### Feature: Daily Workflow

- **Purpose:** Show process maturity.
- **UX:** Day timeline: research → build → review → ship.
- **Technical:** Animated step rail.
- **Dependencies:** Timeline.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** CSS/GSAP transforms.

### Feature: Favorite Tools

- **Purpose:** Taste signal.
- **UX:** Tool shelf with short “why.”
- **Technical:** Grid with magnetic hover desktop.
- **Dependencies:** Magnetic optional.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** SVG icons sprites.

### Feature: Office Setup

- **Purpose:** Personal brand texture.
- **UX:** Hotspot image of desk/setup.
- **Technical:** Image + absolute hotspots (transform); modal details.
- **Dependencies:** Image loader.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** Single optimized image.

**Phase 6 exit criteria:** About readable without motion · tone matches Act I brand · no resume PDF dump as the only path (PDF optional download).

> Status: Shipped — principle chapters + career journey scrub rail (achievement + lesson per stop). Map/fun facts deferred.

---

## Phase 7 — Creative Playground

### Purpose

Side quest proving curiosity and depth — for developers who inspect.

### User experience

Separate route `/playground` or end-of-scroll gate. Lab feeling. Experiments listed with FPS cost badges.

### Feature: Physics Experiments

- **Purpose:** Playful systems thinking.
- **UX:** Throw / collide objects; reset.
- **Technical:** Rapier or cannon-es; isolate world; pause when unmounted.
- **Dependencies:** Dynamic import.
- **Priority:** P2.
- **Complexity:** L.
- **Performance:** Never on main scroll path.

### Feature: Shader Playground

- **Purpose:** Show GLSL craft.
- **UX:** Parameter knobs; preset switches.
- **Technical:** R3F material swap; URL state for shares.
- **Dependencies:** Canvas route.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** One shader at a time.

### Feature: Canvas / WebGL Demos

- **Purpose:** Breadth of creative coding.
- **UX:** Gallery of demos with thumbnails.
- **Technical:** Per-demo dynamic import; unload on leave.
- **Dependencies:** Asset loader.
- **Priority:** P2.
- **Complexity:** L.
- **Performance:** Strict isolation.

### Feature: Generative Art

- **Purpose:** Unique outputs per session.
- **UX:** Seed control; export PNG.
- **Technical:** Canvas2D/WebGL; seeded PRNG.
- **Dependencies:** None.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** OffscreenCanvas when available.

### Feature: Mini Games

- **Purpose:** Delight + shareability.
- **UX:** 30–60s game; high score localStorage.
- **Technical:** Own RAF registration with high priority while active; pause site scroll or lock.
- **Dependencies:** RAF.
- **Priority:** P3.
- **Complexity:** L.
- **Performance:** Stop main scene updates while playing.

### Feature: AI Experiments

- **Purpose:** Modern stack signal.
- **UX:** Small demos (e.g., client embeddings viz, prompt→shape) with clear limits.
- **Technical:** Prefer on-device or static; if API, rate-limit + privacy note.
- **Dependencies:** Optional API routes.
- **Priority:** P3.
- **Complexity:** L.
- **Performance:** Never block portfolio core.

### Feature: Code Visualizer

- **Purpose:** Meta — show code as motion.
- **UX:** AST/token stream animation of a selected snippet.
- **Technical:** Preparsed tokens; GSAP stagger.
- **Dependencies:** GSAP.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** Cap token count.

### Feature: Algorithm Visualizations

- **Purpose:** CS fundamentals as craft.
- **UX:** Step sort/pathfinding with scrub.
- **Technical:** Pure TS + canvas; scroll or slider driven.
- **Dependencies:** None.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** O(n) draw budgets.

**Phase 7 exit criteria:** Playground is code-split · linked from nav · does not affect Lighthouse on `/`.

> Status: Shipped `/playground` — Wave Field + Sort Scrub, per-experiment `next/dynamic`, FPS cost badges, linked from header/footer. Isolated from `/` scroll experience.

---

## Phase 8 — Contact (Act V)

### Purpose

Journey completion — reaching out feels like finishing the story.

### User experience

Calm, confident close. Clear availability. Form that feels crafted. Thank-you is a beat, not a dead end.

### Feature: Animated Form

- **Purpose:** Contact without breaking the world.
- **UX:** Fields reveal; focus expands gently; magnetic submit.
- **Technical:** Controlled React form OK; motion GSAP; Radix labels.
- **Dependencies:** GSAP, a11y.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** No per-keystroke animation.

### Feature: Live Validation

- **Purpose:** Reduce friction.
- **UX:** Inline errors after blur; success states clear.
- **Technical:** Zod schema; accessible error text.
- **Dependencies:** Zod.
- **Priority:** P0.
- **Complexity:** S *(done)*.
- **Performance:** Tiny.

### Feature: Interactive Send Animation

- **Purpose:** Emotional payoff.
- **UX:** Submit → paper plane / signal pulse → world acknowledges.
- **Technical:** GSAP timeline; disable double-submit.
- **Dependencies:** GSAP.
- **Priority:** P1.
- **Complexity:** M *(done — submit pulse + thank-you)*.
- **Performance:** One-shot GPU transforms.

### Feature: Social Links

- **Purpose:** Alternate contact paths.
- **UX:** Icons with labels; magnetic.
- **Technical:** Semantic list; `rel` attributes.
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** S *(done)*.
- **Performance:** Inline SVG.

### Feature: Availability Status

- **Purpose:** Set expectations.
- **UX:** “Available for select projects” pill with live-ish status.
- **Technical:** Constant or CMS flag; color token.
- **Dependencies:** Theme.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** None.

### Feature: Calendar Integration

- **Purpose:** Convert serious leads.
- **UX:** “Book a call” → Cal.com / Calendly embed or deep link.
- **Technical:** Prefer deep link first; embed lazy on click.
- **Dependencies:** External service.
- **Priority:** P2.
- **Complexity:** S *(done — deep link)*.
- **Performance:** No eager embed.

### Feature: Email Animation

- **Purpose:** Make email memorable.
- **UX:** Address assembles / decrypts on hover; click copies.
- **Technical:** GSAP + clipboard API; aria-live confirmation.
- **Dependencies:** GSAP.
- **Priority:** P2.
- **Complexity:** S *(done)*.
- **Performance:** Trivial.

### Feature: Thank-You Experience

- **Purpose:** Close the narrative loop.
- **UX:** Short message + optional easter prompt (“press G for playground”).
- **Technical:** State swap; confetti optional (Phase 10).
- **Dependencies:** Form success.
- **Priority:** P1.
- **Complexity:** S *(done)*.
- **Performance:** Lightweight DOM.

**Phase 8 exit criteria:** Form works without JS polish path · keyboard complete · spam protection (honeypot + server action).

> Status: Shipped — Zod schema, `submitContact` server action (honeypot + rate limit), blur validation, GSAP reveal/send/thank-you, socials, availability badge, email scramble+copy, calendar deep link.

---

## Phase 9 — Performance Hardening

### Purpose

Meet budgets under real devices. Spectacle survives only if FPS survives.

### User experience

Feels effortless. No hitch when entering projects. Mobile remains alive.

### Feature: Lazy Loading & Code Splitting

- **Purpose:** Keep `/` light.
- **UX:** Instant first act.
- **Technical:** `next/dynamic` for canvas FX, playground, heavy project modules.
- **Dependencies:** Route structure.
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Critical.

### Feature: Asset Streaming

- **Purpose:** Just-in-time bytes.
- **UX:** No long stalls mid-scroll.
- **Technical:** Prefetch when section progress > -0.15; unload on leave.
- **Dependencies:** Asset loader, scene manager.
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Critical.

### Feature: Texture Compression

- **Purpose:** VRAM + download wins.
- **UX:** Same visuals, less jank.
- **Technical:** KTX2/Basis where supported; WebP/AVIF fallbacks.
- **Dependencies:** Pipeline in `/public`.
- **Priority:** P1.
- **Complexity:** L.
- **Performance:** High impact on GPU.

### Feature: Bundle Optimization

- **Purpose:** JS weight discipline.
- **UX:** Faster TTI.
- **Technical:** Analyze with `@next/bundle-analyzer`; tree-shake three imports; GSAP plugins on demand.
- **Dependencies:** Build tooling.
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Critical.

### Feature: Shader Optimization

- **Purpose:** Stable GPU time.
- **UX:** Consistent lighting.
- **Technical:** Precision hints; avoid dependent texture reads; mobile variants.
- **Dependencies:** Shader set.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** High.

### Feature: Memory Management & Object Pooling

- **Purpose:** Long-session stability.
- **UX:** No tab death after playground.
- **Technical:** Dispose geometries/materials; pool particles; detach listeners.
- **Dependencies:** Scene unload hooks.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Critical for WebGL.

### Feature: Frame Budget Guardian

- **Purpose:** Auto quality scaling.
- **UX:** Subtle quality drop > visible stutter.
- **Technical:** FPS from RAF → quality tiers (High/Med/Low).
- **Dependencies:** Perf monitor.
- **Priority:** P0.
- **Complexity:** M.
- **Performance:** Meta-feature.

### Feature: GPU Profiling Pass

- **Purpose:** Find real bottlenecks.
- **UX:** Smoother final.
- **Technical:** Spector.js / Safari GPU / Chrome perf; document findings.
- **Dependencies:** None.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Process.

**Phase 9 exit criteria:** Budgets in §6 met on reference devices · kill switches verified · Lighthouse CI ≥ targets on `/`.

> Status: P0 hardening in — `QualityGuardian` (FPS → high/med/low: DPR, post-FX, particles), `SceneHost`/`HeroField` code-split, SceneManager approach prefetch at −0.15 + unload on leave, `@next/bundle-analyzer` via `pnpm analyze`, `?debug=perf` shows quality tier. Remaining: Lighthouse CI ≥ targets, texture compression, GPU profiling pass.

---

## Phase 10 — Polish & Delight

### Purpose

Memorability layer after substance ships.

### User experience

Micro-joy, discovery, shareable moments — without harming clarity.

### Feature: Micro Interactions

- **Purpose:** UI feels alive.
- **UX:** Buttons, links, form focuses.
- **Technical:** GSAP / CSS only; shared presets.
- **Dependencies:** GSAP.
- **Priority:** P1.
- **Complexity:** S.
- **Performance:** Short tweens.

### Feature: Hover Animations

- **Purpose:** Affordance.
- **UX:** Desktop hover states consistent with motion language.
- **Technical:** Central hover controller.
- **Dependencies:** Cursor system.
- **Priority:** P1.
- **Complexity:** S.
- **Performance:** `@media (hover:hover)`.

### Feature: Sound Effects

- **Purpose:** Optional sensory polish.
- **UX:** Soft UI sounds when enabled.
- **Technical:** Sound system from Phase 2.
- **Dependencies:** Sound system.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Sprites.

### Feature: Page / Act Transitions

- **Purpose:** Glue.
- **UX:** Act boundaries feel directed.
- **Technical:** Crossfade lighting + typography handoffs.
- **Dependencies:** Scene manager.
- **Priority:** P1.
- **Complexity:** M.
- **Performance:** Pre-planned timelines.

### Feature: Confetti / Burst (Rare)

- **Purpose:** Contact thank-you flourish.
- **UX:** Once; tasteful; reduced-motion off.
- **Technical:** Canvas particles pooled.
- **Dependencies:** Perf tier High only.
- **Priority:** P3.
- **Complexity:** S.
- **Performance:** Hard cap 150 particles / 1.5s.

### Feature: Achievement System

- **Purpose:** Reward exploration.
- **UX:** Quiet toasts for easter eggs / full scroll / playground clear.
- **Technical:** localStorage badges; non-blocking UI.
- **Dependencies:** Analytics optional.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** Negligible.

### Feature: Keyboard Shortcuts Overlay

- **Purpose:** Power-user DX.
- **UX:** `?` opens shortcut cheatsheet.
- **Technical:** Dialog; focus trap.
- **Dependencies:** Radix dialog.
- **Priority:** P2.
- **Complexity:** S.
- **Performance:** Lazy.

### Feature: Hidden Easter Eggs

- **Purpose:** Shareability.
- **UX:** Konami, logo clicks, terminal mode.
- **Technical:** Feature flags; do not block main thread.
- **Dependencies:** None.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** Idle registration.

### Feature: Developer Mode

- **Purpose:** Show engineering quality meta.
- **UX:** `~` toggles: scene bounds, FPS, scroll progress, act names.
- **Technical:** Overlay using existing debug hooks.
- **Dependencies:** Perf monitor.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Overlay updates at 5–10 Hz max.

### Feature: Performance Dashboard

- **Purpose:** Transparency brand.
- **UX:** Public `/lab/perf` or overlay panel with budgets vs live.
- **Technical:** Read RAF FPS + navigation timing.
- **Dependencies:** Phase 9.
- **Priority:** P3.
- **Complexity:** M.
- **Performance:** Sampling.

### Feature: Analytics Dashboard (Internal)

- **Purpose:** Iterate post-launch.
- **UX:** Owner-only.
- **Technical:** Plausible/Vercel charts; not built into site chrome.
- **Dependencies:** Analytics.
- **Priority:** P3.
- **Complexity:** S.
- **Performance:** N/A.

**Phase 10 exit criteria:** Delight pass reviewed against “motion has purpose” · easter eggs documented · launch checklist green.

> Status: Shipped — `?` shortcuts overlay, `~` toggles perf debug, button micro-hover, contact thank-you burst (High quality / reduced-motion off). Remaining optional: sound, achievements, Konami.

---

## Act IV — Proof (Cross-Cutting)

Act IV is not only a phase — it is a **content + interaction system** woven into Projects and a dedicated Proof strip.

### Feature: Proof Strip Scene

- **Purpose:** Aggregate measurable impact.
- **UX:** After projects, a focused gallery of metrics, diagrams, testimonials.
- **Technical:** New scene id `proof` between projects and contact; update `SCENE_ORDER`.
- **Dependencies:** Data model.
- **Priority:** P0.
- **Complexity:** M *(done)*.
- **Performance:** Mostly DOM/SVG.

### Feature: Before / After Metrics

- **Purpose:** Concrete outcomes.
- **UX:** Slider or scrub compares states (perf, UX, revenue proxy).
- **Technical:** Static images + transform wipe.
- **Dependencies:** Assets.
- **Priority:** P1.
- **Complexity:** M *(done — scroll-scrubbed wipe panels for Orbit)*.
- **Performance:** Two images max per case.

### Feature: Case Study Data Model

- **Purpose:** Single content schema for Acts III–IV.
- **UX:** Consistency.
- **Technical:** Typed JSON/MDX: problem, approach, stack, metrics[], links[].
- **Dependencies:** None.
- **Priority:** P0.
- **Complexity:** S *(done — `ProjectCaseStudy` + `ProofStripContent`)*.
- **Performance:** Build-time.

### Feature: Live-ish GitHub Activity

- **Purpose:** Ongoing craft signal.
- **UX:** Contribution graph stylized to brand.
- **Technical:** Build-time ingestion; weekly regenerate via CI.
- **Dependencies:** GitHub API.
- **Priority:** P2.
- **Complexity:** M.
- **Performance:** Static.

---

## 21. Bonus Features (100+)

Categorized extras. Prioritize only after P0–P1 core. Each is a seed — promote into a phase when it serves the narrative.

### Motion (1–8)

1. Velocity-based motion blur (shader) on extreme flings  
2. Scroll “anticipation” squash on section boundaries  
3. Shared easing token playground in devtools  
4. Direction-aware enter/leave (forward vs back scroll)  
5. Idle ambient motion when user stops mid-act  
6. Temporal remapping (ease scroll progress through emotional beats)  
7. Motion fingerprints unique per project palette  
8. One-frame “camera shutter” on achievement unlock  

### Scroll Interactions (9–16)

9. Horizontal chapter rails inside vertical story  
10. Scroll-jacked but cancelable tutorial for first visit only  
11. Dual-scrub: text vs visuals at different rates  
12. Elastic overscroll custom end-of-page world  
13. Progress-linked chapter subtitles (ARIA live polite)  
14. “Hold to inspect” pauses scrub animations  
15. Scroll-linked table of contents drawer  
16. Reverse-scroll secrets (content only when scrolling up)  

### Creative Storytelling (17–24)

17. Narrator mode: optional line-by-line story captions  
18. Branching “choose your path” project order  
19. Theme of the day (seeded accent)  
20. Season-aware atmosphere (subtle)  
21. Origin myth mini-comic via scroll panels  
22. Principle cards that assemble into a manifesto wall  
23. “Day in the life” 24h scrub  
24. Failure stories chapter (trust through honesty)  

### Typography (25–32)

25. Variable font weight scrubbed by scroll  
26. Kinetic marquee used once with purpose  
27. Optical alignment guides in developer mode  
28. Multilingual name lockup toggle  
29. ASCII/monospace “source” alternate typography mode  
30. Ligature moments on key words  
31. Type ramp visualizer for design system fans  
32. Print stylesheet that becomes a beautiful one-pager resume  

### Audio (33–40)

33. Adaptive ambient bed per act  
34. Spatial panning tied to cursor X  
35. Mute everywhere hotkey `M`  
36. UI foley pack (hover, click, send)  
37. Analyser-reactive subtle glow (if music on)  
38. Accessibility: visual beat meter when sound on  
39. Voice note greeting (optional, user-started)  
40. Silence-first onboarding for sound  

### Particles (41–46)

41. Act transition particle bridges  
42. Cursor spark trail (High tier only)  
43. Text dissolve to particles on leave (rare)  
44. Precipitation weather tied to accent color  
45. Particle constellations forming logos  
46. Colliding particles that settle into grid (craft metaphor)  

### Physics (47–52)

47. Desk objects with drag physics in About  
48. Soft-body logo  
49. Paper airplane contact send with ballistic arc  
50. Domino tech-stack knock-on  
51. Pendulum timing lesson  
52. Ragdoll “bug” you can throw into `/playground`  

### 3D (53–60)

53. Room-scale portfolio museum  
54. Exploded architecture view of a shipped app  
55. SDF branding mark  
56. Reflective floor hero (desktop only)  
57. Light baking pipeline docs as content  
58. Camera path editor exported to scenes  
59. Mesh transmission materials for product glass  
60. Portal stencil between projects  

### AI (61–66)

61. On-site Q&A over your MDX case studies (citations required)  
62. Resume tailor preview for pasted job description (client-side)  
63. Alt-text assistant for uploaded OG drafts (dev tool)  
64. Generative colorway suggestions under brand constraints  
65. Code-explain mode for playground snippets  
66. Recruiter “skills match” meter (transparent, non-creepy)  

### Accessibility (67–74)

67. Motion intensity slider (Off / Reduced / Full)  
68. High-contrast theme  
69. Dyslexia-friendly font toggle  
70. Focus mode: hide canvas  
71. Screen-reader journey script (hidden descriptive track)  
72. Caption tracks for video case studies  
73. Hit-area expansion without visual clutter  
74. “Pause all motion” floating control  

### Performance (75–82)

75. Quality preference persisted  
76. Network-aware asset profiles  
77. Predict user next section via velocity & prefetch  
78. Worker-based decode for images  
79. Partial texture residency streaming  
80. Cold-load skeleton that matches final layout (CLS)  
81. Public perf budget badge in footer  
82. Automated Lighthouse CI gate on PR  

### Developer Experience (83–88)

83. Scene scaffold CLI (`pnpm scene create`)  
84. MSW for contact form local  
85. Chromatic / visual regression on critical acts  
86. Storybook for UI primitives only (not scroll)  
87. Typed content schemas with zod  
88. Import boundary lint (ban `app` → engine internals misuse)  

### SEO (89–93)

89. MDX blog/lab notes for long-tail  
90. Project-specific OG images  
91. `sameAs` schema for socials  
92. FAQ schema for services  
93. hreflang if bilingual  

### Recruiter Experience (94–100)

94. `/resume` printable route  
95. One-click copy email + LinkedIn  
96. “Start here” 60s path (highlights reel)  
97. Role-fit toggles (Frontend / Fullstack / Creative)  
98. Download case study PDF per project  
99. Clear availability + timezone  
100. Testimonials with company logos (permissioned)  

### Fun Easter Eggs (101–108)

101. Konami → wireframe mode  
102. Logo click 5× → terminal  
103. `sudo hire me`  
104. Hidden credit roll  
105. Cursor becomes your GitHub avatar  
106. Midnight-only accent  
107. Recruiter radar blip on contact hover  
108. 404 as playable micro-scene  

### Portfolio Differentiation (109–114)

109. Publish “engineering notes” beside each animation  
110. Open-source the engine (`engine/` package)  
111. Public ADR folder for architectural decisions  
112. Before/after of this portfolio’s own Lighthouse  
113. “Inspect mode” explaining why a tween exists  
114. Compare view: static HTML vs enhanced  

### Personal Branding (115–120)

115. Signature monogram system  
116. Personal principles poster  
117. Speaking/appearance section  
118. Reading list with why  
119. Toolbelt as productized kit  
120. Consistent photography grade  

### Interactive Resume (121–126)

121. Resume nodes on a timeline graph  
122. Filter by skill → highlight jobs  
123. Drag to reorder emphasis for export  
124. Export tailored PDF  
125. Evidence drawer (links, PRs, metrics)  
126. Verification badges (certs)  

### Creative Project Showcase (127–132)

127. Project “trailers” (3s loops)  
128. Stack depth meter  
129. Role clarity (solo vs team)  
130. Constraint cards (what you wouldn’t do)  
131. Aftermath: what you’d rebuild  
132. Companion repo buttons with stars live  

### Experimental UI (133–140+)

133. Command palette (`⌘K`) site control  
134. Spatial nav minimap  
135. Gaze-inspired focus ring that blooms  
136. Depth-based typography occlusion  
137. Scrollable shader as scrollbar  
138. Act curtains (theatrical wipes) used once  
139. Dual-channel UI: “human” vs “machine” copy toggle  
140. End-credit interactive crawl  

---

## 22. Feature Dependency Graph

```
Phase0 Research
   └─▶ Phase1 Infrastructure
          ├─▶ Phase2 Global Systems
          │      ├─▶ Phase3 Hero (Act I)
          │      │      └─▶ Phase5 Skills + Phase6 About (Act II)
          │      │             └─▶ Phase4 Projects (Act III)
          │      │                    └─▶ Act IV Proof
          │      │                           └─▶ Phase8 Contact (Act V)
          │      └─▶ Phase7 Playground (parallel, after Phase1)
          ├─▶ Phase9 Performance (continuous from Phase3+)
          └─▶ Phase10 Polish (after Acts I–V vertical slice)
```

### Hard dependencies

| Feature | Depends on |
|---|---|
| Hero shaders | Canvas + RAF + Scroll |
| Project morph | Timeline + GSAP + Section progress |
| Knowledge graph | Scene manager + reduced-motion fallback |
| Sound | User gesture + Phase2 toggle |
| Contact send ritual | Form API + GSAP |
| Perf guardian | RAF FPS |
| Playground physics | Dynamic import + isolated canvas |

### Parallelizable tracks

- Content writing (acts script) ∥ engine work  
- Project assets pipeline ∥ Hero polish  
- Playground ∥ Act IV data ingestion  
- SEO/content MDX ∥ Phase 10 easter eggs  

---

## 23. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Scroll jank on mobile | High | Medium | Alternate timelines; fewer particles; native scroll fallback |
| WebGL context loss | High | Low | Error boundary; DOM fallback mode |
| Scope explosion (100+ bonuses) | High | High | P0–P1 freeze; bonuses backlog only |
| GSAP + Lenis + ScrollTrigger conflicts | Medium | Medium | One scroll authority (ScrollManager); ST only for pin helpers |
| Accessibility regressions from custom cursor | Medium | Medium | Hide cursor on touch; keep focus rings; reduced-motion path |
| Heavy videos | High | Medium | Posters; deferred decode; mobile stills |
| Content thinness (pretty but empty) | High | Medium | Act IV metrics mandatory for each project |
| SEO SPA traps | Medium | Low | Real HTML text in sections; not canvas-only copy |
| Analytics privacy concerns | Low | Low | Privacy-first vendor; no invasive session replay by default |
| Maintenance cost of bespoke engine | Medium | Medium | Document engines; tests on pure functions; resist rewrites |

---

## 24. Accessibility Checklist

- [ ] `prefers-reduced-motion` disables smooth scroll, WebGL, particles, parallax  
- [ ] User motion intensity control (Off / Reduced / Full)  
- [ ] Skip link to `#main`  
- [ ] Semantic landmarks (`header`, `main`, `nav`, `footer`, sections with labels)  
- [ ] Focus visible always; never `outline: none` without replacement  
- [ ] Keyboard: traverse acts, open project details, submit contact  
- [ ] Custom cursor does not replace focus indication  
- [ ] Hit targets ≥ 44px on touch  
- [ ] Color contrast ≥ WCAG AA (check accent on dark)  
- [ ] Form errors linked via `aria-describedby`  
- [ ] Videos captioned or non-essential  
- [ ] `aria-live` for copy-email / form success  
- [ ] No seizure-risk flashes; confetti capped  
- [ ] Screen reader text for canvas (`aria-hidden` decorative) with HTML equivalents  
- [ ] Reduced-motion screenshots reviewed as first-class design  

---

## 25. SEO Checklist

- [ ] Unique title/description  
- [ ] Canonical URL  
- [ ] Open Graph + Twitter images (dynamic)  
- [ ] `robots.txt` + `sitemap.xml`  
- [ ] JSON-LD Person / WebSite  
- [ ] Real text content crawlable (not only WebGL)  
- [ ] Project subpaths or hash URLs with sensible titles if expanded  
- [ ] Fast LCP element = brand text or optimized image  
- [ ] Image `alt` meaningful  
- [ ] `lang` attribute correct  
- [ ] Social `sameAs` links  
- [ ] 404 meaningful  
- [ ] Performance not tanking SEO via TBT  

---

## 26. QA Checklist

### Functional

- [ ] All acts reachable via scroll, nav, keyboard  
- [ ] Loader completes and never soft-locks  
- [ ] Contact form success + failure paths  
- [ ] Deep link to `#projects` lands correctly after hydration  
- [ ] Playground unload restores memory roughly (devtools heap sanity)  

### Visual / Motion

- [ ] No layout shift on font load  
- [ ] Act transitions direction-aware  
- [ ] Reduced-motion screenshots approved  
- [ ] DPR switching doesn’t flash violently  

### Cross-cutting

- [ ] FPS overlay in `?debug=perf`  
- [ ] Analytics events fire once per act enter  
- [ ] Error boundary on intentional canvas throw  
- [ ] Lighthouse CI thresholds  

### Devices

- [ ] Desktop Chrome / Safari / Firefox  
- [ ] iOS Safari mid-tier  
- [ ] Android Chrome mid-tier  
- [ ] Reduced motion OS setting  

---

## 27. Browser Support Strategy

| Tier | Browsers | Expectation |
|---|---|---|
| A | Last 2 Chrome, Safari, Firefox, Edge | Full experience |
| B | iOS 16+ Safari, Android Chrome 110+ | Full with quality Medium default |
| C | Older | Progressive: no WebGL, native scroll, full content |

### Feature detection

- WebGL2 → else WebGL1 → else DOM-only  
- `OffscreenCanvas` optional acceleration  
- `ResizeObserver` / `IntersectionObserver` required (polyfill only if Tier C forced)  

---

## 28. Mobile Strategy

**Do not disable the experience. Retarget it.**

| Concern | Desktop | Mobile |
|---|---|---|
| Scroll smoothing | Lenis on | Lower lerp or native if jank |
| Particles | Up to 400 | 0–80 or off |
| Post FX | On (High) | Off |
| Shadows | Optional | Off |
| Custom cursor | On | Off |
| Project videos | Autoplay muted in view | Poster + tap to play |
| Typography splits | Words/chars | Words/none |
| Knowledge graph | Simulated/3D optional | Prebaked 2D |
| Magnetic buttons | On | Off |
| Hero shader | Full | Simplified |

### Mobile UX extras

- Larger tap targets for act dots  
- Sticky compact progress  
- Avoid multi-finger required gestures  
- Test notch/safe-areas  

---

## 29. Launch Checklist

### Pre-launch

- [ ] Five-act copy final  
- [ ] ≥ 3 projects with Act IV metrics  
- [ ] Contact endpoint secured (rate limit, honeypot)  
- [ ] Analytics live  
- [ ] Error monitoring optional but recommended  
- [ ] OG images verified in Slack/iMessage  
- [ ] Performance budgets green on reference hardware  
- [ ] A11y audit (axe + manual keyboard)  
- [ ] Legal: privacy note if analytics  
- [ ] 404 + robots + sitemap  
- [ ] Favicon / app icons  
- [ ] Domain + HTTPS + redirects  

### Launch day

- [ ] Soft launch to 5 trusted reviewers  
- [ ] Watch error + FPS anecdotal reports  
- [ ] Share with targeted recruiter/dev audiences  

### Post-launch (week 1)

- [ ] Fix P0 bugs only  
- [ ] Measure scroll depth / contact rate  
- [ ] Schedule Phase 10 easter egg if core stable  

---

## 30. Future Expansion

- Open-source the `engine/` as a named kit  
- Multilingual narrative  
- CMS for projects (still compiled to static)  
- Guest experiments in playground  
- Conference talk companion mode  
- Hiring mode microsite variant  
- WebXR optional lab (never on main path)  
- Paid template of the architecture (if desired) without personal content  

---

## Appendix A — Priority Legend

| Tag | Meaning |
|---|---|
| P0 | Must ship for memorable vertical slice |
| P1 | High value; ship for launch quality |
| P2 | Strong enhancement; schedule intentionally |
| P3 | Delight / experimental; backlog |

## Appendix B — Complexity Legend

| Tag | Meaning |
|---|---|
| S | ≤ 1 day |
| M | 2–5 days |
| L | 1–2+ weeks |

## Appendix C — Implementation Order for Agents

When implementing, follow this sequence unless blocked:

1. Confirm Phase 0 decisions still valid (GSAP-only, five acts).  
2. Close Phase 1 gaps (perf debug, tests, CI, error boundaries).  
3. Phase 2 loader + keyboard + progress/acts.  
4. Phase 3 Hero vertical slice (DOM + simple 3D).  
5. Phase 8 Contact (conversion path early).  
6. Phase 4 one exemplary project scene end-to-end.  
7. Act IV proof data for that project.  
8. Phase 5 + 6 craft/about visualizations.  
9. Expand to 3 projects.  
10. Phase 9 hardening.  
11. Phase 7 playground behind route.  
12. Phase 10 polish.  

**Rule:** Never add a bonus feature while a P0 in the current act is incomplete.

---

## Appendix D — Content Minimums (Launch)

| Area | Minimum |
|---|---|
| Hero promise | 1 sentence |
| Featured projects | 3 |
| Metrics per project | ≥ 2 verifiable |
| Skills clusters | ≥ 4 |
| About chapters | ≥ 3 |
| Contact methods | Form + email + 2 socials |
| Resume | `/resume` or downloadable PDF |

---

*End of FEATURE_ROADMAP.md*  
*This document is the blueprint. Code follows it — not the other way around.*
