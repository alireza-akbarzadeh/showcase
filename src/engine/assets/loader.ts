import type {
  AssetDescriptor,
  AssetLoaderApi,
  AssetStatus,
  LoadedAsset,
} from "@/types/assets";

type InternalAsset = LoadedAsset & { refCount: number };

async function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

async function loadVideoElement(src: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.onloadeddata = () => resolve(video);
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    video.src = src;
  });
}

async function loadFontFace(src: string, family: string): Promise<FontFace> {
  const face = new FontFace(family, `url(${src})`);
  await face.load();
  document.fonts.add(face);
  return face;
}

/**
 * Central asset registry with lazy load / unload / prefetch.
 * Heavy scenes should unload on leave to keep memory bounded.
 */
export class AssetLoader implements AssetLoaderApi {
  private readonly assets = new Map<string, InternalAsset>();
  private readonly inflight = new Map<string, Promise<LoadedAsset>>();

  async load<T = unknown>(
    descriptor: AssetDescriptor<T>,
  ): Promise<LoadedAsset<T>> {
    const existing = this.assets.get(descriptor.id);
    if (existing && existing.status === "ready") {
      existing.refCount += 1;
      return existing as LoadedAsset<T>;
    }

    const pending = this.inflight.get(descriptor.id);
    if (pending) {
      return pending as Promise<LoadedAsset<T>>;
    }

    const promise = this.loadInternal(descriptor);
    this.inflight.set(descriptor.id, promise);

    try {
      return (await promise) as LoadedAsset<T>;
    } finally {
      this.inflight.delete(descriptor.id);
    }
  }

  async prefetch(descriptors: readonly AssetDescriptor[]): Promise<void> {
    const run = async () => {
      await Promise.all(descriptors.map((d) => this.load(d)));
    };

    if (typeof requestIdleCallback !== "undefined") {
      await new Promise<void>((resolve) => {
        requestIdleCallback(
          () => {
            void run().then(resolve);
          },
          { timeout: 2000 },
        );
      });
      return;
    }

    await run();
  }

  get<T = unknown>(id: string): LoadedAsset<T> | undefined {
    return this.assets.get(id) as LoadedAsset<T> | undefined;
  }

  isReady(id: string): boolean {
    return this.assets.get(id)?.status === "ready";
  }

  unload(id: string): void {
    const asset = this.assets.get(id);
    if (!asset) return;

    asset.refCount = Math.max(asset.refCount - 1, 0);
    if (asset.refCount > 0) return;

    this.dispose(asset);
    this.assets.set(id, {
      ...asset,
      status: "unloaded",
      data: null,
      refCount: 0,
    });
  }

  unloadAll(predicate?: (asset: LoadedAsset) => boolean): void {
    for (const [id, asset] of this.assets) {
      if (!predicate || predicate(asset)) {
        this.dispose(asset);
        this.assets.set(id, {
          ...asset,
          status: "unloaded",
          data: null,
          refCount: 0,
        });
      }
    }
  }

  destroy(): void {
    this.unloadAll();
    this.assets.clear();
    this.inflight.clear();
  }

  private async loadInternal(
    descriptor: AssetDescriptor,
  ): Promise<LoadedAsset> {
    const placeholder: InternalAsset = {
      id: descriptor.id,
      kind: descriptor.kind,
      status: "loading",
      data: null,
      error: null,
      refCount: 1,
    };
    this.assets.set(descriptor.id, placeholder);

    try {
      const data = await this.fetchByKind(descriptor);
      const ready: InternalAsset = {
        id: descriptor.id,
        kind: descriptor.kind,
        status: "ready",
        data,
        error: null,
        loadedAt: performance.now(),
        refCount: 1,
      };
      this.assets.set(descriptor.id, ready);
      return ready;
    } catch (error) {
      const failed: InternalAsset = {
        id: descriptor.id,
        kind: descriptor.kind,
        status: "error",
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
        refCount: 0,
      };
      this.assets.set(descriptor.id, failed);
      return failed;
    }
  }

  private async fetchByKind(descriptor: AssetDescriptor): Promise<unknown> {
    switch (descriptor.kind) {
      case "image":
      case "texture":
        return loadImageElement(descriptor.src);
      case "video":
        return loadVideoElement(descriptor.src);
      case "font": {
        const family =
          typeof descriptor.meta?.family === "string"
            ? descriptor.meta.family
            : descriptor.id;
        return loadFontFace(descriptor.src, family);
      }
      case "model": {
        const response = await fetch(descriptor.src);
        if (!response.ok) {
          throw new Error(`Failed to load model: ${descriptor.src}`);
        }
        return response.arrayBuffer();
      }
      case "shader": {
        const response = await fetch(descriptor.src);
        if (!response.ok) {
          throw new Error(`Failed to load shader: ${descriptor.src}`);
        }
        return response.text();
      }
      default: {
        const _exhaustive: never = descriptor.kind;
        throw new Error(`Unknown asset kind: ${_exhaustive}`);
      }
    }
  }

  private dispose(asset: InternalAsset): void {
    const data = asset.data;
    if (!data) return;

    if (data instanceof HTMLVideoElement) {
      data.pause();
      data.removeAttribute("src");
      data.load();
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "dispose" in data &&
      typeof (data as { dispose: unknown }).dispose === "function"
    ) {
      (data as { dispose: () => void }).dispose();
    }
  }
}

let assetSingleton: AssetLoader | null = null;

export function getAssetLoader(): AssetLoader {
  if (!assetSingleton) {
    assetSingleton = new AssetLoader();
  }
  return assetSingleton;
}

export function resetAssetLoader(): void {
  assetSingleton?.destroy();
  assetSingleton = null;
}

export function createAssetStatus(
  status: AssetStatus,
): Pick<LoadedAsset, "status"> {
  return { status };
}
