import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";
import { chapterLocal } from "@/components/creative/scenes/project-progress";

export function createProofScene(
  getElements: () => {
    root: HTMLElement | null;
    stats: HTMLElement[];
    comparisons: HTMLElement[];
    evidence: HTMLElement | null;
    closing: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "proof",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 32], [0.25, 0, easeOutCubic], [1, -12]),
      },
    ],
  });

  let frame = 0;

  return {
    id: "proof",
    range: { start: 0.74, end: 0.9, normalized: true },
    label: "Proof",
    onProgress: (ctx) => {
      frame += 1;
      const values = timeline.setProgress(ctx.progress);
      const { root, stats, comparisons, evidence, closing } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";
      const yMul = mobile ? 0.6 : 1;

      if (root) {
        setTransform(root, { y: (values.get("y") ?? 0) * yMul });
      }

      stats.forEach((el, i) => {
        const local = chapterLocal(ctx.progress, 0.06 + i * 0.08, 0.4 + i * 0.05);
        const t = easeInOutCubic(local);
        setOpacity(el, Math.max(0.35, t));
        setTransform(el, {
          y: (1 - t) * 22 * yMul,
          scale: 0.97 + t * 0.03,
        });

        if (frame % 2 !== 0) return;
        const valueEl = el.querySelector<HTMLElement>("[data-proof-value]");
        if (!valueEl) return;
        if (valueEl.dataset.proofStatic === "true") {
          valueEl.textContent = valueEl.dataset.proofDisplay ?? valueEl.textContent;
          return;
        }
        const target = Number(valueEl.dataset.proofTarget ?? 0);
        const suffix = valueEl.dataset.proofSuffix ?? "";
        const prefix = valueEl.dataset.proofPrefix ?? "";
        if (target > 0) {
          valueEl.textContent = `${prefix}${Math.round(target * Math.max(0.12, t))}${suffix}`;
        }
      });

      if (evidence) {
        const e = chapterLocal(ctx.progress, 0.28, 0.55);
        const t = easeOutCubic(e);
        setOpacity(evidence, Math.max(0.25, t));
        setTransform(evidence, { y: (1 - t) * 28 * yMul });

        if (frame % 2 === 0) {
          evidence
            .querySelectorAll<HTMLElement>("[data-proof-case-metric]")
            .forEach((metric) => {
              const target = Number(metric.dataset.proofTarget ?? 0);
              const suffix = metric.dataset.proofSuffix ?? "";
              const prefix = metric.dataset.proofPrefix ?? "";
              const display = metric.dataset.proofDisplay ?? "";
              if (!target) {
                metric.textContent = display;
                return;
              }
              const m = chapterLocal(ctx.progress, 0.55, 0.82);
              metric.textContent = `${prefix}${Math.round(target * Math.max(0.1, m))}${suffix}`;
            });
        }
      }

      comparisons.forEach((el, i) => {
        const local = chapterLocal(ctx.progress, 0.35 + i * 0.08, 0.7 + i * 0.05);
        const t = easeOutCubic(local);
        setOpacity(el, Math.max(0.3, t));
        setTransform(el, { y: (1 - t) * 20 * yMul });

        const wipe = el.querySelector<HTMLElement>("[data-proof-wipe]");
        if (wipe) {
          // Expand divider into a wipe accent across the after column
          setTransform(wipe, {
            scaleX: Math.max(1, 1 + t * (mobile ? 40 : 80)),
            scaleY: 1,
          });
          setOpacity(wipe, 0.35 + t * 0.45);
        }
      });

      if (closing) {
        const c = chapterLocal(ctx.progress, 0.72, 0.95);
        const t = easeOutCubic(c);
        setOpacity(closing, Math.max(0.2, t));
        setTransform(closing, { y: (1 - t) * 18 * yMul });
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}
