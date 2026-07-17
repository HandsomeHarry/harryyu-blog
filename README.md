# Harry Yu — Cosmic Voyage Portfolio

A scroll-driven 3D "space voyage" personal portfolio. The visitor pilots a rocket
from a launchpad through deep space — launch → Earth (about) → space station
(work) → holographic skill corridor → ringed planet (projects) → the Sun
(contact) — with a cinematic, scrubbable finale. Scrolling *is* flying.

**Live:** [harryyu.dev](https://harryyu.dev)

---

## ⚠️ Credits & Attribution — please read

**The design and core 3D architecture of this site are not mine.** This project is
a fork/adaptation of **"Cosmic Voyage"** by **Abhishek Badar**:

- **Original repo:** [github.com/AbhishekBadar/portfolio](https://github.com/AbhishekBadar/portfolio)
- **Original live site:** [abhishekbadar.dev](https://abhishekbadar.dev)

What is **his** (the creative work I'm standing on):
- The "cosmic voyage" concept and overall art direction
- The entire three.js / R3F scene architecture and component breakdown
- The custom GLSL shaders (Earth day/night, gas-giant turbulence, sun surface,
  exhaust plume, finale fireball/shockwave)
- The procedural rocket geometry and the keyframed camera/rocket flight paths
- The scroll-state bus + Lenis smooth-scroll system

What is **mine**:
- All content — profile, work experience, skills, projects, copy
- Branding (name, colors where re-tuned, logo initials, résumé, SEO/JSON-LD)

The originating repository **does not include a license file**, which under
copyright law means "all rights reserved." I adapted it for personal,
non-commercial use with explicit attribution. If you fork this repo, please
carry the credit forward to Abhishek — and if you're him and reading this,
thank you for the beautiful work; happy to adjust or remove anything on request.

### Other asset credits
- **Planet textures** — [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0)
- **HDRI lighting** — "Dikhololo Night" from [Poly Haven](https://polyhaven.com) (CC0)
- **3D models** (astronaut, spaceship) — [Quaternius Ultimate Space Kit](https://quaternius.com) (CC0)
- **ISS model** — [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) (public domain)
- Everything else (rocket hull, nebula, rings, HUD artwork) is generated procedurally in code.

---

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict)
- **3D:** three r0.185 + @react-three/fiber 9 + drei 10 + @react-three/postprocessing
- **Scroll:** Lenis smooth scroll
- **State:** zustand 5
- **Styling:** Tailwind CSS v4
- **Deploy:** Vercel

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

> Restart the dev server after adding files to `/public` — Turbopack doesn't
> always pick them up hot.

## Project structure

```
src/
├── app/            # Next.js App Router — layout, page, SEO routes
├── components/
│   ├── canvas/     # R3F scene: CameraRig, Rocket, Planets, SunImpact, …
│   └── dom/        # HTML overlays: Navbar, HUD, panels, modal, cursor
└── lib/
    ├── data.ts     # ← all content lives here (edit to rebrand)
    ├── journey.ts  # scroll → camera/rocket flight paths (the "map")
    ├── scroll.ts   # Lenis + scroll-state bus (no React re-renders)
    ├── store.ts    # zustand UI store
    ├── textures.ts # canvas-generated textures (cards, labels, glows)
    └── og.tsx      # dynamic Open Graph image
content/blog/       # MDX posts + images (ported from a previous blog)
public/             # textures, HDRI, GLB models, résumé PDF
```

**Change what the site says:** edit `src/lib/data.ts` — profile, experience,
skills, and projects all read from that one file.

---

Built on the work of Abhishek Badar. Content © Harry Yu.
