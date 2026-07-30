"use client";

import { useEffect, useRef, useState } from "react";
import { getRafScheduler } from "@/engine/scheduler";

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generative wave field — isolated Canvas2D experiment.
 * Registers on shared RAF; unregisters on unmount.
 */
export function WaveFieldExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(0x1a2b3c4d);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = mulberry32(seed);
    const nodes = Array.from({ length: 28 }, () => ({
      x: rand(),
      y: rand(),
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 0.8,
      amp: 8 + rand() * 18,
    }));

    const id = getRafScheduler().register(
      (frame) => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(8, 12, 10, 0.92)";
        ctx.fillRect(0, 0, w, h);

        const t = frame.time / 1000;
        ctx.strokeStyle = "rgba(61, 255, 154, 0.35)";
        ctx.lineWidth = 1;

        for (let row = 0; row < 14; row += 1) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 8) {
            let y = (row / 13) * h;
            for (const n of nodes) {
              const dx = x / w - n.x;
              const dy = row / 13 - n.y;
              const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
              y += (Math.sin(t * n.speed + n.phase + d * 12) * n.amp) / (d * 8 + 1);
            }
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      },
      { priority: "normal", label: "playground-wave", id: "playground-wave" },
    );

    return () => {
      getRafScheduler().unregister(id);
      window.removeEventListener("resize", resize);
    };
  }, [seed]);

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `wave-field-${seed.toString(16)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="font-mono text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase">
          Seed
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
            className="ml-3 w-36 border border-[var(--border)] bg-transparent px-2 py-1 font-mono text-xs text-[var(--foreground)]"
          />
        </label>
        <button
          type="button"
          onClick={() => setSeed((s) => (s * 1664525 + 1013904223) >>> 0)}
          className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase transition-colors hover:border-[var(--accent)]"
        >
          Reseed
        </button>
        <button
          type="button"
          onClick={exportPng}
          className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Export PNG
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="min-h-[420px] w-full flex-1 border border-[var(--border)] bg-[var(--surface)]"
        aria-label="Generative wave field canvas"
      />
    </div>
  );
}
