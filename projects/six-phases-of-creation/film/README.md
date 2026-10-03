# Six Phases of Creation: the film

A ~100 s, 1920x1080 science film built as a HyperFrames composition: real NASA and ESA/Webb images with slow camera moves, a code-built Big Bang, a globe drawn from the CAO2024 plate model, and a "years ago" clock with a to-scale bar that runs through the whole film. Shot list and on-screen text: [`STORYBOARD.md`](STORYBOARD.md).

## Rebuild and render

```sh
cd projects/six-phases-of-creation/film
npm install                      # hyperframes, gsap, d3-geo, fonts
npx hyperframes browser ensure   # first time only
python3 build.py                 # SHOTS and CLOCK in build.py -> index.html
npx hyperframes check            # lint, layout, contrast
npx hyperframes render -f 30 -q delivery -o renders/six-phases.mp4
```

- Edit shots, lines, credits, timings and camera moves in `build.py`; design, the HUD, the particle field and the globe live in `src/template.html`. Never edit `index.html` by hand: `build.py` overwrites it.
- `assets/` holds 2560px copies of the chosen images (credits in `../review/credits.csv` and `../review/external/sources.csv`). `data/coast.js` is the simplified CAO2024 coastline data, 1800 Ma to today in 100 Ma steps.
- Everything animated is a pure function of film time (seeded particles, globe and clock computed from time), so any frame renders the same on its own.

## Not done yet

- Sound: the first cut is silent. Add music and, if wanted, narration after picture lock (see `../../../business-motion-film/references/audio.md`).
- Independent review: the kit's Gauntlet loop (a fresh critic on the render) has not been run on this cut.
