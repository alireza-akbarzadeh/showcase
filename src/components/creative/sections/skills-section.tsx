"use client";

import { useCallback, useId, useState } from "react";
import {
  SKILL_CLUSTERS,
  SKILL_EDGES,
  SKILL_NODES,
  TECH_STACK_LAYERS,
} from "@/constants";
import { cn } from "@/utils/cn";

const VB_W = 1000;
const VB_H = 560;

interface SkillsSectionProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  clustersRef: React.MutableRefObject<(HTMLElement | null)[]>;
  connectorsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  graphRef: React.RefObject<HTMLDivElement | null>;
  stackRef: React.RefObject<HTMLUListElement | null>;
}

/**
 * Act II Craft — knowledge graph + stack layers.
 * Scroll owns transforms; React only owns discrete node selection.
 */
export function SkillsSection({
  rootRef,
  clustersRef,
  connectorsRef,
  graphRef,
  stackRef,
}: SkillsSectionProps) {
  const gid = useId();
  const [activeId, setActiveId] = useState<string | null>("raf");
  const active = SKILL_NODES.find((n) => n.id === activeId) ?? SKILL_NODES[0];
  const nodeMap = Object.fromEntries(SKILL_NODES.map((n) => [n.id, n]));

  const onSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <div ref={rootRef} className="w-full will-change-transform">
      <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--signal)] uppercase">
        Act II · Craft
      </p>
      <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.035em]">
        How I think in systems.
      </h2>
      <p className="mt-5 max-w-xl text-lg text-[var(--muted-foreground)]">
        Skills as a connected ecosystem — focus a node, watch the stack assemble.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div
          ref={graphRef}
          data-skills-graph
          className="relative border border-[var(--border)] will-change-transform"
        >
          <p className="border-b border-[var(--border)] px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
            Knowledge graph
          </p>
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Skills knowledge graph"
          >
            <title>Skills knowledge graph</title>
            {SKILL_EDGES.map((edge) => {
              const a = nodeMap[edge.from];
              const b = nodeMap[edge.to];
              if (!a || !b) return null;
              const x1 = a.x * VB_W;
              const y1 = a.y * VB_H;
              const x2 = b.x * VB_W;
              const y2 = b.y * VB_H;
              const len = Math.hypot(x2 - x1, y2 - y1);
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  data-skills-edge
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--signal)"
                  strokeWidth="1.25"
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  opacity={0.55}
                />
              );
            })}
            {SKILL_NODES.map((node) => {
              const cx = node.x * VB_W;
              const cy = node.y * VB_H;
              const selected = node.id === active?.id;
              return (
                <g
                  key={node.id}
                  data-skills-node={node.id}
                  data-cluster={node.clusterId}
                  transform={`translate(${cx} ${cy})`}
                >
                  <circle
                    r={selected ? 28 : 22}
                    fill="var(--background)"
                    stroke={selected ? "var(--signal)" : "var(--border)"}
                    strokeWidth={selected ? 2 : 1.25}
                  />
                  <foreignObject x={-48} y={-12} width={96} height={24}>
                    <button
                      type="button"
                      id={`${gid}-${node.id}`}
                      aria-pressed={selected}
                      aria-describedby={`${gid}-detail`}
                      onClick={() => onSelect(node.id)}
                      onFocus={() => onSelect(node.id)}
                      className={cn(
                        "w-full text-center font-mono text-[10px] tracking-[0.08em] uppercase outline-none",
                        selected
                          ? "text-[var(--signal)]"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                      )}
                    >
                      {node.label}
                    </button>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        <aside
          id={`${gid}-detail`}
          data-skills-detail
          className="border border-[var(--border)] px-5 py-6 will-change-transform"
          aria-live="polite"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {active
              ? SKILL_CLUSTERS.find((c) => c.id === active.clusterId)?.label
              : "Cluster"}
          </p>
          <h3 className="font-display mt-3 text-3xl tracking-[-0.02em]">
            {active?.label ?? "Select a node"}
          </h3>
          <p className="mt-4 text-[var(--muted-foreground)]">
            {active?.how ?? "Focus a node in the graph to see how I use it."}
          </p>
          <p className="mt-6 text-sm text-[var(--muted-foreground)]">
            Keyboard: Tab through nodes · scroll focuses clusters.
          </p>
        </aside>
      </div>

      <ul
        ref={stackRef}
        data-skills-stack
        className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
      >
        {TECH_STACK_LAYERS.map((layer, i) => (
          <li
            key={layer.id}
            data-skills-stack-layer
            data-stack-index={i}
            className="border border-[var(--border)] px-4 py-5 will-change-transform"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal)] uppercase">
              {layer.label}
            </p>
            <ul className="mt-4 space-y-2 text-[var(--muted-foreground)]">
              {layer.items.map((item) => (
                <li key={item} className="text-base text-[var(--foreground)]">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <ul className="relative mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
        {SKILL_CLUSTERS.map((cluster, i) => (
          <li
            key={cluster.id}
            ref={(el) => {
              clustersRef.current[i] = el;
            }}
            data-skills-cluster={cluster.id}
            className="relative border-t border-[var(--border)] py-8 pr-6 will-change-transform md:min-h-[260px]"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
              0{i + 1}
            </span>
            <h3 className="font-display mt-4 text-3xl tracking-[-0.02em]">
              {cluster.label}
            </h3>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">{cluster.focus}</p>
            <ul className="mt-6 space-y-2.5 text-[var(--muted-foreground)]">
              {cluster.skills.map((skill) => (
                <li key={skill} className="text-base md:text-lg">
                  {skill}
                </li>
              ))}
            </ul>
            {i < SKILL_CLUSTERS.length - 1 ? (
              <div
                ref={(el) => {
                  connectorsRef.current[i] = el;
                }}
                className="pointer-events-none absolute top-8 right-0 hidden h-px w-8 origin-left bg-[var(--signal)] lg:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
