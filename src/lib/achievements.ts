export type AchievementId =
  | "first-scroll"
  | "full-scroll"
  | "konami"
  | "contact-sent"
  | "playground"
  | "sound-on";

export interface Achievement {
  readonly id: AchievementId;
  readonly title: string;
  readonly blurb: string;
}

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  "first-scroll": {
    id: "first-scroll",
    title: "In motion",
    blurb: "You started the scroll story.",
  },
  "full-scroll": {
    id: "full-scroll",
    title: "Five acts",
    blurb: "You reached the end of the narrative.",
  },
  konami: {
    id: "konami",
    title: "Classic",
    blurb: "↑↑↓↓←→←→BA — the old ways still work.",
  },
  "contact-sent": {
    id: "contact-sent",
    title: "Signal sent",
    blurb: "Journey complete — message delivered.",
  },
  playground: {
    id: "playground",
    title: "Lab rat",
    blurb: "You found the side quest.",
  },
  "sound-on": {
    id: "sound-on",
    title: "Ears open",
    blurb: "Optional audio layer enabled.",
  },
};

const STORAGE_KEY = "showcase:achievements";

type Listener = (id: AchievementId, achievement: Achievement) => void;

function readUnlocked(): Set<AchievementId> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed.filter((id): id is AchievementId => id in ACHIEVEMENTS));
  } catch {
    return new Set();
  }
}

function writeUnlocked(ids: Set<AchievementId>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

const unlocked = typeof window !== "undefined" ? readUnlocked() : new Set<AchievementId>();
const listeners = new Set<Listener>();

export function getUnlockedAchievements(): readonly AchievementId[] {
  return [...unlocked];
}

export function isAchievementUnlocked(id: AchievementId): boolean {
  return unlocked.has(id);
}

export function unlockAchievement(id: AchievementId): boolean {
  if (unlocked.has(id)) return false;
  unlocked.add(id);
  writeUnlocked(unlocked);
  const achievement = ACHIEVEMENTS[id];
  for (const listener of listeners) listener(id, achievement);
  return true;
}

export function subscribeAchievements(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
