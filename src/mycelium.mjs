// The mycelium's bio-acoustic voice (P5-16, D-042). Each of the eight
// sporophore forms has its own sound: what its spikes, droplets, and spore
// puffs are made of, and when they fall in the 12-step loop. The other three
// fungal score fields shape it within that form: hyphae set how many spikes a
// train fires and rotate the patterns, spores set how loud and how often the
// puffs are, and bloom tilts every pitch up or down by up to half an octave.
// Pure: returns events for src/app.mjs to sound.
//
// Every event is either a tone (an oscillator, optionally swept and
// bandpassed) or a noise burst (bandpassed noise). Times are fractions of the
// step, so the pattern breathes with the tempo.

import { SCALES } from "./music.mjs";

const voice = (pattern, sound) => Object.freeze({ pattern, ...sound });

// Patterns are 12 characters, one per step: "x" fires, "." rests.
export const FUNGAL_SOUNDS = Object.freeze([
  // AGARIC CAP: the classic gill: bright action-potential clicks, a falling
  // liquid guttation drop with surface-tension chirp, and soft spore pops.
  Object.freeze({
    spikes: voice("x..x..x..x..", { wave: "sine", freq: 2800, step: 620, band: [3600, 5.5], decay: 0.035, spacing: 0.032, count: [2, 4], peak: 0.045 }),
    drops: voice("....x.....x.", { wave: "sine", freq: 1540, to: 0.35, decay: 0.14, peak: 0.055 }),
    puffs: voice(".x...x...x..", { band: [2100, 3.2], decay: 0.065, peak: 0.038 }),
  }),
  // BRACKET CONK: a woody shelf: low hollow knocks with shelf body resonance,
  // a slow heavy guttation thud, and dry, dusty puffs.
  Object.freeze({
    spikes: voice("x...x.x...x.", { wave: "triangle", freq: 440, to: 0.75, step: 110, band: [850, 3], decay: 0.09, spacing: 0.08, count: [1, 2], peak: 0.075 }),
    drops: voice("......x.....", { wave: "sine", freq: 620, to: 0.55, decay: 0.22, peak: 0.065 }),
    puffs: voice("..x.......x.", { band: [820, 2], decay: 0.065, peak: 0.045 }),
  }),
  // CORAL CLAVARIA: branching glass: rising trains of crystalline glass glints,
  // a bright ringing drop, and airy ethereal hiss.
  Object.freeze({
    spikes: voice("x..x....x...", { wave: "sine", freq: 4800, step: 640, band: [6200, 7], decay: 0.045, spacing: 0.024, count: [3, 6], peak: 0.035 }),
    drops: voice("...x....x...", { wave: "sine", freq: 2700, to: 0.6, decay: 0.09, peak: 0.045 }),
    puffs: voice("x.....x.....", { band: [6800, 4.5], decay: 0.07, peak: 0.032 }),
  }),
  // BIOLUMINESCENT BONNET: a glow: slow shimmering pings stacked like a
  // chord, an eerie drop that sweeps upward, and a faint glowing sparkle.
  Object.freeze({
    spikes: voice("x.....x.....", { wave: "sine", freq: 3300, to: 1.05, ratios: [1, 1.5, 2], band: null, decay: 0.35, spacing: 0.07, count: [2, 3], peak: 0.03 }),
    drops: voice("...x.....x..", { wave: "sine", freq: 1750, to: 1.5, decay: 0.25, peak: 0.042 }),
    puffs: voice("........x...", { band: [4500, 6], decay: 0.12, peak: 0.025 }),
  }),
  // CUP PEZIZA: a hollow cup: upward bloops like a liquid chalice filling,
  // a ringing chalice drop, and hollow, resonant puffs.
  Object.freeze({
    spikes: voice("x.....x..x..", { wave: "sine", freq: 300, to: 1.8, band: [750, 3.5], decay: 0.16, spacing: 0.09, count: [1, 2], peak: 0.065 }),
    drops: voice("...x........", { wave: "triangle", freq: 1100, to: 0.42, decay: 0.16, peak: 0.055 }),
    puffs: voice(".x...x...x..", { band: [480, 5.5], decay: 0.09, peak: 0.068 }),
  }),
  // MOREL HONEYCOMB: cellular ticking: fast tactile bursts of square clicks,
  // a snappy drop, and a pressurized spore jet.
  Object.freeze({
    spikes: voice("xxx.xx.xxx.x", { wave: "square", freq: 1800, step: 90, band: [2600, 4.2], decay: 0.016, spacing: 0.018, count: [3, 5], peak: 0.026 }),
    drops: voice("..........x.", { wave: "sine", freq: 2100, to: 0.48, decay: 0.09, peak: 0.04 }),
    puffs: voice("....x.......", { band: [3100, 5], decay: 0.045, peak: 0.042 }),
  }),
  // GLOBULAR PUFFBALL: big soft clouds of spores on the beat, muffled
  // subterranean knocks, and a low resonant drop.
  Object.freeze({
    spikes: voice(".....x.....x", { wave: "sine", freq: 880, step: 0, band: [1100, 2], decay: 0.07, spacing: 0.05, count: [1, 2], peak: 0.045 }),
    drops: voice(".........x..", { wave: "sine", freq: 720, to: 0.52, decay: 0.18, peak: 0.055 }),
    puffs: voice("x..x..x..x..", { band: [620, 1.3], decay: 0.26, peak: 0.07 }),
  }),
  // HYPHAL HYDRA: many heads calling: climbing chirps in rising trains, a
  // predatory fluid drop, and scattered hissing puffs.
  Object.freeze({
    spikes: voice("x..x.x..x.x.", { wave: "sine", freq: 1500, to: 1.45, step: 240, band: [2300, 3.5], decay: 0.07, spacing: 0.042, count: [2, 5], peak: 0.042 }),
    drops: voice(".x.....x....", { wave: "sine", freq: 1950, to: 0.38, decay: 0.12, peak: 0.045 }),
    puffs: voice("....x....x..", { band: [1900, 3], decay: 0.07, peak: 0.04 }),
  }),
]);

const fires = (pattern, step, rotation, stepsCount = 12) => {
  const normStep = stepsCount === 16 ? Math.floor((step * pattern.length) / 16) : step;
  return pattern[(normStep + rotation) % pattern.length] === "x";
};

/**
 * Snaps a frequency to the nearest pitch class in the creature's scale (D-093).
 */
export function snapToScale(freq, score) {
  if (!score || score.scale === undefined || !Number.isFinite(freq) || freq <= 0) return freq;
  const root = score.root ?? 60;
  const scale = SCALES[score.scale] ?? SCALES[0];
  const rootPc = ((root % 12) + 12) % 12;
  const scalePcs = scale.map((step) => (rootPc + step) % 12);

  const midi = 12 * Math.log2(freq / 440) + 69;
  const oct = Math.floor(midi / 12);
  let bestMidi = midi;
  let minDiff = Infinity;

  for (let o = oct - 1; o <= oct + 1; o += 1) {
    for (const pc of scalePcs) {
      const candMidi = o * 12 + pc;
      if (candMidi < 51 || candMidi > 126) continue;
      const diff = Math.abs(candMidi - midi);
      if (diff < minDiff) {
        minDiff = diff;
        bestMidi = candMidi;
      }
    }
  }
  return 440 * (2 ** ((bestMidi - 69) / 12));
}

/**
 * The mycelium's events for one loop step. `hold` is the vitrine press (0..1),
 * which brightens and lifts everything a little, as before.
 */
export function myceliumEvents(score, stepIndex, hold = 0, stepsCount = 12) {
  const sound = FUNGAL_SOUNDS[score.fungalForm] ?? FUNGAL_SOUNDS[0];
  const steps = stepsCount || 12;
  const step = ((stepIndex % steps) + steps) % steps;
  const rotation = score.fungalHyphae % 12;
  const tilt = 2 ** ((score.fungalBloom - 55) / 90);
  // Harmonic pitch anchor: scales fundamental frequencies with score.root
  // pitch class across integer 12-TET semitones so different utterances possess
  // distinct acoustic registers without microtonal detuning (D-085, D-093).
  const rootAnchor = score?.root ? (2 ** (((score.root % 12) - 6) / 12)) : 1;
  const lift = 1 + hold * 0.2;
  const events = [];

  const { spikes, drops, puffs } = sound;
  if (fires(spikes.pattern, step, rotation, steps)) {
    const [fewest, most] = spikes.count;
    const count = fewest + Math.round(((score.fungalHyphae - 10) / 90) * (most - fewest));
    for (let p = 0; p < count; p += 1) {
      const rawFreq = (spikes.freq + (spikes.step ?? 0) * p) * tilt * rootAnchor * (spikes.ratios ? spikes.ratios[p % spikes.ratios.length] : 1);
      const freq = snapToScale(rawFreq, score);
      const to = spikes.to ? snapToScale(rawFreq * spikes.to, score) : freq;
      events.push({
        kind: "tone",
        at: p * spikes.spacing,
        wave: spikes.wave,
        freq,
        to,
        band: spikes.band ? [snapToScale(spikes.band[0] * tilt * rootAnchor, score), spikes.band[1]] : null,
        decay: spikes.decay,
        peak: Math.min(0.098, spikes.peak * (0.75 + score.fungalHyphae / 400) * lift),
        pan: ((p % 3) - 1) * 0.35,
        form: score.fungalForm,
      });
    }
  }
  if (fires(drops.pattern, step, rotation, steps)) {
    const rawFreq = drops.freq * tilt * rootAnchor;
    const freq = snapToScale(rawFreq, score);
    const to = drops.to ? snapToScale(rawFreq * drops.to, score) : freq;
    events.push({
      kind: "tone",
      at: 0.28,
      wave: drops.wave,
      freq,
      to,
      band: null,
      decay: drops.decay,
      peak: Math.min(0.098, drops.peak * (0.75 + score.fungalBloom / 400) * lift),
      pan: 0.2,
      form: score.fungalForm,
      isDrop: true,
    });
  }
  // Sparse spores puff only on their pattern; dense spores (over 60) also
  // puff a step later, so a spore-heavy creature hisses more often.
  const puffNow = fires(puffs.pattern, step, rotation, steps) || (score.fungalSpores > 60 && fires(puffs.pattern, step + (steps - 1), rotation, steps));
  if (puffNow && score.fungalSpores > 20) {
    events.push({
      kind: "noise",
      at: 0.52,
      band: [puffs.band[0] * tilt * rootAnchor, puffs.band[1]],
      decay: puffs.decay,
      peak: Math.min(0.098, puffs.peak * (0.6 + score.fungalSpores / 150) * lift),
      pan: -0.2,
      form: score.fungalForm,
    });
  }
  return events;
}
