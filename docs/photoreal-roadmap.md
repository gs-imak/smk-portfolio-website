# SMK Freefall — Photoreal Upgrade Roadmap

Source: multi-agent web research (2026-06-27), 8 areas + synthesis. Permanent reference for the photoreal pass.

**The one thread:** the astronaut reads film-grade because it's a real PBR GLB lit by IBL and graded through a tonemapper. The spheres/clouds/atmosphere don't get the same treatment yet. Close that gap and everything matches.

## 1. Top moves (in order)

1. **Texture colour-space audit + KTX2 compression — S/M, FOUNDATIONAL.** Albedo/emissive → `SRGBColorSpace`; normal/rough/AO → `NoColorSpace`. Compress 8K → KTX2/Basis (`toktx`/`gltf-transform`) + drei `useKTX2`. ~50MB download is really >1.4GB VRAM (8K uncompressed ≈ 358MB each) — this is what chokes mid laptops/mobile. ~6× VRAM cut. Downscale 8K→4K first (indistinguishable on a sphere <40% of screen). Prerequisite for everything else.
2. **Tonemap ACESFilmic → AgX — S.** `gl={{ toneMapping: THREE.AgXToneMapping, toneMappingExposure: 1.2–1.4 }}`. ACES twists violets/cyans + clips whites warm (the AI-slop default); AgX holds palette saturation through the bright cloud money-shot. Re-add punch via the LUT, not the tonemapper. Nearly free.
3. **HDRI IBL + palette Lightformers via drei `<Environment>` — S/M.** `<Environment files="/hdri/space_512.hdr" frames={1} background={false}>` + 2–3 `<Lightformer>` (teal/violet rims, white key). Animate `environmentIntensity` with scroll (space→ground warms). 512px HDR ≈ 1MB, `frames={1}` = zero per-frame cost. Makes suit sheen/visor + planet materials read filmic + cohesive.
4. **Custom day/night + fresnel planet shader — M.** Replace flat `meshStandardMaterial` with a sigmoid-terminator `ShaderMaterial`: `dayMix = 1/(1+exp(-20*dot(N,sunDir)))`, city-lights on the night side, ocean spec gated by mask (Earth), fresnel atmosphere shell multiplied by the twilight mix so the rim DIES on the dark side (kills the "even ring" tell). The single biggest planet upgrade → "lit world with a terminator."
5. **Complete + reorder the post stack — M.** Order: N8AO → DoF → Bloom(`mipmapBlur`, threshold 1.0) → **LUT** (author violet/teal `.cube` in DaVinci) → ToneMapping(AgX, last HDR op) → ChromaticAberration → Vignette → **Noise grain** (`OVERLAY`, 0.05) → SMAA. LUT = highest quality-per-ms lever; grain hides obsidian banding; N8AO (`halfRes`) gives contact shadows the albedo can't.
6. **Hero volumetric cloud pass-through — L (gate to one moment).** drei `<Cloud>` billboards POP when you fall through them. Add `@takram/three-clouds` `<Clouds qualityPreset>` (real depth-correct shafts + cloud shadows on the astronaut, temporal upscale) ONLY for the cloud band; keep billboards for distance + mobile. Replaces the screen-space `GodRays` fake.
7. **Filmic suit material pass — S/M.** Traverse GLB → `MeshPhysicalMaterial` `sheen:1, sheenRoughness:0.65, sheenColor:'#dfe6ff'`; `clearcoat:1` on the visor sub-mesh only. Inject a Fresnel rim (teal↔violet per visited planet) via `onBeforeCompile`. White suit reads as beta-cloth not plastic.
8. **Re-rig scroll to GSAP `scrub:1` + ref-lerp — M.** ScrollTrigger writes camera target to refs; `useFrame` lerps toward them (catch-up lag). Drive Lenis from `gsap.ticker` (one clock). The recurring "AAA vs generic" tell.

## 2. Per-area winners
- **Clouds:** hybrid — drei `<Cloud>` (distant/mobile) + `@takram/three-clouds` gated to the cloud band.
- **Atmosphere:** cheap fresnel shell on flanking planets; reserve `@takram/three-atmosphere` (Bruneton) for the hero Earth; drei `<Sky>` + warm `fogExp2` near ground (aerial perspective ≈ free realism).
- **Planets:** custom day/night+fresnel shader, KTX2 textures, drei `<Detailed distances={[0,30,80]}>` LOD.
- **Character:** `MeshPhysicalMaterial` sheen (Charlie BRDF) for cloth, clearcoat on visor only, `onBeforeCompile` rim/fake-SSS.
- **Post:** AgX + selective Bloom + LUT + N8AO(`halfRes`) + grain. Skip SSR (no reflective ground, 3× cost).
- **Lighting:** drei `<Environment>` HDRI + `<Lightformer>` rims + one sun `directionalLight`; `AccumulativeShadows` only at the leap + Earth landing.

## 3. Performance plan (60fps mid-laptop + lite mobile)
Texture pipeline (standalone planet maps → `toktx`, not gltf-transform):
```bash
# albedo (earth/jupiter/saturn/mars) → ETC1S
toktx --t2 --encode etc1s --clevel 4 --qlevel 255 --genmipmap jupiter.ktx2 jupiter.png
# normal/data maps → UASTC (no banding)
toktx --t2 --encode uastc --uastc_quality 3 --zcmp 18 --genmipmap earth_normal.ktx2 earth_normal.png
# downsize 8K→4K first
```
Astronaut GLB (embedded, rigged → meshopt not draco, geometry LAST):
```bash
gltf-transform etc1s suit.glb suit.glb --quality 255
gltf-transform uastc suit.glb suit.glb --slots "{normalTexture,occlusionTexture,metallicRoughnessTexture}" --level 4 --rdo --zstd 18
gltf-transform meshopt suit.glb suit_final.glb --level medium
```
Expect 50MB → ~8–14MB download, VRAM ~6× lower. Load via drei `useKTX2` (set transcoder path once).

Frame-budget controls: `dpr={[1, isMobile?1.5:2]}`, `antialias:false` (SMAA in post); drei `<PerformanceMonitor>` adaptive DPR; `<AdaptiveDpr pixelated>` during fly-to; `frameloop="demand"` + `invalidate()` when parked in the dossier; `<Detailed>` LOD; profile with `r3f-perf <Perf>`. Cost ranking: GodRays = most expensive single pass (cut first on decline/mobile); Bloom/DoF/AO = the 3 convolution passes (run halfRes/mipmapBlur, DoF only during hover); LUT/CA/vignette/grain/tonemap auto-merge ≈ free.

Lite mobile (gate on drei `useDetectGPU()` tier<2): 2K KTX2 (ETC1S), DPR 1.5, billboards-only clouds, fresnel-only atmosphere, post = Bloom+LUT+AgX+Vignette+Noise (drop DoF/N8AO/GodRays), suit = `MeshStandardMaterial` + cheap fresnel rim (no sheen).

## 4. Reference shortlist
- **Sangil Lee — Realistic Earth with Shaders** https://sangillee.com/2024-06-07-create-realistic-earth-with-shaders/ — copy-ready GLSL for the day/night sigmoid + city lights + fresnel + ocean spec (move #4 blueprint).
- **Maxime Heckel — Real-time Volumetric Cloudscapes** https://blog.maximeheckel.com/posts/real-time-cloudscapes-with-volumetric-raymarching/ — raymarch loop, Beer/HG, blue-noise + half-res if hand-rolling clouds.
- **@takram three-geospatial (clouds + atmosphere)** https://github.com/takram-design-engineering/three-geospatial — production R3F volumetric clouds + Bruneton scattering for the Earth.
- **Don McCurdy — Choosing texture formats (KTX2 VRAM math)** https://www.donmccurdy.com/2024/02/11/web-texture-formats/ + gltf-transform CLI https://gltf-transform.dev/cli.
- **Codrops — Cinematic 3D Scroll with GSAP (Nov 2025)** https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/ — scrub:1 + ref-lerp + Lenis-on-gsap.ticker (move #8).
- **Igloo Inc / Lusion v3** (Awwwards SOTY) — palette restraint + CA-on-camera-transition discipline to study before grading.

**Critical path:** #1 → #2 → #3 (correct colour + VRAM headroom + IBL) unlock everything; ship those, re-screenshot, then layer #4–#8.
