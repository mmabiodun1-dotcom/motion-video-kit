# Generation ledger — style frames (draft)

Date: 2026-10-06. All images are look drafts, labelled "Dramatisation" in frames. Local copies in `previews/` are 112×199 thumbnails only (Canva download hosts are blocked from the build sandbox); full size lives in Canva.

| Beat | Tool / model | Canva media id | Status |
|---|---|---|---|
| #1–2 generator macro | Canva generate-image, 9:16 | MAHXOJ17wRU | Accepted for look |
| #3 home, power cut | Canva generate-image, 9:16 | MAHXOPnWee8 | Accepted for look |
| #5 barbershop | Canva generate-image, 9:16 | MAHXONsmxtY | Redo: half-cut not visible, lights don't read as off |
| #19 home, lit | Canva generate-image, 9:16 | MAHXOAEB3gM | Accepted for look; must match #3's family in final |
| #6/#21 farm | — | — | Canva: not generated (credit quota). Replaced by Gemini frames below |
| #22 factory roof | — | — | Canva: not generated (credit quota). Replaced by Gemini frames below |
| #5 barbershop (Canva) | Canva | MAHXONsmxtY | Superseded by Gemini #5 |

ElevenLabs (bytedance-seedream-5-pro) was tried first for all six; every call was refused (free-tier daily image limit / credit quota). Nothing was charged.

## Prompts

**#1–2 generator:** Extreme macro close-up of a worn petrol generator's control panel at night in a Lagos compound: a chunky round rocker switch in the ON position glowing with a small amber indicator light, scuffed red-and-black painted metal, oil smudges, faint exhaust haze drifting across the frame. Shallow depth of field, 100mm macro lens, warm sodium streetlight from the left plus the amber glow, subtle cool blue fill. Moody but readable, shadows lifted, nothing crushed to black. The switch sits dead centre. Upper third calm and dark for a headline. Photoreal, cinematic commercial still, fine film grain. No people, no text, no logos, no brand names, no watermark.

**#3 home, power cut:** Inside a modest, tidy Lagos family living room at night just after the power has gone out. A Nigerian girl of about ten sits at a small table with an exercise book and pencil, lit only by the white beam of a smartphone torch held by her mother, who stands beside her, frustrated, one hand on her hip. Ceiling bulb off, a standing fan stopped. Warm dim ambience from a window, cool phone-torch light on the faces, natural skin tones. 35mm lens, eye level, the girl and mother fill the lower two thirds; upper third is a calm dark wall. Readable shadows, nothing crushed to black. Photoreal, cinematic commercial still, authentic Nigerian home details, fine film grain. No text, no logos, no watermark.

**#5 barbershop:** A small, colourful Lagos neighbourhood barbershop in the late afternoon. A young Nigerian barber holds electric clippers that have just died, looking at them in disbelief; the seated customer, half his head cut and half not, stares at himself in the mirror with a comic, deadpan expression. Hand-painted hairstyle posters on the wall with no readable text, the doorway shows a busy street. Warm daylight from the door, slightly dim interior because the lights are off. 35mm lens, mid shot, both men fill the lower two thirds, upper third calm wall. Light, humorous mood. Photoreal, cinematic commercial still, natural skin tones, fine film grain. No readable text, no logos, no watermark.

**#19 home, lit:** Inside a modest, tidy Lagos family living room at night with warm, steady light: a ceiling bulb glowing, a standing fan turning. A Nigerian girl of about ten writes in her exercise book at a small table, focused and calm; her mother sits beside her smiling, relaxed. In the background by the window, a small petrol generator sits under a fitted cloth cover, clearly unused. Golden warm interior light, soft and even, natural skin tones. 35mm lens, eye level, the pair fill the lower two thirds; upper third is a calm warm wall. Bright, airy, nothing crushed to black. Photoreal, cinematic commercial still, authentic Nigerian home details, fine film grain. No text, no logos, no watermark.

**#21 farm (ready, not run):** A small commercial farm on the outskirts of Lagos in bright mid-morning sun: a neat row of ground-mounted solar panels beside green vegetable beds, a water pump running and clear water flowing from a pipe into an irrigation channel. A Nigerian farmer in a work shirt and cap stands near the panels, checking the water flow, content. Clean blue sky with a few soft clouds, warm sunlight, lush greens. 24mm lens, slightly low angle, panels and farmer fill the lower two thirds, upper third open sky. Bright, airy, optimistic. Photoreal, cinematic commercial still, fine film grain. No text, no logos, no brand names on panels, no watermark.

**#22 factory roof (ready, not run):** High aerial drone view looking down at a medium-sized factory and warehouse in an industrial area of Lagos: the large corrugated metal roof covered in neat rows of solar panels catching the late-afternoon sun, trucks and workers small in the yard below, a few palm trees, red-earth roads. Warm golden light, long soft shadows, hazy sky at the top. Panels form strong graphic lines through the lower two thirds; upper third soft hazy sky. Bright, airy, confident. Photoreal, cinematic commercial still, fine film grain. No text, no logos, no brand names, no watermark.

## Gemini-generated frames

Source: **Google Gemini**, generated by the client team on **2026-10-06** and supplied as 572×1024 vertical WebP files. Originals in `../frames/gemini/original/`; JPEG working copies in `../frames/gemini/` and `previews/`. Prompts were not supplied.

| Beat | File | Processing | Status / notes |
|---|---|---|---|
| #5 barbershop, before | `gemini-05-barbershop-before` | None | Accepted for look. Half-finished cut reads clearly; dead bulb; phone torch; idle generator outside the door |
| #6 farm, before | `gemini-06-farm-before` | Black bars cropped (151 px top, 14 px bottom → 572×855) | Accepted for look. Top needs extending (outpaint) to full 9:16. **Farms unconfirmed** |
| #7 factory, before | `gemini-07-factory-before` | None | Accepted for look. Worker wears a face mask (fits the fumes; keep him identical in #22). **C&I unconfirmed** |
| #20 barbershop, after | `gemini-20-barbershop-after` | Black bar cropped (118 px top → 572×904) | Accepted for look. Same barber and boy as #5. Barber still holds a lit phone torch: remove in regen |
| #21 farm, after | `gemini-21-farm-after` | Black bars cropped (151 px top, 14 px bottom → 572×855) | **Regen needed:** the pump is still the diesel pump and the jerrycans are still in shot. Regenerate with an electric solar pump and no fuel cans. **Farms unconfirmed** |
| #22 factory, after | `gemini-22-factory-after` | None (no bars) | Accepted for look. Same MANAGER and masked WORKER shaking hands by the silent generator enclosure, panels on the factory roof. Re-sent on 2026-10-06 after the first upload didn't reach the project. **C&I unconfirmed** |

Bar heights were measured per row (mean luma < 12) and cropped with a 2 px safety margin.

## From Stage 2 on

All new renders follow `LOOK_BIBLE.md` and use the numbered prompts in `PROMPTS.md`. Until sign-off these are Gemini's on-screen 572×1024 captures (animatic only); full-size downloads replace them at sign-off. Each one goes through `animatic/ingest.sh` and is logged here:

| Shot | Prompt | Chat | Full-size file | Size | Status |
|---|---|---|---|---|---|
| #1 generator hook | PROMPTS #1 (edit of #4) | A · Compound | `01_generator_hook.png` | 572×1024 capture | **Approved** 2026-10-06. The panel's printed "ON" label is diegetic; keep it. No bars. **Received 2026-10-06 (resent), ingested.** |
| #2 switch off | PROMPTS #2 (edit of #1) | A · Compound | `02_switch_off.png` | 572×1024 capture | **Approved.** "OFF" label, Dad's checked cuff, matches #1. **Received 2026-10-06 (resent), ingested.** |
| #4 compound, before | PROMPTS #4 (fresh) | A · Compound | `04_compound_before.png` | 572×1024 capture | **Approved.** No bars. **Received 2026-10-06 (resent), ingested.** |
| #17 installation | PROMPTS #17 (edit of #4) | A · Compound | `17_installation.png` | 572×1024 capture | **Approved.** Same angle as #4, generator covered; an empty jerrycan is still by the wall (accepted). **Received 2026-10-06 (resent), ingested.** |
| #18 activation | PROMPTS #18 (edit of #17) | A · Compound | `18_activation.png` | 572×1024 capture | **Approved.** Phone screen blank grey, ready for the UI comp (`screenPin` in `animatic/timeline.js`; corners measured with `screen_quad.py 18 --box 260,450,360,600`). **Received 2026-10-06 (resent), ingested.** |
| #3 home, before | PROMPTS #3 (fresh) | B · Home | `frames/gemini/03_home_before.png` | 572×1024 capture | **Approved.** Mum, Daughter, phone torch, dead bulb, oil lamp on the table. In the animatic |
| #19 home, after | PROMPTS #19 (edit of #3) | B · Home | `frames/gemini/19_home_after.png` (from .webp, lossless PNG) | 572×1024 capture | **Approved.** Same room and angle, bulb on, panels through the window: a clean match cut with #3. In the animatic |
| #9 "Solar? E too cost." | PROMPTS #9 (fresh) | C · Market | `frames/gemini/09_too_cost_market.png` (from .webp) | 572×1024 capture | **Approved.** Real brand names stripped off boxes and batteries in Gemini; tag blank for the code-built "₦ ???,???" stamp. In the animatic |
| #11a street plate | PROMPTS #11a (fresh) | D · Plates | `frames/gemini/11a_street_plate.png` (from .webp) | 572×1024 capture | **Approved.** Fallback plate (not used while #11b works) |
| #11b hand and phone | PROMPTS #11b (edit of #11a) | D · Plates | `frames/gemini/11b_hand_phone.png` (from .webp) | 572×1024 capture | **Approved.** Gemini wouldn't enlarge the phone: digital 1.6× push-in centred on the phone in the edit. Screen corners and a thumb matte from `animatic/screen_quad.py`; all #11–#16 screens are pinned into it. In the animatic |
| #20 barbershop, after (fix) | PROMPTS #20 fix | E · Barbershop | `20_barbershop_after.png` | 572×1024 capture | **Approved** (torch gone, hand on the boy's shoulder, ceiling extended). **Received 2026-10-06 (resent), ingested.** Old version archived as `frames/gemini/original/superseded-gemini-20-barbershop-after.jpg` |
| #6 farm, before (fix) | PROMPTS #6 fix | F · Farm | `06_farm_before.png` | 572×1024 capture | **Approved** (bars removed by extending sky and soil). **Received 2026-10-06 (resent), ingested.** Old version archived as `frames/gemini/original/superseded-gemini-06-farm-before.jpg` |
| #21 farm, after (fix) | PROMPTS #21 fix | F · Farm | `21_farm_after.png` | 572×1024 capture | **Approved** (blue electric pump cabled to the array, no jerrycans, no bars). **Received 2026-10-06 (resent), ingested.** Old version archived as `frames/gemini/original/superseded-gemini-21-farm-after.jpg` |

Note: the first ingest of #3 and #19 wrongly cropped their dark bottoms as "bars". `ingest.sh` now only treats flat black rows (max luma < 10) as bars, and both were re-ingested uncropped.

Stage 2 complete at animatic quality on 2026-10-06: every photographic keyframe in PROMPTS.md is in `animatic/frames/`. Full-size downloads replace them at sign-off.
