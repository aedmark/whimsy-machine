import test from "node:test";
import assert from "node:assert/strict";

import {
  TARGET_DEFINITIONS,
  TARGET_GROUPS,
  TARGET_TYPES,
  BUILTIN_CC_MAP,
  MIDI_MAP_STORAGE_KEY,
  normalizeChannel,
  normalizeController,
  ccKey,
  ccToDomain,
  domainToCC,
  createMidiLearnState,
  enterLearnMode,
  exitLearnMode,
  toggleLearnMode,
  armTarget,
  disarmTarget,
  learnMapping,
  unmapTarget,
  clearAllMappings,
  resetToBuiltinDefaults,
  getMappingForTarget,
  resolveMidiCC,
  computeOutboundCC,
  serializeMidiMap,
  parseMidiMap,
  loadMidiMapFromStorage,
  saveMidiMapToStorage,
} from "../src/midi-learn.mjs";

test("TARGET_DEFINITIONS covers 10 mixer faders, 10 mutes, master controls, and somatics", () => {
  const faders = Object.keys(TARGET_DEFINITIONS).filter((k) => k.startsWith("fader:"));
  assert.equal(faders.length, 10);
  assert.ok(faders.includes("fader:lead"));
  assert.ok(faders.includes("fader:bass"));
  assert.ok(faders.includes("fader:harmony"));
  assert.ok(faders.includes("fader:beat"));
  assert.ok(faders.includes("fader:chime"));
  assert.ok(faders.includes("fader:chant"));
  assert.ok(faders.includes("fader:forge"));
  assert.ok(faders.includes("fader:harp"));
  assert.ok(faders.includes("fader:fungal"));
  assert.ok(faders.includes("fader:theremin"));

  const mutes = Object.keys(TARGET_DEFINITIONS).filter((k) => k.startsWith("mute:"));
  assert.equal(mutes.length, 10);

  assert.ok(TARGET_DEFINITIONS["master:volume"]);
  assert.ok(TARGET_DEFINITIONS["master:tempo"]);
  assert.ok(TARGET_DEFINITIONS["master:filterCutoff"]);
  assert.ok(TARGET_DEFINITIONS["master:strictness"]);

  // Somatics
  assert.ok(TARGET_DEFINITIONS["somatic:bone_beat_toggle"]);
  assert.ok(TARGET_DEFINITIONS["somatic:bone_beat_strike"]);
  assert.ok(TARGET_DEFINITIONS["somatic:bone_beat_quench"]);
  assert.ok(TARGET_DEFINITIONS["somatic:spore_harp_toggle"]);
  assert.ok(TARGET_DEFINITIONS["somatic:spore_harp_strum"]);
  assert.ok(TARGET_DEFINITIONS["somatic:spore_harp_symbiosis"]);
  assert.ok(TARGET_DEFINITIONS["somatic:spore_harp_tension"]);
  assert.ok(TARGET_DEFINITIONS["somatic:muscaria_toggle"]);
  assert.ok(TARGET_DEFINITIONS["somatic:muscaria_stimulate"]);
  assert.ok(TARGET_DEFINITIONS["somatic:muscaria_trip_depth"]);
  assert.ok(TARGET_DEFINITIONS["somatic:theremin_toggle"]);
  assert.ok(TARGET_DEFINITIONS["somatic:theremin_scale_snap"]);
});

test("channel and controller normalizations clamp correctly", () => {
  assert.equal(normalizeChannel("omni"), "omni");
  assert.equal(normalizeChannel("*"), "omni");
  assert.equal(normalizeChannel(0), "omni");
  assert.equal(normalizeChannel(1), 1);
  assert.equal(normalizeChannel(16), 16);
  assert.equal(normalizeChannel(17), "omni");
  assert.equal(normalizeChannel(-1), "omni");

  assert.equal(normalizeController(0), 0);
  assert.equal(normalizeController(127), 127);
  assert.equal(normalizeController(-10), 0);
  assert.equal(normalizeController(200), 127);
  assert.equal(normalizeController("74"), 74);
});

test("ccToDomain and domainToCC convert values accurately", () => {
  const volumeDef = TARGET_DEFINITIONS["master:volume"];
  assert.equal(ccToDomain(volumeDef, 0), 0);
  assert.equal(ccToDomain(volumeDef, 127), 100);
  assert.equal(ccToDomain(volumeDef, 64), 50);
  assert.equal(domainToCC(volumeDef, 0), 0);
  assert.equal(domainToCC(volumeDef, 100), 127);
  assert.equal(domainToCC(volumeDef, 50), 64);

  const tempoDef = TARGET_DEFINITIONS["master:tempo"];
  assert.equal(ccToDomain(tempoDef, 0), 36);
  assert.equal(ccToDomain(tempoDef, 127), 208);
  assert.equal(domainToCC(tempoDef, 36), 0);
  assert.equal(domainToCC(tempoDef, 208), 127);

  const strictnessDef = TARGET_DEFINITIONS["master:strictness"];
  assert.equal(ccToDomain(strictnessDef, 0), 3);
  assert.equal(ccToDomain(strictnessDef, 127), 14);

  const muteDef = TARGET_DEFINITIONS["mute:lead"];
  assert.equal(ccToDomain(muteDef, 0), false);
  assert.equal(ccToDomain(muteDef, 63), false);
  assert.equal(ccToDomain(muteDef, 64), true);
  assert.equal(ccToDomain(muteDef, 127), true);
  assert.equal(domainToCC(muteDef, true), 127);
  assert.equal(domainToCC(muteDef, false), 0);
});

test("MIDI learn state management: enter, exit, toggle, arm, disarm", () => {
  const state = createMidiLearnState();
  assert.equal(state.learning, false);
  assert.equal(state.armedTargetId, null);
  assert.equal(state.feedbackEnabled, true);

  enterLearnMode(state);
  assert.equal(state.learning, true);
  assert.equal(state.armedTargetId, null);

  armTarget(state, "fader:lead");
  assert.equal(state.learning, true);
  assert.equal(state.armedTargetId, "fader:lead");

  disarmTarget(state);
  assert.equal(state.learning, true);
  assert.equal(state.armedTargetId, null);

  exitLearnMode(state);
  assert.equal(state.learning, false);
  assert.equal(state.armedTargetId, null);

  toggleLearnMode(state);
  assert.equal(state.learning, true);
  toggleLearnMode(state);
  assert.equal(state.learning, false);
});

test("learnMapping assigns CC and resolves conflicts cleanly", () => {
  const state = createMidiLearnState();
  learnMapping(state, "fader:lead", 1, 70);
  assert.deepEqual(state.customMap["fader:lead"], { channel: 1, controller: 70 });
  assert.equal(state.armedTargetId, null);

  // Re-learning same CC to a different target steals the CC from the previous target
  learnMapping(state, "fader:bass", 1, 70);
  assert.deepEqual(state.customMap["fader:bass"], { channel: 1, controller: 70 });
  assert.equal(state.customMap["fader:lead"], undefined);

  // Unmapping
  assert.equal(unmapTarget(state, "fader:bass"), true);
  assert.equal(unmapTarget(state, "fader:bass"), false);
  assert.equal(state.customMap["fader:bass"], undefined);

  // Clear all
  learnMapping(state, "fader:lead", 1, 70);
  learnMapping(state, "fader:bass", 1, 71);
  clearAllMappings(state);
  assert.deepEqual(state.customMap, {});
});

test("resolveMidiCC prioritizes armed learning, custom mappings, and built-in fallbacks", () => {
  const state = createMidiLearnState();

  // 1. Armed target in learn mode captures incoming CC
  enterLearnMode(state, "master:volume");
  const learnResult = resolveMidiCC(state, 2, 45, 100);
  assert.equal(learnResult.type, "learned");
  assert.equal(learnResult.targetId, "master:volume");
  assert.equal(learnResult.channel, 2);
  assert.equal(learnResult.controller, 45);
  assert.equal(state.customMap["master:volume"].controller, 45);

  // 2. Custom mapping takes precedence over built-in
  // Map CC 70 (built-in lead fader) to bass fader instead
  learnMapping(state, "fader:bass", "omni", 70);
  const customResult = resolveMidiCC(state, 1, 70, 127);
  assert.equal(customResult.type, "mapped");
  assert.equal(customResult.source, "custom");
  assert.equal(customResult.targetId, "fader:bass");
  assert.equal(customResult.domainValue, 100);

  // 3. Built-in fallback handles unmapped CCs (e.g. CC 71 for bass fader, CC 7 for volume)
  const builtinResult = resolveMidiCC(state, 1, 71, 64);
  assert.equal(builtinResult.type, "mapped");
  assert.equal(builtinResult.source, "builtin");
  assert.equal(builtinResult.targetId, "fader:bass");
  assert.equal(builtinResult.domainValue, 50);

  // 4. Truly unmapped CC returns unmapped
  const unmappedResult = resolveMidiCC(state, 1, 99, 127);
  assert.equal(unmappedResult.type, "unmapped");
  assert.equal(unmappedResult.controller, 99);
});

test("computeOutboundCC emits correct messages and respects feedbackEnabled", () => {
  const state = createMidiLearnState();
  learnMapping(state, "fader:lead", 1, 70);

  const outbound = computeOutboundCC(state, "fader:lead", 75);
  assert.deepEqual(outbound, {
    channel: 1,
    controller: 70,
    value: 95,
    targetId: "fader:lead",
  });

  // Feedback disabled
  state.feedbackEnabled = false;
  assert.equal(computeOutboundCC(state, "fader:lead", 75), null);

  // Fallback to built-in when target not in customMap
  state.feedbackEnabled = true;
  const builtinOutbound = computeOutboundCC(state, "master:volume", 100);
  assert.deepEqual(builtinOutbound, {
    channel: 1,
    controller: 7,
    value: 127,
    targetId: "master:volume",
  });
});

test("serializeMidiMap and parseMidiMap handle valid and invalid payloads", () => {
  const state = createMidiLearnState();
  learnMapping(state, "fader:lead", 1, 70);
  learnMapping(state, "master:tempo", "omni", 14);

  const serialized = serializeMidiMap(state);
  const parsed = parseMidiMap(serialized);
  assert.ok(parsed);
  assert.equal(parsed.feedbackEnabled, true);
  assert.deepEqual(parsed.customMap["fader:lead"], { channel: 1, controller: 70 });
  assert.deepEqual(parsed.customMap["master:tempo"], { channel: "omni", controller: 14 });

  // Invalid data
  assert.equal(parseMidiMap(null), null);
  assert.equal(parseMidiMap("not json"), null);
  assert.equal(parseMidiMap("{}").feedbackEnabled, true);
});

test("localStorage persistence load and save with mock storage", () => {
  const mockStore = {};
  const mockStorage = {
    getItem: (k) => mockStore[k] || null,
    setItem: (k, v) => { mockStore[k] = String(v); },
  };

  const state = createMidiLearnState();
  learnMapping(state, "somatic:bone_beat_strike", 10, 36);
  assert.equal(saveMidiMapToStorage(mockStorage, state), true);

  const loadedState = loadMidiMapFromStorage(mockStorage);
  assert.deepEqual(loadedState.customMap["somatic:bone_beat_strike"], { channel: 10, controller: 36 });
});
