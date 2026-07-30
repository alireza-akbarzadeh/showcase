export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0;
  return clamp((value - a) / (b - a), 0, 1);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

/** Frame-rate independent damp (exp smoothing). */
export function damp(
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number,
): number {
  return lerp(current, target, 1 - Math.exp(-lambda * deltaSeconds));
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function approx(
  a: number,
  b: number,
  epsilon = 0.0001,
): boolean {
  return Math.abs(a - b) < epsilon;
}
