# Real images and data, by phase

Each entry gives the **type** (OBS = real observation or photo, DATA = a map built from measurements, SIM = simulation, ILL = artist's illustration), the **credit line to show on screen**, and the **source page**. Download the full-resolution file from the source page, or run `fetch_nasa_images.py` for the NASA Image Library.

> Status: the source pages below come from web search results. The NASA Image Library search (68 images) has since been downloaded and checked by eye: see [`review/REVIEW.md`](review/REVIEW.md) for the picks, and [`review/credits.csv`](review/credits.csv) for every image's type, verdict and credit. The ESA, ESO and other non-NASA sources in this file are not downloaded yet. Confirm each credit line on its page when you download it.

## Licences in one table

| Source | Licence | What you must do |
|---|---|---|
| **NASA** (incl. JPL, Goddard, Webb and Hubble releases on nasa.gov) | Generally not copyrighted in the US | Credit "NASA" (plus partners named on the page). **Never use the NASA logo or insignia**, and don't imply endorsement ([guidelines](https://www.nasa.gov/multimedia/guidelines/index.html)). Some images on NASA sites are third-party; check the credit. |
| **ESA/Webb, ESA/Hubble** | CC BY 4.0 | Visible credit, wording unaltered, e.g. "ESA/Webb, NASA & CSA, …" ([ESA/Hubble terms](https://esahubble.org/copyright/)). |
| **ESO / ALMA (ESO/NAOJ/NRAO)** | CC BY 4.0 | Credit as given on the image page. |
| **ESA science (Planck, Gaia)** | Usually CC BY-SA 3.0 IGO | Credit (e.g. "ESA/Gaia/DPAC"), and share-alike applies. Check the page. |
| **NASA Earth Observatory / Visible Earth** | Free to use with credit | [Image use policy](https://earthobservatory.nasa.gov/ImageUse) |
| **Ron Blakey / Deep Time Maps paleogeography** | **Copyrighted, commercial licence** | Don't use without a licence. Use GPlates-rendered maps instead (see `code-to-borrow.md`). |

---

## Phase 1: Big Bang and the first matter

| Type | Image | Credit | Source |
|---|---|---|---|
| DATA | **Planck all-sky CMB map** (2018 Legacy release), the sharpest image of the infant universe | ESA and the Planck Collaboration | [sci.esa.int, The sky as seen by Planck](https://sci.esa.int/web/planck/-/60503-the-sky-as-seen-by-planck) · [Planck vs WMAP](https://sci.esa.int/web/planck/-/the-cosmic-microwave-background-as-seen-by-planck-and-wmap) |
| DATA | **COBE → WMAP → Planck comparison** (same patch of sky, three generations). A strong "focus pull" shot. | NASA/JPL-Caltech/ESA | [PIA16874](https://www.jpl.nasa.gov/images/pia16874-the-universe-comes-into-sharper-focus/) |
| DATA | WMAP 9-year CMB map | NASA/WMAP Science Team | [WMAP image archive](https://map.gsfc.nasa.gov/resources/otherimages.html) |
| ILL | **"Timeline of the Universe"** (inflation → CMB → dark ages → first stars → galaxies → dark energy). Useful as a style reference or a direct shot. | NASA/WMAP Science Team | [WMAP featured images](https://map.gsfc.nasa.gov/resources/featured_images_3yr_release.html) · [Cosmic Times](https://imagine.gsfc.nasa.gov/educators/programs/cosmictimes/universe_mashup/archive/pages/wmap.html) |

## Phase 2: Birth and death of the first stars

| Type | Image | Credit | Source |
|---|---|---|---|
| OBS | **Webb's First Deep Field** (SMACS 0723), thousands of galaxies with lensed early ones | NASA, ESA, CSA, STScI | [science.nasa.gov](https://science.nasa.gov/asset/webb/webbs-first-deep-field-nircam-image) |
| OBS | **Hubble Ultra Deep Field 2014** (~10,000 galaxies, 841 orbits) | NASA, ESA, and the HUDF team | [science.nasa.gov](https://science.nasa.gov/asset/hubble/hubble-ultra-deep-field-2014/) |
| ILL | **First stars (Population III)** clustering into proto-galaxies, ~200-400 million years after the Big Bang | NASA | Search "first stars" on images.nasa.gov (`fetch_nasa_images.py`, phase 2) |
| OBS | Spitzer "Out of the darkness comes stars", a possible glow from the first-star era | NASA/JPL-Caltech | [AstroPix ssc2005-22b](https://www.astropix.org/image/spitzer/ssc2005-22b) |
| OBS | **Cassiopeia A** (Webb), a star's death scattering oxygen, argon and neon. The "we are star stuff" shot. | NASA, ESA, CSA, STScI | [science.nasa.gov](https://science.nasa.gov/missions/webb/webb-reveals-never-before-seen-details-in-cassiopeia-a/) |
| OBS | **Pillars of Creation** (Webb NIRCam), star birth happening today, as a stand-in for star birth then | NASA, ESA, CSA, STScI | [NIRCam](https://science.nasa.gov/asset/webb/pillars-of-creation-nircam-image/) · [NIRCam+MIRI](https://science.nasa.gov/asset/webb/pillars-of-creation-nircam-and-miri-composite-image) |
| OBS | Crab Nebula (Webb 2023 / Hubble), a supernova remnant | NASA, ESA, CSA, STScI | Search "Crab Nebula Webb" on science.nasa.gov |

## Phase 3: Galactic disks

| Type | Image | Credit | Source |
|---|---|---|---|
| DATA | **Gaia's map of the Milky Way** (1.8 billion stars, EDR3), our own disk seen edge-on from inside | ESA/Gaia/DPAC | [sci.esa.int](https://sci.esa.int/web/gaia/-/the-colour-of-the-sky-from-gaia-s-early-data-release-3) · [equirectangular version, for 3D sky domes](https://sci.esa.int/web/gaia/-/the-colour-of-the-sky-from-gaia-s-early-data-release-3-equirectangular-projection) |
| OBS | **Phantom Galaxy M74 / NGC 628** (Webb, PHANGS), a grand-design spiral disk | ESA/Webb, NASA & CSA, J. Lee and the PHANGS-JWST Team | [NASA poster PDF](https://assets.science.nasa.gov/content/dam/science/missions/webb/outreach/posters/webb-PhantomGalaxy-mini-8x10.pdf) · search "Phantom Galaxy" on esawebb.org for the full image |
| OBS | PHANGS-JWST spiral set (19 galaxies) | NASA, ESA, CSA, STScI, PHANGS | [U. Arizona release](https://news.arizona.edu/story/webb-telescope-reveals-stunning-structures-nearby-spiral-galaxies) |
| OBS | **ceers-2112**, a Milky Way-like barred spiral only ~2 billion years after the Big Bang | per release (CAB/UCR/NASA) | [UCR release](https://cnas.ucr.edu/media/2023/11/14/webb-telescope-spots-most-distant-milky-way-galaxy-yet) |
| ILL | Annotated Milky Way illustration (arms, bar, Sun's position) | NASA/JPL-Caltech/R. Hurt (SSC-Caltech) | Search "Milky Way annotated" on images.nasa.gov |

## Phase 4: The solar system forms

| Type | Image | Credit | Source |
|---|---|---|---|
| OBS | **HL Tauri protoplanetary disk** (ALMA), rings and gaps where planets form | ALMA (ESO/NAOJ/NRAO) | [eso1436a](https://www.astropix.org/image/eso/eso1436a) · [annotated eso1436c](https://eso.org/public/images/eso1436c) · [release](https://eso.org/public/news/eso1436/) |
| OBS | PDS 70, a disk with two forming planets (ALMA / VLT) | ALMA (ESO/NAOJ/NRAO) / ESO | Search "PDS 70" on eso.org |
| SIM | **Moon-forming impact** (NASA Ames / Durham, 2022), the Moon forms in hours | NASA Ames / Durham University (J. Kegerreis et al.) | [Overview](https://thekidshouldseethis.com/post/moon-formation-nasa-simulation-2022-video); search "Moon formation simulation 2022" on nasa.gov |
| OBS | Allende meteorite with visible CAIs (the solar system's oldest solids) | Check source (Smithsonian / NASA) | Search "Allende meteorite CAI" |
| DATA | Planet surface textures for 3D | Solar System Scope (CC BY 4.0); NASA/JPL Photojournal (public domain) | [solarsystemscope.com/textures](https://www.solarsystemscope.com/textures/) |

## Phase 5: The first layers of the atmosphere

| Type | Image | Credit | Source |
|---|---|---|---|
| OBS | **Atmosphere layers at sunset from the ISS**: orange troposphere, pink-white stratosphere, blue mesosphere | NASA | [UCAR](https://scied.ucar.edu/image/earths-atmosphere-iss) · [NASA image detail](https://www.nasa.gov/image-detail/amf-s100e5498) |
| OBS | **Airglow** layer above the limb | NASA | [nasa.gov](https://www.nasa.gov/image-article/upper-atmospheric-airglow/) |
| ILL | **Archean Earth with orange haze** | NASA | [astrobiology.com article](https://astrobiology.com/2017/02/08/studying-ancient-earth-to-understand-hazy-exoplanets/) (find the original on images.nasa.gov) |
| OBS | Living **stromatolites, Shark Bay** (stand-in for the microbes that made our oxygen) | Check source (many CC photos exist) | Search "Shark Bay stromatolites" on Wikimedia Commons |
| OBS | **Full Earth from DSCOVR/EPIC** (1 million miles away, daily). Good as the "arrival" shot. | NASA EPIC Team | [epic.gsfc.nasa.gov](https://epic.gsfc.nasa.gov) (open API: `api.nasa.gov` EPIC) |

## Phase 6: Earth's transformations before humans

| Type | Image | Credit | Source |
|---|---|---|---|
| SIM/DATA | **1.8 billion years of plate motion** (Cao et al. 2024). Coastlines for any age 0-1800 million years come straight from the GPlates Web Service as model `CAO2024` (`fetch_assets.py coastlines`); render them as your own globe frames. | Cao et al. 2024, *Geoscience Frontiers*; EarthByte (check the Zenodo licence) | [EarthByte](https://www.earthbyte.org/geoscience-frontiers-earths-tectonic-and-plate-boundary-evolution-over-1-8-billion-years/) · [data, doi:10.5281/zenodo.11536686](https://doi.org/10.5281/zenodo.11536686) |
| DATA | Plate boundary globes | NASA Goddard SVS | [SVS 1288](https://svs.gsfc.nasa.gov/1288) · [SVS 1252](https://svs.gsfc.nasa.gov/1252) |
| OBS | Chicxulub crater, SRTM shaded relief of the Yucatán | NASA/JPL-Caltech | Search "Chicxulub" on photojournal.jpl.nasa.gov |
| ILL | Snowball Earth | Check source | [Eos article](https://eos.org/articles/how-animals-may-have-conquered-snowball-earth) for a lead; prefer a NASA or own-rendered version |
| OBS | Jack Hills zircon (oldest Earth material, ~4.4 billion years) | UW-Madison (J. Valley) | [UW-Madison](https://news.wisc.edu/ancient-rocks-reveal-evidence-of-the-first-continents-and-crust-recycling-processes-on-earth) (ask permission) |

## Live data APIs (for data-driven shots)

- **NASA Image and Video Library API** at `images-api.nasa.gov` (no key needed). Used by `fetch_nasa_images.py`.
- **NASA EPIC API** for daily full-disk Earth images (`api.nasa.gov`, free key).
- **GPlates Web Service** reconstructs coastlines and plates at any past age as GeoJSON (see `code-to-borrow.md`).
- **JPL Horizons** for real planet positions (Solar Wanderer uses these ephemerides).
