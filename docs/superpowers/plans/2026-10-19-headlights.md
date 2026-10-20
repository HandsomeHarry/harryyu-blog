# Rigid Porsche headlight implementation

Goal: implement the user's equilateral triangular side profile and square bulb face as one rigid assembly per lamp.

Architecture: pure geometry in src/lib/headlight-geometry.mjs, SVG rendering and requestAnimationFrame timing in src/lib/headlights.ts, unmasked opaque assemblies in BackgroundCar.astro. Preserve the car illustration. Rotate all vertices about one hinge, clip against the hood plane, apply camera elevation and mirrored yaw, then perspective-divide. Sort faces by depth; project lens details with the bulb face. Never fade or shrink the lid.

- [x] Test constant edge lengths, hinge invariance, bilateral symmetry, final bottom alignment, finite projections, and hood clipping with node:test.
- [x] Implement shared geometry with a 144-unit equilateral section, camera elevation calibrated to the original 64-unit closed lid depth, and a long 1800-unit focal distance.
- [x] Replace independent lid/panel transforms with the shared geometry and opaque depth-sorted SVG faces. Project the circular lens and fluting on the face plane.
- [x] Use eased angular motion and requestAnimationFrame, continuous reversals, reduced-motion immediate endpoints, persistent theme and system preference changes.
- [x] Keep illumination outside the central car mask and anchor aura/hit targets to the projected lens.
- [x] Run geometry tests, build, and browser checks for day/night, intermediate poses, reversal, mobile, reduced motion and no-JS.

Research: Scratchapixel perspective projection; Three.js Object3D pivot transforms; Blender animation timing documentation. No 3D runtime dependency is required for this small mesh.

Validation: four geometry tests pass; all 13 static routes build. Chromium checks passed for intermediate rotation, opaque lids, unmasked emission, saved theme, rapid reversal, reduced motion, mobile clicks, system preference changes and no-JS rendering. No browser exceptions.
