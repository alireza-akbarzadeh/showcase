"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import type { RendererConfig } from "@/engine/render";
import { CameraRig } from "@/components/canvas/camera-rig";
import { PostFX } from "@/components/canvas/post-fx";

export function R3FCanvas({
  children,
  config,
  postFx = true,
  onReady,
}: {
  children?: ReactNode;
  config: RendererConfig;
  postFx?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={config.dpr}
      gl={{
        antialias: config.antialias,
        alpha: config.alpha,
        powerPreference: config.powerPreference,
      }}
      flat={config.flat}
      linear={config.linear}
      eventSource={
        typeof document !== "undefined" ? document.documentElement : undefined
      }
      eventPrefix="client"
      onCreated={() => onReady?.()}
      style={{ width: "100%", height: "100%" }}
    >
      <CameraRig />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} />
      {children}
      {postFx ? <PostFX /> : null}
    </Canvas>
  );
}
