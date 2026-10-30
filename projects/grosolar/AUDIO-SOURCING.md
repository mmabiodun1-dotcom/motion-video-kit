# GroSolar ad: music and sound plan

**Decided (owner):** the ad opens with 6 s of Tekno's "Rara" (0:29–0:35), then finishes on the **Rara instrumental**, once the sync licence is signed (the request asks for the instrumental too). Until then, a **free instrumental** fills 6.4–30 s. A short **"Light don come!" cheer** marks the sunlight reveal.

The mix is automatic: drop the files into the folders below and run `build/mix/mix.py`; parts that are missing are skipped, so a partial preview always works.

| Part | Put the file here | Notes |
|---|---|---|
| Rara instrumental (after licence) | `assets/audio/bed/rara-instrumental.wav` | Picks up at 0:35 of the instrumental, so the groove continues where the vocal clip stopped |
| Free fallback bed | `assets/audio/bed/free-afro.mp3` | Used only while the instrumental isn't there |
| Voiceover | `assets/audio/vo/vo.m4a` | Cut points for each line go into `build/mix/plan.json` |
| Cheer | `assets/audio/cheer/light-don-come.m4a` | See below |
| Generator sound | `assets/audio/sfx/generator.mp3` | Replaces the synthesized placeholder |

## The "Light don come!" cheer (free, record it yourselves)

- **What:** 3–4 people shouting a happy, genuine "Light don come!" (or "Ehen! Light don come!") like when power returns in the office. About 1 second.
- **How:** one phone voice recorder, a normal room, everyone about an arm's length from the phone. Do 3–4 takes. No music or TV in the background.
- **Where it plays:** 6.4 s, right after the generator cuts and the silence, as the sunlight sweeps across. The first voiceover line follows at 6.9 s.



Splice downloads cost credits (they come with a paid plan), so the ad uses **free, commercially licensed** audio instead. The build environment cannot reach these sites, so the owner downloads candidates and attaches them; they are then screened with the kit's scripts (`scripts/sfx-candidates.py`, `scripts/loudness.sh`) and the best fit is mixed.

## Shortlist (found by web search, 30 Oct 2026; not yet listened to)

The build environment cannot open Pixabay, so these come from search results only: listen first, and check the licence line on each page says "Pixabay Content License" (avoid anything marked "Content ID").

**Music bed (pick 2–3 to send):**
1. "Afrobeat 2026 Instrumental Music Background", ejah_music. Tagged laid back, bright, uplifting; probably the best fit under a voice. https://pixabay.com/music/upbeat-afrobeat-2026-instrumental-music-background-327258/
2. "Afrobeat Music – Feelgood Groove", MusicInMedia (about 2:34; loop versions also exist). Search "feelgood groove" on https://pixabay.com/music/search/feelgood/
3. "Island Pearl (Happy Afrobeat Instrumental)", SunnyFruit (about 5:21). Search on https://pixabay.com/music/search/afrobeat%20happy/
4. "Match Out – Free Afro Amapiano Instrumental", artbybigvee. Energetic log drums: good energy, may be busy under the voice. https://pixabay.com/music/afrobeat-match-out-free-afro-amapiano-instrumental-178406/
5. Browse more: https://pixabay.com/music/search/afrobeat%20ad/ and https://pixabay.com/music/search/happy%20afro%20pop/

**Sound effects:**
- Generator: "Small Diesel Generator", freesound_community. https://pixabay.com/sound-effects/technology-small-diesel-generator-61728/ (more: https://pixabay.com/sound-effects/search/generator%20running/)
- Light switch: "Light Switch", freesound_community. https://pixabay.com/sound-effects/light-switch-81967
- Whoosh: pick a short, soft one from https://pixabay.com/sound-effects/search/whoosh/
- Stamp: search "stamp" or "thud" on https://pixabay.com/sound-effects/
- Crowd cheer (optional layer under the "Light don come!" recording): https://pixabay.com/sound-effects/search/crowded%20cheering/



| Source | Licence | Notes |
|---|---|---|
| **Pixabay Music** (pixabay.com/music) | Pixabay Content License: free for commercial use, no attribution needed | First choice. Download the MP3 |
| **Pixabay Sound Effects** (pixabay.com/sound-effects) | Same licence | For the effects below |
| YouTube Audio Library (studio.youtube.com → Audio library) | Free; check each track's "attribution required" flag | Fine if you also post on YouTube; filter "No attribution required" |
| TikTok / Instagram built-in business music libraries | Free inside each app only | Fallback: the music would be added in the app, so WhatsApp Status would have voice only |

Avoid: tracks marked "Content ID", "non-commercial", "CC BY-NC", and anything from a random "free music" site without a clear licence page.

## Music: what to look for

Search terms (try each): **"afro house"**, **"afrobeat corporate"**, **"uplifting afro"**, **"amapiano instrumental"**, **"positive african"**.

Pick 2–3 tracks that are:
- warm and upbeat, sunny, **not aggressive**, ideally **100–105 BPM** (Rara is about 102 BPM, so the switch from the song to the bed feels seamless)
- instrumental (no singing; it would fight the voiceover)
- at least 35 seconds long, ideally with a clear build in the first 5 seconds

## Sound effects (4 files)

| For | Search | Moment in the ad |
|---|---|---|
| Light switch / power cut | "light switch click" or "power off" | 0.21 s, the bulb goes out (on the first downbeat) |
| Generator | "generator running" or "petrol engine idle" | 2.56–6.0 s, hard stop with the song on the switch flip |
| Soft transition | "soft whoosh" or "swoosh short" | each scene wipe (one file, reused) |
| Stamp | "stamp" or "rubber stamp" | 18.45 s, OWNED. |

Optional: "ui pop" or "soft click" for each project card landing and the kW counter.

Send everything as attachments (or one zip). Keep the original file names so the licence page can be traced later.
