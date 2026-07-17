"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { SectionId } from "@/lib/journey";
import { scrollToSection, useCurrentSection } from "@/lib/scroll";
import { useI18n, type Locale } from "@/lib/i18n";

const LINKS: {
  id: SectionId;
  num: string;
  key: "about" | "work" | "projects" | "contact";
}[] = [
  { id: "about", num: "01", key: "about" },
  { id: "experience", num: "02", key: "work" },
  { id: "projects", num: "03", key: "projects" },
  { id: "contact", num: "04", key: "contact" },
];

/** Compact EN / 中文 toggle. */
function LanguageToggle({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      aria-label="Switch language"
      className="pointer-events-auto flex items-center gap-1 rounded-full border border-cyan/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-bright transition-all duration-300 hover:bg-cyan/15 hover:shadow-[0_0_18px_rgba(76,201,240,0.35)]"
    >
      <span className={locale === "en" ? "text-cyan-bright" : "text-star/45"}>EN</span>
      <span className="text-star/30">/</span>
      <span className={locale === "zh" ? "text-cyan-bright" : "text-star/45"}>中</span>
    </button>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();
  const active = useCurrentSection();

  const go = (id: SectionId) => {
    setIsMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
    >
      <div className="relative flex h-20 w-full items-center justify-between px-5 transition-[background,box-shadow] duration-500 sm:px-8 lg:px-14">
        {/* Logo */}
        <button
          type="button"
          data-cursor="hover"
          onClick={() => go("hero")}
          className="pointer-events-auto"
          aria-label={t.ui.nav.backToTop}
        >
          <span className="font-display text-2xl font-bold leading-none text-star">
            hy<span className="text-cyan">.</span>
          </span>
        </button>

        {/* Center links — desktop only */}
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                type="button"
                data-cursor="hover"
                onClick={() => go(link.id)}
                className={`relative py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? "text-cyan" : "text-star/60 hover:text-star"
                }`}
              >
                <span className="mr-1.5 text-[9px] text-cyan">{link.num}.</span>
                {t.ui.nav[link.key]}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-px h-px bg-cyan shadow-[0_0_10px_rgba(76,201,240,0.9)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right cluster: language toggle + résumé (desktop), hamburger (mobile) */}
        <div className="pointer-events-auto flex items-center gap-3">
          <LanguageToggle locale={locale} setLocale={setLocale} />
          <a
            href={t.profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="hidden rounded-full border border-cyan/60 px-6 py-2 font-mono text-xs uppercase tracking-hud text-cyan-bright transition-all duration-300 hover:bg-cyan/15 hover:shadow-[0_0_24px_rgba(76,201,240,0.4)] sm:inline-block"
          >
            {t.ui.nav.resume} ↗
          </a>

          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? t.ui.nav.closeMenu : t.ui.nav.openMenu}
            aria-expanded={isMobileMenuOpen}
            className="relative flex h-10 w-10 items-center justify-center text-star lg:hidden"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-20 z-30 bg-space/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto absolute inset-x-0 top-20 z-40 mx-3 rounded-2xl border border-hud/25 bg-[rgba(8,10,24,0.96)] p-3 backdrop-blur-xl"
          >
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 font-display text-lg transition-colors ${
                    isActive ? "bg-cyan/15 text-cyan-bright" : "text-star/80 hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-xs text-cyan">{link.num}</span>
                  {t.ui.nav[link.key]}
                </button>
              );
            })}
            <a
              href={t.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center rounded-xl border border-cyan/50 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-bright"
            >
              {t.ui.nav.resume} ↗
            </a>
          </motion.nav>
        </div>
      )}
    </motion.header>
  );
}
