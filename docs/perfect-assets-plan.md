# SMK Freefall — "Perfect / Award-Grade" Asset + Polish Plan

Source: 6-agent web research (2026-06-27). Companion to `photoreal-roadmap.md`.

## 1. Models (winners)
| Element | Pick | URL | License | Access | Prep |
|---|---|---|---|---|---|
| **Platform** (hero fix) | DevPoly3D Sci-Fi Teleporter Pad (glowing ring already modeled) | sketchfab.com/3d-models/...ec178b39b6da429ea8d5a26f0981be77 | Free, attribution | **Sketchfab login (Epic)** | draco+KTX2 → split rim mat → recolor emissive teal `#2dd4bf`/violet `#7c3aed`, emissiveIntensity 2–4, scale to astronaut |
| Platform CC0 fallback | Quaternius Modular Sci-Fi MegaKit + Kenney Space Kit | quaternius.com/packs/modularscifimegakit.html · kenney.nl/assets/space-kit | **CC0** | **Direct** | assemble pad, obsidian body (metal .9/rough .35) + emissive rim |
| Far hero prop | NASA ISS (B) 466KB glb | science.nasa.gov/3d-resources/international-space-station-iss-b | Public Domain | **Direct** | add PBR + teal rim, draco |
| Mid parallax | Kenney Satellite Dish | poly.pizza/m/IDRrztoAMB | **CC0** | **Direct** | palette retex, slow tumble |
| Foreground motion | J-Toastie Asteroid (instance 2-3×) | poly.pizza/m/YS1jpm3mNr | **CC0** | **Direct** | InstancedMesh, varied scale/rot |
| Prop bin (opt) | Quaternius Ultimate Space Kit (antenna/solar) | quaternius.com/packs/ultimatespacekit.html | **CC0** | **Direct** | cherry-pick only |

**Restraint rule:** prop budget = ISS (far) + dish (mid) + 2-3 instanced asteroids (near), each on its own parallax layer. More competes with the planets. Platform is the only place worth a Sketchfab login.

## 2. HDRI
- **Use:** Space Spheremaps Blue/Multi Nebulae (real violet/teal nebula) — https://www.spacespheremaps.com/hdr-spheremaps/ (free, direct .hdr, no login). Ships 10k → **downscale to 1-2k** (PMREM blurs anyway).
- **Fallback (one CC0 file):** Poly Haven Dikhololo Night 1k — `https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dikhololo_night_1k.hdr`.
- Wire: `<Environment files="..." environmentIntensity={0.6} background={false}>` + keep Lightformers ON TOP (HDRI=reflection detail, Lightformers=palette key). **Animate `environmentIntensity` from scroll** (lerp; to crossfade space→cloud→ground mount TWO `<Environment>` and lerp intensities — never swap `files`, reload hitch).

## 3. Perfect-finish punch list (ordered)
1. **Preloader / in-engine intro** (L, highest ROI) — `<Suspense>` + drei `useProgress()` over a camera already drifting on the platform; `gl.compile(scene,camera)` + warm textures before reveal → no first-scroll shader-compile hitch; 1-2s CA/frost dissolve out. Kills the #1 jury tell (spinner over blank canvas).
2. **Lenis-on-GSAP-ticker + damped camera** (M) — `gsap.ticker.add(t=>lenis.raf(t*1000))` + `lagSmoothing(0)`; every camera value `THREE.MathUtils.damp`'d. One continuous-orbit feel, zero jitter.
3. **DepthOfField + FOV dolly on planet fly-to** (M) — focus astronaut, blur planets/clouds; animate focusDistance + FOV 55→35 on fly-in (GSAP power3.inOut, dossier back.out(1.4)); bokehScale 3-5, height 480. Strongest single cinematic cue.
4. **SMAA + parallax depth** (S) — `<SMAA/>` at chain end (MSAA is off → edges jaggy) + 2-3 starfield Points layers at fractional scroll/pointer rates.
5. **Aerial-perspective fog** (S) — FogExp2 low density obsidian/teal, denser through the cloud deck. Fall feels km deep.
6. **Custom cursor + hover feedback** (M) — violet ring DOM cursor scaling/labeling "View project" on planet raycast; lerp fresnel rim up on hover.
7. **Reduced-motion + motion/audio toggles** (M, non-negotiable for juries) — `prefers-reduced-motion` → discrete camera cuts, freeze grain/parallax; on-page Pause toggle (WCAG 2.2.2). Dossier already focusable/SR-readable.
8. **Mobile quality scaling** (M) — drei `<PerformanceMonitor onDecline>` step dpr (cap [1,1.5]), halve DOF height, disable god-rays under budget; hover→tap, bigger touch targets. Test cloud-deck fill-rate on mid Android.
9. **Ambient + positional audio** (M) — one space drone + `PositionalAudio` per planet; gesture-unlock, default-muted with obvious unmute.
10. **Finishing grade** (S) — radial (edge) CA + letterbox/vignette tighten during dossier fly; Noise OVERLAY ~0.02. **Chain order: SMAA → DepthOfField → Bloom → ChromaticAberration → Vignette → Noise.**

## 4. I integrate NOW vs Georges downloads
- **NOW (me):** HDRI (direct CDN .hdr → 2k → Environment + scroll intensity); all CC0/PD props (NASA ISS, Kenney dish, asteroid, Quaternius); CC0 fallback platform; the entire punch list 1-10 (code-only).
- **Georges downloads (Sketchfab login, no anon/API path):** DevPoly3D Teleporter Pad (preferred hero platform — ships emissive ring) + any Tier-2 Sketchfab prop. Log in via Epic, hit Download, hand me the GLB. CC-BY → a credits line.
- **Recommended:** Georges grabs the Teleporter Pad (5-min, biggest weak-spot fix); I do everything else from CC0 + code in parallel. Or skip the login → I build the platform from Quaternius+Kenney CC0.
