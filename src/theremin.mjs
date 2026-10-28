// The Aetheric Bone Theremin (P10-01, D-089).
//
// An expressive, tactile electrophone played by moving, holding, and dragging
// across the Apparition Vitrine. Modeled directly on BoneAmanita's TheTheremin
// (machine/theremin.py) and the GLASS archetype:
//   "Focus on resonance and vibration. Speak of echoes and empty spaces.
//    Be fragile and reactive. Detect invisible patterns."
//
// Dual Virtual Antennas:
// - Pitch (X-Axis & Distance): Frequency mapped across the creature's scale,
//   with vacuum-tube heterodyne dual oscillators and portamento glide.
// - Volume & Timbre (Y-Axis & Proximity): Distance shapes vacuum-tube gain,
//   saturation, and high-frequency opening.
//
// BoneAmanita Physics Engine:
// - Resin Flow: Continuous movement accumulates amber resin.
// - Calcification (Slag): Lingering on one pitch accumulates calcified slag,
//   adding warm harmonic saturation and overtone grit.
// - Melt: Swift, turbulent gestures dissolve decoherence buildup.
// - Shatter: Agile melodic motion shatters decoherence with crystalline pings.
// - Trapped in Amber (STUCK): Buildup over AMBER_THRESHOLD (20) muffles the
//   instrument into an amber subterranean thrum until a fast flick frees it.
// - Shatter Point Collapse: Crossing SHATTER_POINT (100) triggers a resonant
//   harmonic discharge.

import { SCALES } from "./music.mjs";

export const THEREMIN_AMBER_THRESHOLD = 20.0;
export const THEREMIN_SHATTER_POINT = 100.0;
export const THEREMIN_MELT_THRESHOLD = 5.0;

export const THEREMIN_MIN_MIDI = 48; // C3
export const THEREMIN_MAX_MIDI = 84; // C6

/**
 * Creates a new state model for the Aetheric Bone Theremin.
 */
export function createThereminModel(initial = {}) {
  return {
    enabled: initial.enabled !== undefined ? Boolean(initial.enabled) : true,
    scaleSnap: initial.scaleSnap !== undefined ? Boolean(initial.scaleSnap) : true,
    decoherenceBuildup: Number(initial.decoherenceBuildup) || 0.0,
    classicalTurns: Number(initial.classicalTurns) || 0,
    isStuck: Boolean(initial.isStuck),
    resinFlow: Number(initial.resinFlow) || 0.0,
    status: initial.status || "FLOW", // "FLOW" | "CALCIFYING" | "STUCK" | "SHATTERED" | "MELTED"
    slag: Number(initial.slag) || 0.0,
    lastX: null,
    lastY: null,
    lastPitchClass: null,
    lastMidi: null,
    activePitch: 440,
    activeGain: 0.0,
  };
}

/**
 * Maps horizontal normalized coordinate (-1..1) to a frequency in Hz.
 * When scaleSnap is true, snaps to the closest degree of the creature's scale.
 */
export function pitchForThereminCoordinate(normX, score, scaleSnap = true) {
  const rootMidi = score?.root !== undefined ? score.root : 60;
  const scaleIndex = score?.scale !== undefined ? score.scale % SCALES.length : 0;
  const scale = SCALES[scaleIndex] || SCALES[0];

  // Map normX (-1 to +1) to a span of 36 semitones (3 octaves) centered around middle register
  const baseOffset = Math.floor(rootMidi / 12) * 12;
  const minMidi = Math.max(36, baseOffset - 12);
  const maxMidi = minMidi + 36;
  const clampedX = Math.max(-1, Math.min(1, Number(normX) || 0));
  const normalized = (clampedX + 1) * 0.5; // 0..1

  if (!scaleSnap) {
    const rawMidi = minMidi + normalized * (maxMidi - minMidi);
    return {
      midi: rawMidi,
      frequency: 440 * (2 ** ((rawMidi - 69) / 12)),
      pitchClass: Math.round(rawMidi) % 12,
    };
  }

  // Build full list of available scale pitches across the 3 octaves
  const candidateMidis = [];
  for (let octave = 0; octave <= 3; octave += 1) {
    const octMidi = minMidi + octave * 12;
    for (const step of scale) {
      const pitch = (octMidi + (step % 12));
      if (pitch >= minMidi && pitch <= maxMidi && !candidateMidis.includes(pitch)) {
        candidateMidis.push(pitch);
      }
    }
  }
  candidateMidis.sort((a, b) => a - b);

  const targetIndex = Math.min(candidateMidis.length - 1, Math.floor(normalized * candidateMidis.length));
  const chosenMidi = candidateMidis[targetIndex] ?? rootMidi;

  return {
    midi: chosenMidi,
    frequency: 440 * (2 ** ((chosenMidi - 69) / 12)),
    pitchClass: chosenMidi % 12,
  };
}

/**
 * Updates the physical-metabolic Theremin state based on vitrine motion.
 * Returns an array of events: ["MELT", "SHATTER", "CALCIFY", "STUCK", "COLLAPSE", "FREE"]
 */
export function updateThereminModel(model, {
  normX = 0,
  normY = 0,
  speed = 0,
  isInteracting = false,
  pitchClass = null,
  midi = null,
} = {}) {
  const events = [];

  if (!model.enabled || !isInteracting) {
    // Natural dissipation when not active
    model.resinFlow = Math.max(0, model.resinFlow * 0.9);
    if (!model.isStuck) {
      model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - 0.08);
      model.classicalTurns = Math.max(0, model.classicalTurns - 1);
      model.slag = Math.max(0, model.slag * 0.95);
      model.status = "FLOW";
    } else if (model.decoherenceBuildup < THEREMIN_MELT_THRESHOLD) {
      model.isStuck = false;
      model.status = "FLOW";
      events.push("FREE");
    }
    model.lastX = null;
    model.lastY = null;
    return events;
  }

  // Active motion tracking
  const dx = model.lastX !== null ? normX - model.lastX : 0;
  const dy = model.lastY !== null ? normY - model.lastY : 0;
  const currentSpeed = speed > 0 ? speed : Math.hypot(dx, dy);
  model.lastX = normX;
  model.lastY = normY;

  // Resin flow from kinetic motion
  model.resinFlow = Math.min(25.0, currentSpeed * 4.0);

  // 1. Melt: rapid turbulent movement dissolves decoherence
  if (currentSpeed > 0.45 && model.decoherenceBuildup > 0) {
    const dissolved = currentSpeed * 10.0;
    model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - dissolved);
    model.classicalTurns = 0;
    model.slag = Math.max(0, model.slag - 0.2);
    model.status = "MELTED";
    events.push("MELT");
  }
  // 2. Calcify: hovering stationary builds classical turns and calcified slag
  else if (currentSpeed < 0.035) {
    model.classicalTurns += 1;
    const slagInc = Math.min(2.0, model.classicalTurns * 0.15);
    model.decoherenceBuildup += slagInc;
    model.slag = Math.min(1.0, model.classicalTurns * 0.04);
    model.status = "CALCIFYING";
    events.push("CALCIFY");
  }
  // 3. Complexity / Shatter: note progression relieves decoherence
  else if (pitchClass !== null && model.lastPitchClass !== null && pitchClass !== model.lastPitchClass) {
    if (model.classicalTurns > 0) {
      model.classicalTurns = 0;
      const relief = 12.0;
      model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - relief);
      model.status = "SHATTERED";
      events.push("SHATTER");
    } else {
      model.status = "FLOW";
    }
  } else if (!model.isStuck) {
    model.status = "FLOW";
  }

  model.lastPitchClass = pitchClass;
  model.lastMidi = midi;

  // 4. Critical Shatter Point Collapse
  if (model.decoherenceBuildup >= THEREMIN_SHATTER_POINT) {
    model.decoherenceBuildup = 0.0;
    model.classicalTurns = 0;
    model.slag = 0.0;
    model.isStuck = false;
    model.status = "SHATTERED";
    events.push("COLLAPSE");
    return events;
  }

  // 5. Amber Threshold state transition
  if (model.decoherenceBuildup > THEREMIN_AMBER_THRESHOLD) {
    if (!model.isStuck) {
      model.isStuck = true;
      events.push("STUCK");
    }
    model.status = "STUCK";
  } else if (model.isStuck && model.decoherenceBuildup < THEREMIN_MELT_THRESHOLD) {
    model.isStuck = false;
    model.status = "FLOW";
    events.push("FREE");
  }

  return events;
}

/**
 * Formats user-facing status line for the stage telemetry display.
 */
export function formatThereminTelemetry(model, frequency = null) {
  if (!model.enabled) {
    return "BONE THEREMIN · MUTED";
  }
  const resin = (model.resinFlow || 0).toFixed(1);
  const freqStr = frequency ? ` · ${Math.round(frequency)} Hz` : "";

  if (model.isStuck) {
    return `THEREMIN · STUCK IN AMBER · FLICK TO FREE${freqStr}`;
  }
  if (model.status === "CALCIFYING") {
    return `THEREMIN · CALCIFYING (SLAG ${(model.slag * 100).toFixed(0)}%)${freqStr}`;
  }
  if (model.status === "SHATTERED") {
    return `THEREMIN · SHATTERED BURST${freqStr}`;
  }
  if (model.status === "MELTED") {
    return `THEREMIN · RESIN DISSOLVED${freqStr}`;
  }
  return `THEREMIN · FLOW · RESIN ${resin}${freqStr}`;
}

/**
 * Creates the Web Audio synthesizer node graph for the Aetheric Bone Theremin.
 */
export function createThereminVoice(audioContext, destination) {
  if (!audioContext || !destination) return null;

  const now = audioContext.currentTime;

  // Primary carrier oscillator (vacuum tube warm triangle)
  const carrier = audioContext.createOscillator();
  carrier.type = "triangle";
  carrier.frequency.setValueAtTime(440, now);

  // Beating heterodyne partial (slight detune for analog tube chorusing)
  const beater = audioContext.createOscillator();
  beater.type = "sine";
  beater.frequency.setValueAtTime(441.5, now);

  // Sub-octave harmonic foundation
  const sub = audioContext.createOscillator();
  sub.type = "sine";
  sub.frequency.setValueAtTime(220, now);

  const subGain = audioContext.createGain();
  subGain.gain.setValueAtTime(0.18, now);

  const beaterGain = audioContext.createGain();
  beaterGain.gain.setValueAtTime(0.35, now);

  // Calcified slag saturator (WaveShaper for calcification overdrive)
  const slagShaper = audioContext.createWaveShaper();
  slagShaper.curve = makeSlagCurve(0);
  slagShaper.oversample = "2x";

  // Vacuum-tube amber resonance filter
  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4200, now);
  filter.Q.setValueAtTime(2.2, now);

  // Master Theremin voice gain
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);

  // Panner for stereo projection across the vitrine
  const panner = audioContext.createStereoPanner ? audioContext.createStereoPanner() : null;

  // Graph wiring:
  // carrier + beater + sub -> slagShaper -> filter -> panner -> masterGain -> destination
  carrier.connect(slagShaper);
  beater.connect(beaterGain).connect(slagShaper);
  sub.connect(subGain).connect(slagShaper);

  slagShaper.connect(filter);
  if (panner) {
    filter.connect(panner);
    panner.connect(masterGain);
  } else {
    filter.connect(masterGain);
  }
  masterGain.connect(destination);

  carrier.start(now);
  beater.start(now);
  sub.start(now);

  return {
    carrier,
    beater,
    sub,
    subGain,
    beaterGain,
    slagShaper,
    filter,
    masterGain,
    panner,
    currentFreq: 440,
    currentSlag: 0,
    shatterTine(freq, atTime = null) {
      const time = atTime ?? audioContext.currentTime;
      // High crystalline shatter pings
      const ratios = [2.76, 3.52, 4.18];
      for (const ratio of ratios) {
        const pingOsc = audioContext.createOscillator();
        const pingGain = audioContext.createGain();
        pingOsc.type = "sine";
        pingOsc.frequency.setValueAtTime(freq * ratio, time);
        pingGain.gain.setValueAtTime(0.0001, time);
        pingGain.gain.exponentialRampToValueAtTime(0.045, time + 0.008);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);
        pingOsc.connect(pingGain).connect(destination);
        pingOsc.start(time);
        pingOsc.stop(time + 0.16);
      }
    },
    silence(atTime = null) {
      const time = atTime ?? audioContext.currentTime;
      masterGain.gain.setTargetAtTime(0.0001, time, 0.03);
    },
    updateAudio({
      frequency = 440,
      gain = 0,
      normX = 0,
      slag = 0,
      isStuck = false,
      now: currentTime = null,
    }) {
      const time = currentTime ?? audioContext.currentTime;
      // Portamento frequency tracking
      carrier.frequency.setTargetAtTime(frequency, time, 0.024);
      beater.frequency.setTargetAtTime(frequency * 1.003, time, 0.024);
      sub.frequency.setTargetAtTime(frequency * 0.5, time, 0.024);

      // Pan following vitrine location
      if (panner) {
        panner.pan.setTargetAtTime(Math.max(-0.9, Math.min(0.9, normX * 0.9)), time, 0.03);
      }

      // Filter cutoff: heavily muffled when trapped in amber
      const targetCutoff = isStuck ? 280 : (3200 + gain * 3800);
      const targetQ = isStuck ? 4.8 : (1.8 + slag * 3.5);
      filter.frequency.setTargetAtTime(targetCutoff, time, 0.035);
      filter.Q.setTargetAtTime(targetQ, time, 0.035);

      // Slag saturation curve
      if (Math.abs(slag - this.currentSlag) > 0.08) {
        this.currentSlag = slag;
        slagShaper.curve = makeSlagCurve(slag);
      }

      // Voice gain
      masterGain.gain.setTargetAtTime(Math.max(0.0001, gain), time, 0.028);
      this.currentFreq = frequency;
    },
    dispose() {
      try {
        carrier.stop();
        beater.stop();
        sub.stop();
      } catch {}
    },
  };
}

/**
 * Generates an asymmetric saturation distortion curve for calcified slag.
 */
function makeSlagCurve(slag = 0) {
  const samples = 256;
  const curve = new Float32Array(samples);
  const drive = 1 + slag * 8.0;
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    if (slag <= 0.01) {
      curve[i] = x;
    } else {
      // Soft-clipping hyperbolic tangent with odd harmonic saturation
      curve[i] = Math.tanh(x * drive);
    }
  }
  return curve;
}
