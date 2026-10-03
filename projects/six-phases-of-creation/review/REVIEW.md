# Eye check of the NASA downloads (October 2026)

`fetch_assets.py nasa --per-query 3` returned **68 images** across the six phases. Every one was looked at as a labelled ~640px tile. Its NASA description was checked against what the picture shows, and each image got a **type**, a **verdict** and a note in [`credits.csv`](credits.csv).

- **Type:** OBS = real photo or observation, DATA = map or visualisation of measurements, SIM = simulation, ILL = artist's illustration. "DATA+ILL" means real data with an illustrated element (usually a spacecraft render).
- **Verdict:** keep (18), alt (19), reject (31). Rejected review copies were deleted from `phase-N/`; their rows stay in `credits.csv`.

**Main finding: keyword search alone is unreliable.** Almost half the results were off-topic: mission-control staff, event audiences, a rocket stage with painted stars ("first stars"), comets returned for "Snowball Earth", Skylab for "Earth from space". Every future download needs the same eye check.

## Picks by phase

| Phase | Keep | Type | Why |
|---|---|---|---|
| 1 Big Bang | **PIA16874** COBE → WMAP → Planck | DATA+ILL | Hero: the same patch of the infant universe getting sharper |
| | PIA18916 Planck CMB polarisation | DATA | Title or texture plate |
| | PIA07142 Big Bang → first galaxies → spirals | ILL | Bridge to phases 2-3; label as illustration |
| 2 First stars | **webb_first_deep_field** (filed under phase-3) | OBS | Hero for early galaxies. Only 1960px here: get the full release |
| | GSFC…e001651 Hubble eXtreme Deep Field | OBS | Second deep field |
| | **PIA03519** Cassiopeia A, three-telescope composite | OBS | "Stars die and scatter the elements" |
| | PIA03606 Hubble Crab Nebula · e000053 Crab, radio to X-ray | OBS | Supernova remnants |
| 3 Galactic disks | **PIA18913** Planck Milky Way plane (top panel) | DATA | Our disk seen edge-on from inside |
| | GSFC…e001935 Whirlpool M51 in dust light | OBS | Clean spiral disk |
| 4 Solar system | PIA20645 young star in its disk | ILL | Opener; label as illustration |
| | PIA09967 forming system in a dusty cocoon | ILL | |
| | PIA03048 olivine crystals, "seeds of planets" | ILL | Distinctive macro shot |
| 5 Atmosphere | **sts052-15-007** sunset limb layers (Shuttle, 1992) | OBS | Hero. NASA says this layering was unusual (1991 Pinatubo debris), so don't call it typical |
| | **STS052-23-022** limb at dawn with crescent Moon | OBS | Hero alternative |
| | **GSFC…e000888** Hadean Earth: lava and impacts | ILL | Early-Earth hero; credit NASA Goddard Conceptual Image Lab |
| | PIA24240 2.7-billion-year-old stromatolite | OBS | Real evidence of oxygen-making microbes |
| 6 Earth's changes | **PIA03379** Chicxulub crater rim, SRTM relief | DATA | End-Cretaceous extinction hero (18001px original) |
| | Coastlines CAO2024 (below) | DATA | Continents over 1.8 billion years |

## Gaps: the search terms didn't find these

The sources listed in `image-sources.md` that are still missing are better fetched by exact title than by topic word:

| Wanted | Phase | Try instead |
|---|---|---|
| Webb Cassiopeia A (2023), Webb Crab (2023) | 2 | Search "Webb Cassiopeia A", "Webb Crab Nebula" on science.nasa.gov |
| Population III / first-stars illustration | 2 | Exact title on images.nasa.gov; "first stars" returned a rocket stage |
| Pillars of Creation (Webb) | 2 | "Pillars of Creation" |
| Phantom Galaxy M74, PHANGS spirals | 3 | esawebb.org (ESA/Webb, CC BY 4.0), not in the NASA library search |
| Gaia Milky Way map | 3 | sci.esa.int (ESA, not NASA) |
| HL Tauri ALMA disk | 4 | eso.org eso1436a (CC BY 4.0) |
| Moon-forming impact simulation (Ames/Durham 2022) | 4 | NASA SVS or nasa.gov video, not images |
| Full-disk Earth (DSCOVR/EPIC) | 5-6 | EPIC API |
| Snowball Earth | 6 | No NASA image found; render our own from the coastline data, or license one |

## Coastlines (CAO2024, every 100 million years, 1800 Ma to today)

Drawn to check them ([`coastlines/preview.jpg`](coastlines/preview.jpg)): **0 Ma** matches today's map, **200 Ma** is Pangaea, **300 Ma** shows it assembling, **500-400 Ma** has Gondwana over the South Pole, and **~1000 Ma** shows Rodinia clustering. The data is sound. Two things to handle when building the shot:
- On a flat map, polar land smears into bands along the top or bottom edge (800, 500, 400, 200 Ma). Put the coastlines on a 3D globe.
- A few ages contain one polygon that crosses the 180° line. Split it at the dateline (gplately does this) or it draws a stripe across the map.

The 50-million-year in-between steps are in the helper's local `assets/` only. Re-run `fetch_assets.py coastlines --step 50` (or finer) when building the animation.

## Limits of this check

- Tiles were viewed at ~640px. That is enough for subject, type and off-topic calls, but not for fine defects. Check each hero at full size before it goes into an edit.
- Credits marked "check" in `credits.csv` come from NASA's library metadata, which sometimes shortens the partner list. Confirm on the original release page before publishing.
