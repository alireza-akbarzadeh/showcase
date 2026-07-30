import type { Metadata } from "next";
import Link from "next/link";
import {
  CAREER_JOURNEY,
  PROJECTS,
  SITE,
  SKILL_CLUSTERS,
  SOCIALS,
} from "@/constants";
import { SignatureMotif } from "@/components/brand/signature-motif";
import { PrintButton } from "@/components/layout/print-button";

export const metadata: Metadata = {
  title: "Resume",
  description: `${SITE.author} — printable one-pager resume.`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-20 print:max-w-none print:px-0 print:py-0">
      <div className="mb-10 flex items-start justify-between gap-6 print:mb-6">
        <div>
          <SignatureMotif size="sm" animate={false} className="mb-4 print:hidden" />
          <h1 className="font-display text-4xl tracking-[-0.03em] md:text-5xl">
            {SITE.author}
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Creative Frontend Engineer · {SITE.availability}
          </p>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            <a href={`mailto:${SITE.email}`} className="text-[var(--signal)]">
              {SITE.email}
            </a>
            {" · "}
            {SOCIALS.map((s, i) => (
              <span key={s.id}>
                {i > 0 ? " · " : null}
                <a href={s.href} className="text-[var(--signal)]">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-2 print:hidden">
          <PrintButton />
          <Link
            href="/"
            className="border border-[var(--border)] px-4 py-2 text-center font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase hover:border-[var(--signal)] hover:text-[var(--signal)]"
          >
            Portfolio
          </Link>
        </div>
      </div>

      <section className="border-t border-[var(--border)] pt-8">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--signal)] uppercase">
          Selected work
        </h2>
        <ul className="mt-4 space-y-4">
          {PROJECTS.map((project) => (
            <li key={project.id}>
              <p className="font-display text-xl tracking-[-0.02em]">
                {project.name}
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {project.role} — {project.tagline}
              </p>
              <p className="mt-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                {project.metrics.map((m) => m.display).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-[var(--border)] pt-8">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--signal)] uppercase">
          Experience
        </h2>
        <ul className="mt-4 space-y-4">
          {CAREER_JOURNEY.map((stop) => (
            <li key={stop.id}>
              <p className="font-mono text-[11px] text-[var(--muted-foreground)]">
                {stop.year} · {stop.place}
              </p>
              <p className="font-display text-lg tracking-[-0.02em]">{stop.role}</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {stop.achievement}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-[var(--border)] pt-8">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--signal)] uppercase">
          Craft
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SKILL_CLUSTERS.map((cluster) => (
            <li key={cluster.id}>
              <p className="text-sm font-medium">{cluster.label}</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {cluster.skills.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
