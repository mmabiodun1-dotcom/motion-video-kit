# GroSolar ad: look and feel (v1, for owner approval)

The owner asked us to design the look. This is an **ad style**, not a new brand identity: the official GroSolar logo replaces the placeholder wordmark before anything is published.

Style frames: `build/style-frames/` (render: `npx hyperframes snapshot . --at 0.5,1.5,2.5,3.5,4.5 -o shots`).

## Idea: "Lagos daylight"

Bright, warm, confident. Cream daylight paper, deep green ink, and one amber colour that always means **sunlight**: the beam, the payment bar, the sun in the end card. Real GroSolar photos sit on top as cards with soft shadows; everything else is clean flat illustration in a Lagos style.

## Colours

| Token | Hex | Used for | Contrast |
|---|---|---|---|
| `--ink` | `#0F2A22` | All main text, outlines | 14.9:1 on cream |
| `--sun` | `#FFB21E` | The sunlight line, payment bar, highlights, sun | Fill only; never small text on cream |
| `--sun-deep` | `#E8820C` | Emphasis words ("AGAIN?") | Large text only |
| `--gro` | `#23874E` | "Gro", the OWNED stamp, WhatsApp icon | 4.5:1 on cream |
| `--cream` | `#FFF7E8` | Default background | |
| `--sky` | `#E3F1F6` | Proof-card background | |
| `--mute` | `#4E5F57` | Small print | 6.6:1 on cream |

## Type

- **Headlines:** Bricolage Grotesque, ExtraBold (800), tight tracking (−3.5%). Characterful and modern, and works at huge sizes.
- **Body and labels:** Inter, 400 / 600 / 700.
- **Minimum sizes on 1080×1920:** headlines 96 px, labels 34 px on cards, small print 44 px, phone number 112 px on one line.

## Layout rules

- Everything that must be read stays inside **y 250–1500, x 80–940**. Imagery can bleed into the rest.
- Logo bug top-left from 4.4 s.
- Photos: GPS stamps and third-party signage cropped out; light warm grade on overcast shots.

## Placeholder wordmark

"**Gro**Solar" in Bricolage, with "Gro" in green and a small sun dot. It is used only until the owner supplies the official logo file, and it is marked "LOGO PLACEHOLDER" in review renders.
