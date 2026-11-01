// The PlantWave Amanita Muscaria Transducer & Hallucination Matrix (P10-04, D-095).
//
// Simulates a PlantWave galvanic bio-impedance transducer attached via brass
// electrode clips to the Amanita Muscaria mycelial network in the Apparition
// Vitrine. Translates biological micro-voltage oscillations and action-potential
// spike trains into musical scale-quantized arpeggios, and intoxicates the parlor
// ensemble into an entheogenic psychoacoustic trip (master tape wow & flutter,
// spatial delay diffusion, and liquid formant sweeps).
//
// Pure state and deterministic calculations are decoupled from Web Audio
// scheduling and Canvas rendering.

import { SCALES } from "./music.mjs";
import { midiToFrequency } from "./tuning.mjs";

export const MUSCARIA_MODES = Object.freeze(["DORMANT", "BIO_PULSE", "HALLUCINATING"]);
export const TRIP_DEPTHS = Object.freeze(["MILD", "DEEP", "TRANSCENDENT"]);

export const TRIP_DEPTH_MULTIPLIERS = Object.freeze({
  MILD: 0.5,
  DEEP: 1.0,
  TRANSCENDENT: 1.75,
});

export const TRIP_DEPTH_CONFIGS = Object.freeze({
  MILD: Object.freeze({
    warpMaxCents: 12.0,
    warpSpikeCents: 10.0,
    delayModMs: 24.0,
    feedbackSwell: 0.05,
    filterMod: 0.20,
    reverbSwell: 1.15,
  }),
  DEEP: Object.freeze({
    warpMaxCents: 28.0,
    warpSpikeCents: 24.0,
    delayModMs: 50.0,
    feedbackSwell: 0.12,
    filterMod: 0.45,
    reverbSwell: 1.35,
  }),
  TRANSCENDENT: Object.freeze({
    warpMaxCents: 60.0,
    warpSpikeCents: 45.0,
    delayModMs: 95.0,
    feedbackSwell: 0.22,
    filterMod: 0.75,
    reverbSwell: 1.65,
  }),
});

const NOTE_NAMES = Object.freeze(["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]);

export function noteNameForMidi(midi) {
  if (!Number.isFinite(midi)) return "---";
  const pc = ((Math.round(midi) % 12) + 12) % 12;
  const oct = Math.floor(Math.round(midi) / 12) - 1;
  return `${NOTE_NAMES[pc]}${oct}`;
}

/**
 * Creates the pure Muscaria bio-pulse transducer and hallucination state model.
 */
export function createMuscariaModel(options = {}) {
  let mode = options.mode;
  if (mode === "BIO-PULSE") mode = "BIO_PULSE";
  if (!mode || !MUSCARIA_MODES.includes(mode)) mode = "DORMANT";
  return {
    enabled: options.enabled ?? (mode !== "DORMANT"),
    mode,
    tripDepth: options.tripDepth && TRIP_DEPTHS.includes(options.tripDepth) ? options.tripDepth : "DEEP",
    resistanceMohm: options.resistanceMohm ?? 4.82,
    voltageMv: options.voltageMv ?? 14.2,
    baselineResistance: options.baselineResistance ?? 4.82,
    baselineVoltage: options.baselineVoltage ?? 14.2,
    metabolicPhase: options.metabolicPhase ?? 0,
    respirationRate: options.respirationRate ?? 0.12, // ~0.12 Hz fungal respiration cycle
    spikePotential: options.spikePotential ?? 0,
    actionPotentials: Array.isArray(options.actionPotentials) ? [...options.actionPotentials] : [],
    totalSpikes: options.totalSpikes ?? 0,
    lastSpikeTime: options.lastSpikeTime ?? 0,
    lastNoteMidi: options.lastNoteMidi ?? null,
    lastNoteName: options.lastNoteName ?? null,
    warpCents: 0,
    delayModMs: 0,
    filterModRatio: 1.0,
    feedbackSwell: 0.0,
    reverbSwell: 1.0,
  };
}

/**
 * Sends a manual galvanic stimulation pulse through the hyphal network.
 */
export function stimulateMuscaria(model, magnitude = 1.0) {
  if (!model) return null;
  const spikeMag = Math.max(0.4, Math.min(2.5, magnitude));
  model.spikePotential += 24.0 * spikeMag;
  model.totalSpikes += 1;
  model.lastSpikeTime = Date.now();

  const spark = {
    id: Math.random(),
    progress: 0.0,
    magnitude: spikeMag,
    branchIndex: Math.floor(Math.random() * 8),
    createdAt: Date.now(),
  };
  model.actionPotentials.push(spark);
  if (model.actionPotentials.length > 16) {
    model.actionPotentials.shift();
  }
  return spark;
}

/**
 * Advances the metabolic biorhythm, membrane potentials, and modulation terms by `dt` seconds.
 */
export function stepMuscariaModel(model, dt, options = {}) {
  if (!model) return model;
  const delta = Math.max(0.001, Math.min(1.0, dt || 0.016));

  // Advance primary respiration phase and sub-harmonic oscillation
  model.metabolicPhase = (model.metabolicPhase + delta * model.respirationRate * Math.PI * 2) % (Math.PI * 200);

  // Fungal cyclic voltage oscillation: primary 0.12 Hz wave + 0.05 Hz sub-harmonic
  const primaryWave = Math.sin(model.metabolicPhase);
  const secondaryWave = Math.sin(model.metabolicPhase * 2.41);
  const metabolicVoltage = 12.0 * primaryWave + 5.5 * secondaryWave;

  // Exponential decay of transient action-potential spikes
  model.spikePotential *= Math.exp(-delta * 4.2);

  // Spontaneous action-potential spikes (stochastic Poisson generation)
  const rng = typeof options.random === "function" ? options.random : Math.random;
  const baseSpikeRate = options.hold ? 0.45 : 0.15; // Rate per second
  if (options.spontaneous !== false && model.mode !== "DORMANT" && rng() < baseSpikeRate * delta) {
    stimulateMuscaria(model, 0.7 + rng() * 0.6);
  }

  // Calculate current micro-voltage and bio-impedance
  model.voltageMv = model.baselineVoltage + metabolicVoltage + model.spikePotential;
  model.resistanceMohm = Math.max(0.8, Math.min(12.0, model.baselineResistance - (model.voltageMv - 14.0) * 0.04));

  // Advance active action-potential sparks traveling along hyphae
  for (let i = model.actionPotentials.length - 1; i >= 0; i -= 1) {
    const spark = model.actionPotentials[i];
    spark.progress += delta * 1.6;
    if (spark.progress >= 1.0) {
      model.actionPotentials.splice(i, 1);
    }
  }

  // Modulation coefficients for the psychoacoustic trip
  const cfg = TRIP_DEPTH_CONFIGS[model.tripDepth] || TRIP_DEPTH_CONFIGS.DEEP;
  if (model.mode === "HALLUCINATING") {
    // Master tape wow & flutter (cents detune): undulating organic sway + spike surge
    model.warpCents = Math.sin(model.metabolicPhase * 1.4) * cfg.warpMaxCents + (model.spikePotential / 24.0) * cfg.warpSpikeCents;
    // Spatial delay line breathing (milliseconds modulation)
    model.delayModMs = Math.sin(model.metabolicPhase * 0.85) * cfg.delayModMs;
    // Resonant creature filter and vowel formant breathing ratio
    model.filterModRatio = 1.0 + Math.sin(model.metabolicPhase * 1.15) * cfg.filterMod;
    // Feedback and reverb psychoacoustic swelling
    model.feedbackSwell = cfg.feedbackSwell;
    model.reverbSwell = cfg.reverbSwell;
  } else {
    model.warpCents = 0;
    model.delayModMs = 0;
    model.filterModRatio = 1.0;
    model.feedbackSwell = 0.0;
    model.reverbSwell = 1.0;
  }

  return model;
}

/**
 * Cycles sequentially through the three Muscaria modes: DORMANT -> BIO_PULSE -> HALLUCINATING.
 */
export function cycleMuscariaMode(model) {
  if (!model) return "DORMANT";
  const currentIdx = MUSCARIA_MODES.indexOf(model.mode);
  const nextIdx = (currentIdx + 1) % MUSCARIA_MODES.length;
  model.mode = MUSCARIA_MODES[nextIdx];
  model.enabled = (model.mode !== "DORMANT");
  return model.mode;
}

/**
 * Cycles sequentially through the three trip depths: MILD -> DEEP -> TRANSCENDENT.
 */
export function cycleTripDepth(model) {
  if (!model) return "DEEP";
  const currentIdx = TRIP_DEPTHS.indexOf(model.tripDepth);
  const nextIdx = (currentIdx + 1) % TRIP_DEPTHS.length;
  model.tripDepth = TRIP_DEPTHS[nextIdx];
  return model.tripDepth;
}

/**
 * Formats a single-line telemetry string for the DOM readout and diagnostics.
 */
export function formatMuscariaTelemetry(model) {
  if (!model) return "MUSCARIA · UNINITIALIZED";
  const r = model.resistanceMohm.toFixed(2);
  const v = model.voltageMv.toFixed(1);

  if (model.mode === "DORMANT") {
    return `MUSCARIA · DORMANT · ${r} MΩ · ΔV +${v}mV`;
  }

  const lastNote = model.lastNoteName || "---";

  if (model.mode === "BIO_PULSE") {
    return `PLANTWAVE · BIO-PULSE · ${r} MΩ · ΔV +${v}mV · NOTE [${lastNote}]`;
  }

  // HALLUCINATING
  const sign = model.warpCents >= 0 ? "+" : "";
  const warp = `${sign}${model.warpCents.toFixed(0)}¢`;
  return `MUSCARIA · TRIPPY [${model.tripDepth}] · ${r} MΩ · WARP ${warp} · NOTE [${lastNote}]`;
}

/**
 * Generates scale-quantized and chord-aware PlantWave bio-voice notes from current bio-potentials.
 */
export function generatePlantWaveNotes(model, score, chord, stepIndex, stepsCount = 12) {
  if (!model || model.mode === "DORMANT") return [];

  const root = score?.root ?? 60;
  const scale = SCALES[score?.scale] ?? SCALES[0];
  const rootPc = ((root % 12) + 12) % 12;
  const scalePcs = scale.map((step) => (rootPc + step) % 12);

  // Consonant pitch classes constrained to chord if provided
  let candidatePcs = scalePcs;
  if (chord?.pitchClasses && Array.isArray(chord.pitchClasses) && chord.pitchClasses.length > 0) {
    const chordMatches = chord.pitchClasses.filter((pc) => scalePcs.includes(pc));
    if (chordMatches.length > 0) {
      candidatePcs = chordMatches;
    } else {
      // Exclude semitone rubs against active chord tones
      const consonant = scalePcs.filter((pc) => {
        for (const cpc of chord.pitchClasses) {
          const diff = Math.min((pc - cpc + 12) % 12, (cpc - pc + 12) % 12);
          if (diff === 1) return false;
        }
        return true;
      });
      if (consonant.length > 0) candidatePcs = consonant;
      else candidatePcs = [chord.pitchClasses[0]];
    }
  }

  const notes = [];
  const hasSpike = model.spikePotential > 6.0;

  // High voltage or active spike triggers bio-arpeggio waterfall
  if (hasSpike) {
    const noteCount = Math.min(4, 2 + Math.floor(model.spikePotential / 10));
    const baseOctave = 5; // C5 register (MIDI 72)
    for (let i = 0; i < noteCount; i += 1) {
      const pc = candidatePcs[(stepIndex + i * 2) % candidatePcs.length];
      const octOffset = Math.floor(i / 2);
      const midi = (baseOctave + octOffset) * 12 + pc;
      const freq = midiToFrequency(midi);
      notes.push({
        midi,
        frequency: freq,
        noteName: noteNameForMidi(midi),
        delaySec: i * 0.052,
        duration: 0.18 + (model.voltageMv / 120.0),
        velocity: Math.min(0.85, 0.45 + (model.spikePotential / 50.0)),
        isSpike: true,
      });
    }
  } else {
    // Gentle metabolic background pulse every few steps or on voltage crests
    const voltageNorm = (model.voltageMv - 8.0) / 20.0;
    const pulseTrigger = (stepIndex % 3 === 0) || (voltageNorm > 0.65 && stepIndex % 2 === 0);
    if (pulseTrigger) {
      const oct = voltageNorm > 0.5 ? 5 : 4;
      const pc = candidatePcs[Math.floor(Math.abs(voltageNorm * candidatePcs.length)) % candidatePcs.length];
      const midi = oct * 12 + pc;
      const freq = midiToFrequency(midi);
      notes.push({
        midi,
        frequency: freq,
        noteName: noteNameForMidi(midi),
        delaySec: 0.02,
        duration: 0.28,
        velocity: Math.min(0.65, 0.32 + voltageNorm * 0.25),
        isSpike: false,
      });
    }
  }

  return notes;
}

/**
 * Web Audio step scheduler: synthesizes the PlantWave bio-voice into `destination`.
 */
export function scheduleMuscariaStep(context, destination, model, stepIndex, atTime, stepDuration, options = {}) {
  if (!context || !destination || !model || model.mode === "DORMANT") return;

  const notes = generatePlantWaveNotes(model, options.score, options.chord, stepIndex, options.stepsCount);
  if (!notes || notes.length === 0) return;

  const now = atTime || context.currentTime;

  for (const n of notes) {
    const noteStart = now + (n.delaySec || 0);
    const dur = Math.min(stepDuration * 1.5, n.duration);
    const vel = n.velocity || 0.4;

    try {
      // 1. Dual Oscillators: Warm triangle core + high shimmering sine overtone
      const osc1 = context.createOscillator();
      const osc2 = context.createOscillator();
      osc1.type = "triangle";
      osc2.type = "sine";

      // Apply psychedelic wow & flutter detune if hallucinating
      const warp = model.mode === "HALLUCINATING" ? model.warpCents : 0;
      const freq = n.frequency * (2 ** (warp / 1200));

      osc1.frequency.setValueAtTime(freq, noteStart);
      osc2.frequency.setValueAtTime(freq * 2, noteStart); // Octave brilliance

      // 2. Resonant bio-acoustic lowpass filter tracking fundamental pitch
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      const baseCutoff = Math.min(12000, freq * 3.4);
      filter.frequency.setValueAtTime(baseCutoff, noteStart);
      filter.frequency.exponentialRampToValueAtTime(Math.max(240, freq * 1.4), noteStart + dur);
      filter.Q.setValueAtTime(2.2, noteStart);

      // 3. Natural exponential decay envelope
      const envGain = context.createGain();
      envGain.gain.setValueAtTime(0.0001, noteStart);
      envGain.gain.linearRampToValueAtTime(vel * 0.52, noteStart + 0.008);
      envGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + dur);

      // 4. Drifting stereo panner following metabolic phase
      let panNode = null;
      if (typeof context.createStereoPanner === "function") {
        panNode = context.createStereoPanner();
        const panValue = Math.sin(model.metabolicPhase + (n.delaySec || 0) * 4) * 0.65;
        panNode.pan.setValueAtTime(panValue, noteStart);
      }

      // Audio Graph Connections
      const mixGain = context.createGain();
      mixGain.gain.value = 0.55;
      osc1.connect(filter);
      osc2.connect(mixGain).connect(filter);
      filter.connect(envGain);

      if (panNode) {
        envGain.connect(panNode).connect(destination);
      } else {
        envGain.connect(destination);
      }

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc1.stop(noteStart + dur + 0.05);
      osc2.stop(noteStart + dur + 0.05);

      osc1.onended = () => {
        try {
          mixGain?.disconnect?.();
          filter?.disconnect?.();
          envGain?.disconnect?.();
          panNode?.disconnect?.();
        } catch {}
      };
      osc2.onended = () => {
        try {
          mixGain?.disconnect?.();
        } catch {}
      };

      model.lastNoteMidi = n.midi;
      model.lastNoteName = n.noteName;

      if (typeof options.logNote === "function") {
        options.logNote(n.midi, noteStart, dur, vel);
      }
    } catch {
      // Discard errors on restricted or tearing audio contexts
    }
  }
}
