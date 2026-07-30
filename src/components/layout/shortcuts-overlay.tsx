"use client";

import { useEffect, useId, useRef, useState } from "react";

const SHORTCUTS = [
  { keys: "1–5", action: "Jump to act" },
  { keys: "↑ ↓ / j k", action: "Prev / next scene" },
  { keys: "M", action: "Toggle sound (off by default)" },
  { keys: "?", action: "Toggle this cheatsheet" },
  { keys: "~", action: "Toggle ?debug=perf overlay" },
  { keys: "Esc", action: "Close overlays" },
] as const;

/**
 * `?` opens keyboard cheatsheet. `~` toggles perf debug query.
 */
export function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "?" || (event.key === "/" && event.shiftKey)) {
        event.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "`" || event.key === "~") {
        event.preventDefault();
        const url = new URL(window.location.href);
        if (url.searchParams.get("debug") === "perf") {
          url.searchParams.delete("debug");
        } else {
          url.searchParams.set("debug", "perf");
        }
        window.history.replaceState({}, "", url);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/55 p-6 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              Shortcuts
            </p>
            <h2 id={titleId} className="font-display mt-2 text-2xl tracking-[-0.03em]">
              Move through the story
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs tracking-[0.2em] text-[var(--muted)] uppercase hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Esc
          </button>
        </div>

        <ul className="mt-8 space-y-3">
          {SHORTCUTS.map((row) => (
            <li
              key={row.keys}
              className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-3"
            >
              <kbd className="font-mono text-xs text-[var(--accent)]">{row.keys}</kbd>
              <span className="text-sm text-[var(--muted)]">{row.action}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-[var(--muted)]">
          Lab lives at{" "}
          <a href="/playground" className="text-[var(--accent)] underline-offset-4 hover:underline">
            /playground
          </a>
          .
        </p>
      </div>
    </div>
  );
}
