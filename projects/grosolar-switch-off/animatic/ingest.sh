#!/usr/bin/env bash
# Drop Gemini frames into the animatic.
# Usage: ./ingest.sh [files...]        (default: everything in inbox/)
# The shot number is read from the start of each filename: "04.png", "#4 compound.webp", "11a-street.jpg", "4_dad.png".
# Each file is archived untouched in ../frames/gemini/original/, black bars are cropped, and the result is
# written to frames/<NN>.jpg, which the timeline picks up automatically.
set -euo pipefail
cd "$(dirname "$0")"
ARCHIVE=../frames/gemini/original
mkdir -p frames "$ARCHIVE"
shopt -s nullglob
files=("$@"); [ ${#files[@]} -eq 0 ] && files=(inbox/*)
[ ${#files[@]} -eq 0 ] && { echo "Nothing to ingest (inbox/ is empty)."; exit 0; }

for f in "${files[@]}"; do
  base=$(basename "$f")
  if [[ ! "$base" =~ ^#?0*([0-9]{1,2})([abAB]?) ]]; then echo "SKIP  $base (no shot number at the start of the name)"; continue; fi
  num=${BASH_REMATCH[1]}; suf=$(echo "${BASH_REMATCH[2]}" | tr 'AB' 'ab')
  id=$(printf "%02d%s" "$num" "$suf")
  IFS=x read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$f")
  # Rows whose mean luma is under 12 at the top/bottom edges are letterbox bars.
  read -r top bot < <(ffmpeg -v error -i "$f" -frames:v 1 -f rawvideo -pix_fmt gray - | python3 -c "
import sys
w,h=$w,$h; d=sys.stdin.buffer.read()
rows=[sum(d[y*w:(y+1)*w])/w for y in range(h)]
t=0
while t<h-1 and rows[t]<12: t+=1
b=h-1
while b>0 and rows[b]<12: b-=1
print(t+2 if t else 0, (h-1-b)+2 if b<h-1 else 0)")
  ch=$((h - top - bot))
  cp "$f" "$ARCHIVE/gemini-$id-${base#*[-_ ]}" 2>/dev/null || cp "$f" "$ARCHIVE/gemini-$id-$base"
  ffmpeg -v error -y -i "$f" -vf "crop=$w:$ch:0:$top" -q:v 2 "frames/$id.jpg"
  note=""; [ "$top" -gt 0 ] || [ "$bot" -gt 0 ] && note=" · cropped bars ${top}px top, ${bot}px bottom → ${w}x${ch}"
  echo "OK    #$id  ← $base (${w}x${h})$note"
  [[ "$f" == inbox/* ]] && rm -f "$f"
done
