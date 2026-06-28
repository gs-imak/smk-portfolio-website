"use client";

import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { computeFreefallFrame, REDUCED_MOTION_P, SCROLL_SMOOTHING } from "./choreography";
import { computeAtmosphere } from "./atmosphere";
import { Environment } from "./Environment";
import { Lighting } from "./Lighting";
import { Platform } from "./Platform";
import { Astronaut } from "./Astronaut";
import { CameraRig } from "./CameraRig";
import { CloudDeck } from "./CloudDeck";
import { Earth } from "./Earth";
import { Planets } from "./Planets";
import { PostFX } from "./PostFX";

/**
 * The single per-frame driver. Mounted FIRST so its useFrame runs before the
 * consumers (Astronaut/Lighting/CameraRig) each frame: it advances the smoothed
 * scroll value and recomputes the shared choreography frame exactly once.
 */
function ScrollSmoother({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame(() => {
    if (reducedMotion) {
      // One calm composed frame, mid-fall + spread. No scroll-driven motion.
      scroll.smooth = REDUCED_MOTION_P;
      scroll.frame = computeFreefallFrame(REDUCED_MOTION_P);
      scroll.atmosphere = computeAtmosphere(REDUCED_MOTION_P);
      return;
    }
    // Scroll-reveal: the fall NEVER freezes — projects surface as you pass their
    // altitude and slide away as you keep falling. (`pin` is a test-only hold.)
    if (scroll.pin != null) scroll.smooth = scroll.pin;
    else scroll.smooth += (scroll.target - scroll.smooth) * SCROLL_SMOOTHING;
    scroll.frame = computeFreefallFrame(scroll.smooth);
    scroll.atmosphere = computeAtmosphere(scroll.smooth);
  });
  return null;
}

/**
 * The ONE persistent <Canvas> — fixed, full-viewport, behind the content
 * (z-0), pointer-events-none so it never eats clicks. It never unmounts between
 * sections; the DOM content scrolls over it.
 */
export default function Scene3D({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        // AgX over ACESFilmic — holds the violet/teal palette through the bright
        // cloud money-shot instead of skewing hue + clipping whites warm. AgX is
        // darker, so exposure is pushed up; punch comes back via the post stack.
        toneMapping: THREE.AgXToneMapping,
        toneMappingExposure: 1.35,
      }}
      camera={{ position: [-5.6, 1.5, 0], fov: 50, near: 2, far: 400 }}
    >
      <fogExp2 attach="fog" args={[0x050409, 0.019]} />
      <ScrollSmoother reducedMotion={reducedMotion} />
      <Environment />
      <Lighting />
      <Platform />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Suspense fallback={null}>
        <Astronaut />
      </Suspense>
      <Suspense fallback={null}>
        <CloudDeck />
      </Suspense>
      <Suspense fallback={null}>
        <Planets />
      </Suspense>
      <CameraRig />
      <PostFX />
    </Canvas>
  );
}
