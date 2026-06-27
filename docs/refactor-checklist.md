# Freefall R3F — Refactor Checklist (audit, 2026-06-27)

5-agent code audit. Behaviour must stay pixel-identical (internal only). Run `choreography.test.mts` + `atmosphere.test.mts` after.

## 1. Extract / dedupe
- **`freefall/shaders.ts`** (biggest win) — `BODY_VERT` (identical Earth+Planets), `ATM_VERT` (identical Earth+Planets), `TO_LINEAR_GLSL` chunk (written 4×: Earth `toLin`, Planets `toLin`, Environment `toLinear`), and an `atmFrag({power,litEdge0,litEdge1})` factory (Earth pow 2.5/edges -0.3,0.5; Planets pow 3.0/-0.25,0.45). Switch Earth/Planets/Environment to import.
- **Move `SUN`** out of `Planets.tsx` (Earth imports it component→component) into `shaders.ts`/`constants.ts`.
- **Export `clamp01` once** (dup'd 3×: choreography:102 not-exported, atmosphere:62, Astronaut:28) from choreography; import elsewhere.
- **`freefall/palette.ts`** named colour tokens (hexes retyped across Earth/Planets/Environment/Lighting/Holo/CloudDeck). Lower priority.
- **`<Atmosphere>` shell component** (after shaders.ts) — Earth+Planets repeat the shell mesh + 6 material flags.

## 2. Delete (grep-confirmed dead)
- **`Ground.tsx`** — entire file, imported nowhere (Earth replaced it in Scene3D).
- **`useScrollStore.ts` `ScrollUIState`+`useScrollStore`+`setProgress`** — write-only (no progress bar reads it). Keep the non-reactive `scroll` singleton; in LenisProvider keep only `scroll.target = p`.
- **`choreography.ts` `CharacterPose.limbs` + `.clip`** — never read (Astronaut scrubs off scroll.smooth). Remove from interface + characterPose (also drops 4 array allocs/frame).
- **`choreography.ts` `CameraPose.viewOffsetX`** — always 0; CameraRig overwrites `voff` anyway. Remove field; `let voff = 0`.
- **`choreography.ts` `CameraPose.tilt`** — always 0; CameraRig `if(cam.tilt)rotateX` is dead. Remove field + line.
- **Dead textures (~1.7MB):** `2k_jupiter/2k_mars/2k_saturn/2k_stars_milky_way.jpg` (zero refs).
- **Prototype `app/prototype/planet-view`** + its only-consumer `8k_stars_milky_way.jpg` — throwaway, imported by nothing (real planet flow is live). (Bug: it 404s on `2k_neptune.jpg` which doesn't exist — moot on delete.)
- KEEP all test/tuning exports (camTuning, atmosphereKeyframes, visitTuning, sunTuning, cloudDeckTuning, REDUCED_MOTION_P).

## 3. Perf (per-frame)
- **Preallocate the engine frames** (main win) — `computeFreefallFrame`+`computeAtmosphere` allocate ~20 objects/frame (character/limbs/camera/lights, ~9 RGB tuples). Mutate a preallocated struct in place.
- **CloudDeck traverse** — cache the drei Clouds material ref once, set transparent once, per-frame set only `.opacity`.
- **`__cam` (CameraRig) + `__atmo` (FogDriver) debug blocks** — gate `if (process.env.NODE_ENV !== "production")`, hoist the scratch Vector3.
- **Astronaut clip durations** — hoist `getClip().duration` (fetched every frame) to refs.
- Sphere tessellation 128-160 seg is fine for hero planets/Earth; far planets could LOD (`<Detailed>`).

NOTE: §2/§3 visit-related items (viewOffsetX) interact with the scroll-reveal redesign — apply after that lands.
