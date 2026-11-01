import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { buildFunChord, buildFunProgression } from "../src/conductor.mjs";
import { GENRES } from "./install-rulebooks.mjs";
import { composeBeat, cycleBeatStep } from "../src/malbolge.mjs";
import { composeChant, cycleChantCell } from "../src/shakespeare.mjs";
import { MIXER_CHANNEL_IDS, createMixerState, mixerStateFromChannels, setFader, setPan, toggleMute, toggleSolo } from "../src/mixer.mjs";
import { composeScore } from "../src/score.mjs";
import {
  MAX_PRESETS,
  MAX_SESSION_BYTES,
  SESSION_FORMAT,
  SESSION_VERSION,
  SessionError,
  BANK_FORMAT,
  BANK_VERSION,
  duplicatePreset,
  emptyPresetStore,
  parsePresetBank,
  parsePresetStore,
  parseSession,
  readPresetStoreFrom,
  removePreset,
  renamePreset,
  serializePresetBank,
  serializePresetStore,
  serializeSession,
  upsertPreset,
  validateSession,
  writePresetStoreTo,
} from "../src/session.mjs";
import { applyScoreOverrides, midiToFrequency, referencePitch, setReferencePitch } from "../src/tuning.mjs";

const root = new URL("../", import.meta.url);

function sampleSession(overrides = {}) {
  const channels = {};
  for (const id of MIXER_CHANNEL_IDS) {
    channels[id] = { fader: 80, pan: 0, muted: false, soloed: false };
  }
  channels.chant = { fader: 92, pan: -35, muted: false, soloed: true };
  const plates = {};
  for (const id of ["beat", "bass", "harmony", "chime", "chant"]) plates[id] = { mutation: 0, cellCycles: Array(12).fill(0) };
  plates.beat = { mutation: 2, cellCycles: [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2] };
  return {
    format: SESSION_FORMAT,
    version: SESSION_VERSION,
    engineVersion: 1,
    phrase: "the moon owes me five dollars",
    tempo: 96,
    volume: 70,
    genre: "smoky_jazz",
    strictness: 10,
    varied: true,
    rootOverride: null,
    scaleOverride: null,
    referencePitch: 440,
    barLock: false,
    gridSteps: 12,
    acoustics: { enabled: true, level: 40, crackle: false, reverb: true, ticks: true },
    funMachine: { style: "arpeggio", voice: "glass_harmonica", octave: 0 },
    plates,
    mixer: channels,
    song: { loops: [{ repeats: 2, layers: [[{ key: 7, style: "progression", voice: "creature", octave: 0 }, ...Array(11).fill(null)], [null, null, { key: 12, style: "arpeggio", voice: "music_box", octave: 0 }, ...Array(9).fill(null)]] }] },
    somatic: {
      sporeHarp: { symbiosis: "silk", tension: 1.0 },
      muscaria: { targetMode: "dormant", tripDepth: "deep" },
      theremin: { scaleSnap: true },
    },
    recorder: { wavBitDepth: 16, autoMidi: true },
    herbarium: { pinned: false, specimen: null },
    locks: {},
    ...overrides,
  };
}

// An older-format sample: versions before 9 carry no somatic/recorder/herbarium,
// versions before 8 carry no octave, versions before 7 carry no engineVersion/overrides,
// versions before 5 carry no voices, and versions before 4 no song.
function olderSession(version, overrides = {}) {
  const stripV9 = (s) => {
    delete s.somatic;
    delete s.recorder;
    delete s.herbarium;
    delete s.locks;
    return s;
  };
  const stripV8 = (s) => {
    stripV9(s);
    if (s.funMachine && "octave" in s.funMachine) delete s.funMachine.octave;
    if (s.song?.loops) {
      s.song = {
        loops: s.song.loops.map((loop) => ({
          ...loop,
          layers: loop.layers.map((take) => take.map((slot) => {
            if (!slot) return null;
            const copy = { ...slot };
            delete copy.octave;
            return copy;
          })),
        })),
      };
    }
    return s;
  };
  const stripV7 = (s) => {
    stripV8(s);
    delete s.engineVersion;
    delete s.rootOverride;
    delete s.scaleOverride;
    delete s.referencePitch;
    delete s.barLock;
    delete s.gridSteps;
    return s;
  };
  if (version === 8) {
    return stripV9(sampleSession({ version, ...overrides }));
  }
  if (version === 7) {
    return stripV8(sampleSession({ version, ...overrides }));
  }
  if (version === 6) {
    return stripV7(sampleSession({ version, ...overrides }));
  }
  if (version === 5) {
    const session = stripV7(sampleSession({ version, ...overrides }));
    delete session.varied;
    return session;
  }
  const session = stripV7(sampleSession({ version, funMachine: { style: "arpeggio" }, ...overrides }));
  delete session.varied;
  if (version === 4) {
    session.song = { loops: session.song.loops.map((loop) => ({ ...loop, layers: loop.layers.map((take) => take.map((slot) => slot && { key: slot.key, style: slot.style })) })) };
  } else {
    delete session.song;
  }
  return session;
}

function rejectsAt(value, path) {
  assert.throws(() => validateSession(value), (error) => error instanceof SessionError && error.path === path, path);
}

test("a session round-trips through its .fun text unchanged", () => {
  const session = sampleSession();
  const text = serializeSession(session);
  assert.deepEqual(parseSession(text), validateSession(session));
  assert.deepEqual(JSON.parse(text), session);
  assert.ok(Object.isFrozen(parseSession(text).plates.beat.cellCycles));
});

test("session validation rejects anything outside the allowlist, naming the field", () => {
  rejectsAt({ ...sampleSession(), extra: 1 }, "session.extra");
  const missing = sampleSession();
  delete missing.tempo;
  rejectsAt(missing, "session.tempo");
  rejectsAt(sampleSession({ format: "something-else" }), "session.format");
  rejectsAt(sampleSession({ version: 10 }), "session.version");
  rejectsAt(sampleSession({ rootOverride: 12 }), "session.rootOverride");
  rejectsAt(sampleSession({ scaleOverride: 8 }), "session.scaleOverride");
  rejectsAt(sampleSession({ referencePitch: 400 }), "session.referencePitch");
  rejectsAt(sampleSession({ engineVersion: 0 }), "session.engineVersion");
  rejectsAt(sampleSession({ song: { loops: [{ repeats: 9, layers: [[{ key: 0, style: "swell" }, ...Array(11).fill(null)]] }] } }), "session.song.loops[0].repeats");
  rejectsAt(sampleSession({ song: { loops: [{ repeats: 1, layers: [[{ key: 0, style: "organ", voice: "velvet_pad" }, ...Array(11).fill(null)]] }] } }), "session.song.loops[0].layers[0][0].style");
  const noSong = sampleSession();
  delete noSong.song;
  rejectsAt(noSong, "session.song");
  rejectsAt({ ...sampleSession(), funMachine: { style: "organ", voice: "velvet_pad" } }, "session.funMachine.style");
  rejectsAt({ ...sampleSession(), funMachine: { style: "arpeggio", voice: "velvet_pad", progression: Array(12).fill(null) } }, "session.funMachine.progression");
  rejectsAt(sampleSession({ tempo: 300 }), "session.tempo");
  rejectsAt(sampleSession({ tempo: 96.5 }), "session.tempo");
  rejectsAt(sampleSession({ volume: "70" }), "session.volume");
  rejectsAt(sampleSession({ genre: "polka" }), "session.genre");
  rejectsAt(sampleSession({ phrase: "" }), "session.phrase");
  rejectsAt(sampleSession({ phrase: "x".repeat(73) }), "session.phrase");
  rejectsAt(sampleSession({ phrase: "bell\u0007" }), "session.phrase");
  rejectsAt(sampleSession({ phrase: 42 }), "session.phrase");


  const badCycles = sampleSession();
  badCycles.plates.bass.cellCycles[4] = 1000;
  rejectsAt(badCycles, "session.plates.bass.cellCycles[4]");
  const badPan = sampleSession();
  badPan.mixer.fun.pan = -101;
  rejectsAt(badPan, "session.mixer.fun.pan");
  const missingChannel = sampleSession();
  delete missingChannel.mixer.fungal;
  rejectsAt(missingChannel, "session.mixer.fungal");
});

test("session text is bounded, must be JSON, and cannot smuggle prototype keys", () => {
  assert.throws(() => parseSession("{nope"), (error) => error.path === "file");
  assert.throws(() => parseSession(" ".repeat(MAX_SESSION_BYTES + 1)), (error) => error.path === "file");
  assert.throws(() => parseSession(42), (error) => error.path === "file");
  const proto = serializeSession(sampleSession()).replace('"tempo"', '"__proto__": {"polluted": true}, "tempo"');
  assert.throws(() => parseSession(proto), (error) => error.path === "session.__proto__");
  assert.equal({}.polluted, undefined);
  assert.throws(() => validateSession([]), (error) => error.path === "session");
  assert.throws(() => validateSession(null), (error) => error.path === "session");
});

test("presets store newest first, replace by name, cap the list, and survive corruption", () => {
  let store = emptyPresetStore();
  store = upsertPreset(store, "  midnight   jam ", sampleSession(), "2026-10-19T10:00:00.000Z");
  store = upsertPreset(store, "dawn chorus", sampleSession({ tempo: 120 }), "2026-10-19T11:00:00.000Z");
  assert.deepEqual(store.presets.map((p) => p.name), ["dawn chorus", "midnight jam"]);
  store = upsertPreset(store, "midnight jam", sampleSession({ tempo: 60 }), "2026-10-19T12:00:00.000Z");
  assert.deepEqual(store.presets.map((p) => [p.name, p.session.tempo]), [["midnight jam", 60], ["dawn chorus", 120]]);

  const roundTrip = parsePresetStore(serializePresetStore(store));
  assert.deepEqual(roundTrip, store);
  assert.deepEqual(removePreset(store, "dawn chorus").presets.map((p) => p.name), ["midnight jam"]);

  for (let i = 0; i < MAX_PRESETS + 5; i += 1) store = upsertPreset(store, `take ${i}`, sampleSession(), "t");
  assert.equal(store.presets.length, MAX_PRESETS);
  assert.equal(store.presets[0].name, `take ${MAX_PRESETS + 4}`);

  assert.throws(() => upsertPreset(store, "", sampleSession(), "t"), SessionError);
  assert.throws(() => upsertPreset(store, "x".repeat(41), sampleSession(), "t"), SessionError);
  assert.throws(() => upsertPreset(store, "ok", sampleSession({ tempo: 1 }), "t"), SessionError);

  for (const junk of [null, "", "{", "[]", '{"version":2,"presets":[]}', '{"version":1,"presets":{}}']) {
    assert.deepEqual(parsePresetStore(junk), emptyPresetStore(), String(junk));
  }
  const mixed = JSON.stringify({ version: 1, presets: [
    { name: "good", savedAt: "t", session: sampleSession() },
    { name: "bad tempo", savedAt: "t", session: sampleSession({ tempo: 999 }) },
    { name: "good", savedAt: "t", session: sampleSession() },
    { name: "extra", savedAt: "t", session: sampleSession(), sneaky: true },
  ] });
  assert.deepEqual(parsePresetStore(mixed).presets.map((p) => p.name), ["good"], "bad and duplicate entries are dropped individually");
});

test("console state rebuilds from session channels", () => {
  const session = validateSession(sampleSession());
  const state = mixerStateFromChannels(session.mixer);
  const expected = toggleSolo(setPan(setFader(createMixerState(), "chant", 92), "chant", -35), "chant");
  assert.deepEqual(state, expected);
  const muted = mixerStateFromChannels({ ...session.mixer, beat: { fader: 10, pan: 50, muted: true, soloed: false } });
  assert.deepEqual(muted.channels.beat, toggleMute(setPan(setFader(createMixerState(), "beat", 10), "beat", 50), "beat").channels.beat);
});

test("version 2 files still open: their punched progression is checked, then dropped (D-038)", () => {
  const v2 = (progression) => ({ ...olderSession(2), funMachine: { style: "swell", progression } });
  const punched = [[7, "minor"], null, null, [0, "maj9"], null, null, null, null, null, null, null, null];
  const opened = validateSession(v2(punched));
  assert.equal(opened.version, SESSION_VERSION);
  assert.deepEqual(opened.funMachine, { style: "swell", voice: "velvet_pad", octave: 0 }, "only the style survives, in the voice it was made in");
  assert.equal(JSON.parse(serializeSession(opened)).funMachine.progression, undefined, "a re-save writes v3 without it");
  for (const genre of GENRES) {
    for (let root = 0; root < 12; root += 1) {
      for (const quality of ["major", "minor", "dom7", "maj9", "dim", "modal_open"]) {
        const chord = buildFunProgression(root, quality, genre, 52).chords[0];
        const steps = Array(12).fill(null);
        steps[0] = [chord.rootPc, chord.quality];
        assert.doesNotThrow(() => validateSession(v2(steps)), `${genre} ${quality}: every chord an old file could hold still opens`);
      }
    }
  }
  const bad = (index, step, path) => {
    const steps = Array(12).fill(null);
    steps[index] = step;
    rejectsAt(v2(steps), path);
  };
  bad(1, [12, "major"], "session.funMachine.progression[1][0]");
  bad(2, [3, "<script>"], "session.funMachine.progression[2][1]");
  rejectsAt(v2(Array(11).fill(null)), "session.funMachine.progression");
  assert.equal(buildFunChord(0, "major").quality, "major");
});

test("plate cells cycle independently, so per-cell counts replay any click order", async () => {
  const [oracle, beatSource, chantSource] = await Promise.all([
    readFile(new URL("src/oracle.lol", root), "utf8"),
    readFile(new URL("src/beat.mal", root), "utf8"),
    readFile(new URL("src/chant.spl", root), "utf8"),
  ]);
  const score = composeScore(oracle, "three pigeons in a borrowed coat");
  const clicks = [3, 0, 3, 11, 3, 0, 7, 11, 3];
  for (const [plate, cycle] of [
    [composeBeat(beatSource, score, 1), (step) => cycleBeatStep(step)],
    [composeChant(chantSource, score, 0), (step) => cycleChantCell(step, score)],
  ]) {
    const interleaved = [...plate.steps];
    for (const index of clicks) interleaved[index] = cycle(interleaved[index]);
    const counts = Array(12).fill(0);
    for (const index of clicks) counts[index] += 1;
    const replayed = [...plate.steps];
    counts.forEach((count, index) => { for (let n = 0; n < count; n += 1) replayed[index] = cycle(replayed[index]); });
    assert.deepEqual(replayed, interleaved);
  }
});

test("version 1 sessions upgrade: chord mode becomes a progression, lead solo an arpeggio", () => {
  const v1 = (mode) => {
    const session = olderSession(1);
    session.funMachine = { mode, quality: "maj9", progression: [[7, "minor"], ...Array(11).fill(null)] };
    return session;
  };
  const upgraded = validateSession(v1("auto_chord"));
  assert.equal(upgraded.version, SESSION_VERSION);
  assert.equal(upgraded.funMachine.style, "progression");
  assert.equal(validateSession(v1("lead")).funMachine.style, "arpeggio");
  assert.deepEqual(upgraded.funMachine, { style: "progression", voice: "velvet_pad", octave: 0 }, "the old progression is dropped");
  assert.equal(JSON.parse(serializeSession(upgraded)).version, SESSION_VERSION, "an upgraded session saves as the current version");
  const badMode = v1("theremin");
  assert.throws(() => validateSession(badMode), (error) => error.path === "session.funMachine.mode");
  const v1WithStyle = olderSession(1);
  assert.throws(() => validateSession(v1WithStyle), (error) => error.path === "session.funMachine.style");
});

test("version 3 files open with an empty song, and a v4 song round-trips with its loops and layers (D-039)", () => {
  const v3 = olderSession(3);
  const opened = validateSession(v3);
  assert.deepEqual(opened.song, { loops: [] });
  assert.equal(opened.version, SESSION_VERSION);
  const withSong = validateSession(sampleSession());
  assert.equal(withSong.song.loops[0].repeats, 2);
  assert.deepEqual(withSong.song.loops[0].layers.map((take) => take.filter(Boolean).map((slot) => slot.key)), [[7], [12]]);
  assert.deepEqual(parseSession(serializeSession(withSong)).song, withSong.song);
  const v3WithSong = olderSession(3);
  v3WithSong.song = { loops: [] };
  rejectsAt(v3WithSong, "session.song");
});

test("v6 keeps whether the creature varies its genre; older files open AS WRITTEN (D-043)", () => {
  assert.equal(validateSession(sampleSession()).varied, true);
  assert.equal(validateSession(sampleSession({ varied: false })).varied, false);
  for (const version of [1, 2, 3, 4, 5]) {
    const raw = version <= 2 ? olderSession(version, { funMachine: version === 1 ? { mode: "auto_chord", quality: "maj9", progression: Array(12).fill(null) } : { style: "swell", progression: Array(12).fill(null) } }) : olderSession(version);
    const opened = validateSession(raw);
    assert.equal(opened.varied, false, `v${version} opens as written`);
    assert.equal(opened.version, SESSION_VERSION);
  }
  rejectsAt(sampleSession({ varied: "yes" }), "session.varied");
  assert.equal(validateSession(sampleSession({ genre: "creature" })).genre, "creature", "THE CREATURE'S OWN rulebook is a valid choice");
  const missing = sampleSession();
  delete missing.varied;
  rejectsAt(missing, "session.varied");
  rejectsAt({ ...olderSession(5), varied: true }, "session.varied");
});

test("v5 keeps the Fun Machine's voice and each slot's; v4 songs open in VELVET PAD (D-040)", () => {
  const opened = validateSession(olderSession(5));
  assert.equal(opened.funMachine.voice, "glass_harmonica");
  assert.deepEqual(opened.song.loops[0].layers.map((take) => take.filter(Boolean).map((slot) => slot.voice)), [["creature"], ["music_box"]]);
  const v4 = validateSession(olderSession(4));
  assert.equal(v4.funMachine.voice, "velvet_pad");
  assert.deepEqual(v4.song.loops[0].layers.flat().filter(Boolean).map((slot) => slot.voice), ["velvet_pad", "velvet_pad"]);
  assert.equal(v4.version, SESSION_VERSION, "an opened v4 file saves back as v5");
  assert.equal(validateSession(olderSession(2, { funMachine: { style: "swell", progression: Array(12).fill(null) } })).funMachine.voice, "velvet_pad");
  rejectsAt(sampleSession({ funMachine: { style: "arpeggio", voice: "calliope" } }), "session.funMachine.voice");
  rejectsAt(sampleSession({ funMachine: { style: "arpeggio" } }), "session.funMachine.voice");
  const badSlot = sampleSession();
  badSlot.song.loops[0].layers[0][0] = { key: 7, style: "progression", voice: "kazoo" };
  rejectsAt(badSlot, "session.song.loops[0].layers[0][0].voice");
  const v4WithVoice = olderSession(4);
  v4WithVoice.song.loops[0].layers[0][0] = { key: 7, style: "progression", voice: "music_box" };
  rejectsAt(v4WithVoice, "session.song.loops[0].layers[0][0].voice");
  rejectsAt({ ...olderSession(4), funMachine: { style: "arpeggio", voice: "music_box" } }, "session.funMachine.voice");
});

test("preset storage handles mid-write QuotaExceededError by evicting oldest presets or preserving existing data (P4-05)", () => {
  const entries = new Map();
  let maxBytes = Infinity;

  const mockStorage = {
    getItem(key) {
      return entries.has(key) ? entries.get(key) : null;
    },
    setItem(key, value) {
      const bytes = new TextEncoder().encode(String(value)).length;
      if (bytes > maxBytes) {
        const err = new Error("The quota has been exceeded.");
        err.name = "QuotaExceededError";
        err.code = 22;
        throw err;
      }
      entries.set(key, String(value));
    },
    removeItem(key) {
      entries.delete(key);
    },
  };

  let store = emptyPresetStore();
  store = upsertPreset(store, "oldest take", sampleSession({ tempo: 84 }), "2026-10-25T10:00:00.000Z");
  store = upsertPreset(store, "middle take", sampleSession({ tempo: 96 }), "2026-10-25T11:00:00.000Z");
  assert.equal(writePresetStoreTo(mockStorage, store), true);
  const twoPresetBytes = new TextEncoder().encode(serializePresetStore(store)).length;

  // Cap quota so 2 presets fit, but 3 presets throw QuotaExceededError mid-write.
  maxBytes = twoPresetBytes + 16;
  const threePresets = upsertPreset(store, "newest take", sampleSession({ tempo: 108 }), "2026-10-25T12:00:00.000Z");
  assert.equal(writePresetStoreTo(mockStorage, threePresets), true, "evicts oldest preset so newest take still saves under tight quota");
  const recovered = readPresetStoreFrom(mockStorage);
  assert.deepEqual(
    recovered.presets.map((p) => p.name),
    ["newest take", "middle take"],
    "newest presets survive while oldest is evicted to fit quota",
  );

  // Exhaust quota completely (0 bytes available): write returns false and leaves existing stored presets intact.
  maxBytes = 0;
  const fourthPreset = upsertPreset(recovered, "overflow take", sampleSession({ tempo: 120 }), "2026-10-25T13:00:00.000Z");
  assert.equal(writePresetStoreTo(mockStorage, fourthPreset), false, "returns false when even a single preset exceeds remaining quota");
  assert.deepEqual(
    readPresetStoreFrom(mockStorage).presets.map((p) => p.name),
    ["newest take", "middle take"],
    "previously stored presets remain intact after failed quota write",
  );

  // Clearing an empty store removes the key cleanly.
  assert.equal(writePresetStoreTo(mockStorage, emptyPresetStore()), true);
  assert.deepEqual(readPresetStoreFrom(mockStorage), emptyPresetStore());
});

test("P8-03 and P8-04 v7 sessions record engineVersion, rootOverride, scaleOverride, and referencePitch; v6 upgrades cleanly", () => {
  const v6 = olderSession(6);
  const upgraded = validateSession(v6);
  assert.equal(upgraded.version, SESSION_VERSION);
  assert.equal(upgraded.engineVersion, 1);
  assert.equal(upgraded.rootOverride, null);
  assert.equal(upgraded.scaleOverride, null);
  assert.equal(upgraded.referencePitch, 440);
  assert.equal(upgraded.barLock, false);
  rejectsAt(sampleSession({ barLock: "yes" }), "session.barLock");

  const custom = validateSession(sampleSession({
    engineVersion: 2,
    rootOverride: 2, // D
    scaleOverride: 5, // Phrygian
    referencePitch: 432,
  }));
  assert.equal(custom.engineVersion, 2);
  assert.equal(custom.rootOverride, 2);
  assert.equal(custom.scaleOverride, 5);
  assert.equal(custom.referencePitch, 432);

  const mockScore = Object.freeze({ root: 48, scale: 0, name: "Specimen" });
  const overridden = applyScoreOverrides(mockScore, { rootOverride: 2, scaleOverride: 5 });
  assert.equal(overridden.root % 12, 2, "transposed to pitch class D");
  assert.ok(overridden.root >= 30 && overridden.root <= 65, "stays within valid score root range");
  assert.equal(overridden.scale, 5, "scale overridden to Phrygian");

  setReferencePitch(432);
  assert.equal(referencePitch(), 432);
  assert.equal(midiToFrequency(69), 432);
  setReferencePitch(440);
  assert.equal(midiToFrequency(69), 440);
});

test("P11-01 v8 sessions record funMachine.octave and 25-key manual slots; v7 upgrades cleanly", () => {
  const v7 = olderSession(7);
  const upgraded = validateSession(v7);
  assert.equal(upgraded.version, SESSION_VERSION);
  assert.equal(upgraded.funMachine.octave, 0);
  assert.equal(upgraded.engineVersion, 1);
  assert.equal(upgraded.referencePitch, 440);
  assert.equal(upgraded.barLock, false);

  const custom = validateSession(sampleSession({
    funMachine: { style: "progression", voice: "music_box", octave: 1 },
    song: { loops: [{ repeats: 1, layers: [[{ key: 16, style: "progression", voice: "music_box", octave: 1 }, ...Array(11).fill(null)]] }] },
  }));
  assert.equal(custom.funMachine.octave, 1);
  assert.equal(custom.song.loops[0].layers[0][0].key, 16);
  assert.equal(custom.song.loops[0].layers[0][0].octave, 1);

  rejectsAt(sampleSession({ funMachine: { style: "swell", voice: "velvet_pad", octave: 3 } }), "session.funMachine.octave");
  rejectsAt(sampleSession({ funMachine: { style: "swell", voice: "velvet_pad", octave: -3 } }), "session.funMachine.octave");
});

test("D-101 Schema v9 records bio-somatic, recorder, and herbarium state; v8 upgrades cleanly", () => {
  const v8 = olderSession(8);
  const upgraded = validateSession(v8);
  assert.equal(upgraded.version, SESSION_VERSION);
  assert.equal(upgraded.funMachine.octave, 0);
  assert.deepEqual(upgraded.somatic, {
    sporeHarp: { symbiosis: "silk", tension: 1.0 },
    muscaria: { targetMode: "dormant", tripDepth: "deep" },
    theremin: { scaleSnap: true },
  });
  assert.deepEqual(upgraded.recorder, { wavBitDepth: 16, autoMidi: true });
  assert.deepEqual(upgraded.herbarium, { pinned: false, specimen: null });

  // Custom valid somatic & recorder values
  const custom = validateSession(sampleSession({
    somatic: {
      sporeHarp: { symbiosis: "cordyceps", tension: 1.25 },
      muscaria: { targetMode: "hallucinating", tripDepth: "transcendent" },
      theremin: { scaleSnap: false },
    },
    recorder: { wavBitDepth: 24, autoMidi: false },
    herbarium: {
      pinned: true,
      specimen: {
        phrase: "the moon owes me five dollars",
        seed: 284192015,
        name: "THE CELESTIAL CREDITOR",
        folioId: "FOLIO-2841",
        curiosaClass: "ASTRONOMICAL PARLOR HOMUNCULUS",
        bellJar: "BELL JAR III · LEAD GLASS",
        pulse: 96,
        wave: 2,
        shape: 4,
        shapeName: "STELLATE POLYP",
        melodyMode: 1,
        fungalForm: 3,
        fungalName: "BIOLUMINESCENT BONNET",
        hue: 215,
        accent: 45,
        pinnedAt: "2026-10-30T08:00:00.000Z",
      },
    },
  }));

  assert.equal(custom.somatic.sporeHarp.symbiosis, "cordyceps");
  assert.equal(custom.somatic.sporeHarp.tension, 1.25);
  assert.equal(custom.somatic.muscaria.targetMode, "hallucinating");
  assert.equal(custom.somatic.muscaria.tripDepth, "transcendent");
  assert.equal(custom.somatic.theremin.scaleSnap, false);
  assert.equal(custom.recorder.wavBitDepth, 24);
  assert.equal(custom.recorder.autoMidi, false);
  assert.equal(custom.herbarium.pinned, true);
  assert.equal(custom.herbarium.specimen.name, "THE CELESTIAL CREDITOR");

  // Somatic validation errors
  rejectsAt(sampleSession({ somatic: { sporeHarp: { symbiosis: "neon", tension: 1.0 }, muscaria: { targetMode: "dormant", tripDepth: "deep" }, theremin: { scaleSnap: true } } }), "session.somatic.sporeHarp.symbiosis");
  rejectsAt(sampleSession({ somatic: { sporeHarp: { symbiosis: "silk", tension: 3.5 }, muscaria: { targetMode: "dormant", tripDepth: "deep" }, theremin: { scaleSnap: true } } }), "session.somatic.sporeHarp.tension");
  rejectsAt(sampleSession({ somatic: { sporeHarp: { symbiosis: "silk", tension: 1.0 }, muscaria: { targetMode: "disco", tripDepth: "deep" }, theremin: { scaleSnap: true } } }), "session.somatic.muscaria.targetMode");
  rejectsAt(sampleSession({ somatic: { sporeHarp: { symbiosis: "silk", tension: 1.0 }, muscaria: { targetMode: "dormant", tripDepth: "maximum" }, theremin: { scaleSnap: true } } }), "session.somatic.muscaria.tripDepth");
  rejectsAt(sampleSession({ somatic: { sporeHarp: { symbiosis: "silk", tension: 1.0 }, muscaria: { targetMode: "dormant", tripDepth: "deep" }, theremin: { scaleSnap: "yes" } } }), "session.somatic.theremin.scaleSnap");

  // Recorder validation errors
  rejectsAt(sampleSession({ recorder: { wavBitDepth: 48, autoMidi: true } }), "session.recorder.wavBitDepth");
  rejectsAt(sampleSession({ recorder: { wavBitDepth: 16, autoMidi: "true" } }), "session.recorder.autoMidi");

  // Herbarium validation errors
  rejectsAt(sampleSession({ herbarium: { pinned: "yes", specimen: null } }), "session.herbarium.pinned");
  rejectsAt(sampleSession({ herbarium: { pinned: true, specimen: { bad: 1 } } }), "session.herbarium.specimen.bad");
  rejectsAt(sampleSession({ herbarium: { pinned: true, specimen: {} } }), "session.herbarium.specimen.phrase");

  // Part lock validation errors
  rejectsAt(sampleSession({ locks: "all" }), "session.locks");
  rejectsAt(sampleSession({ locks: { non_existent_part: true } }), "session.locks.non_existent_part");
  rejectsAt(sampleSession({ locks: { beat: "locked" } }), "session.locks.beat");

  // Valid locks roundtrip
  const lockedSession = validateSession(sampleSession({ locks: { beat: true, bass: true } }));
  assert.equal(lockedSession.locks.beat, true);
  assert.equal(lockedSession.locks.bass, true);
  assert.equal(lockedSession.locks.harmony, undefined);
});

test("D-101 Preset management: quick overwrite, duplicate, and rename primitives", () => {
  let store = emptyPresetStore();
  const sessionA = sampleSession({ phrase: "first phrase" });
  const sessionB = sampleSession({ phrase: "second phrase" });

  // Upsert initial presets
  store = upsertPreset(store, "Alpha", sessionA, "2026-10-30T01:00:00Z");
  store = upsertPreset(store, "Beta", sessionB, "2026-10-30T02:00:00Z");
  assert.deepEqual(store.presets.map((p) => p.name), ["Beta", "Alpha"]);

  // Quick overwrite in place (overwrite: true) preserves index position
  const sessionAUpdated = sampleSession({ phrase: "first phrase updated", tempo: 140 });
  store = upsertPreset(store, "Alpha", sessionAUpdated, "2026-10-30T03:00:00Z", { overwrite: true });
  assert.deepEqual(store.presets.map((p) => p.name), ["Beta", "Alpha"], "position preserved on overwrite");
  assert.equal(store.presets[1].session.tempo, 140);

  // Duplicate preset
  store = duplicatePreset(store, "Alpha", "Alpha Copy", "2026-10-30T04:00:00Z");
  assert.deepEqual(store.presets.map((p) => p.name), ["Alpha Copy", "Beta", "Alpha"]);
  assert.equal(store.presets[0].session.tempo, 140);
  assert.throws(() => duplicatePreset(store, "NonExistent", "New"), (err) => err instanceof SessionError);
  assert.throws(() => duplicatePreset(store, "Alpha", "Beta"), (err) => err instanceof SessionError);

  // Rename preset in place
  store = renamePreset(store, "Beta", "Beta Prime");
  assert.deepEqual(store.presets.map((p) => p.name), ["Alpha Copy", "Beta Prime", "Alpha"], "renamed in-place");
  assert.throws(() => renamePreset(store, "NonExistent", "Foo"), (err) => err instanceof SessionError);
  assert.throws(() => renamePreset(store, "Alpha Copy", "Alpha"), (err) => err instanceof SessionError);
});

test("D-101 Preset bank bundles: serialize and parse with merge and replace modes", () => {
  let store = emptyPresetStore();
  store = upsertPreset(store, "Harp Bell", sampleSession({ phrase: "harp bell phrase" }), "2026-10-30T01:00:00Z");
  store = upsertPreset(store, "Muscaria Trip", sampleSession({ phrase: "trip phrase" }), "2026-10-30T02:00:00Z");

  const bankText = serializePresetBank(store);
  assert.ok(bankText.includes(BANK_FORMAT));
  assert.ok(bankText.includes("Muscaria Trip"));

  // Parse in replace mode
  const replaced = parsePresetBank(bankText, { mergeMode: "replace" });
  assert.equal(replaced.presets.length, 2);
  assert.deepEqual(replaced.presets.map((p) => p.name), ["Muscaria Trip", "Harp Bell"]);

  // Parse in merge mode with overlapping existing store
  let localStore = emptyPresetStore();
  localStore = upsertPreset(localStore, "Local Unique", sampleSession({ phrase: "local phrase" }), "2026-10-30T00:00:00Z");
  localStore = upsertPreset(localStore, "Harp Bell", sampleSession({ phrase: "local version of harp bell" }), "2026-10-30T00:30:00Z");

  const merged = parsePresetBank(bankText, { mergeMode: "merge", existingStore: localStore });
  assert.equal(merged.presets.length, 3);
  assert.deepEqual(merged.presets.map((p) => p.name), ["Harp Bell", "Local Unique", "Muscaria Trip"]);
  // Existing "Harp Bell" was preserved (no clobber in merge mode)
  assert.equal(merged.presets[0].session.phrase, "local version of harp bell");

  // Rejects invalid bank structure
  assert.throws(() => parsePresetBank("not json"), (err) => err instanceof SessionError);
  assert.throws(() => parsePresetBank(JSON.stringify({ format: "wrong", version: 1, presets: [] })), (err) => err instanceof SessionError);
});

