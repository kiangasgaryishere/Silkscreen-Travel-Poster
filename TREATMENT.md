# The tower that responds / برجی که واکنش نشان می‌دهد

## Current cut: cinematic camera edit, minimal and full bleed
The user's revision removes every heading, number, corner label, diagram label and footer. Only Persian/English narration subtitles remain. The artwork fills all 1080×1920 pixels; there is no cream page border or editorial header/footer. Paper grain survives as a subtle ink material, not a blank background.

## Opening hook (0–5.65 seconds)
0–0.42: close view of the tower’s structure; no blade or overlay.
0–1.15: a fast, smooth pullback from the iron lattice reveals one large Eiffel Tower, with a warm sun and terracotta ink.
2.12–2.65: the whole scene cools in colour as the voice reaches winter; no spatial wipe.
3.45–4.10: the palette settles; hold the tower through the question, then push into a structural brace before the next shot.
No seasonal words, title, added facts or exaggerated height claim appear in this hook.

## Brief and precedence
Original supplied narration, at original speed. Exact duration 1,718,917 / 24,000 = 71.621541667 seconds. No music. No logos, stock footage or external images. English subtitles translate the supplied Persian script. The user's latest request supersedes the attached direction's separate on-screen text and schematic labels, as well as the original poster-like layout. The direction's music and approximate 85-second schedule also yield to the explicit request.

## Story and structure
Seasonal visual question → structural iron → bar expansion → tower height → cold contraction → second reveal → asymmetric heating → bending away from sunlight → human scale → return to the opening image with new understanding.

Alternatives considered: a day-long sun journey would put the second reveal ahead of the recorded narration; a laboratory-only film would lose the landmark anchor. The chosen causal progression follows the recording and varies framing between full tower, structural close-up and isolated mechanism diagrams.

## Look and camera
Full-bleed opaque flat inks, hard edges, stepped skies, subtle registration and paper texture. Cream as an occasional material knockout, not a frame. Camera attention is carried by the large silhouette, ink changes and diagram motion. No decorative text. No numerical diagram scales. Qualitative diagram deformation is stylized and exaggerated; landmark/visitor views remain stable. Lighting direction and bending away from the sun remain consistent.

## Subtitles
Persian above English, one line each, in a restrained dark overlay at y=1442–1622. Persian 34–44 px with correct RTL shaping; English 31 px. Original phrase timings retained. During silent gaps, there is no text. No added emphasis words or labels.

## Sound
Original voice remains dominant, with quiet non-musical print scrapes, paper ticks, muted clamps and environmental air. Repeating blade scrapes are removed. Sparse soft air cues anticipate four selected camera cuts, while quiet material ticks support the explanation. No voice timing changes. The final video track is trimmed at source-sample precision to end with the unchanged recording.

## Source of timing and direction
`timeline.json` and `SHOTLIST.md` specify scene and subtitle timing. `film.js` owns the actual graphic actions and full-bleed camera. The first cut remains available in Git history; local render intermediates are ignored.

## Camera editing revision

Every sliding panel, squeegee transition and subtitle wipe is removed. Tower-to-structure uses a lattice match cut during a camera push. Structure-to-bar uses a material match cut. The bar comparison holds continuously. Height-to-cold uses the same framing with an evolving whole-scene palette. The second reveal uses a push toward the sun and a sun match cut to asymmetrically heated material. Bending-to-moving-sun stays in one continuous camera. Visitor scale uses a restrained pullback; the closing two sections share one unbroken camera track. Captions are drawn after the camera transform and remain screen-locked.

`camera.js` defines bounded semantic focus tracks, scale and a restrained roll only during the lattice shots. The camera remains inside the artwork, avoiding blank edges. `camera-edits.json` documents every connection. There are no transition compositing layers.
