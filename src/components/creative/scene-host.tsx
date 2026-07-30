"use client";

import { useEffect, useRef } from "react";
import { getSceneManager } from "@/engine/animation";
import { createHeroScene } from "@/components/creative/scenes/hero-scene";
import { createIntroScene } from "@/components/creative/scenes/intro-scene";
import { createProjectsScene } from "@/components/creative/scenes/projects-scene";
import { createAboutScene } from "@/components/creative/scenes/about-scene";
import { createSkillsScene } from "@/components/creative/scenes/skills-scene";
import { createContactScene } from "@/components/creative/scenes/contact-scene";
import { Section } from "@/components/scroll/section";
import { SCENE_LABELS } from "@/constants";
import { willChange, clearWillChange } from "@/utils/performance";

/**
 * Scene host — wires DOM sections to the SceneManager.
 * Animation logic lives in scene factories, never in the page.
 */
export function SceneHost() {
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSubtitle = useRef<HTMLParagraphElement>(null);
  const introRoot = useRef<HTMLDivElement>(null);
  const projectsRoot = useRef<HTMLDivElement>(null);
  const aboutRoot = useRef<HTMLDivElement>(null);
  const skillsRoot = useRef<HTMLDivElement>(null);
  const contactRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const manager = getSceneManager();
    const disposers = [
      manager.register(
        createHeroScene(() => ({
          title: heroTitle.current,
          subtitle: heroSubtitle.current,
        })),
      ),
      manager.register(
        createIntroScene(() => ({ root: introRoot.current })),
      ),
      manager.register(
        createProjectsScene(() => ({ root: projectsRoot.current })),
      ),
      manager.register(
        createAboutScene(() => ({ root: aboutRoot.current })),
      ),
      manager.register(
        createSkillsScene(() => ({ root: skillsRoot.current })),
      ),
      manager.register(
        createContactScene(() => ({ root: contactRoot.current })),
      ),
    ];

    const animated = [
      heroTitle.current,
      heroSubtitle.current,
      introRoot.current,
      projectsRoot.current,
      aboutRoot.current,
      skillsRoot.current,
      contactRoot.current,
    ].filter(Boolean) as HTMLElement[];

    for (const el of animated) willChange(el);

    return () => {
      for (const dispose of disposers) dispose();
      for (const el of animated) clearWillChange(el);
    };
  }, []);

  return (
    <>
      <Section
        id="hero"
        className="flex min-h-[100svh] flex-col justify-end px-6 pb-24 pt-32 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.hero}
      >
        <h1
          ref={heroTitle}
          className="font-display max-w-5xl text-[clamp(3rem,12vw,9rem)] leading-[0.9] tracking-[-0.04em] text-[var(--foreground)] will-change-transform"
        >
          Showcase
        </h1>
        <p
          ref={heroSubtitle}
          className="mt-6 max-w-md text-lg text-[var(--muted)] will-change-transform md:text-xl"
        >
          A continuous scroll-driven experience. One animation. Infinite
          presence.
        </p>
      </Section>

      <Section
        id="intro"
        className="flex min-h-[100svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.intro}
      >
        <div ref={introRoot} className="max-w-3xl will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Intro
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
            Scroll is the interface.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Every section is a scene. Camera, shaders, and typography react to
            velocity and progress — never to React re-renders.
          </p>
        </div>
      </Section>

      <Section
        id="projects"
        className="flex min-h-[120svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.projects}
      >
        <div ref={projectsRoot} className="w-full will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Projects
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
            Selected work
          </h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {["Orbit", "Pulse", "Lattice", "North"].map((name) => (
              <li key={name} className="border-t border-[var(--border)] pt-6">
                <h3 className="font-display text-3xl tracking-[-0.02em]">
                  {name}
                </h3>
                <p className="mt-2 text-[var(--muted)]">
                  Placeholder case study — wire real content later.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="about"
        className="flex min-h-[100svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.about}
      >
        <div ref={aboutRoot} className="max-w-2xl will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            About
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
            Built for sixty frames.
          </h2>
          <p className="mt-6 text-lg text-[var(--muted)]">
            Architecture first: RAF scheduler, scroll manager, timeline engine,
            asset loader. Creative layers plug in without rewriting the core.
          </p>
        </div>
      </Section>

      <Section
        id="skills"
        className="flex min-h-[100svh] items-center px-6 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.skills}
      >
        <div ref={skillsRoot} className="w-full will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Skills
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
            Stack
          </h2>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-xl text-[var(--muted)]">
            {[
              "Next.js",
              "GSAP",
              "Lenis",
              "Three.js",
              "R3F",
              "Shaders",
              "TypeScript",
            ].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="contact"
        className="flex min-h-[100svh] items-end px-6 pb-24 md:px-12 lg:px-20"
        aria-label={SCENE_LABELS.contact}
      >
        <div ref={contactRoot} className="will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Contact
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.04em]">
            Let&apos;s build
            <br />
            something alive.
          </h2>
          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex text-lg text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            hello@example.com
          </a>
        </div>
      </Section>
    </>
  );
}
