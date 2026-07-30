import { linear, type EasingFn } from "@/engine/animation/easings";
import type {
  TimelineDefinition,
  TimelineInstance,
  TimelineKeyframe,
  TimelineTrack,
} from "@/types/scene";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleTrack(track: TimelineTrack, progress: number): number {
  const frames = track.keyframes;
  if (frames.length === 0) return 0;
  if (frames.length === 1) return frames[0]!.value;

  const p = Math.min(Math.max(progress, 0), 1);

  if (p <= frames[0]!.at) return frames[0]!.value;
  if (p >= frames[frames.length - 1]!.at) return frames[frames.length - 1]!.value;

  let i = 0;
  while (i < frames.length - 1 && frames[i + 1]!.at < p) {
    i += 1;
  }

  const a = frames[i]!;
  const b = frames[i + 1]!;
  const span = Math.max(b.at - a.at, Number.EPSILON);
  const local = (p - a.at) / span;
  const ease: EasingFn = b.ease ?? a.ease ?? linear;
  const t = ease(local);

  if (track.interpolate) {
    return track.interpolate(a.value, b.value, t);
  }
  return lerp(a.value, b.value, t);
}

/**
 * Scene-local timeline. Drive with normalized progress (0–1).
 * No giant switch statements — each track samples independently.
 */
export class Timeline implements TimelineInstance {
  readonly id: string;
  private readonly tracks: readonly TimelineTrack[];
  private readonly values = new Map<string, number>();

  constructor(definition: TimelineDefinition) {
    this.id = definition.id;
    this.tracks = definition.tracks;
    for (const track of this.tracks) {
      this.values.set(track.id, sampleTrack(track, 0));
    }
  }

  setProgress(progress: number): ReadonlyMap<string, number> {
    for (const track of this.tracks) {
      this.values.set(track.id, sampleTrack(track, progress));
    }
    return this.values;
  }

  getValue(trackId: string): number {
    return this.values.get(trackId) ?? 0;
  }

  destroy(): void {
    this.values.clear();
  }
}

export function createTimeline(definition: TimelineDefinition): Timeline {
  return new Timeline(definition);
}

export function keyframes(
  ...pairs: Array<[at: number, value: number, ease?: EasingFn]>
): TimelineKeyframe[] {
  return pairs.map(([at, value, ease]) => ({ at, value, ease }));
}
