"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useScroll } from "@/hooks/use-scroll";
import type { ScrollSnapshot } from "@/types/scroll";

/**
 * Placeholder mesh that reacts to scroll via uniforms / transforms — not React state.
 */
export function ScrollMesh() {
  const mesh = useRef<Mesh>(null);
  const scrollRef = useRef<ScrollSnapshot | null>(null);

  useScroll((snapshot) => {
    scrollRef.current = snapshot;
  });

  const geometryArgs = useMemo(() => [1.2, 1] as [number, number], []);

  useFrame(() => {
    const m = mesh.current;
    const s = scrollRef.current;
    if (!m || !s) return;
    m.rotation.x = s.progress * Math.PI * 0.5;
    m.rotation.y = s.progress * Math.PI;
    m.position.y = Math.sin(s.progress * Math.PI) * 0.35;
    const scale = 1 + s.progress * 0.25;
    m.scale.setScalar(scale);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={geometryArgs} />
      <meshStandardMaterial
        color="#3dff9a"
        roughness={0.25}
        metalness={0.55}
        wireframe
      />
    </mesh>
  );
}
