import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";
import { chapterLocal } from "@/components/creative/scenes/project-progress";
import { SKILL_CLUSTERS } from "@/constants";

export function createSkillsScene(
  getElements: () => {
    root: HTMLElement | null;
    clusters: HTMLElement[];
    connectors: HTMLElement[];
    graph: HTMLElement | null;
    stack: HTMLElement | null;
    detail: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "skills",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 28], [0.2, 0, easeOutCubic], [1, -20]),
      },
    ],
  });

  return {
    id: "skills",
    range: { start: 0.2, end: 0.4, normalized: true },
    label: "Craft",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, clusters, connectors, graph, stack, detail } =
        getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";
      const yMul = mobile ? 0.45 : 1;

      if (root) {
        setTransform(root, {
          y: (values.get("y") ?? 0) * yMul,
        });
      }

      if (graph) {
        const g = chapterLocal(ctx.progress, 0.05, 0.35);
        const t = easeOutCubic(g);
        setOpacity(graph, Math.max(0.35, t));
        setTransform(graph, { y: (1 - t) * 24 * yMul });

        const edges = graph.querySelectorAll<SVGLineElement>("[data-skills-edge]");
        edges.forEach((edge, i) => {
          const len = Number(edge.getAttribute("stroke-dasharray") ?? 100);
          const e = chapterLocal(g, i * 0.04, 0.55 + i * 0.03);
          edge.style.strokeDashoffset = String(len * (1 - easeOutCubic(e)));
        });

        // Focus clusters in order as scroll advances
        const focusIndex = Math.min(
          SKILL_CLUSTERS.length - 1,
          Math.floor(chapterLocal(ctx.progress, 0.15, 0.75) * SKILL_CLUSTERS.length),
        );
        const focusId = SKILL_CLUSTERS[focusIndex]?.id;
        graph.querySelectorAll<SVGGElement>("[data-skills-node]").forEach((node) => {
          const cluster = node.dataset.cluster;
          const focused = cluster === focusId;
          node.style.opacity = focused ? "1" : "0.45";
        });
      }

      if (detail) {
        const d = chapterLocal(ctx.progress, 0.12, 0.4);
        setOpacity(detail, Math.max(0.4, easeOutCubic(d)));
        setTransform(detail, { y: (1 - easeOutCubic(d)) * 18 * yMul });
      }

      if (stack) {
        const layers = stack.querySelectorAll<HTMLElement>("[data-skills-stack-layer]");
        layers.forEach((layer, i) => {
          const start = 0.35 + i * 0.08;
          const local = chapterLocal(ctx.progress, start, start + 0.2);
          const t = easeOutCubic(local);
          setTransform(layer, {
            y: (1 - t) * 28 * yMul,
            scale: 0.96 + t * 0.04,
          });
          setOpacity(layer, 0.25 + t * 0.75);
        });
      }

      clusters.forEach((el, i) => {
        const start = 0.55 + i * 0.08;
        const local = chapterLocal(ctx.progress, start, start + 0.22);
        const t = easeInOutCubic(local);
        setOpacity(el, Math.max(0.4, t));
        setTransform(el, {
          y: (1 - t) * 22 * yMul,
          scale: 0.97 + t * 0.03,
        });
      });

      connectors.forEach((el, i) => {
        const start = 0.62 + i * 0.08;
        const local = chapterLocal(ctx.progress, start, start + 0.2);
        setTransform(el, { scaleX: easeOutCubic(local), scaleY: 1 });
        setOpacity(el, Math.max(0.15, local));
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
