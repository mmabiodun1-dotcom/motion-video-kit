#!/usr/bin/env python3
"""GroSolar ad: final audio mix.

Builds the 30.0 s soundtrack from the parts listed in a plan file (default: plan.json next to this script),
then muxes it onto the rendered picture.

  0.0-6.0   Rara 0:29.000-0:35.000 (+ generator sound from 2.56), hard stop at 6.0 (10 ms de-click)
  6.0-6.4   silence
  6.4-30.0  instrumental bed (Rara instrumental if licensed, else a free track), ducked under the voice,
            "Light don come!" cheer at the light reveal, voiceover lines at their slots, 1.2 s fade to 30.0

Usage:
  python3 mix.py [plan.json] [--picture ../film/renders/picture.mp4] [--out ../film/renders/grosolar-ad.mp4]

Only the parts that exist are used: a missing bed, cheer, voice line or generator sound is skipped
(the generator falls back to a synthesized placeholder), so a partial preview always renders.
Needs: ffmpeg (ebur128), numpy, scipy.
"""
import json, os, re, subprocess, sys
import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
plan_path = next((a for a in args if a.endswith('.json')), os.path.join(HERE, 'plan.json'))
plan = json.load(open(plan_path))
base = os.path.dirname(os.path.abspath(plan_path))
P = lambda p: p if p is None or os.path.isabs(p) else os.path.normpath(os.path.join(base, p))
have = lambda p: p is not None and os.path.exists(P(p))


def load(path, start=0.0, dur=None):
    cmd = ['ffmpeg', '-v', 'error', '-ss', f'{start:.3f}', '-i', P(path)]
    if dur is not None:
        cmd += ['-t', f'{dur:.3f}']
    cmd += ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()


def write(path, x):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', path],
                   input=x.astype(np.float32).tobytes(), check=True)


def lufs(x):
    tmp = os.path.join(HERE, '_lufs.wav'); write(tmp, x)
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    os.remove(tmp)
    m = re.findall(r'I:\s+(-?[\d.]+) LUFS', e)
    return float(m[-1]) if m else -70.0


def place(mix, clip, at, gain_db=0.0):
    i = int(at * SR); j = min(len(mix), i + len(clip))
    if j > i:
        mix[i:j] += clip[:j - i] * 10 ** (gain_db / 20)


def placeholder_generator(dur):
    """4-stroke single cylinder at ~3600 rpm (30 Hz firing), jittered; used only until a real recording is supplied."""
    rng = np.random.default_rng(7); n = int(dur * SR); tt = np.arange(n) / SR
    f = 30 * (1 + .015 * np.sin(2 * np.pi * .7 * tt)) * np.minimum(1, .6 + .4 * tt / .15)
    ph = np.cumsum(f) / SR; pulse = (np.sin(2 * np.pi * ph) > .6).astype(np.float32)
    body = sosfilt(butter(2, [35, 700], btype='band', fs=SR, output='sos'), pulse + .3 * rng.standard_normal(n))
    rattle = sosfilt(butter(2, [1200, 4000], btype='band', fs=SR, output='sos'), rng.standard_normal(n)) * (.5 + .5 * np.sin(2 * np.pi * ph))
    g = (body / np.abs(body).max() * .8 + rattle / np.abs(rattle).max() * .25) * np.minimum(1, tt / .08)
    return np.stack([g, g], 1).astype(np.float32)


T = plan.get('total', 30.0); N = int(T * SR)
o = plan['opening']; CUT = o.get('cut', 6.0); RESUME = o.get('resume', 6.4)
report = []

# ---- 1. opening: song clip + generator, both hard-stopped at CUT, levelled to the opening target ----
opening = np.zeros((int(CUT * SR), 2), np.float32)
song = load(o['song'], o['song_in'], CUT); opening[:len(song)] += song[:len(opening)]
g0 = o.get('generator_at', 2.56)
gen = load(o['generator'], o.get('generator_in', 0.0), CUT - g0) if have(o.get('generator')) else placeholder_generator(CUT - g0)
report.append('generator: ' + ('real recording' if have(o.get('generator')) else 'PLACEHOLDER (synthesized)'))
gen *= 10 ** (o.get('generator_db_under_song', -14) / 20) / max(1e-6, np.abs(gen).max())
place(opening, gen, g0)
opening *= 10 ** ((o.get('target_lufs', -14) - lufs(opening)) / 20)
r = int(.01 * SR); opening[-r:] *= np.linspace(1, 0, r)[:, None]; opening[:r] *= np.linspace(0, 1, r)[:, None]

# ---- 2. voice lines (each: file, in, out, at) and the cheer ----
voice = np.zeros((N, 2), np.float32)
vcfg = plan.get('voice', {})
for ln in vcfg.get('lines', []):
    if not have(ln.get('file')):
        report.append(f"voice line {ln.get('id')}: MISSING"); continue
    clip = load(ln['file'], ln.get('in', 0.0), (ln['out'] - ln.get('in', 0.0)) if 'out' in ln else None)
    f = int(.008 * SR); clip[:f] *= np.linspace(0, 1, f)[:, None]; clip[-f:] *= np.linspace(1, 0, f)[:, None]
    place(voice, clip, ln['at'])
    report.append(f"voice line {ln['id']}: {len(clip)/SR:.2f} s at {ln['at']:.2f} (slot ends {ln.get('slot_end', '?')})")
    if 'slot_end' in ln and ln['at'] + len(clip) / SR > ln['slot_end'] + .05:
        report.append(f"  WARNING line {ln['id']} overruns its slot by {ln['at'] + len(clip)/SR - ln['slot_end']:.2f} s")
if voice.any():
    voice *= 10 ** ((vcfg.get('target_lufs', -16) - lufs(voice[int(RESUME * SR):])) / 20)
c = plan.get('cheer', {})
cheer = np.zeros((N, 2), np.float32)
if have(c.get('file')):
    clip = load(c['file'], c.get('in', 0.0), c.get('dur')); place(cheer, clip, c['at'])
    cheer *= 10 ** ((c.get('target_lufs', -15) - lufs(clip)) / 20)
    report.append(f"cheer: {len(clip)/SR:.2f} s at {c['at']:.2f}")
else:
    report.append('cheer: MISSING')

# ---- 3. bed from RESUME, ducked under the voice (and cheer), fade to the end ----
bed = np.zeros((N, 2), np.float32)
b = plan.get('bed', {})
src = next((x for x in b.get('candidates', []) if have(x.get('file'))), None)
if src:
    clip = load(src['file'], src.get('in', 0.0), T - RESUME)
    f = int(b.get('fade_in', .12) * SR); clip[:f] *= np.linspace(0, 1, f)[:, None]
    place(bed, clip, RESUME)
    bed *= 10 ** ((b.get('target_lufs', -20) - lufs(bed[int(RESUME * SR):])) / 20)
    # ducking: a smoothed envelope of voice + cheer pulls the bed down by duck_db while anyone speaks
    key = np.abs(voice).max(1) + np.abs(cheer).max(1)
    w = int(.02 * SR); env = np.convolve(key, np.ones(w) / w, 'same')
    active = (env > 10 ** (-45 / 20)).astype(np.float32)
    att, rel = int(.06 * SR), int(.35 * SR)
    sm = np.convolve(active, np.ones(att) / att, 'same'); sm = np.maximum(sm, np.convolve(active, np.ones(rel) / rel, 'same'))
    gain = 10 ** (-b.get('duck_db', 8) * np.clip(sm, 0, 1) / 20)
    bed *= gain[:, None]
    fo = int(b.get('fade_out', 1.2) * SR); bed[N - fo:] *= np.linspace(1, 0, fo)[:, None]
    report.append(f"bed: {os.path.basename(P(src['file']))} from {src.get('in', 0.0):.2f} s")
else:
    report.append('bed: MISSING (silence after 6.4 s)')

# ---- 4. sum, true-peak safety, write, report ----
mix = np.zeros((N, 2), np.float32)
mix[:len(opening)] += opening
mix[int(RESUME * SR):] += bed[int(RESUME * SR):] + voice[int(RESUME * SR):] + cheer[int(RESUME * SR):]
mix[int(CUT * SR):int(RESUME * SR)] = 0  # the 0.4 s of silence after the switch flip stays silent
pk = np.abs(mix).max(); lim = 10 ** (-1.5 / 20)
if pk > lim:
    mix *= lim / pk
wav = os.path.join(HERE, 'mix.wav'); write(wav, mix)
report.append(f"mix: {T:.1f} s, whole-film {lufs(mix):.1f} LUFS, opening {lufs(mix[:int(CUT*SR)]):.1f} LUFS, "
              f"after 6.4 s {lufs(mix[int(RESUME*SR):]):.1f} LUFS, sample peak {20*np.log10(np.abs(mix).max()+1e-9):.1f} dBFS")
pic = opt('--picture', os.path.join(HERE, '..', 'film', 'renders', 'picture.mp4'))
out = opt('--out', os.path.join(HERE, '..', 'film', 'renders', 'grosolar-ad-mix-INTERNAL.mp4'))
if os.path.exists(pic):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', pic, '-i', wav, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '256k', '-t', f'{T:.3f}', '-movflags', '+faststart', out], check=True)
    report.append(f'video: {out}')
open(os.path.join(HERE, 'mix-report.txt'), 'w').write('\n'.join(report) + '\n')
print('\n'.join(report))
