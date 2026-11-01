import assert from "node:assert/strict";
import test from "node:test";

import {
  THEREMIN_AMBER_THRESHOLD,
  THEREMIN_MELT_THRESHOLD,
  THEREMIN_SHATTER_POINT,
  createThereminModel,
  formatThereminTelemetry,
  pitchForThereminCoordinate,
  updateThereminModel,
} from "../src/theremin.mjs";

test("theremin model initializes with BoneAmanita defaults", () => {
  const model = createThereminModel();
  assert.equal(model.enabled, true);
  assert.equal(model.scaleSnap, true);
  assert.equal(model.decoherenceBuildup, 0.0);
  assert.equal(model.classicalTurns, 0);
  assert.equal(model.isStuck, false);
  assert.equal(model.status, "FLOW");
  assert.equal(model.slag, 0.0);
});

test("pitchForThereminCoordinate maps horizontal range to creature scale", () => {
  const score = { root: 60, scale: 0 }; // C Dorian: C, D, E♭, F, G, A, B♭, C
  const left = pitchForThereminCoordinate(-1.0, score, true);
  const center = pitchForThereminCoordinate(0.0, score, true);
  const right = pitchForThereminCoordinate(1.0, score, true);

  assert.ok(left.frequency < center.frequency);
  assert.ok(center.frequency < right.frequency);

  // When scaleSnap is true, pitch class must belong to C Dorian (0, 2, 3, 5, 7, 9, 10)
  const dorianPCs = [0, 2, 3, 5, 7, 9, 10];
  assert.ok(dorianPCs.includes(left.pitchClass));
  assert.ok(dorianPCs.includes(center.pitchClass));
  assert.ok(dorianPCs.includes(right.pitchClass));

  // Continuous microtonal glide when scaleSnap is false (free glide)
  const unquantized = pitchForThereminCoordinate(0.1234, score, false);
  assert.ok(Number.isFinite(unquantized.frequency));
  assert.ok(unquantized.frequency > 0);
});

test("stationary hovering calcifies into slag and transitions to trapped in amber", () => {
  const model = createThereminModel();

  // Hover stationary for 16 seconds (16 ticks of dt = 1.0)
  for (let tick = 0; tick < 16; tick += 1) {
    updateThereminModel(model, {
      normX: 0.1,
      normY: 0.2,
      speed: 0.005, // motionless stillness
      isInteracting: true,
      pitchClass: 0,
      midi: 60,
      dt: 1.0,
    });
  }

  assert.ok(model.stillnessTime > 12, "stillness accumulates on stationary hold");
  assert.ok(model.slag > 0.5, "slag increases with calcification");
  assert.ok(model.decoherenceBuildup > THEREMIN_AMBER_THRESHOLD, "decoherence crosses amber threshold");
  assert.equal(model.isStuck, true, "theremin becomes trapped in amber");
  assert.equal(model.status, "STUCK");
});

test("rapid turbulence melts decoherence and frees from amber", () => {
  const model = createThereminModel({
    decoherenceBuildup: 25.0,
    isStuck: true,
    status: "STUCK",
  });

  // Fast movement / turbulence (dt = 0.5, speed = 0.8)
  const events = updateThereminModel(model, {
    normX: 0.5,
    normY: -0.5,
    speed: 0.8, // high speed
    isInteracting: true,
    pitchClass: 7,
    midi: 67,
    dt: 0.5,
  });

  assert.ok(events.includes("MELT"), "turbulence triggers MELT event");
  assert.ok(model.decoherenceBuildup < 25.0, "decoherence dissolved by turbulence");

  // Additional turbulent ticks to dissolve below melt threshold
  for (let i = 0; i < 5; i += 1) {
    updateThereminModel(model, {
      normX: 0.8 - i * 0.2,
      normY: -0.8 + i * 0.2,
      speed: 0.9,
      isInteracting: true,
      pitchClass: (i * 2) % 12,
      dt: 0.5,
    });
  }

  assert.ok(model.decoherenceBuildup < THEREMIN_MELT_THRESHOLD, "decoherence drops below melt threshold");
  assert.equal(model.isStuck, false, "theremin is freed from amber");
});

test("shatter point collapse discharges over 100 decoherence", () => {
  const model = createThereminModel({
    decoherenceBuildup: THEREMIN_SHATTER_POINT + 5,
    classicalTurns: 15,
  });

  const events = updateThereminModel(model, {
    normX: 0.2,
    normY: 0.2,
    speed: 0.02,
    isInteracting: true,
    pitchClass: 4,
  });

  assert.ok(events.includes("COLLAPSE"), "exceeding shatter point triggers COLLAPSE event");
  assert.equal(model.decoherenceBuildup, 0.0, "decoherence resets to 0 on collapse");
  assert.equal(model.classicalTurns, 0);
  assert.equal(model.isStuck, false);
});

test("formatThereminTelemetry renders expressive BoneAmanita status labels", () => {
  const flowModel = createThereminModel({ status: "FLOW", resinFlow: 8.5 });
  assert.match(formatThereminTelemetry(flowModel, 440), /THEREMIN · FLOW · RESIN 8\.5 · 440 Hz/);

  const stuckModel = createThereminModel({ isStuck: true, status: "STUCK" });
  assert.match(formatThereminTelemetry(stuckModel, 220), /THEREMIN · STUCK IN AMBER · FLICK TO FREE · 220 Hz/);

  const calcifyingModel = createThereminModel({ status: "CALCIFYING", slag: 0.42 });
  assert.match(formatThereminTelemetry(calcifyingModel, 330), /THEREMIN · CALCIFYING \(SLAG 42%\) · 330 Hz/);

  const mutedModel = createThereminModel({ enabled: false });
  assert.equal(formatThereminTelemetry(mutedModel), "BONE THEREMIN · MUTED");
});
