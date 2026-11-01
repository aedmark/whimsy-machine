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
    stillnessTime: Number(initial.stillnessTime) || 0.0,
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
 * Defaults to scale degree quantization (scaleSnap = true).
 * When scaleSnap is false, allows continuous free microtonal analog glide.
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
      pitchClass: (Math.round(rawMidi) % 12 + 12) % 12,
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
 * Uses real delta time dt (seconds) to prevent high frame-rate rapid runaway.
 * Returns an array of events: ["MELT", "SHATTER", "CALCIFY", "STUCK", "COLLAPSE", "FREE"]
 */
export function updateThereminModel(model, {
  normX = 0,
  normY = 0,
  speed = 0,
  isInteracting = false,
  pitchClass = null,
  midi = null,
  dt = 0.016,
} = {}) {
  const events = [];
  const safeDt = Math.max(0.0001, Math.min(5.0, Number(dt) || 0.016));

  if (!model.enabled || !isInteracting) {
    // Natural dissipation when not active
    model.stillnessTime = 0.0;
    model.resinFlow = Math.max(0, model.resinFlow - safeDt * 4.0);
    if (!model.isStuck) {
      model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - safeDt * 5.0);
      model.classicalTurns = Math.max(0, model.classicalTurns - safeDt * 2.0);
      model.slag = Math.max(0, model.slag - safeDt * 0.8);
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

  // Fluid resin flow from kinetic motion
  const targetResin = Math.min(10.0, currentSpeed * 14.0);
  model.resinFlow += (targetResin - model.resinFlow) * Math.min(1, safeDt * 5.0);

  // 1. Melt: rapid, turbulent flick dissolves decoherence and slag
  if (currentSpeed > 0.32 && (model.decoherenceBuildup > 0 || model.slag > 0)) {
    const dissolved = currentSpeed * 35.0 * safeDt;
    model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - dissolved);
    model.stillnessTime = 0.0;
    model.classicalTurns = Math.max(0, model.classicalTurns - safeDt * 3.0);
    model.slag = Math.max(0, model.slag - safeDt * 2.5);
    model.status = "MELTED";
    events.push("MELT");
  }
  // 2. Calcify: hovering motionlessly builds stillness and calcified slag
  else if (currentSpeed < 0.012) {
    model.stillnessTime += safeDt;
    // Generous grace period: first 2.5 seconds are completely clean for sustained singing notes
    if (model.stillnessTime > 2.5) {
      const activeStill = model.stillnessTime - 2.5;
      model.classicalTurns += safeDt;
      const rate = 1.2 + Math.min(2.0, activeStill * 0.25);
      model.decoherenceBuildup += rate * safeDt;
      model.slag = Math.min(1.0, activeStill * 0.09);
      model.status = "CALCIFYING";
      events.push("CALCIFY");
    } else if (!model.isStuck) {
      model.status = "FLOW";
    }
  }
  // 3. Fluid Melodic Motion: moving between notes naturally relieves decoherence
  else {
    model.stillnessTime = Math.max(0, model.stillnessTime - safeDt * 3.0);
    if (!model.isStuck) {
      model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - safeDt * 4.0);
      model.slag = Math.max(0, model.slag - safeDt * 0.6);
      model.status = "FLOW";
    }
  }

  // Melodic transitions quietly relieve stationary tension without abrasive burst pings
  if (pitchClass !== null && model.lastPitchClass !== null && pitchClass !== model.lastPitchClass) {
    model.stillnessTime = 0.0;
    if (model.decoherenceBuildup > 0 && !model.isStuck) {
      model.decoherenceBuildup = Math.max(0, model.decoherenceBuildup - 1.2);
    }
  }

  model.lastPitchClass = pitchClass;
  model.lastMidi = midi;

  // 4. Critical Shatter Point Collapse (extreme buildup discharge)
  if (model.decoherenceBuildup >= THEREMIN_SHATTER_POINT) {
    model.decoherenceBuildup = 0.0;
    model.stillnessTime = 0.0;
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

// Pre-computed static soft-clip tanh curve for click-free saturation
const STATIC_TANH_CURVE = (() => {
  const samples = 512;
  const curve = new Float32Array(samples);
  const norm = Math.tanh(1.6);
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(x * 1.6) / norm;
  }
  return curve;
})();

/**
 * Creates the Web Audio synthesizer node graph for the Aetheric Bone Theremin.
 * Operates as a pure, vocal, liquid-gliding analog instrument with zero beating
 * and smooth tube warmth.
 */
export function createThereminVoice(audioContext, destination) {
  if (!audioContext || !destination) return null;

  const now = audioContext.currentTime;

  // Primary warm singing carrier oscillator (triangle)
  const carrier = audioContext.createOscillator();
  carrier.type = "triangle";
  carrier.frequency.setValueAtTime(440, now);

  // Phase-locked sub-octave foundation (pure sine at exact 0.5x, zero beating!)
  const sub = audioContext.createOscillator();
  sub.type = "sine";
  sub.frequency.setValueAtTime(220, now);

  const subGain = audioContext.createGain();
  subGain.gain.setValueAtTime(0.08, now);

  // Pre-drive gain node for smooth, click-free saturation control
  const slagDrive = audioContext.createGain();
  slagDrive.gain.setValueAtTime(1.0, now);

  // Static soft-clipping WaveShaper
  const slagShaper = audioContext.createWaveShaper();
  slagShaper.curve = STATIC_TANH_CURVE;
  slagShaper.oversample = "2x";

  // Post-saturation makeup trim
  const slagPostGain = audioContext.createGain();
  slagPostGain.gain.setValueAtTime(0.85, now);

  // Vacuum-tube warm resonant lowpass filter
  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3200, now);
  filter.Q.setValueAtTime(1.3, now);

  // Master Theremin voice gain
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);

  // Stereo panner for smooth spatial projection across the vitrine
  const panner = audioContext.createStereoPanner ? audioContext.createStereoPanner() : null;

  // Audio Graph:
  // carrier + (sub * subGain) -> slagDrive -> slagShaper -> slagPostGain -> filter -> (panner) -> masterGain -> destination
  carrier.connect(slagDrive);
  sub.connect(subGain).connect(slagDrive);
  slagDrive.connect(slagShaper).connect(slagPostGain).connect(filter);

  if (panner) {
    filter.connect(panner);
    panner.connect(masterGain);
  } else {
    filter.connect(masterGain);
  }
  masterGain.connect(destination);

  carrier.start(now);
  sub.start(now);

  return {
    carrier,
    sub,
    subGain,
    slagDrive,
    slagShaper,
    slagPostGain,
    filter,
    masterGain,
    panner,
    currentFreq: 440,
    shatterTine(freq, atTime = null) {
      const time = atTime ?? audioContext.currentTime;
      // High crystalline shatter pings (used only on critical collapse)
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
        pingOsc.onended = () => { try { pingGain?.disconnect?.(); } catch {} };
      }
    },
    silence(atTime = null) {
      const time = atTime ?? audioContext.currentTime;
      masterGain.gain.setTargetAtTime(0.0001, time, 0.035);
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
      // Portamento frequency tracking: smooth, liquid vocal glide (0.040s)
      carrier.frequency.setTargetAtTime(frequency, time, 0.040);
      sub.frequency.setTargetAtTime(frequency * 0.5, time, 0.040);

      // Pan following vitrine location
      if (panner) {
        panner.pan.setTargetAtTime(Math.max(-0.85, Math.min(0.85, normX * 0.85)), time, 0.045);
      }

      // Filter cutoff: warmly opens with volume, smoothly muffles down when trapped in amber
      const targetCutoff = isStuck ? 420 : (2400 + gain * 4600);
      const targetQ = isStuck ? 2.4 : (1.2 + slag * 0.8);
      filter.frequency.setTargetAtTime(targetCutoff, time, 0.055);
      filter.Q.setTargetAtTime(targetQ, time, 0.055);

      // Slag saturation drive (smooth parameter ramp, zero clicks!)
      const drive = 1.0 + Math.max(0, Math.min(1, slag)) * 2.2;
      slagDrive.gain.setTargetAtTime(drive, time, 0.045);

      // Voice gain
      masterGain.gain.setTargetAtTime(Math.max(0.0001, gain), time, 0.030);
      this.currentFreq = frequency;
    },
    dispose() {
      try {
        carrier.stop();
        sub.stop();
      } catch {}
    },
  };
}
