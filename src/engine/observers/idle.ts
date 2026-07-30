export type IdleTask = () => void;

/**
 * Schedule non-critical work during idle time.
 */
export function runWhenIdle(
  task: IdleTask,
  options: { timeout?: number } = {},
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(() => task(), {
      timeout: options.timeout ?? 2000,
    });
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(task, 1);
  return () => window.clearTimeout(id);
}

export function schedulePrefetch(task: IdleTask): () => void {
  return runWhenIdle(task, { timeout: 3000 });
}
