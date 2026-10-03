#!/usr/bin/env python3
"""Download real source material for the Six Phases of Creation film.

  nasa        search the NASA Image and Video Library per phase, download the
              original-resolution files and write credits.csv
  coastlines  fetch reconstructed coastlines (GeoJSON) for past ages from the
              GPlates Web Service, e.g. the 1.8-billion-year CAO2024 model

Standard library only. Files land in ./assets (git-ignored).

  python3 fetch_assets.py nasa --phase 2 --per-query 3
  python3 fetch_assets.py nasa --dry-run
  python3 fetch_assets.py coastlines --from 1000 --to 0 --step 50

Everything downloaded still needs a human look: the NASA library mixes real
photos with illustrations, and its credits name partner agencies to keep.
"""

import argparse
import csv
import json
import os
import sys
import urllib.parse
import urllib.request

NASA_API = os.environ.get("NASA_IMAGES_API", "https://images-api.nasa.gov")
GPLATES_API = os.environ.get("GPLATES_API", "https://gws.gplates.org")
HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")

PHASE_QUERIES = {
    1: ["cosmic microwave background", "WMAP", "Planck microwave sky", "timeline of the universe"],
    2: ["first stars", "Webb deep field", "Hubble Ultra Deep Field", "Cassiopeia A", "Crab Nebula"],
    3: ["Milky Way", "spiral galaxy Webb", "Phantom Galaxy", "galaxy formation"],
    4: ["protoplanetary disk", "planet formation", "Moon formation impact", "early solar system"],
    5: ["Earth atmosphere limb", "airglow", "early Earth", "stromatolites"],
    6: ["plate tectonics", "Chicxulub", "Snowball Earth", "Earth from space"],
}
# Rendition suffixes in NASA asset manifests, most preferred first.
RENDITIONS = ["~orig", "~large", "~medium"]


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "six-phases-research/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "six-phases-research/1.0"})
    with urllib.request.urlopen(req, timeout=300) as r, open(path, "wb") as f:
        while chunk := r.read(1 << 16):
            f.write(chunk)


def quote_url(url):
    # Asset hrefs can contain spaces; keep the scheme and path separators.
    return urllib.parse.quote(url, safe=":/~?&=%")


def best_rendition(nasa_id):
    hrefs = [i["href"] for i in get_json(f"{NASA_API}/asset/{urllib.parse.quote(nasa_id)}")["collection"]["items"]]
    images = [h for h in hrefs if h.lower().endswith((".jpg", ".jpeg", ".png", ".tif", ".tiff"))]
    for suffix in RENDITIONS:
        for h in images:
            if suffix in h:
                return h
    return images[0] if images else None


def cmd_nasa(args):
    phases = [args.phase] if args.phase else sorted(PHASE_QUERIES)
    rows, seen = [], set()
    for phase in phases:
        out_dir = os.path.join(ASSETS, "nasa", f"phase-{phase}")
        os.makedirs(out_dir, exist_ok=True)
        for q in PHASE_QUERIES[phase]:
            params = urllib.parse.urlencode({"q": q, "media_type": "image", "page_size": args.per_query})
            items = get_json(f"{NASA_API}/search?{params}")["collection"]["items"][: args.per_query]
            print(f"phase {phase} · {q!r}: {len(items)} result(s)")
            for item in items:
                meta = item["data"][0]
                nasa_id = meta["nasa_id"]
                if nasa_id in seen:
                    continue
                seen.add(nasa_id)
                row = {
                    "phase": phase,
                    "query": q,
                    "nasa_id": nasa_id,
                    "title": meta.get("title", ""),
                    "center": meta.get("center", ""),
                    "date_created": meta.get("date_created", "")[:10],
                    "credit": meta.get("secondary_creator") or meta.get("photographer") or "NASA",
                    "source_page": f"https://images.nasa.gov/details/{urllib.parse.quote(nasa_id)}",
                    "file": "",
                    "type": "",  # fill in by eye: OBS / DATA / SIM / ILL
                    "description": " ".join(meta.get("description", "").split())[:400],
                }
                if not args.dry_run:
                    href = best_rendition(nasa_id)
                    if href:
                        ext = os.path.splitext(urllib.parse.urlparse(href).path)[1].lower() or ".jpg"
                        path = os.path.join(out_dir, f"{nasa_id}{ext}")
                        if not os.path.exists(path):
                            download(quote_url(href), path)
                        row["file"] = os.path.relpath(path, HERE)
                print(f"  {nasa_id}  {row['title'][:70]}")
                rows.append(row)
    if args.dry_run or not rows:
        print(f"\n{len(rows)} item(s); nothing written")
        return
    # Merge into credits from earlier runs so per-phase runs don't erase each
    # other, and keep any "type" already filled in by hand.
    credits = os.path.join(ASSETS, "nasa", "credits.csv")
    merged = {}
    if os.path.exists(credits):
        with open(credits, newline="") as f:
            merged = {r["nasa_id"]: r for r in csv.DictReader(f)}
    for row in rows:
        row["type"] = merged.get(row["nasa_id"], {}).get("type", "")
        merged[row["nasa_id"]] = row
    with open(credits, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(merged.values())
    print(f"\n{len(rows)} item(s) this run, {len(merged)} in {os.path.relpath(credits, HERE)}")


def cmd_coastlines(args):
    out_dir = os.path.join(ASSETS, "coastlines", args.model)
    os.makedirs(out_dir, exist_ok=True)
    step = -abs(args.step) if args.start > args.end else abs(args.step)
    for ma in range(args.start, args.end + (1 if step > 0 else -1), step):
        params = urllib.parse.urlencode({"time": ma, "model": args.model})
        path = os.path.join(out_dir, f"{ma:04d}Ma.geojson")
        if not args.dry_run:
            data = get_json(f"{GPLATES_API}/reconstruct/coastlines/?{params}")
            with open(path, "w") as f:
                json.dump(data, f)
        print(f"{ma:>5} Ma -> {os.path.relpath(path, HERE)}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("nasa", help="search and download NASA Image Library files")
    n.add_argument("--phase", type=int, choices=sorted(PHASE_QUERIES))
    n.add_argument("--per-query", type=int, default=3)
    n.add_argument("--dry-run", action="store_true", help="search and list only, no downloads")
    n.set_defaults(func=cmd_nasa)
    c = sub.add_parser("coastlines", help="fetch past coastlines from the GPlates Web Service")
    c.add_argument("--model", default="CAO2024", help="CAO2024 spans 0-1800 Ma")
    c.add_argument("--from", dest="start", type=int, default=1800, help="age in millions of years")
    c.add_argument("--to", dest="end", type=int, default=0)
    c.add_argument("--step", type=int, default=50)
    c.add_argument("--dry-run", action="store_true")
    c.set_defaults(func=cmd_coastlines)
    args = p.parse_args()
    try:
        args.func(args)
    except OSError as e:
        sys.exit(f"network error: {e}. If you're in a sandbox, allow images-api.nasa.gov, "
                 "images-assets.nasa.gov and gws.gplates.org.")


if __name__ == "__main__":
    main()
