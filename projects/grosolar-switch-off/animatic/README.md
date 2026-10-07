# Animatic (Stage 3)

A 60 s vertical (1080×1920) animatic for GroSolar sign-off, built as one deterministic HTML timeline. Every frame is a pure function of time, so the same second always renders the same picture.

## Files

| File | What it is |
|---|---|
| `timeline.js` | The shot list: times, supers, captions, VO lines, Ken Burns moves. Mirrors `STORYBOARD.md`. Edit timing here. |
| `animatic.js` | The engine and the code-built scenes: #8 grid → fuel receipt, #9 price tag, #10 offer, #11–#16 the grosolar.co flow on a phone, #23 sprout → sun, #24 end card. |
| `index.html` | Styles and the preview player. |
| `frames/NN.jpg` | Gemini stills, one per shot (`01.jpg` … `22.jpg`, plus `11a.jpg` for the street plate behind the phone). A missing file shows a placeholder card with the shot number and its Gemini prompt. |
| `ingest.sh` | Drops new frames in (see below). |
| `render.mjs` | Renders the MP4 and an `.srt` of every spoken line, using headless Chromium. No npm installs; needs Node 22+ and ffmpeg. |
| `fonts/` | Outfit (SIL Open Font License, `fonts/OFL.txt`), from the official Outfit repository. |

## Drop in new frames

1. Put the files in `inbox/`, named with their shot number first: `04.png`, `#4 compound.webp`, `11a-street.jpg`.
2. Run `./ingest.sh`. It archives each original in `../frames/gemini/` under its own name, crops any flat-black letterbox bars, and writes `frames/NN.jpg`.
3. For a still with a blank phone screen, run `python3 screen_quad.py NN` (add `--box x0,y0,x1,y1` if sky or another grey area is bigger than the screen). It writes the screen corners to `frames/quads.js` and a matte for any thumb or fingers in front of the screen.
4. Re-render. Nothing else needs to change.

## Preview and render

- **Preview:** open `index.html` in a browser. Space plays, the arrow keys step one frame, the shot chips jump (red = placeholder), and "Safe zones" shows the TikTok/Reels UI areas.
- **Render:** `node render.mjs --out out/animatic-vN.mp4` (about 3–5 minutes). Add `--client` for the client cut (no review slate, no TBC bugs). Options: `--scale 0.5` for a fast half-size check, `--from 20 --to 30` for a section, `--stills 3.5,24,56` for stills, `--slate 0` to hide the review slate.
- Output lands in `out/`. MP4s are git-ignored, so send renders directly rather than committing them.

## Notes

- The review slate (top left) shows the shot number, title, timecode and "placeholder" where a frame is pending. `--client` removes it and the red TBC bugs; captions, "Dramatisation" labels and the WhatsApp "TO CONFIRM" badge stay.
- `--safecheck` reports any text or UI inside the TikTok/Reels zones (bottom 20%, right 12%), sampled every 0.1 s.
- Every VO and dialogue line is on screen as a caption. The `.srt` written next to each render is the VO script with timings, ready for the voice session.
- The logo is still a dashed placeholder (`LOGO()` in `animatic.js`). Swap in the SVG when it arrives.
- #11–#16 use the #11b hand-and-phone still, pushed in `phonePush` (1.9) and centred at `phoneCenterY`; the screens are corner-pinned into its grey screen with the thumb matted on top. Without #11b it falls back to a code-built phone on the #11a plate.
- There's no audio. VO and music come in Stage 5.
