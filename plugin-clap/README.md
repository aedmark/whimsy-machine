# The Whimsy Machine CLAP Instrument Plugin

**Roadmap Item:** P8-13 (Phase 8: Extensibility & DAW Integration)  
**Governing Decision:** [D-080](file:///home/gordonk/PycharmProjects/whimsy-machine/docs/DECISIONS.md#L1660-L1667)  
**Plugin Identifier:** `org.whimsymachine.omen-synth`  
**Standard:** CLAP (CLever Audio Plugin) 1.2+  
**Architecture:** Pure C ABI (C11), zero external runtime dependencies

---

## Overview

The Whimsy Machine CLAP plugin brings the deterministic esoteric synthesizer and auto-chord organ into modern Digital Audio Workstations (DAWs) including Bitwig Studio, Cockos REAPER, FL Studio, and Renoise.

### Features
- **Sample-Accurate DAW Beat Synchronization:** Automatically locks 12-step triplet shuffle and 16-step straight grid metres to DAW project tempo and song beat position without jitter.
- **DAW MIDI & Keyboard Routing:**
  - Channel 1: Split-manual playing (left-hand organ chords + right-hand LOLCODE lead synth)
  - Channel 2: Dedicated LOLCODE lead soloing across full keyboard
  - Channel 3: Dedicated Fun Machine manual pad
  - Channel 4: Dedicated Brainfuck walking bassline
- **23 Automatable DAW Parameters:** Master volume, SVF filter cutoff, filter resonance, Euler Gradus Suavitatis strictness, step metre, creature seed phrase, 8 track faders, 8 track mutes, and host tempo sync lock.
- **Stereo Master Mix & 64-bit Audio:** Clean stereo instrument output supporting both 32-bit and 64-bit float DAW audio engines.
- **Session v9 Project Recall:** DAW project files save and restore the exact apparatus state, including phrase seeds and mixer taps.
- **Strict Isolation ([D-080](file:///home/gordonk/PycharmProjects/whimsy-machine/docs/DECISIONS.md#L1660-L1667)):** Lives purely in `plugin-clap/`, reusing the reference C core in `firmware-c/`. The browser web application remains 100% dependency-free.

---

## Building

Requires a standard C compiler (`gcc` or `clang`) and `make`:

```bash
cd plugin-clap
make
```

To run the headless verification test suite:

```bash
make test
```

Binary output: `build/whimsy-machine.clap`.

---

## Installation

Copy `build/whimsy-machine.clap` to your system's CLAP plugin directory:

- **Linux:** `~/.clap/` or `/usr/lib/clap/`
- **macOS:** `~/Library/Audio/Plug-Ins/CLAP/` or `/Library/Audio/Plug-Ins/CLAP/`
- **Windows:** `%COMMONPROGRAMFILES%\CLAP\`
