import { type ComponentRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, GodRays, ToneMapping, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { GROUND_Y } from "./choreography";

/**
 * The SUN + volumetric GOD-RAYS — the cloud-deck money shot.
 *
 * The sun sits BELOW the entire fall (just under GROUND_Y) so the belly-down
 * diver never falls past it — its screen projection therefore stays in front of
 * the camera the whole way down and can NEVER sign-flip. (That flip, back when
 * the sun was mid-fall, was the scroll strobe.) The rays glow up through the
 * cloud gaps toward him near touchdown.
 *
 * GodRays is ALWAYS mounted; we gate only its blend OPACITY (a uniform, via ref)
 * with `atmosphere.sunIntensity` — 0 through the clean space/planet descent so it
 * contributes nothing, ramping up only at the deck. NO conditional mount / no
 * setState in the loop: toggling EffectComposer children rebuilds (recompiles)
 * the whole effect chain every frame and HARD-FREEZES the page.
 *
 * NOTE: we do NOT import from `postprocessing` directly (nested under
 * @react-three/postprocessing, unresolvable from app code).
 */

// Sun disc world position + base radius — below the cloud deck / surface, in the
// fall lane. Anchored to GROUND_Y so it tracks the surface if the fall deepens.
export const sunTuning = { x: 8, y: GROUND_Y - 40, z: -10, radius: 2.7 };

export function PostFX() {
  const sun = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const rays = useRef<ComponentRef<typeof GodRays>>(null);

  useFrame(() => {
    const a = scroll.atmosphere;
    // Confine the sun + rays to the cloud-deck money shot only (sunIntensity>0.25,
    // i.e. p≈0.85+). Before that — through the whole planet + Earth approach — the
    // disc and rays are fully off, so no stray sun square hangs over the descent.
    const gate = Math.min(1, Math.max(0, (a.sunIntensity - 0.25) / 0.5));
    const s = sun.current;
    if (s) {
      s.position.set(sunTuning.x, sunTuning.y, sunTuning.z);
      s.scale.setScalar(sunTuning.radius * (0.55 + 0.6 * a.sunIntensity));
      s.visible = gate > 0.001;
    }
    if (mat.current) {
      mat.current.color.setRGB(a.sunColor[0], a.sunColor[1], a.sunColor[2], THREE.SRGBColorSpace);
      mat.current.opacity = gate;
    }
    // Gate the god-ray contribution by opacity (0 until the deck → no rays, no
    // strobe). Smooth uniform write — no remount, no recompile, no freeze.
    if (rays.current) rays.current.blendMode.opacity.value = gate;
  });

  return (
    <>
      <mesh ref={sun} position={[sunTuning.x, sunTuning.y, sunTuning.z]} visible={false}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial ref={mat} color="#fff7db" transparent toneMapped={false} fog={false} />
      </mesh>
      <EffectComposer>
        <GodRays
          ref={rays}
          sun={sun as React.RefObject<THREE.Mesh>}
          samples={80}
          density={0.95}
          decay={0.94}
          weight={0.8}
          exposure={0.45}
          clampMax={1}
          blur
        />
        {/* cinematic grade — re-adds the "punch" AgX intentionally holds back */}
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
        {/* AgX tonemap — MUST be last (composer forces NoToneMapping otherwise). */}
        <ToneMapping mode={7} />
      </EffectComposer>
    </>
  );
}
