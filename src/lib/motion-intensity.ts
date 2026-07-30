export type MotionIntensity = "off" | "reduced" | "full";

const STORAGE_KEY = "showcase:motion-intensity";

type Listener = (intensity: MotionIntensity) => void;

function readStored(): MotionIntensity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "off" || raw === "reduced" || raw === "full") return raw;
  } catch {
    // ignore
  }
  return null;
}

function osPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Resolve intensity: stored preference, else OS reduce → reduced, else full.
 */
export function resolveMotionIntensity(
  stored: MotionIntensity | null = readStored(),
): MotionIntensity {
  if (stored) return stored;
  return osPrefersReduced() ? "reduced" : "full";
}

let current: MotionIntensity =
  typeof window !== "undefined" ? resolveMotionIntensity() : "full";
const listeners = new Set<Listener>();

export function getMotionIntensity(): MotionIntensity {
  return current;
}

/** True when WebGL / smooth scroll / cursor should be disabled. */
export function isMotionRestricted(): boolean {
  return current !== "full";
}

export function setMotionIntensity(intensity: MotionIntensity): void {
  current = intensity;
  try {
    window.localStorage.setItem(STORAGE_KEY, intensity);
  } catch {
    // ignore
  }
  if (typeof document !== "undefined") {
    document.documentElement.dataset.motion = intensity;
  }
  for (const listener of listeners) listener(intensity);
}

export function subscribeMotionIntensity(listener: Listener): () => void {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

/** Sync from OS when user has no explicit override. */
export function syncMotionFromOs(): void {
  if (readStored()) return;
  const next = osPrefersReduced() ? "reduced" : "full";
  if (next !== current) {
    current = next;
    if (typeof document !== "undefined") {
      document.documentElement.dataset.motion = next;
    }
    for (const listener of listeners) listener(next);
  }
}
