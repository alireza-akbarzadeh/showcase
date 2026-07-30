"use client";

import Link from "next/link";
import { ACTS, SITE } from "@/constants";
import { getScrollManager } from "@/engine/scroll";
import { SoundToggle } from "@/components/layout/sound-toggle";

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
          className="pointer-events-auto font-display text-sm tracking-[0.25em] text-white uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {SITE.name}
        </Link>
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-6 lg:flex"
        >
          <ul className="flex gap-6 text-xs tracking-[0.2em] text-white/80 uppercase">
            {ACTS.map((act) => {
              const scene = act.scenes[0];
              return (
                <li key={act.id}>
                  <a
                    href={`#${scene}`}
                    className="opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    onClick={(event) => {
                      event.preventDefault();
                      if (scene) getScrollManager().scrollTo(`#${scene}`);
                    }}
                  >
                    {act.short}
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                href="/playground"
                className="opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Lab
              </Link>
            </li>
          </ul>
          <SoundToggle className="text-white/80" />
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
          © {new Date().getFullYear()} {SITE.name}. Five acts. One scroll.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Keys 1–5 jump acts · M toggles sound ·{" "}
          <Link
            href="/playground"
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            /playground
          </Link>{" "}
          · press ? for shortcuts
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
