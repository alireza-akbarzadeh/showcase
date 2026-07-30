"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getQualityGuardian } from "@/engine/performance";
import { getPointerState, retainPointerTracking } from "@/engine/observers";
import { useScroll } from "@/hooks/use-scroll";
import { damp } from "@/utils/math";
import type { ScrollSnapshot } from "@/types/scroll";

const PARTICLE_COUNT = 180;
const PARTICLE_COUNT_MED = 90;

/** Seeded once at module load — avoids impure render + ref-during-render. */
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  let seed = 0x1a2b3c4d;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    arr[i * 3] = (next() - 0.5) * 14;
    arr[i * 3 + 1] = (next() - 0.5) * 8;
    arr[i * 3 + 2] = (next() - 0.5) * 10 - 2;
  }
  return arr;
})();

/**
 * Act I world — grid plane, core mesh, sparse particles.
 * Motion via uniforms / transforms in useFrame — no React state.
 */
export function HeroField() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const grid = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);
  const scrollRef = useRef<ScrollSnapshot | null>(null);
  const material = useRef<THREE.ShaderMaterial | null>(null);
  const smoothed = useRef({ x: 0, y: 0 });

  useScroll((snapshot) => {
    scrollRef.current = snapshot;
  });

  useEffect(() => retainPointerTracking(), []);

  useFrame((state, delta) => {
    const g = group.current;
    const c = core.current;
    const r = ring.current;
    const gr = grid.current;
    const pts = particles.current;
    const s = scrollRef.current;
    if (!g || !c || !r) return;

    const quality = getQualityGuardian().getFlags();
    const progress = s?.progress ?? 0;
    const velocity = Math.min(Math.abs(s?.velocity ?? 0), 3);
    const heroProgress = Math.min(Math.max(progress / 0.16, 0), 1);
    const nearHero = progress < 0.28;
    const mobile = s?.breakpoint === "mobile";
    const t = state.clock.elapsedTime;
    const velocityFx = quality.simplifyShaders ? 0 : velocity;

    // Soft unload past Act I — keep in tree but dim / freeze cost
    const presence = nearHero ? 1 : Math.max(0, 1 - (progress - 0.28) / 0.12);
    g.visible = presence > 0.02;
    if (!g.visible) return;

    const pointer = getPointerState();
    smoothed.current.x = damp(smoothed.current.x, pointer.x, 5, delta);
    smoothed.current.y = damp(smoothed.current.y, pointer.y, 5, delta);
    const px = smoothed.current.x;
    const py = smoothed.current.y;

    g.position.x += (1.55 + px * 0.55 - g.position.x) * 0.06;
    g.position.y += (0.1 - py * 0.3 - g.position.y) * 0.06;
    g.rotation.y += delta * (0.07 + velocityFx * 0.035);
    g.scale.setScalar(0.92 + presence * 0.08);

    c.rotation.x = t * 0.18 + heroProgress * 0.85;
    c.rotation.y = t * 0.22 + px * 0.15;
    const scale = 1 + Math.sin(t * 0.7) * 0.03 + heroProgress * 0.4;
    c.scale.setScalar(scale);
    c.position.z = -heroProgress * 1.35;

    const coreMat = c.material;
    if (coreMat instanceof THREE.MeshStandardMaterial) {
      coreMat.emissiveIntensity = 0.4 + heroProgress * 0.55 + velocityFx * 0.08;
    }

    r.rotation.x = Math.PI / 2.2;
    r.rotation.z = t * 0.3 + heroProgress + px * 0.2;
    r.scale.setScalar(1.55 + heroProgress * 1.15);

    if (keyLight.current) {
      keyLight.current.intensity = (1.4 + heroProgress * 1.1) * presence;
      keyLight.current.position.set(2.2 + px * 0.8, 2 + py * 0.4, 3);
    }
    if (fillLight.current) {
      fillLight.current.intensity = (0.45 + heroProgress * 0.35) * presence;
      fillLight.current.position.set(-3 - px * 0.5, -1, 2);
    }

    if (gr && material.current) {
      const uniforms = material.current.uniforms;
      if (uniforms.uTime) uniforms.uTime.value = t;
      if (uniforms.uProgress) uniforms.uProgress.value = heroProgress;
      if (uniforms.uVelocity) uniforms.uVelocity.value = velocityFx;
      if (uniforms.uPointer) {
        (uniforms.uPointer.value as THREE.Vector2).set(px, py);
      }
      gr.rotation.x = -Math.PI / 2.4;
      gr.position.y = -2.2 + heroProgress * 0.45;
      material.current.opacity = presence;
    }

    if (pts) {
      pts.visible = !mobile && presence > 0.2 && quality.particles;
      if (pts.visible) {
        pts.rotation.y = t * 0.02 + px * 0.05;
        pts.position.y = -heroProgress * 0.55;
        const ptsMat = pts.material;
        if (ptsMat instanceof THREE.PointsMaterial) {
          ptsMat.opacity = 0.55 * presence;
        }
        const drawCount =
          quality.tier === "medium" ? PARTICLE_COUNT_MED : PARTICLE_COUNT;
        pts.geometry.setDrawRange(0, drawCount);
      }
    }
  });

  return (
    <group ref={group} position={[1.6, 0.15, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#3dff9a"
          emissive="#0a3d28"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.72}
          wireframe
        />
      </mesh>

      <mesh ref={ring}>
        <torusGeometry args={[1.45, 0.012, 8, 128]} />
        <meshBasicMaterial color="#3dff9a" transparent opacity={0.5} />
      </mesh>

      <mesh ref={grid} position={[0, -2.2, -1]}>
        <planeGeometry args={[18, 18, 48, 48]} />
        <shaderMaterial
          ref={material}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uVelocity: { value: 0 },
            uPointer: { value: new THREE.Vector2(0, 0) },
            uAccent: { value: new THREE.Color("#3dff9a") },
          }}
          vertexShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uProgress;
            uniform float uVelocity;
            uniform vec2 uPointer;
            void main() {
              vUv = uv;
              vec3 pos = position;
              float wave = sin(pos.x * 2.0 + uTime * 0.6) * 0.08;
              wave += sin(pos.y * 1.5 - uTime * 0.4) * 0.05;
              float cursor = exp(-length(uv - (uPointer * 0.5 + 0.5)) * 4.0);
              pos.z += wave * (0.4 + uProgress) + uVelocity * 0.04 + cursor * 0.22;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform vec3 uAccent;
            uniform float uProgress;
            uniform float uVelocity;
            void main() {
              float gridX = abs(fract(vUv.x * 24.0) - 0.5);
              float gridY = abs(fract(vUv.y * 24.0) - 0.5);
              float line = 1.0 - smoothstep(0.0, 0.04, min(gridX, gridY));
              float fade = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
              float pulse = 0.18 + uProgress * 0.35 + uVelocity * 0.04;
              float alpha = line * fade * pulse;
              gl_FragColor = vec4(uAccent, alpha);
            }
          `}
        />
      </mesh>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#3dff9a"
          size={0.035}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <pointLight
        ref={keyLight}
        position={[2.5, 2, 3]}
        intensity={1.8}
        color="#3dff9a"
      />
      <pointLight
        ref={fillLight}
        position={[-3, -1, 2]}
        intensity={0.6}
        color="#7ad4ff"
      />
    </group>
  );
}
