"use client";

import { useEffect, useState } from "react";
import {
  subscribeAchievements,
  type Achievement,
  type AchievementId,
} from "@/lib/achievements";
import { playSound } from "@/hooks/use-sound";
import { cn } from "@/utils/cn";

interface Toast {
  id: AchievementId;
  achievement: Achievement;
}

/**
 * Quiet achievement toasts — non-blocking, auto-dismiss.
 */
export function AchievementToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return subscribeAchievements((id, achievement) => {
      playSound("unlock");
      setToasts((prev) => [...prev.filter((t) => t.id !== id), { id, achievement }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-[85] flex w-[min(100%-2rem,20rem)] flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "border border-[var(--border)] bg-black/80 px-4 py-3 backdrop-blur-sm",
            "animate-[toast-in_0.35s_ease-out]",
          )}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
            Unlocked
          </p>
          <p className="font-display mt-1 text-lg tracking-[-0.02em]">
            {toast.achievement.title}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{toast.achievement.blurb}</p>
        </div>
      ))}
    </div>
  );
}
