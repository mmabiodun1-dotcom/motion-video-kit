# GroSolar brand ad: storyboard (draft v0.1)

30 s · vertical 9:16 (1080×1920) · English voiceover · built to work on mute · CTA: call or WhatsApp
Style: the agreed **mix**: (A) "The Switch-Off" hook → (B) "From Sun to Yours" explainer → (C) "Powering Lagos" proof → close.

## The idea in one line

A single line of **sunlight** runs through the whole ad. It cuts the generator's noise, powers a home, a shop and a factory, turns into a payment bar that fills until the system is **OWNED**, then maps GroSolar's real projects, and finally folds back into the sun in the logo.

That sunlight line is the ad's "persistent actor" (motion-grammar rule 2): it is what makes 30 seconds feel like one film instead of a slideshow.

## Three signature moments

1. **The switch-off:** the generator roar cuts to sudden silence, and a beam of sunlight slices the frame open.
2. **Light becomes ownership:** the same beam that lights the home turns into a payment bar, month by month, until it stamps **OWNED**.
3. **Proof on the map:** the bar lifts into a route that connects GroSolar's real installations, then collapses into the sun of the logo.

## Beat by beat

| Time (s) | What the viewer sees | On-screen words | Voiceover | Business job | Transition out (what carries over) |
|---|---|---|---|---|---|
| 0.0–2.6 | Daylight close-up of a petrol generator shaking, exhaust haze, a fuel jerrycan beside it. Bright, not moody. Frame 0 is already complete. | **POWER OUT.** **AGAIN.** (two words punching in on opposite axes) | *(no voice; generator roar)* | Hook: the pain every viewer knows | A hand flips the generator's switch |
| 2.6–4.4 | Roar cuts to **silence**. A diagonal beam of sunlight slices across and wipes the generator away, revealing blue sky. | **Switch off the generator.** → **Switch on the sun.** | "Switch off the generator. Switch on the sun." | The turn: there is another way | The beam keeps travelling down the frame |
| 4.4–6.8 | The beam lands on a **real GroSolar panel** (client footage, macro); light glints across the cells. The camera pulls back to the full array. | **Solar, funded by GroSolar.** | "GroSolar funds your solar system…" | Says what GroSolar is | The beam leaves the panel as a glowing line |
| 6.8–10.0 | The line runs along one rail through three clean 3D/illustrated vignettes, each lighting up as it arrives: a **home**, a **shop**, a **factory**. The camera tracks with the line. | **HOME · BUSINESS · INDUSTRY** (each label lands with its building) | "…for homes, businesses and industry…" | Speaks to every audience in one move | The line runs off the factory roof and straightens |
| 10.0–12.2 | Typographic impact. Huge words fill 80% of the frame; the line underlines them. | **NOTHING UPFRONT.** | "…with nothing upfront." | The core offer, unmissable | The underline thickens into a bar |
| 12.2–16.4 | The line becomes a **payment bar**. Month ticks roll past (Month 1, 2, 3…), the bar fills in steps and the camera pushes in slowly. At 100% a stamp lands: **OWNED.** | **Pay over time.** → **Then it's yours.** · small: *Subject to credit approval* | "Pay over time, at a pace that works for you. Once it's paid off, it's yours." | Explains amortized payment and ownership simply | The stamp's flash wipes to the next shot |
| 16.4–18.4 | **Real footage of the GroSolar team** installing panels on a roof, then a technician checking an inverter. | **We install. We maintain.** | "We install it, and we maintain it." | Removes the "who handles it?" worry | Camera tilts up into sky; the line reappears and rises |
| 18.4–24.4 | The line climbs and the camera rises over a sleek **3D map of Lagos and beyond**. Pins rise as glowing panel arrays, each with a quick cut-in to the real site photo: **100 kW · Adeola Hopewell, Victoria Island** · **100 kW · Epe** · **150 kW · National TV broadcaster** · **100 kW · [project 4, name TBC]**. A counter climbs as each lands. | **450 kW across these four projects** (TO CONFIRM wording) | "Real projects, already running." | Proof for businesses, big clients and investors | The map lines draw inward to one point |
| 24.4–27.0 | All the lines converge into a sun, which becomes the **GroSolar logo** (logo-as-portal). | **GroSolar** | "Call or WhatsApp GroSolar today." | Brand moment | The logo settles up the frame to make room |
| 27.0–30.0 | End card, gentle drift (no frozen frame). Phone number large; WhatsApp and phone icons; "Get the GroSolar NG app" badge. | **Nothing upfront. Pay over time. Own it.** · **+234 705 370 0000** (TO CONFIRM) · *Subject to credit approval* | *(music resolves)* | The one action, readable ≥ 2 s | End |

Voiceover: about 52 words in about 25 seconds, an unhurried pace that leaves room for the silence hook.

> Switch off the generator. Switch on the sun.
> GroSolar funds your solar system, for homes, businesses and industry, with nothing upfront.
> Pay over time, at a pace that works for you. Once it's paid off, it's yours.
> We install it, and we maintain it.
> Real projects, already running.
> Call or WhatsApp GroSolar today.

## Phone-screen rules (vertical social)

- Keep all words and the phone number out of the zones TikTok and Instagram cover: roughly the **top 250 px**, the **bottom 420 px** and the **right 140 px**.
- Minimum text size about 64 px for headlines and 44 px for small print. The number must be readable on a small phone.
- Bright, clear imagery throughout. Clients in the kit's case studies rejected dark openers.

## Sound plan

- 0–2.6 s: real generator roar (recorded or library), then a **hard cut to silence**. This is the hook.
- Music enters on "Switch on the sun": a warm, uplifting, Afro-leaning instrumental with a light groove (to choose together), kept under the voice.
- One soft whoosh per real transition, a soft "stamp" on **OWNED**, a gentle tick per map pin. No harsh clicks.
- Master: about −14 LUFS for social feeds, checked with `scripts/loudness.sh`.

## What we need for each beat

| Beat | Source | Status |
|---|---|---|
| Generator close-up | Phone video of a running generator in daylight (easy to film), or a labelled AI shot | Needed |
| Panel macro + array | GroSolar project footage | Owner has it |
| Team installing / maintaining | GroSolar project footage | Owner has it |
| Each project site (4) | Photo or video per site, drone if available | Owner has it |
| Home / shop / factory vignettes, map, payment bar, logo build | Built in code (3D + motion graphics) | We build |
| Logo, colours, fonts | grosolar.co | Blocked; needs network access or a screenshot |
| App badge | GroSolar NG app icon/screenshot | Needed |
| Voiceover | AI voice (Nigerian English) or a real voice artist | To decide |

## Still to confirm before building

1. The fourth project's name (heard as "Sinari"), or drop it.
2. The phone number, and whether it is also the WhatsApp line.
3. Wording: "Subject to credit approval" on screen.
4. The "450 kW across these four projects" line (only true if the four sizes are right).
5. Brand colours and logo (from grosolar.co).
6. Voice: AI or a real voice artist, male or female.
