# Six Phases of Creation: film storyboard

**Brief:** a ~100 s, 1920x1080, 30 fps science film from the Big Bang to the Earth before humans, in the six phases of `../research.md`. Silent first cut (on-screen text only); music and narration come after picture lock. Audience: general viewers, religious and scientific alike, so the science is stated as science and the six phases are the film's own structure.

**Truth rules (from `research.md`):** every shot carries a type tag (Photo, Data, Illustration) and its credit. Nobody photographed the Big Bang, the first stars or the young Earth: those shots are illustrations, code-built motion or present-day stand-ins, and the tag says so. No NASA or ESA logos; an end card says the film is not produced or endorsed by either.

**Persistent objects:** a clock (top right) counting down "years ago" in log time, and a to-scale bar along the bottom edge showing where we are in 13.8 billion years. The bar barely moves for the first half of the film and races at the end. That imbalance is the point.

| Time (s) | Shot | Source | Tag | On-screen line | Clock |
|---|---|---|---|---|---|
| 0-8 | Point of light bursts into an expanding, cooling particle field | code-built | Illustration | Phase 1 · The Big Bang. "In the first three minutes, space filled with hydrogen and helium." | 13.8 billion |
| 7.4-13.5 | Planck polarisation map, slow push | PIA18916 | Data | "380,000 years later, the first light broke free. We still see it today." | 13.8 billion |
| 13-18 | COBE → WMAP → Planck | PIA16874 | Data (craft illustrated) | "Each telescope saw that light more sharply." | |
| 17.4-24 | Webb's First Deep Field, push in | weic2209a | Photo | Phase 2 · The first stars. "After 100 million years of darkness, the first stars lit up." | 13.7 → 13.4 billion |
| 23.4-29.5 | Webb Cassiopeia A | weic2311a | Photo | "Giant stars lived a few million years, then exploded, forging carbon, oxygen and iron." | |
| 29-34 | Webb Crab Nebula | weic2326a | Photo | "Every heavy atom on Earth was made in stars like these." | → 13.0 billion |
| 33.4-41 | Face-on Milky Way, slow turn | PIA10748 | Illustration | Phase 3 · Galaxies spin into disks. "Gas fell together, kept its spin and flattened into a disk. Ours began less than a billion years after the Big Bang." | → 10 billion |
| 40.4-46 | Webb Phantom Galaxy | potm2208a | Photo | "Our galaxy's disk now holds 100 to 400 billion stars." | → 4.567 billion |
| 45.4-52 | Young star in its dusty disk | PIA20645 | Illustration | Phase 4 · The Sun and its planets. "4.567 billion years ago, a cloud collapsed. The Sun lit up inside a disk of dust." | 4.567 billion |
| 51.4-57 | The Moon, Orientale Basin | art002e012273 | Photo | "A Mars-sized world struck the young Earth. The debris became our Moon." | 4.5 billion |
| 56.4-63 | Hadean Earth, slow pan | GSFC e000888 | Illustration | Phase 5 · A sky in layers. "Young Earth: lava, steam and impacts. The air had no oxygen." | → 3.5 billion |
| 62.4-68 | 2.7-billion-year-old stromatolite | PIA24240 | Photo | "Microbes learned to use sunlight. About 2.4 billion years ago they filled the air with oxygen." | → 2.4 billion |
| 67.4-74 | Earth's layered limb from the Shuttle | STS052-23-022 | Photo | "Oxygen built the ozone layer, and the sky gained its layers." | → 1.8 billion |
| 73.4-83 | Spinning globe, continents 1,800 → 100 million years ago | CAO2024 plate model | Data | Phase 6 · A restless planet. "Continents gathered and broke apart." Labels: Rodinia, Gondwana, Pangaea | clock drives the globe |
| 82.4-88 | Chicxulub crater rim in radar relief | PIA03379 | Data | "66 million years ago, an asteroid struck here. Its buried crater still shows in the land." | 66 million |
| 87.4-93 | Globe today | CAO2024 | Data | "300,000 years ago, the first people. This story ends where ours begins." | 300,000 |
| 92.4-100 | End card: title and credits | | | Credits, "Not produced or endorsed by NASA or ESA", "Illustrations and code-built sequences are labelled" | |

**Signature transformations:** the Big Bang's particle field cools into the Planck map's texture; the to-scale bar's crawl-then-sprint; the globe's continents assembling into Pangaea and splitting into today's map.

**Determinism:** particles use a seeded PRNG with positions computed from time; the globe and clock are pure functions of film time; images move with GSAP tweens on one paused timeline.
