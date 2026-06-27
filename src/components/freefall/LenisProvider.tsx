"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { scroll, useScrollStore } from "./useScrollStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Reports Lenis' normalized progress into the frame-shared `scroll.target`
 * (read by the 3D loop) and the reactive store (read by the DOM progress bar).
 * Must live inside the <ReactLenis> tree to access its context.
 */
function ScrollReporter() {
  const setProgress = useScrollStore((s) => s.setProgress);
  useLenis((lenis) => {
    const p = lenis.progress || 0; // 0→1 over the whole scrollable page
    scroll.target = p;
    setProgress(p);
  });
  return null;
}

/**
 * Smooth-scroll provider. Lenis is the single source of truth for scroll;
 * everything else derives from `scroll.target`. Under reduced-motion we skip
 * Lenis entirely (native scroll, no inertia) and let <ScrollSmoother> pin the
 * scene to a calm composed frame.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 }}
    >
      <ScrollReporter />
      {children}
    </ReactLenis>
  );
}
