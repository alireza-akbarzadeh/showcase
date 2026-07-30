"use client";

import { useEffect, useState } from "react";
import { getAssetLoader } from "@/engine/assets";
import type { AssetDescriptor, LoadedAsset } from "@/types/assets";

export function useAsset<T = unknown>(
  descriptor: AssetDescriptor<T> | null,
): LoadedAsset<T> | null {
  const [asset, setAsset] = useState<LoadedAsset<T> | null>(null);

  useEffect(() => {
    if (!descriptor) {
      setAsset(null);
      return;
    }

    let cancelled = false;
    const loader = getAssetLoader();

    void loader.load(descriptor).then((loaded) => {
      if (!cancelled) setAsset(loaded);
    });

    return () => {
      cancelled = true;
      loader.unload(descriptor.id);
    };
  }, [descriptor]);

  return asset;
}
