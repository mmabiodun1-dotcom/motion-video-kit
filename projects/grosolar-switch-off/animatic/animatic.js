// GroSolar "Switch Off" animatic engine.
// Every visual state is a pure function of timeline time t (seconds): seek(t) always gives the same frame.
// Renderer hooks: window.__ready (Promise), window.__seek(t), window.__info(), window.__captions().
(() => {
  'use strict';
  const TL = window.TIMELINE;
  const params = new URLSearchParams(location.search);
  const RENDER = params.has('render');
  if (RENDER) document.body.classList.add('render');
  if (params.get('slate') === '0') document.body.classList.add('noslate');

  // ---------- helpers ----------
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const lerp = (a, b, p) => a + (b - a) * p;
  const E = {
    out: p => 1 - Math.pow(1 - p, 3),
    in: p => p * p * p,
    inOut: p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    back: p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); }
  };
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const fmt = t => { const m = Math.floor(t / 60), s = t - m * 60; return `${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`; };
  // Fade/slide an overlay in at tin, out at tout (local times).
  const showIn = (el, lt, tin, tout, dy = 30, dur = 0.32) => {
    const a = E.out(seg(lt, tin, tin + dur)), b = 1 - seg(lt, tout - 0.2, tout);
    el.style.opacity = (a * b).toFixed(3);
    el.style.transform = `translateY(${((1 - a) * dy).toFixed(1)}px)`;
  };
  const POWER = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/></svg>';
  const CHECK = '<svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const LOGO = (note) => `<div class="logo-ph"><span class="mark"></span><span class="wm"><b>GroSolar</b><small>${note}</small></span></div>`;

  const stage = document.getElementById('stage');
  const slate = document.getElementById('slate');
  const available = new Set();   // frame ids that loaded
  const scenes = [];             // { win:[a,b], el, update(t) }

  // ---------- media (photo or placeholder) ----------
  function makeMedia(id, mood, shot) {
    const m = h('div', 'media');
    if (id && available.has(id)) {
      const img = h('img'); img.src = `frames/${id}.jpg`; img.alt = shot ? shot.title : id; m.appendChild(img);
    } else {
      const ph = h('div', `ph ${mood === 'after' ? 'after' : 'before'}`);
      ph.innerHTML = `<div class="num">#${shot ? shot.n : id}</div><div class="ttl">${shot ? shot.title : ''}</div>` +
        `<div class="meta">${shot && shot.prompt ? 'Gemini ' + shot.prompt : ''}</div><div class="pend">Frame pending</div>`;
      m.appendChild(ph);
    }
    return m;
  }
  const shotById = id => TL.shots.find(s => s.id === id);

  // Shared overlays for photo-like shots: super, caption, VO, dramatisation, TBC bug.
  function addOverlays(layer, s, opts = {}) {
    const o = {};
    if (s.sup) { layer.appendChild(h('div', 'shade-top')); o.sup = h('p', 'super' + (opts.light ? ' on-light' : ''), s.sup); layer.appendChild(o.sup); }
    if (s.cap || (s.vo && !opts.voTop)) layer.appendChild(h('div', 'shade-bot'));
    if (s.cap) { o.cap = h('div', 'cap', `<span class="who">${s.cap.who}</span><span class="line">${s.cap.line}</span>`); layer.appendChild(o.cap); }
    if (s.vo) { o.vo = h('div', 'vo ' + (opts.voTop ? 'top' : 'low'), `<b>VO</b><span>${s.vo}</span>`); layer.appendChild(o.vo); }
    if (s.dram) { o.dram = h('div', 'dram', 'Dramatisation'); layer.appendChild(o.dram); }
    if (s.tbc) layer.appendChild(h('div', 'tbc-bug', s.tbc));
    return (lt, dur) => {
      if (o.sup) showIn(o.sup, lt, s.supAt ?? 0.25, dur + 1);
      if (o.cap) {
        const a = E.back(seg(lt, s.capAt ?? 0.25, (s.capAt ?? 0.25) + 0.35));
        o.cap.style.opacity = clamp(seg(lt, s.capAt ?? 0.25, (s.capAt ?? 0.25) + 0.15)).toFixed(3);
        o.cap.style.transform = `scale(${lerp(0.92, 1, a).toFixed(4)})`; o.cap.style.transformOrigin = '0 100%';
      }
      if (o.vo) showIn(o.vo, lt, s.voAt ?? 0.2, dur + 1, 20);
      if (o.dram) o.dram.style.opacity = seg(lt, 0.2, 0.5).toFixed(3);
    };
  }

  // Projective transform that maps a w x h box onto a quad [TL, TR, BR, BL] (CSS matrix3d, origin 0 0).
  function homog(q) {  // unit square -> quad
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1;
    const g = (dx3 * dy2 - dx2 * dy3) / den, hh = (dx1 * dy3 - dx3 * dy1) / den;
    return { a: x1 - x0 + g * x1, b: x3 - x0 + hh * x3, c: x0, d: y1 - y0 + g * y1, e: y3 - y0 + hh * y3, f: y0, g, hh };
  }
  // Map a point (u, v) of a w x h box placed on quad q to stage px.
  function mapQuad(q, w, hgt, u, v) { const { a, b, c, d, e, f, g, hh } = homog(q), U = u / w, V = v / hgt, z = g * U + hh * V + 1; return [(a * U + b * V + c) / z, (d * U + e * V + f) / z]; }
  function quadMatrix(w, hgt, q) {
    const { a, b, c, d, e, f, g, hh } = homog(q);
    return `matrix3d(${[a / w, d / w, 0, g / w, b / hgt, e / hgt, 0, hh / hgt, 0, 0, 1, 0, c, f, 0, 1].map(v => +v.toFixed(8)).join(',')})`;
  }
  // A code-built app screen pinned onto a blank phone in a photo. quad is in source-image pixels.
  function addScreenPin(media, s) {
    const img = media.querySelector('img'); if (!img || !s.screenPin) return;
    const found = (window.SCREEN_QUADS || {})[s.id];   // measured by screen_quad.py; falls back to the timeline's estimate
    const iw = img.naturalWidth, ih = img.naturalHeight, k = Math.max(1080 / iw, 1920 / ih), ox = (1080 - iw * k) / 2, oy = (1920 - ih * k) / 2;
    const q = (found ? found.quad : s.screenPin.quad).map(([x, y]) => [x * k + ox, y * k + oy]);
    const W = 360, H = Math.round(W * (Math.hypot(q[3][0] - q[0][0], q[3][1] - q[0][1]) / Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1])));
    const scr = h('div', '', `<div style="display:grid;gap:26px;justify-items:center;align-content:center;height:100%;padding:40px;text-align:center;color:#002554;font-family:var(--font)">
      <div style="width:120px;height:120px;border-radius:32px;background:linear-gradient(135deg,#FCD733,#FF9633)"></div>
      <div style="font-weight:800;font-size:46px;line-height:1">GroSolar NG</div>
      <div style="font-weight:600;font-size:24px;color:#7489A5;line-height:1.3">${s.screenPin.label || 'App screen from GroSolar to come'}</div></div>`);
    scr.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;background:#F5F9FF;transform-origin:0 0;transform:${quadMatrix(W, H, q)};box-shadow:0 0 0 2px rgba(0,0,0,.25) inset`;
    media.appendChild(scr);
    if (found && found.matte) { const m = h('img'); m.src = `frames/${s.id}.matte.png`; m.alt = ''; m.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover'; media.appendChild(m); }
  }

  // ---------- scene builders ----------
  function buildPhoto(s) {
    const layer = h('div', 'layer');
    const media = makeMedia(s.id, s.mood, s); layer.appendChild(media);
    if (s.screenPin && available.has(s.id)) { const img = media.querySelector('img'); if (img.complete) addScreenPin(media, s); else img.addEventListener('load', () => addScreenPin(media, s), { once: true }); }
    const over = addOverlays(layer, s);
    const [s0, s1, x0, x1, y0, y1] = s.push || [1, 1.04, 0, 0, 0, 0];
    let dark;
    if (s.dotOut) { dark = h('div'); dark.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0'; layer.appendChild(dark); }
    return {
      s, el: layer, win: [s.t0 - (s.xin || 0), s.t1], fadeIn: s.xin || 0,
      update(t) {
        const dur = s.t1 - s.t0, lt = t - s.t0, p = E.inOut(seg(lt, 0, dur));
        media.style.transform = `translate(${lerp(x0, x1, p).toFixed(2)}px, ${lerp(y0, y1, p).toFixed(2)}px) scale(${lerp(s0, s1, p).toFixed(4)})`;
        over(lt, dur);
        if (dark) dark.style.opacity = E.in(seg(lt, dur - 0.45, dur)).toFixed(3);
      }
    };
  }

  // #8 and #23: four worlds in a 2x2 grid, then collapse.
  function buildGrid(s, variant) {
    const layer = h('div', 'layer');
    const bg = h('div'); bg.style.cssText = `position:absolute;inset:0;background:${variant === 'sprout' ? 'radial-gradient(900px 700px at 50% 30%, rgba(255,151,51,.35), transparent 70%), #002554' : '#120E10'}`;
    layer.appendChild(bg);
    const pos = [[0, 0], [540, 0], [0, 960], [540, 960]];
    const tiles = s.tiles.map((id, i) => {
      const tile = h('div', 'tile'); tile.style.left = pos[i][0] + 'px'; tile.style.top = pos[i][1] + 'px';
      const ms = shotById(id);
      tile.appendChild(makeMedia(id, ms ? ms.mood : 'before', ms));
      if (variant !== 'sprout') tile.appendChild(h('div', 'haze'));
      layer.appendChild(tile); return tile;
    });
    let receipt, svg, path, leaves, len = 0;
    if (s.receipt) {
      receipt = h('div', 'receipt', '<div class="crease"></div><div class="h">FUEL</div><i></i><i style="width:70%"></i><i></i><i style="width:55%"></i><i style="width:80%"></i><div class="tot"><span>TOTAL</span><span>₦ 000,000</span></div>');
      receipt.style.left = (540 - 165) + 'px'; receipt.style.top = (900 - 210) + 'px';
      layer.appendChild(receipt);
    }
    if (variant === 'sprout') {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 1080 1920'); svg.setAttribute('width', '1080'); svg.setAttribute('height', '1920');
      svg.style.cssText = 'position:absolute;inset:0';
      svg.innerHTML = '<defs><linearGradient id="sg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FCD733"/><stop offset="1" stop-color="#FF9633"/></linearGradient></defs>' +
        '<path id="sp" d="M540 1560 C 540 1330, 610 1150, 545 960 S 470 720, 540 560" fill="none" stroke="url(#sg)" stroke-width="18" stroke-linecap="round"/>' +
        '<g id="lv"><path d="M541 1390 C 470 1350, 430 1300, 420 1240 C 490 1250, 530 1300, 541 1390 Z" fill="#FCD733"/><path d="M546 1330 C 620 1300, 660 1240, 670 1180 C 600 1195, 560 1250, 546 1330 Z" fill="#FF9633"/></g>';
      layer.appendChild(svg);
      path = svg.querySelector('#sp'); leaves = svg.querySelector('#lv');
    }
    if (s.vo) { const vo = addOverlays(layer, { vo: s.vo, voAt: 0.2 }); s._vo = vo; }
    return {
      s, el: layer, win: [s.t0 - (s.xin || 0), s.t1], fadeIn: s.xin || 0,
      update(t) {
        const dur = s.t1 - s.t0, lt = t - s.t0;
        const target = variant === 'sprout' ? [540, 1500] : [540, 900];
        const cA = variant === 'sprout' ? 0.55 : 1.1, cB = variant === 'sprout' ? 1.0 : 1.7;
        tiles.forEach((tile, i) => {
          const a = E.out(seg(lt, i * 0.08, i * 0.08 + 0.35));
          const c = E.inOut(seg(lt, cA + i * 0.03, cB + i * 0.03));
          const cx = pos[i][0] + 270, cy = pos[i][1] + 480;
          const dx = (target[0] - cx) * c, dy = (target[1] - cy) * c;
          const sc = lerp(1.06, 1, a) * lerp(1, 0.16, c);
          const rot = (i % 2 ? 6 : -6) * c;
          tile.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
          tile.style.opacity = (a * (1 - seg(lt, cB - 0.12, cB + 0.05))).toFixed(3);
          const med = tile.firstChild; med.style.transform = `scale(${lerp(1.0, 1.05, seg(lt, 0, dur)).toFixed(4)})`;
        });
        if (receipt) {
          const a = E.back(seg(lt, 1.35, 1.8)), f = E.in(seg(lt, 2.1, 2.48));
          receipt.style.opacity = (seg(lt, 1.35, 1.5)).toFixed(3);
          receipt.style.transform = `translate(${(f * 900).toFixed(1)}px, ${(-f * 120).toFixed(1)}px) rotate(${lerp(lerp(-14, -7, a), 28, f).toFixed(2)}deg) scale(${lerp(0.3, 1, a).toFixed(4)})`;
        }
        if (path) {
          if (!len) { len = path.getTotalLength(); path.style.strokeDasharray = len; }
          path.style.strokeDashoffset = (len * (1 - E.inOut(seg(lt, 0.8, 1.5)))).toFixed(1);
          leaves.style.opacity = seg(lt, 1.05, 1.3).toFixed(3);
          leaves.style.transformOrigin = '540px 1380px';
          leaves.style.transform = `scale(${lerp(0.4, 1, E.back(seg(lt, 1.05, 1.4))).toFixed(4)})`;
        }
        if (s._vo) s._vo(lt, dur);
      }
    };
  }

  // #9: the market photo with a code-built price tag that slams in, then tears off into light.
  function buildTag(s) {
    const base = buildPhoto(s);
    const tag = h('div', 'tag', '<div class="body"><span>₦ ???,???</span></div><div class="hole"></div>');
    const flash = h('div', 'flash'); flash.style.opacity = 0;
    base.el.appendChild(tag); base.el.appendChild(flash);
    const up = base.update;
    base.update = t => {
      up(t);
      const lt = t - s.t0, dur = s.t1 - s.t0;
      const a = E.back(seg(lt, 0.45, 0.8)), r = E.in(seg(lt, dur - 0.45, dur - 0.05));
      tag.style.opacity = (seg(lt, 0.45, 0.55) * (1 - r)).toFixed(3);
      tag.style.transform = `translate(0, ${(-r * 520).toFixed(1)}px) rotate(${lerp(-4, -42, r).toFixed(2)}deg) scale(${lerp(1.8, 1, a).toFixed(4)})`;
      flash.style.opacity = E.in(seg(lt, dur - 0.35, dur)).toFixed(3);
    };
    return base;
  }

  // #10: the offer in the light brand world. The switch itself is the global actor.
  function buildOffer(s) {
    const layer = h('div', 'layer');
    layer.appendChild(h('div', 'lightbg'));
    const copy = h('div', 'offer-copy');
    const logo = h('div', '', LOGO('Logo placeholder')); const l1 = h('div', 'l1', 'No Large Upfront Costs.'); const l2 = h('div', 'l2 grad-text', 'Predictable Monthly Cost.');
    copy.append(logo, l1, l2); copy.style.top = '840px'; layer.appendChild(copy);
    const vo = addOverlays(layer, { vo: s.vo, voAt: s.voAt ?? 0.2 });
    layer.querySelector('.shade-bot')?.remove();
    return {
      s, el: layer, win: [s.t0 - (s.xin || 0), s.t1], fadeIn: s.xin || 0,
      update(t) {
        const lt = t - s.t0, dur = s.t1 - s.t0, out = seg(lt, dur - 0.45, dur - 0.15);
        [[logo, 0.35], [l1, 0.6], [l2, 0.8]].forEach(([el, at]) => showIn(el, lt, at, dur - 0.3, 40));
        copy.style.opacity = (1 - out).toFixed(3);
        vo(lt, dur);
      }
    };
  }

  // #11-#16: one persistent phone; screens slide between steps.
  function buildPhone(shots) {
    const t0 = shots[0].t0, t1 = shots[shots.length - 1].t1, XIN = 0.35;
    const layer = h('div', 'layer');
    // Photo mode: the #11b hand-and-phone still, pushed in on the phone, with the screens corner-pinned into its
    // blank grey screen (corners from screen_quad.py) and the thumb matted back on top.
    // Fallback: a code-built phone on the #11a plate (or a gradient street).
    const PQ = (window.SCREEN_QUADS || {})[TL.phoneShot];
    const PHOTO = !!(PQ && available.has(TL.phoneShot));
    const SW = 716; let SH = 1136, srcQuad, C = [540, 920], media = null, matte = null;
    const dist = (p, r) => Math.hypot(p[0] - r[0], p[1] - r[1]);
    if (PHOTO) {
      const [iw, ih] = PQ.size, k = Math.max(1080 / iw, 1920 / ih), ox = (1080 - iw * k) / 2, oy = (1920 - ih * k) / 2;
      srcQuad = PQ.quad.map(([x, y]) => [x * k + ox, y * k + oy]);
      const [a, b, c, d] = srcQuad;
      SH = Math.round(SW * ((dist(a, d) + dist(b, c)) / 2) / ((dist(a, b) + dist(d, c)) / 2));
      C = [srcQuad.reduce((m, p) => m + p[0], 0) / 4, srcQuad.reduce((m, p) => m + p[1], 0) / 4];
      media = h('div', 'media', `<img src="frames/${TL.phoneShot}.jpg" alt="A hand holds a phone up on a sunny Lagos street">`);
      media.style.transformOrigin = `${C[0]}px ${C[1]}px`; layer.appendChild(media);
      const wash = h('div'); wash.style.cssText = 'position:absolute;inset:0 0 auto 0;height:440px;background:linear-gradient(to bottom, rgba(245,249,255,.88), rgba(245,249,255,0))'; layer.appendChild(wash);
    } else {
      if (available.has(TL.phonePlate)) { const p = h('div', 'plate'); const img = h('img'); img.src = `frames/${TL.phonePlate}.jpg`; img.alt = 'Lagos street'; p.appendChild(img); layer.appendChild(p); }
      else layer.appendChild(h('div', 'street'));
      layer.appendChild(h('div', 'phone'));
      srcQuad = [[182, 352], [898, 352], [898, 1488], [182, 1488]];
    }
    const screen = h('div', 'screen'); screen.style.cssText = `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px;transform-origin:0 0;border-radius:${PHOTO ? 64 : 72}px`;
    layer.appendChild(screen);
    if (PHOTO && PQ.matte) { matte = h('div', 'media', `<img src="frames/${TL.phoneShot}.matte.png" alt="">`); matte.style.transformOrigin = media.style.transformOrigin; layer.appendChild(matte); }
    screen.appendChild(h('div', 'urlbar', 'grosolar.co'));
    const PUSH = TL.phonePush || 1.6, CY = TL.phoneCenterY || 918;
    const pushAt = t => PHOTO ? { s: PUSH * lerp(1, 1.04, seg(t, t0, t1)), D: [540 - C[0], CY - C[1]] } : { s: 1, D: [0, 0] };
    const quadAt = t => { const { s, D } = pushAt(t); return srcQuad.map(([x, y]) => [C[0] + D[0] + s * (x - C[0]), C[1] + D[1] + s * (y - C[1])]); };
    const tileImg = id => available.has(id) ? `background-image:url(frames/${id}.jpg)` : 'background:#6B7C93';
    const ICON = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="#002554" stroke-width="2" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>',
      biz: '<svg viewBox="0 0 24 24" fill="none" stroke="#FF9733" stroke-width="2" stroke-linejoin="round"><path d="M3 20V9l6 3V9l6 3V5h6v15z"/></svg>',
      bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
      fan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 2-6 4-6s2 3-2 6M14 12c4 0 6 2 6 4s-3 2-6-2M12 14c0 4-2 6-4 6s-2-3 2-6M10 12c-4 0-6-2-6-4s3-2 6 2"/></svg>',
      tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/></svg>',
      fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 5v2M9 13v3"/></svg>',
      freezer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 11h18M7 8.5h3"/></svg>',
      pump: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 14h10v6H4zM14 16h4a2 2 0 0 0 2-2V8M17 8h6M9 14V9a3 3 0 0 1 6 0"/></svg>',
      ac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="5" width="20" height="8" rx="2"/><path d="M7 17v3M12 17v4M17 17v3"/></svg>',
      washer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M7 6h2"/></svg>'
    };
    const mk = html => { const d = h('div', 'scr', html); screen.appendChild(d); return d; };
    const S = {
      landing: mk(`<div class="landing-hero"><div style="transform:scale(.62);transform-origin:0 0;height:92px;color:#002554">${LOGO('Logo placeholder')}</div>
        <h3>Switch to Solar and Enjoy Cheaper &amp; Reliable Power</h3><p>Solar as a service for households and businesses. No Large Upfront Costs. Predictable Monthly Cost.</p></div>
        <div class="btn" data-k="btn">Get started</div>`),
      info: mk(`<div class="step"><span>Step 1 of 4</span><span>About you</span></div><div class="bar"><i style="width:25%"></i></div>
        <h3>Let's get you started</h3>
        <div class="field"><label>Full name</label><div class="in" data-k="name"><span></span><span class="ok" style="opacity:0">${CHECK}</span></div></div>
        <div class="field"><label>Phone number</label><div class="in" data-k="phone"><span></span><span class="ok" style="opacity:0">${CHECK}</span></div></div>
        <div class="btn" data-k="btn">Continue</div>`),
      property: mk(`<div class="step"><span>Step 2 of 4</span><span>Property</span></div><div class="bar"><i style="width:50%"></i></div>
        <h3>Is this for your home or your business?</h3>
        <div class="choice"><div class="opt" data-k="home"><span class="ico">${ICON.home}</span><b>Home Owner</b><small>Studio · 2/3/4 Bed · Duplex</small><div class="tiles"><span data-k="t0" style="${tileImg('03')}"></span></div></div>
        <div class="opt" data-k="biz"><span class="ico">${ICON.biz}</span><b>Business</b><small>Shops, offices and more</small><div class="tiles"><span data-k="t1" style="${tileImg('05')}"></span><span data-k="t2" style="${tileImg('06')}"></span><span data-k="t3" style="${tileImg('07')}"></span></div></div></div>
        <div class="pills" data-k="pills"><span class="pill">Studio</span><span class="pill">2 Bedroom</span><span class="pill">3 Bedroom</span><span class="pill">4 Bedroom</span><span class="pill">Duplex</span></div>
        <div class="btn" data-k="btn">Continue</div>`),
      energy: mk(`<div class="step"><span>Step 3 of 4</span><span>Energy</span></div><div class="bar"><i style="width:75%"></i></div>
        <h3>Your energy needs</h3>
        <div class="field"><label>Monthly diesel / fuel spend</label><div class="in" data-k="fuel"><span data-k="fuelv" style="opacity:0"><span style="filter:blur(7px)">₦ 000,000</span></span><span data-k="fuelt" style="font-size:22px;color:#FF9733;opacity:0">from your receipt</span></div></div>
        <div class="loads" data-k="loads">${['bulb:Bulbs:1', 'fan:Fan:1', 'tv:TV:1', 'fridge:Fridge:1', 'freezer:Freezer:1', 'pump:Pump:0', 'ac:AC:0', 'washer:Washer:1'].map(x => { const [k, l, on] = x.split(':'); return `<span class="load" data-on="${on}">${ICON[k]}${l}</span>`; }).join('')}</div>
        <div class="btn" data-k="btn">Continue</div>`),
      provider: mk(`<div class="step"><span>Step 4 of 4</span><span>Location &amp; provider</span></div><div class="bar"><i style="width:100%"></i></div>
        <div class="field"><label>Location</label><div class="in" data-k="loc"><span></span></div></div>
        <p style="font-weight:600;color:#002554">Choose a preferred solar provider</p>
        <div class="provs" data-k="provs"><div class="prov"><span class="mono">A</span>Partner provider A</div><div class="prov"><span class="mono">B</span>Partner provider B</div><div class="prov"><span class="mono">C</span>Partner provider C</div></div>
        <div class="btn" data-k="btn">Request site visit</div>
        <div class="toast" data-k="toast"><span class="ok">${CHECK}</span>Site visit requested</div>`),
      proposal: mk(`<div class="step"><span>Your proposal</span><span style="color:#FF9733">After site visit</span></div>
        <h3>Your solar, your monthly plan</h3><p>Prepared by your partner solar provider after the site visit.</p>
        <div class="prop" data-k="rows"><div class="prop-row"><span>System</span><b>Sized to your loads</b></div><div class="prop-row"><span>Upfront cost</span><b>No large upfront cost</b></div><div class="prop-row"><span>Hardware replacement</span><b>No additional cost</b></div><div class="prop-row key"><span>Monthly</span><b>Predictable monthly cost</b></div></div>
        <div class="btn" data-k="btn">Accept proposal</div>`)
    };
    const q = (scr, k) => S[scr].querySelector(`[data-k="${k}"]`);
    const order = ['landing', 'info', 'property', 'energy', 'provider', 'proposal'];
    const starts = shots.map(x => x.t0);
    const tap = h('div', 'tap'); tap.style.opacity = 0; tap.style.zIndex = 5; screen.appendChild(tap);
    const pill = h('div'); pill.style.cssText = 'position:absolute;z-index:4;background:linear-gradient(135deg,#FCD733,#FF9633);border-radius:99px;opacity:0'; screen.appendChild(pill);
    const receipt = h('div', 'receipt', '<div class="crease"></div><div class="h">FUEL</div><i></i><i style="width:70%"></i><i></i><i style="width:55%"></i><div class="tot"><span>TOTAL</span><span>₦ 000,000</span></div>');
    receipt.style.opacity = 0; layer.appendChild(receipt);

    // Top-slot overlays (super or VO) per shot
    const tops = shots.map(s => {
      const els = [];
      if (s.vo) els.push([h('div', 'vo top', `<b>VO</b><span>${s.vo}</span>`), s.voAt ?? 0.2]);
      if (s.sup) { const p = h('p', 'super on-light', s.sup); p.style.cssText = s.vo ? 'top:250px;font-size:48px' : 'top:110px;font-size:76px'; els.push([p, s.supAt ?? 0.3]); }
      els.forEach(([el]) => { el.style.opacity = 0; layer.appendChild(el); });
      return els;
    });

    // Positions inside the stage (unscaled px), measured once after layout.
    let G = null;
    const rectIn = el => { const r = el.getBoundingClientRect(), sr = screen.getBoundingClientRect(), k = SW / sr.width; return { x: (r.left - sr.left) * k, y: (r.top - sr.top) * k, w: r.width * k, h: r.height * k }; };
    const measure = () => {
      const save = order.map(k => S[k].style.transform); order.forEach(k => { S[k].style.transform = 'none'; });
      const saveScreen = screen.style.transform; screen.style.transform = 'none';
      G = {};
      order.forEach(k => { const b = q(k, 'btn'); if (b) G['btn_' + k] = rectIn(b); });
      G.fuel = rectIn(q('energy', 'fuel'));
      G.provB = rectIn(q('provider', 'provs').children[1]);
      G.home = rectIn(q('property', 'home'));
      order.forEach((k, i) => { S[k].style.transform = save[i]; });
      screen.style.transform = saveScreen;
    };
    // Where the landing button sits on stage when the switch lands on it (t = start of #11).
    window.__phoneBtn = () => {
      if (!G) measure();
      const r = G.btn_landing, q = quadAt(t0), cx = r.x + r.w / 2;
      const c = mapQuad(q, SW, SH, cx, r.y + r.h / 2), top = mapQuad(q, SW, SH, cx, r.y), bot = mapQuad(q, SW, SH, cx, r.y + r.h);
      return { x: c[0], y: c[1], h: bot[1] - top[1] };
    };

    const tapAt = (lt, at, r) => { const p = seg(lt, at, at + 0.4); if (p > 0 && p < 1) { tap.style.left = (r.x + r.w / 2) + 'px'; tap.style.top = (r.y + r.h / 2) + 'px'; tap.style.opacity = (0.9 * (1 - p)).toFixed(3); tap.style.transform = `scale(${lerp(0.6, 1.3, E.out(p)).toFixed(3)})`; return true; } return false; };
    const typeIn = (el, text, t, a, b) => { const n = Math.round(text.length * seg(t, a, b)); el.innerHTML = text.slice(0, n) + (t >= a - 0.2 && t < b + 0.4 ? '<span class="caret"></span>' : ''); };

    return {
      s: shots[0], el: layer, win: [t0 - XIN, t1], fadeIn: XIN, multi: shots,
      update(t) {
        if (!G) measure();
        // push-in on the phone (slow drift over the whole sequence) and the screen pinned into it
        const { s: sc, D } = pushAt(t), tf = `translate(${D[0].toFixed(2)}px, ${D[1].toFixed(2)}px) scale(${sc.toFixed(5)})`;
        if (media) media.style.transform = tf;
        if (matte) matte.style.transform = tf;
        const Q = quadAt(t);
        screen.style.transform = quadMatrix(SW, SH, Q);
        // which screen; slide transitions of 0.3s
        let idx = 0; starts.forEach((st, i) => { if (t >= st) idx = i; });
        order.forEach((k, i) => {
          let x = i < idx ? -716 : i > idx ? 716 : 0;
          if (i === idx && idx > 0) x = lerp(716, 0, E.inOut(seg(t, starts[idx], starts[idx] + 0.3)));
          if (i === idx - 1) x = lerp(0, -716, E.inOut(seg(t, starts[idx], starts[idx] + 0.3)));
          S[k].style.transform = `translateX(${x.toFixed(1)}px)`;
          S[k].style.visibility = (i === idx || i === idx - 1) ? 'visible' : 'hidden';
        });
        // top-slot overlays
        shots.forEach((s, i) => tops[i].forEach(([el, at]) => { const lt = t - s.t0; showIn(el, lt, at, s.t1 - s.t0, 20); if (t < s.t0 || t >= s.t1) el.style.opacity = 0; }));

        let tapped = false;
        // #11 landing: the switch lands as the button (pill grows from a circle)
        const bl = G.btn_landing; const g = E.inOut(seg(t, 24.0, 24.35));
        const bBtn = q('landing', 'btn');
        if (t < 24.35) {
          const w = lerp(bl.h, bl.w, g);
          Object.assign(pill.style, { left: (bl.x + bl.w / 2 - w / 2).toFixed(1) + 'px', top: bl.y.toFixed(1) + 'px', width: w.toFixed(1) + 'px', height: bl.h.toFixed(1) + 'px', opacity: t >= 24.0 ? 1 : 0 });
          bBtn.style.opacity = 0;
        } else { pill.style.opacity = 0; bBtn.style.opacity = 1; }
        bBtn.style.transform = `scale(${t > 25.2 && t < 25.4 ? 0.96 : 1})`;
        tapped = tapAt(t, 25.2, bl) || tapped;
        // #12 info
        typeIn(q('info', 'name').firstChild, 'Ada Okafor', t, 26.35, 26.95);
        typeIn(q('info', 'phone').firstChild, '080• ••• ••••', t, 27.0, 27.45);
        q('info', 'name').lastChild.style.opacity = seg(t, 27.0, 27.15).toFixed(2);
        q('info', 'phone').lastChild.style.opacity = seg(t, 27.5, 27.65).toFixed(2);
        tapped = tapAt(t, 27.7, G.btn_info) || tapped;
        // #13 property: tiles drop into cards, Home Owner chosen, size settles on 3 Bedroom
        ['t0', 't1', 't2', 't3'].forEach((k, i) => { const p = E.out(seg(t, 28.3 + i * 0.15, 28.65 + i * 0.15)); const el = q('property', k); el.style.opacity = seg(t, 28.3 + i * 0.15, 28.4 + i * 0.15).toFixed(2); el.style.transform = `translateY(${((1 - p) * -260).toFixed(1)}px) rotate(${((1 - p) * (i % 2 ? 12 : -12)).toFixed(1)}deg)`; });
        q('property', 'home').classList.toggle('on', t >= 29.4);
        tapped = tapAt(t, 29.3, G.home) || tapped;
        const pi = t < 29.6 ? -1 : Math.min(2, Math.floor((t - 29.6) / 0.14));
        [...q('property', 'pills').children].forEach((p, i) => p.classList.toggle('on', i === pi));
        tapped = tapAt(t, 30.15, G.btn_property) || tapped;
        // #14 energy: the receipt flies in and folds into the fuel field
        const f = G.fuel, [fx, fy] = mapQuad(Q, SW, SH, f.x + f.w / 2, f.y + f.h / 2);
        const fly = E.inOut(seg(t, 30.6, 31.2)), fold = E.in(seg(t, 31.2, 31.55));
        receipt.style.left = (fx - 165) + 'px'; receipt.style.top = (fy - 200) + 'px';
        receipt.style.opacity = (seg(t, 30.6, 30.7) * (1 - seg(t, 31.45, 31.55))).toFixed(3);
        receipt.style.transform = `translate(${lerp(330, 0, fly).toFixed(1)}px, ${lerp(-560, 0, fly).toFixed(1)}px) rotate(${lerp(18, 0, fly).toFixed(2)}deg) scale(${lerp(1, 0.6, fly) * lerp(1, 0.9, fold)}, ${(lerp(1, 0.6, fly) * lerp(1, 0.05, fold)).toFixed(4)})`;
        q('energy', 'fuel').classList.toggle('hot', t >= 31.45);
        q('energy', 'fuelv').style.opacity = seg(t, 31.45, 31.6).toFixed(2);
        q('energy', 'fuelt').style.opacity = seg(t, 31.55, 31.7).toFixed(2);
        let k = 0; [...q('energy', 'loads').children].forEach(el => { if (el.dataset.on === '1') { el.classList.toggle('on', t >= 31.75 + k * 0.13); k++; } });
        tapped = tapAt(t, 32.7, G.btn_energy) || tapped;
        // #15 provider
        typeIn(q('provider', 'loc').firstChild, 'Lagos', t, 33.15, 33.45);
        [...q('provider', 'provs').children].forEach((p, i) => p.classList.toggle('on', i === 1 && t >= 33.95));
        tapped = tapAt(t, 33.85, G.provB) || tapped;
        tapped = tapAt(t, 34.3, G.btn_provider) || tapped;
        const toast = q('provider', 'toast'); const tp = E.back(seg(t, 34.55, 34.85));
        toast.style.opacity = seg(t, 34.55, 34.65).toFixed(2); toast.style.transform = `translateY(${((1 - tp) * 160).toFixed(1)}px)`;
        // #16 proposal rows materialise, monthly row pulses
        [...q('proposal', 'rows').children].forEach((r, i) => { const p = E.out(seg(t, 35.9 + i * 0.25, 36.2 + i * 0.25)); r.style.opacity = p.toFixed(2); r.style.transform = `translateX(${((1 - p) * 40).toFixed(1)}px)`; });
        const key = q('proposal', 'rows').lastChild; const pul = Math.sin(Math.PI * seg(t, 37.1, 37.6));
        key.style.boxShadow = `inset 0 0 0 ${(pul * 6).toFixed(1)}px #FF9733`;
        tapped = tapAt(t, 38.0, G.btn_proposal) || tapped;
        if (!tapped) tap.style.opacity = 0;
      }
    };
  }

  // #24 end card. The switch is the global actor.
  function buildEnd(s) {
    const layer = h('div', 'layer');
    layer.appendChild(h('div', 'endbg'));
    const end = h('div', 'end');
    const logo = h('div', '', LOGO('Logo placeholder · inverted SVG')); logo.firstChild.style.color = '#fff';
    const h3 = h('h3', '', 'Switch off the gen.<br><span class="grad-text">Switch on GroSolar.</span>');
    const sub = h('div', 'sub', 'No Large Upfront Costs.<br>Predictable Monthly Cost.');
    const conf = TL.whatsappConfirmed ? '' : ' <span style="font-size:22px;font-weight:700;letter-spacing:2px;background:#C8321E;color:#fff;padding:6px 10px;border-radius:8px;vertical-align:middle">TO CONFIRM</span>';
    const cta = h('div', 'cta', `<div class="btn">Get started at grosolar.co</div><small>WhatsApp ${TL.whatsapp}${conf}</small>`);
    end.append(logo, h3, sub, cta); layer.appendChild(end);
    const fine = h('div', 'fine', 'Dramatisation · AI-generated imagery'); layer.appendChild(fine);
    const vo = h('div', 'vo top', `<b>VO</b><span>${TL.endVo.text}</span>`); vo.style.opacity = 0; layer.appendChild(vo);
    return {
      s, el: layer, win: [s.t0 - 0.3, s.t1 + 1], fadeIn: 0.3,
      update(t) {
        const lt = t - s.t0, dur = s.t1 - s.t0;
        end.style.transform = `scale(${lerp(1, 1.03, seg(lt, 0, dur)).toFixed(4)})`;
        [[logo, 0.3], [h3, 0.5], [sub, 0.8], [cta, 1.0]].forEach(([el, at]) => showIn(el, lt, at, dur + 2, 40));
        fine.style.opacity = seg(lt, 1.2, 1.5).toFixed(3);
        showIn(vo, t - TL.endVo.at, 0, s.t1 - TL.endVo.at + 1, 20);
      }
    };
  }

  // ---------- global actors: the switch/sun and the dot of light ----------
  const actor = h('div', 'switch', POWER); actor.style.zIndex = 40; stage.appendChild(actor);
  const dot = h('div'); dot.style.cssText = 'position:absolute;left:540px;top:960px;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;background:radial-gradient(circle,#FFF4C8 0%,#FFB347 45%,rgba(255,151,51,0) 70%);z-index:41;opacity:0';
  stage.appendChild(dot);
  function updateActors(t) {
    // Dot of light: #2 -> #3
    const dIn = seg(t, 3.5, 3.8), dOut = seg(t, 4.0, 4.45);
    dot.style.opacity = (dIn * (1 - dOut)).toFixed(3);
    dot.style.transform = `scale(${lerp(1.6, 0.25, E.inOut(seg(t, 3.5, 4.0))).toFixed(3)})`;
    // Switch: offer (21.5-24.0) and sprout/end (54.2-60)
    let vis = 0, x = 540, y = 620, sc = 1, glyph = 1;
    if (t >= 21.5 && t < 24.0) {
      const B = window.__phoneBtn ? window.__phoneBtn() : { x: 540, y: 1380, h: 110 };
      const m = E.inOut(seg(t, 23.6, 24.0));
      vis = 1; sc = E.back(seg(t, 21.5, 22.0)) * lerp(1, B.h / 300, m) * (1 + 0.03 * Math.sin((t - 21.5) * 4) * (1 - m));
      x = lerp(540, B.x, m); y = lerp(620, B.y, m); glyph = 1 - m;
    } else if (t >= 54.2) {
      vis = 1; x = 540; y = 560; sc = E.back(seg(t, 54.2, 54.7));
      glyph = seg(t, 55.2, 55.6);
      if (t >= 55) { const p = lerp(1, 1.03, seg(t, 55, 60)); sc *= p; y = 768 + (560 - 768) * p; }
    }
    actor.style.opacity = vis;
    actor.style.left = x + 'px'; actor.style.top = y.toFixed(1) + 'px';
    actor.style.transform = `scale(${Math.max(0, sc).toFixed(4)})`;
    actor.firstChild.style.opacity = glyph.toFixed(3);
  }

  // ---------- build ----------
  function build() {
    const phoneShots = TL.shots.filter(s => s.kind === 'phone');
    let phoneBuilt = false;
    TL.shots.forEach(s => {
      let sc;
      if (s.kind === 'photo') sc = buildPhoto(s);
      else if (s.kind === 'grid') sc = buildGrid(s, 'grid');
      else if (s.kind === 'sprout') sc = buildGrid(s, 'sprout');
      else if (s.kind === 'tag') sc = buildTag(s);
      else if (s.kind === 'offer') sc = buildOffer(s);
      else if (s.kind === 'phone') { if (phoneBuilt) return; phoneBuilt = true; sc = buildPhone(phoneShots); }
      else if (s.kind === 'end') sc = buildEnd(s);
      sc.el.style.zIndex = 1 + scenes.length;
      stage.insertBefore(sc.el, slate);
      scenes.push(sc);
    });
  }

  function seek(t) {
    t = clamp(t, 0, TL.duration - 1e-6);
    for (const sc of scenes) {
      const on = t >= sc.win[0] && t < sc.win[1];
      sc.el.classList.toggle('on', on);
      if (!on) continue;
      sc.el.style.opacity = sc.fadeIn ? E.inOut(seg(t, sc.win[0], sc.win[0] + sc.fadeIn)).toFixed(3) : 1;
      sc.update(t);
    }
    updateActors(t);
    const cur = TL.shots.filter(s => t >= s.t0 && t < s.t1).pop() || TL.shots[TL.shots.length - 1];
    const miss = cur.id && !available.has(cur.id) ? ' · <span class="miss">placeholder</span>' : '';
    slate.innerHTML = `ANIMATIC · #${cur.n} ${cur.title} · ${fmt(t)}${miss}`;
    return cur;
  }

  // ---------- load ----------
  function loadFrames() {
    const ids = new Set();
    TL.shots.forEach(s => { if (s.id) ids.add(s.id); (s.tiles || []).forEach(x => ids.add(x)); });
    if (TL.phonePlate) ids.add(TL.phonePlate);
    if (TL.phoneShot) ids.add(TL.phoneShot);
    return Promise.all([...ids].map(id => new Promise(res => {
      const img = new Image();
      img.onload = () => { (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => { available.add(id); res(); }); };
      img.onerror = () => res();
      img.src = `frames/${id}.jpg`;
    })));
  }
  const fontsReady = () => Promise.all([400, 500, 600, 700, 800].map(w => document.fonts.load(`${w} 40px Outfit`))).then(() => document.fonts.ready);

  window.__ready = Promise.all([loadFrames(), fontsReady()]).then(() => {
    build();
    // Decode all <img> inside the stage before the first seek.
    return Promise.all([...stage.querySelectorAll('img')].map(i => (i.decode ? i.decode().catch(() => {}) : null)));
  }).then(() => { seek(0); return true; });
  window.__seek = t => { seek(t); return true; };
  window.__info = () => ({ duration: TL.duration, fps: TL.fps, missing: TL.shots.filter(s => s.id && !available.has(s.id)).map(s => s.n), present: [...available] });
  window.__captions = () => {
    const out = [];
    TL.shots.forEach(s => {
      if (s.cap) out.push({ start: s.t0 + (s.capAt ?? 0.25), end: s.t1, text: `${s.cap.who.toUpperCase()}: ${s.cap.line.replace(/"/g, '')}` });
      if (s.vo) out.push({ start: s.t0 + (s.voAt ?? 0.2), end: s.t1, text: `VO: ${s.vo}` });
    });
    out.push({ start: TL.endVo.at, end: TL.duration, text: `VO: ${TL.endVo.text}` });
    return out.sort((a, b) => a.start - b.start);
  };

  // ---------- preview player ----------
  if (!RENDER) {
    const vp = document.getElementById('viewport');
    const fit = () => { const k = Math.min(vp.clientWidth / 1080, vp.clientHeight / 1920); stage.style.transform = `scale(${k})`; stage.style.margin = `${(k - 1) * 960}px ${(k - 1) * 540}px`; };
    window.addEventListener('resize', fit); fit();
    const scrub = document.getElementById('scrub'), time = document.getElementById('time'), play = document.getElementById('play'), chips = document.getElementById('chips');
    let t = 0, playing = false, last = 0;
    const set = v => { t = clamp(v, 0, TL.duration); const cur = seek(t); scrub.value = t; time.textContent = fmt(t); [...chips.children].forEach(c => c.classList.toggle('cur', c.dataset.n === cur.n)); };
    window.__ready.then(() => {
      TL.shots.forEach(s => { const b = h('button', s.id && !available.has(s.id) ? 'miss' : '', '#' + s.n); b.type = 'button'; b.dataset.n = s.n; b.title = s.title; b.onclick = () => set(s.t0 + 0.01); chips.appendChild(b); });
      set(0);
    });
    scrub.oninput = () => set(+scrub.value);
    const loop = now => { if (!playing) return; const dt = (now - last) / 1000; last = now; set(t + dt); if (t >= TL.duration) playing = false, play.textContent = 'Play'; requestAnimationFrame(loop); };
    play.onclick = () => { playing = !playing; play.textContent = playing ? 'Pause' : 'Play'; if (playing) { if (t >= TL.duration - 0.05) set(0); last = performance.now(); requestAnimationFrame(loop); } };
    document.getElementById('safeT').onchange = e => document.body.classList.toggle('showsafe', e.target.checked);
    document.getElementById('slateT').onchange = e => document.body.classList.toggle('noslate', !e.target.checked);
    window.addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); play.click(); } if (e.code === 'ArrowRight') set(t + 1 / TL.fps); if (e.code === 'ArrowLeft') set(t - 1 / TL.fps); });
  }
})();
