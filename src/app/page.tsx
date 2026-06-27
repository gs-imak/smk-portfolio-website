"use client";

import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { FreefallMount } from "@/components/freefall/FreefallMount";
import { LenisProvider } from "@/components/freefall/LenisProvider";
import { ProjectSection } from "@/components/freefall/ProjectSection";
import { PROJECTS } from "@/components/freefall/visit";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

/**
 * THE SITE — the scroll-driven freefall experience IS the homepage.
 * The persistent 3D <Canvas> (FreefallMount, fixed z-0) plays under the scrolling
 * DOM: a hero at the top (the platform), the fall through space + project
 * dossiers that surface at altitude (HoloOverlay), and contact at the bottom
 * (the Earth touchdown). Lenis maps page scroll → the descent.
 */
export default function Home() {
  return (
    <LenisProvider>
      <FreefallMount />

      {/* top bar */}
      <header
        className={mono.className}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "clamp(16px, 3vw, 32px) clamp(18px, 4vw, 48px)",
          fontSize: 12,
          letterSpacing: ".22em",
          color: "#ECECF5",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontWeight: 700 }}>SMK&nbsp;STUDIOS</span>
        <nav style={{ display: "flex", gap: 22, pointerEvents: "auto" }}>
          <a href="/cv" style={{ color: "#cfc8ff", textDecoration: "none" }}>CV</a>
          <a href="mailto:georgesimak@gmail.com" style={{ color: "#5FE0C8", textDecoration: "none" }}>CONTACT</a>
        </nav>
      </header>

      {/* scrolling content over the fixed 3D */}
      <div style={{ position: "relative", zIndex: 10, pointerEvents: "none", color: "#ECECF5" }}>
        {/* HERO — first screen, over the platform */}
        <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(20px, 6vw, 96px)" }}>
          <div className={mono.className} style={{ fontSize: 12, letterSpacing: ".28em", color: "#5FE0C8", marginBottom: 18 }}>
            GEORGES SIMAK · SMK STUDIOS
          </div>
          <h1 className={display.className} style={{ fontSize: "clamp(44px, 9vw, 132px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.03em", margin: 0, maxWidth: 14 + "ch" }}>
            Built to fall through.
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 20px)", color: "#cfc8ff", maxWidth: 540, marginTop: 24, lineHeight: 1.5 }}>
            Immersive web experiences &amp; game design. Scroll to leap off the platform and fall through the work.
          </p>
          <div className={mono.className} style={{ fontSize: 11, letterSpacing: ".2em", color: "#8d86b8", marginTop: 40 }}>
            ↓ SCROLL TO FALL
          </div>
        </section>

        {/* the fall — project sections ease in as you scroll past them; the
            planets just drift in the background (no pop, no planet trigger). */}
        <div style={{ height: "300vh" }} />
        {PROJECTS[0] && <ProjectSection project={PROJECTS[0]} side="left" />}
        <div style={{ height: "300vh" }} />
        {PROJECTS[1] && <ProjectSection project={PROJECTS[1]} side="right" />}
        <div style={{ height: "340vh" }} />

        {/* CONTACT — last screen, over the Earth touchdown */}
        <section style={{ height: "120vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(20px, 6vw, 96px)" }}>
          <div className={mono.className} style={{ fontSize: 12, letterSpacing: ".28em", color: "#5FE0C8", marginBottom: 16 }}>
            TOUCHDOWN · CONTACT
          </div>
          <h2 className={display.className} style={{ fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-.03em", margin: 0 }}>
            Let&apos;s build something
            <br />
            worth the fall.
          </h2>
          <div className={mono.className} style={{ display: "flex", flexWrap: "wrap", gap: "14px 40px", marginTop: 36, fontSize: 14, pointerEvents: "auto" }}>
            <a href="mailto:georgesimak@gmail.com" style={{ color: "#cfc8ff", textDecoration: "none" }}>✉ georgesimak@gmail.com</a>
            <a href="tel:+33769592221" style={{ color: "#cfc8ff", textDecoration: "none" }}>☎ +33 7 69 59 22 21</a>
            <span style={{ color: "#8d86b8" }}>◎ Paris, France</span>
            <a href="/cv" style={{ color: "#5FE0C8", textDecoration: "none" }}>↗ Download CV</a>
          </div>
        </section>
      </div>
    </LenisProvider>
  );
}
