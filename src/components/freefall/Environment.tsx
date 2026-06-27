import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment as DreiEnvironment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import type { RGB } from "./atmosphere";

/**
 * The void: a back-side gradient sky dome that follows the camera, exponential
 * fog for depth, a deep-space starfield, a procedural canvas-gradient
 * environment map for the obsidian reflections, and a field of drifting motes.
 *
 * The sky gradient, fog (colour + density) and star visibility are now DRIVEN
 * by the altitude atmosphere engine (`atmosphere.ts` → `scroll.atmosphere`),
 * recomputed each frame in <ScrollSmoother> before this component reads it. So
 * the world transforms with the descent: deep space → cloud-deck whiteout →
 * warm ground. (The env-map stays a "replace with a real HDRI later" upgrade.)
 */

const SKY_VERT = /* glsl */ `
  varying float vY;
  void main() {
    vY = position.y / 160.0; // normalize to [-1,1] (sphere radius 160)
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
// Void gradient: three live stops (top / mid / bottom of the dome), fed by the
// atmosphere engine. The keyframe colours are authored in sRGB; we linearize
// them here and mix in linear, because the scene is rendered through the
// postprocessing EffectComposer whose final pass applies the sRGB OETF on
// output (the colour-managed path the fog + materials already use). Without
// this the dark space stops would be sRGB-encoded a second time and wash out to
// violet.
const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uMid;
  uniform vec3 uBot;
  varying float vY;
  vec3 toLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }
  void main() {
    float h = clamp(vY * 0.5 + 0.5, 0.0, 1.0);
    vec3 top = toLinear(uTop);
    vec3 mid = toLinear(uMid);
    vec3 bot = toLinear(uBot);
    vec3 c = h > 0.5 ? mix(mid, top, (h - 0.5) * 2.0) : mix(bot, mid, h * 2.0);
    gl_FragColor = vec4(c, 1.0);
  }
`;

function SkyDome() {
  const ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Vector3() },
      uMid: { value: new THREE.Vector3() },
      uBot: { value: new THREE.Vector3() },
    }),
    [],
  );

  // Follow the camera so the gradient is always "around" the viewer, and pull
  // the live gradient stops from the atmosphere engine.
  useFrame(() => {
    ref.current?.position.copy(camera.position);
    const a = scroll.atmosphere;
    uniforms.uTop.value.set(a.skyTop[0], a.skyTop[1], a.skyTop[2]);
    uniforms.uMid.value.set(a.skyMid[0], a.skyMid[1], a.skyMid[2]);
    uniforms.uBot.value.set(a.skyBottom[0], a.skyBottom[1], a.skyBottom[2]);
  });

  return (
    <mesh ref={ref} scale={[1, 1, 1]} renderOrder={-1}>
      <sphereGeometry args={[160, 32, 16]} />
      <shaderMaterial
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

/**
 * Deep-space starfield — a shell of points around the viewer. Its opacity
 * tracks `atmosphere.starDensity` (dense in orbit → gone inside the cloud deck
 * → a few faint stars again at the warm ground). Follows the camera so it
 * always surrounds him, like the sky dome.
 */
function Starfield({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const tint = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // random direction on a sphere shell at radius ~150 (just inside the dome)
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const radius = 140 + Math.random() * 18;
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = u * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      // mostly cool-white, a few faintly violet/teal — graded to the palette
      tint.setHSL(0.55 + (Math.random() - 0.5) * 0.18, 0.25, 0.78 + Math.random() * 0.22);
      colors[i * 3] = tint.r;
      colors[i * 3 + 1] = tint.g;
      colors[i * 3 + 2] = tint.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const m = new THREE.PointsMaterial({
      size: 1.4,
      sizeAttenuation: false, // crisp constant-size star points
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.copy(camera.position);
    ref.current.rotation.y += 0.00015; // imperceptible drift
    material.opacity = scroll.atmosphere.starDensity;
    ref.current.visible = material.opacity > 0.001;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function Motes({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: 0xcfc8ff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  // Keep the mote field centred on the camera's vertical lane and drift gently.
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.y = camera.position.y;
    ref.current.rotation.y += dt * 0.02;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/**
 * Drives the scene fog (colour + density) from the atmosphere engine each frame,
 * and publishes the applied state to `window.__atmo` for headless verification
 * (the eased-frame screenshots lie about colour mid-transition — read the values).
 */
function FogDriver() {
  const { scene } = useThree();
  const tmp = useRef(new THREE.Color());
  useFrame(() => {
    const a = scroll.atmosphere;
    const fog = scene.fog;
    if (fog && (fog as THREE.FogExp2).isFogExp2) {
      const f = fog as THREE.FogExp2;
      // authored values are sRGB (matches `new THREE.Color(0xRRGGBB)`), so convert
      // from sRGB into the renderer's working colour space.
      tmp.current.setRGB(a.fogColor[0], a.fogColor[1], a.fogColor[2], THREE.SRGBColorSpace);
      f.color.copy(tmp.current);
      f.density = a.fogDensity;
    }
    if (typeof window !== "undefined") {
      const fmt = (c: RGB) => [+c[0].toFixed(3), +c[1].toFixed(3), +c[2].toFixed(3)];
      (window as unknown as { __atmo?: unknown }).__atmo = {
        p: +scroll.smooth.toFixed(3),
        band: a.band,
        fogColor: fmt(a.fogColor),
        fogDensity: +a.fogDensity.toFixed(4),
        skyTop: fmt(a.skyTop),
        skyBottom: fmt(a.skyBottom),
        starDensity: +a.starDensity.toFixed(3),
        cloudDensity: +a.cloudDensity.toFixed(3),
        sunIntensity: +a.sunIntensity.toFixed(3),
        lightColor: fmt(a.lightColor),
        lightIntensity: +a.lightIntensity.toFixed(3),
      };
    }
  });
  return null;
}

/**
 * Palette IBL — a drei <Environment> baked ONCE from a few <Lightformer> rects
 * (violet key + teal rim + soft white + dark space fill). This is what makes the
 * white suit, the planet materials and the visor all read filmic + cohesive, in
 * the exact violet/teal palette (you can't get designed rims from a stock HDRI).
 * `frames={1}` bakes once → zero per-frame cost; 256px → light enough for SwiftShader.
 */
function PaletteIBL() {
  return (
    <DreiEnvironment frames={1} resolution={256} background={false}>
      {/* dark space fill so reflections aren't pure black */}
      <Lightformer form="rect" intensity={0.25} color="#0b0a1e" scale={[40, 40, 1]} position={[0, 0, -12]} />
      {/* soft white key from above */}
      <Lightformer form="rect" intensity={0.9} color="#ffffff" scale={[10, 5, 1]} position={[0, 8, 4]} rotation={[Math.PI / 2, 0, 0]} />
      {/* violet rim, upper-left */}
      <Lightformer form="rect" intensity={2.2} color="#7C5CFF" scale={[7, 9, 1]} position={[-9, 3, -5]} rotation={[0, Math.PI / 4, 0]} />
      {/* teal rim, lower-right */}
      <Lightformer form="rect" intensity={1.7} color="#5FE0C8" scale={[7, 8, 1]} position={[9, -3, -4]} rotation={[0, -Math.PI / 4, 0]} />
    </DreiEnvironment>
  );
}

export function Environment() {
  return (
    <>
      <PaletteIBL />
      <FogDriver />
      <SkyDome />
      <Starfield />
      <Motes />
    </>
  );
}
