import { damp } from "@/utils/math";

export interface CameraState {
  x: number;
  y: number;
  z: number;
  lookX: number;
  lookY: number;
  lookZ: number;
  fov: number;
}

export function createCameraState(
  overrides: Partial<CameraState> = {},
): CameraState {
  return {
    x: 0,
    y: 0,
    z: 5,
    lookX: 0,
    lookY: 0,
    lookZ: 0,
    fov: 45,
    ...overrides,
  };
}

/** Smooth camera toward a target — call from RAF, not React. */
export function dampCamera(
  current: CameraState,
  target: CameraState,
  lambda: number,
  deltaSeconds: number,
): CameraState {
  return {
    x: damp(current.x, target.x, lambda, deltaSeconds),
    y: damp(current.y, target.y, lambda, deltaSeconds),
    z: damp(current.z, target.z, lambda, deltaSeconds),
    lookX: damp(current.lookX, target.lookX, lambda, deltaSeconds),
    lookY: damp(current.lookY, target.lookY, lambda, deltaSeconds),
    lookZ: damp(current.lookZ, target.lookZ, lambda, deltaSeconds),
    fov: damp(current.fov, target.fov, lambda, deltaSeconds),
  };
}
