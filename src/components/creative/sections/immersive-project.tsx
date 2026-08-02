"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ProjectCaseStudy } from "@/types/project";
import { getScrollManager } from "@/engine/scroll";
import { cn } from "@/utils/cn";

interface ImmersiveProjectProps {
  project: ProjectCaseStudy;
  index: number;
  className?: string;
}

/**
 * Act III immersive project runway.
 * Animation owned by createProjectsScene (transforms / stroke / textContent).
 * Content stays readable at rest — motion enhances, it does not gate details.
 */
export const ImmersiveProject = forwardRef<HTMLElement, ImmersiveProjectProps>(
  function ImmersiveProject({ project, index, className }, ref) {
    const localRef = useRef<HTMLElement | null>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLElement);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      return getScrollManager().registerSection(project.id, el);
    }, [project.id]);

    const nodeMap = Object.fromEntries(
      project.architecture.nodes.map((n) => [n.id, n]),
    );
    const accentSide = index % 2 === 0 ? "85%" : "15%";
    const heroMetric = project.metrics[0];

    return (
      <article
        ref={localRef}
        id={project.id}
        data-project={project.id}
        data-ip-root
        className={cn(
          "relative min-h-[220svh] overflow-hidden border-t border-[var(--border)]",
          className,
        )}
        aria-label={`${project.name} case study`}
      >
        <div
          data-ip-stage
          className="sticky top-0 flex min-h-[100svh] items-end overflow-hidden px-0 pb-16 pt-28 will-change-transform md:pb-24 md:pt-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(ellipse 65% 55% at ${accentSide} 35%, color-mix(in oklab, var(--signal) 18%, transparent), transparent 70%), linear-gradient(180deg, transparent 50%, var(--background) 100%)`,
            }}
          />

          <div className="relative grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p
                data-ip-meta
                className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase will-change-transform"
              >
                0{index + 1} · {project.year} · {project.role}
              </p>
              <h3
                data-ip-title
                className="font-display mt-5 text-[clamp(3.5rem,12vw,8rem)] leading-[0.88] tracking-[-0.05em] will-change-transform"
              >
                {project.name}
              </h3>
              <p
                data-ip-tagline
                className="mt-6 max-w-xl text-xl text-[var(--muted-foreground)] will-change-transform md:text-2xl"
              >
                {project.tagline}
              </p>
              <div
                data-ip-rule
                className="mt-8 h-px w-28 origin-left bg-[var(--signal)] will-change-transform"
                aria-hidden="true"
              />

              <dl className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase">
                    Problem
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--foreground)] md:text-base">
                    {project.problem}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase">
                    Outcome
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--foreground)] md:text-base">
                    {project.outcome}
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack highlights">
                {project.stack.slice(0, 4).map((node) => (
                  <li
                    key={node.id}
                    className="border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase"
                  >
                    {node.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center border border-[var(--signal)] bg-[color-mix(in_oklab,var(--signal)_12%,transparent)] px-4 font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase transition-colors hover:bg-[color-mix(in_oklab,var(--signal)_22%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
                  >
                    View live
                  </a>
                ) : null}
                {project.links.repo ? (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center border border-[var(--border)] px-4 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
                  >
                    Source
                  </a>
                ) : null}
                <a
                  href={`#${project.id}-details`}
                  className="inline-flex min-h-11 items-center px-2 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase underline-offset-4 hover:text-[var(--signal)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
                >
                  Case study ↓
                </a>
              </div>
            </div>

            <div
              data-ip-device
              className="relative mx-auto aspect-[4/3] w-full max-w-md will-change-transform lg:mx-0 lg:justify-self-end"
              aria-hidden="true"
            >
              <div className="absolute inset-0 border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)]">
                <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-[var(--border)] px-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                    {project.name}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--signal)]">
                    {project.year}
                  </span>
                </div>
                <div className="absolute inset-4 top-14 flex flex-col justify-between">
                  <div>
                    <p className="font-display text-3xl tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
                      {heroMetric?.display ?? project.name}
                    </p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                      {heroMetric?.label ?? "Impact"}
                    </p>
                  </div>
                  <p className="max-w-[18ch] text-sm leading-snug text-[var(--muted-foreground)]">
                    {project.approach}
                  </p>
                  <div className="h-1.5 origin-left bg-[var(--signal)] opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id={`${project.id}-details`}
          className="relative space-y-24 px-0 pb-28 pt-8 md:space-y-32"
        >
          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
            Case study · {project.name}
          </p>

          {project.chapters.map((chapter) => (
            <div
              key={chapter.id}
              data-ip-chapter={chapter.id}
              className="max-w-2xl will-change-transform"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--signal)] uppercase">
                {chapter.label}
              </p>
              <h4 className="font-display mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em]">
                {chapter.title}
              </h4>
              <p className="mt-4 text-lg text-[var(--muted-foreground)] md:text-xl">
                {chapter.body}
              </p>
            </div>
          ))}

          {project.architecture.nodes.length > 0 ? (
            <div
              data-ip-arch
              className="max-w-3xl will-change-transform"
              aria-label={`${project.name} architecture diagram`}
            >
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--signal)] uppercase">
                Diagram
              </p>
              <svg
                viewBox="0 0 360 220"
                className="mt-8 w-full text-[var(--foreground)]"
                role="img"
              >
                <title>{project.name} architecture</title>
                {project.architecture.edges.map((edge) => {
                  const a = nodeMap[edge.from];
                  const b = nodeMap[edge.to];
                  if (!a || !b) return null;
                  const length = Math.hypot(b.x - a.x, b.y - a.y);
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      data-ip-edge
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="var(--signal)"
                      strokeWidth="1.5"
                      strokeDasharray={length}
                      strokeDashoffset={length}
                      opacity={0.85}
                    />
                  );
                })}
                {project.architecture.nodes.map((node) => (
                  <g key={node.id} data-ip-node={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={18}
                      fill="var(--background)"
                      stroke="var(--border)"
                      strokeWidth="1.5"
                    />
                    <text
                      x={node.x}
                      y={node.y + 36}
                      textAnchor="middle"
                      className="fill-[var(--muted-foreground)]"
                      fontSize="10"
                      fontFamily="var(--font-mono-family), monospace"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          ) : null}

          {project.stack.length > 0 ? (
            <ul
              data-ip-stack
              className="grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {project.stack.map((node, i) => (
                <li
                  key={node.id}
                  data-ip-stack-node
                  data-stack-index={i}
                  className="border border-[var(--border)] px-4 py-4 will-change-transform"
                >
                  <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase">
                    {node.layer}
                  </p>
                  <p className="mt-2 text-lg text-[var(--foreground)]">
                    {node.label}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          <dl
            data-ip-impact
            className="flex flex-wrap gap-10 will-change-transform md:gap-14"
          >
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                  {metric.label}
                </dt>
                <dd
                  className="font-display mt-2 text-5xl tracking-[-0.03em] text-[var(--signal)] md:text-6xl"
                  data-metric-value
                  data-metric-target={
                    metric.divisor
                      ? metric.target / metric.divisor
                      : metric.target
                  }
                  data-metric-prefix={metric.prefix}
                  data-metric-suffix={metric.suffix}
                  data-metric-float={metric.float ? "true" : "false"}
                >
                  {metric.display}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    );
  },
);

/** @deprecated Use ImmersiveProject */
export const OrbitProject = ImmersiveProject;
