# GroSolar ad: look and feel (v2, official GroSolar colours)

Colours are sampled from the official GroSolar logo supplied by the owner (2 Oct), as the owner asked for them to match the website. The logo itself (`build/brand/`) is used on the end card, and its sun icon is the logo bug.

Style frames: `build/style-frames/` (render: `npx hyperframes snapshot . --at 0.5,1.5,2.5,3.5,4.5 -o shots`).

## Idea: from no light to GroSolar sunlight

The opening sits in GroSolar **navy**, which reads as darkness and "no light". Once the sunlight line arrives, frames turn to daylight white, and the logo's **yellow-to-orange sun gradient** marks everything that means sunlight: the beam, the payment bar, the kW figures and the phone number. Proof and the end card return to navy, so the brand closes on its own colours.

## Colours

| Token | Hex | Source | Used for |
|---|---|---|---|
| `--navy` | `#002552` | Logo background | Opening, proof, end card; all text on light frames |
| `--sun` gradient | `#F6DA4C` → `#FCBA34` → `#FE9636` | Logo sun icon | Beam, bar, highlight words, kW figures, phone number, icons |
| `--white` | `#FFFFFF` | Logo wordmark | Text on navy |
| `--paper` | `#F4F7FB` | Derived (daylight) | Background of the offer and payment frames |
| `--mute-d` / `--mute-l` | `#B9C7DA` / `#46586F` | Derived | Small print on navy / on white |

Contrast: white on navy 15.4:1; sun yellow on navy above 9:1; navy on paper 14.6:1. Orange is never used for small text on white.

## Type

- **Everything:** Poppins (500 / 600 / 800), a geometric sans that sits naturally beside the GroSolar wordmark. Headlines are 800 with tight tracking (−3%).
- **Minimum sizes on 1080×1920:** headlines 96 px, labels 34 px on cards, small print 44 px, phone number 112 px on one line.

## Layout rules

- Everything that must be read stays inside **y 250–1500, x 80–940**. Imagery can bleed into the rest.
- Logo bug top-left from 4.4 s.
- Photos: GPS stamps and third-party signage cropped out; light warm grade on overcast shots.

## Logo

The official lockup (sun icon, "GroSolar", "Accelerating the solar future") is used as supplied, on navy only. The supplied file is 589×207 px, which is enough for review. **For the final render, a high-resolution PNG or SVG of the logo is preferred** so it stays sharp at full width.
