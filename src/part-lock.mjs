import { parseScore, creatureName, NAME_PARTS } from "./score.mjs";

export const PART_IDS = Object.freeze([
  "beat",
  "bass",
  "harmony",
  "chime",
  "chant",
  "lead",
  "forge",
  "harp",
  "fungal",
  "theremin",
  "visuals",
  "tonality",
]);

export const MIXER_PART_IDS = Object.freeze([
  "beat",
  "bass",
  "harmony",
  "chime",
  "chant",
  "lead",
  "forge",
  "harp",
  "fungal",
  "theremin",
]);

export const META_PART_IDS = Object.freeze([
  "visuals",
  "tonality",
]);

export const PART_LABELS = Object.freeze({
  beat: "BEAT (MALBOLGE)",
  bass: "BASS (BRAINFUCK)",
  harmony: "ORGAN (BEFUNGE)",
  chime: "CHIMES (PIET/FRACTRAN)",
  chant: "CHOIR (SHAKESPEARE)",
  lead: "LEAD (LOLCODE)",
  forge: "BONE BEAT",
  harp: "SPORE HARP",
  fungal: "MUSCARIA / FUNGI",
  theremin: "THEREMIN",
  visuals: "BODY (VITRINE)",
  tonality: "KEY / SCALE",
});

export function createPartLockState(initial = {}) {
  const state = {};
  for (const part of PART_IDS) {
    state[part] = Boolean(initial[part]);
  }
  return Object.freeze(state);
}

export function countActiveLocks(lockState = {}) {
  const lockedKeys = Object.entries(lockState)
    .filter(([key, val]) => PART_IDS.includes(key) && Boolean(val))
    .map(([key]) => key);
  const locked = lockedKeys.length;
  const total = PART_IDS.length;
  return Object.freeze({
    locked,
    total,
    free: total - locked,
    isAnyLocked: locked > 0,
    lockedKeys: Object.freeze(lockedKeys),
  });
}

export function togglePartLock(lockState = {}, partId) {
  if (!PART_IDS.includes(partId)) return lockState;
  const next = { ...lockState, [partId]: !lockState[partId] };
  return Object.freeze(next);
}

export function setAllLocks(lockState = {}, value = true) {
  const next = {};
  for (const part of PART_IDS) {
    next[part] = Boolean(value);
  }
  return Object.freeze(next);
}

// Algorithmic portmanteau and fusion of creature names
export function fuseCreatureNames(baseValues, newValues, { lockVisuals = false } = {}) {
  if (!baseValues) return creatureName(newValues);
  if (!newValues) return creatureName(baseValues);

  const fused = { ...newValues };
  if (lockVisuals) {
    // Body is frozen from base creature: preserve noun from base, take new adjective/action
    fused.name_b = baseValues.name_b;
    fused.name_a = newValues.name_a;
    fused.name_c = newValues.name_c;
    fused.name_d = newValues.name_d;
    fused.name_form = newValues.name_form;
  } else {
    // Body comes from new creature: take new noun, preserve base adjective/action
    fused.name_b = newValues.name_b;
    fused.name_a = baseValues.name_a;
    fused.name_c = baseValues.name_c;
    fused.name_d = newValues.name_d;
    fused.name_form = newValues.name_form;
  }
  return creatureName(fused);
}

// Synthesizes a composite score inheriting locked parameters from baseScore
// and unlocked parameters from newScore.
export function buildChimeraScore(baseScore, newScore, locks = {}) {
  if (!baseScore || !baseScore.rawValues) return newScore;
  if (!newScore || !newScore.rawValues) return baseScore || newScore;

  const { isAnyLocked, lockedKeys } = countActiveLocks(locks);
  if (!isAnyLocked) return newScore;
  if (lockedKeys.length === PART_IDS.length) return baseScore;

  const baseRaw = baseScore.rawValues;
  const newRaw = newScore.rawValues;
  const mergedRaw = { ...newRaw };

  if (locks.beat) {
    mergedRaw.beat_mode = baseRaw.beat_mode;
    mergedRaw.beat_density = baseRaw.beat_density;
  }

  if (locks.bass) {
    mergedRaw.bass_mode = baseRaw.bass_mode;
    mergedRaw.bass_glide = baseRaw.bass_glide;
  }

  if (locks.harmony) {
    mergedRaw.harmony_mode = baseRaw.harmony_mode;
    mergedRaw.harmony_strum = baseRaw.harmony_strum;
  }

  if (locks.chime) {
    mergedRaw.chime_mode = baseRaw.chime_mode;
    mergedRaw.chime_shimmer = baseRaw.chime_shimmer;
  }

  if (locks.chant) {
    mergedRaw.chant_mode = baseRaw.chant_mode;
    mergedRaw.chant_formant = baseRaw.chant_formant;
  }

  if (locks.lead) {
    mergedRaw.melody_mode = baseRaw.melody_mode;
    mergedRaw.melody_turn = baseRaw.melody_turn;
    mergedRaw.wave = baseRaw.wave;
    mergedRaw.gate = baseRaw.gate;
    mergedRaw.voice = baseRaw.voice;
    mergedRaw.fun_voice = baseRaw.fun_voice;
    mergedRaw.fun_bright = baseRaw.fun_bright;
    mergedRaw.fun_spread = baseRaw.fun_spread;
    for (let i = 0; i < 12; i++) {
      mergedRaw[`step_${i}`] = baseRaw[`step_${i}`];
    }
  }

  if (locks.fungal) {
    mergedRaw.fungal_form = baseRaw.fungal_form;
    mergedRaw.fungal_hyphae = baseRaw.fungal_hyphae;
    mergedRaw.fungal_spores = baseRaw.fungal_spores;
    mergedRaw.fungal_bloom = baseRaw.fungal_bloom;
  }

  if (locks.tonality) {
    mergedRaw.pulse = baseRaw.pulse;
    mergedRaw.root = baseRaw.root;
    mergedRaw.scale = baseRaw.scale;
    mergedRaw.rhythm = baseRaw.rhythm;
    mergedRaw.harmony_turn = baseRaw.harmony_turn;
    mergedRaw.harmony_swap = baseRaw.harmony_swap;
    mergedRaw.harmony_borrow = baseRaw.harmony_borrow;
    mergedRaw.harmony_cadence = baseRaw.harmony_cadence;
    mergedRaw.harmony_pace = baseRaw.harmony_pace;
    mergedRaw.harmony_character = baseRaw.harmony_character;
  }

  if (locks.visuals) {
    const visualKeys = [
      "shape", "size", "edge", "motion", "kinetic_mode", "kinetic_speed", "kinetic_depth", "kinetic_tilt",
      "flux_mode", "hue", "hue_shift", "saturation", "palette", "symmetry", "twist", "bloom",
      "eyes", "eye_shape", "iris_style", "pupil_shape", "iris_hue", "iris_shift", "eye_size", "gaze", "eye_layout",
      "bell_jar", "folio_series"
    ];
    for (const key of visualKeys) {
      mergedRaw[key] = baseRaw[key];
    }
  }

  // Fused name
  if (locks.visuals) {
    mergedRaw.name_b = baseRaw.name_b;
    mergedRaw.name_a = newRaw.name_a;
    mergedRaw.name_c = newRaw.name_c;
    mergedRaw.name_d = newRaw.name_d;
    mergedRaw.name_form = newRaw.name_form;
  } else {
    mergedRaw.name_b = newRaw.name_b;
    mergedRaw.name_a = baseRaw.name_a;
    mergedRaw.name_c = baseRaw.name_c;
    mergedRaw.name_d = newRaw.name_d;
    mergedRaw.name_form = newRaw.name_form;
  }

  const lines = Object.entries(mergedRaw).map(([k, v]) => `${k}=${v}`);
  const combinedSeed = ((baseScore.seed ^ newScore.seed) >>> 0) || newScore.seed;
  const composite = parseScore(lines, combinedSeed, newScore.phrase);

  return Object.freeze({
    ...composite,
    chimera: Object.freeze({
      isChimera: true,
      basePhrase: baseScore.phrase,
      newPhrase: newScore.phrase,
      lockedParts: Object.freeze([...lockedKeys]),
    }),
  });
}

// In-place mutation helper: advances mutation count for all unlocked plates
export function mutateUnlockedPlates(currentMutations = {}, locks = {}) {
  const result = { ...currentMutations };
  const plateKeys = ["beat", "bass", "harmony", "chime", "chant"];
  for (const plate of plateKeys) {
    if (!locks[plate]) {
      result[plate] = ((result[plate] || 0) + 1);
    }
  }
  return Object.freeze(result);
}
