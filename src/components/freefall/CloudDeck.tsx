import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { GROUND_Y, smoothstep } from "./choreography";

/**
 * The CLOUD DECK — a thin slab of drei volumetric puffs just above the Earth
 * surface (GROUND_Y). You SEE it from above as you approach, then it FADES OUT
 * right before the camera reaches it and the fog-density whiteout takes over.
 *
 * Why the fade-before-entry: drei's instanced billboard segments are alpha-blended
 * and depth-sorted by camera distance EVERY frame. If the camera plunges THROUGH
 * the volume, the segment sort order flips frame-to-frame → the composited stack
 * changes each frame → a hard STROBE. So we never render the billboards from
 * inside: opacity ramps to 0 as the camera nears the deck (depthWrite off too, so
 * the segments can't depth-fight). The fog whiteout supplies the "inside cloud"
 * envelope instead. `speed=0` keeps forms static (motion only on scroll).
 */

const TEX = "/textures/cloud.png";
// Centre of the slab — hugs the surface (GROUND_Y), in the fall lane.
export const cloudDeckTuning = { x: 7, y: GROUND_Y + 8, z: 0 };

export function CloudDeck() {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const d = scroll.atmosphere.cloudDensity;
    // Fade the deck OUT as the camera drops to within ~20u of it, so the billboards
    // are only ever drawn while the camera is comfortably ABOVE them (looking down)
    // — never from inside, which is what re-sorts and strobes.
    const above = smoothstep(cloudDeckTuning.y + 2, cloudDeckTuning.y + 22, camera.position.y);
    const o = d * 0.85 * above;
    g.visible = o > 0.01;
    if (!g.visible) return;
    g.position.set(cloudDeckTuning.x, cloudDeckTuning.y, cloudDeckTuning.z);
    g.traverse((node) => {
      const m = (node as THREE.Mesh).material as (THREE.Material & { opacity: number }) | undefined;
      if (m && "opacity" in m) {
        m.transparent = true;
        m.depthWrite = false; // segments only depth-TEST → can't z-fight each other or Earth
        m.opacity = o;
      }
    });
  });

  return (
    <group ref={ref} position={[cloudDeckTuning.x, cloudDeckTuning.y, cloudDeckTuning.z]}>
      <Clouds texture={TEX} limit={200} range={90}>
        <Cloud seed={1} segments={18} bounds={[64, 7, 48]} volume={10} color="#e2e8f4" growth={6} speed={0} fade={40} />
        <Cloud seed={4} segments={14} bounds={[54, 6, 42]} volume={8} color="#cdbcff" growth={5} speed={0} fade={36} position={[8, 2.5, -7]} />
        <Cloud seed={7} segments={12} bounds={[46, 5, 36]} volume={7} color="#bfeae1" growth={4} speed={0} fade={32} position={[-9, -2.5, 9]} />
      </Clouds>
    </group>
  );
}
