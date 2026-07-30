"use client";

import { useEffect } from "react";
import { initMonitoring } from "@/lib/monitoring";

/** Boots optional Sentry when NEXT_PUBLIC_SENTRY_DSN is set. */
export function MonitoringBoot() {
  useEffect(() => {
    initMonitoring();
  }, []);

  return null;
}
