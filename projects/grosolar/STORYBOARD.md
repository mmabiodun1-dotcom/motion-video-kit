# GroSolar brand ad: storyboard (draft v0.5)

29.9 s · vertical 9:16 (1080×1920) · female AI voiceover (Nigerian English) · built to work on mute · CTA: call or WhatsApp 0705 370 0000
Style: the agreed **mix**: "The Switch-Off" hook → "From Sun to Yours" explainer → real-project proof → CTA.

v0.2 applies storyboard critic 1 (`review/storyboard-critic-1.md`, verdict REVISE) and the Drive footage audit (`ASSETS.md`). What changed:
- **Real order of events:** install now comes before paying off and owning.
- **No map and no kW total.** Proof is a stack of real drone shots.
- **Every voice line now fits its beat** (max 2.3 words/s).
- **Finance small print** sits on the offer frame.
- **CTA starts at 23.0 s,** with a logo bug from 4.4 s.
- **The hook is local:** "No light" in a shop.

## The idea in one line

A single line of **sunlight** runs through the whole ad. It cuts the generator's noise, powers a home, a shop and a warehouse, becomes the payment bar that fills until **OWNED**, carries the real project shots, and folds into the GroSolar logo.

## Signature moments

1. **Visible silence:** the generator's shaking stops dead, the haze clears, and a beam of sunlight slices the frame open. This works on mute.
2. **Light becomes ownership:** the beam becomes a payment bar, month by month, until it stamps **OWNED**.
3. **Real proof:** the bar becomes a rail that deals out real drone shots of GroSolar sites, which then collapse into the logo.

## Beat by beat

| Time (s) | What the viewer sees | On-screen words | Voiceover (words) | Business job | Out (what carries over) |
|---|---|---|---|---|---|
| 0.0–0.8 | **Illustrated** Lagos provisions shop (roller shutter, signboard); the hanging bulb clicks off and the scene dims a touch. Frame 0 is already complete. | **NO LIGHT.** **AGAIN?** | *(room tone; fan winding down)* | Hook in a local idiom | Hard cut on the owner's glance |
| 0.8–1.6 | **Illustrated** generator beside the shop kicks on, shakes and puffs haze; a jerrycan sits next to it. | (words hold) | *(generator roar)* | The cost everyone knows | A hand reaches for the switch |
| 1.6–4.4 | The switch flips. The **shaking stops dead, the haze clears** and the roar cuts to silence. A diagonal beam of sunlight sweeps the frame to daylight. | **Less generator.** **More sun.** | "Less generator. More sun." (4) | The turn | The beam travels down; the logo bug appears at 4.4 |
| 4.4–6.6 | The beam lands on **real GroSolar panels**: the Adeola Hopewell carport array (owner photo `2.jpg`, GPS stamp and bank signage cropped out; slow push for motion). | **Solar, funded by GroSolar.** | "GroSolar funds your solar" (4) | What GroSolar is | The beam leaves the array as a glowing line |
| 6.6–9.4 | The line runs along one rail through three **flat isometric illustrations in a Lagos style**: a duplex with a parapet, a shop with a roller shutter, a warehouse. Each lights up as the line arrives. | **HOME · BUSINESS · INDUSTRY** | "for homes, businesses and industry" (5) | Every audience in one move | The line straightens into an underline |
| 9.4–11.4 | Typographic impact, filling about 80% of the width. The line underlines it. | **NOTHING UPFRONT.** · small (44 px+, stays through 18.4): *Subject to approval. Terms apply.* | "with nothing upfront." (3) | The core offer, with its condition on the same frame | Underline holds; footage slides in behind |
| 11.4–14.0 | The broadcaster's **hillside ground-mount array** (owner photo, slow push). An illustrated spanner-and-check badge draws on; small label "Maintained after payoff too". | **Installed and maintained for you.** · small: *Maintenance continues after payoff* | "Installed and maintained for you." (5) | Removes the "who handles it?" worry (true wording: installs are done mainly by partner OS Systems, under GroSolar) | The underline thickens into a bar |
| 14.0–18.4 | The line becomes a **payment bar**: month ticks roll past and the bar fills in steps with a slow push-in. At 100% a stamp lands: **OWNED.** | **Pay in instalments.** → **Then it's yours.** | "Pay in instalments. Once it's paid off, it's yours." (9) | Amortized payment and ownership, simply | The bar rises and becomes a rail |
| 18.4–23.0 | Cards fan along the rail: **real photos of installed GroSolar sites**, each labelled, e.g. **100 kW · Victoria Island** (owner photos `2.jpg`/`3.jpg`) · **150 kW · National broadcaster** (photos coming) · further cards **only for projects that exist**, from photos the owner sends. | Card labels only | "Real GroSolar projects." (3) | Proof (add a home card if a residential project photo is supplied) | Cards collapse along the rail into a point of light |
| 23.0–29.9 | The point of light becomes the sun in the **GroSolar logo**. CTA card with gentle drift (no frozen frame). | Logo · **0705 370 0000** (110 px+) with WhatsApp + phone icons · **Check if you qualify** · *Lagos and across Nigeria* · *GroSolar NG app · Google Play* · *Subject to approval. Terms apply.* | "Call or WhatsApp to check if you qualify. Get the GroSolar NG app." (13) | One clear action, readable for about 6 s | End |

Voiceover: **47 words**, every beat at or below 2.3 words/s.

> Less generator. More sun.
> GroSolar funds your solar for homes, businesses and industry, with nothing upfront.
> Installed and maintained for you.
> Pay in instalments. Once it's paid off, it's yours.
> Real GroSolar projects.
> Call or WhatsApp to check if you qualify. Get the GroSolar NG app.

## Phone-screen rules

- **Keep clear of platform buttons and captions:** all words, the number and the logo stay inside **y 250–1500 px** and **x ≤ 940 px**.
- **Text sizes:** headlines 64 px or larger, small print 44 px or larger, phone number 110 px or larger.
- **Logo bug:** a small logo shows from 4.4 s so a muted viewer always knows who this is.
- **Bright and clear throughout:** daylight footage only.

## Sound plan

- **0–1.6 s:** shop room tone, then the generator roar. At 1.6 s a **hard cut to silence**.
- **Music** enters under "More sun": a warm, uplifting, Afro-leaning instrumental with a light groove, kept under the voice.
- **Effects:** one soft whoosh per real transition, a soft stamp on **OWNED**, a gentle tick per project card.
- **Master:** about −14 LUFS, checked with `scripts/loudness.sh`.

## Footage per beat (see `ASSETS.md`)

No phone videos are coming, so the opening is fully illustrated (in the style of the home/shop/warehouse scenes) and every real-world shot is an owner photo brought to life with slow camera moves.

| Beat | Source | Status |
|---|---|---|
| Shop, bulb, generator | Illustrated (code-built SVG) | We build |
| Panels | Owner photo `2.jpg` (Adeola Hopewell), GPS stamp and signage cropped | Have |
| Installed and maintained | Owner photo: broadcaster hillside array | Have |
| Project cards | Owner photos: broadcaster aerial with tower (150 kW), Adeola Hopewell carport (100 kW) | Have |
| Isometric scenes, payment bar, logo build | Built in code | We build |
| Look | `BRAND.md` + style frames v1 | Awaiting approval |
| Official logo | Owner (placeholder wordmark until then) | Needed before publishing |
| Voice | **Recorded by a real person** (owner's choice; AI Nigerian voices need a paid ElevenLabs plan). Guide: `VOICEOVER.md` | Awaiting recording |
| Music | Licensed: Splice stack "Warm uplifting Afro-house, 115 BPM" (drums, congas, bass, keys) | Awaiting OK to spend Splice credits |

## Still to confirm before building

1. Brand colours from the GroSolar website (style frames get recoloured to match).
2. Approval of the look (style frames v2, in website colours).
3. Official logo file before publishing (placeholder until then).
4. ARCON vetting: Nigerian ads, social included, go to ARCON's Advertising Standards Panel before they run. Allow time for this.
