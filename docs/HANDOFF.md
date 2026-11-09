# Session Handoff

Read this first when resuming work. Protocol: [AGENTS.md](../AGENTS.md). Plan: [ROADMAP.md](../ROADMAP.md). Architecture: [ARCHITECTURE.md](ARCHITECTURE.md). Decisions: [DECISIONS.md](DECISIONS.md). Tests: [TESTING.md](TESTING.md).

## Current state

_Last updated: 2026-11-08, session 110, on `main`._

**Session owner:** none; session 110 (Claude Code) closed after adopting the expanded Manifold base scheme (D-108).

- Phases 1–11 Complete: Esoteric engines (Plates I–VI), 22 Inform 7 rulebooks, FM-1 hardware, studio exports, autopoietic dynamics (D-001–D-088), 25-Key Manual (P11-01, D-098), Live Stream Audio & MIDI Recording (P11-02, D-099), and Preset Memory Schema v9 (P11-03, D-101).
- Phase 8 Extensibility: Native CLAP Instrument Plugin (`P8-13`, `D-080`) complete: pure C ABI (C11) in isolated `plugin-clap/`, 23 automatable parameters, sample-accurate DAW beat/tempo synchronization, Session v9 project state recall, 9-bus stereo multi-out audio routing, and test suite verified via `test_clap.c` and `tests/clap.test.mjs`.
- Phase 10: BoneAmanita Resonances (P10-01–P10-04, D-089–D-095) complete: Aetheric Bone Theremin, Bone Forge, Spore Harp, and PlantWave Muscaria Transducer.
- QA Performance Audit, Firefox Gecko/SWGL Stabilization, and QoL Polish (D-096, D-097, D-100): Canvas 2D rasterization guardrails, Web Audio node pruning, scale snapping, and modal consonance.
- Phase 12 Production & Live Performance (P12-01–P12-06, D-102–D-107) complete: P12-01 part locks/chimeras, P12-04 Parlor Salon console, P12-02 Web MIDI Learn with bidirectional CC feedback, P12-03 Global Action History stack, P12-05 Creature Temperaments with multi-archetype vitrine tap dynamics, and P12-06 Opus Melodic Variations, Calling Slip Note Tweaker & Flavor Pinning.

**Where things stand:** P1–P7, P8-01 through P8-05, P8-13, P8-15 through P8-18, Phase 9, Polish Pass (D-088), Phase 10 (P10-01 through P10-04), Musicological Alignment, Firefox Stabilization (D-096), Spore Harp Calibration (D-097), 25-Key Manual Expansion (P11-01, D-098), Downbeat-Quantized Live Stream Audio & MIDI Recording Engine (P11-02, D-099), Polish & QoL Pass (D-100), Preset Memory Schema v9 (P11-03, D-101), Part Lock & Chimeras (P12-01, D-102), Production View / Salon Console (P12-04, D-103), Web MIDI Learn (P12-02, D-104), Global Undo/Redo Action History Stack (P12-03, D-105), Creature Temperaments & Multi-Archetype Vitrine Tap Dynamics (P12-05, D-106), and Opus Melodic Variations, Calling Slip Note Tweaker & Flavor Pinning (P12-06, D-107) are fully implemented and verified! Version 1.5.0. 353/354 tests passing (353 passed, 1 skipped). Zero-dependency web core and portable desktop/firmware ecosystem intact.

**Verified** (2026-11-08, session 110, local Linux environment)

| Suite | Result |
| --- | --- |
| `node --test tests/*.test.mjs` | **355/356 passed (1 skipped)** |
| `python3 tools/check_docs.py` | **0 errors, 0 warnings across 14 documents** |
| `python3 tools/manual.py check docs/manual.json` | **6 sections, 49 entries, 0 errors, 0 warnings** |

**What works**

- The static page accepts a phrase and offers surprise, replay, and mute controls (P2-03).
- The phrase becomes a stable unsigned seed under the D-003 normalization contract.
- A purpose-built interpreter executes `src/oracle.lol` and rejects unsupported syntax with line numbers (P1-02, D-002).
- The spell emits validated audio, visual, and naming parameters (P2-01).
- Canvas and Web Audio share the same immutable score (P2-02, D-004).
- Audio loops continuously until mute, restart, replacement, or page close (D-005).
- The expanded grammar covers twelve-note phrases, eight scales, six rhythms and voices, ten shapes, broader size and color ranges, and six name templates (P5-01, D-005).
- Cellular appendages and fruiting bodies (sporangia, flagella, vacuoles, ascus spore-sacs, hydathodes, cirri, phosphor-glands, platelet rosettes), internal organelle textures, germ apertures, layouts, and sizes vary deterministically without ocular animal sclera (P5-02, D-006, D-049).
- Body boundaries continuously deform through eight clamped flux grammars while eight seed-selected kinetic systems move independently inside them (P5-03, D-007).
- Canvas geometry does not resize on audio beats; sound and image remain paired through their shared immutable score (D-008).
- The large exterior glow is isolated to the body fill; kinetic lines, rings, and cellular appendages no longer inherit its expensive per-primitive blur.
- Master volume adjusts the active loop smoothly from silence through a compressor-protected boost, and the live tempo slider (`#tempo-bpm`, `36..208` BPM) paces all six esoteric instruments in real time while defaulting to `score.pulse` on summon (P5-04, D-009).
- Every phrase selects and rotates one of twelve named twelve-note motifs, including five arpeggio and three chromatic families, then repeats it exactly (P5-05, D-010).
- The responsive page shell uses an engraved book-serif and telegraph-monospace stack, foxed parchment and tarnished brass parlor framing, inline SVG sigil and spandrel linework, and a centered bell-jar apparition vitrine without remote or proprietary assets (P5-06, D-011).
- Tapping/clicking, holding, and holding-and-dragging inside the vitrine trigger synthesized glass and membrane percussion, drive a constant-power harmonic phase shift across the creature's motif and three-partial drone choir, and morph, tug, and accelerate the creature's silhouette, kinetic core, and gaze before decaying smoothly back to its deterministic score (P5-07, D-012).
- A procedural mycelial network with branching hyphae, anastomotic fusion loops, traveling nutrient waves, and eight generative sporophore fruiting bodies (Agaric Cap, Bracket Conk, Coral Clavaria, Bioluminescent Bonnet, Cup Peziza, Morel Honeycomb, Globular Puffball, Hyphal Hydra) grows over a 10-second life-cycle envelope, puffs glowing ballistospores on vitrine taps, and accelerates with touch (P5-16, D-017).
- A spec-compliant 1998 Malbolge virtual machine (`src/malbolge.mjs`) executes `src/beat.mal` on a $3^{10}$ ternary tape to generate a 12-step ternary beat matrix (`#beat-grid`) across eight cadence families, with synthesized bellows kick, clockwork snare, and escapement chime voices plus live step cycling, pulse toggle, and mutation controls (P5-08, D-013).
- A 1993 Brainfuck tape interpreter (`src/brainfuck.mjs`) executes `src/bass.bf` on a 256-cell byte tape with `[->+<]` transfer loops to generate a 12-cell walking sub-bass and resonant lowpass acid-organ ostinato (`#bass-grid`) across eight groove archetypes, with portamento glide, live cell stepping, bass toggle, and tape-shift controls (P5-09, D-014).
- A 1993 Befunge-93 2D torus interpreter (`src/befunge.mjs`) executes `src/harmony.bfg` across an 80×25 boustrophedon mirror grid with `#` bridges and four diagonal mirrors (`\ / / \`) to generate a 12-cell polyphonic 3-voice chord organ (`#harmony-grid`) across eight organ archetypes, with `/` ascending and `\` descending harp-strum voicings, live mirror cycling, organ toggle, and mirror-flip controls (P5-10, D-014).
- A 2001 Piet 2D codel interpreter and 1987 John Conway FRACTRAN prime-ratio machine (`src/fractran.mjs`) execute `src/pad.piet` (49 codel transitions across all 18 chromatic codels) and `src/chimes.frac` ($2^a 3^b 5^c 7^d$ rational multipliers) to drive Just Intonation overtone bells and synesthetic codel-filtered chorus pads (`#chime-grid`) across eight carillon archetypes, with live codel/ratio cycling, chime toggle, and codel-refraction controls (P5-11, D-014).
- A 2001 Shakespeare Programming Language interpreter (`src/shakespeare.mjs`) executes `src/chant.spl` (`The Oracular Tragedy of the Parlor Glass.`) across 3 Acts, 12 Scenes, and four dramatis personae (`Hamlet`, `Ophelia`, `Prospero`, `Hecate`) to drive a 3-formant ($F_1, F_2, F_3$) parallel bandpass vowel choir (`#chant-grid`) across eight dramatic archetypes, coordinated with the other five languages by the Parlor Bandstand ensemble console (`#bandstand-engine`, P5-12, P5-13, D-014).
- An Euler-Tonnetz and Euclidean harmonic conductor (`src/conductor.mjs`) harmonizes all six esoteric bandmates across a 4-region Neo-Riemannian *Tonnetz* (`P`, `L`, `R`) progression, Leonhard Euler's 1739 *Gradus Suavitatis* consonance sieve, pure 5-limit Just Intonation chime overtones, and Bjorklund Euclidean rhythm hocketing $E(k, 12)$ (P5-14, D-016).
- The Kapellmeister music-theory console (`#kapellmeister-engine`) provides 22 selectable rulebooks across five menu families plus THE CREATURE'S OWN rulebook, an Euler consonance strictness slider ($3\dots 14$), live harmonic step/chord/vector/Euler score telemetry, and an animated 4-region SVG Tonnetz compass (P5-15, P5-29, D-019, D-041, D-060).
- The Antique Parlor Room Acoustic Space (`#parlor-acoustics-engine`) synthesizes authentic 1890s Edison wax-cylinder surface noise (horn resonance, Poisson dust pops, 78 RPM groove rumble), a 1.6-second wood-and-velvet chamber convolution reverb (`ConvolverNode`), and mechanical brass clockwork escapement ticks on quarter-beats, active in both live playback and offline 16-bit WAV rendering (P5-15, D-019).
- The Fun Machine accompanist and Loop Machine (`#fun-machine-engine`, `#looper`, D-029, D-039, P5-26, D-045, D-046, D-052, P11-01, D-098): play a 2-octave 25-key manual ($C_3\dots C_5$) with $[-2..+2]$ octave transposition buttons and $[Z]/[X]$ hotkeys (or `[A..K]` active-octave typing) and choose SWELL, ARPEGGIO, or PROGRESSION; the pad, arpeggio, and lead play in the band's rhythm, the band follows the chord, and the LOLCODE lead ducks. The Loop Machine records takes into stacked loops (up to 4 layers, 16 loops, 32 passes) with real-time audible clock latching, layer isolation during new loop recording, armed downbeat sync, a 1-loop count-in pass, a mechanical clockwork metronome, an interactive 12-step tracker ribbon, auto-advancing STEP REC, downbeat anticipation latching, and musical section roles (Intro, Main, Bridge, Outro) with live Outro cueing and full linear offline export to WAV, stems, and MIDI.
- The Downbeat-Quantized Live Stream Audio & MIDI Recording Engine (`#transport-live-rec`, `#transport-rec-status`, `#export-live-wav`, `#export-live-midi`, `src/live-recorder.mjs`, P11-02, D-099): taps live master Float32 PCM audio directly from `transport.output` and transcribes live played chords, leads, drums, bass, arpeggios, and vitrine interactions into real-time note events. Arming quantizes start to step 0 of the upcoming downbeat, and stopping quantizes finish to the next downbeat loop boundary, generating perfectly bar-aligned, cleanly looping takes exported directly to studio WAV (16/24/32f with peak ceiling protection, `acid` tempo chunks, and `smpl` loop points) and Standard MIDI Files (Type 1, 480 PPQ).
- Summoned creatures sync their phrase to `#omen=...` URL fragments without sending query parameters over HTTP, can be copied via `COPY OMEN LINK` (`#share-link`), and can be exported as a 1200×1520 engraved broadsheet PNG (`#export-png`) containing the live creature capture, specimen name, confided phrase, seed, and six-language ensemble ledger (P3-01, P3-02, D-015).
- A comprehensive 3x technical manual (`docs/manual.json`, `manual.html`, `tools/manual.py`) documents What, How, and Why across all 28 major systems, interpreters, and algorithms with 0 warnings.
- Full interactive and audiovisual functionality verified in live browser review (P4-01).
- The master transport (`#transport-deck`) plays, pauses at the last heard step, and stops-and-rewinds the loop; `Space` toggles play/pause and `Esc` stops from anywhere. Live playback and WAV export build one shared graph (`src/ensemble.mjs`), so exports render the routing the listener hears (P5-18, D-023).
- The Session Ledger (`#session-engine`) saves the whole apparatus as named presets in this browser's `localStorage` or as portable `.fun` files, and restores it exactly; files and stored presets pass a strict validator first (P5-20, D-026).
- `EXPORT 9 STEMS (ZIP)` downloads eight aligned channel stems, a parlor-room stem, and a README; `WRITE MIDI SCORE` downloads a Type 1 MIDI file with a tempo track and seven named parts captured from the live schedulers (P5-21, D-025).
- The parlor mixing console (`#mixer-engine`) gives all eight voices a fader, pan, mute, solo, and live post-fader VU meter. Plate ENGAGE/SILENCE switches are the console's mutes, and WAV exports follow the mix. Default voicing trims lift the lead +6 dB and the choir +12 dB with faders still at unity, faders reach a further +12 dB, the choir bypasses the creature filter, and bandpass creatures blend a dry lead tap, so neither voice is buried by narrow bandpass creatures any more (P5-19, D-024).
- Below the vitrine and the reading strip (name and score card only), the page is a four-wing workstation (D-027, D-058): **Perform** (transport rail with restart, volume, and tempo; Fun Machine; Kapellmeister), **Mix** (Bandstand, console, parlor room), **The Band** (Plates I–V), and **Keep** (Session Ledger; export desk with WAV, stems, MIDI, PNG, and omen link). Tab order follows the same sequence, and nothing overflows at 320, 375, 768, or 1100 px.
- Runtime assets are local and dependency-free (D-001).
- Updates load cleanly without a hard reload (D-035): `index.html` builds an import map that stamps every module with `?v=<ASSET_VERSION>` (a hash of `src/`), and sources are fetched with the same stamp. Verified in the built-in browser against plain `python3 -m http.server`: with 28 of 29 files served from heuristic cache, a new export added to `src/ensemble.mjs` and imported by `src/app.mjs`, plus a restamp, loaded on a normal reload with all 29 requests at the new stamp and no console errors.
- All six rhythm templates divide the 12-step barline evenly ($12 \bmod \text{len} = 0$), mathematically guaranteeing zero metric loop drift across loop boundaries and seamless export loop tiling; summoned creature tempos fold into the $68\dots 144$ BPM groove pocket; region boundary damping prevents chord release tail bleed; and a vertical anti-clash sieve resolves passing tone collisions down to 0.00% under THE CREATURE'S OWN rulebook (D-050).
- Voice envelope GainNodes initialize to `0.0001` at construction, pad releases cleanly anchor active gains via `cancelAndHoldAtTime` and cancel future look-ahead nodes before they sound, and legato key changes grace-window drone ducking to eliminate volume spikes (D-051).
- Looper recording synchronization eliminates clock collision, premature overdub discards, and sustain note truncation; section roles (Intro, Main, Bridge, Outro) support full musical arrangements with seamless Outro cueing and linear export (D-052).

**Not verified**

- No public hosting or domain exists.
- Session presets have not been checked by hand in a real browser private window; blocked-storage and `QuotaExceededError` mid-write eviction/fallback paths are verified via simulated storage adapters (`tests/session.test.mjs`, P4-05).
- No DAW import has been tried: stems and MIDI were validated by independent parsers (Python `zipfile`, `unzip -t`, an in-page SMF reader), not by opening them in a DAW.
- Nobody has listened to the mixer yet: hard-pan feel, the fader taper, and meter ballistics were checked by numbers, not by ear.
- The four-wing layout was checked in the built-in browser by measurement and screenshots, not by the maintainer's own hands-on review, and not in Safari or Firefox.
- Nobody has listened to the transport changes yet. Pause/resume, the output fade, and WAV parity were checked structurally and in a live browser by state readouts and PCM statistics, not by ear.

**Gotchas**

- After editing anything under `src/`, run `node tools/stamp_assets.mjs`; `tests/assets.test.mjs` fails until you do. A new module must also join `MODULES` in `index.html` (D-035).
- Serve the directory over HTTP, preferably with `python3 tools/serve.py` (no stale caching). A direct `file:` URL cannot fetch `src/oracle.lol`, `src/beat.mal`, `src/bass.bf`, `src/harmony.bfg`, `src/pad.piet`, `src/chimes.frac`, or `src/chant.spl`.
- The interpreter deliberately implements a subset. Read D-002 before extending the spell.
- Changes to hash, normalization, formula constants, scale, or name tables can break phrase identity. D-005 through D-007, D-013, D-014, and D-016 record intentional pre-release compatibility breaks.

## Next steps

1. Deploy staged bundle (`dist-neocities/`) to Neocities via web dashboard or `neocities-cli` (P6-01, D-065).
2. Hands-on review of the Parlor Salon desktop synth console, MIDI Learn, and Undo/Redo in Safari, Firefox, and Chrome.
3. Hands-on verification of WAV, stems, and MIDI files imported into REAPER, Ableton Live, and Logic Pro (P8-12).

## Open questions

- None (Q-001 answered by D-065).

## Session log

Each entry covers Contributor, Goal, Done, Changed, Decisions, Verified, Not verified, Problems, **Corrections** (earlier notes found wrong, and what was true), Left undone, and Next session.

### Session 110 (2026-11-08): Adopt the expanded Manifold base scheme (D-108)

**Contributor:** Claude Code with maintainer direction

**Goal:** Close the gaps between this repository and the expanded Manifold base template.

**Changed:** `AGENTS.md` (Zones, fore-conception and scoping steps, inquiry, loopback, ownership, Chesterton rules, consolidation step, three terms); `docs/DECISIONS.md` (format note, Held tensions, D-108); `docs/HANDOFF.md` (session owner, entry fields); `docs/TESTING.md` (services, resource caps, Runs that vary); `docs/SECURITY.md` (repository-content row); `tools/check_docs.py` (`T-NNN` and invisible-character checks).

**Verified:** 355/356 Node tests (1 skipped), docs check 0/0, manual check 0 warnings; the new checker rules were each shown to fail on a planted violation before passing on the real docs.

**Not verified:** no runtime code changed; no browser run.

**Corrections:** none.

**Left undone:** Mellon edition items (deferred in D-108). Next steps 2 and 3 still lack roadmap IDs; none exists to cite.

### Session 109 (2026-11-04): Opus Melodic Variations, Calling Slip Note Tweaker & Flavor Pinning (P12-06, D-107)

**Contributor:** Antigravity with maintainer direction

**Goal:** Address user feedback regarding seed sensitivity (seeds differing by 1 character causing radical avalanche changes under FNV-1a): enable melodic takes and variations via `#` opus delimiters (e.g. `seed # 1` vs `seed # 2`), direct `[⚄ TWEAK NOTES]` calling-slip action, and `[FLAVOR: PINNED 🔒]` species lock, keeping the creature's exact species, color palette, visual morphology, and musical flavor intact while deterministically tweaking melodic notes (D-107). Also resolve frozen score extensibility runtime error in `showScore`.

**Done:** All components implemented and verified under D-107. P12-06 complete. 353/354 tests pass (1 skipped), documentation check 0 errors/0 warnings.

**Changed:**
1. Runtime Extensibility Fix (`src/score.mjs`, `src/temperament.mjs`, `src/app.mjs`):
   - Resolved `TypeError: Cannot add property temperament, object is not extensible` by embedding `temperament: deriveTemperament(values)` inside frozen score construction in `parseScore()`.
   - Enhanced `deriveTemperament` to accept both raw values and wrapped scores safely, removing mutable assignments in `app.mjs`.
2. Functional Opus & Take Syntax (`src/score.mjs`, `tests/seed-variation.test.mjs`):
   - Implemented `parseVariationPhrase(phrase)` recognizing supported delimiters (`#`, `~`, `//`, `:`, `(...)`, and ` - take/opus/var`).
   - Implemented `deriveScoreVariation(baseScore, phrase, variationKey, opusLabel)` applying bounded melodic degree perturbations in $[-2, +2]$ across all 12 steps and shifting `melodyTurn`, strictly preserving scale, root, voice, rhythm, pulse, beat mode, bass mode, harmony mode, chimes, choir, hue, palette, symmetry, shape, eyes, fungal form, bell jar, and temperament.
   - Appended engraved opus badge (e.g. `THE VELVET MOTH (OPUS 2)`) to the ceremonial name.
3. Calling Slip UI & Flavor Pinning (`index.html`, `styles.css`, `src/app.mjs`):
   - Added `[⚄ TWEAK NOTES]` quick-action button on the Calling Slip (`#calling-slip-tweak`) to increment through sequential opus takes (`# 2`, `# 3`, `# 4`...) with a single click.
   - Added `[FLAVOR: FREE / PINNED 🔒]` toggle button (`#calling-slip-pin`) to freeze the current specimen's genus so that subsequent phrase entries (including single-character variations) explore melodic takes of the pinned creature.
   - Added dynamic hint `#calling-slip-hint` explaining variation syntax and pinned mode status.
4. Documentation & Verification:
   - Added ADR D-107 in `docs/DECISIONS.md`.
   - Updated Entry 4 in `docs/manual.json` (49 entries, 0 errors, 0 warnings) and rebuilt `manual.html`.
   - Updated `ROADMAP.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/HANDOFF.md`.
   - Moved Session 98 to `docs/archive/sessions.md` to maintain the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 353/354 behavioral and structural checks passed (1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 49 entries, 0 errors, 0 warnings.
- D-003 phrase determinism contract and zero-dependency boundary fully preserved.

### Session 108 (2026-11-04): Creature Temperaments & Multi-Archetype Vitrine Tap Dynamics (P12-05, D-106)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Phase 12 Candidate 5 (P12-05, D-106): deterministically derive 5 distinct creature temperaments (The Retaliator, The Timid Hermit, The Playful Musician, The Chromatophore, and The Stoic Clockwork) from creature score traits; diversify vitrine interaction so creatures retreat into the shadows without hitting the glass, play responsive musical scale notes, pulse bioluminescent colors, ignore/tick stoically, or lunge and crack the glass based on personality.

**Done:** All parts implemented and verified under D-106. P12-05 marked complete. 348/349 tests pass (1 skipped).

**Changed:**
1. Pure Temperament Model (`src/temperament.mjs`, `tests/temperament.test.mjs`):
   - Created zero-dependency pure model defining 5 distinct somatic and psychological temperaments (`TEMPERAMENT_IDS` and `TEMPERAMENTS`).
   - Mapped all 64 ceremonial adjectives and morphological score traits deterministically to temperaments via `deriveTemperament(score)`.
   - Added `formatTemperamentBadge()` for human-readable catalog and specimen identification.
2. Web Audio Synthesis Schedulers (`src/schedulers.mjs`):
   - Expanded `triggerPercussion(kind, ...)` to synthesize 7 new sound models: `"flutter"` (delicate muffled chime with breath), `"hush"` (whispering filtered noise sigh), `"melody_burst"` (responsive 2-note scale micro-arpeggios), `"cadenza"` (virtuosic 5-note rapid arpeggio run), `"shimmer"` (crystalline overtone dispersion), `"bioluminescent_pulse"` (resonant harmonic sweep), and `"clockwork_tick"` (crisp brass escapement click).
3. Canvas Vitrine Staging & Interaction Physics (`src/vitrine-canvas.mjs`, `src/app.mjs`):
   - Added `retreat`, `chromaticShift`, `bioluminescentFlash`, `cadenzaFlurry`, and `temperament` to `interaction`.
   - Updated `paletteFor(score, chromaticShift)` to support dynamic iridescent hue shifts.
   - Guarded glass stress fractures to render only for violent retaliators, keeping the bell jar pristine for gentle, musical, chromatophoric, and stoic specimens.
   - Added timid shadow retreat physics (depth scaling, opacity dimming, and audio ducking), musician golden harmonic standing wave rings, and chromatophore prismatic auroral veils.
   - Updated `#stage-caption`, `#status`, and `#folio-readout` with context-aware, temperament-aligned copy.
4. Assets, Manual, and Documentation:
   - Added `src/temperament.mjs` to import map `MODULES` in `index.html` and restamped `ASSET_VERSION` (`59756b720f27`).
   - Added Entry 48 (`creature-temperaments`) to `docs/manual.json` and compiled `manual.html`.
   - Recorded Decision D-106 in `docs/DECISIONS.md`, updated `ROADMAP.md` (P12-05), `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/HANDOFF.md`.

### Session 106 (2026-10-30): Global Undo/Redo Action History Stack (P12-03, D-105)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Phase 12 Candidate 3 (P12-03, D-105): design and build a multi-level transactional action history stack for the Whimsy Machine, enabling seamless undo and redo across creature summons, part locks, plate cycling, mixer faders, Kapellmeister rulebooks, Fun Machine settings, and looper edits with live playback preservation.

**Done:** All parts implemented and verified under D-105. P12-03 marked complete. 336/337 tests pass (1 skipped).

**Changed:**
1. Pure History State Model (`src/history.mjs`, `tests/history.test.mjs`):
   - Created pure, immutable history state model with bounded transactional stacks (`past`, `present`, `future`) up to 50 levels deep (`DEFAULT_MAX_HISTORY = 50`).
   - Implemented `cloneSnapshot()`, `areSnapshotsEqual()`, `createHistoryState()`, `initHistory()`, `pushHistory()`, `undo()`, `redo()`, `clearHistory()`, and `getHistorySummary()`.
   - Prevented redundant identical pushes and cleanly truncated `past` when exceeding maximum capacity.
2. Apparatus Snapshotting & Debounced Coalescing (`src/app.mjs`):
   - Reused existing validated session state serialization (`captureSession()` / `applySession()`) for full-fidelity snapshot capture and restoration without schema drift.
   - Guarded restoration with `isHistoryRestoring` flag to eliminate recursive history mutation loops.
   - Implemented 400ms coalescing debounce timer for continuous stream inputs (mixer faders, master volume, live tempo, Euler strictness, and incoming learned MIDI CCs), committing on slider release (`change` / pointer release) or timeout to eliminate history bloat.
   - Discrete mutations (summons, mutations, plate cell cycling, channel mutes/solos, part locks, rulebooks, looper takes, and preset loads) commit immediately.
   - Preserved seamless live Web Audio playback during undo/redo restoration via in-place state hot-swapping without transport disruption.
3. Dual-Access UI Controls & Global Hotkeys (`index.html`, `styles.css`, `src/app.mjs`):
   - Added `#transport-undo` and `#transport-redo` buttons into the masthead transport rail (`.transport-keys`), accessible in both Parlor Salon and Grand Workbench views.
   - Added Studio Deck history tools (`#studio-undo-btn`, `#studio-redo-btn`, `#studio-history-clear-btn`, `#studio-history-status`, `#studio-history-breadcrumbs`) with dynamic SVG breadcrumb indicators in the Keep Wing.
   - Added global keyboard accelerators `[Ctrl+Z]` / `[Cmd+Z]` for Undo, and `[Ctrl+Y]` / `[Cmd+Y]` / `[Ctrl+Shift+Z]` for Redo, safely bypassing native text inputs (`input`, `textarea`, `elements.phrase`).
4. Documentation, Manual, and Testing:
   - Added Entry 47 (`global-action-history`) to `docs/manual.json` and compiled `manual.html`.
   - Recorded Decision D-105 in `docs/DECISIONS.md`.
   - Updated `AGENTS.md`, `ROADMAP.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, and `docs/HANDOFF.md`.
   - Archived Session 96 to `docs/archive/sessions.md` to maintain the rolling 10-session window (Sessions 97 through 106).
   - Resolved boot race condition: eliminated premature top-level `syncSessionButtons()` call in `src/app.mjs` and guarded `renderPresetList()` and `syncSessionButtons()` with `rulebooksInstalled()` checks, preventing unhandled `Kapellmeister rulebooks are not installed yet` exceptions on page reload with stored presets.
   - Resolved Muscaria Hallucinating audio freeze: corrected undeclared variable `parlorAmbienceLevel` to `parlorAcousticsLevel` in `scheduleEnsembleStep` and exported/imported `DRONE_DETUNE`, preventing scheduler crash and total apparatus muting in hallucination mode.
   - Restamped asset version (`tools/stamp_assets.mjs`).

**Verified:**
- `node --test tests/*.test.mjs`: 337/338 tests passing (1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 47 entries, 0 errors, 0 warnings.

### Session 105 (2026-10-30): Web MIDI Learn, Priority CC Mapping, and Bidirectional Controller Feedback (P12-02, D-104)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Phase 12 Candidate 2 (P12-02, D-104): design and build a zero-dependency Web MIDI Learn engine allowing musicians to map physical hardware encoders, faders, and buttons to 28 parameters across the apparatus, with priority overlay on factory FM-1 controls, bidirectional CC feedback to motorized hardware, and on-device localStorage persistence.

**Done:** Pure state model in `src/midi-learn.mjs` with comprehensive unit test suite (`tests/midi-learn.test.mjs`), dual-access Learn buttons in the Mixer header and Studio Deck, `[L]` keyboard hotkey, in-place amber target highlighting and pulsing armed indicators, conflict resolution, outbound CC transmission with echo suppression, localStorage persistence under `whimsy-machine.midi-map.v1`, and 46-entry technical manual documentation. All 328 behavioral checks passing (1 skipped).

**Changed:**
1. Pure MIDI Learn State Engine (`src/midi-learn.mjs`, `tests/midi-learn.test.mjs`):
   - Defined registry of 28 targets across 4 groups:
     - 10 Mixer Channel Faders (`fader:lead` through `fader:theremin`, 0..100).
     - 10 Mixer Channel Mutes (`mute:lead` through `mute:theremin`, toggle).
     - 4 Master Controls: Volume (0..100), Tempo (36..208 BPM), Creature Filter Cutoff (0..100%), Euler Strictness (3..14).
     - 4 Somatic Suites: Bone Forge (toggle, hammer strike, quench steam), Spore Harp (toggle, strum hyphae, symbiosis cycle, tension cycle), Muscaria (mode cycle, stimulate pulse, trip depth cycle), and Bone Theremin (toggle, scale snap toggle).
   - Implemented `createMidiLearnState()`, `enterLearnMode()`, `exitLearnMode()`, `toggleLearnMode()`, `armTarget()`, `disarmTarget()`, `learnMapping()`, `unmapTarget()`, `clearAllMappings()`, `resetToBuiltinDefaults()`, `resolveMidiCC()`, `computeOutboundCC()`.
   - Verified linear domain conversion (`ccToDomain`, `domainToCC`) and toggle/trigger handling.
2. Priority Overlay Resolution & Built-in CC Fallback:
   - Inbound MIDI CC messages resolve against custom user mappings in `customMap` first.
   - Unmapped CCs fall back to built-in factory defaults (FM-1 profile CC 70–75, CC 1/2/7/11/64), preserving out-of-the-box plug-and-play behavior.
   - Stealing conflict resolution: learning an already-assigned CC to a new parameter unbinds the previous target cleanly without duplicates.
3. Dual-Access One-Click Learn UX & Visual Feedback (`index.html`, `styles.css`, `src/app.mjs`):
   - Added `#midi-learn-mixer-btn` in the Mixer header and `#midi-learn-studio-btn` in the Studio Deck.
   - Bound keyboard **`[L]`** hotkey (outside text inputs) to toggle MIDI Learn mode.
   - Outlined all mappable controls with dashed amber borders (`.is-midi-learning [data-midi-target]`) and pulsing golden borders when armed (`.is-midi-armed`).
   - Clicking any mappable parameter in learn mode arms it; receiving a hardware CC immediately binds the target, saves to storage, and disarms.
   - Pressing `Escape` exits learn mode immediately without halting audio playback.
4. Bidirectional Hardware CC Feedback (Motorized Faders & LED Rings):
   - Added `makeControlChange(channel, controller, value)` in `src/midi-io.mjs`.
   - Implemented `sendMidiFeedback()`: whenever faders, volume, tempo, cutoff, or strictness change from UI/keyboard/presets, transmits outbound CC updates to the active MIDI output port.
   - Prevented feedback loops: incoming MIDI messages tag adjustments with `{ fromMidi: true }`, suppressing outbound loopback echo.
   - Added `#midi-feedback-toggle` in the Studio Deck (default ON).
5. Storage Persistence & Deck Management:
   - Serialized in `localStorage` under `whimsy-machine.midi-map.v1` (`loadMidiMapFromStorage()`, `saveMidiMapToStorage()`).
   - `#midi-map-summary` in the Studio Deck renders compact chips of all active bindings with one-click unmap `[×]` buttons, plus `CLEAR ALL ⌫` and `RESET FM-1 DEFAULTS ↺`.
6. Assets & Documentation:
   - Restamped asset version to `d72890a0c48c` via `node tools/stamp_assets.mjs`.
   - Added entry 46 (`web-midi-learn`) to `docs/manual.json` and built `manual.html`.
   - Recorded D-104 in `docs/DECISIONS.md`.
   - Archived Session 95 into `docs/archive/sessions.md` to preserve the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 328/329 checks passed (328 passed, 1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 46 entries, 0 errors, 0 warnings.

### Session 104 (2026-10-30): Parlor Salon Synth Enclosure, 25-Key Manual Geometry, and Visual Polish

**Contributor:** Antigravity with maintainer direction

**Goal:** Address maintainer feedback and visual review from 5 live screenshots: 25-key manual layout truncation, oversized creature headline in catalogued reading, redundant esoteric preamble in Salon view, off-center playback transport buttons, and unify the 3 fragmented floating cards into a single cohesive "steampunk/victorian Korg mini" parlor deck.

**Done:** Fixed 25-key organ black key positioning math across both Grand and Salon layouts, unified Transport, Volume/Tempo, Voice Presets, and Keybed into a single ebonized/brass desktop synth enclosure (`.wing-perform`), structured an illuminated 4x2 voice selector matrix, balanced side-by-side master transport and tempo controls, and verified all 320 tests pass.

**Changed:**
1. Unified Steampunk/Victorian "Korg Mini" Parlor Deck (`styles.css`):
   - Eliminated the three disconnected floating dark boxes; unified the Master Section, Voice Matrix, and Keybed inside `.is-salon-view .wing-perform` as a single desktop instrument chassis with brass-trimmed ebonized walnut casing (`radial-gradient`, `box-shadow`, `border: 2px solid #5a4225; border-top: 2px solid var(--brass)`).
   - Upper Panel (Master Section): Placed the 4 vintage tactile transport buttons (`PLAY`, `PAUSE`, `STOP`, `RESTART`) on the left and balanced Volume/Tempo sliders on the right in a unified faceplate strip (`.is-salon-view .transport-deck`).
   - Middle Panel (Voice Matrix): Arranged the 8 voice preset chips into an illuminated, balanced 4x2 matrix (`repeat(4, 1fr)`) with warm amber backlit active states, eliminating the trailing single-chip wrap.
   - Lower Panel (Recessed Keybed): Built the 25-key manual directly into the bottom of the synth chassis (`.fun-keyboard-wrap`), recessed with deep inner shadow.
2. 25-Key Organ Manual Layout Fix (`styles.css`):
   - Diagnosed root cause of keyboard distortion: legacy CSS rules from 13-key manual only positioned 5 black keys using 8-white-key percentages (`8.8%`, `21.3%`, etc.) and black keys for octave 2 (`13, 15, 18, 20, 22`) lacked `left` rules, defaulting to `left: 0` and stacking $A'\sharp$ over $C$.
   - Sized `.fun-key-black` width to `4.5%` (proportional to 15 white keys, each $100\% / 15 = 6.67\%$).
   - Placed all 10 black keys centered over their respective white key boundaries using exact `calc((100% * boundary / 15) - 2.25%)` rules for semitones `1, 3, 6, 8, 10, 13, 15, 18, 20, 22` in both views.
   - Expanded `.fun-keyboard` max-width from 680px to `52rem` (matching the workstation console scale).
3. Reading Card Headline Typography & Preamble Removal (`styles.css`):
   - Added `.is-salon-view .reading h2` font-size clamp `clamp(0.95rem, 1.3vw, 1.25rem)` with `line-height: 1.25` and `max-width: 32ch`, preventing multi-line word wrapping on long names.
   - Added `.is-salon-view .introduction` to `display: none !important`, removing the redundant crest and "UTTER A PHRASE UNTO THE GLASS" banner in Salon mode.
4. Verification & Testing:
   - All 319 behavioral and structural tests pass (1 skipped).
   - `python3 tools/check_docs.py` and `python3 tools/manual.py check docs/manual.json` pass with 0 errors, 0 warnings.

### Session 103 (2026-10-30): Production View, Compact Parlor Console & Beginner Focus Mode (P12-04, D-103)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Phase 12 Candidate 4 (P12-04, D-103): design and build a distraction-free, single-screen stage console consolidating the vitrine, master transport, 10-channel mixer, and play manual without vertical scrolling, resolving beginner cognitive overload while empowering live performance workflows.

**Done:** Designed and verified dual presentation architecture (`src/view-mode.mjs`, `styles.css`, `index.html`, `src/app.mjs`), created new unit test suite (`tests/view-mode.test.mjs`), integrated 3-badge docked somatic rack, wired hotkey `[V]` and masthead/console view toggles, verified zero-scroll 100vh layout on desktop, updated manual to 45 entries, and verified all 319/320 automated tests pass with 0 documentation errors.

**Changed:**
1. View Mode State Machine (`src/view-mode.mjs`, `tests/view-mode.test.mjs`):
   - Defined `VIEW_MODES` (`["salon", "workbench"]`), `DEFAULT_VIEW_MODE = "salon"`, and `VIEW_MODE_STORAGE_KEY = "whimsy-machine.view-mode.v1"`.
   - Implemented `parseViewMode()`, `toggleViewMode()`, `isSalonMode()`, `viewModeLabel()`, and `unfoldButtonLabels()`.
2. Centered Single-Column Parlor Stage (`styles.css`, `index.html`):
   - Overhauled Salon layout into a centered, balanced single-column parlor presentation (`max-width: 60rem; margin: 0 auto;`).
   - Clean vertical hierarchy: Apparition Vitrine on top, Calling Slip in the middle, and Play Deck (Transport + Organ keys + Voices) below.
   - Eliminated audio engineering overwhelm: completely hid 10-channel mixer console, part locks, and DAW transport buttons (12/16 steps, bar lock, step counter, live rec status) in Salon mode.
3. Clean Organ Keys & Clutter Elimination:
   - Suppressed chord text collision (`.fun-key-chord`) in black keys and tuned font-size floor to >= 0.6rem.
   - Hid somatic control bars (`#somatic-rack`) in Salon mode, restoring the Vitrine to a pristine Victorian specimen bell jar without bolted control strips.
4. Seamless View Transitions & Hotkey (`src/app.mjs`):
   - Added `#view-mode-toggle` in the Masthead (`PARLOR SALON ⧉` / `GRAND WORKBENCH ▾`).
   - Added `#workbench-unfold` at the console foot (`UNFOLD GRAND WORKBENCH ▾` / `COLLAPSE TO PARLOR SALON ▴`).
   - Bound **`[V]`** hotkey (outside text inputs) to cycle instantaneously between Salon and Workbench modes.
   - Screen-reader progressive disclosure: sets `aria-hidden="true"` on tucked machinery (Plates I–V, Looper sequencer, Inform 7 compiler, Keep decks) in Salon mode.
5. Technical Manual & Asset Versioning:
   - Added `parlor-salon-console` to `docs/manual.json` (45 entries, 0 warnings) and built `manual.html`.
   - Restamped asset version to `d020d60de5b2` via `node tools/stamp_assets.mjs`.
   - Archived Session 93 into `docs/archive/sessions.md` to maintain the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 319/320 tests passing (1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 45 entries, 0 errors, 0 warnings.

### Session 102 (2026-10-30): Part Lock, In-Place Unlocked Mutation, and Chimeric Score Synthesis (P12-01, D-102)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Candidate 1 of Phase 12 (P12-01, D-102): granular channel freezing across 10 mixer channels and 2 meta-locks; in-place downbeat mutation with `[M]` hotkey; and chimeric hybrid score synthesis with algorithmic portmanteau naming upon summoning with active locks.

**Done:** All part lock state models, chimera score generator, naming fusions, UI controls, session schema v9 persistence, and hotkeys implemented and verified under D-102. 314/315 tests passing (1 skipped).

**Changed:**
1. Part Lock Core Model & Chimera Score Generator (`src/part-lock.mjs`, `tests/part-lock.test.mjs`):
   - Defined `PART_IDS` covering 10 mixer channels (`beat`, `bass`, `harmony`, `chime`, `chant`, `lead`, `forge`, `harp`, `fungal`, `theremin`) and 2 meta-locks (`visuals`, `tonality`).
   - Implemented `createPartLockState()`, `togglePartLock()`, `setAllLocks()`, and `countActiveLocks()`.
   - Implemented `fuseCreatureNames()`: algorithmic portmanteau and fusion of noun/adjective combinations based on body lock state.
   - Implemented `buildChimeraScore()`: creates composite scores inheriting locked parameters from the active creature and unlocked parameters from newly summoned creatures.
   - Implemented `mutateUnlockedPlates()`: advances mutation counters only on unlocked esoteric plates and somatic seeds.
2. UI & Interaction Layer (`index.html`, `styles.css`, `src/app.mjs`):
   - Added Master Part Lock Bar (`#part-lock-bar`) at the top of the Mixer Console (Wing II) with `#part-lock-mutate` (`MUTATE UNLOCKED [M] ⚄`), `#part-lock-reroll` (`RE-ROLL UNLOCKED ⚅`), `#part-lock-toggle-all` (`LOCK ALL 🔒` / `UNLOCK ALL 🔓`), `#part-lock-visuals` (`BODY 🔓`), `#part-lock-tonality` (`KEY 🔓`), and live status readout (`#part-lock-summary`).
   - Added individual padlock buttons (`.mixer-lock`, text `🔒`/`🔓`, `.is-locked`, strip `.is-part-locked`) to all 10 channel strips in the Parlor Mixing Console.
   - Added plate lock buttons (`#beat-lock`, `#bass-lock`, `#harmony-lock`, `#chime-lock`, `#chant-lock`) to Plate headers in Wing III.
   - Bound keyboard `[M]` hotkey outside of text inputs to trigger instant downbeat unlocked mutation.
3. Storage & Backward Compatibility (`src/session.mjs`, `tests/session.test.mjs`):
   - Serialized `session.locks` boolean map in Session Schema v9 with full non-destructive backward compatibility.
4. Assets & Documentation:
   - Restamped `ASSET_VERSION` via `node tools/stamp_assets.mjs`.
   - Recorded D-102 in `docs/DECISIONS.md`, marked P12-01 complete in `ROADMAP.md`, updated `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, `docs/archive/sessions.md`, and `docs/HANDOFF.md`.

**Verified:**
- `node --test tests/*.test.mjs`: 314/315 tests passing (1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.

**Next session should start with:** P12-02 Web MIDI Learn & Controller CC Mapping or hands-on review of chimeric sound creation.

### Session 101 (2026-10-30): Preset Memory Schema v9, Bio-Somatic Persistence, Preset Bank Bundles, and Session Ledger Workflow Enhancements (P11-03, D-101)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Candidate 3 of Phase 11 (P11-03, D-101): expand Session Schema to v9 to serialize somatic instrument parameters, Herbarium specimen pins, and live recorder preferences; guarantee safe dormant boot upon preset load; streamline Keep Wing Session Ledger workflow with instant overwrite, cloning, and renaming; introduce `.funbank` Preset Bank Bundles with interactive merge/replace import.

**Done:** All schema, storage, UI controls, preset bank handling, and safe dormant loading implemented and verified under D-101. 308/309 tests passing (1 skipped).

**Changed:**
1. Preset Schema v9 & Storage Serialization (`src/session.mjs`, `tests/session.test.mjs`):
   - Bumped `SESSION_VERSION` to 9 and expanded `MAX_SESSION_BYTES` to 96 KB.
   - Added `BANK_FORMAT = "whimsy-preset-bank"`, `BANK_VERSION = 1`, `BANK_FILE_EXTENSION = "funbank"`, and `MAX_BANK_BYTES = 512 * 1024`.
   - Validated and serialized `somatic` (`sporeHarp`, `muscaria`, `theremin`), `recorder` (`wavBitDepth`, `autoMidi`), and `herbarium` (`pinned`, `specimen`).
   - Maintained full backwards compatibility with legacy schemas v1–v8, backfilling safe somatic defaults on load.
   - Implemented `upsertPreset(..., { overwrite = true })`, `duplicatePreset()`, `renamePreset()`, `serializePresetBank()`, and `parsePresetBank()`.
2. Acoustic Safety Invariant on Preset Boot (`src/app.mjs`):
   - Guaranteed that `applySession()` loads Muscaria in safe `DORMANT` mode, preserving saved `targetMode` and `tripDepth` until intentionally unmuted or triggered.
3. Session Ledger UI Controls & Bank Import/Export (`index.html`, `styles.css`, `src/app.mjs`, `tests/static.test.mjs`):
   - Added `#session-update-preset` (`UPDATE ⟳`, instant overwrite without modal confirmation), `#session-clone-preset` (`CLONE ⧉`), `#session-rename-preset` (`RENAME ✎`).
   - Added `#session-export-bank` (`EXPORT BANK ⤓`) and `#session-open-bank` (`OPEN BANK ⤒`) with file input `#session-bank-input`.
   - On `.funbank` open, prompted user with choice between Merge (non-destructive append) and Replace (fresh bank).
   - Synchronized button enabled/disabled states dynamically with active score and selected presets.
4. Assets & Documentation:
   - Restamped `ASSET_VERSION` via `node tools/stamp_assets.mjs`.
   - Marked P11-03 complete in `ROADMAP.md` and recorded D-101 in `docs/DECISIONS.md`.
   - Updated `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, `docs/archive/sessions.md`, and `docs/HANDOFF.md`.

**Verified:**
- `node --test tests/*.test.mjs`: 308/309 tests passing (1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.

**Next session should start with:** Hands-on review of Preset Memory & Bank workflow, or candidate work on Phase 11.

### Session 100 (2026-10-30): Polish & QoL Pass: System Comms, Fungal Instrument Sculpting, and Consonance Tuning (D-100)

**Contributor:** Antigravity with maintainer direction

**Goal:** Conduct an exhaustive polish and quality-of-life pass: resolve system communications and Theremin routing defects, overhaul the BioParasite Spore Harp to a sparkling concert harp register with distinct symbiosis personalities and tension control, expand PlantWave Muscaria hallucination dynamics across the entire ensemble, and enforce consonance-first vitrine defaults (D-100).

**Done:** All comms routing, somatic live MIDI logging, acoustic sculpting, and consonance tuning implemented and verified under D-100. 305/306 tests passing (1 skipped).

**Changed:**
1. Somatic System Communications & Theremin Dynamic Routing (`src/app.mjs`, `src/theremin.mjs`, `index.html`):
   - Implemented `updateThereminRouting()`, dynamically connecting `thereminMasterGain` to `currentTransport.output` during playback and falling back to `audioContext.destination` when idle. The Theremin is now fully governed by master transport volume and ducking, and streams directly into `liveCaptureProcessor` for live take WAV capture.
   - Updated vitrine Theremin to default to quantized scale degrees (`scaleSnap: true`), displaying `SCALE SNAP: ON (QUANTIZED)` on load, with toggle to `SCALE SNAP: OFF (FREE GLIDE)` for microtonal glide.
2. Complete 10-Channel Live MIDI Transcription (`src/live-recorder.mjs`, `src/app.mjs`, `tests/live-record.test.mjs`):
   - Added `LIVE_MIDI_TRACKS` incorporating all somatic and bio-acoustic channels: `forge` (channel 9, GM drums), `harp` (channel 6, GM 46 Orchestral Harp), `fungal` (channel 7, GM 98 Crystal), and `theremin` (channel 8, GM 54 Synth Voice).
   - Wired real-time `logNote` calls across Spore Harp auto-strum and interactive vitrine swiping, Bone Beat acoustic percussion strikes, Muscaria PlantWave note emissions, and Theremin melodic performances.
3. BioParasite Spore Harp Acoustic Redesign & String Tension Control (`src/spore-harp.mjs`, `index.html`, `src/app.mjs`, `tests/spore-harp.test.mjs`):
   - Lifted hyphal string octave register by two full octaves into the sparkling concert parlor harp register ($C_4\dots C_6$, MIDI $60\dots 84$), eliminating muddy collisions with the walking sub-bass.
   - Added `HARP_TENSION_PRESETS` (`0.75× WARM`, `1.0× CONCERT`, `1.25× TIGHT`, `1.5× BRILLIANT`) with dedicated `#spore-harp-tension` button cycling tension and dynamic plectrum transient shaping.
   - Sculpted four distinct, unmistakable symbiosis acoustic personalities:
     - `SILK`: Pure, singing concert harp & koto with clean crystalline partials, warm decay, and open treble ring.
     - `LICHEN`: Photobiont harmonic bloom with shimmering octave & fifth resonance, longer singing sustain, and choral glow.
     - `CORDYCEPS`: High-tension metallic harpsichord/kalimba attack with snappy transients, inharmonic partials ($1.0\times, 2.756\times, 5.404\times, 8.933\times$), and initial 15-cent pitch bite.
     - `MUTUAL`: Liquid guttation droplet release pop with water meniscus chirp and dual-detuned chorus wobble ($\pm 7\text{ cents}$).
   - Lifted bus gain to `0.55`, string bus to `0.58`, channel strip voicing to `+2 dB`, auto-strum velocity to `0.38`.
   - Prioritized active chord pitch classes on ballistospore puffs and vitrine swipes to eliminate semitone rubs.
4. Muscaria Transducer & Whole-Ensemble Hallucination Dynamics (`src/muscaria.mjs`, `src/schedulers.mjs`, `src/app.mjs`, `tests/muscaria.test.mjs`):
   - Differentiated trip depths via `TRIP_DEPTH_CONFIGS`: `MILD` ($\pm 12\text{¢}$ warp, $\pm 24\text{ms}$ delay, $\pm 20\%$ filter), `DEEP` ($\pm 28\text{¢}$ warp, $\pm 50\text{ms}$ delay, $+0.12$ feedback swell, $\pm 45\%$ filter), and `TRANSCENDENT` ($\pm 60\text{¢}$ warp, $\pm 95\text{ms}$ delay, $+0.22$ feedback swell, $\pm 75\%$ filter).
   - Enabled whole-ensemble entheogenic trip in `scheduleEnsembleStep()`: smooth Doppler delay line modulation via `setTargetAtTime`, delay feedback swell, parlor chamber reverb expansion, resonant creature filter sweeps, vocal choir formant liquefaction (`formantMultiplier` in `scheduleChantStep`), and master tape wow detune on lead voice (`tripWarpCents` in `scheduleNote`) and tonic drones.
   - Enforced 100% modal closure and chord tone agreement in `generatePlantWaveNotes`, eliminating semitone clashes.
5. Assets & Housekeeping:
   - Restamped `ASSET_VERSION` (`9035c44a14fc`) via `tools/stamp_assets.mjs`.
   - Recorded D-100 in `docs/DECISIONS.md`.
   - Updated `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, and `docs/HANDOFF.md`.
   - Archived Session 90 to `docs/archive/sessions.md` to preserve the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 305/306 checks passed (305 passed, 1 skipped).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.
- Zero-dependency boundary and phrase determinism contracts fully preserved.
