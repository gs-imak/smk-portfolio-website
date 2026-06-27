"use client";

import { useScrollStore } from "./useScrollStore";

/**
 * A thin vertical rail on the right edge that fills as you fall — wayfinding for
 * the long (multi-screen) descent. Reads the reactive scroll store (raw Lenis
 * progress), decorative + non-interactive.
 */
export function ScrollProgress() {
  const progress = useScrollStore((s) => s.progress);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 3,
        zIndex: 40,
        pointerEvents: "none",
        background: "rgba(255,255,255,.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${Math.min(100, progress * 100)}%`,
          background: "linear-gradient(#7C5CFF, #5FE0C8)",
          transition: "height .08s linear",
        }}
      />
    </div>
  );
}
