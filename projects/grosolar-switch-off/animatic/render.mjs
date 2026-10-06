// Render the animatic to MP4 by seeking the page frame by frame in headless Chromium (no npm deps; Node 22+).
// Usage: node render.mjs [--fps 24] [--from 0] [--to 60] [--out out/animatic.mp4] [--slate 1] [--scale 1]
//   --scale 0.5 renders 540x960 for quick checks.
//   --stills 1,3.6,25 writes JPEG stills at those times to out/stills/ instead of a video.
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const fps = +arg('fps', 24), from = +arg('from', 0), to = +arg('to', 60), scale = +arg('scale', 1);
const out = resolve(here, arg('out', 'out/animatic.mp4'));
const slate = arg('slate', '1') !== '0';
const chrome = process.env.CHROME || ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/usr/bin/chromium', '/usr/bin/google-chrome'].find(existsSync);
if (!chrome) throw new Error('Chromium not found; set CHROME=/path/to/chrome');

const W = Math.round(1080 * scale), H = Math.round(1920 * scale), port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), 'gs-chrome-'));
const proc = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--mute-audio', `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, '--allow-file-access-from-files', `--window-size=1080,1920`, 'about:blank'], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const cleanup = async () => { try { ws.close(); } catch {} proc.kill(); await new Promise(r => { proc.once('exit', r); setTimeout(r, 3000); }); try { rmSync(profile, { recursive: true, force: true }); } catch {} };
let target;
for (let i = 0; i < 60 && !target; i++) {
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); } catch { await sleep(250); }
}
if (!target) throw new Error('Could not connect to Chromium');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0; const pending = new Map();
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description || '')); return r.result.value; };

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1080, height: 1920, deviceScaleFactor: scale, mobile: false });
const url = pathToFileURL(join(here, 'index.html')).href + `?render=1${slate ? '' : '&slate=0'}`;
await send('Page.navigate', { url });
for (let i = 0; i < 80; i++) { await sleep(150); try { if (await evaluate('!!window.__ready')) break; } catch {} }
await evaluate('window.__ready');
const info = await evaluate('window.__info()');
console.log(`Rendering ${from}-${to}s at ${fps} fps, ${W}x${H}. Placeholders for shots: ${info.missing.join(', ') || 'none'}`);

const stills = arg('stills', '');
if (stills) {
  const dir = join(here, 'out', 'stills'); mkdirSync(dir, { recursive: true });
  for (const t of stills.split(',').map(Number)) {
    await evaluate(`window.__seek(${t})`);
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1080, height: 1920, scale: 1 } });
    const f = join(dir, `t${t.toFixed(2).padStart(5, '0')}.jpg`); writeFileSync(f, Buffer.from(shot.data, 'base64')); console.log(f);
  }
  await cleanup(); process.exit(0);
}

mkdirSync(dirname(out), { recursive: true });
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

const n = Math.round((to - from) * fps);
const t0 = Date.now();
for (let f = 0; f < n; f++) {
  const t = from + f / fps;
  await evaluate(`window.__seek(${t.toFixed(5)})`);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1920, scale: 1 } });
  if (!ff.stdin.write(Buffer.from(shot.data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  if (f % (fps * 5) === 0) process.stdout.write(`  ${t.toFixed(1)}s (${Math.round((Date.now() - t0) / 1000)}s elapsed)\n`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));

// Captions for VO recording and burned-in review.
const caps = await evaluate('window.__captions()');
const ts = s => { const ms = Math.round(s * 1000); const hh = String(Math.floor(ms / 3600000)).padStart(2, '0'), mm = String(Math.floor(ms / 60000) % 60).padStart(2, '0'), ss = String(Math.floor(ms / 1000) % 60).padStart(2, '0'), mmm = String(ms % 1000).padStart(3, '0'); return `${hh}:${mm}:${ss},${mmm}`; };
writeFileSync(out.replace(/\.mp4$/, '.srt'), caps.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join('\n'));

await cleanup();
console.log(`Done: ${out} (${Math.round((Date.now() - t0) / 1000)}s)`);
try { console.log(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=width,height,r_frame_rate', '-of', 'compact', out]).toString().trim()); } catch {}
