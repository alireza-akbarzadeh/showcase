/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from "vitest";
import axe from "axe-core";
import { SITE } from "@/constants";

afterEach(() => {
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("lang");
});

async function runAxe(html: string) {
  document.documentElement.lang = "en";
  document.title = `${SITE.name} · a11y smoke`;
  document.body.innerHTML = html;
  const results = await axe.run(document, {
    rules: {
      // jsdom lacks full layout / color computation
      "color-contrast": { enabled: false },
      "link-in-text-block": { enabled: false },
    },
  });
  return results.violations;
}

describe("a11y smoke (axe)", () => {
  it("shell landmarks pass axe", async () => {
    const violations = await runAxe(`
      <a href="#main">Skip to content</a>
      <header>
        <nav aria-label="Primary">
          <ul>
            <li><a href="#hero">Intro</a></li>
            <li><a href="/playground">Lab</a></li>
          </ul>
        </nav>
      </header>
      <main id="main" tabindex="-1">
        <section id="hero" aria-label="Hero">
          <h1>${SITE.name}</h1>
          <p>I build software differently.</p>
        </section>
      </main>
      <footer>
        <p>© ${SITE.name}</p>
        <a href="/privacy">Privacy</a>
      </footer>
    `);
    expect(violations).toEqual([]);
  });

  it("privacy page structure passes axe", async () => {
    const violations = await runAxe(`
      <main>
        <p>Legal</p>
        <h1>Privacy</h1>
        <p>Contact submissions are used only to reply.</p>
        <p>
          Analytics are optional.
          <code>NEXT_PUBLIC_PLAUSIBLE_DOMAIN</code>
        </p>
        <a href="/">Back to the story</a>
      </main>
    `);
    expect(violations).toEqual([]);
  });

  it("resume page structure passes axe", async () => {
    const violations = await runAxe(`
      <main>
        <h1>${SITE.author}</h1>
        <p>Creative Frontend Engineer</p>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <section aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          <article>
            <h3>Role</h3>
            <p>Description</p>
          </article>
        </section>
        <a href="/">Home</a>
      </main>
    `);
    expect(violations).toEqual([]);
  });
});
