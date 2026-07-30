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
import { ImmersiveProject } from "@/components/creative/sections/immersive-project";
import { ProofSection } from "@/components/creative/sections/proof-section";
import { SkillsSection } from "@/components/creative/sections/skills-section";
import { AboutSection } from "@/components/creative/sections/about-section";
import { ContactForm } from "@/components/creative/contact-form";
import { Section } from "@/components/scroll/section";
import { PROJECTS, SCENE_LABELS } from "@/constants";
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
  const skillClusters = useRef<(HTMLElement | null)[]>([]);
  const skillConnectors = useRef<(HTMLElement | null)[]>([]);
  const skillsGraph = useRef<HTMLDivElement>(null);
  const skillsStack = useRef<HTMLUListElement>(null);

  const aboutRoot = useRef<HTMLDivElement>(null);
  const aboutChapters = useRef<(HTMLElement | null)[]>([]);
  const aboutCareer = useRef<HTMLDivElement | null>(null);

  const projectsRoot = useRef<HTMLDivElement>(null);
  const projectsHeading = useRef<HTMLDivElement>(null);
  const immersiveRoots = useRef<(HTMLElement | null)[]>([]);

  const proofRoot = useRef<HTMLDivElement>(null);
  const proofStats = useRef<(HTMLElement | null)[]>([]);
  const proofComparisons = useRef<(HTMLElement | null)[]>([]);
  const proofEvidence = useRef<HTMLDivElement | null>(null);

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
          graph: skillsGraph.current,
          stack: skillsStack.current,
          detail:
            skillsRoot.current?.querySelector<HTMLElement>("[data-skills-detail]") ??
            null,
        })),
      ),
      manager.register(
        createAboutScene(() => ({
          root: aboutRoot.current,
          chapters: aboutChapters.current.filter(Boolean) as HTMLElement[],
          career: aboutCareer.current,
          careerTrack:
            aboutCareer.current?.querySelector<HTMLElement>(
              "[data-about-career-track]",
            ) ?? null,
        })),
      ),
      manager.register(
        createProjectsScene(() => ({
          root: projectsRoot.current,
          heading: projectsHeading.current,
          immersives: immersiveRoots.current.filter(Boolean) as HTMLElement[],
        })),
      ),
      manager.register(
        createProofScene(() => ({
          root: proofRoot.current,
          stats: proofStats.current.filter(Boolean) as HTMLElement[],
          comparisons: proofComparisons.current.filter(Boolean) as HTMLElement[],
          evidence: proofEvidence.current,
          closing:
            proofRoot.current?.querySelector<HTMLElement>("[data-proof-closing]") ??
            null,
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
        className="relative flex min-h-[160svh] items-center px-6 py-24 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.skills}
      >
        <SkillsSection
          rootRef={skillsRoot}
          clustersRef={skillClusters}
          connectorsRef={skillConnectors}
          graphRef={skillsGraph}
          stackRef={skillsStack}
        />
      </Section>

      <Section
        id="about"
        className="relative flex min-h-[130svh] items-center px-6 py-24 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.about}
      >
        <AboutSection
          rootRef={aboutRoot}
          chaptersRef={aboutChapters}
          careerRef={aboutCareer}
        />
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
              Depth over quantity — three immersive case studies, scrubbed by scroll.
            </p>
          </div>

          <div className="pb-24">
            {PROJECTS.map((project, i) => (
              <ImmersiveProject
                key={project.id}
                project={project}
                index={i}
                ref={(el) => {
                  immersiveRoots.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ACT IV — Proof */}
      <Section
        id="proof"
        className="relative flex min-h-[120svh] items-center px-6 py-24 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.proof}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 80% 20%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)",
          }}
        />
        <ProofSection
          ref={proofRoot}
          statsRef={proofStats}
          comparisonsRef={proofComparisons}
          evidenceRef={proofEvidence}
        />
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
