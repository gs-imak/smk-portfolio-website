// Deterministic checks for the walk(behind) → skydive(above, belly-down) cam.
//   node src/components/freefall/choreography.test.mts
import { computeFreefallFrame, FALL_DEPTH } from "./choreography.ts";

let fails = 0;
const approx = (a: number, b: number, eps = 1e-2) => Math.abs(a - b) <= eps;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) { fails++; console.log(`  FAIL ${name} ${detail}`); }
  else console.log(`  ok   ${name}`);
}

// --- WALK (p=0): 3rd-person camera behind his back, upright ---
{
  const f = computeFreefallFrame(0);
  const [ax] = f.character.position;
  check("walk: camera behind (-x)", f.camera.position[0] < ax);
  check("walk: diveBlend = 0 (upright)", f.character.diveBlend === 0);
  check("walk: no view-offset", f.camera.viewOffsetX === 0);
}

// --- FALL (mid-descent): belly-down; the back-locked camera is now ABOVE his
//     back, looking DOWN — and it followed there smoothly (no section switch) ---
for (const p of [0.5, 0.7]) {
  const f = computeFreefallFrame(p);
  const [ax, ay] = f.character.position;
  check(`fall@${p}: camera ABOVE him (followed his pitch)`, f.camera.position[1] > ay, `cam.y ${f.camera.position[1]} char.y ${ay}`);
  check(`fall@${p}: looks DOWN (cam above its target)`, f.camera.position[1] > f.camera.target[1]);
  check(`fall@${p}: target on his body, not far away`, Math.abs(f.camera.target[0] - ax) < 4);
  check(`fall@${p}: belly-down (diveBlend=1)`, approx(f.character.diveBlend, 1));
  check(`fall@${p}: no view-offset`, f.camera.viewOffsetX === 0);
}

// --- the follow is SMOOTH: the camera's offset from him changes only a LITTLE
//     per step across the whole scroll (no jump / section-switch). The rig arcs
//     (height rises then settles) so it's not monotonic — continuity is the test.
{
  let maxStep = 0;
  let prev: number[] | null = null;
  for (let p = 0; p <= 1.0001; p += 0.01) {
    const f = computeFreefallFrame(p);
    const off = [f.camera.position[0] - f.character.position[0], f.camera.position[1] - f.character.position[1]];
    if (prev) {
      const d = Math.hypot(off[0] - prev[0], off[1] - prev[1]);
      if (d > maxStep) maxStep = d;
    }
    prev = off;
  }
  // Guards against a JUMP / section-switch (a discontinuity). diveBlendF is a
  // product of smoothsteps (C1-continuous), so no jump exists; the landing flare
  // is a deliberately quicker — but still smooth — camera resolve, which raises
  // the max per-step slope above the gentle-dive baseline. <0.9 keeps margin.
  check("transition: camera offset is continuous (no jump/switch)", maxStep < 0.9, `maxStep ${maxStep.toFixed(3)}`);
}

// --- trajectory: mostly DOWN, only a little forward ---
{
  const f = computeFreefallFrame(0.9);
  const down = Math.abs(f.character.position[1]);
  const fwd = f.character.position[0];
  check("fall: falls mostly DOWN (down >> forward)", down > fwd * 5, `down ${down.toFixed(1)} fwd ${fwd.toFixed(1)}`);
}

// --- camera trails DOWN with a constant offset through the dive (pre-flare) ---
{
  const a = computeFreefallFrame(0.5);
  const b = computeFreefallFrame(0.8);
  check("fall: camera trails down", b.camera.position[1] < a.camera.position[1]);
  const offA = a.camera.position[1] - a.character.position[1];
  const offB = b.camera.position[1] - b.character.position[1];
  check("fall: constant vertical offset (dive)", approx(offA, offB));
}

// --- LANDING: he FLARES upright (diveBlend 1→0) and touches down on his feet
//     at GROUND_Y; the back-locked camera resolves from above-behind to
//     BEHIND-LEVEL (his approved walk framing) for free ---
{
  check("land: belly-down held mid-dive", approx(computeFreefallFrame(0.7).character.diveBlend, 1));
  check("land: upright at touchdown", approx(computeFreefallFrame(1).character.diveBlend, 0));
  const d70 = computeFreefallFrame(0.7).character.diveBlend;
  const d93 = computeFreefallFrame(0.93).character.diveBlend;
  const d100 = computeFreefallFrame(1).character.diveBlend;
  check("land: diveBlend decreases through the flare", d70 > d93 && d93 > d100);

  const end = computeFreefallFrame(1);
  check("land: touches down at GROUND_Y", approx(end.character.position[1], -FALL_DEPTH));
  check("land: camera resolves BEHIND him (-x)", end.camera.position[0] < end.character.position[0]);
  const overhead = end.camera.position[1] - end.character.position[1];
  check("land: camera level at touchdown (not overhead)", overhead < 3, `overhead ${overhead.toFixed(2)}`);
  const mid = computeFreefallFrame(0.6);
  const midOver = mid.camera.position[1] - mid.character.position[1];
  check("land: above-behind in dive vs level at land", midOver > overhead + 1);
}

// --- depth + no-NaN sweep ---
{
  check("end: full fall depth y = -94", approx(computeFreefallFrame(1).character.position[1], -FALL_DEPTH));
  let nan = false;
  for (let p = 0; p <= 1; p += 0.01) {
    const f = computeFreefallFrame(p);
    const all = [...f.character.position, ...f.character.rotation, ...f.camera.position, ...f.camera.target];
    if (all.some((n) => Number.isNaN(n))) nan = true;
  }
  check("sweep: no NaN across p∈[0,1]", !nan);
}

console.log(fails === 0 ? "\nALL PASS" : `\n${fails} FAILED`);
process.exit(fails === 0 ? 0 : 1);
