# GroSolar — "Switch Off" · Look bible

Locked 2026-10-06. Visuals are directed by the client team. Gemini is the render engine (stills), Gemini Veo the motion engine. Every ready-to-paste prompt lives in `PROMPTS.md`; every render is logged in `style-frames/GENERATION_LEDGER.md`.

## STYLE BLOCK

Goes at the end of every Gemini image prompt, verbatim:

> Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

## BEFORE MOOD

Dusk or hazy light, visible exhaust smoke, dim interiors, tired or frustrated faces, generator running.

## AFTER MOOD

Same location, same camera angle, same people in the same wardrobe. Clean air, warm golden light, relaxed smiles, generator off or covered. Solar panels visible in the frame but not the hero.

## CAST

Lock the wardrobe and never change it.

- **BARBER:** Nigerian man, about 35, short full beard, faded grey-purple football jersey under a tan canvas apron.
- **BOY:** Nigerian boy, about 12, striped grey-and-white barber cape.
- **FARMER:** Nigerian man, about 55, short greying hair, faded olive work shirt, dark trousers, rubber slippers.
- **MANAGER:** Nigerian man, about 45, full dark beard, light-blue shirt, grey tie, grey trousers.
- **WORKER:** Nigerian man, about 30, blue overalls, light-blue surgical mask (in both the before and after shots).
- **HOME FAMILY:** defined from the existing home frames (Canva drafts #3 and #19). Those two drafts don't match each other: the wardrobe changes between them. The lock follows **#3** (the before), and #19 gets re-rendered as an edit of the new #3.
  - **MUM:** Nigerian woman, about 40, hair pulled back in a low bun, sleeveless knee-length dress in a brown-and-cream patterned ankara print.
  - **DAUGHTER:** Nigerian girl, about 10, hair in neat braids pulled back with a white headband, pale pink short-sleeved T-shirt.
  - **DAD** *(new — proposed by Claude, approve or change)*: Nigerian man, about 45, short hair, neat moustache, white singlet under an open short-sleeved navy-and-white checked shirt, dark shorts, rubber slippers. Appears in #2 (hand only), #4 and #9.
  - **HOME:** a modest Lagos bungalow. Inside: cream walls, brown curtains, a dark wooden dining table, a standing fan. Outside: a small walled compound with a red-and-black petrol generator, iron gate, corrugated roof.
- **INSTALLERS** *(new — proposed by Claude, approve or change)*: two Nigerian men, about 25 and about 35, plain navy work shirts and trousers, orange high-visibility vests, white hard hats, work gloves. No logos (partner providers aren't named on screen). Appear in #17 and #18.

## RENDER RULES

Learned the hard way.

a. Never tell Gemini to "keep the top/bottom free". That's what caused the black bars. Handle the TikTok/Reels safe zones in the edit, not in the image.

b. Generate every AFTER frame as an edit of its BEFORE image in the same Gemini chat ("Same image, same camera, same people. Now: ..."). That keeps the before/after pair matched, which we need for match cuts and for Veo's start and end frames.

c. Fix a frame with a narrow edit ("Keep everything identical, change only X"). Don't write a fresh prompt.

d. Never use AI for UI screens, supers, the logo or the end card. Build those in code.

e. Finals must be Gemini's "Download full size" files, not screen captures. The current 572x1024 frames are for the look and the animatic only.

## PRODUCTION ORDER

| Stage | What | Who | Gate |
|---|---|---|---|
| **1 · LOCK** | Look bible and prompt library | Claude | Now |
| **2 · KEYFRAMES** | Render every still in Gemini, download full size | Client team | All shots in `PROMPTS.md` done |
| **3 · ANIMATIC** | 60 s vertical animatic cut from the stills: supers, temp VO timing, end card. Built in `animatic/` (frames drop in via `animatic/ingest.sh`) | Claude | **GroSolar sign-off.** Sign-off also confirms or kills the farm and factory scenes |
| **4 · MOTION** | Gemini Veo image-to-video, before/after pairs as start/end frames. Priority: the generator hook, then the 4 befores, then the 4 afters. Video credits are daily and limited, so **no exploratory renders** | Client team renders, Claude logs and edits | Only after Stage 3 sign-off |
| **5 · FINISH** | VO (English/Pidgin), music, 30 s and 15 s cut-downs | Claude | Final GroSolar approval |
