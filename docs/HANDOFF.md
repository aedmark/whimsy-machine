# Session Handoff

Read this first when resuming work. Protocol: [AGENTS.md](../AGENTS.md). Plan: [ROADMAP.md](../ROADMAP.md). Architecture: [ARCHITECTURE.md](ARCHITECTURE.md). Decisions: [DECISIONS.md](DECISIONS.md). Tests: [TESTING.md](TESTING.md).

## Current state

_Last updated: 2026-10-28, session 95, on `main`._

- Phases 1–9 Complete: Esoteric engines (Plates I–VI), 22 Inform 7 rulebooks, FM-1 hardware firmware, studio WAV and stem exports, autopoietic dynamics (D-001–D-088).
- Phase 10: BoneAmanita Resonances (P10-01–P10-03, D-089–D-091) complete: Aetheric Bone Theremin, Bone Forge Beat Machine, and BioParasite Spore Harp.
- Harmonic Closure & Somatic Decoupling (D-092, D-093): 100% modal consonance for mycelium and chord-aware spore harp strumming.
- Ten-Channel Mixer Matrix & Rogue Audio Elimination (D-094): Dedicated `forge` and `harp` strips, strict "no bus bypasses its strip" routing, total silence on console mute (clockwork tick and crackle ducking), bidirectional UX binding, 11-stem ZIP exports, and legacy session migration.

**Where things stand:** P1–P7, P8-01 through P8-05, P8-15 through P8-18, Phase 9, Polish Pass (D-088), Phase 10, Modal Scale Closure (D-092), Somatic Bus Decoupling & Consonance (D-093), and Ten-Channel Console Integration & Rogue Audio Elimination (D-094) are fully implemented and verified! Version 1.5.0. 280/280 automated tests passing. Zero-dependency web core and portable desktop/firmware ecosystem intact.

**Verified** (2026-10-28, session 95, local Linux environment)

| Suite | Result |
| --- | --- |
| `node --test tests/*.test.mjs` | **280/280 behavioral and structural checks passed** |
| `python3 tools/check_docs.py` | **0 errors, 0 warnings across 14 documents** |
| `python3 tools/manual.py check docs/manual.json` | **6 sections, 44 entries, 0 errors, 0 warnings** |

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
- The Fun Machine accompanist and Loop Machine (`#fun-machine-engine`, `#looper`, D-029, D-039, P5-26, D-045, D-046, D-052): hold a key on the 13-key manual or `[A..K]` and choose SWELL, ARPEGGIO, or PROGRESSION; the pad, arpeggio, and lead play in the band's rhythm, the band follows the chord, and the LOLCODE lead ducks. The Loop Machine records takes into stacked loops (up to 4 layers, 16 loops, 32 passes) with real-time audible clock latching, layer isolation during new loop recording, armed downbeat sync, a 1-loop count-in pass, a mechanical clockwork metronome, an interactive 12-step tracker ribbon, auto-advancing STEP REC, downbeat anticipation latching, and musical section roles (Intro, Main, Bridge, Outro) with live Outro cueing and full linear offline export to WAV, stems, and MIDI.
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
2. Hands-on review of the four-wing layout (D-027) in Safari and Firefox.
3. Tag v1.0.0 semantic release.

## Open questions

- None (Q-001 answered by D-065).

## Session log

### Session 94 (2026-10-28): Somatic Audio Bus Decoupling, Mycelium Modal Consonance, and Channel Voicing Rebalance (D-093)

**Contributor:** Antigravity with maintainer direction

**Goal:** Address user feedback that the Mycelium plate is way too loud by default, its generations clash with the rest of the ensemble, and that the new beat machine and harp do not need to be lumped into those channels (D-093).

**Done:** Decoupled Bone Beat and Spore Harp into dedicated somatic buses, rebalanced Mycelium channel voicing to unity (0 dB), snapped mycelial events to creature scale (0% out-of-scale tones), and implemented chord-aware Spore Harp auto-strumming. 280/280 automated tests pass.

**Changed:**
1. Somatic Audio Bus Decoupling (`src/ensemble.mjs`, `src/app.mjs`):
   - Added `forgeBus` (gain 0.70) and `sporeHarpBus` (gain 0.62) to `buildEnsembleGraph()`. Both connect to master compressor and chamber reverb send (`parlorReverbFilter`); `sporeHarpBus` also feeds tempo delay.
   - Decoupled Bone Forge percussion from Plate I (`beatBus`) and Spore Harp plucks from Plate VI (`fungalBus`), freeing Plate I for pure Malbolge drums and Plate VI for pure bio-acoustic environmental sonification.
2. Mycelium Plate Voicing & Balance:
   - In `src/ensemble.mjs`, reset `CHANNEL_VOICING_DB.fungal` from +4 dB to 0 dB (unity gain).
   - In `src/schedulers.mjs`, scaled Bracket Conk woody shelf resonance from 0.7 to 0.35 and droplet pings from 0.45 to 0.22.
3. Modal Scale Closure for Mycelium Events (`src/mycelium.mjs`):
   - Replaced quarter-tone `rootAnchor` exponent (`/ 24`) with 12-TET semitone intervals (`/ 12`).
   - Implemented `snapToScale(freq, score)`, clamping and quantizing tone event frequencies (`spikes`, `drops`, bandpass filters) to the nearest scale pitch class of the creature. Out-of-scale tone events dropped from 72.7% to 0.0%.
4. Chord-Aware Spore Harp Auto-Strumming (`src/spore-harp.mjs`):
   - In `scheduleSporeHarpStep`, passed active chord and filtered string selection to chord pitch classes (`chord.pitchClasses`), eliminating semitone rubs.
   - Scaled auto-strum velocity to a gentle background arpeggio (0.35), click transient to 0.09 * vel, and string bus gain to 0.55. Full velocity (0.85) preserved for direct vitrine swiping.
5. Verification & Tests:
   - Added test in `tests/mycelium.test.mjs` verifying 100% modal scale closure for mycelium tone events.
   - Added test in `tests/spore-harp.test.mjs` verifying chord-aware consonant string selection in `scheduleSporeHarpStep`.
   - Updated `tests/transport.test.mjs` asserting `forgeBus` and `sporeHarpBus` destination routing and 0 dB fungal voicing.
   - Re-stamped asset version via `tools/stamp_assets.mjs`.

### Session 93 (2026-10-28): Modal Scale Closure & Consonant Chimes for Creature Variations (D-092)

**Contributor:** Antigravity with maintainer direction

**Goal:** Resolve user observation that the Befunge-93 chord organ and Piet/FRACTRAN chimes drift into an a-tonal pattern that conflicts with the other instruments every few measures (D-092).

**Done:** Diagnosed root cause, implemented modal scale closure across variation moves, filtered microtonal quarter-tone overtones in creature chimes, and verified zero regressions across 278/278 tests.

**Changed:**
1. Root Cause Diagnosis:
   - In `CREATURE_GENRE`, `buildCreatureBook()` constructs the written spine strictly within `scalePitchClasses(score)`. However, `varySpine()` in `src/variation.mjs` was applying unrestricted genre substitution moves (`tritone_substitution` at `root + 6`, `secondary_dominants` at `root + 7`, and `modal_borrowing` with $\flat\text{VI}/\flat\text{VII}/\text{iv}$) copied from the borrowed character across passes 1..3. In simulation, 23.1% of chord steps on passes 1..3 forced foreign notes outside the creature's scale into the chord, directly driving the Befunge chord organ off-scale.
   - `conductChimes` in `src/conductor.mjs` selected overtone ratios from the borrowed genre's overtone table. When borrowing from jazz or blues genres, ratios like $11/8$ (551 cents $\approx 49$ cents flat of tritone), $13/8$ (840.5 cents $\approx 40.5$ cents sharp of minor 6th), $7/6$ (267 cents $\approx 33$ cents flat of minor 3rd), and $7/4$ (968.8 cents $\approx 31.2$ cents flat of minor 7th) introduced abrasive microtonal quarter-tone beating against 12-TET instruments.
2. Modal Scale Closure (`src/variation.mjs`, `src/conductor.mjs`):
   - Added `scale` parameter to `varySpine()`.
   - Constrained all substitution, secondary dominant, borrowing, and cadence moves with `fitsScale(cand) => !scale || cand.pitchClasses.every((pc) => scale.includes(pc))`.
   - In `src/conductor.mjs`, passed `creatureScale` when `activeGenre === CREATURE_GENRE`. Out-of-scale chord steps on passes 1..3 dropped from 23.1% to 0.0%.
   - Standard Inform 7 genres pass `scale = null`, maintaining 100% byte-for-byte fidelity with the 22 Inform 7 genre fixtures in `tests/fixtures/variations-golden.json`.
3. Consonant Chime Overtones (`src/conductor.mjs`):
   - In `conductChimes`, filtered `book.overtones` for `CREATURE_GENRE` to ratios with $\le 25$ cents deviation from 12-TET.
4. Testing & Verification:
   - Added test in `tests/creature-rulebook.test.mjs` verifying modal closure and consonant chime intervals across all 4 harmonic passes for 50 creatures (200 passes).
   - All 278/278 automated tests pass.

### Session 92 (2026-10-28): The BioParasite Spore Harp, Symbiotic Hyphal Strings, and Vitrine Swiping (P10-03, D-091)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Candidate 4 of Phase 10: The BioParasite Spore Harp (*Symbiotic Hyphal Plucks*) inspired by BoneAmanita's `BioParasite` (`~/PycharmProjects/BoneAmanita/spores/biome.py`) (P10-03, D-091).

**Done:** All parts implemented and verified under D-091. P10-03 marked complete. 277/277 tests pass.

**Changed:**
1. State & Symbiosis Model (`src/spore-harp.mjs`, `tests/spore-harp.test.mjs`):
   - Created pure acoustic string harp model tracking 8 hyphal strings (`hyphalStrings`), symbiosis mode (`SILK`, `LICHEN`, `CORDYCEPS`, `MUTUAL`), dampening, activity counter, and vitrine coordinates.
   - Hyphal strings tuned across creature scale degrees in concert harp register (C3–C5, MIDI 48..72) with organic inharmonic detune factors and string stiffness coefficients.
   - Symbiosis modes map to BoneAmanita biological behaviors:
     - `SILK`: Chitin-sheathed pure harmonic plucks with natural damping.
     - `LICHEN`: Photobiont harmonic fifth resonance swelling behind each pluck.
     - `CORDYCEPS`: Inharmonic stiff partials with parasitic pitch bend and chitin scrape.
     - `MUTUAL`: Guttation water-drop meniscus pop on string release with crystalline resonance.
   - Implemented geometric segment intersection check (`checkStringIntersection`) using robust 2D orientation tests and distance clamping for tactile vitrine swiping.
2. Web Audio Acoustic Physical String Pluck Synth (`src/spore-harp.mjs`):
   - Chitin click impulse transient synthesized via high-frequency enveloped noise burst.
   - Dual detuned string core oscillators with exponential damping per string tension and length.
   - High-order sympathetic inharmonic overtone partials modulated by string stiffness and symbiosis mode.
   - Damped lowpass bio-acoustic string filter tracking pluck velocity and decaying string displacement.
3. Vitrine Canvas Rendering (`src/vitrine-canvas.mjs`):
   - Added `drawSporeHarpStrings` rendering 8 organic hyphal string threads spanning the apparition vitrine.
   - Animated decaying standing-wave visual displacement oscillating at string fundamental pitch.
   - Glowing spore dust particles shedding from vibrating strings along wave crests.
4. UI & Transport Integration (`index.html`, `styles.css`, `src/app.mjs`):
   - Added `#spore-harp-bar` directly beneath `#theremin-bar` in the Vitrine pedestal with `#spore-harp-toggle`, `#spore-harp-strum`, `#spore-harp-symbiosis`, and `#spore-harp-telemetry`.
   - Wired into `currentTransport.fungalBus` (Fungal mixer channel strip 6, chamber reverb send, master compressor, offline WAV stem exports).
   - Wired touch/pointer dragging across vitrine to trigger string plucks via segment collision.
   - Flying ballistospores puffing from vitrine taps collide with and pluck hyphal strings.
   - Integrated into `scheduleFungalBioStep` for automatic creature loop step arpeggiation.
5. Assets & Housekeeping:
   - Added `"spore-harp.mjs"` to `MODULES` in `index.html` boot script and restamped `ASSET_VERSION` via `node tools/stamp_assets.mjs`.
   - Updated `AGENTS.md`, `ROADMAP.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, `docs/DECISIONS.md`, and `docs/HANDOFF.md`.
   - Archived Session 82 to `docs/archive/sessions.md` to preserve the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 277/277 tests passing.
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.

**Next session should start with:** User review of Phase 10 instruments or next roadmap phase.

### Session 91 (2026-10-28): The Bone Forge & Crucible Beat Machine, Physical Percussion Synthesizers, and Somatic Dynamics (P10-02, D-090)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Candidate 2 of Phase 10: The Bone Forge & Crucible Beat Machine (*The Bone Beat Machine*) inspired by BoneAmanita's `TheForge` and `TheCrucible` (P10-02, D-090).

**Done:** All parts implemented and verified under D-090. P10-02 marked complete. 270/270 tests pass.

**Changed:**
1. State & Somatic Model (`src/bone-beat.mjs`, `tests/bone-beat.test.mjs`):
   - Created pure physical acoustic percussion model tracking Heat (°C, ambient 24°C, overheat 80°C), Voltage (0.0 to 20.0V), Dampeners (default 3), Instability, and Status (`TEMPERED`, `OVERHEAT`, `QUENCHED`, `SURGE`).
   - Kinetic strikes accumulate thermal energy and voltage excitation.
   - High voltage surges (> 14.0V) are absorbed by Crucible Dampeners, reducing voltage and damping rhythm.
   - Overheat conditions (> 80°C) trigger automatic mineral brine steam quench on downbeats, cooling the forge and restoring dampeners.
   - Deterministic polyrhythmic pattern composition (`composeBoneBeat`) generating Euclidean and cross-rhythm masks across 12-step and 16-step straight grid metres based on creature `beatMode`.
2. Physical Acoustic Percussion Synthesizers (`src/bone-beat.mjs`):
   - *Struck Bone (heavy):* Keratin pitch-drop click (1400 -> 380 Hz) and 210 Hz marrow cavity resonance.
   - *Resonant Mineral Plate (stone):* Subterranean lithophone gong thud utilizing Bessel plate mode partials (1.0x, 2.29x, 3.42x over 82 Hz fundamental).
   - *Tempered Brass Anvil (kinetic):* Piercing smithy pings with ringing metallic partials (1680 Hz, 2940 Hz, 4410 Hz).
   - *Quenching Steam (quench):* Hot vapor release synthesizing white noise swept through a resonant bandpass filter (5800 -> 1600 Hz).
3. UI & Transport Integration (`index.html`, `styles.css`, `src/app.mjs`):
   - Added `#bone-forge-bar` inside Plate I (`#beat-engine`) with `#bone-beat-toggle`, `#bone-beat-strike`, `#bone-beat-quench`, and live `#bone-beat-telemetry`.
   - Wired into `scheduleBeatStep`, routing through `currentTransport.beatBus` into mixer console Plate I strip, master compressor, parlor reverb send, and offline WAV loop / stem exports.
   - Coupled vitrine taps and retaliation strikes directly to forge strikes and excitation.
   - Isolated offline render states via `boneBeatModel: createBoneBeatModel(boneBeatModel)` on `offlineTransport` to avoid mutating live thermal parameters.
4. Assets & Housekeeping:
   - Added `"bone-beat.mjs"` to `MODULES` in `index.html` boot script and restamped `ASSET_VERSION` via `node tools/stamp_assets.mjs`.
   - Updated `AGENTS.md`, `ROADMAP.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, `docs/DECISIONS.md`, and `docs/HANDOFF.md`.
   - Archived Session 79 to `docs/archive/sessions.md` to preserve the 10-session handoff window.

**Verified:**
- `node --test tests/*.test.mjs`: 270/270 tests passing.
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.

**Next session should start with:** P10-03 The BioParasite Spore Harp (*Symbiotic Hyphal Plucks*) or user review of The Bone Forge & Crucible Beat Machine.

### Session 90 (2026-10-28): The Aetheric Bone Theremin, BoneAmanita Resonances, and Vitrine Electrophone Synthesis (P10-01, D-089)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Candidate 1 of Phase 10: The Aetheric Bone Theremin (*The Thereminist / GLASS*) inspired by BoneAmanita (`~/PycharmProjects/BoneAmanita`), adding Candidate 3 (The Bone Beat Machine) and Candidate 4 (The BioParasite Spore Harp) to the roadmap (P10-01, D-089).

**Done:** All parts implemented and verified under D-089. P10-01 marked complete. 261/261 tests pass.

**Changed:**
1. State & Metabolic Model (`src/theremin.mjs`, `tests/theremin.test.mjs`):
   - Created pure physical-metabolic state model with dual virtual antennas: horizontal X-axis maps pitch across a 3-octave span defaulting to continuous analog glide (`scaleSnap: false`) with 40 ms portamento, plus optional creature scale degree quantization; vertical Y-axis maps proximity/gain.
   - Modeled BoneAmanita somatic transitions calibrated to elapsed delta time: kinetic resin flow, stillness dwell with a 2.5s grace period before calcified slag ($0..1.0$) accumulates, turbulent flick melt ($> 0.32$), fluid note transitions without stochastic burst pings, trapped-in-amber muffling at threshold $20.0$, and critical collapse at threshold $100.0$.
2. Web Audio Synthesizer Graph (`src/theremin.mjs`, `src/app.mjs`):
   - Single warm singing triangle carrier oscillator and phase-locked sub-octave foundation ($0.5\times$, zero beating tremolo!).
   - Static soft-clipping `WaveShaperNode` with smooth `slagDrive` input gain ramping ($1.0\dots 3.2$), eliminating real-time buffer reallocation and audio clicks.
   - Resonant `BiquadFilterNode` with vacuum-tube warmth and dynamic amber muffling.
   - Stereo `StereoPannerNode` tracking vitrine horizontal location.
   - Multi-partial crystalline shatter tines ($2.76\times, 3.52\times, 4.18\times$ ratios) reserved strictly for critical collapse overloads.
   - Dedicated master gain output routing adhering to mute, local control, and master volume.
3. Canvas Overlays & DOM Pedestal Controls (`src/vitrine-canvas.mjs`, `index.html`, `styles.css`, `src/app.mjs`):
   - Apparition Vitrine renders amber-golden pitch and volume antenna rays, glowing vacuum-tube node aura, dynamic branching calcification filaments, and faceted amber gem crystallization ring.
   - Added `#theremin-bar` with `#theremin-toggle`, `#theremin-scale-snap`, and `#theremin-status` telemetry readout.
   - Continuous audio interaction updates during vitrine pointermove, drag, and animation frames.
4. Documentation & Roadmap:
   - Added Phase 10 to `ROADMAP.md` (P10-01 marked complete, P10-02 and P10-03 added).
   - Recorded D-089 in `docs/DECISIONS.md`.
   - Updated `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`, and `docs/HANDOFF.md`.
   - Archived Session 78 to `docs/archive/sessions.md`.

**Verified:**
- `node --test tests/*.test.mjs`: 261/261 checks passed (including 6 unit tests in `tests/theremin.test.mjs`).
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.
- Restamped `ASSET_VERSION` via `node tools/stamp_assets.mjs`.

**Next session should start with:** P10-02 The Bone Forge & Crucible Beat Machine (*The Bone Beat Machine*), modeling struck bone, resonant mineral plates, tempered brass, and quenching steam.

### Session 89 (2026-10-28): Codebase Polish, Dead Code Pruning, 60 FPS Attractor Drawing Optimization, and DOM Wiring Consolidation (D-088)

**Contributor:** Antigravity with maintainer direction

**Goal:** Conduct an exhaustive polish and bugfix pass across the repository before proposing the next roadmap phase: prune orphaned code blocks and dead CSS, eliminate per-frame 60 FPS garbage generation in Canvas attractor drawing, cache recurring DOM queries during playback, and align UI selectors (D-088).

**Done:** All parts implemented and verified under D-088. 255/255 tests pass.

**Changed:**
1. Zero-Allocation Canvas Attractor Rendering (`src/autopoiesis.mjs`, `src/vitrine-canvas.mjs`):
   - Inlined Clifford strange attractor recurrence in `generateAttractorPoints()`, eliminating array destructuring and 440 small array allocations per frame.
   - Reused static `attractorBuffer` in `src/vitrine-canvas.mjs` to eliminate `Float32Array` heap allocations.
   - Batched 420 particle drawing operations into a single `beginPath()` -> `rect()` -> `fill()` path call, eliminating 420 individual canvas fill operations per frame.
   - Added `Math.max(1, ...)` zero-dimension guards to `resize()` and backdrop gradient in `OracleVision`.
2. Looper & Keep Wing DOM Performance & Selector Alignment (`src/app.mjs`, `styles.css`):
   - Cached looper, cabinet, and Keep Wing segmented deck controls in top-level `elements = { ... }` in `src/app.mjs`, replacing inline `document.querySelector` lookups during playback steps.
   - Fixed Keep Wing panel CSS selector to `.wing-keep:not([hidden])` in `styles.css`.
   - Connected `.looper-role-tag` to looper tile badges and aligned Herbarium comparison trait classes (`.herbarium-compare-label`, `.herbarium-compare-row.is-match`).
3. Dead Code & Orphaned Block Removal (`src/app.mjs`, `src/lolcode.mjs`, `styles.css`, `tests/`):
   - Removed orphaned `const RHYTHMS` table in `src/app.mjs`.
   - Pruned 21 unused import symbols in `src/app.mjs` and unused imports across 7 test suites.
   - Removed dead `consume()` helper in `src/lolcode.mjs`.
   - Removed stale `#fun-machine-rec`, `.fun-machine-actions`, and `.transport-hint` selectors from `styles.css`.
4. Documentation & Verification:
   - Restamped `ASSET_VERSION` in `index.html` via `tools/stamp_assets.mjs`.
   - Recorded D-088 in `docs/DECISIONS.md`.
   - Updated `docs/CHANGELOG.md` with version 1.4.4.
   - Archived Session 77 to `docs/archive/sessions.md` to maintain exactly 10 handoff log entries.
   - Updated `docs/HANDOFF.md`.

**Verified:**
- `node --test tests/*.test.mjs`: 255/255 checks passed.
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.
- Zero-dependency boundary and phrase determinism contracts fully preserved.

**Next session should start with:** Proposing the next roadmap phase (e.g., public hosting P6-01, new esoteric engine or synthesis expansions) based on maintainer goals.

### Session 88 (2026-10-28): Restored 12-Step Triplet Metre Default for Natural Parlor Arrangements (D-087)

**Contributor:** Antigravity with maintainer direction

**Goal:** Restore the 12-step compound shuffle metric grid as the default on fresh runs per maintainer direction, ensuring newly summoned creatures and initial loads embody the natural swing the generative score, motifs, and esoteric VM scripts were originally arranged around.

**Done:** Default restored, static UI aligned, and automated tests passing under D-087. 255/255 automated checks pass.

**Changed:**
1. Default Grid Steps (`src/tuning.mjs`, D-087):
   - Set `DEFAULT_GRID_STEPS = 12` (preserving `GRID_STEPS_OPTIONS = [12, 16]`).
2. Static Shell Alignment (`index.html`, D-087):
   - Set `#transport-grid-steps` static button state to `12 STEPS (TRIPLET)` with `aria-pressed="false"`.
   - Set `#transport-position` static readout to `STEP -- / 12`.
   - Restamped `ASSET_VERSION` to `348c06057dfb` via `tools/stamp_assets.mjs`.
3. Unit Testing & Decisions (`tests/metre.test.mjs`, `docs/DECISIONS.md`, `docs/CHANGELOG.md`):
   - Updated `tests/metre.test.mjs` asserting `DEFAULT_GRID_STEPS === 12`.
   - Recorded D-087 in `docs/DECISIONS.md`.
   - Archived Session 76 to `docs/archive/sessions.md` to maintain exactly 10 handoff log entries.

### Session 87 (2026-10-27): Ensemble Timbral Expansion Stage 2 — Plates I–V Archetype Synthesis Overhaul (P8-18, D-086)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Stage 2 of the ensemble timbral expansion (P8-18, D-086) per maintainer direction, overhauling the per-step Web Audio schedulers for Plates I–V in `src/schedulers.mjs` to unlock rich tonal, timbral, and acoustic variance across all eight respective archetypes.

**Done:** All Stage 2 plate archetypes implemented, tested, and verified under D-086. 255/255 automated tests passing.

**Changed:**
1. Malbolge Beat Machine (`src/schedulers.mjs`, D-086):
   - Implemented 8 distinct kick, snare, and transient profiles driven by `score.beatMode` and `score.beatDensity`.
   - Added triangle transient click oscillator (1450 Hz -> 120 Hz) for Automaton March (mode 0), Ossuary Polyrhythm (mode 3), and Telegram Clatter (mode 4).
   - Added deep cavernous sub boom (28 Hz with 0.32s decay) and warm 780 Hz snare bandpass (Q 1.8) for Seance Waltz (mode 1).
   - Added punchy triangle kick drop with tight 0.14s decay and 2200 Hz woodblock snare (Q 3.6) for Pendulum Galop (mode 2).
   - Added ultra-snappy 3400 Hz metallic snare crack (Q 5.2, 42 ms decay) for Telegram Clatter (mode 4).
   - Added heavy 350 ms bell kick drop (startFreq 1.6x base) with lower resonant snare body for Bell-Tower Toll (mode 5).
   - Added step-modulated undulating snare bandpass filter center (950 +/- 350 Hz) for Ectoplasm Shuffle (mode 6).
2. Brainfuck Walking Bass (`src/schedulers.mjs`, D-086):
   - Synthesized 8 bass archetype characters driven by `score.bassMode`.
   - Added upright double-bass fingerboard acoustic pluck transient (sine at 3.5x freq decaying in 20 ms) for Walking Cellar (mode 0).
   - Added 303 resonant saw sweep with high filter Q (3.8 normal, 5.2 accented) and aggressive cutoff opening up to 3200 Hz for Acid Catacomb (mode 1).
   - Added sub unison upper oscillator (`freq * 1`) and gentle 1.2 Q lowpass clamped below 420 Hz for clean room rumble in Subterranean Dub (mode 2).
   - Added snappy plucky filter bite with fast 0.38x step duration and quick attack for Crypt Arpeggiator (mode 4).
   - Added slow-attack bowed envelope (45 ms) with rich saw upper partials for Ghost Bow (mode 6).
3. Befunge-93 Harmony Organ (`src/schedulers.mjs`, D-086):
   - Mapped 8 organ stop timbres and registrations driven by `score.harmonyMode` across triangle, sawtooth, square, and sine waveforms.
   - Added bright sawtooth lead voice with snappy 6 ms attack for Harpsichord Pinball (mode 1).
   - Added slow 55 ms swell attack and scheduled an added 4' pipe stop oscillator at the upper octave (`freq * 2`) for Cathedral Swell (mode 2).
   - Added fast 6 ms plucked attack and scheduled a crystalline inharmonic stop oscillator at `freq * 2.76` for Clockwork Celesta (mode 3).
   - Configured hollow square/triangle registration for Phantom Calliope (mode 4) and ethereal pure sine triad for Glass Harmonica (mode 5).
4. Piet/FRACTRAN Chimes & Pad (`src/schedulers.mjs`, D-086):
   - Expanded 8 chime and pad modes driven by `score.chimeMode`.
   - Scheduled inharmonic overtone oscillator at `1.52 * bellFreq` with heavy metallic peak gain (0.45x) for Balinese Gamelan (mode 5).
   - Scaled pad filter cutoff dynamically with `score.chimeShimmer` (`shimmerBoost = (score.chimeShimmer - 50) * 4`), opening the spectral pad up to 3200 Hz.
5. Shakespeare Formant Choir (`src/schedulers.mjs`, D-086):
   - Modeled 8 dramatic vocal archetypes driven by `score.chantMode`.
   - Scheduled pink noise buffer source through a breath gain envelope connected into the glottal mix for aspirated air turbulence in Witches' Coven (mode 1) and Ariel's Spirit (mode 2).
   - Elevated formant frequencies by 1.25x (`formantShift * 1.25`) to model an ethereal high soprano vocal tract for Ariel's Spirit (mode 2).
   - Drove sawtooth glottal source oscillator up to 0.65 gain for VODER Synthesizer (mode 4).
   - Modulated formant filter Q dynamically with `score.chantFormant` (`resonanceBoost = (score.chantFormant - 25) * 0.04`).
6. Automated Verification (`tests/utterance-coherence.test.mjs`):
   - Added unit tests verifying distinct kick/snare frequency and decay profiles for beat modes 0, 1, 2, and transient clickers.
   - Verified bass modes 0, 1, 2 for upright plucks, 303 acid resonant sweeps, and sub dub weight.
   - Verified harmony modes 2 and 3 for cathedral 4' stops and celesta inharmonic overtone stops.
   - Verified chime mode 5 for gamelan inharmonic overtones and shimmer modulation.
   - Verified chant modes 1 and 2 for breath noise and soprano formant shift, plus formant resonance boost.
   - Suite total increased from 254 to 255 tests, all passing cleanly.

### Session 86 (2026-10-27): Ensemble Timbral Expansion Stage 1 — Lead Register Elevation & Mycelium Physical Modeling (P8-18, D-085)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Stage 1 of the ensemble timbral expansion (P8-18, D-085) per maintainer feedback, addressing two critical acoustic issues: (1) elevate the LOLCODE lead melody into singing register (C4–C6) with dynamic gate articulation, replace muddy `-12` sub-octave dragging voice stacks with shimmering overtones (`+12`, `+24`), and rebalance continuous drone sub-bass rumble so the melody soars cleanly; (2) ground the mycelium bio-acoustic droplet and spike fundamentals in `score.root` pitch class, and implement physical acoustic modeling in `scheduleFungalBioStep()` (woody shelf thumps for Bracket Conk, liquid surface-tension meniscus downward pitch chirps for falling guttation drops, and distinct acoustic decay envelopes across all eight sporophores).

**Done:** All Stage 1 improvements implemented, tested, and verified. 254/254 automated tests passing.

**Changed:**
1. Lead Synthesis & Articulation (`src/schedulers.mjs`, `src/ensemble.mjs`, `src/app.mjs`, D-085):
   - Lifted notes below middle C (MIDI 60) by +12 semitones into the singing register (C4–C6, MIDI 60–84).
   - Scaled attack/decay dynamics dynamically with `score.gate`: crisp gate produces punchy staccato pluck transients (5–12 ms) with clean note release, while legato gate produces smooth singing sustain.
   - Replaced sub-octave dragging layers (`{ interval: -12 }`) in `voiceStack()` with singing overtones: octave shimmer (`+12`), wide chorused octaves, and double-octave brilliance (`+24`), eliminating low-end mud while preserving consonance rules against raw unconducted fifths (`interval: 7`).
   - Rebalanced continuous drone sub-bass resting gain from 0.085 down to 0.045 in `src/ensemble.mjs` and `src/app.mjs`.
2. Mycelium Bio-Acoustic Grounding & Physical Modeling (`src/mycelium.mjs`, `src/schedulers.mjs`, D-085):
   - Anchored fundamental droplet and spike frequencies to `score.root` pitch class (`rootAnchor = 2 ** (((score.root % 12) - 6) / 24)`), ensuring different phrases and keys summon distinct bio-acoustic registers while preserving bloom tilt invariants.
   - Extended sporophore decay envelopes and added physical acoustic modeling: hollow woody shelf resonance thumps (85 Hz -> 45 Hz) for Bracket Conk (form 1), liquid surface-tension meniscus downward pitch chirps for falling guttation drops, and distinct acoustic decay envelopes across all eight sporophore forms.
3. Automated Verification (`tests/utterance-coherence.test.mjs`, `tests/mycelium.test.mjs`):
   - Added unit test asserting lead scheduler lifts low roots (30, 36, 48, 55) into singing register (>= MIDI 60) and confirms all voice stacks maintain non-negative intervals (`interval >= 0`).
   - Added unit test asserting mycelium fundamental frequencies shift deterministically with root pitch class across different keys while keeping decay and peak parameters strictly bounded across all eight forms.
   - Suite total increased from 252 to 254 tests, all passing with zero failures.

### Session 85 (2026-10-27): Phase 9 Autopoiesis & Fractal Dynamics (P9-01, P9-02, P9-03, D-083) and 16-Step Progression & Metre Synchronization (P8-17, D-084)

**Contributor:** Antigravity with maintainer direction

**Goal:** Implement Phase 9 (P9-01, P9-02, P9-03, D-083) bringing autopoiesis and fractal dynamics to the Whimsy Machine: pure, zero-dependency discrete graph and 1D boundary solver for Project Navi's Creative Determinant (Nelson Spence's nonlinear elliptic boundary value problem $L\Phi = a\|\nabla\Phi\| + b\Phi - c(\Phi^+)^p$ modeling Coherence, Contradiction, and Care), Picard iteration steady-state solver, spectral viability check, Clifford/De Jong strange attractor generators, Apparition Vitrine glowing attractor dust and multi-octave Weierstrass fractal fluting, Tonnetz harmonic vitality fields, Fibonacci delay cascades, and self-similar fractal arpeggiation. Address maintainer feedback on 16-step mode and 4/4 bar lock tempo feel (P8-17, D-084), fixing Fun Machine one-finger chord progression pad truncation at step 12 and ensuring equal-duration quarter-note beats across all metres.

**Done:** All parts implemented, documented, and verified. 252/252 automated tests pass.

**Changed:**
1. Mathematical Foundation (`src/autopoiesis.mjs`, P9-01, D-083):
   - Pure zero-dependency discrete graph representations (`createRingGraph`, `createTonnetzGraph`, `buildGraph`, `isValidGraph`).
   - Finite graph Laplacian $L$ with positive off-diagonals, symmetric adjacency, and boundary dissipation.
   - Forward-difference gradient norm $\|\nabla\Phi\|_i$ and nonlinear reaction term $b\Phi - c(\Phi^+)^p$.
   - Discrete Picard steady-state iteration with adaptive damping and convergence residual monitoring.
   - Spectral viability verification via Gershgorin disc and Rayleigh quotient approximations checking $\lambda_1(L - \text{diag}(b)) < 0$.
   - Clifford and De Jong strange attractor iteration with parameter derivation from phrase score (`attractorParamsFromScore`).
   - Tonnetz harmonic vitality evaluation (`computeTonnetzHarmonicField`), Golden-Ratio Fibonacci fractal delay cascades (`fibonacciDelayTaps`), and self-similar recursive arpeggio sequence generation (`fractalArpeggioSequence`).
2. Visual Morphogenesis (`src/vitrine-canvas.mjs`, P9-02, D-083):
   - Enhanced `fluxOffset` with multi-octave self-similar Weierstrass fractal fluting preserving topological radius clamping ($[0.38, 1.08]$).
   - Added `drawStrangeAttractorDust` rendering seed-deterministic Clifford strange attractor glowing particulate clouds inside `drawKineticCore`.
3. 16-Step Metre Alignment & Chord Progression Temporal Synchronization (P8-17, D-084):
   - `src/accompaniment.mjs`: Updated `strikeLength(performance, stepIndex)` to bound to `performance?.steps?.length ?? 12`, resolving the pad truncation bug where 16-step clock-synced chords cut off at step 12 (beat 3) instead of holding for all 16 steps of the bar. Parameterized `varyProgression(chords, key, genre, score, stride)` with `stride = stepsCount === 16 ? 4 : 3` to build a 16-chord spine in 16-step mode, preventing region chord wrap-around.
   - `src/conductor.mjs`: Parameterized `buildFunProgression(rootSemitone, quality, genre, tonicRoot, stepsCount = 12)` to generate 16 steps (4 steps per region) in 16-step mode, locking lead melody offsets to region chord boundaries.
   - `src/tuning.mjs`: Added `effectiveRhythmTemplate(rhythmIndex, stepsCount = 12, barLock44 = false)` with length-4 symmetric beat templates (`RHYTHMS_16`) and length-3 triplet templates (`RHYTHMS_LOCKED_12`), guaranteeing equal quarter-note beat durations ($60 / \text{BPM}$ seconds) and zero metric loop drift across both 16-step straight time and 12-step bar-locked time.
   - `src/app.mjs`: Retuned delay echo line across tempo, genre, bar lock, and grid changes using scaled step unit duration.
4. System Integration & Verification:
   - Added `"autopoiesis.mjs"` to `MODULES` in `index.html`.
   - Stamped asset version to `19e8cc68592b` via `tools/stamp_assets.mjs`.
   - Created `tests/autopoiesis.test.mjs` with 7 rigorous test suites; extended `tests/utterance-coherence.test.mjs` with 16-step strike length and quarter-note beat symmetry tests (252/252 automated tests passing).
   - Added `autopoietic-fractal-dynamics` to `docs/manual.json` (44 entries, 0 warnings) and rebuilt `manual.html`.
   - Recorded D-083 and D-084 in `docs/DECISIONS.md`, updated `ROADMAP.md` (P9-01, P9-02, P9-03, P8-17), `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/CHANGELOG.md` (v1.4.0, v1.4.1), and archived Session 73 in `docs/archive/sessions.md`.

**Verified:**
- `node --test tests/*.test.mjs`: 252/252 checks passed.
- `python3 tools/check_docs.py`: 0 errors, 0 warnings across 14 documents.
- `python3 tools/manual.py check docs/manual.json`: 6 sections, 44 entries, 0 errors, 0 warnings.


