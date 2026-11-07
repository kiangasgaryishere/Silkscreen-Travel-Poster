# Current export verification — camera edit

- Final image: 1080×1920, H.264 yuv420p, 1719 frames. Nominal 24 fps; the last frame is shortened to match the original audio exactly.
- Original narration: 1,718,917 samples at 24,000 Hz = 71.6215416667 seconds. No time stretching, speech edits or musical layer.
- Final video: 1,718,917 ticks at 1/24,000 seconds. Final audio: 3,437,834 ticks at 1/48,000 seconds. Container duration: 71.621542 seconds as rounded by ffprobe.
- Encoded audio measured −14.44 LUFS integrated and −1.23 dBTP true peak. Repeated blade scrapes were replaced by four quiet air cues and sparse material ticks; narration remains dominant.
- Complete current export decoded successfully with FFmpeg. No black intervals were reported by blackdetect.
- All 1719 camera positions were checked analytically against the full art bounds, including the restrained lattice roll: zero uncovered frames.
- Twelve editorial connections were inspected in before/after frame strips. The film contains no slide compositing, squeegee transition or spatial wipe. Related shots share continuous camera tracks; other edits use motivated camera cuts.
- All 1719 animation frames were instrumented in Chromium: every text draw exactly matched the active Persian/English subtitle cue. Zero extra text frames and zero JavaScript errors. Silent gaps draw no text.
- Thirteen contiguous narrative sections and 30 non-overlapping bilingual cues remain within the original duration. Captions stay screen-locked after the camera transform, at y=1442–1622. Persian minimum font 34 px; English 31 px. Persian RTL shaping uses bundled Noto Sans Arabic.
- Current visual inspection: contact sheet, camera-cut strips, opening pullback, seasonal palette change, material insert, bending away from the sun and stable visitor-scale tower. All non-subtitle labels remain removed as requested. Schematics are qualitative and exaggerated, with no numerical scale.
- Subtitle timing uses the supplied script and recording's phrase/silence boundaries. Earlier offline Persian ASR was inaccurate and was not substituted for the script. Word-level forced alignment has not been certified.

Re-run checks with the preview server running: `node validate.mjs`, `node check-camera.mjs`, `node check-minimal.mjs`. Current run reports are in local ignored `out/`. The current export was decoded in full; a new full-speed browser playback/audition was not performed for this revision.
