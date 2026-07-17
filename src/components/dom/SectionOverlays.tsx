"use client";

import { useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScrollRaf } from "@/lib/scroll";
import { useUIStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Scroll envelope helpers                                             */
/* ------------------------------------------------------------------ */

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** alpha ramps in over [a0,a1] and back out over [b0,b1]. */
function envelope(
  p: number,
  a0: number,
  a1: number,
  b0: number,
  b1: number
): number {
  return smoothstep(a0, a1, p) * (1 - smoothstep(b0, b1, p));
}

function applyPanel(
  el: HTMLDivElement | null,
  last: { current: number },
  alpha: number,
  transform: (a: number) => string
) {
  if (!el) return;
  if (alpha === last.current) return;
  last.current = alpha;
  el.style.opacity = alpha.toFixed(4);
  el.style.transform = transform(alpha);
  el.style.visibility = alpha <= 0 ? "hidden" : "visible";
  el.style.pointerEvents = alpha > 0.5 ? "auto" : "none";
}

const HIDDEN: CSSProperties = {
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
};

/* ------------------------------------------------------------------ */
/* Small shared bits                                                   */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
      {children}
    </span>
  );
}

/** Shared glass-panel style used by About / Work / Contact panels. */
const PANEL_STYLE: CSSProperties = {
  background: "linear-gradient(150deg, rgba(14,20,42,0.94), rgba(6,8,20,0.94))",
  boxShadow:
    "0 0 40px rgba(5,8,20,0.7), 0 0 24px rgba(76,201,240,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
};

/* ------------------------------------------------------------------ */

export default function SectionOverlays() {
  const { t } = useI18n();
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastAbout = useRef(-1);
  const lastExperience = useRef(-1);
  const lastSkills = useRef(-1);
  const lastProjects = useRef(-1);
  const lastContact = useRef(-1);

  useScrollRaf((p) => {
    applyPanel(
      aboutRef.current,
      lastAbout,
      envelope(p, 0.205, 0.235, 0.315, 0.34),
      (a) => `translateX(${(-40 * (1 - a)).toFixed(2)}px)`
    );
    applyPanel(
      experienceRef.current,
      lastExperience,
      envelope(p, 0.355, 0.39, 0.475, 0.5),
      (a) => `translateX(${(40 * (1 - a)).toFixed(2)}px)`
    );
    applyPanel(
      skillsRef.current,
      lastSkills,
      envelope(p, 0.51, 0.54, 0.595, 0.62),
      (a) => `translateY(${(-18 * (1 - a)).toFixed(2)}px)`
    );
    applyPanel(
      projectsRef.current,
      lastProjects,
      envelope(p, 0.635, 0.665, 0.775, 0.8),
      (a) => `translateX(${(-28 * (1 - a)).toFixed(2)}px)`
    );
    applyPanel(
      contactRef.current,
      lastContact,
      smoothstep(0.82, 0.875, p),
      (a) => `translateX(${(40 * (1 - a)).toFixed(2)}px)`
    );
  });

  /* ---------------- experience tabs ---------------- */
  const [activeJob, setActiveJob] = useState(0);
  const job = t.experience[activeJob];

  /* ---------------- projects hover chip ---------------- */
  const hoveredId = useUIStore((s) => s.hoveredProject);
  const hovered = hoveredId
    ? (t.projects.find((pr) => pr.id === hoveredId) ?? null)
    : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* ============ 01 // ABOUT ============ */}
      {/* Mobile: edge-to-edge card centered. Desktop: left-anchored, wide. */}
      <div className="absolute inset-y-0 left-0 flex items-center px-4 lg:px-0">
        <div
          ref={aboutRef}
          style={{ ...HIDDEN, ...PANEL_STYLE }}
          className="hud-corners w-full max-w-[470px] rounded-2xl border border-hud/25 p-6 sm:p-8 lg:ml-16"
        >
          <Kicker>{t.ui.about.kicker}</Kicker>
          <h2 className="mt-3 font-display text-[30px] font-bold leading-[1.05] text-star sm:text-[40px]">
            {t.ui.about.headingLead}
            <span className="text-cyan">{t.ui.about.headingHighlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85">
            {t.profile.about.lead}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {t.profile.about.p2}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {t.profile.about.p3}
          </p>
          <div className="hud-line mt-6" />
          <ul className="mt-5 space-y-2">
            {t.profile.about.credentials.map((cred) => (
              <li
                key={cred}
                className="font-mono text-xs uppercase tracking-wide text-star/85"
              >
                <span className="text-cyan">▹</span> {cred}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============ 02 // EXPERIENCE ============ */}
      <div className="absolute inset-y-0 right-0 flex items-center px-4 lg:px-0">
        <div
          ref={experienceRef}
          style={{ ...HIDDEN, ...PANEL_STYLE }}
          className="hud-corners pointer-events-auto w-full max-w-[560px] rounded-2xl border border-hud/25 p-6 sm:p-8 lg:mr-24"
        >
          <Kicker>{t.ui.experience.kicker}</Kicker>

          <div className="mt-4 flex flex-wrap gap-2">
            {t.experience.map((j, i) => (
              <button
                key={j.company}
                type="button"
                data-cursor="hover"
                onClick={() => setActiveJob(i)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  i === activeJob
                    ? "border-cyan bg-cyan/15 text-cyan-bright shadow-[0_0_14px_rgba(76,201,240,0.25)]"
                    : "border-white/20 text-star/70 hover:border-white/40 hover:text-star"
                }`}
              >
                {j.company.split(" ")[0]}
              </button>
            ))}
          </div>

          <h3 className="mt-5 font-display text-[20px] font-bold leading-snug text-white sm:text-[22px]">
            {job.title} <span className="text-cyan">@ {job.company}</span>
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-hud/90">
            {job.range} · {job.location}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">
            {job.blurb}
          </p>

          <div className="hud-line mt-4" />

          {/* Touch-scrollable bullet list (stopPropagation so wheel/touch
              inside doesn't hijack the page's Lenis scroll runway). */}
          <ul
            key={activeJob}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(76,201,240,0.35) transparent",
              WebkitOverflowScrolling: "touch",
            }}
            className="mt-4 max-h-[260px] space-y-3 overflow-y-auto pr-2 lg:max-h-[300px]"
          >
            {job.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-white/80"
              >
                <span className="mt-0.5 shrink-0 text-cyan">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============ SKILLS ============ */}
      <div className="absolute inset-x-0 top-28 flex justify-center px-4">
        <div ref={skillsRef} style={HIDDEN} className="px-6 text-center">
          <Kicker>{t.ui.skills.kicker}</Kicker>
          <h2
            className="mt-2 font-display text-[24px] font-bold text-star sm:text-[28px]"
            style={{
              textShadow:
                "0 0 24px rgba(76,201,240,0.45), 0 0 64px rgba(124,58,237,0.35)",
            }}
          >
            {t.ui.skills.heading}
          </h2>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
            {t.ui.skills.subheading}
          </p>
        </div>
      </div>

      {/* ============ 03 // PROJECTS ============ */}
      <div className="absolute left-4 top-28 px-2 lg:left-16 lg:px-0">
        <div ref={projectsRef} style={HIDDEN}>
          <Kicker>{t.ui.projects.kicker}</Kicker>
          <h2
            className="mt-2 font-display text-[28px] font-bold text-star sm:text-[34px]"
            style={{ textShadow: "0 0 28px rgba(124,58,237,0.4)" }}
          >
            {t.ui.projects.heading}
          </h2>
          <p className="mt-3 animate-blink font-mono text-xs tracking-[0.2em] text-hud">
            {t.ui.projects.inspectHint}
          </p>
          <a
            href={t.archiveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="pointer-events-auto mt-3 inline-block font-mono text-xs text-star/60 underline-offset-4 transition-colors hover:text-cyan hover:underline"
          >
            {t.ui.projects.archive}
          </a>
        </div>
      </div>

      {/* target-locked hint chip — desktop only (mobile lacks hover) */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="glass flex items-center gap-2.5 rounded-full px-4 py-2"
            >
              <span className="block h-1.5 w-1.5 rotate-45 animate-blink bg-cyan shadow-[0_0_8px_rgba(76,201,240,0.9)]" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-hud">
                {t.ui.projects.targetLocked} {hovered.title.toUpperCase()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============ 04 // CONTACT ============ */}
      <div className="absolute inset-y-0 right-0 flex items-center px-4 lg:px-0">
        <div
          ref={contactRef}
          style={{ ...HIDDEN, ...PANEL_STYLE }}
          className="hud-corners pointer-events-auto w-full max-w-[460px] rounded-2xl border border-hud/25 p-6 sm:p-8 lg:mr-24"
        >
          <Kicker>{t.ui.contact.kicker}</Kicker>
          <h2 className="mt-2 font-display text-[28px] font-bold leading-[1.08] text-star sm:text-[34px]">
            {t.ui.contact.headingLead}
            <span className="text-cyan">{t.ui.contact.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/80">
            {t.ui.contact.copy}
          </p>

          {/* No backend, no forms — straight to the inbox */}
          <a
            href={`mailto:${t.profile.email}`}
            data-cursor="hover"
            className="mt-7 block w-full rounded-full bg-gradient-to-r from-cyan to-nebula py-3.5 text-center font-display text-base font-semibold tracking-wide text-space transition hover:brightness-110 active:scale-[0.98] sm:text-lg"
          >
            {t.profile.email} →
          </a>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 sm:tracking-[0.22em]">
            {t.ui.contact.mailNote}
          </p>

          <div className="hud-line mt-6" />

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href={t.profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                data-cursor="hover"
                className="text-white/50 transition-colors hover:text-cyan"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a
                href={t.profile.socials.website}
                target="_blank"
                rel="noreferrer"
                aria-label="Website"
                data-cursor="hover"
                className="text-white/50 transition-colors hover:text-cyan"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18" />
                  <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
                </svg>
              </a>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              {t.ui.contact.socialsLabel}
            </span>
          </div>

          <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-white/25">
            {t.ui.contact.footer}
          </p>
        </div>
      </div>
    </div>
  );
}
