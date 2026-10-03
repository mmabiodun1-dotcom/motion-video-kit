# Public code to borrow from

Found by searching GitHub repositories, code, issues and pull requests (October 2026). Each licence was read from the repo's own LICENSE file, not the description. One repo's description says "MIT" while its LICENSE says non-commercial.

**Licence key:** ✅ OK to copy into a commercial film with attribution · ⚠️ copy with conditions · 🚫 study only, don't copy.

## By phase

| Phase | Repo | What to take | Licence |
|---|---|---|---|
| 1-2 | [N0rvel/galaxy_sim](https://github.com/N0rvel/galaxy_sim) (160★) | GPU-shader gravity on thousands of particles. Has an **expanding-universe** mode, a single-galaxy mode and a **galaxy collision** mode: the matter-clumping-after-the-Big-Bang shot. | ✅ MIT |
| 2 | [chrismatgit/black-hole-simulation](https://github.com/chrismatgit/black-hole-simulation) | Three.js and GLSL gravitational lensing plus an accretion disk, for "the first stars collapse into black holes". | ✅ MIT |
| 2-3 | [andrewdcampbell/galaxy-sim](https://github.com/andrewdcampbell/galaxy-sim) | WebGL N-body where gas clouds coalesce into stars orbiting a black hole. Exactly phase 2→3, but… | 🚫 no licence file |
| 3 | [AmitDigga/threejs-galaxy-shader](https://github.com/AmitDigga/threejs-galaxy-shader) | Spiral-galaxy point-cloud shader with arms, twist and colours, published on npm (`threejs-galaxy-shader`). Fastest route to a **disk forming** shot: animate the spiral parameters from 0. | ✅ MIT |
| 3 | [zjoooooo/galaxy-explorer](https://github.com/zjoooooo/galaxy-explorer) | Procedural Milky Way with no build step. | 🚫 PolyForm **Noncommercial** (the description wrongly says MIT) |
| 4 | [hyqzz/Solar-Wanderer](https://github.com/hyqzz/Solar-Wanderer) (745★) | 1:1 solar system from **NASA JPL ephemerides**, Three.js, 16K-32K textures. Textures are Solar System Scope (CC BY 4.0) plus NASA. | ✅ MIT (credit the textures) |
| 4 | [sanderblue/solar-system-threejs](https://github.com/sanderblue/solar-system-threejs) (413★) | Older, simpler to-scale solar system, easier to read. | ✅ Apache-2.0 |
| 4 | [la-niche/nonos](https://github.com/la-niche/nonos) | Python plotting for protoplanetary-disk simulations: use it to make frames, don't copy its code. | ⚠️ GPL-3.0 (use as a tool; output images are yours) |
| 6 | [GPlates/gplates-web-service](https://github.com/GPlates/gplates-web-service) | **HTTP API**: `https://gws.gplates.org/reconstruct/coastlines/?time=600&model=CAO2024` returns GeoJSON coastlines for any age 0-1800 million years (the Cao et al. 2024 model). No install needed. | ✅ public service (GPL server code; we only call it) |
| 6 | [GPlates/gplately](https://github.com/GPlates/gplately) | Python: reconstruct plates, coastlines and seafloor age offline, and plot maps (`pip install gplately`). | ⚠️ GPL-2.0 (use as a tool) |
| 6 | [typpo/ancient-earth](https://github.com/typpo/ancient-earth) | 3D globe of Earth 600 million years ago to today (the dinosaurpictures.org viewer). The **code** is MIT, but its texture maps are Ron Blakey's, which are copyrighted. Use the globe code with GPlates-rendered textures. | ⚠️ MIT code, 🚫 maps |
| all | [OpenSpace/OpenSpace](https://github.com/OpenSpace/OpenSpace) (1.2k★) | NASA-funded planetarium software (AMNH and partners). It can fly from Earth out to the CMB using real catalogues. Record camera flights as footage or reference. | ✅ MIT (check each dataset's licence) |
| all | [langurmonkey/gaiasky](https://github.com/langurmonkey/gaiasky) | Gaia Sky, a Milky Way explorer built on real Gaia data (mirror of codeberg.org/gaiasky). | check the upstream licence |

## Pipeline: getting assets and rendering

| Repo | Use | Licence |
|---|---|---|
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | The renderer this kit is built around (HTML/GSAP → video). | Apache-2.0 |
| [nexu-io/html-video](https://github.com/nexu-io/html-video) | Alternative HTML→MP4 renderer with pluggable engines. | Apache-2.0 |
| [peteretelej/nasa](https://github.com/peteretelej/nasa) | Go client and CLI for NASA APIs (APOD, **NASA Image Library**, EONET…), with an **MCP server**, so an agent can search NASA images directly. | MIT |
| [TheAlgorithms/Python `web_programming/nasa_data.py`](https://github.com/TheAlgorithms/Python/blob/master/web_programming/nasa_data.py) | Minimal example of calling `images-api.nasa.gov/search`. | MIT |
| [bolinocroustibat/universe-timeline](https://github.com/bolinocroustibat/universe-timeline) | Zoomable Big Bang-to-today timeline UI, an idea for the "scale of time" graphic. | 🚫 no licence |

## Issues and PRs worth knowing before building 3D scenes

- [heygen-com/hyperframes#1260](https://github.com/heygen-com/hyperframes/issues/1260) (closed): **Three.js/WebGL content missing in rendered video** in v0.6.x. Pin a version where WebGL renders, and check the first render's contact sheet.
- [heygen-com/hyperframes#4435](https://github.com/heygen-com/hyperframes/issues/4435) (open): **a parallel render worker's first frame captures the state before seeking.** Particle and N-body scenes must be **deterministic and seekable** (state computed from time `t`, not accumulated per frame), as `business-motion-film/references/three-js-patterns.md` already requires. Otherwise, check the first frame of every chunk.
- [heygen-com/hyperframes#4463](https://github.com/heygen-com/hyperframes/pull/4463) (closed PR): "three blocks keep their settings when mounted", relevant if you use the registry's Three.js blocks.

## Caution: simulations are not seekable as-is

Most galaxy and N-body repos above step physics frame by frame in real time, which breaks deterministic rendering. Two safe options:
1. **Bake**: run the simulation once offline, save particle positions per frame (e.g. a Float32Array per frame, or every Nth frame plus interpolation), and have the render scene read positions for time `t`.
2. **Analytic**: replace physics with closed-form motion (e.g. spiral-arm angle = f(radius, t)), as `threejs-galaxy-shader` does. Seekable for free.
