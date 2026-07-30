"use client";

export function PrintButton({ label = "Print / PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-[var(--signal)] bg-[var(--signal)] px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[var(--signal-foreground)] uppercase"
    >
      {label}
    </button>
  );
}
