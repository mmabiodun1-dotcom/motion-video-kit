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

## Sound

Narration and music were generated with the ElevenLabs connector (flow "Six Phases of Creation – narration and score") and mixed offline with ffmpeg:

```sh
cd audio
python3 build_audio.py      # cut lines by word timings, place them, duck the music, mix
# then mux onto the picture (video stream copied untouched):
ffmpeg -i ../renders/six-phases-v2.mp4 -i master.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k out.mp4
```

- **Narration:** voice "Artaius – Calm British Narrator", model eleven_multilingual_v2, take B of four (chosen because its lines fit the shot windows best while speaking about 6% slower than the tightest take). The script and each line's on-screen window are in `audio/lines.py`; word timings from ElevenLabs Scribe are in `audio/narration-takes/words-*.json`; where each line landed is in `audio/narration-plan.json`. The supercontinent names are timed to their labels on the globe.
- **Music:** eleven_music_v2_5, instrumental, 100 s; take 3 of three (the other two faded out before the end card; a fourth failed because the account ran out of credits).
- **Mix:** narration at -17 LUFS, music at -25 LUFS ducked about 6 dB under speech, so the voice sits about 13 dB clear and the music returns between lines; master -16.4 LUFS integrated, peaks -1.5 dBFS. A music-only version is mastered to -16 LUFS as a fallback.
- **Limits:** levels and timing were measured, not listened to. The music's character and the voice's delivery still need a human ear.

## Not done yet

- Independent review: the kit's Gauntlet loop (a fresh critic on the render) has not been run on this cut.
