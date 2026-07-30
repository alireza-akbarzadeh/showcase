"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * GSAP + ScrollTrigger registration — call once on the client.
 * Scroll-driven motion still prefers the custom ScrollManager + Timeline;
 * use ScrollTrigger only when GSAP timelines need pin/scrub helpers.
 */
export function ensureGsap(): typeof gsap {
  if (typeof window === "undefined") return gsap;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
