# harryyu.dev — show how it's built

Static Astro site. No tracking, no cookies, no third-party requests, works
without JavaScript. Theme toggle is a pair of 944 pop-up headlights. One
easter egg (you know the code).

## Run and deploy

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

Deploy: any static host. Point it at `dist/`. On Vercel/Netlify, the Astro
preset is detected automatically; push to deploy. Set the canonical domain
in `astro.config.mjs` (`site`).

Lighthouse (home, headless Chrome): performance 98, accessibility 100,
best-practices 100, SEO 100. Note: Lighthouse 13.5's bundled axe flags a
`label-content-name-mismatch` on the headlights button that current
axe-core (4.10) passes — verified false positive, no score impact.

## How to add a project

1. Create `src/content/projects/<slug>.mdx`:

```mdx
---
title: "Project name"
slug: "project-name"
summary: "One sentence, dry."
year: "2026"
role: "What you did"
stack: ["Tool", "Material"]
status: "shipped"        # shipped | in progress | archived
category: "making"       # work | making | play
featured: false          # featured cards get wider on the home grid
links: []                # or [{ label: "Try it", url: "https://..." }]
order: 7                 # sort position (J/K walks this order)
---

## What it is

## How it's built

## What broke

## What I'd change
```

2. Optional parts-list table and annotated images (MDX):

```mdx
import Callout from "../../components/Callout.astro";

| Part | Qty | Note |
| ---- | --- | ---- |
| M4 bolt | 4 | TODO |

<Callout n={1}>The housing indexes on this ridge.</Callout>
```

`slug` must match the filename. `order` decides prev/next (J/K).

## How to add a garage entry

Create `src/content/garage/<slug>.mdx`:

```mdx
---
title: "Job title"
date: 2026-10-19
mileage: 148800          # optional
parts: ["part", "part"]
cost: "$120"             # optional
difficulty: 3            # 1–5
status: "done"           # free text
summary: "One line for the changelog."
---

Body: what happened, in order. TODO markers welcome.
```

Sorted newest-first automatically. The home Garage slab shows the latest
three.

## Content surfaces that must stay in sync

- All copy lives in the collections above plus `src/pages/index.astro` (hero, about) and the
  static pages (`pit`, `404`).
- Site meta defaults live in `src/components/BaseLayout.astro`.

## Remaining TODOs

- All placeholder copy marked `TODO` in the six project files and three
  garage entries — replace with real details.
- `steam-machine` project: everything except category is TODO.
- Project `cover` images: schema supports `cover`, templates don't render
  them yet (add when art exists).
- `cost` fields in garage entries: TODO.
- "Now" block in the home About section: TODO.
- `/pit` build log: keep appending as the site evolves.

## Structure

```
src/
├── pages/
│   ├── index.astro          # home: hero + 5 slabs
│   ├── work/[slug].astro    # technical-drawing project pages
│   ├── garage/              # changelog + entry pages
│   ├── pit.astro            # easter egg (noindex, unlinked)
│   └── 404.astro
├── components/
│   ├── BaseLayout.astro     # frame + the one script (hotkeys/theme/reveal)
│   ├── Slab.astro           # cantilevered slab
│   ├── BackgroundCar.astro # car drawing + unmasked rigid headlight meshes
│   ├── SpecCard.astro       # project spec card
│   └── Callout.astro        # numbered annotation
├── content/
│   ├── projects/*.mdx
│   └── garage/*.mdx
├── lib/                     # headlight geometry + animation controller
├── styles/                  # global.css (tokens) + components.css
└── content.config.ts        # typed collection schemas
```

Client JS: a small inline theme initializer plus a bundled vanilla TypeScript module. Style: softlabor.biz
register — flat peach ground, black Times-metric serif (Tinos), hairline
black rules, print-noise displacement on headings (off <760px and under
reduced motion).


## Headlight geometry

The two headlight assemblies are mirrored tapered housings, lofted from
equilateral triangular cross-sections through the original curved lid outline.
The bulb housing shares the lid’s curved front seam and rounded taper. `src/lib/headlight-geometry.mjs` rotates every vertex around
one fixed hinge; it clips below-hood geometry, applies camera elevation and a
mirrored 4° yaw, then projects using an 1800-unit focal distance. The opening
angle is derived from the camera elevation so the bulb face stops facing the
camera vertically, with the subtle mirrored outward angle retained. The lid
perimeter is inverse-projected from the original SVG contour, preserving its
curved corners and taper in the closed pose. Below-hood clipping is applied
per cross-section so it also respects the curved housing during travel. Faces retain their dimensions in model space.

The lid remains opaque throughout rotation. SVG faces are drawn in depth order,
so the opaque bulb housing covers it naturally. Lens rings and fluting use the
same projection. The entire assembly and its separate aura avoid the body SVG's
central mask. Motion uses requestAnimationFrame with quintic easing; reduced
motion jumps directly to the endpoint. Both click targets track the visible
assembly, including while reversing direction.

Run `npm test` for rigid geometry, symmetry and endpoint checks. No WebGL or
animation dependency is needed. The original contour body remains an SVG.
