import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { GROUND_Y } from "./choreography";

/**
 * The CLOUD DECK — the money shot. A wide, thin slab of drei volumetric cloud
 * puffs parked at the altitude the character reaches around the whiteout
 * (p≈0.72 → world y≈-40), graded into the palette (cool white + faint
 * violet/teal). He physically PLUNGES THROUGH it; the fog-density spike at the
 * same band supplies the brief whiteout envelop.
 *
 * The whole deck's opacity tracks `atmosphere.cloudDensity` (0 in deep space →
 * 1 at the whiteout → 0 at the warm ground) so the clouds only ever exist
 * around the deck and never float in the clean void above. Driven per-frame
 * off the scroll singleton — no React re-render. `speed=0` keeps the forms
 * static (client rule: motion only on scroll; his fall is the motion).
 */

const TEX = "/textures/cloud.png";
// Centre of the slab in world space. x≈7 matches the character's fall lane;
// y=-40 is where he is at the whiteout peak. Live-tunable.
// Earth's ATMOSPHERE — a cloud layer hugging the globe's top (surface at
// GROUND_Y) that he plunges through right before touchdown. NOT in space.
// Anchored to GROUND_Y so it stays glued to the surface if the fall depth changes.
export const cloudDeckTuning = { x: 7, y: GROUND_Y + 8, z: 0 };

export function CloudDeck() {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const d = scroll.atmosphere.cloudDensity;
    g.visible = d > 0.01;
    if (!g.visible) return;
    g.position.set(cloudDeckTuning.x, cloudDeckTuning.y, cloudDeckTuning.z);
    // Scale the deck's overall opacity by cloudDensity (drei's instanced cloud
    // material is a MeshLambertMaterial — opacity is a global multiplier on top
    // of the per-segment instance opacity).
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m && "opacity" in m) {
        m.transparent = true;
        (m as THREE.Material & { opacity: number }).opacity = d;
      }
    });
  });

  return (
    <group ref={ref} position={[cloudDeckTuning.x, cloudDeckTuning.y, cloudDeckTuning.z]}>
      <Clouds texture={TEX} limit={500} range={120}>
        <Cloud seed={1} segments={42} bounds={[64, 7, 48]} volume={10} color="#e2e8f4" growth={6} speed={0} fade={40} />
        <Cloud seed={4} segments={30} bounds={[54, 6, 42]} volume={8} color="#cdbcff" growth={5} speed={0} fade={36} position={[8, 2.5, -7]} />
        <Cloud seed={7} segments={26} bounds={[46, 5, 36]} volume={7} color="#bfeae1" growth={4} speed={0} fade={32} position={[-9, -2.5, 9]} />
      </Clouds>
    </group>
  );
}
