import Link from "next/link";
import { SCENE_ORDER, SCENE_LABELS } from "@/constants";
import type { SceneId } from "@/types/scene";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-foreground)]"
    >
      Skip to content
    </a>
  );
}

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="#hero"
          className="pointer-events-auto font-display text-sm tracking-[0.25em] uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Showcase
        </Link>
        <nav aria-label="Primary" className="pointer-events-auto hidden md:block">
          <ul className="flex gap-6 text-xs uppercase tracking-[0.2em] text-white/80">
            {SCENE_ORDER.filter((id) => id !== "hero").map((id: SceneId) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 opacity-70"
                >
                  {SCENE_LABELS[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10 md:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Showcase. Built for the scroll.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Prefers reduced motion respected.
        </p>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
