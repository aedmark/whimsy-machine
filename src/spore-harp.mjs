// The BioParasite Spore Harp (P10-03, D-091).
//
// An acoustic string-plucked harp where growing mycelium hyphae and anastomoses
// act as resonant strings, struck and plucked when ballistospores are puffed across
// the bell jar or when the visitor sweeps across the apparition vitrine.
//
// Inspired directly by BoneAmanita's BioParasite (spores/biome.py) and Lichen symbionts:
// - Hyphal Silk (silk / chitin): Clean, crystalline concert harp & koto tone.
// - Lichen Symbiont (lichen / photobiont): Resonant photobiont bloom with sustained harmonic glow.
// - Cordyceps Spine (cordyceps / parasite): High-tension inharmonic kalimba/harpsichord attack.
// - Marrow Anastomosis (mutual / guttation): Deep guttation thrum with meniscus surface-tension pop.

import { SCALES } from "./music.mjs";
import { midiToFrequency } from "./tuning.mjs";

export const HARP_STRING_COUNT = 8;
export const HARP_SYMBIOSIS_MODES = Object.freeze(["LICHEN", "CORDYCEPS", "SILK", "MUTUAL"]);

export const HARP_TENSION_PRESETS = Object.freeze([
  Object.freeze({ value: 1.0, label: "1.0× CONCERT" }),
  Object.freeze({ value: 1.25, label: "1.25× TIGHT" }),
  Object.freeze({ value: 1.5, label: "1.5× BRILLIANT" }),
  Object.freeze({ value: 0.75, label: "0.75× WARM" }),
]);

const NOTE_NAMES = Object.freeze(["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]);

function noteNameForMidi(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const oct = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pc]}${oct}`;
}

/**
 * Creates the state model for The BioParasite Spore Harp.
 */
export function createSporeHarpModel(initial = {}) {
  return {
    enabled: initial.enabled !== undefined ? Boolean(initial.enabled) : false,
    symbiosis: HARP_SYMBIOSIS_MODES.includes(initial.symbiosis) ? initial.symbiosis : "LICHEN",
    tension: Number.isFinite(initial.tension) ? Math.max(0.5, Math.min(2.0, initial.tension)) : 1.0,
    autoStrum: initial.autoStrum !== undefined ? Boolean(initial.autoStrum) : true,
    strings: Array.isArray(initial.strings) ? initial.strings : [],
    totalPlucks: Number(initial.totalPlucks) || 0,
    lastPluckedIndex: -1,
    lastPluckedAt: 0,
  };
}

/**
 * Deterministically constructs 8 tuned hyphal strings across the mycelial network.
 * Strings are octave-aligned to the sparkling concert harp register (C4-C6, MIDI 60-84).
 */
export function buildHyphalStrings(score, options = {}) {
  const root = Number.isFinite(score?.root) ? score.root : 60;
  const scaleIndex = (score?.scale !== undefined ? score.scale : 0) % SCALES.length;
  const scale = SCALES[scaleIndex] || SCALES[0];
  const refPitch = options.referencePitch || 440;

  // Concert parlor harp register: octave-shifted up so strings sing sparklingly across C4-C6 (MIDI 60-84)
  let baseMidi = root;
  while (baseMidi < 60) baseMidi += 12;
  while (baseMidi > 72) baseMidi -= 12;
  const strings = [];

  // Radial angles spread around the bell jar perimeter for string endpoints
  for (let i = 0; i < HARP_STRING_COUNT; i += 1) {
    const scaleStep = scale[i % scale.length] + Math.floor(i / scale.length) * 12;
    const midi = baseMidi + scaleStep;
    const frequency = midiToFrequency(midi, refPitch);
    const noteName = noteNameForMidi(midi);

    // Geometry: strings stretch diagonally across the mycelium web
    // Left anchor: x1 ~ -0.72..-0.15, y1 ~ -0.65..0.65
    // Right anchor: x2 ~ +0.15..+0.72, y2 ~ -0.65..0.65
    const t = i / (HARP_STRING_COUNT - 1 || 1);
    const ySpread = -0.62 + t * 1.24;
    const angle1 = Math.PI * 0.75 + (t - 0.5) * 0.85;
    const angle2 = -Math.PI * 0.25 + (t - 0.5) * 0.85;

    const r1 = 0.55 + Math.sin(i * 1.7) * 0.15;
    const r2 = 0.58 + Math.cos(i * 2.1) * 0.14;

    const x1 = Math.cos(angle1) * r1;
    const y1 = ySpread + Math.sin(angle1) * 0.18;
    const x2 = Math.cos(angle2) * r2;
    const y2 = ySpread + Math.sin(angle2) * 0.18;

    const length = Math.hypot(x2 - x1, y2 - y1);

    strings.push({
      index: i,
      midi,
      frequency,
      noteName,
      x1: Math.round(x1 * 1000) / 1000,
      y1: Math.round(y1 * 1000) / 1000,
      x2: Math.round(x2 * 1000) / 1000,
      y2: Math.round(y2 * 1000) / 1000,
      length: Math.round(length * 1000) / 1000,
      sporeDensity: 0.0,
      vibration: 0.0,
      vibratingUntil: 0,
      lastPluckedAt: 0,
    });
  }

  return strings;
}

/**
 * Plucks a specific hyphal string on the model, updating vibration and spore density.
 */
export function pluckHyphalString(model, stringIndex, velocity = 0.8) {
  if (!model.enabled || !model.strings || model.strings.length === 0) return null;
  const idx = ((stringIndex % model.strings.length) + model.strings.length) % model.strings.length;
  const str = model.strings[idx];
  if (!str) return null;

  const now = Date.now();
  model.totalPlucks += 1;
  model.lastPluckedIndex = idx;
  model.lastPluckedAt = now;

  const vel = Math.max(0.1, Math.min(1.0, velocity));
  str.vibration = vel;
  str.vibratingUntil = now + Math.round(350 + vel * 450);
  str.sporeDensity = Math.min(1.0, str.sporeDensity + 0.08 * vel);
  str.lastPluckedAt = now;

  return {
    index: idx,
    midi: str.midi,
    frequency: str.frequency * model.tension,
    noteName: str.noteName,
    velocity: vel,
    symbiosis: model.symbiosis,
    sporeDensity: str.sporeDensity,
  };
}

/**
 * Strums all hyphal strings in sequence.
 * Direction: 1 = ascending (0 -> 7), -1 = descending (7 -> 0).
 */
export function strumHarp(model, {
  direction = 1,
  velocity = 0.85,
  staggerMs = 38,
} = {}) {
  if (!model.enabled || !model.strings || model.strings.length === 0) return [];
  const count = model.strings.length;
  const results = [];
  const order = direction >= 0
    ? Array.from({ length: count }, (_, i) => i)
    : Array.from({ length: count }, (_, i) => count - 1 - i);

  order.forEach((stringIndex, step) => {
    const pluck = pluckHyphalString(model, stringIndex, velocity * (0.85 + Math.random() * 0.25));
    if (pluck) {
      results.push({
        ...pluck,
        delayMs: step * staggerMs,
      });
    }
  });

  return results;
}

/**
 * Cycles through the 4 symbiosis modes.
 */
export function cycleSymbiosis(model) {
  const curIdx = HARP_SYMBIOSIS_MODES.indexOf(model.symbiosis);
  const nextIdx = (curIdx + 1) % HARP_SYMBIOSIS_MODES.length;
  model.symbiosis = HARP_SYMBIOSIS_MODES[nextIdx];
  return model.symbiosis;
}

/**
 * Cycles through the 4 string tension presets (CONCERT, TIGHT, BRILLIANT, WARM).
 */
export function cycleTension(model) {
  if (!model) return 1.0;
  const current = Number(model.tension) || 1.0;
  const currentIndex = HARP_TENSION_PRESETS.findIndex((p) => Math.abs(p.value - current) < 0.05);
  const nextIndex = (currentIndex + 1) % HARP_TENSION_PRESETS.length;
  model.tension = HARP_TENSION_PRESETS[nextIndex].value;
  return model.tension;
}

/**
 * Formats user-facing tension button label.
 */
export function formatTensionLabel(tension) {
  const current = Number(tension) || 1.0;
  const preset = HARP_TENSION_PRESETS.find((p) => Math.abs(p.value - current) < 0.05);
  return preset ? preset.label : `${current.toFixed(2)}×`;
}

/**
 * Formats telemetry line for the stage display.
 */
export function formatSporeHarpTelemetry(model) {
  if (!model.enabled) {
    return "SPORE HARP · MUTED";
  }
  const count = model.strings?.length || HARP_STRING_COUNT;
  const sym = model.symbiosis;
  const plucks = model.totalPlucks;
  const tens = model.tension.toFixed(1);

  if (model.lastPluckedIndex >= 0 && Date.now() - model.lastPluckedAt < 1200) {
    const note = model.strings?.[model.lastPluckedIndex]?.noteName || "HYPHA";
    return `SPORE HARP · PLUCK [${note}] · ${sym} · TENS ${tens} · ${plucks} PLUCKS`;
  }

  return `SPORE HARP · ${count} HYPHAE · ${sym} · TENS ${tens} · ${plucks} PLUCKS`;
}

/**
 * Tests segment intersection between pointer movement (p1 -> p2) and hyphal string (s1 -> s2),
 * or proximity of p2 to the string.
 */
export function checkStringIntersection(p1, p2, str, threshold = 0.045) {
  const A = { x: str.x1, y: str.y1 };
  const B = { x: str.x2, y: str.y2 };
  const C = p1;
  const D = p2;

  // 1. Line segment intersection check (crossing stroke)
  const ccw = (p, q, r) => (r.y - p.y) * (q.x - p.x) > (q.y - p.y) * (r.x - p.x);
  if (ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D)) {
    return true;
  }

  // 2. Point-to-segment proximity check (tapping or hovering on string)
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(D.x - A.x, D.y - A.y) < threshold;

  const t = Math.max(0, Math.min(1, ((D.x - A.x) * dx + (D.y - A.y) * dy) / lenSq));
  const projX = A.x + t * dx;
  const projY = A.y + t * dy;
  return Math.hypot(D.x - projX, D.y - projY) < threshold;
}

// --- Web Audio Physical Acoustic String Pluck Synthesizers -------------------

/**
 * Schedules auto-strum harp plucks on a playback loop step.
 */
export function scheduleSporeHarpStep(context, destination, model, stepIndex, atTime, stepDuration, options = {}) {
  if (!context || !destination || !model?.enabled || !model.autoStrum || !model.strings?.length) return;

  const chord = options.chord;
  let candidates = [];
  if (chord?.pitchClasses?.length) {
    const chordPcs = new Set(chord.pitchClasses);
    candidates = model.strings.filter((str) => chordPcs.has(str.midi % 12));
    if (!candidates.length) {
      // Score strings by harmonic consonance with chord tones: reject semitone (1) and tritone (6) clashes
      candidates = model.strings
        .map((str) => {
          const pc = str.midi % 12;
          let minDiff = 12;
          let hasClash = false;
          for (const cpc of chord.pitchClasses) {
            const diff = Math.min((pc - cpc + 12) % 12, (cpc - pc + 12) % 12);
            if (diff === 1 || diff === 6) hasClash = true;
            if (diff < minDiff) minDiff = diff;
          }
          const score = hasClash ? -10 : (minDiff === 0 ? 10 : (minDiff === 5 ? 8 : (minDiff === 3 || minDiff === 4 ? 7 : (minDiff === 2 ? 5 : 1))));
          return { str, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.str);
    }
  }
  if (!candidates.length) {
    candidates = model.strings;
  }

  // Deterministic arpeggio contour: pluck consonant chord/scale string with clear parlor acoustic velocity
  const primaryIdx = candidates[stepIndex % candidates.length].index;
  const pluck = pluckHyphalString(model, primaryIdx, 0.38);

  if (pluck) {
    triggerHyphalPluck(context, destination, pluck.frequency, pluck.velocity, {
      symbiosis: model.symbiosis,
      sporeDensity: pluck.sporeDensity,
      atTime,
    });
    if (typeof options.logNote === "function") {
      const soundedMidi = Math.round(pluck.midi + 12 * Math.log2(model.tension || 1.0));
      options.logNote(soundedMidi, atTime, Math.min(stepDuration * 1.5, 0.65), pluck.velocity);
    }
  }

  // Subtle periodic secondary shimmer pluck on half-bar boundaries (steps 0 and 6)
  if (stepIndex % 6 === 0 && candidates.length > 1) {
    const secondaryIdx = candidates[(stepIndex + 1) % candidates.length].index;
    const secPluck = pluckHyphalString(model, secondaryIdx, 0.20);
    if (secPluck) {
      const secTime = atTime + stepDuration * 0.5;
      triggerHyphalPluck(context, destination, secPluck.frequency, secPluck.velocity, {
        symbiosis: model.symbiosis,
        sporeDensity: secPluck.sporeDensity,
        atTime: secTime,
      });
      if (typeof options.logNote === "function") {
        const soundedMidi = Math.round(secPluck.midi + 12 * Math.log2(model.tension || 1.0));
        options.logNote(soundedMidi, secTime, Math.min(stepDuration * 1.2, 0.45), secPluck.velocity);
      }
    }
  }
}

/**
 * Synthesizes a physical acoustic hyphal string pluck with chitin plectrum click,
 * multi-mode partial decay, organic damping sweep, and symbiosis overtones.
 */
export function triggerHyphalPluck(context, destination, frequency, velocity = 0.8, {
  symbiosis = "LICHEN",
  sporeDensity = 0.0,
  atTime = null,
} = {}) {
  if (!context || !destination) return;
  const time = atTime ?? context.currentTime;
  const f0 = Math.max(40, Math.min(2200, frequency));
  const vel = Math.max(0.1, Math.min(1.0, velocity));

  // 1. Chitin Plectrum / Spore Click Transient
  const clickOsc = context.createOscillator();
  const clickGain = context.createGain();
  clickOsc.type = "sine";

  let clickStartFreq = 2200;
  let clickEndFreq = 650;
  let clickLevel = 0.045 * vel;

  if (symbiosis === "CORDYCEPS") {
    clickStartFreq = 5400;
    clickEndFreq = 1400;
    clickLevel = 0.085 * vel;
  } else if (symbiosis === "MUTUAL") {
    clickStartFreq = f0 * 3.2;
    clickEndFreq = f0 * 1.8;
    clickLevel = 0.075 * vel;
  } else if (symbiosis === "LICHEN") {
    clickStartFreq = 3400;
    clickEndFreq = 1200;
    clickLevel = 0.040 * vel;
  }

  clickOsc.frequency.setValueAtTime(clickStartFreq, time);
  clickOsc.frequency.exponentialRampToValueAtTime(Math.max(120, clickEndFreq), time + 0.005);

  clickGain.gain.setValueAtTime(0.0001, time);
  clickGain.gain.linearRampToValueAtTime(clickLevel, time + 0.001);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.012);

  clickOsc.connect(clickGain).connect(destination);
  clickOsc.start(time);
  clickOsc.stop(time + 0.015);
  clickOsc.onended = () => { try { clickGain?.disconnect?.(); } catch {} };

  // 2. Physical Resonant String Partials (Karplus-Strong / Damped Modes)
  let baseDecay = 0.85;
  if (symbiosis === "SILK") {
    baseDecay = Math.max(0.55, Math.min(1.9, 1.15 * ((330 / f0) ** 0.35)));
  } else if (symbiosis === "LICHEN") {
    baseDecay = Math.max(0.75, Math.min(2.4, 1.35 * ((330 / f0) ** 0.35)));
  } else if (symbiosis === "CORDYCEPS") {
    baseDecay = Math.max(0.35, Math.min(0.95, 0.65 * ((330 / f0) ** 0.35)));
  } else if (symbiosis === "MUTUAL") {
    baseDecay = Math.max(0.45, Math.min(1.4, 0.85 * ((330 / f0) ** 0.35)));
  }

  // Damping filter simulating organic hyphal viscosity: drops treble during ringing decay
  const dampingFilter = context.createBiquadFilter();
  dampingFilter.type = "lowpass";

  let startCutoff = Math.min(15000, f0 * 8);
  let endCutoff = Math.max(220, f0 * 2.8);
  let filterQ = 1.0;

  if (symbiosis === "LICHEN") {
    startCutoff = Math.min(16000, f0 * 9);
    endCutoff = Math.max(260, f0 * 3.0);
    filterQ = 2.2;
  } else if (symbiosis === "CORDYCEPS") {
    startCutoff = Math.min(18000, f0 * 10);
    endCutoff = Math.max(300, f0 * 3.6);
    filterQ = 1.8;
  } else if (symbiosis === "MUTUAL") {
    startCutoff = Math.min(12000, f0 * 6);
    endCutoff = Math.max(180, f0 * 2.2);
    filterQ = 1.2;
  }

  dampingFilter.frequency.setValueAtTime(startCutoff, time);
  dampingFilter.frequency.exponentialRampToValueAtTime(endCutoff, time + baseDecay * 0.65);
  dampingFilter.Q.setValueAtTime(filterQ, time);

  const stringBus = context.createGain();
  stringBus.gain.setValueAtTime(0.58, time);
  dampingFilter.connect(stringBus).connect(destination);

  // Partial modes sculpted per symbiosis personality
  let partials = [];
  if (symbiosis === "CORDYCEPS") {
    // Stiff kalimba / metallic harpsichord bar modes
    partials = [
      { mult: 1.0, gain: 0.52, decayMult: 1.0, oscType: "triangle", pitchChirp: -15 },
      { mult: 2.756, gain: 0.28, decayMult: 0.55, oscType: "sine" },
      { mult: 5.404, gain: 0.12, decayMult: 0.30, oscType: "sine" },
      { mult: 8.933, gain: 0.05, decayMult: 0.18, oscType: "sine" },
    ];
  } else if (symbiosis === "MUTUAL") {
    // Liquid dual-detuned oscillators with watery chorus wobble
    partials = [
      { mult: 1.0, gain: 0.36, decayMult: 1.0, oscType: "triangle", detuneCents: -7 },
      { mult: 1.0, gain: 0.36, decayMult: 1.0, oscType: "triangle", detuneCents: +7 },
      { mult: 2.0, gain: 0.18, decayMult: 0.60, oscType: "sine" },
      { mult: 3.0, gain: 0.08, decayMult: 0.35, oscType: "sine" },
    ];
  } else {
    // Pure concert / parlor harp harmonic modes (SILK and LICHEN)
    partials = [
      { mult: 1.0, gain: 0.55, decayMult: 1.0, oscType: "triangle" },
      { mult: 2.0, gain: 0.24, decayMult: 0.70, oscType: "sine" },
      { mult: 3.0, gain: 0.10, decayMult: 0.45, oscType: "sine" },
      { mult: 4.0, gain: 0.04, decayMult: 0.28, oscType: "sine" },
    ];
  }

  for (const part of partials) {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = part.oscType || "sine";
    const baseP = f0 * part.mult;
    osc.frequency.setValueAtTime(baseP, time);
    if (part.pitchChirp) {
      osc.frequency.setValueAtTime(baseP * (2 ** (part.pitchChirp / 1200)), time);
      osc.frequency.exponentialRampToValueAtTime(baseP, time + 0.018);
    }
    if (part.detuneCents && osc.detune) {
      osc.detune.setValueAtTime(part.detuneCents, time);
    }

    const partDecay = baseDecay * part.decayMult;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(part.gain * vel, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + partDecay);

    osc.connect(gain).connect(dampingFilter);
    osc.start(time);
    osc.stop(time + partDecay + 0.02);
    osc.onended = () => {
      try {
        gain?.disconnect?.();
        if (part === partials[0]) {
          dampingFilter?.disconnect?.();
          stringBus?.disconnect?.();
        }
      } catch {}
    };
  }

  // 3. Symbiosis Special Sonic Character
  if (symbiosis === "LICHEN") {
    // Photobiont Bloom: pure harmonic octave shimmer (2.0x f0) with gentle choral swell
    const bloomOsc = context.createOscillator();
    const bloomGain = context.createGain();
    bloomOsc.type = "sine";
    bloomOsc.frequency.setValueAtTime(f0 * 2.0, time);

    bloomGain.gain.setValueAtTime(0.0001, time);
    bloomGain.gain.linearRampToValueAtTime(0.08 * vel, time + 0.045);
    bloomGain.gain.exponentialRampToValueAtTime(0.0001, time + baseDecay * 1.15);

    bloomOsc.connect(bloomGain).connect(dampingFilter);
    bloomOsc.start(time);
    bloomOsc.stop(time + baseDecay * 1.2);
    bloomOsc.onended = () => { try { bloomGain?.disconnect?.(); } catch {} };
  } else if (symbiosis === "MUTUAL") {
    // Guttation Meniscus Pip: water droplet surface-tension chirp on string release
    const dropOsc = context.createOscillator();
    const dropGain = context.createGain();
    dropOsc.type = "sine";
    dropOsc.frequency.setValueAtTime(f0 * 3.0, time);
    dropOsc.frequency.exponentialRampToValueAtTime(f0 * 2.0, time + 0.035);

    dropGain.gain.setValueAtTime(0.0001, time);
    dropGain.gain.linearRampToValueAtTime(0.09 * vel, time + 0.004);
    dropGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);

    dropOsc.connect(dropGain).connect(dampingFilter);
    dropOsc.start(time);
    dropOsc.stop(time + 0.06);
    dropOsc.onended = () => { try { dropGain?.disconnect?.(); } catch {} };
  }
}
