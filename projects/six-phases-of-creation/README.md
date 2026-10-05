# Six Phases of Creation (research pack)

Research for a science film in six phases: the Big Bang, the first stars, galactic disks, the solar system, the first atmosphere, and Earth's transformations before humans. Built from NASA, ESA, ESO and peer-reviewed sources, plus public code to borrow for the 3D shots.

| File | What's in it |
|---|---|
| [`research.md`](research.md) | The science per phase: dates, key facts, what's still debated, on-screen numbers, a "cosmic calendar" scale aid, honesty rules. |
| [`image-sources.md`](image-sources.md) | Real images and data per phase, each labelled observation / data map / simulation / illustration, with credit lines and licences. |
| [`code-to-borrow.md`](code-to-borrow.md) | GitHub repos for galaxy, black-hole, solar-system and ancient-Earth visuals, each with its licence verified from the LICENSE file, plus HyperFrames issues to know before rendering WebGL. |
| [`review/`](review/REVIEW.md) | Eye check of the downloaded NASA images and coastlines: picks per phase, rejects, gaps. |
| [`fetch_assets.py`](fetch_assets.py) | Downloads NASA Image Library originals per phase (with `credits.csv`) and past coastlines (GeoJSON, 0-1800 million years) from the GPlates Web Service. |

## Getting the files

```sh
cd projects/six-phases-of-creation
python3 fetch_assets.py nasa --dry-run            # list what would download
python3 fetch_assets.py nasa --per-query 3        # download originals to assets/nasa/phase-N/
python3 fetch_assets.py coastlines --from 1800 --to 0 --step 25
```

Needs network access to `images-api.nasa.gov`, `images-assets.nasa.gov` and `gws.gplates.org`. The sandbox this was researched in blocks them, so the script was tested against a local mock of both APIs, not the live ones. `assets/` is git-ignored: the files are large and some carry share-alike or attribution terms.

After downloading, open `assets/nasa/credits.csv` and fill the `type` column (OBS / DATA / SIM / ILL) by eye. The NASA library mixes real photos with illustrations, and almost half of a keyword search can be off-topic.

**Done once already:** [`review/`](review/) holds the eye-checked NASA set (1200px review copies of the keepers and alternates), [`review/REVIEW.md`](review/REVIEW.md) with picks per phase and the gaps still to fill, and `review/credits.csv` with a type, verdict and note for all 68 downloaded images.

## Next steps toward the film

1. Lock the narrative: one sentence per phase, built from `research.md`.
2. Pick 2-3 hero images per phase from `image-sources.md`. Prefer observations; use illustrations only where no observation can exist, and label them.
3. Prototype the 3D shots in the component lab (`business-motion-film/templates/component-lab.html`): expanding particle field (phase 1-2), spiral disk forming (phase 3), protoplanetary disk to planets (phase 4), GPlates coastlines on a globe (phase 6). Keep them deterministic and seekable.
4. Run the Gauntlet review loop from `business-motion-film/references/gauntlet.md`, adding a **science-accuracy critic** that checks every on-screen number against `research.md`.
