import { create } from "zustand";
import { computeFreefallFrame, type FreefallFrame } from "./choreography";
import { computeAtmosphere, type AtmosphereState } from "./atmosphere";

/**
 * Frame-shared scroll state — deliberately OUTSIDE React reactivity.
 *
 * Lenis writes `target` (the raw 0→1 page progress) on every scroll tick; the
 * <ScrollSmoother> driver advances `smooth` and recomputes `frame` + `atmosphere`
 * once per animation frame; CameraRig / Astronaut / Lighting read `frame`,
 * Environment reads `atmosphere`. Keeping this off React state means the 60fps
 * loop never triggers a re-render.
 */
export const scroll: {
  target: number;
  smooth: number;
  frame: FreefallFrame;
  /** Altitude atmosphere (fog/sky/stars/light) for the current `smooth`. */
  atmosphere: AtmosphereState;
  /** Test-only: pin `smooth` to this value (defeats Lenis) so headless can hold
   *  an exact altitude. null = normal scroll. Set by the /freefall-test hook. */
  pin: number | null;
  /** When true, CameraRig snaps the camera to its target instead of easing —
   * used by the test route to capture settled frames at an exact progress. */
  forceCam: boolean;
} = {
  target: 0,
  smooth: 0,
  frame: computeFreefallFrame(0),
  atmosphere: computeAtmosphere(0),
  pin: null,
  forceCam: false,
};

/**
 * Thin reactive store for DOM that genuinely needs to re-render on scroll —
 * currently just the top progress bar. Updated (throttled-by-rAF via Lenis)
 * with the raw progress, NOT the per-frame smoothed value.
 */
interface ScrollUIState {
  progress: number;
  setProgress: (p: number) => void;
}

export const useScrollStore = create<ScrollUIState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));
