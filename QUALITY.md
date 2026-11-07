# Export verification

- Final image: 1080×1920, H.264 yuv420p, 1719 frames. Nominal 24 fps; last frame is shortened to meet the source audio duration exactly.
- Original narration: 1,718,917 samples at 24,000 Hz = 71.6215416667 seconds.
- Final video track: 1,718,917 ticks at 1/24,000 seconds.
- Final audio track: 3,437,834 ticks at 1/48,000 seconds.
- Final container duration: 71.621542 seconds as rounded by ffprobe.
- Voice alignment checked against decoded export at 1, 12, 27, 42, 57 and 67 seconds: zero-sample lag at every checked position. Correlation 0.9896–0.9984 after mastering and foley.
- Measured encoded audio: −14.44 LUFS integrated; −1.13 dBTP true peak. No music stem or music synthesis is present.
- Previous cut full-duration browser playback completed: 1719 frames, zero dropped frames, no browser errors.
- Complete export decoded successfully; no black-frame intervals reported by FFmpeg blackdetect.
- Browser render: no JavaScript errors. Thirteen contiguous shots, 30 non-overlapping bilingual subtitle cues, all within the recording duration.
- Subtitle fonts: Persian 34–44 px, English 31 px; both fitted within their safe caption overlay at y=1442–1622. Persian RTL shaping is rendered by Chromium using bundled Noto Sans Arabic.
- Revision visual inspection: full-bleed composition, new close-up/pullback hook, seasonal ink wipe, material insert and stable visitor-scale view. Bending continues away from the sun. All diagram labels are removed at the user’s explicit request; the diagrams remain qualitative and stylized.
- Timing basis: supplied script plus speech/silence boundaries in the recording. Offline Persian ASR was used as a phrase-location aid, but its transcription was inaccurate and was not substituted for the supplied script. Subtitle timings are phrase-level editorial alignment; word-level forced alignment has not been certified.

Re-run structural and caption checks with the preview server running: `node validate.mjs`. Logs from this production run are in the local ignored `out/` directory.

## Minimal revision checks

All 1719 animation frames are instrumented in Chromium to verify that every canvas text draw equals only the active Persian/English subtitle cue; silent gaps draw no text. No headings, counters, labels or footers are retained. Frame and audio-track duration checks remain required after the new export.

Current minimal export: all 1719 frames passed the subtitle-only draw check; complete new video decoded successfully with no black intervals. Exact video/audio duration and caption fitting passed again. The AAC audio packet SHA-256 is identical before and after the revision (b83dad26c56c4ca7ca68f4144d49f69053c1e9085668f81b9e1bf4270aa70c36), preserving the previously verified voice timing and loudness.
