"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@/hooks/use-scroll";
import type { ScrollSnapshot } from "@/types/scroll";

const PARTICLE_COUNT = 180;

/**
 * Act I world — grid plane, core mesh, sparse particles.
 * All motion via uniforms / transforms in useFrame — no React state.
 */
export function HeroField() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const grid = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);
  const scrollRef = useRef<ScrollSnapshot | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const material = useRef<THREE.ShaderMaterial | null>(null);

  const particlePositions = useRef<Float32Array | null>(null);
  if (!particlePositions.current) {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particlePositions.current = arr;
  }

  useScroll((snapshot) => {
    scrollRef.current = snapshot;
  });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    const c = core.current;
    const r = ring.current;
    const gr = grid.current;
    const pts = particles.current;
    const s = scrollRef.current;
    if (!g || !c || !r) return;

    const progress = s?.progress ?? 0;
    const velocity = Math.min(Math.abs(s?.velocity ?? 0), 3);
    const heroProgress = Math.min(Math.max(progress / 0.16, 0), 1);
    const t = state.clock.elapsedTime;

    g.position.x += (pointer.current.x * 0.45 - g.position.x) * 0.05;
    g.position.y += (-pointer.current.y * 0.25 - g.position.y) * 0.05;
    g.rotation.y += delta * (0.08 + velocity * 0.04);

    c.rotation.x = t * 0.18 + heroProgress * 0.8;
    c.rotation.y = t * 0.22;
    const scale = 1 + Math.sin(t * 0.7) * 0.03 + heroProgress * 0.35;
    c.scale.setScalar(scale);
    c.position.z = -heroProgress * 1.2;

    r.rotation.x = Math.PI / 2.2;
    r.rotation.z = t * 0.3 + heroProgress;
    r.scale.setScalar(1.55 + heroProgress * 1.1);

    if (gr && material.current) {
      const uniforms = material.current.uniforms;
      if (uniforms.uTime) uniforms.uTime.value = t;
      if (uniforms.uProgress) uniforms.uProgress.value = heroProgress;
      if (uniforms.uVelocity) uniforms.uVelocity.value = velocity;
      gr.rotation.x = -Math.PI / 2.4;
      gr.position.y = -2.2 + heroProgress * 0.4;
    }

    if (pts) {
      pts.rotation.y = t * 0.02;
      pts.position.y = -heroProgress * 0.5;
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
            uAccent: { value: new THREE.Color("#3dff9a") },
          }}
          vertexShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uProgress;
            uniform float uVelocity;
            void main() {
              vUv = uv;
              vec3 pos = position;
              float wave = sin(pos.x * 2.0 + uTime * 0.6) * 0.08;
              wave += sin(pos.y * 1.5 - uTime * 0.4) * 0.05;
              pos.z += wave * (0.4 + uProgress) + uVelocity * 0.03;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform vec3 uAccent;
            uniform float uProgress;
            void main() {
              float gridX = abs(fract(vUv.x * 24.0) - 0.5);
              float gridY = abs(fract(vUv.y * 24.0) - 0.5);
              float line = 1.0 - smoothstep(0.0, 0.04, min(gridX, gridY));
              float fade = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
              float alpha = line * fade * (0.18 + uProgress * 0.35);
              gl_FragColor = vec4(uAccent, alpha);
            }
          `}
        />
      </mesh>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.current, 3]}
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

      <pointLight position={[2.5, 2, 3]} intensity={1.8} color="#3dff9a" />
      <pointLight position={[-3, -1, 2]} intensity={0.6} color="#7ad4ff" />
    </group>
  );
}
