// Web MIDI Learn & Hardware Controller CC Mapping pure state model (P12-02, D-104).
// Manages mappable targets, priority overlay mapping between hardware CCs and Whimsy parameters,
// bidirectional CC feedback translation, and localStorage persistence without dependencies.

export const MIDI_MAP_STORAGE_KEY = "whimsy-machine.midi-map.v1";

export const TARGET_GROUPS = Object.freeze({
  MIXER_FADER: "mixer_fader",
  MIXER_MUTE: "mixer_mute",
  MASTER: "master",
  SOMATIC: "somatic",
});

export const TARGET_TYPES = Object.freeze({
  CONTINUOUS: "continuous",
  TOGGLE: "toggle",
  TRIGGER: "trigger",
  CYCLE: "cycle",
});

/**
 * Registry of all mappable targets across Mixer faders, mutes, master controls, and somatic engines.
 */
export const TARGET_DEFINITIONS = Object.freeze({
  // 10 Mixer Channel Faders (0..100)
  "fader:lead": Object.freeze({ id: "fader:lead", label: "LOLCODE Lead Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "lead" }),
  "fader:bass": Object.freeze({ id: "fader:bass", label: "Brainfuck Bass Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "bass" }),
  "fader:harmony": Object.freeze({ id: "fader:harmony", label: "Befunge Organ Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "harmony" }),
  "fader:beat": Object.freeze({ id: "fader:beat", label: "Malbolge Beat Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "beat" }),
  "fader:chime": Object.freeze({ id: "fader:chime", label: "Piet Chime Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "chime" }),
  "fader:chant": Object.freeze({ id: "fader:chant", label: "Shakespeare Choir Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "chant" }),
  "fader:forge": Object.freeze({ id: "fader:forge", label: "Bone Forge Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "forge" }),
  "fader:harp": Object.freeze({ id: "fader:harp", label: "Spore Harp Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "harp" }),
  "fader:fungal": Object.freeze({ id: "fader:fungal", label: "PlantWave Muscaria Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "fungal" }),
  "fader:theremin": Object.freeze({ id: "fader:theremin", label: "Bone Theremin Fader", group: TARGET_GROUPS.MIXER_FADER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100, channel: "theremin" }),

  // 10 Mixer Channel Mutes (boolean toggle)
  "mute:lead": Object.freeze({ id: "mute:lead", label: "LOLCODE Lead Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "lead" }),
  "mute:bass": Object.freeze({ id: "mute:bass", label: "Brainfuck Bass Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "bass" }),
  "mute:harmony": Object.freeze({ id: "mute:harmony", label: "Befunge Organ Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "harmony" }),
  "mute:beat": Object.freeze({ id: "mute:beat", label: "Malbolge Beat Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "beat" }),
  "mute:chime": Object.freeze({ id: "mute:chime", label: "Piet Chime Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "chime" }),
  "mute:chant": Object.freeze({ id: "mute:chant", label: "Shakespeare Choir Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "chant" }),
  "mute:forge": Object.freeze({ id: "mute:forge", label: "Bone Forge Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "forge" }),
  "mute:harp": Object.freeze({ id: "mute:harp", label: "Spore Harp Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "harp" }),
  "mute:fungal": Object.freeze({ id: "mute:fungal", label: "PlantWave Muscaria Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "fungal" }),
  "mute:theremin": Object.freeze({ id: "mute:theremin", label: "Bone Theremin Mute", group: TARGET_GROUPS.MIXER_MUTE, type: TARGET_TYPES.TOGGLE, channel: "theremin" }),

  // Master / Perform Controls
  "master:volume": Object.freeze({ id: "master:volume", label: "Master Volume", group: TARGET_GROUPS.MASTER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100 }),
  "master:tempo": Object.freeze({ id: "master:tempo", label: "Tempo BPM", group: TARGET_GROUPS.MASTER, type: TARGET_TYPES.CONTINUOUS, min: 36, max: 208 }),
  "master:filterCutoff": Object.freeze({ id: "master:filterCutoff", label: "Creature Filter Cutoff", group: TARGET_GROUPS.MASTER, type: TARGET_TYPES.CONTINUOUS, min: 0, max: 100 }),
  "master:strictness": Object.freeze({ id: "master:strictness", label: "Euler Strictness", group: TARGET_GROUPS.MASTER, type: TARGET_TYPES.CONTINUOUS, min: 3, max: 14 }),

  // Somatic Controls
  "somatic:bone_beat_toggle": Object.freeze({ id: "somatic:bone_beat_toggle", label: "Bone Forge Active", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TOGGLE }),
  "somatic:bone_beat_strike": Object.freeze({ id: "somatic:bone_beat_strike", label: "Bone Forge Hammer Strike", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TRIGGER }),
  "somatic:bone_beat_quench": Object.freeze({ id: "somatic:bone_beat_quench", label: "Bone Forge Quench Steam", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TRIGGER }),

  "somatic:spore_harp_toggle": Object.freeze({ id: "somatic:spore_harp_toggle", label: "Spore Harp Active", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TOGGLE }),
  "somatic:spore_harp_strum": Object.freeze({ id: "somatic:spore_harp_strum", label: "Spore Harp Strum Hyphae", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TRIGGER }),
  "somatic:spore_harp_symbiosis": Object.freeze({ id: "somatic:spore_harp_symbiosis", label: "Spore Harp Symbiosis Mode", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.CYCLE }),
  "somatic:spore_harp_tension": Object.freeze({ id: "somatic:spore_harp_tension", label: "Spore Harp String Tension", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.CYCLE }),

  "somatic:muscaria_toggle": Object.freeze({ id: "somatic:muscaria_toggle", label: "Muscaria State Mode", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.CYCLE }),
  "somatic:muscaria_stimulate": Object.freeze({ id: "somatic:muscaria_stimulate", label: "Muscaria Galvanic Stimulate", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TRIGGER }),
  "somatic:muscaria_trip_depth": Object.freeze({ id: "somatic:muscaria_trip_depth", label: "Muscaria Trip Depth", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.CYCLE }),

  "somatic:theremin_toggle": Object.freeze({ id: "somatic:theremin_toggle", label: "Theremin Active", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TOGGLE }),
  "somatic:theremin_scale_snap": Object.freeze({ id: "somatic:theremin_scale_snap", label: "Theremin Scale Snap", group: TARGET_GROUPS.SOMATIC, type: TARGET_TYPES.TOGGLE }),
});

/**
 * Built-in FM-1 and standard CC fallback map (D-072).
 * These factory defaults apply whenever a CC is not overridden by a custom user mapping.
 */
export const BUILTIN_CC_MAP = Object.freeze({
  1: Object.freeze({ targetId: "master:filterCutoff", label: "Mod Wheel / Filter Cutoff" }),
  2: Object.freeze({ targetId: "master:filterCutoff", label: "Breath / Filter Cutoff" }),
  7: Object.freeze({ targetId: "master:volume", label: "Master Volume" }),
  11: Object.freeze({ targetId: "master:volume", label: "Expression / Volume" }),
  70: Object.freeze({ targetId: "fader:lead", label: "FM-1 Knob 1 (Lead)" }),
  71: Object.freeze({ targetId: "fader:bass", label: "FM-1 Knob 2 (Bass)" }),
  72: Object.freeze({ targetId: "fader:harmony", label: "FM-1 Knob 3 (Harmony)" }),
  73: Object.freeze({ targetId: "fader:beat", label: "FM-1 Knob 4 (Beat)" }),
  74: Object.freeze({ targetId: "master:filterCutoff", label: "Brightness / Filter Cutoff" }),
  75: Object.freeze({ targetId: "master:strictness", label: "FM-1 Euler Strictness" }),
});

/**
 * Normalizes a MIDI channel string or integer into 1..16 or "omni".
 */
export function normalizeChannel(channel) {
  if (channel === "omni" || channel === "*" || channel === 0 || channel === undefined || channel === null) {
    return "omni";
  }
  const num = Math.round(Number(channel));
  if (Number.isFinite(num) && num >= 1 && num <= 16) {
    return num;
  }
  return "omni";
}

/**
 * Normalizes a MIDI CC controller number into 0..127.
 */
export function normalizeController(controller) {
  const num = Math.round(Number(controller) || 0);
  return Math.max(0, Math.min(127, num));
}

/**
 * Builds a fast lookup key for a channel and controller.
 */
export function ccKey(channel, controller) {
  return `${normalizeChannel(channel)}:${normalizeController(controller)}`;
}

/**
 * Converts a raw MIDI CC value (0..127) to a target's domain value.
 */
export function ccToDomain(targetDef, rawValue) {
  const v = Math.max(0, Math.min(127, Math.round(rawValue || 0)));
  const norm = v / 127;

  switch (targetDef.type) {
    case TARGET_TYPES.CONTINUOUS: {
      const min = targetDef.min ?? 0;
      const max = targetDef.max ?? 100;
      return Math.round(min + norm * (max - min));
    }
    case TARGET_TYPES.TOGGLE: {
      return v >= 64;
    }
    case TARGET_TYPES.TRIGGER: {
      return v >= 64;
    }
    case TARGET_TYPES.CYCLE: {
      return v >= 64;
    }
    default:
      return v;
  }
}

/**
 * Converts a target's domain value back to a raw MIDI CC value (0..127).
 */
export function domainToCC(targetDef, domainValue) {
  switch (targetDef.type) {
    case TARGET_TYPES.CONTINUOUS: {
      const min = targetDef.min ?? 0;
      const max = targetDef.max ?? 100;
      const clamped = Math.max(min, Math.min(max, Number(domainValue) || 0));
      const norm = max === min ? 0 : (clamped - min) / (max - min);
      return Math.max(0, Math.min(127, Math.round(norm * 127)));
    }
    case TARGET_TYPES.TOGGLE: {
      return Boolean(domainValue) ? 127 : 0;
    }
    case TARGET_TYPES.TRIGGER: {
      return Boolean(domainValue) ? 127 : 0;
    }
    case TARGET_TYPES.CYCLE: {
      return 127;
    }
    default:
      return 0;
  }
}

/**
 * Creates a clean, isolated MIDI Learn state container.
 */
export function createMidiLearnState({
  customMap = {},
  feedbackEnabled = true,
} = {}) {
  const state = {
    learning: false,
    armedTargetId: null,
    customMap: {},
    feedbackEnabled: Boolean(feedbackEnabled),
    lastLearned: null,
  };

  if (customMap && typeof customMap === "object") {
    for (const [targetId, binding] of Object.entries(customMap)) {
      if (TARGET_DEFINITIONS[targetId] && binding && typeof binding === "object") {
        state.customMap[targetId] = {
          channel: normalizeChannel(binding.channel),
          controller: normalizeController(binding.controller),
        };
      }
    }
  }

  return state;
}

/**
 * Enters MIDI Learn mode. Optionally arms a specific target immediately.
 */
export function enterLearnMode(state, targetId = null) {
  state.learning = true;
  state.armedTargetId = (targetId && TARGET_DEFINITIONS[targetId]) ? targetId : null;
  return state;
}

/**
 * Exits MIDI Learn mode and clears any pending armed target.
 */
export function exitLearnMode(state) {
  state.learning = false;
  state.armedTargetId = null;
  return state;
}

/**
 * Toggles MIDI Learn mode on/off.
 */
export function toggleLearnMode(state) {
  if (state.learning) {
    return exitLearnMode(state);
  }
  return enterLearnMode(state);
}

/**
 * Arms a target to learn the next incoming MIDI CC.
 */
export function armTarget(state, targetId) {
  if (!TARGET_DEFINITIONS[targetId]) return state;
  state.learning = true;
  state.armedTargetId = targetId;
  return state;
}

/**
 * Disarms any currently armed target without exiting learn mode.
 */
export function disarmTarget(state) {
  state.armedTargetId = null;
  return state;
}

/**
 * Binds a target to a MIDI CC on a specific channel (or "omni").
 * Resolves conflicts: if the (channel, controller) was previously assigned to another target,
 * that previous assignment is unbound.
 */
export function learnMapping(state, targetId, channel, controller) {
  if (!TARGET_DEFINITIONS[targetId]) return null;

  const ch = normalizeChannel(channel);
  const cc = normalizeController(controller);

  // Unbind any other target currently bound to this exact (channel, controller)
  for (const [existingId, binding] of Object.entries(state.customMap)) {
    if (binding.controller === cc && (binding.channel === ch || binding.channel === "omni" || ch === "omni")) {
      delete state.customMap[existingId];
    }
  }

  // Bind the new target
  state.customMap[targetId] = { channel: ch, controller: cc };
  state.armedTargetId = null;
  state.lastLearned = { targetId, channel: ch, controller: cc };

  return { targetId, channel: ch, controller: cc };
}

/**
 * Unbinds a custom mapping for a target.
 */
export function unmapTarget(state, targetId) {
  if (state.customMap[targetId]) {
    delete state.customMap[targetId];
    if (state.lastLearned && state.lastLearned.targetId === targetId) {
      state.lastLearned = null;
    }
    return true;
  }
  return false;
}

/**
 * Clears all custom user mappings.
 */
export function clearAllMappings(state) {
  state.customMap = {};
  state.armedTargetId = null;
  state.lastLearned = null;
  return state;
}

/**
 * Resets mappings to the factory default FM-1 profile.
 */
export function resetToBuiltinDefaults(state) {
  state.customMap = {};
  for (const [ccStr, item] of Object.entries(BUILTIN_CC_MAP)) {
    const cc = Number(ccStr);
    // Bind unique target once
    if (!state.customMap[item.targetId]) {
      state.customMap[item.targetId] = { channel: "omni", controller: cc };
    }
  }
  state.armedTargetId = null;
  state.lastLearned = null;
  return state;
}

/**
 * Looks up the mapping for a target ID.
 */
export function getMappingForTarget(state, targetId) {
  if (state.customMap[targetId]) {
    return { ...state.customMap[targetId], source: "custom" };
  }
  // Check built-in fallback
  for (const [ccStr, item] of Object.entries(BUILTIN_CC_MAP)) {
    if (item.targetId === targetId) {
      return { channel: "omni", controller: Number(ccStr), source: "builtin" };
    }
  }
  return null;
}

/**
 * Resolves an incoming MIDI Control Change message against the active mappings.
 * Priority:
 * 1. If currently in learn mode and a target is armed, learns the CC and returns a learned event.
 * 2. Custom mappings in customMap matching (channel, controller) or ("omni", controller).
 * 3. Factory built-in CCs in BUILTIN_CC_MAP.
 * 4. Unmapped fallback.
 */
export function resolveMidiCC(state, channel, controller, rawValue) {
  const ch = normalizeChannel(channel);
  const cc = normalizeController(controller);
  const v = Math.max(0, Math.min(127, Math.round(rawValue || 0)));

  // If a target is armed in learn mode, bind it immediately
  if (state.learning && state.armedTargetId) {
    const learnedTargetId = state.armedTargetId;
    learnMapping(state, learnedTargetId, ch, cc);
    const targetDef = TARGET_DEFINITIONS[learnedTargetId];
    return {
      type: "learned",
      targetId: learnedTargetId,
      definition: targetDef,
      channel: ch,
      controller: cc,
      rawValue: v,
      domainValue: targetDef ? ccToDomain(targetDef, v) : v,
    };
  }

  // 1. Check custom user mappings (highest priority)
  for (const [targetId, binding] of Object.entries(state.customMap)) {
    if (binding.controller === cc && (binding.channel === "omni" || binding.channel === ch)) {
      const targetDef = TARGET_DEFINITIONS[targetId];
      if (targetDef) {
        return {
          type: "mapped",
          source: "custom",
          targetId,
          definition: targetDef,
          channel: ch,
          controller: cc,
          rawValue: v,
          domainValue: ccToDomain(targetDef, v),
        };
      }
    }
  }

  // 2. Check built-in fallback mappings
  const builtin = BUILTIN_CC_MAP[cc];
  if (builtin) {
    const targetDef = TARGET_DEFINITIONS[builtin.targetId];
    if (targetDef) {
      return {
        type: "mapped",
        source: "builtin",
        targetId: builtin.targetId,
        definition: targetDef,
        channel: ch,
        controller: cc,
        rawValue: v,
        domainValue: ccToDomain(targetDef, v),
      };
    }
  }

  // 3. Unmapped CC
  return {
    type: "unmapped",
    channel: ch,
    controller: cc,
    rawValue: v,
  };
}

/**
 * Computes an outbound MIDI CC message for hardware LED rings and motorized faders.
 * Returns { channel, controller, value } or null if unmapped or feedback disabled.
 */
export function computeOutboundCC(state, targetId, domainValue) {
  if (!state.feedbackEnabled) return null;
  const targetDef = TARGET_DEFINITIONS[targetId];
  if (!targetDef) return null;

  const mapping = getMappingForTarget(state, targetId);
  if (!mapping) return null;

  const ccVal = domainToCC(targetDef, domainValue);
  const outChannel = mapping.channel === "omni" ? 1 : mapping.channel;

  return {
    channel: outChannel,
    controller: mapping.controller,
    value: ccVal,
    targetId,
  };
}

/**
 * Serializes custom mappings to a JSON string.
 */
export function serializeMidiMap(state) {
  const payload = {
    version: 1,
    customMap: state.customMap,
    feedbackEnabled: Boolean(state.feedbackEnabled),
  };
  return JSON.stringify(payload);
}

/**
 * Parses and validates a serialized MIDI map payload.
 */
export function parseMidiMap(raw) {
  if (!raw || typeof raw !== "string") return null;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const validatedMap = {};
    if (data.customMap && typeof data.customMap === "object") {
      for (const [targetId, binding] of Object.entries(data.customMap)) {
        if (TARGET_DEFINITIONS[targetId] && binding && typeof binding === "object") {
          validatedMap[targetId] = {
            channel: normalizeChannel(binding.channel),
            controller: normalizeController(binding.controller),
          };
        }
      }
    }
    return {
      customMap: validatedMap,
      feedbackEnabled: data.feedbackEnabled !== false,
    };
  } catch {
    return null;
  }
}

/**
 * Loads custom mappings from storage (e.g. localStorage).
 */
export function loadMidiMapFromStorage(storage) {
  if (!storage || typeof storage.getItem !== "function") {
    return createMidiLearnState();
  }
  try {
    const raw = storage.getItem(MIDI_MAP_STORAGE_KEY);
    const parsed = parseMidiMap(raw);
    if (parsed) {
      return createMidiLearnState(parsed);
    }
  } catch {
    // Ignore storage read errors
  }
  return createMidiLearnState();
}

/**
 * Saves custom mappings to storage.
 */
export function saveMidiMapToStorage(storage, state) {
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    const serialized = serializeMidiMap(state);
    storage.setItem(MIDI_MAP_STORAGE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}
