"use client";

import { motion, type Variants } from "motion/react";
import { useRef } from "react";
import { useScrollRaf } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n";

function smoothstep(p: number, a: number, b: number): number {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 1.2, staggerChildren: 0.14 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Thin vertical telemetry tick line. */
function VLine({ h = 56 }: { h?: number }) {
  return (
    <span
      aria-hidden
      className="block w-px bg-gradient-to-b from-transparent via-cyan/40 to-transparent"
      style={{ height: h }}
    />
  );
}

function TelemetrySquare() {
  return (
    <span aria-hidden className="block h-1.5 w-1.5 border border-hud/70" />
  );
}

export default function HeroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useScrollRaf((p) => {
    const el = rootRef.current;
    if (!el) return;
    const tt = smoothstep(p, 0.02, 0.1);
    el.style.opacity = String(1 - tt);
    el.style.transform = `translateY(${-40 * tt}px)`;
    el.style.visibility = tt >= 0.999 ? "hidden" : "visible";
  });

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-10 will-change-transform">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative h-full w-full"
      >
        {/* Identity — centered band between the nav and the planets */}
        <div className="absolute inset-x-6 top-[10%] flex flex-col items-center gap-6 text-center sm:inset-x-8">
          {/* Status chip — wraps on narrow phones, HUD lines shrink */}
          <motion.div variants={item} className="flex w-full items-center justify-center gap-2 sm:gap-4">
            <span aria-hidden className="hud-line hidden w-14 sm:block sm:w-28" />
            <span className="glass flex max-w-[90vw] items-center gap-2.5 rounded-full px-4 py-2 sm:px-5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 animate-blink rounded-full bg-cyan shadow-[0_0_10px_rgba(76,201,240,0.9)]"
              />
              <span className="whitespace-normal text-center font-mono text-[9px] uppercase tracking-[0.2em] text-hud sm:whitespace-nowrap sm:text-left sm:tracking-[0.28em] lg:text-[11px]">
                {t.profile.status}
              </span>
            </span>
            <span aria-hidden className="hud-line hidden w-14 sm:block sm:w-28" />
          </motion.div>

          {/* Name — gradient fill over a soft glow layer */}
          <motion.h1
            variants={item}
            className="relative font-display text-5xl font-bold uppercase leading-none tracking-[0.05em] lg:text-7xl"
          >
            <span
              aria-hidden
              className="absolute inset-0 select-none bg-gradient-to-b from-white to-[#7df9ff] bg-clip-text text-transparent opacity-50 blur-[16px]"
            >
              {t.profile.name}
            </span>
            <span className="relative bg-gradient-to-b from-white from-40% via-[#e8f4ff] to-[#8fd8f8] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(76,201,240,0.35)]">
              {t.profile.name}
            </span>
          </motion.h1>

          {/* Flourish */}
          <motion.div variants={item} className="flex items-center gap-3 opacity-80">
            <span
              aria-hidden
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(154,220,255,0.7))",
              }}
            />
            <span
              aria-hidden
              className="h-1.5 w-1.5 rotate-45 border border-cyan/80 bg-cyan/20 shadow-[0_0_8px_rgba(76,201,240,0.6)]"
            />
            <span
              aria-hidden
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, rgba(154,220,255,0.7), transparent)",
              }}
            />
          </motion.div>
        </div>

        {/* Right telemetry column — desktop only */}
        <motion.div
          variants={item}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 opacity-40 lg:flex lg:right-10"
        >
          <TelemetrySquare />
          <VLine h={40} />
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-hud [writing-mode:vertical-rl]">
            ALT +000.4
          </p>
          <VLine h={64} />
          <TelemetrySquare />
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-hud [writing-mode:vertical-rl]">
            THR 000%
          </p>
          <VLine h={40} />
          <TelemetrySquare />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-4 sm:gap-6"
        >
          <span className="hud-line hidden w-40 sm:block" />
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-hud text-hud/80">
            {t.ui.hero.scrollTo}
          </span>
          <span className="flex h-11 w-7 items-start justify-center rounded-full border border-hud/50 pt-2 shadow-[0_0_16px_rgba(76,201,240,0.15)]">
            <span className="h-2 w-1 animate-scroll-dot rounded-full bg-cyan-bright shadow-[0_0_8px_rgba(125,249,255,0.9)]" />
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-hud text-hud/80">
            {t.ui.hero.explore}
          </span>
          <span className="hud-line hidden w-40 sm:block" />
        </motion.div>
      </motion.div>
    </div>
  );
}
