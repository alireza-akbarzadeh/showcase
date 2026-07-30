"use client";

import { forwardRef } from "react";
import type { ProjectCaseStudy } from "@/types/project";
import { cn } from "@/utils/cn";

interface ImmersiveProjectProps {
  project: ProjectCaseStudy;
  index: number;
  className?: string;
}

/**
 * Act III immersive project runway.
 * Animation owned by createProjectsScene (transforms / stroke / textContent).
 */
export const ImmersiveProject = forwardRef<HTMLElement, ImmersiveProjectProps>(
  function ImmersiveProject({ project, index, className }, ref) {
    const nodeMap = Object.fromEntries(
      project.architecture.nodes.map((n) => [n.id, n]),
    );
    const accentSide = index % 2 === 0 ? "85%" : "15%";

    return (
      <article
        ref={ref}
        id={project.id}
        data-project={project.id}
        data-ip-root
        className={cn(
          "relative min-h-[260svh] overflow-hidden border-t border-[var(--border)]",
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
                0{index + 1} · {project.role}
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
            </div>

            <div
              data-ip-device
              className="relative mx-auto aspect-[4/3] w-full max-w-md will-change-transform lg:mx-0 lg:justify-self-end"
              aria-hidden="true"
            >
              <div className="absolute inset-0 border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_80%,transparent)]">
                <div className="absolute inset-x-0 top-0 h-8 border-b border-[var(--border)]" />
                <div className="absolute inset-4 top-12 grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-[var(--border)] bg-[color-mix(in_oklab,var(--signal)_8%,transparent)]"
                      style={{ opacity: 0.35 + ((i + index) % 3) * 0.15 }}
                    />
                  ))}
                </div>
                <div className="absolute right-4 bottom-4 left-4 h-1.5 origin-left bg-[var(--signal)] opacity-70" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative space-y-28 px-0 pb-32 md:space-y-36">
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
                      className="fill-[var(--muted)]"
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
