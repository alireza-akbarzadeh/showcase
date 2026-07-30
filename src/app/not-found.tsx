import Link from "next/link";
import { SITE } from "@/constants";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col justify-end px-6 pb-16 pt-32 md:px-12 lg:px-20">
      <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
        404
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-[clamp(3rem,10vw,7rem)] leading-[0.92] tracking-[-0.04em]">
        Lost the plot.
      </h1>
      <p className="mt-6 max-w-md text-lg text-[var(--muted)]">
        This path isn&apos;t part of the five-act story. {SITE.name} starts at
        the beginning.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-mono text-xs tracking-[0.2em] text-[var(--accent-foreground)] uppercase transition-opacity hover:opacity-90"
        >
          Return home
        </Link>
        <Link
          href="/playground"
          className="border border-[var(--border)] px-6 py-3 font-mono text-xs tracking-[0.2em] text-[var(--muted)] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Try the lab
        </Link>
      </div>
    </main>
  );
}
