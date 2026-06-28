import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { InstancedMesh } from "three";
import { PLANETS } from "./visit";

/**
 * A scattered ASTEROID / debris field drifting through the fall — organic, not
 * lined up. Procedural lumpy rocks (noise-displaced icosahedra, flat-shaded so
 * they read faceted), instanced for ~free perf, in a loose RING around the fall
 * lane (never blocking centre) across the whole space descent. Lit by the scene
 * sun + violet/teal IBL so they sit in the palette. Static (the camera falling
 * past IS the motion); gated to space only (hidden at the platform + gone before
 * the atmosphere).
 */

const VARIANTS = 4;
const PER = 30; // per variant → 120 rocks
const LANE = new THREE.Vector3(8, 0, 0); // the fall lane (x), keep the centre clear

function makeRock(detail: number, seed: number) {
  const g = new THREE.IcosahedronGeometry(1, detail);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    n.copy(v).normalize();
    // layered sine "noise" → irregular lumps + a couple of deep gouges
    const d =
      0.24 * Math.sin(v.x * 3.1 + seed) +
      0.17 * Math.sin(v.y * 4.3 + seed * 1.7) +
      0.13 * Math.sin(v.z * 2.7 + seed * 2.3) +
      0.08 * Math.sin((v.x + v.z) * 6.1 + seed) +
      0.06 * Math.sin((v.y - v.x) * 8.3 + seed * 3.1);
    v.addScaledVector(n, d);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

export function Asteroids() {
  const meshes = useRef<(InstancedMesh | null)[]>([]);

  const geos = useMemo(() => Array.from({ length: VARIANTS }, (_, i) => makeRock(1 + (i % 2), 1.3 + i * 2.6)), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#73685c"),
        roughness: 0.97,
        metalness: 0.04,
        flatShading: true,
        envMapIntensity: 0.75,
        fog: false,
      }),
    [],
  );

  // Per-instance transforms + a little colour variation (cool grey → warm brown).
  const data = useMemo(() => {
    const tint = new THREE.Color();
    // Keep WELL CLEAR of every planet (debris never touches/blocks a world).
    const clearOfPlanets = (x: number, y: number, z: number) =>
      !PLANETS.some((pl) => {
        const dx = x - pl.position[0];
        const dy = y - pl.position[1];
        const dz = z - pl.position[2];
        return dx * dx + dy * dy + dz * dz < (pl.radius + 12) * (pl.radius + 12);
      });
    const pickPos = () => {
      for (let t = 0; t < 24; t++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = 16 + Math.pow(Math.random(), 0.7) * 30; // 16..46 from the lane
        const x = LANE.x + Math.cos(ang) * rad;
        const z = Math.sin(ang) * rad;
        const y = -10 - Math.random() * 258;
        if (clearOfPlanets(x, y, z)) return new THREE.Vector3(x, y, z);
      }
      // fallback: push it far out to the side
      const s = Math.random() < 0.5 ? -1 : 1;
      return new THREE.Vector3(LANE.x + s * 42, -10 - Math.random() * 258, (Math.random() < 0.5 ? -1 : 1) * 42);
    };
    return Array.from({ length: VARIANTS }, () =>
      Array.from({ length: PER }, () => {
        const u = Math.random();
        // Debris is SMALL — always far under planet size (planets are r 2.8–7.5).
        const scale = 0.14 + Math.pow(u, 2.6) * 1.4; // 0.14 .. ~1.5
        tint.setHSL(0.06 + (Math.random() - 0.5) * 0.06, 0.18 + Math.random() * 0.12, 0.34 + Math.random() * 0.22);
        return {
          pos: pickPos(),
          rot: new THREE.Euler(Math.random() * 6.283, Math.random() * 6.283, Math.random() * 6.283),
          scale,
          color: tint.clone(),
        };
      }),
    );
  }, []);

  // Bake the instance matrices + colours once (static field; perspective is the motion).
  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let vi = 0; vi < VARIANTS; vi++) {
      const m = meshes.current[vi];
      if (!m) continue;
      data[vi].forEach((a, i) => {
        dummy.position.copy(a.pos);
        dummy.rotation.copy(a.rot);
        dummy.scale.setScalar(a.scale);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        m.setColorAt(i, a.color);
      });
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
  }, [data]);

  useEffect(() => () => geos.forEach((g) => g.dispose()), [geos]);
  useEffect(() => () => mat.dispose(), [mat]);

  // ALWAYS rendered (no gate, no pop) — debris simply drifts there; perspective
  // grows it as you fall past. Capped above the atmosphere so it thins out
  // naturally before touchdown.
  return (
    <group>
      {geos.map((g, i) => (
        <instancedMesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          args={[g, mat, PER]}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}
