/**
 * Freefall smoke test — a REGRESSION GUARD for the structural breakages that keep
 * sneaking in (console errors, render freezes, the astronaut leaving the frame,
 * wrong scroll states). Run against a live dev server:
 *
 *   npm run dev    # in one terminal
 *   npm run smoke  # in another (or: node scripts/freefall-smoke.mjs)
 *
 * It pins the freefall to fixed altitudes via window.__ff.setP and asserts:
 *   - zero console / page errors at every altitude
 *   - the atmosphere band is correct end to end (space → … → ground)
 *   - the astronaut is actually ON SCREEN in deep space (centre not empty) — i.e.
 *     it didn't disappear / get culled / fall out of the camera frame
 * Exits non-zero on any failure so it can gate a commit / CI.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";
const CHECKS = [
  { p: 0.05, band: "space", astronaut: false }, // on the platform — may be off-centre
  { p: 0.3, band: "space", astronaut: true },
  { p: 0.5, band: "space", astronaut: true },
  { p: 0.7, band: ["reentry", "upper", "space"], astronaut: true },
  { p: 0.9, band: ["clouddeck", "upper", "reentry"], astronaut: null },
  { p: 1.0, band: "ground", astronaut: null },
];

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 854, height: 534 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

const fails = [];
try {
  await page.goto(`${BASE}/freefall-test`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("canvas", { timeout: 30000 });
  await page.waitForFunction(() => window.__ff && window.__atmo, null, { timeout: 30000 });

  for (const c of CHECKS) {
    await page.evaluate((pp) => window.__ff.setP(pp), c.p);
    await page.waitForTimeout(900);
    const band = await page.evaluate(() => window.__atmo?.band);
    const want = Array.isArray(c.band) ? c.band : [c.band];
    if (!want.includes(band)) fails.push(`p${c.p}: band="${band}" expected ${want.join("|")}`);

    if (c.astronaut === true) {
      // centre brightness — in deep space the only lit thing centre-frame is the
      // suit; if it's near-black, the astronaut vanished.
      const buf = await page.screenshot();
      const centreLum = await page.evaluate(async (d) => {
        const img = new Image();
        img.src = "data:image/png;base64," + d;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.width;
        cv.height = img.height;
        const ctx = cv.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const x0 = Math.floor(img.width * 0.4),
          x1 = Math.floor(img.width * 0.6);
        const y0 = Math.floor(img.height * 0.3),
          y1 = Math.floor(img.height * 0.75);
        const data = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
        let s = 0;
        for (let i = 0; i < data.length; i += 4) s += data[i] + data[i + 1] + data[i + 2];
        return s / (data.length / 4) / 3;
      }, buf.toString("base64"));
      if (centreLum < 28) fails.push(`p${c.p}: astronaut MISSING from frame (centre lum ${centreLum.toFixed(1)})`);
    }
  }
} catch (e) {
  fails.push("CRASH/timeout: " + e.message);
}

if (errors.length) fails.push("console errors: " + errors.slice(0, 5).join(" | "));
await browser.close();

if (fails.length) {
  console.error("SMOKE FAIL:\n  " + fails.join("\n  "));
  process.exit(1);
}
console.log("SMOKE PASS — no errors, bands correct, astronaut on-screen.");
