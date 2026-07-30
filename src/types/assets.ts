export type AssetKind = "texture" | "model" | "font" | "video" | "image" | "shader";

export type AssetStatus = "idle" | "loading" | "ready" | "error" | "unloaded";

export interface AssetDescriptor<T = unknown> {
  readonly id: string;
  readonly kind: AssetKind;
  readonly src: string;
  readonly priority?: "critical" | "high" | "normal" | "low";
  readonly prefetch?: boolean;
  readonly meta?: Record<string, string | number | boolean>;
  /** Phantom type for inference only — never set at runtime. */
  readonly _brand?: T;
}

export interface LoadedAsset<T = unknown> {
  readonly id: string;
  readonly kind: AssetKind;
  readonly status: AssetStatus;
  readonly data: T | null;
  readonly error: Error | null;
  readonly bytes?: number;
  readonly loadedAt?: number;
}

export interface AssetLoaderApi {
  load: <T = unknown>(descriptor: AssetDescriptor<T>) => Promise<LoadedAsset<T>>;
  prefetch: (descriptors: readonly AssetDescriptor[]) => Promise<void>;
  get: <T = unknown>(id: string) => LoadedAsset<T> | undefined;
  unload: (id: string) => void;
  unloadAll: (predicate?: (asset: LoadedAsset) => boolean) => void;
  isReady: (id: string) => boolean;
  destroy: () => void;
}

export type ThemeMode = "dark" | "light" | "system";

export interface ThemeTokens {
  readonly background: string;
  readonly foreground: string;
  readonly muted: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly border: string;
  readonly ring: string;
  readonly surface: string;
  readonly surfaceElevated: string;
}
