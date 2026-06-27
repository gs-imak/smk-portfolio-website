/**
 * PROJECTS = the portfolio content (rendered as DOM scroll sections in the page,
 * ProjectSection). PLANETS = a purely VISUAL, populated space field that drifts
 * past as you fall (no interaction, no trigger). The two are fully decoupled.
 *
 * `visit` + `visitTuning` remain only because CameraRig/Astronaut still carry a
 * dormant over-the-shoulder block guarded by `visit.t` (always 0 now). Kept so
 * those components compile; harmless. (Cleanup candidate.)
 */

export interface Project {
  name: string;
  eyebrow: string;
  tagline: string;
  blurb: string;
  tags: string[];
  images: string[];
  links: { label: string; href: string }[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Book Tinder",
    eyebrow: "PROJECT 01",
    tagline: "Swipe to discover your next read.",
    blurb:
      "A swipe-to-discover reading app — real-time matching, a personalised discovery feed, and a mobile-first experience built to feel instant.",
    tags: ["Vue", "TypeScript", "Node", "Real-time"],
    images: [
      "/book%20tinder/homepage.png",
      "/book%20tinder/landing%20page.png",
      "/book%20tinder/book%20view.png",
      "/book%20tinder/Discovery%20complete.png",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    accent: "#7C5CFF",
  },
  {
    name: "NS Aquatics",
    eyebrow: "PROJECT 02",
    tagline: "Booking & management, end to end.",
    blurb:
      "A full booking & management platform — scheduling, Stripe payments, and an admin suite — plus an AI tool layer to speed up day-to-day operations.",
    tags: ["React", "TypeScript", "Stripe", "Admin"],
    images: [
      "/ns%20aquatics/hero%20section.png",
      "/ns%20aquatics/full%20page%20screenshot.png",
      "/ns%20aquatics/ai%20tool.png",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    accent: "#5FE0C8",
  },
];

export interface PlanetDef {
  texture: string;
  position: [number, number, number];
  radius: number;
  ring?: boolean;
  tilt?: number;
}

const T = "/textures/space/";
const JUP = `${T}8k_jupiter.jpg`;
const SAT = `${T}8k_saturn.jpg`;
const MAR = `${T}8k_mars.jpg`;
const NEP = `${T}2k_neptune.jpg`;
const URA = `${T}2k_uranus.jpg`;
const MER = `${T}2k_mercury.jpg`;
const VEN = `${T}2k_venus_atmosphere.jpg`;
const MOON = `${T}2k_moon.jpg`;
const CER = `${T}2k_ceres_fictional.jpg`;
const ERI = `${T}2k_eris_fictional.jpg`;
const HAU = `${T}2k_haumea_fictional.jpg`;
const MAK = `${T}2k_makemake_fictional.jpg`;

// A POPULATED space field — 12 DIFFERENT worlds (no repeats), WELL SPREAD down
// the deep fall (y −24 → −210 over a 320-unit drop), OFF TO THE SIDE (z = screen
// left/right, alternating x) so they never block the centre and you pass them one
// at a time. No fade / no fake scale: fixed-size worlds, so PERSPECTIVE makes them
// small in the distance and grow as you fall past. (Earth lives far below at
// −320 and only resolves late — see Earth.tsx reveal.)
export const PLANETS: PlanetDef[] = [
  { texture: SAT, position: [11, -24, 18], radius: 6, ring: true, tilt: 0.34 },
  { texture: JUP, position: [-10, -44, -14], radius: 6.5, tilt: 0.5 },
  { texture: NEP, position: [13, -62, 20], radius: 4, tilt: 0.8 },
  { texture: MAR, position: [-13, -82, -19], radius: 4.5, tilt: 0.3 },
  { texture: URA, position: [12, -100, 15], radius: 4, tilt: 0.9 },
  { texture: MOON, position: [-9, -118, -13], radius: 3, tilt: 0.6 },
  { texture: MER, position: [14, -136, 21], radius: 3.5, tilt: 0.4 },
  { texture: VEN, position: [-12, -152, -16], radius: 4, tilt: 0.5 },
  { texture: CER, position: [10, -168, 17], radius: 3, tilt: 0.7 },
  { texture: MAK, position: [-11, -182, -14], radius: 3.5, tilt: 0.4 },
  { texture: ERI, position: [13, -196, 19], radius: 3, tilt: 0.6 },
  { texture: HAU, position: [-10, -210, -12], radius: 3.5, tilt: 0.5 },
];

/** Over-the-shoulder framing (dormant; kept for the guarded CameraRig block). */
export const visitTuning = {
  camDist: 3.4,
  camHeight: 1.9,
  camShoulder: 1.5,
  lookAhead: 5.5,
  lookUp: 1.2,
  viewShift: 0.24,
  hoverGap: 4,
  enterEase: 0.06,
};

export const visit = {
  active: false,
  index: -1,
  t: 0,
  target: 0,
  charPos: [0, 0, 0] as [number, number, number],
};
