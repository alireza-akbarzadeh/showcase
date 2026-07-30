import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";
import { chapterLocal } from "@/components/creative/scenes/project-progress";

export function createAboutScene(
  getElements: () => {
    root: HTMLElement | null;
    chapters: HTMLElement[];
    career: HTMLElement | null;
    careerTrack: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "about",
    tracks: [
      {
        id: "x",
        keyframes: keyframes([0, -20], [0.3, 0, easeOutCubic], [1, 12]),
      },
    ],
  });

  return {
    id: "about",
    range: { start: 0.34, end: 0.48, normalized: true },
    label: "About",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, chapters, career, careerTrack } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";

      if (root) {
        setTransform(root, {
          x: (values.get("x") ?? 0) * (mobile ? 0.35 : 1),
        });
      }

      chapters.forEach((el, i) => {
        const start = 0.08 + i * 0.14;
        const local = chapterLocal(ctx.progress, start, start + 0.28);
        const t = easeInOutCubic(local);
        setOpacity(el, Math.max(0.45, t));
        setTransform(el, { y: (1 - t) * 22 });
      });

      if (career) {
        const c = chapterLocal(ctx.progress, 0.45, 0.7);
        const t = easeOutCubic(c);
        setOpacity(career, Math.max(0.3, t));
        setTransform(career, { y: (1 - t) * 24 });
      }

      if (careerTrack) {
        // Horizontal scrub of the journey rail
        const scrub = chapterLocal(ctx.progress, 0.5, 0.95);
        const maxShift = mobile ? 120 : 220;
        setTransform(careerTrack, {
          x: -scrub * maxShift,
        });

        const stops = careerTrack.querySelectorAll<HTMLElement>(
          "[data-about-career-stop]",
        );
        stops.forEach((stop, i) => {
          const local = chapterLocal(scrub, i * 0.2, 0.35 + i * 0.2);
          const t = easeOutCubic(local);
          setOpacity(stop, 0.35 + t * 0.65);
          setTransform(stop, { y: (1 - t) * 14 });
        });
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}
