"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query subscription. Returns whether the given media query
 * currently matches. Server render + first client render return `false`
 * (the `getServerSnapshot`), then hydrates to the real value — fine for
 * progressively-enhanced UI like "show the hamburger menu".
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** True on phone/narrow viewports (Tailwind's `md` breakpoint = 768px). */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
