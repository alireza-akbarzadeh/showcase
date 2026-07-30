import type { AssetDescriptor } from "@/types/assets";
import { getAssetLoader } from "@/engine/assets/loader";

type AssetOptions = {
  priority?: AssetDescriptor["priority"];
  prefetch?: boolean;
  meta?: AssetDescriptor["meta"];
};

export function texture(
  id: string,
  src: string,
  options: AssetOptions = {},
): AssetDescriptor<HTMLImageElement> {
  return { id, kind: "texture", src, ...options };
}

export function image(
  id: string,
  src: string,
  options: AssetOptions = {},
): AssetDescriptor<HTMLImageElement> {
  return { id, kind: "image", src, ...options };
}

export function model(
  id: string,
  src: string,
  options: AssetOptions = {},
): AssetDescriptor<ArrayBuffer> {
  return { id, kind: "model", src, ...options };
}

export function font(
  id: string,
  src: string,
  family: string,
  options: Omit<AssetOptions, "meta"> = {},
): AssetDescriptor<FontFace> {
  return { id, kind: "font", src, meta: { family }, ...options };
}

export function video(
  id: string,
  src: string,
  options: AssetOptions = {},
): AssetDescriptor<HTMLVideoElement> {
  return { id, kind: "video", src, ...options };
}

export function shader(
  id: string,
  src: string,
  options: AssetOptions = {},
): AssetDescriptor<string> {
  return { id, kind: "shader", src, ...options };
}

export async function loadTexture(id: string, src: string) {
  return getAssetLoader().load(texture(id, src));
}

export async function loadModel(id: string, src: string) {
  return getAssetLoader().load(model(id, src));
}

export async function loadFont(id: string, src: string, family: string) {
  return getAssetLoader().load(font(id, src, family));
}

export async function loadVideo(id: string, src: string) {
  return getAssetLoader().load(video(id, src));
}

export async function loadImage(id: string, src: string) {
  return getAssetLoader().load(image(id, src));
}
