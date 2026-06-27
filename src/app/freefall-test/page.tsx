"use client";

import { useEffect } from "react";
import { FreefallMount } from "@/components/freefall/FreefallMount";
import { LenisProvider } from "@/components/freefall/LenisProvider";
import { scroll } from "@/components/freefall/useScrollStore";
import { computeFreefallFrame } from "@/components/freefall/choreography";
import { computeAtmosphere } from "@/components/freefall/atmosphere";

/**
 * Throwaway DEV/verification route for the freefall 3D (no DOM project sections —
 * the real site is `/`). `window.__ff.setP(p)` pins an exact altitude (defeats
 * Lenis) + snaps the camera, for headless screenshots.
 */
export default function FreefallTestPage() {
  useEffect(() => {
    const w = window as unknown as { __ff?: unknown };
    w.__ff = {
      setP: (p: number) => {
        scroll.target = p;
        scroll.smooth = p;
        scroll.pin = p;
        scroll.frame = computeFreefallFrame(p);
        scroll.atmosphere = computeAtmosphere(p);
        scroll.forceCam = true;
      },
    };
  }, []);

  return (
    <LenisProvider>
      <FreefallMount />
      <div style={{ height: "1400vh", position: "relative", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ position: "fixed", top: 12, left: 12, fontFamily: "monospace", fontSize: 12, color: "#cfc8ff", opacity: 0.6 }}>
          freefall-test (dev) · scroll to fall
        </div>
      </div>
    </LenisProvider>
  );
}
