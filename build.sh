#!/bin/sh
set -eu
cd "$(dirname "$0")"
# Prerequisites: Node >=20, Python >=3.11, ffmpeg and Chromium.
# Install JS packages with npm ci. Set MEDIA_PYTHON to a Python with numpy,
# scipy and soundfile, or make a local venv and pip install -r requirements.txt.
PY=${MEDIA_PYTHON:-python3}
python3 make_timeline.py
"$PY" mix.py
node render.mjs
ffmpeg -y -v error -f concat -safe 0 -i out/parts.txt -i out/mix.wav \
 -map 0:v -map 1:a -c:v copy \
 -bsf:v 'setts=pts=N*1000:dts=N*1000:duration=if(eq(N\,1718)\,917\,1000):time_base=1/24000' \
 -af 'loudnorm=I=-14:TP=-1.5:LRA=9' -ar 48000 -c:a aac -b:a 192k \
 -t 71.621541667 -video_track_timescale 24000 -movie_timescale 24000 \
 -movflags +faststart eiffel-reel.mp4
ffmpeg -y -v error -ss 2 -i eiffel-reel.mp4 -frames:v 1 -update 1 poster.jpg
