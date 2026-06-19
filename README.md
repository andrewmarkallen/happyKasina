# Happy Kasina

A tiny browser-based kasina meditation timer.

The first screen is intentionally quiet: a stable kasina object on a dark field, with gentle gong and bell cues for timing practice. The app is a single static HTML file with no build step, package manager, or server requirement.

## Launch

Open `index.html` in a browser, or run:

```sh
./run.sh
```

Audio starts only after a user interaction, as required by browser audio policies.

## Controls

| Key | Action |
| --- | --- |
| `Space` | Start or cancel the timer |
| `f` | Open or close settings |
| `j`, `h`, or `?` | Open or close meditation instructions |
| `g` | Preview the current gong sound |
| `1` | Preview the bronze preset |
| `2` | Preview the bowl preset |
| `3` | Preview the gong preset |
| `Esc` | Close the open panel |

The on-screen controls mirror the main shortcuts: settings, instructions, lead-in, start/stop, and session duration.

## URL Settings

Settings are URL-addressable so a session can be shared as a permalink.

Common parameters:

| Parameter | Meaning | Example |
| --- | --- | --- |
| `preset` | Gong preset: `harder-bronze`, `temple-bowl`, or `wash` | `?preset=temple-bowl` |
| `t` | Main session duration | `?t=20m` |
| `lead` | Lead-in before the starting gong | `?lead=15` |
| `gap` | Delay before the reflection bell after the ending gong | `?gap=30` |
| `color` | Disk colour alias or hex value | `?color=red` |
| `kasina` | Visual object: `disk` or `candle` | `?kasina=candle` |
| `d` | Kasina diameter as pixels, CSS length, or viewport ratio | `?d=0.32` |

Additional parameters:

| Parameter | Meaning |
| --- | --- |
| `bg` | Background colour as a hex value |
| `renderer` | `auto`, `three`, or `css` |
| `flicker` | Set to `0` to disable candle flicker |
| `reverb` | Reverb size in milliseconds or duration syntax |
| `mix` | Reverb dry/wet mix from `0` to `1` |
| `chorus` | Force chorus off or on with `0` or `1` |
| `vol` | Overall sound volume from `0` to `1` |
| `bellPitch` | Reflection bell pitch in hertz |
| `bellMetal` | Reflection bell metallic quality from `0` to `1` |
| `bellHarmony` | Reflection bell harmonic blend from `0` to `1` |
| `reflection` | Set to `0` to disable the reflection bell |

Duration fields accept plain seconds (`90`), compact minute-second values (`130` for 1:30), or units such as `90s`, `1.5m`, and `20m`.

## Development

This project is deliberately small:

- `index.html` contains the app, visuals, timer, settings panel, and WebAudio synthesis.
- `run.sh` opens the app in Google Chrome.

Keep changes calm and practice-first. Avoid adding visual noise, gamification, or dependencies unless the app genuinely needs them.
