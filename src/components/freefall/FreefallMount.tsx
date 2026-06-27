"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Lazy, client-only: the readable content paints first; the canvas streams in
// after and fades up. ssr:false keeps three/r3f off the server bundle.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Mounts the persistent freefall canvas behind the page. Renders nothing when
 * WebGL is unavailable — the sections stand alone as the graceful 2D fallback.
 */
export function FreefallMount() {
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!webglAvailable()) {
      setSupported(false);
      return;
    }
    // Defer one frame past first paint so content is visible immediately.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (ready) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
  }, [ready]);

  if (!supported || !ready) return null;

  // Opacity-only fade — NO transform on this wrapper (a transformed ancestor
  // would re-anchor the fixed canvas and break its positioning).
  return (
    <div style={{ opacity: shown ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <Scene3D reducedMotion={reducedMotion} />
    </div>
  );
}
