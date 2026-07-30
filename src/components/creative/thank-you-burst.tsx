"use client";

import { useEffect, useRef } from "react";
import { getQualityGuardian } from "@/engine/performance";
import { getRafScheduler } from "@/engine/scheduler";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
}

/**
 * Tasteful thank-you burst — hard-capped, High quality only, reduced-motion off.
 */
export function ThankYouBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    if (getQualityGuardian().getTier() !== "high") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const particles: Particle[] = [];
    const count = 120;
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.2;
      particles.push({
        x: w * 0.35,
        y: h * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 0.7 + Math.random() * 0.8,
        hue: 140 + Math.random() * 40,
      });
    }

    let elapsed = 0;
    const id = getRafScheduler().register(
      (frame) => {
        elapsed += frame.delta;
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.vy += 0.04;
          p.x += p.vx;
          p.y += p.vy;
          p.life -= frame.deltaSeconds;
          if (p.life <= 0) continue;
          ctx.globalAlpha = Math.min(1, p.life);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 62%, 1)`;
          ctx.fillRect(p.x, p.y, 3, 3);
        }
        ctx.globalAlpha = 1;
        if (elapsed > 1500) {
          getRafScheduler().unregister(id);
          ctx.clearRect(0, 0, w, h);
        }
      },
      { priority: "low", label: "thank-burst", id: "thank-burst" },
    );

    return () => {
      getRafScheduler().unregister(id);
    };
  }, [active, reduced]);

  if (!active || reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
