#!/usr/bin/env bash
# Drop Gemini frames into the animatic.
# Usage: ./ingest.sh [files...]        (default: everything in inbox/)
# The shot number is read from the start of each filename: "04.png", "#4 compound.webp", "11a-street.jpg", "4_dad.png".
# Each file is archived untouched in ../frames/gemini/ under its own name, black bars are cropped, and the result is
# written to frames/<NN>.jpg, which the timeline picks up automatically.
set -euo pipefail
cd "$(dirname "$0")"
ARCHIVE=../frames/gemini
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
  # Letterbox bars are flat black: edge rows with mean luma under 12 AND max under 10. (Dark scenes still have texture.)
  read -r top bot < <(ffmpeg -v error -i "$f" -frames:v 1 -f rawvideo -pix_fmt gray - | python3 -c "
import sys
w,h=$w,$h; d=sys.stdin.buffer.read()
bar=lambda y: (sum(d[y*w:(y+1)*w])/w < 12) and (max(d[y*w:(y+1)*w]) < 10)
t=0
while t<h-1 and bar(t): t+=1
b=h-1
while b>0 and bar(b): b-=1
print(t+2 if t else 0, (h-1-b)+2 if b<h-1 else 0)")
  ch=$((h - top - bot))
  [ -e "$ARCHIVE/$base" ] || cp "$f" "$ARCHIVE/$base"
  ffmpeg -v error -y -i "$f" -vf "crop=$w:$ch:0:$top" -q:v 2 "frames/$id.jpg"
  note=""; if [ "$top" -gt 0 ] || [ "$bot" -gt 0 ]; then note=" · cropped bars ${top}px top, ${bot}px bottom → ${w}x${ch}"; fi
  echo "OK    #$id  ← $base (${w}x${h})$note"
  if [[ "$f" == inbox/* ]]; then rm -f "$f"; fi
done
