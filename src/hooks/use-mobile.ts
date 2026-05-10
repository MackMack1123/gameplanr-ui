"use client";

import { useState, useEffect } from "react";

/**
 * Returns `true` when the viewport is at or below the mobile breakpoint
 * (default 768px). Updates on window resize.
 *
 * Used by `<Sidebar>` consumers to swap to a `<Sheet>` drawer on mobile,
 * by `<MobileBottomNav>` callers to render only on mobile, and by any
 * component that needs to branch on viewport size.
 *
 * SSR-safe: returns `false` on the first render (no `window`), then
 * updates on mount via the effect.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
