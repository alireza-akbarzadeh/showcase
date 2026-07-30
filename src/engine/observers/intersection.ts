export type IntersectionHandler = (
  entry: IntersectionObserverEntry,
) => void;

export interface ObserveIntersectionOptions {
  readonly root?: Element | null;
  readonly rootMargin?: string;
  readonly threshold?: number | number[];
}

/**
 * Shared IntersectionObserver factory — reuse observers by option key.
 */
const observerCache = new Map<
  string,
  {
    observer: IntersectionObserver;
    callbacks: WeakMap<Element, Set<IntersectionHandler>>;
  }
>();

function cacheKey(options: ObserveIntersectionOptions): string {
  const threshold = Array.isArray(options.threshold)
    ? options.threshold.join(",")
    : String(options.threshold ?? 0);
  return `${options.rootMargin ?? "0px"}|${threshold}`;
}

export function observeIntersection(
  element: Element,
  handler: IntersectionHandler,
  options: ObserveIntersectionOptions = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    handler({
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
    } as IntersectionObserverEntry);
    return () => undefined;
  }

  const key = cacheKey(options);
  let bucket = observerCache.get(key);

  if (!bucket) {
    const callbacks = new WeakMap<Element, Set<IntersectionHandler>>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const set = callbacks.get(entry.target);
        if (!set) continue;
        for (const cb of set) cb(entry);
      }
    }, options);
    bucket = { observer, callbacks };
    observerCache.set(key, bucket);
  }

  let set = bucket.callbacks.get(element);
  if (!set) {
    set = new Set();
    bucket.callbacks.set(element, set);
    bucket.observer.observe(element);
  }
  set.add(handler);

  return () => {
    const current = observerCache.get(key);
    if (!current) return;
    const handlers = current.callbacks.get(element);
    if (!handlers) return;
    handlers.delete(handler);
    if (handlers.size === 0) {
      current.observer.unobserve(element);
      current.callbacks.delete(element);
    }
  };
}
