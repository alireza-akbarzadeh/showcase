"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Isolates canvas/scene failures so the narrative DOM path survives.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[ErrorBoundary:${this.props.name ?? "app"}]`, error, info);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-[var(--muted-foreground)]"
          >
            Something failed to render. The rest of the experience continues.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
