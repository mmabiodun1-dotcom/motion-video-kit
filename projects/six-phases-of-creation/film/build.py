#!/usr/bin/env python3
"""Generate index.html (the HyperFrames composition) from the shot list below.

Edit SHOTS / CLOCK here, run `python3 build.py`, then `npx hyperframes check`.
"""
import html, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
TOTAL = 100.0

PHASES = {
    1: "The Big Bang",
    2: "The first stars",
    3: "Galaxies spin into disks",
    4: "The Sun and its planets",
    5: "A sky in layers",
    6: "A restless planet",
}

# kind: img | bang | globe | end.  kb = Ken Burns [from, to] as (scale, xPercent, yPercent).
SHOTS = [
    dict(id="bang", kind="bang", start=0.0, end=8.0, phase=1, title=True,
         line="In the first three minutes, space filled with hydrogen and helium.", line_at=3.0,
         tag="ILL", subject="Code-built animation", credit="Six Phases of Creation"),
    dict(id="cmb", kind="img", src="PIA18916", start=7.4, end=13.5, phase=1, kb=[(1.18, 0, 2), (1.32, -3, 0)],
         line="380,000 years later, the first light broke free. We still see it today.",
         tag="DATA", subject="Planck map of the oldest light", credit="ESA/Planck Collaboration"),
    dict(id="focus", kind="img", src="PIA16874", start=13.0, end=18.0, phase=1, contain=True, kb=[(0.68, 0, -4), (0.72, 0, -4)],
         line="Each telescope saw that light more sharply.",
         tag="DATA", subject="COBE, WMAP, Planck (spacecraft illustrated)", credit="NASA/JPL-Caltech/ESA"),
    dict(id="deep", kind="img", src="webb-deep-field-full", start=17.4, end=24.0, phase=2, title=True, kb=[(1.05, 0, 0), (1.4, 2, -3)],
         line="After 100 million years of darkness, the first stars lit up.", line_at=2.6,
         tag="OBS", subject="Webb's First Deep Field", credit="NASA, ESA, CSA, STScI"),
    dict(id="casa", kind="img", src="webb-cas-a", start=23.4, end=29.5, phase=2, kb=[(1.42, 0, 0), (1.58, -2, 1)],
         line="Giant stars lived a few million years, then exploded, forging carbon, oxygen and iron.",
         tag="OBS", subject="Cassiopeia A, Webb 2023",
         credit="NASA, ESA, CSA, D. Milisavljevic (Purdue Univ.), T. Temim (Princeton Univ.), I. De Looze (UGent), J. DePasquale (STScI)"),
    dict(id="crab", kind="img", src="webb-crab", start=29.0, end=34.0, phase=2, kb=[(1.25, 0, 0), (1.12, 2, -2)],
         line="Every heavy atom on Earth was made in stars like these.",
         tag="OBS", subject="Crab Nebula, Webb 2023", credit="NASA, ESA, CSA, STScI, T. Temim (Princeton Univ.)"),
    dict(id="milky", kind="img", src="milky-way-ill", start=33.4, end=41.0, phase=3, title=True, rotate=True, kb=[(1.25, 0, 0), (1.45, 0, 0)],
         line="Spinning gas flattened into disks. Ours began within a billion years of the Big Bang.", line_at=2.6,
         tag="ILL", subject="Our galaxy, the Milky Way", credit="NASA/JPL-Caltech"),
    dict(id="phantom", kind="img", src="phantom-galaxy", start=40.4, end=46.0, phase=3, kb=[(1.04, 0, 0), (1.18, -2, 1)],
         line="Our galaxy's disk now holds 100 to 400 billion stars.",
         tag="OBS", subject="Phantom Galaxy M74, Webb", credit="ESA/Webb, NASA & CSA, J. Lee and the PHANGS-JWST Team"),
    dict(id="disk", kind="img", src="PIA20645", start=45.4, end=52.0, phase=4, title=True, kb=[(1.0, 0, 0), (1.16, 0, 2)],
         line="4.567 billion years ago, a cloud collapsed. The Sun lit up inside a disk of dust.", line_at=2.6,
         tag="ILL", subject="A young star in its disk", credit="NASA/JPL-Caltech"),
    dict(id="moon", kind="img", src="art002e012273", start=51.4, end=57.0, phase=4, kb=[(1.08, 2, 0), (1.2, -2, -2)],
         line="A Mars-sized world struck the young Earth. The debris became our Moon.",
         tag="OBS", subject="The Moon, photographed by Artemis II (2026)", credit="NASA"),
    dict(id="hadean", kind="img", src="GSFC_20171208_Archive_e000888", start=56.4, end=63.0, phase=5, title=True, kb=[(1.15, 7, 0), (1.15, -7, 0)],
         line="Young Earth: lava, steam and impacts. The air had no oxygen.", line_at=2.6,
         tag="ILL", subject="The young Earth", credit="NASA Goddard Conceptual Image Lab"),
    dict(id="strom", kind="img", src="PIA24240", start=62.4, end=68.0, phase=5, kb=[(1.12, -3, 0), (1.28, 0, -2)],
         line="Microbes learned to use sunlight. About 2.4 billion years ago they filled the air with oxygen.",
         tag="OBS", subject="2.7-billion-year-old stromatolite, Western Australia", credit="NASA/JPL-Caltech"),
    dict(id="limb", kind="img", src="STS052-23-022", start=67.4, end=74.0, phase=5, kb=[(1.06, 0, 2), (1.2, 0, -1)],
         line="Oxygen built the ozone layer, and the sky gained its layers.",
         tag="OBS", subject="Earth's limb from the Space Shuttle, 1992", credit="NASA"),
    dict(id="globe", kind="globe", start=73.4, end=83.0, phase=6, title=True, small_title=True,
         line="Continents gathered and broke apart.", line_at=2.6,
         tag="DATA", subject="Plate model CAO2024, 1,800 to 100 million years ago", credit="Cao et al. 2024 · EarthByte / GPlates"),
    dict(id="chix", kind="img", src="PIA03379", start=82.4, end=88.0, phase=6, kb=[(1.05, 0, 0), (1.35, 6, 6)],
         line="66 million years ago, an asteroid struck here. Its buried crater still shows in the land.",
         tag="DATA", subject="Chicxulub crater, Yucatán (radar topography)", credit="NASA/JPL"),
    dict(id="today", kind="globe", start=87.4, end=93.0, phase=6, age=0,
         line="300,000 years ago, the first people. This story ends where ours begins.",
         tag="DATA", subject="Plate model CAO2024, today's coastlines", credit="Cao et al. 2024 · EarthByte / GPlates"),
    dict(id="end", kind="end", start=92.4, end=TOTAL, phase=6),
]

# Film time (s) -> years ago. Interpolated in log space; the globe reads the same curve.
CLOCK = [(0, 13.8e9), (17.4, 13.8e9), (19.0, 13.7e9), (24.0, 13.4e9), (34.0, 13.0e9), (41.0, 10.0e9),
         (45.6, 7.0e9), (47.0, 4.567e9), (52.0, 4.567e9), (53.0, 4.5e9), (57.0, 4.4e9), (63.0, 3.5e9),
         (65.0, 2.4e9), (69.0, 2.4e9), (74.0, 1.8e9), (82.4, 1.0e8), (83.4, 6.6e7), (88.0, 6.6e7),
         (89.0, 3.0e5), (TOTAL, 3.0e5)]
GLOBE_SHOT = (74.0, 82.4)

TAG = {"OBS": ("Photo", "t-obs"), "DATA": ("Data", "t-data"), "ILL": ("Illustration", "t-ill")}
e = html.escape


def shot_html(s):
    d = s["end"] - s["start"]
    sid = s["id"]
    inner = ""
    if s["kind"] == "img":
        fit = ' class="contain"' if s.get("contain") else ""
        inner += f'<div class="media" id="{sid}-media"><img id="{sid}-img"{fit} src="assets/{e(s["src"])}.jpg" alt=""></div>'
    elif s["kind"] in ("bang", "globe"):
        inner += f'<canvas id="{sid}-canvas" class="media" width="1920" height="1080"></canvas>'
    if s["kind"] == "end":
        inner += f'''<div class="endcard" id="end-card">
  <p class="end-kicker">13.8 billion years in six phases</p>
  <h1 class="end-title">Six Phases of Creation</h1>
  <p class="end-credits">Images: NASA · ESA · CSA · STScI · ESA/Webb · ESA/Planck Collaboration · NASA/JPL-Caltech · NASA Goddard Conceptual Image Lab · PHANGS-JWST Team. Plate model: Cao et al. 2024, EarthByte / GPlates.</p>
  <p class="end-credits">Illustrations and code-built sequences are labelled on screen. Not produced or endorsed by NASA or ESA.</p>
</div>'''
    else:
        inner += '<div class="scrim"></div>'
        if s.get("title"):
            tcls = " ptitle-sm" if s.get("small_title") else ""
            inner += f'''<div class="ptitle{tcls}" id="{sid}-ptitle"><p class="ptitle-no">Phase {s["phase"]}</p><h2 class="ptitle-name">{e(PHASES[s["phase"]])}</h2></div>'''
        label, cls = TAG[s["tag"]]
        inner += f'''<div class="caption" id="{sid}-cap"><p class="line" id="{sid}-line">{e(s["line"])}</p>
  <p class="credit"><span class="chip {cls}">{label}</span><span class="subject">{e(s["subject"])}</span><span class="by">{e(s["credit"])}</span></p></div>'''
    z = SHOTS.index(s) + 1
    return f'<div class="clip shot" id="{sid}" data-start="{s["start"]}" data-duration="{round(d, 3)}" data-track-index="{z}" style="z-index:{z}">{inner}</div>'


def main():
    tpl = open(os.path.join(HERE, "src", "template.html")).read()
    shots = "\n".join(shot_html(s) for s in SHOTS)
    cfg = dict(total=TOTAL, shots=SHOTS, clock=CLOCK, phases=PHASES, globeShot=GLOBE_SHOT)
    out = tpl.replace("{{SHOTS}}", shots).replace("{{CONFIG}}", json.dumps(cfg)).replace("{{TOTAL}}", str(TOTAL))
    open(os.path.join(HERE, "index.html"), "w").write(out)
    print(f"index.html: {len(SHOTS)} shots, {TOTAL}s")


if __name__ == "__main__":
    main()
