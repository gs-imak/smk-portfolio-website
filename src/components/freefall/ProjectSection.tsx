"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import type { Project } from "./visit";

/** A link is live only if it has a real href (placeholder "#" jumps to top). */
const isLive = (href?: string) => !!href && href !== "#";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

/**
 * A project HOVERS BY as a compact card while you fall (no auto-open). It only
 * EXPANDS into the full dossier when the user CLICKS it — the dossier is a
 * dismissable modal. The drifting card is the "hover by" form (placeholder
 * pending Georges's final call on the exact mechanism); the firm rule is that
 * nothing opens automatically.
 */
export function ProjectSection({ project, side = "left" }: { project: Project; side?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const accent = project.accent;

  return (
    <section
      style={{
        height: "110vh",
        display: "flex",
        alignItems: "center",
        justifyContent: side === "left" ? "flex-start" : "flex-end",
        padding: "0 clamp(20px, 5vw, 80px)",
        pointerEvents: "none",
      }}
    >
      {/* HOVER-BY CARD — compact, clickable, no auto-expand */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          textAlign: "left",
          width: "min(360px, 84vw)",
          padding: 18,
          borderRadius: 16,
          // SOLID-ish panel (no backdrop-filter over the animating canvas — that
          // flickers); the accent border + shadow carry the holographic feel.
          background: "linear-gradient(165deg, rgba(16,14,32,.92), rgba(9,7,20,.92))",
          border: `1px solid ${accent}66`,
          boxShadow: `0 24px 70px -34px ${accent}, inset 0 0 0 1px rgba(255,255,255,.04)`,
          color: "#ECECF5",
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.images[0]}
          alt=""
          style={{ width: 84, height: 84, objectFit: "cover", objectPosition: "top", borderRadius: 10, border: `1px solid ${accent}55`, flexShrink: 0 }}
        />
        <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: ".22em", color: accent }}>
            ◢ {project.eyebrow}
          </span>
          <span className={display.className} style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, letterSpacing: "-.02em" }}>
            {project.name}
          </span>
          <span className={mono.className} style={{ fontSize: 11, color: "#b9b3dd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {project.tagline}
          </span>
          <span className={mono.className} style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: accent, marginTop: 4 }}>
            VIEW PROJECT ↗
          </span>
        </span>
      </motion.button>

      <AnimatePresence>{open && <ProjectModal project={project} onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [shot, setShot] = useState(0);
  const accent = project.accent;
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = `proj-${project.name.replace(/\s+/g, "-").toLowerCase()}`;
  const lenis = useLenis();

  // Freeze the world behind the modal (Lenis + body) so wheel/touch can't scrub
  // the falling scene, and trap keyboard focus inside the dialog (Esc closes,
  // Tab wraps, focus returns to the trigger on close).
  useEffect(() => {
    const prevFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      prevFocused?.focus();
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
        background: "rgba(4,3,12,.72)",
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(620px, 94vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "30px 32px",
          borderRadius: 20,
          background: "linear-gradient(165deg, rgba(20,17,42,.98), rgba(11,9,24,.98))",
          border: `1px solid ${accent}66`,
          boxShadow: `0 40px 120px -40px ${accent}, inset 0 0 80px ${accent}10`,
          color: "#ECECF5",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={mono.className}
          style={{ position: "absolute", top: 16, right: 16, width: 34, height: 34, borderRadius: 999, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", color: "#ECECF5", cursor: "pointer", fontSize: 16, lineHeight: 1 }}
        >
          ✕
        </button>

        <div className={mono.className} style={{ fontSize: 11, letterSpacing: ".24em", color: accent }}>
          ◢ {project.eyebrow}
        </div>
        <h2 id={titleId} className={display.className} style={{ fontSize: "clamp(34px, 4.6vw, 56px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-.03em", margin: "10px 0 4px" }}>
          {project.name}
        </h2>
        <div className={mono.className} style={{ fontSize: 13, color: "#cfc8ff", marginBottom: 18 }}>
          {project.tagline}
        </div>

        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${accent}55` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.images[shot]} alt={`${project.name} screenshot`} style={{ display: "block", width: "100%", height: "clamp(180px, 32vh, 300px)", objectFit: "cover", objectPosition: "top" }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {project.images.map((src, i) => (
            <button key={src} type="button" onClick={() => setShot(i)} aria-label={`Screenshot ${i + 1}`} style={{ flex: 1, height: 44, borderRadius: 7, overflow: "hidden", padding: 0, cursor: "pointer", background: "none", border: i === shot ? `2px solid ${accent}` : "1px solid rgba(255,255,255,.14)", opacity: i === shot ? 1 : 0.55 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </button>
          ))}
        </div>

        <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.6, color: "#d7d4ea", margin: "18px 0 0" }}>
          {project.blurb}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {project.tags.map((t) => (
            <span key={t} className={mono.className} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 999, background: `${accent}1f`, color: "#e7e3ff", border: `1px solid ${accent}55` }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22 }}>
          {isLive(project.links[0]?.href) ? (
            <a href={project.links[0].href} target="_blank" rel="noopener noreferrer" className={mono.className} style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", color: "#0b0820", background: accent, padding: "11px 20px", borderRadius: 999, textDecoration: "none" }}>
              LAUNCH PROJECT ↗
            </a>
          ) : (
            <span aria-disabled className={mono.className} style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", color: "#0b0820", background: accent, padding: "11px 20px", borderRadius: 999, opacity: 0.55, cursor: "not-allowed" }}>
              COMING SOON
            </span>
          )}
          {project.links.slice(1).filter((l) => isLive(l.href)).map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={mono.className} style={{ fontSize: 12, letterSpacing: ".08em", color: accent, textDecoration: "none" }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
