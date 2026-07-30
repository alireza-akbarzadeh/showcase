"use client";

import { useEffect, useState } from "react";
import { getAssetLoader } from "@/engine/assets";
import type { AssetDescriptor, LoadedAsset } from "@/types/assets";

export function useAsset<T = unknown>(
  descriptor: AssetDescriptor<T> | null,
): LoadedAsset<T> | null {
  const [asset, setAsset] = useState<LoadedAsset<T> | null>(null);
  const activeId = descriptor?.id ?? null;

  useEffect(() => {
    if (!descriptor) return;

    let cancelled = false;
    const loader = getAssetLoader();
    const id = descriptor.id;

    void loader.load(descriptor).then((loaded) => {
      if (!cancelled) setAsset(loaded);
    });

    return () => {
      cancelled = true;
      loader.unload(id);
    };
  }, [descriptor]);

  if (activeId === null) return null;
  if (asset?.id !== activeId) return null;
  return asset;
}
