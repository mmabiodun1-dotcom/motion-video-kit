#!/usr/bin/env python3
"""Find the blank grey phone screen in a still and write what the animatic needs to pin a code-built screen onto it.

Usage: python3 screen_quad.py <shot id>      e.g.  python3 screen_quad.py 11b
Reads frames/<id>.jpg. Writes:
  frames/<id>.matte.png  the photo's pixels that sit in front of the screen (a thumb, fingers), transparent elsewhere
  frames/quads.js        window.SCREEN_QUADS[<id>] = corners [TL, TR, BR, BL] in source pixels
No numpy needed; ffmpeg does the image I/O.
"""
import json, os, re, subprocess, sys
from collections import deque

sid = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, 'frames', f'{sid}.jpg')
w, h = map(int, subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', src]).decode().strip().split('x'))
rgb = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])
px = lambda x, y: rgb[(y * w + x) * 3:(y * w + x) * 3 + 3]

# 1. Flat neutral grey: low saturation, mid luma, almost no local gradient.
grey = bytearray(w * h)
for y in range(h - 1):
    for x in range(w - 1):
        r, g, b = px(x, y)
        if abs(r - g) < 12 and abs(g - b) < 12 and abs(r - b) < 14 and 85 < g < 220:
            r2, g2, b2 = px(x + 1, y); r3, g3, b3 = px(x, y + 1)
            if abs(g - g2) < 7 and abs(g - g3) < 7:
                grey[y * w + x] = 1

# 2. Largest connected grey region = the screen.
seen = bytearray(w * h); best = []
for start in range(w * h):
    if grey[start] and not seen[start]:
        comp = []; dq = deque([start]); seen[start] = 1
        while dq:
            i = dq.popleft(); comp.append(i); x, y = i % w, i // w
            for j in (i - 1 if x > 0 else -1, i + 1 if x < w - 1 else -1, i - w, i + w):
                if 0 <= j < w * h and grey[j] and not seen[j]:
                    seen[j] = 1; dq.append(j)
        if len(comp) > len(best): best = comp
if len(best) < 2000: sys.exit(f'No screen-sized grey region found in {src}')
mask = bytearray(w * h)
for i in best: mask[i] = 1
xs = [i % w for i in best]; ys = [i // w for i in best]
x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)

# 3. Robust straight edges (Theil-Sen on per-row / per-column extremes) so an occluding thumb doesn't bend them.
def theil_sen(pts):
    slopes = sorted((q[1] - p[1]) / (q[0] - p[0]) for k, p in enumerate(pts) for q in pts[k + 1::7] if q[0] != p[0])
    m = slopes[len(slopes) // 2]
    c = sorted(p[1] - m * p[0] for p in pts)[len(pts) // 2]
    return m, c
rows = range(y0 + (y1 - y0) // 10, y1 - (y1 - y0) // 10)
cols = range(x0 + (x1 - x0) // 10, x1 - (x1 - x0) // 10)
left, right, top, bot = [], [], [], []
for y in rows:
    xr = [x for x in range(x0, x1 + 1) if mask[y * w + x]]
    if xr: left.append((y, min(xr))); right.append((y, max(xr)))
for x in cols:
    yr = [y for y in range(y0, y1 + 1) if mask[y * w + x]]
    if yr: top.append((x, min(yr))); bot.append((x, max(yr)))
# Occluders only ever make the visible grey smaller, so fit each edge through its outermost points:
# keep the points within 2px of the outer 90th percentile, then Theil-Sen.
def outer(pts, far):
    vals = sorted(p[1] for p in pts)
    ref = vals[int(len(vals) * (0.9 if far else 0.1))]
    sel = [p for p in pts if (p[1] >= ref - 2 if far else p[1] <= ref + 2)]
    return sel if len(sel) >= 8 else pts
L, R, T, B = theil_sen(outer(left, False)), theil_sen(outer(right, True)), theil_sen(outer(top, False)), theil_sen(outer(bot, True))   # x = m*y + c  /  y = m*x + c

def cross(v, hz):  # v: x = a*y + b ; hz: y = c*x + d
    a, b = v; c, d = hz
    y = (c * b + d) / (1 - c * a); return [a * y + b, y]
pad = 1.0  # cover the anti-aliased rim
tl, tr, br, bl = cross(L, T), cross(R, T), cross(R, B), cross(L, B)
cx, cy = sum(p[0] for p in (tl, tr, br, bl)) / 4, sum(p[1] for p in (tl, tr, br, bl)) / 4
quad = [[round(p[0] + pad * (1 if p[0] > cx else -1), 1), round(p[1] + pad * (1 if p[1] > cy else -1), 1)] for p in (tl, tr, br, bl)]

# 4. Occluders: non-grey pixels inside the quad (shrunk 2px), kept only as sizeable blobs, then grown 3px.
def inside(x, y, q, shrink=0.0):
    n = len(q); s = 0
    for k in range(n):
        (ax, ay), (bx, by) = q[k], q[(k + 1) % n]
        cr = (bx - ax) * (y - ay) - (by - ay) * (x - ax)
        L2 = ((bx - ax) ** 2 + (by - ay) ** 2) ** 0.5
        if cr / L2 < shrink: return False
    return True
occ = bytearray(w * h)
for y in range(int(y0) - 2, int(y1) + 3):
    for x in range(int(x0) - 2, int(x1) + 3):
        if 0 <= x < w and 0 <= y < h and not mask[y * w + x] and inside(x + .5, y + .5, quad, 2.0):
            r, g, b = px(x, y)
            if not (abs(r - g) < 16 and abs(g - b) < 16 and 70 < g < 230):  # clearly not screen grey
                occ[y * w + x] = 1
seen = bytearray(w * h); keep = bytearray(w * h)
for start in range(w * h):
    if occ[start] and not seen[start]:
        comp = []; dq = deque([start]); seen[start] = 1
        while dq:
            i = dq.popleft(); comp.append(i); x = i % w
            for j in (i - 1 if x > 0 else -1, i + 1 if x < w - 1 else -1, i - w, i + w):
                if 0 <= j < w * h and occ[j] and not seen[j]:
                    seen[j] = 1; dq.append(j)
        if len(comp) >= 150:
            for i in comp: keep[i] = 1
grow = bytearray(keep)
for _ in range(3):  # grow 3px so no sliver of screen shows along the occluder's edge
    cur = bytes(grow)
    for i in range(w, w * h - w):
        if cur[i]:
            for j in (i - 1, i + 1, i - w, i + w):
                if not mask[j]: grow[j] = 1   # never pull flat screen grey into the matte (no halo)
rgba = bytearray(w * h * 4)
for i in range(w * h):
    if grow[i]:
        rgba[i * 4:i * 4 + 3] = rgb[i * 3:i * 3 + 3]; rgba[i * 4 + 3] = 255
out = os.path.join(here, 'frames', f'{sid}.matte.png')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{w}x{h}', '-i', '-', '-frames:v', '1', out], input=bytes(rgba), check=True)

# 5. Record the quad.
qfile = os.path.join(here, 'frames', 'quads.js')
data = {}
if os.path.exists(qfile):
    m = re.search(r'=\s*(\{.*\});', open(qfile).read(), re.S)
    if m: data = json.loads(m.group(1))
data[sid] = {'quad': quad, 'size': [w, h], 'matte': bool(sum(grow))}
open(qfile, 'w').write('// Written by screen_quad.py: blank phone screens found in stills (corners TL, TR, BR, BL in source px).\nwindow.SCREEN_QUADS = ' + json.dumps(data, indent=1) + ';\n')
area = sum(grow)
print(f'#{sid}: screen {len(best)} px, quad {quad}, occluder {area} px -> {out}')
