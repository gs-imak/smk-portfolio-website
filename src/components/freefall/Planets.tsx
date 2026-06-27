import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";
import { scroll } from "./useScrollStore";
import { PLANETS, type PlanetDef } from "./visit";

/**
 * The POPULATED space field — each a DIFFERENT day/night-lit world, fixed-size
 * at a fixed position so PERSPECTIVE alone makes them small specks in the
 * distance that grow as you fall past them. Clean body + ring (no halo).
 *
 * The whole field is HIDDEN until just after the leap (opacity gate on scroll),
 * so none are visible while he's still on the platform — then they fade in as he
 * drops into space. Pure background vibe, no interaction.
 */

export const SUN = new THREE.Vector3(0.5, 0.32, 0.6).normalize();

const BODY_VERT = /* glsl */ `
  varying vec2 vUv; varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const BODY_FRAG = /* glsl */ `
  uniform sampler2D uMap; uniform vec3 uSun;
  varying vec2 vUv; varying vec3 vN;
  vec3 toLin(vec3 c){ return mix(c/12.92, pow((c+0.055)/1.055, vec3(2.4)), step(0.04045, c)); }
  void main() {
    vec3 albedo = toLin(texture2D(uMap, vUv).rgb);
    float l = dot(normalize(vN), uSun);
    // WIDE wrap terminator + high ambient floor → the texture reads across the
    // WHOLE sphere, not buried in a dark mass.
    float day = smoothstep(-0.7, 0.6, l);
    gl_FragColor = vec4(albedo * (0.62 + 0.7 * day), 1.0);
  }
`;

function Planet({ texture, position, radius, ring, tilt = 0.4 }: PlanetDef) {
  const map = useTexture(texture);
  map.colorSpace = THREE.NoColorSpace;
  map.anisotropy = 8;
  const grp = useRef<Group>(null);

  const ringTex = useTexture("/textures/space/8k_saturn_ring_alpha.png");
  ringTex.colorSpace = THREE.SRGBColorSpace;
  const ringGeo = useMemo(() => {
    if (!ring) return null;
    const inner = radius * 1.28;
    const outer = radius * 2.3;
    const g = new THREE.RingGeometry(inner, outer, 180, 1);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [ring, radius]);

  const bodyU = useMemo(() => ({ uMap: { value: map }, uSun: { value: SUN } }), [map]);

  useFrame(() => {
    if (grp.current) grp.current.rotation.y += 0.0005; // slow, stately drift
  });

  // OPAQUE body (no transparency → no per-frame transparent re-sort = no flicker
  // while scrolling). The whole field is shown/hidden as a unit (parent gate).
  return (
    <group ref={grp} position={position} rotation={[0.22, tilt, 0.08]}>
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial vertexShader={BODY_VERT} fragmentShader={BODY_FRAG} uniforms={bodyU} fog={false} />
      </mesh>
      {ring && ringGeo && (
        <mesh geometry={ringGeo} rotation={[Math.PI / 2.05, 0.12, 0]}>
          <meshBasicMaterial map={ringTex} transparent side={THREE.DoubleSide} depthWrite={false} fog={false} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

export function Planets() {
  const grp = useRef<Group>(null);

  // Hidden as a UNIT until just after the leap (binary visibility — no opacity
  // fade, so nothing renders transparent and there's no scroll flicker). They're
  // small/distant at p≈0.22 so appearing is subtle, not a "pop".
  useFrame(() => {
    if (grp.current) grp.current.visible = scroll.smooth > 0.22;
  });

  return (
    <group ref={grp} visible={false}>
      {PLANETS.map((p, i) => (
        <Planet key={i} {...p} />
      ))}
    </group>
  );
}
