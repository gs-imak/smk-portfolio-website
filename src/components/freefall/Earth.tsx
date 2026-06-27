import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh } from "three";
import { scroll } from "./useScrollStore";
import { GROUND_Y, smoothstep } from "./choreography";
import { SUN } from "./Planets";

/**
 * EARTH — the landing destination, film-grade. A huge sphere whose surface top
 * sits at GROUND_Y, so the character touches down ON it. Custom day/night body
 * shader: the 8K day map on the sunlit side, and the night map's CITY LIGHTS on
 * the dark side, blended across a terminator (same fixed SUN as the planets). A
 * separate drifting cloud shell (lit by the sun) + a fresnel atmosphere that
 * dies on the dark limb. Resolves below as he breaks out of the cloud deck.
 */

// Earth is a GLOBE he approaches — small enough to read as a distant planet
// early (then grow via perspective as he falls toward it), big enough to land
// on with a gently curved horizon. Surface top sits at GROUND_Y so he touches
// down ON it. (Was 340 ≈ a flat wall right at the ground that could only pop in
// already-huge.) Smaller R also = far less texture over-zoom at touchdown.
// Sized so that over the 150-unit fall it reads as a SMALL distant globe early
// and grows believably into the planet he lands on (R88 filled the frame from
// a third of the way down; 340 was a flat wall). Surface top still at GROUND_Y.
const R = 40;
// Resolve LATE — only past the midpoint, after you've fallen through the whole
// spread-out planet field. Fades in small/distant (perspective then grows it as
// you close on it) so Earth doesn't rush into view early. No pop.
const reveal = (p: number) => smoothstep(0.58, 0.82, p);

const BODY_VERT = /* glsl */ `
  varying vec2 vUv; varying vec3 vN;
  void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const BODY_FRAG = /* glsl */ `
  uniform sampler2D uDay; uniform sampler2D uNight; uniform vec3 uSun; uniform float uOpacity; uniform float uClose;
  varying vec2 vUv; varying vec3 vN;
  vec3 toLin(vec3 c){ return mix(c/12.92, pow((c+0.055)/1.055, vec3(2.4)), step(0.04045, c)); }
  void main(){
    vec3 day = toLin(texture2D(uDay, vUv).rgb);
    vec3 night = toLin(texture2D(uNight, vUv).rgb);
    float l = dot(normalize(vN), uSun);
    float dayMix = smoothstep(-0.10, 0.28, l);
    vec3 col = day * (0.03 + 1.1 * dayMix) + night * (1.0 - dayMix) * 1.4; // city lights on dark side
    // At touchdown the camera is hard against the surface (texture over-zoomed →
    // a white blowout). Dim + warm it into a dusk ground so it reads as LAND.
    col = mix(col, col * vec3(0.42, 0.34, 0.3), uClose);
    gl_FragColor = vec4(col, uOpacity);
  }
`;
const CLOUD_FRAG = /* glsl */ `
  uniform sampler2D uClouds; uniform vec3 uSun; uniform float uOpacity;
  varying vec2 vUv; varying vec3 vN;
  void main(){
    float c = texture2D(uClouds, vUv).r;
    float l = smoothstep(-0.10, 0.32, dot(normalize(vN), uSun));
    vec3 col = vec3(1.0) * (0.06 + 0.95 * l);
    gl_FragColor = vec4(col, c * uOpacity);
  }
`;
const ATM_VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main(){ vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp; }
`;
const ATM_FRAG = /* glsl */ `
  uniform vec3 uColor; uniform float uIntensity; uniform vec3 uSun;
  varying vec3 vN; varying vec3 vV;
  void main(){
    float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.5);
    float lit = smoothstep(-0.3, 0.5, dot(normalize(vN), uSun));
    gl_FragColor = vec4(uColor * f * lit, f * lit) * uIntensity;
  }
`;

export function Earth() {
  const [day, night, clouds] = useTexture([
    "/textures/space/8k_earth_daymap.jpg",
    "/textures/space/8k_earth_nightmap.jpg",
    "/textures/space/8k_earth_clouds.jpg",
  ]);
  for (const t of [day, night, clouds]) {
    t.colorSpace = THREE.NoColorSpace; // raw → linearized in-shader
    t.anisotropy = 8;
  }

  const grp = useRef<Group>(null);
  const cloudMesh = useRef<Mesh>(null);
  const bodyRef = useRef<THREE.ShaderMaterial>(null);
  const cloudRef = useRef<THREE.ShaderMaterial>(null);
  const atmRef = useRef<THREE.ShaderMaterial>(null);

  const bodyU = useMemo(() => ({ uDay: { value: day }, uNight: { value: night }, uSun: { value: SUN }, uOpacity: { value: 0 }, uClose: { value: 0 } }), [day, night]);
  const cloudU = useMemo(() => ({ uClouds: { value: clouds }, uSun: { value: SUN }, uOpacity: { value: 0 } }), [clouds]);
  const atmU = useMemo(() => ({ uColor: { value: new THREE.Color("#7fb4ff") }, uIntensity: { value: 0 }, uSun: { value: SUN } }), []);
  const center = useMemo(() => [8, GROUND_Y - R, 0] as [number, number, number], []);

  useFrame(() => {
    const g = grp.current;
    if (!g) return;
    const r = reveal(scroll.smooth);
    g.visible = r > 0.01;
    if (!g.visible) return;
    if (cloudMesh.current) cloudMesh.current.rotation.y += 0.00012;
    if (bodyRef.current) {
      bodyRef.current.uniforms.uOpacity.value = r;
      bodyRef.current.uniforms.uClose.value = smoothstep(0.92, 1.0, scroll.smooth);
    }
    if (cloudRef.current) cloudRef.current.uniforms.uOpacity.value = 0.9 * r;
    // Atmosphere rim glows on the limb from a distance, but FADE it as he gets
    // right up against the surface (close = washes the whole frame otherwise).
    const close = smoothstep(0.9, 1.0, scroll.smooth); // 0 far → 1 at touchdown
    if (atmRef.current) atmRef.current.uniforms.uIntensity.value = (2.4 - 1.7 * close) * r;
  });

  return (
    <group ref={grp} position={center}>
      <mesh>
        <sphereGeometry args={[R, 160, 160]} />
        <shaderMaterial ref={bodyRef} vertexShader={BODY_VERT} fragmentShader={BODY_FRAG} uniforms={bodyU} transparent fog={false} />
      </mesh>
      <mesh ref={cloudMesh} scale={1.004}>
        <sphereGeometry args={[R, 96, 96]} />
        <shaderMaterial ref={cloudRef} vertexShader={BODY_VERT} fragmentShader={CLOUD_FRAG} uniforms={cloudU} transparent depthWrite={false} fog={false} />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[R, 64, 64]} />
        <shaderMaterial ref={atmRef} vertexShader={ATM_VERT} fragmentShader={ATM_FRAG} uniforms={atmU} transparent blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.FrontSide} fog={false} />
      </mesh>
    </group>
  );
}
