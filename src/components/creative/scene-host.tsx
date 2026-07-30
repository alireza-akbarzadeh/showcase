"use client";

import { useEffect, useRef } from "react";
import { getSceneManager } from "@/engine/animation";
import { getScrollManager } from "@/engine/scroll";
import { createHeroScene } from "@/components/creative/scenes/hero-scene";
import { createIntroScene } from "@/components/creative/scenes/intro-scene";
import { createProjectsScene } from "@/components/creative/scenes/projects-scene";
import { createAboutScene } from "@/components/creative/scenes/about-scene";
import { createSkillsScene } from "@/components/creative/scenes/skills-scene";
import { createProofScene } from "@/components/creative/scenes/proof-scene";
import { createContactScene } from "@/components/creative/scenes/contact-scene";
import { HeroSection } from "@/components/creative/sections/hero-section";
import { OrbitProject } from "@/components/creative/sections/orbit-project";
import { ContactForm } from "@/components/creative/contact-form";
import { Section } from "@/components/scroll/section";
import {
  ABOUT_CHAPTERS,
  ORBIT_PROJECT,
  PROJECTS,
  SCENE_LABELS,
  SKILL_CLUSTERS,
} from "@/constants";
import { willChange, clearWillChange } from "@/utils/performance";

interface SceneHostProps {
  ready: boolean;
}

/**
 * Five-act narrative host — showcase content, animation in scene factories.
 */
export function SceneHost({ ready }: SceneHostProps) {
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSubtitle = useRef<HTMLParagraphElement>(null);
  const heroLine = useRef<HTMLDivElement>(null);
  const heroCue = useRef<HTMLParagraphElement>(null);
  const heroMeta = useRef<HTMLParagraphElement>(null);

  const introRoot = useRef<HTMLDivElement>(null);
  const introAccent = useRef<HTMLParagraphElement>(null);
  const introLines = useRef<(HTMLParagraphElement | null)[]>([]);

  const skillsRoot = useRef<HTMLDivElement>(null);
  const skillClusters = useRef<(HTMLLIElement | null)[]>([]);
  const skillConnectors = useRef<(HTMLDivElement | null)[]>([]);

  const aboutRoot = useRef<HTMLDivElement>(null);
  const aboutChapters = useRef<(HTMLLIElement | null)[]>([]);

  const projectsRoot = useRef<HTMLDivElement>(null);
  const projectsHeading = useRef<HTMLDivElement>(null);
  const orbitRoot = useRef<HTMLElement | null>(null);
  const projectPanels = useRef<(HTMLElement | null)[]>([]);

  const proofRoot = useRef<HTMLDivElement>(null);
  const proofStats = useRef<(HTMLLIElement | null)[]>([]);

  const contactRoot = useRef<HTMLDivElement>(null);
  const heroSectionEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    heroSectionEl.current = heroEl;
    const unregisterHero = heroEl
      ? getScrollManager().registerSection("hero", heroEl)
      : undefined;

    const manager = getSceneManager();
    const disposers = [
      manager.register(
        createHeroScene(() => ({
          title: heroTitle.current,
          subtitle: heroSubtitle.current,
          line: heroLine.current,
          cue: heroCue.current,
          meta: heroMeta.current,
        })),
      ),
      manager.register(
        createIntroScene(() => ({
          root: introRoot.current,
          accent: introAccent.current,
          lines: introLines.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createSkillsScene(() => ({
          root: skillsRoot.current,
          clusters: skillClusters.current.filter(Boolean) as HTMLElement[],
          connectors: skillConnectors.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createAboutScene(() => ({
          root: aboutRoot.current,
          chapters: aboutChapters.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createProjectsScene(() => ({
          root: projectsRoot.current,
          heading: projectsHeading.current,
          orbit: orbitRoot.current,
          panels: projectPanels.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createProofScene(() => ({
          root: proofRoot.current,
          stats: proofStats.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createContactScene(() => ({ root: contactRoot.current })),
      ),
    ];

    const animated = [
      heroTitle.current,
      heroSubtitle.current,
      heroLine.current,
      heroCue.current,
      heroMeta.current,
      introRoot.current,
      skillsRoot.current,
      aboutRoot.current,
      projectsRoot.current,
      orbitRoot.current,
      proofRoot.current,
      contactRoot.current,
    ].filter(Boolean) as HTMLElement[];

    for (const el of animated) willChange(el);

    return () => {
      unregisterHero?.();
      for (const dispose of disposers) dispose();
      for (const el of animated) clearWillChange(el);
    };
  }, []);

  return (
    <>
      {/* ACT I — Introduction */}
      <HeroSection
        ready={ready}
        titleRef={heroTitle}
        subtitleRef={heroSubtitle}
        lineRef={heroLine}
        cueRef={heroCue}
        metaRef={heroMeta}
      />

      <Section
        id="intro"
        className="relative flex min-h-[110svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.intro}
      >
        <div ref={introRoot} className="max-w-4xl will-change-transform">
          <p
            ref={introAccent}
            className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase"

          >
            Act I · The interface
          </p>
          <div className="mt-8 space-y-5 md:space-y-7">
            {[
              "Every scroll movement changes something.",
              "Scenes own timelines. React stays out of the frame.",
              "Performance is not an afterthought — it is the product.",
            ].map((text, i) => (
              <p
                key={text}
                ref={(el) => {
                  introLines.current[i] = el;
                }}
                className="font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] will-change-transform"

              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* ACT II — Craft */}
      <Section
        id="skills"
        className="relative flex min-h-[120svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.skills}
      >
        <div ref={skillsRoot} className="w-full will-change-transform">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
            Act II · Craft
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.035em]">
            How I think in systems.
          </h2>

          <ul className="relative mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {SKILL_CLUSTERS.map((cluster, i) => (
              <li
                key={cluster.id}
                ref={(el) => {
                  skillClusters.current[i] = el;
                }}
                className="relative border-t border-[var(--border)] py-8 pr-6 will-change-transform md:min-h-[280px]"

              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--muted)]">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-4 text-3xl tracking-[-0.02em]">
                  {cluster.label}
                </h3>
                <ul className="mt-6 space-y-2.5 text-[var(--muted)]">
                  {cluster.skills.map((skill) => (
                    <li key={skill} className="text-base md:text-lg">
                      {skill}
                    </li>
                  ))}
                </ul>
                {i < SKILL_CLUSTERS.length - 1 ? (
                  <div
                    ref={(el) => {
                      skillConnectors.current[i] = el;
                    }}
                    className="pointer-events-none absolute top-8 right-0 hidden h-px w-8 origin-left bg-[var(--accent)] lg:block"

                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="about"
        className="relative flex min-h-[110svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.about}
      >
        <div ref={aboutRoot} className="w-full max-w-4xl will-change-transform">
          <p className="text-sm tracking-[0.3em] text-[var(--accent)] uppercase">
            Principles
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">
            Built for sixty frames.
          </h2>
          <ol className="mt-14 space-y-10">
            {ABOUT_CHAPTERS.map((chapter, i) => (
              <li
                key={chapter.year}
                ref={(el) => {
                  aboutChapters.current[i] = el;
                }}
                className="grid gap-4 border-t border-[var(--border)] pt-8 will-change-transform md:grid-cols-[80px_1fr]"

              >
                <span className="font-mono text-sm text-[var(--accent)]">
                  {chapter.year}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-lg text-[var(--muted)]">
                    {chapter.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ACT III — Projects */}
      <Section
        id="projects"
        className="relative px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.projects}
      >
        <div ref={projectsRoot} className="will-change-transform">
          <div
            ref={projectsHeading}
            className="flex min-h-[50svh] flex-col justify-end pb-16 pt-32"
          >
            <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
              Act III · Projects
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] tracking-[-0.04em]">
              Selected work
            </h2>
            <p className="mt-5 max-w-lg text-lg text-[var(--muted)]">
              Depth over quantity — one immersive case, then two focused studies.
            </p>
          </div>

          <OrbitProject ref={orbitRoot} project={ORBIT_PROJECT} />

          <div className="space-y-6 pb-24 pt-16 md:space-y-10">
            {PROJECTS.filter((p) => !p.immersive).map((project, i) => (
              <article
                key={project.id}
                ref={(el) => {
                  projectPanels.current[i] = el;
                }}
                className="relative min-h-[70svh] overflow-hidden border-t border-[var(--border)] py-16 will-change-transform md:py-20"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse 70% 60% at ${i === 0 ? "20%" : "85%"} 30%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)`,
                  }}
                />
                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted)] uppercase">
                  0{i + 2} · {project.role}
                </p>
                <h3 className="font-display mt-6 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] tracking-[-0.045em]">
                  {project.name}
                </h3>
                <p className="mt-6 max-w-xl text-xl text-[var(--muted)] md:text-2xl">
                  {project.tagline}
                </p>

                <div className="mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                      Problem
                    </p>
                    <p className="mt-3 text-[var(--foreground)]">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                      Approach
                    </p>
                    <p className="mt-3 text-[var(--foreground)]">
                      {project.approach}
                    </p>
                  </div>
                </div>

                <dl className="mt-14 flex flex-wrap gap-10">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                        {metric.label}
                      </dt>
                      <dd
                        className="font-display mt-2 text-4xl tracking-[-0.03em] text-[var(--accent)] md:text-5xl"
                        data-metric-value
                        data-metric-target={
                          "divisor" in metric && metric.divisor
                            ? metric.target / metric.divisor
                            : metric.target
                        }
                        data-metric-prefix={metric.prefix}
                        data-metric-suffix={metric.suffix}
                        data-metric-float={
                          "float" in metric && metric.float ? "true" : "false"
                        }                      >
                        {metric.display}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ACT IV — Proof */}
      <Section
        id="proof"
        className="flex min-h-[100svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.proof}
      >
        <div ref={proofRoot} className="w-full will-change-transform">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
            Act IV · Proof
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.035em]">
            Measurable impact.
          </h2>
          <ul className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              { label: "Target FPS", target: 120, suffix: "", display: "60–120" },
              { label: "LCP budget (ms)", target: 2000, suffix: "", display: "≤2000" },
              { label: "Scroll re-renders", target: 0, suffix: "", display: "0" },
            ].map((item, i) => (
              <li
                key={item.label}
                ref={(el) => {
                  proofStats.current[i] = el;
                }}
                className="border-t border-[var(--border)] pt-6 will-change-transform"

              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                  {item.label}
                </p>
                <p
                  className="font-display mt-3 text-5xl tracking-[-0.04em] text-[var(--accent)] md:text-6xl"
                  data-proof-value
                  data-proof-target={item.target}
                  data-proof-suffix={item.suffix}
                >
                  {item.display}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ACT V — Contact */}
      <Section
        id="contact"
        className="relative flex min-h-[100svh] items-end px-6 pb-24 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.contact}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 20% 80%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%), linear-gradient(180deg, transparent 0%, var(--background) 100%)",
          }}
        />
        <div ref={contactRoot} className="w-full will-change-transform">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
            Act V · Contact
          </p>
          <h2 className="font-display mt-4 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] tracking-[-0.045em]">
            Let&apos;s build
            <br />
            something alive.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Journey&apos;s end — reach out with a project, a role, or a question
            worth answering carefully.
          </p>
          <div className="mt-14">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
