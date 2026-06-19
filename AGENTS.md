# AGENTS.md

## Repository Purpose

Happy Kasina is a tiny browser-based meditation timer for kasina practice with coloured disks and a candle option. The app shows a clean kasina object on a dark field and uses gentle synthesized gong and bell sounds to mark transitions in a sit. It is intentionally simple: the visual object should remain stable, uncluttered, and suitable for sustained attention.

In coloured-disk kasina practice, the practitioner usually rests attention on a simple visual object such as a blue, red, yellow, or white disk. A typical session is:

1. Sit comfortably with the disk in view.
2. Gaze at the centre or whole disk with relaxed, steady attention.
3. Let the disk become the primary object of concentration.
4. When appropriate, close the eyes and attend to the retained mental image or retinal afterimage.
5. Return to the physical disk if the image fades, attention scatters, or strain appears.

The product should support that loop without becoming the practice. Avoid adding visual noise, gamification, excessive text, animations, or interaction patterns that pull attention away from the kasina.

## Current Shape

- `index.html` contains the full app: visual disk/candle rendering, URL parameter parsing, WebAudio gong and bell synthesis, keyboard shortcuts, practice HUD, meditation instructions, and the settings panel.
- `run.sh` opens `index.html` in Google Chrome.
- `README.md` documents launch, controls, and URL-addressable settings.

This is currently a static app with no package manager, build step, framework, test runner, or server.

## Product Principles

- Preserve the first-screen experience as a meditation object, not a dashboard.
- Keep the kasina disk visually stable unless a requested feature explicitly changes it.
- Prefer calm, minimal, accessible controls that stay hidden during practice.
- Treat audio cues as timing support; they should not dominate the sit.
- Keep configuration URL-addressable where practical so sessions can be shared as permalinks.
- Do not make claims about health, therapy, enlightenment, or guaranteed meditation outcomes.
- Be careful with eye comfort: avoid flicker, harsh brightness changes, or instructions to stare forcefully.

## Implementation Principles

- Prefer complete, maintainable changes over quick patches.
- Keep business rules separate from presentation where the static-file architecture permits it.
- Use small, named functions for parsing, timing, audio graph construction, and UI behaviour.
- Preserve type-like clarity through names and data shapes even in plain JavaScript.
- Avoid unnecessary defensive checks for states already controlled by local invariants.
- Do not introduce dependencies, bundlers, frameworks, or generated files without a clear reason.
- Keep comments sparse and focused on non-obvious constraints or intent.
- Use ASCII unless the surrounding file already requires otherwise.

## FM Synthesis Approach

The audio should remain a synthesized instrument, not a pile of samples. Use the WebAudio graph as the source of truth and keep it parameterized enough that presets describe musical choices rather than duplicating audio construction.

- Keep timer state, URL parsing, preset selection, and audio graph construction as separate concerns.
- Treat each gong preset as data: base frequency, envelope, modulation ratios, modulation indexes, shimmer, bloom, reverb, and chorus choices belong in preset objects.
- Keep `playFMGong` as the general gong voice. Prefer extending its typed data shape over adding one-off preset branches.
- Model the gong as a carrier plus FM modulators with explicit amplitude and modulation-index envelopes. Changes should be audible as coherent instrument design, not arbitrary oscillator stacking.
- Keep the low bronze bloom subtle: filtered noise can support body and room feel, but it should not become a constant hiss bed.
- Keep reverb, chorus, dry/wet routing, volume, and safety compression in shared graph helpers so previews and timer cues behave consistently.
- Preserve browser audio policy compatibility: create or resume audio only after user interaction.
- Reflection bells should remain lightweight FM voices with explicit pitch, metal, and harmony controls. They mark the reflection period; they should not compete with the main gong.
- When adding audio options, expose stable URL parameters only for settings that are meaningful to share in a practice permalink.

## 3D Modelling Approach

The 3D layer is progressive enhancement over the CSS fallback. It should deepen the physical presence of the kasina object without turning the page into a scene viewer.

- Keep the kasina object centred, still, and readable as the primary practice object.
- Keep the CSS disk/candle fallback complete. WebGL failure, unsupported devices, `renderer=css`, or reduced capability should still leave a usable meditation object.
- Use small, composable Three.js constructors that return `THREE.Group` objects, such as disk, candle body, candle top, flame, room, haze, and lights.
- Prefer procedural geometry and textures over external model files. The disk should remain a simple physical disk with subtle paper grain; the candle should remain a simple candle with a calm flame.
- Keep animation low-amplitude and optional. Candle flicker and haze may breathe gently, but avoid camera motion, spinning objects, pulsing disks, flicker-heavy effects, or anything that strains the eyes.
- Respect `prefers-reduced-motion` and the `flicker=0` URL parameter.
- Keep the visual model responsive through explicit diameter and viewport calculations. Do not let labels, HUD controls, or renderer internals resize the kasina unexpectedly.
- Dispose geometries, materials, textures, animation loops, and WebGL contexts when replacing or disabling a scene.
- Keep renderer selection URL-addressable with `renderer=auto`, `renderer=three`, and `renderer=css`.
- Use lighting, shadows, shaders, and material detail only in service of a calm, inspectable object. Avoid decorative particles, dramatic staging, cinematic camera language, or visual noise.

## UX Constraints

- The default page should remain black background plus a coloured disk.
- Settings and instructions should not appear by default.
- Keyboard controls should remain simple:
  - `Space`: start or stop the timer sequence.
  - `f`: show or hide settings.
  - `j`, `h`, or `?`: show or hide the central meditation instructions panel.
  - `g`: play the current gong preset.
  - `1`, `2`, `3`: audition the existing gong presets.
  - `Esc`: close settings/help.
- URL parameters are part of the app surface. Preserve existing parameters unless intentionally migrating them:
  - `preset`
  - `lead`
  - `t`
  - `gap`
  - `reverb`
  - `mix`
  - `chorus`
  - `color`
  - `kasina`
  - `bg`
  - `d`
  - `renderer`
  - `flicker`
  - `vol`
  - `bellPitch`
  - `bellMetal`
  - `bellHarmony`
  - `reflection`

## Development Workflow

- Prefer `rg` and `fd` for repository inspection.
- For this static app, direct browser testing is usually enough after changes.
- If adding non-trivial parsing, timing, or audio logic, factor it into pure functions first so it can be tested later without a browser.
- If adding a build system or test runner, document why the static-file approach is no longer sufficient.
- Do not commit unrelated formatting churn.

## Manual Verification

After changing the app, verify the relevant path manually:

1. Open `index.html` directly or run `./run.sh`.
2. Confirm the disk renders at the expected size and colour.
3. Press `j` and confirm the meditation instructions open and close.
4. Press `f` and confirm settings open and close.
5. Press `Space` and confirm the timer sequence starts and can be cancelled.
6. Press `g` and confirm audio starts only after user interaction.
7. Check any changed URL parameters by reloading with explicit query strings.

Keep the app quiet, legible, and practice-first.
