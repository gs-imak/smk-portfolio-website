/**
 * Freefall choreography — the pure scroll→character→camera engine.
 *
 * Design (per direct client direction, which overrides the original README §6):
 * keep it DEAD SIMPLE. The camera sits DIRECTLY BEHIND the character's back at a
 * fixed offset and follows him — during the walk and straight down through the
 * fall. We always see his back. No up-pan, no tilt-from-above, no view-offset
 * lane, no roll. Horizon stays level; the camera just trails him down.
 *
 * Given a normalized, already-smoothed scroll value `p ∈ [0,1]`, returns the
 * character transform + the camera pose + light positions. Framework-agnostic
 * (no three / react imports) so it can be unit-tested in isolation.
 */

// --- tunable constants ---------------------------------------------------
export const FALL_DEPTH = 320; // world units the character falls over [0.2, 1.0]
/** Touchdown altitude — his feet meet the ground here at p=1 (Contact section). */
export const GROUND_Y = -FALL_DEPTH;

/** Phase boundaries in scroll progress. */
export const PHASE = {
  walkEnd: 0.12,
  leapEnd: 0.2,
  /** Begin the landing flare: he uprights (belly-down → feet-down) and the
   *  accelerating plunge decelerates to a settled touchdown at the ground. */
  flareStart: 0.86,
} as const;

/** Per-frame smoothing factor applied to raw scroll progress (sp += (t-sp)*k).
 *  Higher = snappier (less lag behind the scroll). Lenis already smooths the
 *  wheel; this is a light second pass — keep it responsive so the jump/fall
 *  don't feel like they drag behind the input. */
export const SCROLL_SMOOTHING = 0.14;
/** Per-frame easing of the actual camera toward its target pose. */
export const CAM_POS_EASE = 0.1;
export const CAM_TARGET_EASE = 0.12;

/** The belly-down dive pitch (about his shoulder axis / world z). Shared by the
 * Astronaut (applies it to the model) AND the camera (so the camera stays locked
 * to his back as he pitches). */
export const DIVE_PITCH = -Math.PI / 2;

/**
 * THIRD-PERSON FOLLOW camera (one rig, behind his BACK, the whole time).
 * The camera sits at a fixed offset relative to the character's own frame —
 * `distance` straight back off his back, `shoulder` toward his head, looking
 * `lookAhead` toward his head. As he pitches from upright (walk) to belly-down
 * (dive), that frame rotates, so the camera smoothly swings from behind-level to
 * above-and-behind his back — always his back, never his soles, no section
 * switching. Live-tunable on /freefall-test; bake the chosen numbers here.
 */
// ✅ CLIENT-APPROVED FINAL VALUES (2026-06) — do NOT change without his say-so.
// This is the locked freefall third-person camera position.
export const camTuning = {
  distance: 3.8, // straight back off his back
  shoulder: 2.0, // along his body: + toward head, - toward feet
  lookAhead: 1.4, // look toward his head/upper back
  lookLift: 0.0, // raise the look point off his back (fine framing)
};

/** FALL trajectory — a small forward step off the edge, then mostly DOWN. */
const LEAP_FWD = 1.2;
const FALL_FWD = 5;

/** Body pitches FLAT to belly-down over diveBlend; the camera follows it. */
export const WALK_ROT: Vec3 = [0, Math.PI / 2, 0];
/** Dive down to belly-down over [0.14, 0.46], HOLD through the descent, then
 *  FLARE back upright over [flareStart, 0.985] so he lands on his feet. The
 *  camera is built from this, so it swings above→behind→back-to-level for free. */
export const diveBlendF = (p: number) =>
  smoothstep(0.12, 0.42, p) * (1 - smoothstep(PHASE.flareStart, 1.0, p));

export type Vec3 = readonly [number, number, number];

export interface CharacterPose {
  position: Vec3;
  rotation: Vec3; // euler (radians) — endpoint lerp; Astronaut SLERPs via diveBlend
  /** 0 = upright (walk) → 1 = belly-down dive (fall) → back to 0 at touchdown
   *  (the flare uprights him to land on his feet). Astronaut slerps with it. */
  diveBlend: number;
  clip: "walk" | "leap" | "fall" | "land";
  /** Procedural limb rotations — STAND-IN only; the real GLB plays clips. */
  limbs: { legL: Vec3; legR: Vec3; armL: Vec3; armR: Vec3 };
}

export interface CameraPose {
  position: Vec3;
  target: Vec3;
  /** Kept for API compatibility; always 0 now (no view-offset lane). */
  viewOffsetX: number;
  /** Extra view pitch (radians) applied after lookAt — a free tilt. */
  tilt: number;
  /** Camera up-vector = his head direction. Rotates with his pitch and stays
   * perpendicular to the view, so the lookAt can NEVER gimbal-flip. */
  up: Vec3;
}

export interface FreefallFrame {
  character: CharacterPose;
  camera: CameraPose;
  lights: { key: Vec3; fill: Vec3 };
}

// --- math helpers --------------------------------------------------------
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** GLSL-style smoothstep (kept for general use). */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}


// --- character -----------------------------------------------------------
// Walk: upright, faces +x, back to the -x camera. Fall: pitches flat to a
// belly-down skydive (back facing up toward the above camera).
function characterPose(p: number): CharacterPose {
  let ax: number;
  let ay: number;
  let clip: CharacterPose["clip"] = "walk";
  const limbs: CharacterPose["limbs"] = {
    legL: [0, 0, 0],
    legR: [0, 0, 0],
    armL: [0, 0, 0],
    armR: [0, 0, 0],
  };

  if (p < PHASE.walkEnd) {
    // WALK along the platform toward the edge.
    const wlk = p / PHASE.walkEnd;
    ax = -2.0 + wlk * 3.9;
    ay = Math.abs(Math.sin(wlk * Math.PI * 8)) * 0.07;
    clip = "walk";
    const sw = 0.8 * Math.sin(wlk * Math.PI * 8);
    limbs.legL = [sw, 0, 0];
    limbs.legR = [-sw, 0, 0];
    limbs.armL = [-sw, 0, 0];
    limbs.armR = [sw, 0, 0];
  } else if (p < PHASE.leapEnd) {
    // LEAP — a real jump off the edge: ANTICIPATION crouch (gather low), then an
    // explosive PUSH-OFF up-and-forward, settling back to edge level so the fall
    // takes over seamlessly. The body simultaneously tips into the dive (diveBlend
    // starts at 0.12) and the walk clip crossfades to the skydive pose.
    const j = (p - PHASE.walkEnd) / (PHASE.leapEnd - PHASE.walkEnd);
    ax = 1.9 + j * LEAP_FWD;
    const crouch = -0.14 * Math.sin(clamp01(j / 0.45) * Math.PI); // dip ~first 45%, back to 0
    const push = 0.22 * Math.sin(clamp01((j - 0.35) / 0.65) * Math.PI); // spring after, back to 0
    ay = crouch + push;
    clip = "leap";
  } else {
    // FALL — small forward drift, mostly DOWN. Accelerates under gravity, then
    // FLARES (decelerates) into a settled touchdown at the ground (y=GROUND_Y).
    const fl = (p - PHASE.leapEnd) / (1 - PHASE.leapEnd); // 0..1 over the fall
    ax = 1.9 + LEAP_FWD + FALL_FWD * (1 - (1 - fl) * (1 - fl)); // ease-out fwd (settles)
    // TERMINAL-VELOCITY descent (C1-continuous velocity): a brief accel so he
    // LEAVES the platform at once (no hover/"stuck"), then a long LINEAR plunge
    // so the populated planet field spaces out EVENLY as he passes it, then a
    // gentle flare-settle onto the ground. ∫velocity = 1 ⇒ reaches GROUND_Y at p1.
    const A = 0.1; // accel fraction
    const B = 0.85; // flare-start fraction
    const Vt = 2 / (1 + B - A); // terminal velocity that makes the integral = 1
    let prog: number;
    if (fl < A) {
      prog = 0.5 * (Vt / A) * fl * fl;
    } else if (fl < B) {
      prog = 0.5 * Vt * A + Vt * (fl - A);
    } else {
      const f = fl - B;
      prog = 0.5 * Vt * A + Vt * (B - A) + Vt * f - 0.5 * (Vt / (1 - B)) * f * f;
    }
    ay = -FALL_DEPTH * prog; // → GROUND_Y, velocity → 0 at touchdown
    clip = p >= PHASE.flareStart ? "land" : "fall";
  }

  // Body pitches to flat belly-down over diveBlend (Astronaut applies it).
  const diveBlend = diveBlendF(p);
  return { position: [ax, ay, 0], rotation: WALK_ROT, diveBlend, clip, limbs };
}

// --- THIRD-PERSON FOLLOW: locked behind his back, follows his pitch ----------
// As he pitches forward (about world z) from upright (walk) to belly-down (dive),
// his "back" and "head" directions rotate; the camera offset is built from those,
// so it stays behind his back the whole time — smoothly, one continuous rig.
function cameraPose(diveBlend: number, charPos: Vec3): CameraPose {
  const [ax, ay] = charPos;
  const t = DIVE_PITCH * diveBlend; // his current pitch
  const c = Math.cos(t);
  const s = Math.sin(t);
  // world directions that rotate with him:
  const backN: Vec3 = [-c, -s, 0]; // the way his back faces (behind-his-back dir)
  const headN: Vec3 = [-s, c, 0]; // toward his head along his body

  const position: Vec3 = [
    ax + camTuning.distance * backN[0] + camTuning.shoulder * headN[0],
    ay + camTuning.distance * backN[1] + camTuning.shoulder * headN[1],
    0,
  ];
  const target: Vec3 = [
    ax + camTuning.lookAhead * headN[0] + camTuning.lookLift * backN[0],
    ay + camTuning.lookAhead * headN[1] + camTuning.lookLift * backN[1],
    0,
  ];
  // up = his head direction (⊥ to the view) → lookAt can never flip.
  return { position, target, viewOffsetX: 0, tilt: 0, up: headN };
}

// --- public entry --------------------------------------------------------
export function computeFreefallFrame(p: number): FreefallFrame {
  const character = characterPose(p);
  const camera = cameraPose(character.diveBlend, character.position);
  const [ax, ay] = character.position;
  return {
    character,
    camera,
    lights: {
      key: [ax + 5, ay + 8, 7],
      fill: [ax - 6, ay - 1, -5],
    },
  };
}

/** The single calm frame shown under prefers-reduced-motion (mid-fall). */
export const REDUCED_MOTION_P = 0.45;
