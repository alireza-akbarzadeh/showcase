"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import { useRaf } from "@/hooks/use-raf";
import { useScroll } from "@/hooks/use-scroll";
import { createCameraState, dampCamera } from "@/engine/render";
import type { CameraState } from "@/engine/render";
import type { ScrollSnapshot } from "@/types/scroll";

/**
 * Camera driven by scroll outside React render cycle.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const current = useRef<CameraState>(createCameraState());
  const target = useRef<CameraState>(createCameraState({ z: 5, y: 0 }));
  const scrollRef = useRef<ScrollSnapshot | null>(null);

  useScroll((snapshot) => {
    scrollRef.current = snapshot;
    const p = snapshot.progress;
    target.current = createCameraState({
      x: Math.sin(p * Math.PI * 2) * 0.35,
      y: p * -0.5,
      z: 5 - p * 0.8,
      lookY: p * -0.2,
      fov: 45 + p * 5,
    });
  });

  useRaf(
    (frame) => {
      current.current = dampCamera(
        current.current,
        target.current,
        4,
        frame.deltaSeconds,
      );
      const c = current.current;
      camera.position.set(c.x, c.y, c.z);
      camera.lookAt(c.lookX, c.lookY, c.lookZ);
      if (camera.isPerspectiveCamera) {
        camera.fov = c.fov;
        camera.updateProjectionMatrix();
      }
    },
    { priority: "high", label: "camera-rig" },
  );

  return null;
}
