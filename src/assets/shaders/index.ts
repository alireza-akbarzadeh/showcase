/**
 * Lazy shader imports — load GLSL only when a scene needs it.
 * Wire via raw-loader / webpack asset modules in next.config.
 */
export const SHADER_PATHS = {
  basicVert: "@/assets/shaders/basic.vert",
  basicFrag: "@/assets/shaders/basic.frag",
} as const;

export type ShaderKey = keyof typeof SHADER_PATHS;

export async function loadShaderSource(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load shader: ${path}`);
  }
  return response.text();
}
