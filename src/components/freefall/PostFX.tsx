import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, GodRays, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { GROUND_Y } from "./choreography";

/**
 * The SUN + volumetric GOD-RAYS — the cloud-deck money shot ONLY.
 *
 * The cinematic read is a sun glowing BELOW the cloud deck with shafts streaming
 * UP through the gaps toward the descending diver. The sun therefore sits beneath
 * the deck (just under GROUND_Y) and the rays fade in with `atmosphere.sunIntensity`
 * (0 in space, peaks at the whiteout).
 *
 * CRITICAL (fixes the scroll strobe): GodRays must be UNMOUNTED for the whole
 * space/planet descent. Its per-frame pass projects the sun to screen space; while
 * the belly-down camera falls PAST the sun the projection sits in the w≤0 / behind-
 * near-plane regime and snaps between the clamp extremes (−1 ↔ 2) every frame, so
 * the radial blur reverses direction frame-to-frame and SCREEN-blends a full-screen
 * flash = strobe. Hiding the sun mesh did NOT stop the pass from running. So we
 * conditionally MOUNT GodRays only when the sun is bright AND safely in FRONT of the
 * camera (view-space z < −near). It toggles once entering / leaving the deck, never
 * during the planet descent. Bloom + Vignette stay mounted always.
 *
 * NOTE: we do NOT import from `postprocessing` directly (nested under
 * @react-three/postprocessing, unresolvable from app code).
 */

// Sun disc world position + base radius. Below the cloud deck (which hugs
// GROUND_Y), in the fall lane. Anchored to GROUND_Y so it tracks the surface.
export const sunTuning = { x: 8, y: GROUND_Y - 40, z: -10, radius: 2.7 };

export function PostFX() {
  const { camera } = useThree();
  const sun = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const probe = useRef(new THREE.Vector3());
  const raysOnRef = useRef(false);
  const [raysOn, setRaysOn] = useState(false);

  useFrame(() => {
    const a = scroll.atmosphere;
    const s = sun.current;
    if (s) {
      s.position.set(sunTuning.x, sunTuning.y, sunTuning.z);
      s.scale.setScalar(sunTuning.radius * (0.55 + 0.6 * a.sunIntensity));
    }
    if (mat.current) {
      mat.current.color.setRGB(a.sunColor[0], a.sunColor[1], a.sunColor[2], THREE.SRGBColorSpace);
      mat.current.opacity = Math.min(1, a.sunIntensity);
    }
    // GodRays is SAFE only when the sun is bright AND in front of the camera.
    // view-space z must be comfortably past the near plane (negative = in front),
    // with a margin so it can't dither across the boundary frame-to-frame.
    let valid = false;
    if (s && a.sunIntensity > 0.06) {
      s.updateWorldMatrix(true, false);
      const vz = probe.current.setFromMatrixPosition(s.matrixWorld).applyMatrix4(camera.matrixWorldInverse).z;
      valid = vz < -(camera.near + 3);
    }
    if (s) s.visible = valid;
    if (valid !== raysOnRef.current) {
      raysOnRef.current = valid;
      setRaysOn(valid);
    }
  });

  return (
    <>
      <mesh ref={sun} position={[sunTuning.x, sunTuning.y, sunTuning.z]} visible={false}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial ref={mat} color="#fff7db" transparent toneMapped={false} fog={false} />
      </mesh>
      <EffectComposer>
        {raysOn && (
          <GodRays
            sun={sun as React.RefObject<THREE.Mesh>}
            samples={80}
            density={0.95}
            decay={0.94}
            weight={0.8}
            exposure={0.45}
            clampMax={1}
            blur
          />
        )}
        {/* cinematic grade — re-adds the "punch" AgX intentionally holds back */}
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
      </EffectComposer>
    </>
  );
}
