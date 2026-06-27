import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";
import { scroll } from "./useScrollStore";
import { DIVE_PITCH, PHASE, smoothstep, WALK_ROT } from "./choreography";
import { PLANETS, visit } from "./visit";

const MODEL = "/models/astronaut.glb";
const TARGET_HEIGHT = 2.3; // world units — match the prototype placeholder (≈1.9 × scale 1.22)

// The GLB ships `floating | idle | wave | moon_walk`. We use moon_walk for the
// walk and floating for the fall — but SCRUBBED by scroll (see below), never
// auto-playing on real time.
const WALK_CYCLES = 3; // step cycles over the walk phase
const FLOAT_CYCLES = 2; // float-drift cycles over the fall
// Walk/float weight crossfade — runs THROUGH the leap (p0.12→0.2), aligned with
// the dive pitch (diveBlend 0.12→0.42), so as he steps off the edge he tucks
// straight into the zero-g skydive pose. Previously held until p0.2 → he froze
// in a static walk pose mid-air for a beat ("walks off, gets stuck, then falls").
const BLEND_LO = 0.12;
const BLEND_HI = 0.27;
// Landing flare: float (skydive spread) crossfades to idle (standing) so he
// touches down on his feet. Aligned with the choreography's diveBlend flare.
const FLARE_LO = 0.84;
const FLARE_HI = 0.99;
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

export function Astronaut() {
  const outer = useRef<Group>(null); // choreography transform (camera is keyed here)
  const inner = useRef<Group>(null); // normalization (scale + recenter)
  const { scene: model, animations } = useGLTF(MODEL, true);
  const { actions, mixer } = useAnimations(animations, inner);

  // Orientation = his upright WALK facing, then a forward PITCH about his
  // shoulder axis (world z) into the belly-down dive. Single-axis = NO roll or
  // sideways twist; keeps his walk/dive direction (head leads +x).
  const walkQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(...WALK_ROT)), []);
  const pitchQuat = useRef(new THREE.Quaternion());
  const faceQuat = useRef(new THREE.Quaternion());
  const PITCH_AXIS = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const Y_AXIS = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  // Keep the GLB's original suit TEXTURES, but upgrade the materials to
  // MeshPhysicalMaterial with a fabric SHEEN (Charlie BRDF) + light clearcoat —
  // the suit reads as beta-cloth, not plastic, and catches the violet/teal IBL
  // rims. (The "look over" body-facing is on the group, below.)
  useMemo(() => {
    const upgrade = (src: THREE.Material) => {
      const p = new THREE.MeshPhysicalMaterial();
      p.copy(src as THREE.MeshStandardMaterial);
      p.sheen = 1;
      p.sheenRoughness = 0.6;
      p.sheenColor = new THREE.Color("#e6ecff");
      p.clearcoat = 0.22;
      p.clearcoatRoughness = 0.5;
      p.envMapIntensity = 1.1;
      return p;
    };
    model.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.castShadow = true;
        m.frustumCulled = false; // it travels far down the y-axis
        m.material = Array.isArray(m.material) ? m.material.map(upgrade) : upgrade(m.material);
      }
    });
  }, [model]);

  const lookEul = useRef(new THREE.Euler());
  const lookOff = useRef(new THREE.Quaternion());

  // Normalize unknown native scale/origin: scale to TARGET_HEIGHT, drop feet to
  // y=0, centre on x/z. Done once against the cloned model.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = size.y > 0 ? TARGET_HEIGHT / size.y : 1;
    return {
      scale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s] as const,
    };
  }, [model]);

  // Start BOTH clips but PAUSED — the mixer must not advance them on real time.
  // We set each action's `.time` from scroll every frame, so motion only ever
  // happens while scrolling (and reverses when scrolling back).
  useEffect(() => {
    for (const name of ["moon_walk", "floating", "idle"] as const) {
      const a = actions[name];
      if (a) {
        a.play();
        a.paused = true;
      }
    }
    return () => void mixer.stopAllAction();
  }, [actions, mixer]);

  useFrame(() => {
    const c = scroll.frame.character;
    const p = scroll.smooth; // scrub everything off the smoothed scroll value
    const vt = visit.t; // 0 (falling) → 1 (hovering at a planet)
    const g = outer.current;
    if (g) {
      // position: the fall trajectory — scroll-reveal keeps him FALLING (no
      // fly-to). Shared via visit.charPos for the over-the-shoulder camera.
      g.position.set(c.position[0], c.position[1], c.position[2]);
      visit.charPos[0] = c.position[0];
      visit.charPos[1] = c.position[1];
      visit.charPos[2] = c.position[2];
      // walk facing, then forward pitch by diveBlend — the visit UPRIGHTS him.
      const dive = c.diveBlend * (1 - vt);
      pitchQuat.current.setFromAxisAngle(PITCH_AXIS, DIVE_PITCH * dive);
      g.quaternion.multiplyQuaternions(pitchQuat.current, walkQuat);
      // REVEAL: yaw the whole BODY (world-y) to FACE the project planet as he
      // passes its altitude, so the over-the-shoulder camera sees his back with
      // the planet ahead.
      if (vt > 0.001 && visit.index >= 0) {
        const pp = PLANETS[visit.index].position;
        const yaw = Math.atan2(-(pp[2] - c.position[2]), pp[0] - c.position[0]) * vt;
        faceQuat.current.setFromAxisAngle(Y_AXIS, yaw);
        g.quaternion.premultiply(faceQuat.current);
      }
    }

    // Scrub the walk clip across the walk phase; weight fades out as he leaps.
    const walk = actions["moon_walk"];
    if (walk) {
      const wp = clamp01(p / PHASE.walkEnd);
      const dur = walk.getClip().duration;
      walk.time = (wp * dur * WALK_CYCLES) % dur;
      walk.setEffectiveWeight(1 - smoothstep(BLEND_LO, BLEND_HI, p));
    }

    // Scrub the float clip across the fall; weight fades in as he leaps, and
    // fades back OUT during the landing flare.
    const floatA = actions["floating"];
    if (floatA) {
      const fp = clamp01((p - PHASE.walkEnd) / (1 - PHASE.walkEnd));
      const dur = floatA.getClip().duration;
      floatA.time = (fp * dur * FLOAT_CYCLES) % dur;
      floatA.setEffectiveWeight(
        smoothstep(BLEND_LO, BLEND_HI, p) * (1 - smoothstep(FLARE_LO, FLARE_HI, p)) * (1 - vt),
      );
    }

    // Idle (standing) fades in for the touchdown AND during a planet visit (he
    // hovers in a calm standing pose rather than the zero-g spread).
    const idle = actions["idle"];
    if (idle) {
      const dur = idle.getClip().duration;
      idle.time = clamp01((p - FLARE_LO) / (1 - FLARE_LO)) * dur; // settle one cycle
      idle.setEffectiveWeight(Math.max(smoothstep(FLARE_LO, FLARE_HI, p), vt));
    }
  });

  return (
    <group ref={outer} dispose={null}>
      <group ref={inner} scale={fit.scale} position={fit.offset as unknown as [number, number, number]}>
        <primitive object={model} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL, true);
