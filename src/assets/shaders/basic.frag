precision highp float;

uniform float uProgress;
uniform float uTime;
uniform vec3 uAccent;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float wave = sin(uv.x * 6.28318 + uTime * 0.4 + uProgress * 3.14159) * 0.5 + 0.5;
  vec3 color = mix(vec3(0.04, 0.05, 0.06), uAccent, wave * uProgress);
  gl_FragColor = vec4(color, 1.0);
}
