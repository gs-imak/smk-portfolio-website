/**
 * Freefall ATMOSPHERE — the pure scroll→altitude-keyframe interpolation engine.
 *
 * The sibling of `choreography.ts`: where choreography drives the character +
 * the (LOCKED) camera, this drives the WORLD around him. Given the same
 * normalized, already-smoothed scroll value `p ∈ [0,1]`, it returns the
 * atmosphere state for that altitude — fog colour/density, the sky gradient
 * stops, star density, sun + key-light colour/intensity, and the band id.
 *
 * It is framework-agnostic (no three / react imports) so it can be unit-tested
 * in isolation, and entirely DATA-DRIVEN: the journey is a list of keyframes,
 * one per altitude beat, that `computeAtmosphere` linearly interpolates between.
 * The keyframe array is a live-tunable mutable export (exactly like `camTuning`)
 * so the bands can be dialled in by hand on /freefall-test without a rebuild.
 *
 * Journey (graded into the violet/teal/obsidian palette, brightening + warming
 * with descent — cold space → bright cloud deck → warm ground):
 *   space → reentry → upper → clouddeck (the money-shot whiteout) → lowersky → ground
 */

export type RGB = readonly [number, number, number];

/** The cinematic sub-bands of the descent. Used by the altimeter HUD + debug. */
export type BandId =
  | "space"
  | "reentry"
  | "upper"
  | "clouddeck"
  | "lowersky"
  | "ground";

export interface AtmosphereState {
  /** Which altitude band the viewer is currently in (nearest keyframe). */
  band: BandId;
  /** Exponential fog colour + density (THREE.FogExp2). */
  fogColor: RGB;
  fogDensity: number;
  /** Sky-dome vertical gradient stops (top → mid → bottom of the dome). */
  skyTop: RGB;
  skyMid: RGB;
  skyBottom: RGB;
  /** Starfield visibility, 0 (none) → 1 (dense deep-space field). */
  starDensity: number;
  /** Cloud-deck presence, 0 (clear) → 1 (the plunge-through whiteout). Drives
   *  the drei cloud puffs' opacity so they only exist around the deck. */
  cloudDensity: number;
  /** The sun — colour + intensity. 0 in space, peaks at the cloud deck. The
   *  god-rays / light-shafts slice reads these; here they just ride along. */
  sunColor: RGB;
  sunIntensity: number;
  /** Key-light tint + intensity — cold violet in space, warm near-white low. */
  lightColor: RGB;
  lightIntensity: number;
}

export interface AtmosphereKeyframe extends AtmosphereState {
  /** Scroll progress this keyframe sits at, in [0,1]. Must be ascending. */
  p: number;
}

// --- helpers -------------------------------------------------------------
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Parse a `#rrggbb` string to a normalized [r,g,b] triple (authoring helper). */
export function hex(h: string): RGB {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

// --- the journey (LIVE-TUNABLE keyframes, like camTuning) ----------------
// Authored as starting values — tune live on /freefall-test, then bake back.
// `p` MUST be strictly ascending. Each field interpolates linearly between the
// bracketing pair; `band` snaps to the nearer keyframe of the bracket.
export const atmosphereKeyframes: AtmosphereKeyframe[] = [
  {
    // 0 — DEEP SPACE / ORBIT (hero): black, dense starfield, cold cosmic haze.
    p: 0.0,
    band: "space",
    fogColor: hex("#050409"),
    fogDensity: 0.008,
    skyTop: hex("#0e0b1c"),
    skyMid: hex("#08071a"),
    skyBottom: hex("#040410"),
    starDensity: 1.0,
    cloudDensity: 0.0,
    sunColor: hex("#e6ecff"),
    sunIntensity: 0.0,
    lightColor: hex("#c9b8ff"),
    lightIntensity: 2.2,
  },
  {
    // 1 — still orbit, through the leap. Hold the void; faint glow begins below.
    p: 0.55,
    band: "space",
    fogColor: hex("#070512"),
    fogDensity: 0.009,
    skyTop: hex("#100d24"),
    skyMid: hex("#0b0920"),
    skyBottom: hex("#0a0818"),
    starDensity: 0.92,
    cloudDensity: 0.0,
    sunColor: hex("#e6ecff"),
    sunIntensity: 0.05,
    lightColor: hex("#c4b6ff"),
    lightIntensity: 2.25,
  },
  {
    // 2 — RE-ENTRY / EXOSPHERE: thin air, warm glow building below, star streaks.
    p: 0.78,
    band: "reentry",
    fogColor: hex("#0c0a22"),
    fogDensity: 0.014,
    skyTop: hex("#161038"),
    skyMid: hex("#241a4e"),
    skyBottom: hex("#3a2046"),
    starDensity: 0.55,
    cloudDensity: 0.05,
    sunColor: hex("#ffeede"),
    sunIntensity: 0.15,
    lightColor: hex("#bfb0ff"),
    lightIntensity: 2.3,
  },
  {
    // 3 — UPPER ATMOSPHERE: deep blue, high cirrus, horizon brightening.
    p: 0.86,
    band: "upper",
    fogColor: hex("#10182e"),
    fogDensity: 0.016,
    skyTop: hex("#1a2350"),
    skyMid: hex("#2a3a6e"),
    skyBottom: hex("#3a5a7a"),
    starDensity: 0.18,
    cloudDensity: 0.25,
    sunColor: hex("#fff3e0"),
    sunIntensity: 0.32,
    lightColor: hex("#bcc8ff"),
    lightIntensity: 2.45,
  },
  {
    // 4 — CLOUD-DECK APPROACH: brightening into the top of the clouds.
    p: 0.91,
    band: "clouddeck",
    fogColor: hex("#4d566b"),
    fogDensity: 0.03,
    skyTop: hex("#4c6b9e"),
    skyMid: hex("#8c9ebd"),
    skyBottom: hex("#c7d9e0"),
    starDensity: 0.0,
    cloudDensity: 0.85,
    sunColor: hex("#fff2d2"),
    sunIntensity: 0.7,
    lightColor: hex("#f2eef5"),
    lightIntensity: 2.8,
  },
  {
    // 5 — CLOUD-DECK PEAK: the plunge-through WHITEOUT + sun (the money shot).
    p: 0.95,
    band: "clouddeck",
    fogColor: hex("#d2dce6"),
    fogDensity: 0.06,
    skyTop: hex("#9eb3d9"),
    skyMid: hex("#d9e0eb"),
    skyBottom: hex("#f5f2ec"),
    starDensity: 0.0,
    cloudDensity: 1.0,
    sunColor: hex("#fff7db"),
    sunIntensity: 1.4,
    lightColor: hex("#fff7ec"),
    lightIntensity: 3.2,
  },
  {
    // 6 — LOWER SKY: breaks out below into warm golden-hour, distant ground haze.
    p: 0.98,
    band: "lowersky",
    fogColor: hex("#66524d"),
    fogDensity: 0.022,
    skyTop: hex("#4d3d5c"),
    skyMid: hex("#8c6657"),
    skyBottom: hex("#c78c61"),
    starDensity: 0.0,
    cloudDensity: 0.45,
    sunColor: hex("#ffd29a"),
    sunIntensity: 0.9,
    lightColor: hex("#ffd9b8"),
    lightIntensity: 2.6,
  },
  {
    // 7 — TOUCHDOWN: stylized warm ground / city-lights resolve below (Contact).
    p: 1.0,
    band: "ground",
    fogColor: hex("#382628"),
    fogDensity: 0.02,
    skyTop: hex("#291d38"),
    skyMid: hex("#573d42"),
    skyBottom: hex("#805748"),
    starDensity: 0.06,
    cloudDensity: 0.0,
    sunColor: hex("#ffc794"),
    sunIntensity: 0.5,
    lightColor: hex("#ffdcc0"),
    lightIntensity: 2.4,
  },
];

// --- public entry --------------------------------------------------------
/**
 * Interpolate the atmosphere state at scroll progress `p`. Linear per field,
 * componentwise per colour; `band` snaps to the nearer keyframe of the bracket.
 * Clamps to the first/last keyframe outside [keyframes[0].p, last.p].
 */
export function computeAtmosphere(p: number): AtmosphereState {
  const ks = atmosphereKeyframes;
  // Clamp below the first / above the last keyframe.
  if (p <= ks[0].p) return strip(ks[0]);
  const last = ks[ks.length - 1];
  if (p >= last.p) return strip(last);

  // Find the bracketing pair [k0, k1] with k0.p <= p < k1.p.
  let i = 0;
  while (i < ks.length - 1 && ks[i + 1].p <= p) i++;
  const k0 = ks[i];
  const k1 = ks[i + 1];
  const t = (p - k0.p) / (k1.p - k0.p);

  return {
    band: t < 0.5 ? k0.band : k1.band,
    fogColor: lerpRGB(k0.fogColor, k1.fogColor, t),
    fogDensity: lerp(k0.fogDensity, k1.fogDensity, t),
    skyTop: lerpRGB(k0.skyTop, k1.skyTop, t),
    skyMid: lerpRGB(k0.skyMid, k1.skyMid, t),
    skyBottom: lerpRGB(k0.skyBottom, k1.skyBottom, t),
    starDensity: clamp01(lerp(k0.starDensity, k1.starDensity, t)),
    cloudDensity: clamp01(lerp(k0.cloudDensity, k1.cloudDensity, t)),
    sunColor: lerpRGB(k0.sunColor, k1.sunColor, t),
    sunIntensity: lerp(k0.sunIntensity, k1.sunIntensity, t),
    lightColor: lerpRGB(k0.lightColor, k1.lightColor, t),
    lightIntensity: lerp(k0.lightIntensity, k1.lightIntensity, t),
  };
}

/** Drop the `p` field — return just the state half of a keyframe. */
function strip(k: AtmosphereKeyframe): AtmosphereState {
  return {
    band: k.band,
    fogColor: k.fogColor,
    fogDensity: k.fogDensity,
    skyTop: k.skyTop,
    skyMid: k.skyMid,
    skyBottom: k.skyBottom,
    starDensity: k.starDensity,
    cloudDensity: k.cloudDensity,
    sunColor: k.sunColor,
    sunIntensity: k.sunIntensity,
    lightColor: k.lightColor,
    lightIntensity: k.lightIntensity,
  };
}
