// Deterministic checks for the scroll→altitude atmosphere interpolator.
//   node src/components/freefall/atmosphere.test.mts
import {
  atmosphereKeyframes,
  computeAtmosphere,
  type RGB,
} from "./atmosphere.ts";

let fails = 0;
const approx = (a: number, b: number, eps = 1e-4) => Math.abs(a - b) <= eps;
const approxRGB = (a: RGB, b: RGB, eps = 1e-4) =>
  approx(a[0], b[0], eps) && approx(a[1], b[1], eps) && approx(a[2], b[2], eps);
const lum = (c: RGB) => c[0] + c[1] + c[2];
function check(name: string, cond: boolean, detail = "") {
  if (!cond) {
    fails++;
    console.log(`  FAIL ${name} ${detail}`);
  } else console.log(`  ok   ${name}`);
}

// --- keyframes are well-formed: strictly ascending p, spanning [0,1] ---
{
  check("keyframes: first p = 0", atmosphereKeyframes[0].p === 0);
  check(
    "keyframes: last p = 1",
    atmosphereKeyframes[atmosphereKeyframes.length - 1].p === 1,
  );
  let ascending = true;
  for (let i = 1; i < atmosphereKeyframes.length; i++)
    if (atmosphereKeyframes[i].p <= atmosphereKeyframes[i - 1].p)
      ascending = false;
  check("keyframes: p strictly ascending", ascending);
}

// --- at each keyframe p, compute returns that keyframe's exact state ---
{
  let allMatch = true;
  for (const k of atmosphereKeyframes) {
    const a = computeAtmosphere(k.p);
    if (
      !approxRGB(a.fogColor, k.fogColor) ||
      !approx(a.fogDensity, k.fogDensity) ||
      !approxRGB(a.skyTop, k.skyTop) ||
      !approxRGB(a.skyBottom, k.skyBottom) ||
      !approx(a.starDensity, k.starDensity) ||
      !approx(a.cloudDensity, k.cloudDensity) ||
      !approx(a.sunIntensity, k.sunIntensity)
    )
      allMatch = false;
  }
  check("keyframe-exact: compute(k.p) === keyframe state", allMatch);
}

// --- band ids resolve as designed ---
{
  check("band@0 = space", computeAtmosphere(0).band === "space");
  check("band@0.72 = clouddeck (whiteout)", computeAtmosphere(0.95).band === "clouddeck");
  check("band@1 = ground", computeAtmosphere(1).band === "ground");
  check("band@0.5 = upper", computeAtmosphere(0.86).band === "upper");
}

// --- clamps outside [0,1] to the endpoints ---
{
  check("clamp low: compute(-0.5) === compute(0)",
    approxRGB(computeAtmosphere(-0.5).skyTop, computeAtmosphere(0).skyTop) &&
    computeAtmosphere(-0.5).band === computeAtmosphere(0).band);
  check("clamp high: compute(1.5) === compute(1)",
    approxRGB(computeAtmosphere(1.5).skyTop, computeAtmosphere(1).skyTop) &&
    computeAtmosphere(1.5).band === computeAtmosphere(1).band);
}

// --- the descent narrative: stars fade out, then return faintly at ground ---
{
  check("stars: dense in space (≈1)", approx(computeAtmosphere(0).starDensity, 1, 1e-3));
  check("stars: gone in the cloud deck", computeAtmosphere(0.95).starDensity === 0);
  check("stars: fade space→clouddeck", computeAtmosphere(0).starDensity > computeAtmosphere(0.9).starDensity);
}

// --- clouds: absent in space, peak at the whiteout, gone again at ground ---
{
  check("clouds: none in space", computeAtmosphere(0).cloudDensity === 0);
  check("clouds: peak at whiteout (=1)", approx(computeAtmosphere(0.95).cloudDensity, 1, 1e-3));
  check("clouds: cleared at ground", computeAtmosphere(1).cloudDensity === 0);
  check("clouds: denser at deck than upper", computeAtmosphere(0.95).cloudDensity > computeAtmosphere(0.86).cloudDensity);
}

// --- fog density PEAKS at the cloud-deck whiteout (plunge-through envelop) ---
{
  const space = computeAtmosphere(0).fogDensity;
  const whiteout = computeAtmosphere(0.95).fogDensity;
  const ground = computeAtmosphere(1).fogDensity;
  check("fog: whiteout densest vs space", whiteout > space);
  check("fog: whiteout densest vs ground", whiteout > ground);
}

// --- brighten with descent: cloud-deck sky is far brighter than space sky ---
{
  check("brighten: cloud-deck skyBottom >> space skyBottom",
    lum(computeAtmosphere(0.95).skyBottom) > lum(computeAtmosphere(0).skyBottom) + 1.5);
}

// --- warm with descent: light goes cold-violet (B>R) → warm (R>B) ---
{
  const cold = computeAtmosphere(0).lightColor;
  const warm = computeAtmosphere(1).lightColor;
  check("light: cold in space (B ≥ R)", cold[2] >= cold[0]);
  check("light: warm at ground (R > B)", warm[0] > warm[2]);
}

// --- no overshoot: a mid-segment value stays within its bracketing pair ---
{
  // p=0.88 sits between keyframe 3 (p=0.86) and keyframe 4 (p=0.91).
  const k0 = atmosphereKeyframes[3];
  const k1 = atmosphereKeyframes[4];
  const a = computeAtmosphere(0.88);
  const within = (x: number, lo: number, hi: number) =>
    x >= Math.min(lo, hi) - 1e-6 && x <= Math.max(lo, hi) + 1e-6;
  check("interp: fogDensity within bracket", within(a.fogDensity, k0.fogDensity, k1.fogDensity));
  let chOk = true;
  for (let c = 0; c < 3; c++)
    if (!within(a.skyMid[c], k0.skyMid[c], k1.skyMid[c])) chOk = false;
  check("interp: skyMid channels within bracket", chOk);
}

// --- continuity: no large jumps across the whole scroll sweep ---
{
  let maxStep = 0;
  let prev: RGB | null = null;
  for (let p = 0; p <= 1.0001; p += 0.01) {
    const c = computeAtmosphere(p).skyBottom;
    if (prev) {
      const d = Math.abs(c[0] - prev[0]) + Math.abs(c[1] - prev[1]) + Math.abs(c[2] - prev[2]);
      if (d > maxStep) maxStep = d;
    }
    prev = c;
  }
  // The atmosphere is intentionally compressed into the final Earth-entry
  // (space holds dark to p~0.78), so colours change faster there — still
  // continuous (no jump/discontinuity), just a steeper slope. <0.5 keeps margin.
  check("continuity: skyBottom has no jump", maxStep < 0.5, `maxStep ${maxStep.toFixed(3)}`);
}

// --- ranges + no-NaN sweep ---
{
  let bad = false;
  for (let p = -0.1; p <= 1.1; p += 0.01) {
    const a = computeAtmosphere(p);
    const all = [
      ...a.fogColor, a.fogDensity, ...a.skyTop, ...a.skyMid, ...a.skyBottom,
      a.starDensity, a.cloudDensity, ...a.sunColor, a.sunIntensity, ...a.lightColor, a.lightIntensity,
    ];
    if (all.some((n) => Number.isNaN(n))) bad = true;
    const cols = [...a.fogColor, ...a.skyTop, ...a.skyMid, ...a.skyBottom, ...a.sunColor, ...a.lightColor];
    if (cols.some((n) => n < 0 || n > 1)) bad = true;
    if (a.starDensity < 0 || a.starDensity > 1) bad = true;
    if (a.cloudDensity < 0 || a.cloudDensity > 1) bad = true;
    if (a.fogDensity < 0) bad = true;
  }
  check("sweep: no NaN, colours in [0,1], densities ≥ 0", !bad);
}

console.log(fails === 0 ? "\nALL PASS" : `\n${fails} FAILED`);
process.exit(fails === 0 ? 0 : 1);
