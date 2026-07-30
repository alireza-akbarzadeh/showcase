import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createProofScene(
  getElements: () => {
    root: HTMLElement | null;
    stats: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "proof",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 48], [0.3, 0, easeOutCubic], [1, -24]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.15, 1], [0.85, 1], [1, 0.3]),
      },
    ],
  });

  return {
    id: "proof",
    range: { start: 0.74, end: 0.88, normalized: true },
    label: "Proof",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, stats } = getElements();
      if (root) {
        setTransform(root, { y: values.get("y") ?? 0 });
        setOpacity(root, values.get("fade") ?? 1);
      }
      stats.forEach((el, i) => {
        const start = 0.1 + i * 0.18;
        const local = Math.min(Math.max((ctx.progress - start) / 0.35, 0), 1);
        const t = easeInOutCubic(local);
        setOpacity(el, t);
        setTransform(el, { y: (1 - t) * 36, scale: 0.95 + t * 0.05 });

        const valueEl = el.querySelector<HTMLElement>("[data-proof-value]");
        if (valueEl) {
          const target = Number(valueEl.dataset.proofTarget ?? 0);
          const suffix = valueEl.dataset.proofSuffix ?? "";
          valueEl.textContent = `${Math.round(target * t)}${suffix}`;
        }
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
