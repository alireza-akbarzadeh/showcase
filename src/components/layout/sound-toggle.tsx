"use client";

import { useSoundEnabled, toggleSound } from "@/hooks/use-sound";
import { unlockAchievement } from "@/lib/achievements";
import { cn } from "@/utils/cn";

export function SoundToggle({ className }: { className?: string }) {
  const enabled = useSoundEnabled();

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      className={cn(
        "pointer-events-auto font-mono text-[10px] tracking-[0.25em] uppercase opacity-70 transition-opacity hover:opacity-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
      onClick={() => {
        void toggleSound().then((on) => {
          if (on) unlockAchievement("sound-on");
        });
      }}
    >
      Sound {enabled ? "on" : "off"}
    </button>
  );
}
