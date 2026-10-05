#!/usr/bin/env python3
"""Cut narration lines from the chosen take by word timings, place them on the film timeline,
and mix narration + music into the film's soundtrack. Re-run after changing TAKE, MUSIC or lines.py."""
import json, re, subprocess, os
from lines import LINES
HERE = os.path.dirname(os.path.abspath(__file__))
TAKE, MUSIC, TOTAL = "B", "music-takes/music-3.mp3", 100.0
PAD_IN, PAD_OUT, GAP = 0.06, 0.16, 0.25

def run(*a): subprocess.run(a, check=True, cwd=HERE)
def toks(s): return re.findall(r"[A-Za-z]+(?:-[A-Za-z]+)*", s)

W = [w for w in json.load(open(f"{HERE}/narration-takes/words-{TAKE}.json")) if re.search(r"[A-Za-z]", w.get("text", ""))]
i, plan, prev_end = 0, [], 0.0
for text, start, latest in LINES:
    ws = W[i:i + len(toks(text))]; i += len(ws)
    assert [re.sub(r"\W", "", w["text"]).lower() for w in ws] == [re.sub(r"\W", "", t).lower() for t in toks(text)], text
    a, b = ws[0]["start"] - PAD_IN, ws[-1]["end"] + PAD_OUT
    dur = b - a
    at = max(start, prev_end + GAP)                     # never closer than GAP to the previous line
    if at + dur > latest: at = max(prev_end + GAP, latest - dur)   # pull long lines earlier where there is room
    plan.append(dict(text=text, src_start=round(a, 3), src_end=round(b, 3), at=round(at, 3), end=round(at + dur, 3)))
    prev_end = at + dur
os.makedirs(f"{HERE}/lines", exist_ok=True)
inputs, filt = [], []
for k, p in enumerate(plan):
    clip = f"lines/line{k + 1:02d}.wav"
    run("ffmpeg", "-loglevel", "error", "-y", "-ss", str(p["src_start"]), "-to", str(p["src_end"]), "-i", f"narration-takes/take-{TAKE}.mp3",
        "-af", "afade=t=in:d=0.02,areverse,afade=t=in:d=0.08,areverse", "-ar", "48000", "-ac", "2", clip)
    inputs += ["-i", clip]
    filt.append(f"[{k}:a]adelay={int(p['at'] * 1000)}|{int(p['at'] * 1000)}[n{k}]")
filt.append("".join(f"[n{k}]" for k in range(len(plan))) + f"amix=inputs={len(plan)}:normalize=0,apad=whole_dur={TOTAL},atrim=0:{TOTAL}[out]")
run("ffmpeg", "-loglevel", "error", "-y", *inputs, "-filter_complex", ";".join(filt), "-map", "[out]", "-ar", "48000", "narration.wav")
json.dump(plan, open(f"{HERE}/narration-plan.json", "w"), indent=1)

# Levels: narration -17 LUFS; music -25 LUFS, ducked ~6 dB under speech (voice ~12-13 dB clear), then a limiter.
run("ffmpeg", "-loglevel", "error", "-y", "-i", "narration.wav", "-af", "loudnorm=I=-17:TP=-2:LRA=11", "-ar", "48000", "narration-norm.wav")
run("ffmpeg", "-loglevel", "error", "-y", "-i", MUSIC, "-af", f"atrim=0:{TOTAL},loudnorm=I=-25:TP=-3:LRA=11,afade=t=in:d=0.05", "-ar", "48000", "-ac", "2", "music-norm.wav")
run("ffmpeg", "-loglevel", "error", "-y", "-i", "music-norm.wav", "-i", "narration-norm.wav", "-filter_complex",
    "[1:a]asplit=2[sc][voice];[0:a][sc]sidechaincompress=threshold=0.04:ratio=2.5:attack=80:release=900:makeup=1[ducked];"
    "[ducked][voice]amix=inputs=2:normalize=0,alimiter=limit=0.89:level=false[mix]", "-map", "[mix]", "-ar", "48000", "mix.wav")
# Music-only fallback at the music's own level (the kit asks for one with every delivery).
run("ffmpeg", "-loglevel", "error", "-y", "-i", MUSIC, "-af", f"atrim=0:{TOTAL},loudnorm=I=-18:TP=-1.5:LRA=11", "-ar", "48000", "-ac", "2", "music-only.wav")
for p in plan: print(f"{p['at']:6.2f}-{p['end']:6.2f}  {p['text']}")
