/**
 * Shared normalized pointer (-1…1). One listener for DOM + WebGL consumers.
 * No React — read from RAF / useFrame.
 */

export interface PointerState {
  x: number;
  y: number;
  /** True after first move on a fine pointer. */
  active: boolean;
}

const state: PointerState = { x: 0, y: 0, active: false };

let attached = false;
let refCount = 0;

function onPointerMove(event: PointerEvent): void {
  if (event.pointerType === "touch") return;
  state.x = (event.clientX / window.innerWidth) * 2 - 1;
  state.y = (event.clientY / window.innerHeight) * 2 - 1;
  state.active = true;
}

export function getPointerState(): Readonly<PointerState> {
  return state;
}

/** Retain the shared window listener while any consumer is mounted. */
export function retainPointerTracking(): () => void {
  refCount += 1;
  if (!attached && typeof window !== "undefined") {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    attached = true;
  }
  return () => {
    refCount = Math.max(0, refCount - 1);
    if (refCount === 0 && attached) {
      window.removeEventListener("pointermove", onPointerMove);
      attached = false;
      state.x = 0;
      state.y = 0;
      state.active = false;
    }
  };
}
