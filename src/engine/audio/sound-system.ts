const STORAGE_KEY = "showcase:sound-enabled";

export type SoundCue = "tick" | "whoosh" | "success" | "unlock";

/**
 * Procedural Web Audio — no sprite assets.
 * Muted by default; requires user gesture to unlock.
 */
export class SoundSystem {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private enabled = false;
  private unlocked = false;
  private readonly listeners = new Set<(enabled: boolean) => void>();

  constructor() {
    if (typeof window === "undefined") return;
    try {
      this.enabled = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      this.enabled = false;
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.enabled);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async setEnabled(enabled: boolean): Promise<void> {
    this.enabled = enabled;
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {
      // ignore quota / private mode
    }
    for (const listener of this.listeners) listener(enabled);

    if (enabled) {
      await this.unlock();
      this.play("tick");
    } else {
      this.suspend();
    }
  }

  async toggle(): Promise<boolean> {
    await this.setEnabled(!this.enabled);
    return this.enabled;
  }

  play(cue: SoundCue): void {
    if (!this.enabled || typeof window === "undefined") return;
    if (document.visibilityState === "hidden") return;
    void this.unlock().then(() => this.fire(cue));
  }

  destroy(): void {
    this.listeners.clear();
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
  }

  private async unlock(): Promise<void> {
    if (this.unlocked && this.ctx) {
      if (this.ctx.state === "suspended") await this.ctx.resume();
      return;
    }
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.18;
    this.master.connect(this.ctx.destination);
    this.unlocked = true;
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  private suspend(): void {
    void this.ctx?.suspend();
  }

  private fire(cue: SoundCue): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(master);

    switch (cue) {
      case "tick":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.06);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.35, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      case "whoosh":
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.22, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.32);
        break;
      case "success":
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.28, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.42);
        break;
      case "unlock":
        osc.type = "square";
        osc.frequency.setValueAtTime(196, now);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.35);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.48);
        break;
      default: {
        const _exhaustive: never = cue;
        void _exhaustive;
      }
    }
  }
}

let singleton: SoundSystem | null = null;

export function getSoundSystem(): SoundSystem {
  if (!singleton) singleton = new SoundSystem();
  return singleton;
}

export function resetSoundSystem(): void {
  singleton?.destroy();
  singleton = null;
}
