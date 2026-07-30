"use client";

import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Noise opacity={0.025} />
      <Vignette offset={0.25} darkness={0.55} />
    </EffectComposer>
  );
}
