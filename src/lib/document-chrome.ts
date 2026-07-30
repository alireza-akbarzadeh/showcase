import { ACTS, PROJECTS, SCENE_LABELS, SITE } from "@/constants";
import type { SceneId } from "@/types/scene";

const BASE = SITE.title;

export function titleForHash(hash: string): string {
  const id = hash.replace(/^#/, "");
  if (!id) return BASE;

  const project = PROJECTS.find((p) => p.id === id);
  if (project) return `${project.name} · ${SITE.name}`;

  const act = ACTS.find((a) => a.id === id || a.scenes.includes(id as SceneId));
  if (act) return `${act.label} · ${SITE.name}`;

  if (id in SCENE_LABELS) {
    return `${SCENE_LABELS[id as SceneId]} · ${SITE.name}`;
  }

  return BASE;
}

/** Update document title + hash without scrolling (replaceState). */
export function syncLocationChrome(hashId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const next = hashId ? `#${hashId}` : "";
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next || window.location.pathname);
  }
  const title = titleForHash(hashId);
  if (document.title !== title) document.title = title;
}
