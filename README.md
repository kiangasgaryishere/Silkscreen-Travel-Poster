# The tower that responds

Minimal full-bleed vertical silkscreen educational Reel, Persian narration with Persian/English captions. No background music. The supplied audio determines the exact 71.621541667-second timeline.

The current revision removes all headings, labels, counters, corner text and footers. Only the bilingual narration captions are drawn. The new opening reveals a large tower from a lattice close-up and prints a warm/cold seasonal change across it.

## Files

- `eiffel-reel.mp4`: final 1080×1920 video (when built).
- `eiffel.fa.srt`, `eiffel.en.srt`, `eiffel.bilingual.srt`: timed subtitle files.
- `timeline.json`: shot and caption timeline.
- `TREATMENT.md`, `SHOTLIST.md`: editorial treatment and precise shot direction.
- `CREDITS`, `engine/LICENSE`, `assets/licenses/`: asset sources and licences.
- `film.js`, `engine/silk.js`: deterministic Canvas illustration/animation.
- `assets/narration.wav`: original supplied recording.

## Preview

`npm ci && npm run preview`, then open port 3000. Click Play for synchronized narration and picture; drag the seek bar to inspect individual moments. This editable preview plays the original narration; added foley and final mastering are in the exported MP4.

## Rebuild

Node >=20, Chromium and FFmpeg must be installed. Run `npm ci`. Create a Python venv and `pip install -r requirements.txt`, then `MEDIA_PYTHON=/path/to/venv/bin/python sh build.sh`. Set `PLAYWRIGHT_CHROME` if Chromium is not at `/usr/bin/chromium`.

`make_timeline.py` owns the subtitle text, translations, cues and shot direction. Edit it and rebuild to change those. `mix.py` makes quiet non-musical foley/air around the unchanged narration. `render.mjs` renders 1719 frames with three browser workers. The final frame is shortened to 917 audio-source ticks (at 24 kHz) so the video track ends exactly with the recording instead of padding to the next 24-fps boundary.

The source script supplies the educational claims. Qualitative diagrams magnify expansion and bending and contain no numerical scales. All non-subtitle writing is removed in the minimal revision. Stable landmark views do not stretch or bend. Uploaded direction's music suggestions and approximate 85-second timings are superseded by the user's no-music and original-audio-duration requirements.
