# Showcase

Scroll-driven creative portfolio foundation.

## Stack

- Next.js 16 · React 19 · TypeScript · pnpm
- GSAP + ScrollTrigger · Lenis
- Three.js · React Three Fiber · Drei · postprocessing
- Tailwind CSS v4 · CVA · Radix · shadcn/ui

## Architecture

```
src/
  engine/
    scheduler/   # Single RAF loop
    scroll/      # Lenis + scroll snapshot (SoT)
    animation/   # Timeline + SceneManager + GSAP
    assets/      # Lazy load / unload / prefetch
    observers/   # IO / Resize / idle
    render/      # Renderer + camera helpers
  components/
    creative/    # Scene factories + SceneHost
    canvas/      # R3F root, camera, FX
    scroll/      # Section bindings, progress UI
    layout/      # Shell, a11y
    ui/          # shadcn primitives
  hooks/         # Non-rerendering scroll/RAF hooks
  providers/     # Theme, scroll, canvas, motion
```

### Rules

1. **One RAF** — everything registers with `getRafScheduler()`.
2. **Scroll outside React** — use `useScroll` / refs / transforms. Never `setState` on scroll.
3. **GPU props only** — `translate` / `scale` / `rotate` / `opacity` / uniforms / camera.
4. **Scenes own animation** — pages compose; scene factories animate.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm format
```

Requires **Node 22+** (`engines` in `package.json`). CI runs lint → typecheck → test → build on every PR.

## Extending a scene

1. Add a factory in `src/components/creative/scenes/`.
2. Register it in `SceneHost`.
3. Drive DOM/Three via timeline progress — not React state.

## Accessibility

- `prefers-reduced-motion` disables Lenis smoothing + WebGL canvas
- Skip link, semantic sections, focus styles
- Keyboard-friendly nav anchors
