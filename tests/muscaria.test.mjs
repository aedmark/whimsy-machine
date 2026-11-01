import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  MUSCARIA_MODES,
  TRIP_DEPTHS,
  createMuscariaModel,
  cycleMuscariaMode,
  cycleTripDepth,
  formatMuscariaTelemetry,
  generatePlantWaveNotes,
  noteNameForMidi,
  scheduleMuscariaStep,
  stepMuscariaModel,
  stimulateMuscaria,
} from "../src/muscaria.mjs";

test("muscaria model initializes with biological defaults", () => {
  const model = createMuscariaModel();
  assert.equal(model.enabled, false);
  assert.equal(model.mode, "DORMANT");
  assert.equal(model.tripDepth, "DEEP");
  assert.equal(model.resistanceMohm, 4.82);
  assert.equal(model.voltageMv, 14.2);
  assert.equal(model.spikePotential, 0);
  assert.equal(model.totalSpikes, 0);
  assert.deepEqual(model.actionPotentials, []);

  const custom = createMuscariaModel({
    mode: "HALLUCINATING",
    tripDepth: "TRANSCENDENT",
    resistanceMohm: 3.5,
    voltageMv: 18.0,
  });
  assert.equal(custom.enabled, true);
  assert.equal(custom.mode, "HALLUCINATING");
  assert.equal(custom.tripDepth, "TRANSCENDENT");
  assert.equal(custom.resistanceMohm, 3.5);
  assert.equal(custom.voltageMv, 18.0);
});

test("stimulateMuscaria surges membrane potential and spawns action potential spark", () => {
  const model = createMuscariaModel({ mode: "BIO_PULSE" });
  assert.equal(model.totalSpikes, 0);
  assert.equal(model.spikePotential, 0);

  const spark = stimulateMuscaria(model, 1.2);
  assert.ok(spark);
  assert.equal(spark.progress, 0.0);
  assert.equal(spark.magnitude, 1.2);
  assert.equal(model.totalSpikes, 1);
  assert.ok(model.spikePotential > 20);
  assert.equal(model.actionPotentials.length, 1);
});

test("stepMuscariaModel advances metabolic phase, decays spikes, and updates modulations", () => {
  const model = createMuscariaModel({ mode: "HALLUCINATING", tripDepth: "DEEP" });
  stimulateMuscaria(model, 1.0);
  const initialSpike = model.spikePotential;

  stepMuscariaModel(model, 0.25, { spontaneous: false });
  assert.ok(model.metabolicPhase > 0, "metabolic phase advances with dt");
  assert.ok(model.spikePotential < initialSpike, "spike potential decays exponentially");
  assert.ok(Number.isFinite(model.warpCents), "warpCents is computed");
  assert.ok(Number.isFinite(model.delayModMs), "delayModMs is computed");
  assert.ok(model.filterModRatio > 0.8 && model.filterModRatio < 1.3, "filterModRatio stays bounded");
  assert.ok(model.actionPotentials[0].progress > 0, "spark progresses");
});

test("stepMuscariaModel triggers spontaneous action-potentials with custom prng", () => {
  const model = createMuscariaModel({ mode: "BIO_PULSE" });
  assert.equal(model.totalSpikes, 0);

  // Provide a random function that returns 0.001 to guarantee triggering the spontaneous spike
  stepMuscariaModel(model, 0.1, { random: () => 0.001 });
  assert.equal(model.totalSpikes, 1, "spontaneous spike triggered");
  assert.equal(model.actionPotentials.length, 1);
});

test("stepMuscariaModel keeps warpCents zero when dormant or in bio-pulse mode", () => {
  const dormant = createMuscariaModel({ mode: "DORMANT" });
  stepMuscariaModel(dormant, 0.5);
  assert.equal(dormant.warpCents, 0);
  assert.equal(dormant.delayModMs, 0);

  const pulse = createMuscariaModel({ mode: "BIO_PULSE" });
  stepMuscariaModel(pulse, 0.5);
  assert.equal(pulse.warpCents, 0);
  assert.equal(pulse.delayModMs, 0);
});

test("cycleMuscariaMode cycles sequentially through all 3 modes", () => {
  const model = createMuscariaModel({ mode: "DORMANT" });
  assert.equal(cycleMuscariaMode(model), "BIO_PULSE");
  assert.equal(model.enabled, true);

  assert.equal(cycleMuscariaMode(model), "HALLUCINATING");
  assert.equal(model.enabled, true);

  assert.equal(cycleMuscariaMode(model), "DORMANT");
  assert.equal(model.enabled, false);
});

test("cycleTripDepth cycles sequentially through all 3 trip depths", () => {
  const model = createMuscariaModel({ tripDepth: "MILD" });
  assert.equal(cycleTripDepth(model), "DEEP");
  assert.equal(cycleTripDepth(model), "TRANSCENDENT");
  assert.equal(cycleTripDepth(model), "MILD");
});

test("noteNameForMidi formats accurate scientific pitch notation", () => {
  assert.equal(noteNameForMidi(60), "C4");
  assert.equal(noteNameForMidi(69), "A4");
  assert.equal(noteNameForMidi(72), "C5");
  assert.equal(noteNameForMidi(55), "G3");
  assert.equal(noteNameForMidi(NaN), "---");
});

test("generatePlantWaveNotes returns empty when dormant, scale-quantized when active", () => {
  const dormant = createMuscariaModel({ mode: "DORMANT" });
  const score = { root: 60, scale: 0 }; // C Dorian
  assert.deepEqual(generatePlantWaveNotes(dormant, score, null, 0), []);

  const active = createMuscariaModel({ mode: "BIO_PULSE" });
  stimulateMuscaria(active, 1.5);
  const notes = generatePlantWaveNotes(active, score, null, 0);
  assert.ok(notes.length >= 2, "spike creates multi-note arpeggio waterfall");

  for (const n of notes) {
    assert.ok(Number.isFinite(n.midi));
    assert.ok(n.frequency > 100 && n.frequency < 4000);
    assert.ok(typeof n.noteName === "string");
    // Verify modal scale degree
    const pc = n.midi % 12;
    // C Dorian: C, D, E♭, F, G, A, B♭ -> [0, 2, 3, 5, 7, 9, 10]
    assert.ok([0, 2, 3, 5, 7, 9, 10].includes(pc), `pitch class ${pc} must be in scale`);
  }
});

test("generatePlantWaveNotes enforces chord closure when chord is provided", () => {
  const active = createMuscariaModel({ mode: "HALLUCINATING" });
  stimulateMuscaria(active, 1.5);
  const score = { root: 60, scale: 0 };
  const chord = { pitchClasses: [0, 7] }; // C and G

  const notes = generatePlantWaveNotes(active, score, chord, 0);
  for (const n of notes) {
    const pc = n.midi % 12;
    assert.ok(chord.pitchClasses.includes(pc), `pitch class ${pc} must be in chord pitch classes`);
  }
});

test("formatMuscariaTelemetry reflects all three states accurately", () => {
  const model = createMuscariaModel();
  assert.match(formatMuscariaTelemetry(model), /MUSCARIA · DORMANT · 4\.82 MΩ · ΔV \+14\.2mV/);

  model.mode = "BIO_PULSE";
  model.lastNoteName = "G4";
  assert.match(formatMuscariaTelemetry(model), /PLANTWAVE · BIO-PULSE · 4\.82 MΩ · ΔV \+14\.2mV · NOTE \[G4\]/);

  model.mode = "HALLUCINATING";
  model.tripDepth = "DEEP";
  model.warpCents = -12.4;
  assert.match(formatMuscariaTelemetry(model), /MUSCARIA · TRIPPY \[DEEP\] · 4\.82 MΩ · WARP -12¢ · NOTE \[G4\]/);
});

test("scheduleMuscariaStep executes cleanly without error on mock Web Audio graph", () => {
  const model = createMuscariaModel({ mode: "BIO_PULSE" });
  stimulateMuscaria(model, 1.2);
  const score = { root: 60, scale: 0 };

  const fakeContext = {
    currentTime: 0,
    createOscillator: () => ({
      type: "triangle",
      frequency: { setValueAtTime: () => {} },
      connect: (n) => n,
      start: () => {},
      stop: () => {},
    }),
    createGain: () => ({
      gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: (n) => n,
    }),
    createBiquadFilter: () => ({
      type: "lowpass",
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      Q: { setValueAtTime: () => {} },
      connect: (n) => n,
    }),
    createStereoPanner: () => ({
      pan: { setValueAtTime: () => {} },
      connect: (n) => n,
    }),
  };
  const destination = fakeContext.createGain();

  scheduleMuscariaStep(fakeContext, destination, model, 0, 0, 0.25, { score });
  assert.ok(model.lastNoteMidi, "lastNoteMidi was recorded");
  assert.ok(model.lastNoteName, "lastNoteName was recorded");
});

test("hallucinatory modulation variables and bindings in app.mjs are valid", async () => {
  const root = new URL("../", import.meta.url);
  const appSrc = await readFile(new URL("src/app.mjs", root), "utf8");

  // Invariant: no undeclared parlorAmbienceLevel
  assert.ok(!appSrc.includes("parlorAmbienceLevel"), "app.mjs must not reference parlorAmbienceLevel");
  assert.ok(appSrc.includes("level: parlorAcousticsLevel"), "app.mjs must reference parlorAcousticsLevel");

  // Invariant: DRONE_DETUNE is imported and defined
  assert.ok(appSrc.includes("DRONE_DETUNE"), "app.mjs must import DRONE_DETUNE");

  // Invariant: TRANSCENDENT trip depth configurations stay mathematically bounded
  const transcendent = createMuscariaModel({ mode: "HALLUCINATING", tripDepth: "TRANSCENDENT" });
  stepMuscariaModel(transcendent, 0.2);
  assert.ok(Number.isFinite(transcendent.warpCents));
  assert.ok(Number.isFinite(transcendent.delayModMs));
  assert.ok(transcendent.filterModRatio > 0.1 && transcendent.filterModRatio < 2.5);
  assert.ok(transcendent.feedbackSwell > 0 && transcendent.feedbackSwell < 0.5);
  assert.ok(transcendent.reverbSwell >= 1.0 && transcendent.reverbSwell < 3.0);
});
