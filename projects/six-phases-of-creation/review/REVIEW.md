# Eye check of the image downloads (October 2026)

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
| 2 First stars | **external/webb-deep-field-full** Webb's First Deep Field, 4537px | OBS | Hero for early galaxies (replaces the 1960px library copy) |
| | GSFC…e001651 Hubble eXtreme Deep Field | OBS | Second deep field |
| | **external/webb-cas-a** Webb Cassiopeia A (2023) | OBS | "Stars die and scatter the elements". Sharper than PIA03519, which becomes the alternative |
| | external/webb-crab Webb Crab (2023) · PIA03606 Hubble Crab | OBS | Supernova remnants |
| | external/pillars-nircam Pillars of Creation, 8423x14589 portrait | OBS | Star birth today, as a stand-in for star birth then; vertical pan |
| 3 Galactic disks | **external/milky-way-ill** face-on Milky Way, no labels, 5600px | ILL | Hero illustration of our galaxy's disk |
| | **PIA18913** Planck Milky Way plane (top panel) | DATA | Our disk seen edge-on from inside |
| | external/phantom-galaxy Webb Phantom Galaxy M74 | OBS | Spiral disk; only 1977x1130 (HD, not 4K) |
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

## Second round: from the original publishers

The NASA keyword search missed the sources below, so a second pass fetched them from their original publishers ([`external/sources.csv`](external/sources.csv) has page, file, credit and licence word for word). ESA/Webb images are free to use with the credit shown under each image ([esawebb.org/copyright](https://esawebb.org/copyright/)). All were checked by eye:

| Target | Result |
|---|---|
| Webb First Deep Field, Cas A, Crab, Pillars of Creation | ✅ keep (full-size from esawebb.org) |
| Phantom Galaxy (Webb) | ✅ keep, HD only (1977x1130) |
| Milky Way illustration, no labels | ✅ keep (NASA PIA10748, 5600px) |
| First-stars illustration | ⚠️ only 644x481 (PIA09099), style reference. The other candidate was a duplicate of PIA14875 and was removed |
| Moon-forming impact simulation (Ames/Durham 2022) | ⚠️ right content, but the downloaded social cut has captions burned into every frame. Find the caption-free version |

## Still missing (the helper's environment blocks these hosts)

| Wanted | Phase | Host to allow |
|---|---|---|
| Gaia colour map of the sky (+ equirectangular) | 3 | `sci.esa.int` |
| HL Tauri ALMA disk (eso1436a), PDS 70 | 4 | `www.eso.org`, `cdn.eso.org` |
| Full-disk Earth (DSCOVR/EPIC) | 5 | `epic.gsfc.nasa.gov` |
| Shark Bay living stromatolites (CC-licensed) | 5 | `commons.wikimedia.org`, `upload.wikimedia.org` |
| Snowball Earth illustration | 6 | `assets.science.nasa.gov`, `earthobservatory.nasa.gov`, or Wikimedia. Otherwise render our own from the coastline data |
| A full-resolution first-stars illustration | 2 | `assets.science.nasa.gov` (science.nasa.gov pages load, but their image files are blocked) |
| Caption-free Moon-formation simulation | 4 | `svs.gsfc.nasa.gov` |

## Coastlines (CAO2024, every 100 million years, 1800 Ma to today)

Drawn to check them ([`coastlines/preview.jpg`](coastlines/preview.jpg)): **0 Ma** matches today's map, **200 Ma** is Pangaea, **300 Ma** shows it assembling, **500-400 Ma** has Gondwana over the South Pole, and **~1000 Ma** shows Rodinia clustering. The data is sound. Two things to handle when building the shot:
- On a flat map, polar land smears into bands along the top or bottom edge (800, 500, 400, 200 Ma). Put the coastlines on a 3D globe.
- A few ages contain one polygon that crosses the 180° line. Split it at the dateline (gplately does this) or it draws a stripe across the map.

The 50-million-year in-between steps are in the helper's local `assets/` only. Re-run `fetch_assets.py coastlines --step 50` (or finer) when building the animation.

## Limits of this check

- Tiles were viewed at ~640px. That is enough for subject, type and off-topic calls, but not for fine defects. Check each hero at full size before it goes into an edit.
- Credits marked "check" in `credits.csv` come from NASA's library metadata, which sometimes shortens the partner list. Confirm on the original release page before publishing.
