import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createProjectsScene(
  getElements: () => {
    root: HTMLElement | null;
    heading: HTMLElement | null;
    panels: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "projects",
    tracks: [
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.08, 1], [0.92, 1], [1, 0.25]),
      },
    ],
  });

  return {
    id: "projects",
    range: { start: 0.45, end: 0.78, normalized: true },
    label: "Projects",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, heading, panels } = getElements();
      if (root) setOpacity(root, values.get("fade") ?? 1);
      if (heading) {
        const t = Math.min(Math.max(ctx.progress / 0.15, 0), 1);
        setOpacity(heading, t);
        setTransform(heading, { y: (1 - easeOutCubic(t)) * 40 });
      }

      const count = Math.max(panels.length, 1);
      panels.forEach((panel, i) => {
        // Each panel owns a slice of project progress
        const start = 0.12 + (i / count) * 0.7;
        const end = start + 0.55 / count + 0.2;
        const local = Math.min(
          Math.max((ctx.progress - start) / Math.max(end - start, 0.001), 0),
          1,
        );
        const enter = easeOutCubic(Math.min(local / 0.35, 1));
        const hold = local > 0.35 && local < 0.75 ? 1 : enter;
        const exit =
          local >= 0.75 ? 1 - easeInOutCubic((local - 0.75) / 0.25) : hold;
        const visibility = Math.min(enter, exit === hold ? hold : Math.max(exit, 0));

        const scale = 0.92 + visibility * 0.08;
        const y = (1 - enter) * 80 + (local > 0.75 ? (local - 0.75) * -60 : 0);
        setOpacity(panel, visibility);
        setTransform(panel, { y, scale });

        // Scrub metric numbers via data attributes
        const metrics = panel.querySelectorAll<HTMLElement>("[data-metric-value]");
        metrics.forEach((metric) => {
          const target = Number(metric.dataset.metricTarget ?? 0);
          const suffix = metric.dataset.metricSuffix ?? "";
          const prefix = metric.dataset.metricPrefix ?? "";
          const isFloat = metric.dataset.metricFloat === "true";
          const current = target * Math.min(Math.max((local - 0.2) / 0.45, 0), 1);
          metric.textContent = isFloat
            ? `${prefix}${current.toFixed(1)}${suffix}`
            : `${prefix}${Math.round(current)}${suffix}`;
        });
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
