import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { DirectionalLight } from "three";
import { scroll } from "./useScrollStore";

/**
 * Key + fill are DIRECTIONAL lights (uniform, no distance falloff) — that is
 * what keeps the obsidian lit through the whole descent. Both follow the
 * character: position = character + the prototype's offset, and the TARGET is
 * the character too, so the lighting ANGLE on him stays constant. (The
 * prototype left targets at the origin and relied on its faceted placeholder
 * catching env-rim; our smooth real model needs the lit side kept toward the
 * camera, so we re-target onto the character — a faithful read of §6's
 * "lights follow the character so he stays lit".)
 */
export function Lighting() {
  const key = useRef<DirectionalLight>(null);
  const fill = useRef<DirectionalLight>(null);

  useFrame(() => {
    const { character, lights } = scroll.frame;
    const c = character.position;
    if (key.current) {
      key.current.position.set(lights.key[0], lights.key[1], lights.key[2]);
      key.current.target.position.set(c[0], c[1], c[2]);
      key.current.target.updateMatrixWorld();
    }
    if (fill.current) {
      fill.current.position.set(lights.fill[0], lights.fill[1], lights.fill[2]);
      fill.current.target.position.set(c[0], c[1], c[2]);
      fill.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <hemisphereLight args={[0x4a3f7a, 0x0a0814, 0.4]} />
      {/* violet key */}
      <directionalLight ref={key} color={0xc9b8ff} intensity={2.2} />
      {/* teal rim / fill */}
      <directionalLight ref={fill} color={0x5fe0c8} intensity={1.5} />
    </>
  );
}
