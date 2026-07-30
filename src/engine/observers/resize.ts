export type ResizeHandler = (entry: ResizeObserverEntry) => void;

/**
 * Shared ResizeObserver — one observer, many elements.
 */
class SharedResizeObserver {
  private observer: ResizeObserver | null = null;
  private readonly callbacks = new WeakMap<Element, Set<ResizeHandler>>();

  observe(element: Element, handler: ResizeHandler): () => void {
    if (typeof ResizeObserver === "undefined") {
      return () => undefined;
    }

    if (!this.observer) {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const set = this.callbacks.get(entry.target);
          if (!set) continue;
          for (const cb of set) cb(entry);
        }
      });
    }

    let set = this.callbacks.get(element);
    if (!set) {
      set = new Set();
      this.callbacks.set(element, set);
      this.observer.observe(element);
    }
    set.add(handler);

    return () => {
      const handlers = this.callbacks.get(element);
      if (!handlers) return;
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.observer?.unobserve(element);
        this.callbacks.delete(element);
      }
    };
  }
}

export const sharedResizeObserver = new SharedResizeObserver();

export function observeResize(
  element: Element,
  handler: ResizeHandler,
): () => void {
  return sharedResizeObserver.observe(element, handler);
}
