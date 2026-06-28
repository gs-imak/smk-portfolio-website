import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { smoothstep } from "./choreography";

/**
 * The platform he walks along and leaps off. Static at y≈0 (top surface at 0,
 * where the character's feet sit). It FADES OUT right after the leap (p0.14→0.22)
 * so it never lingers at the bottom of frame during the fall. (The original plan
 * relied on the camera angle to clear it, but with the faster jump + tighter
 * follow-camera it stayed in view — Georges wanted it gone, so it fades.)
 *
 * Geometry: slab Box(7,0.5,3.2) at x=-1.4, glowing leap-edge strip at x=2.0. The
 * two boxes don't overlap, so fading them transparent can't z-fight/re-sort.
 */
export function Platform() {
  const grp = useRef<THREE.Group>(null);
  const slab = useRef<THREE.MeshStandardMaterial>(null);
  const edge = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const g = grp.current;
    if (!g) return;
    const o = 1 - smoothstep(0.14, 0.22, scroll.smooth); // solid through the jump, gone after
    g.visible = o > 0.01;
    if (!g.visible) return;
    if (slab.current) slab.current.opacity = o;
    if (edge.current) edge.current.opacity = o;
  });

  return (
    <group ref={grp}>
      <mesh position={[-1.4, -0.25, 0]} receiveShadow>
        <boxGeometry args={[7, 0.5, 3.2]} />
        <meshStandardMaterial ref={slab} color={0x16142a} roughness={0.75} metalness={0.25} transparent />
      </mesh>
      {/* glowing leap edge */}
      <mesh position={[2.0, -0.24, 0]}>
        <boxGeometry args={[0.2, 0.5, 3.2]} />
        <meshStandardMaterial ref={edge} color={0x7c5cff} emissive={0x7c5cff} emissiveIntensity={0.6} roughness={0.4} transparent />
      </mesh>
    </group>
  );
}
