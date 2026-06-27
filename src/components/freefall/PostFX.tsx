import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, GodRays, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scroll } from "./useScrollStore";

/**
 * The SUN + volumetric GOD-RAYS — the heart of the cloud-deck money shot.
 *
 * Given the LOCKED third-person camera looks near-straight-DOWN onto the
 * belly-down skydiver, the cinematic read is a sun glowing BELOW the cloud deck
 * with shafts streaming UP through the cloud gaps toward him as he descends into
 * it. So the sun sits beneath the deck (world y well below it); its disc + the
 * god-ray shafts fade in with `atmosphere.sunIntensity` (0 in space, peaks at
 * the whiteout). Live-tunable via `sunTuning` (mutable, like camTuning).
 *
 * NOTE: we intentionally do NOT import symbols from `postprocessing` directly —
 * that package is nested under @react-three/postprocessing and isn't resolvable
 * from app code. GodRays' built-in defaults (SCREEN blend) are what we want.
 */

// World position of the sun disc + its base radius. Below the deck (y≈-40),
// in the character's fall lane (x≈8). Tune live on /freefall-test.
export const sunTuning = { x: 3.5, y: -100, z: -14, radius: 2.7 };

export function PostFX() {
  const sun = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const a = scroll.atmosphere;
    const s = sun.current;
    if (s) {
      s.position.set(sunTuning.x, sunTuning.y, sunTuning.z);
      // grow the disc a little with intensity so it "blooms" at the whiteout
      s.scale.setScalar(sunTuning.radius * (0.55 + 0.6 * a.sunIntensity));
      s.visible = a.sunIntensity > 0.02; // no sun (→ no rays) up in clean space
    }
    if (mat.current) {
      mat.current.color.setRGB(a.sunColor[0], a.sunColor[1], a.sunColor[2], THREE.SRGBColorSpace);
      mat.current.opacity = Math.min(1, a.sunIntensity);
    }
  });

  return (
    <>
      <mesh ref={sun} position={[sunTuning.x, sunTuning.y, sunTuning.z]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial
          ref={mat}
          color="#fff7db"
          transparent
          toneMapped={false}
          fog={false}
        />
      </mesh>
      <EffectComposer>
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
        {/* cinematic grade — re-adds the "punch" AgX intentionally holds back */}
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
      </EffectComposer>
    </>
  );
}
