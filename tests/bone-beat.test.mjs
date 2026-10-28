import assert from "node:assert/strict";
import test from "node:test";

import {
  CRUCIBLE_DEFAULT_DAMPENERS,
  FORGE_AMBIENT_TEMP,
  FORGE_MAX_VOLTAGE,
  FORGE_OVERHEAT_TEMP,
  composeBoneBeat,
  createBoneBeatModel,
  formatBoneBeatTelemetry,
  quenchBoneForge,
  stepBoneBeat,
  strikeBoneForge,
} from "../src/bone-beat.mjs";

test("bone beat model initializes with somatic defaults", () => {
  const model = createBoneBeatModel();
  assert.equal(model.enabled, true);
  assert.equal(model.heat, FORGE_AMBIENT_TEMP);
  assert.equal(model.voltage, 0.0);
  assert.equal(model.dampeners, CRUCIBLE_DEFAULT_DAMPENERS);
  assert.equal(model.instability, 0.0);
  assert.equal(model.status, "TEMPERED");
  assert.equal(model.totalStrikes, 0);

  const custom = createBoneBeatModel({
    enabled: false,
    heat: 50.0,
    voltage: 10.0,
    dampeners: 2,
    status: "SURGE",
  });
  assert.equal(custom.enabled, false);
  assert.equal(custom.heat, 50.0);
  assert.equal(custom.voltage, 10.0);
  assert.equal(custom.dampeners, 2);
  assert.equal(custom.status, "SURGE");
});

test("composeBoneBeat generates deterministic patterns across 12 and 16 steps", () => {
  const score = { seed: 424242, pulse: 80, beatMode: 0 };

  const beat12 = composeBoneBeat(score, 12, 0);
  assert.equal(beat12.gridSteps, 12);
  assert.equal(beat12.steps.length, 12);
  assert.equal(beat12.mutation, 0);
  assert.equal(beat12.seed, 424242);

  const beat16 = composeBoneBeat(score, 16, 0);
  assert.equal(beat16.gridSteps, 16);
  assert.equal(beat16.steps.length, 16);

  // Determinism check
  const beat12Again = composeBoneBeat(score, 12, 0);
  assert.deepEqual(beat12, beat12Again);

  // Step structure check
  for (const step of beat12.steps) {
    assert.ok(Number.isInteger(step.step));
    assert.ok(step.bone >= 0 && step.bone <= 2);
    assert.ok(step.mineral >= 0 && step.mineral <= 2);
    assert.ok(step.brass >= 0 && step.brass <= 2);
    assert.ok(step.steam >= 0 && step.steam <= 2);
    assert.ok(step.velocity >= 0.6 && step.velocity <= 1.0);
  }

  // Mutation produces variation
  const mutated = composeBoneBeat(score, 12, 1);
  assert.notDeepEqual(beat12.steps, mutated.steps);
});

test("stepBoneBeat accumulates heat and voltage from acoustic strikes", () => {
  const model = createBoneBeatModel();
  const stepWithStrikes = { step: 0, bone: 2, mineral: 2, brass: 1, steam: 0, velocity: 0.9 };

  const initialHeat = model.heat;
  const initialVolt = model.voltage;

  const events = stepBoneBeat(model, stepWithStrikes, { dt: 0.1 });
  assert.ok(model.heat > initialHeat, "Heat must rise after strikes");
  assert.ok(model.voltage > initialVolt, "Voltage must rise after strikes");
  assert.equal(model.totalStrikes, 3);
  assert.ok(model.instability > 0);
});

test("stepBoneBeat respects disabled flag", () => {
  const model = createBoneBeatModel({ enabled: false });
  const stepWithStrikes = { step: 0, bone: 2, mineral: 2, brass: 1, steam: 0 };
  const events = stepBoneBeat(model, stepWithStrikes, { dt: 0.1 });
  assert.equal(events.length, 0);
  assert.equal(model.totalStrikes, 0);
});

test("crucible dampeners absorb voltage surges", () => {
  const model = createBoneBeatModel({ voltage: 16.0, dampeners: 3 });
  const step = { step: 1, bone: 1, mineral: 0, brass: 0, steam: 0 };

  const events = stepBoneBeat(model, step, { dt: 0.1 });
  assert.ok(events.includes("DAMPEN"));
  assert.equal(model.dampeners, 2);
  assert.equal(model.status, "SURGE");
  assert.ok(model.voltage < 14.0, "Voltage must be damped");
});

test("overheat triggers downbeat quench", () => {
  const model = createBoneBeatModel({ heat: FORGE_OVERHEAT_TEMP + 5.0 });
  const downbeatStep = { step: 0, bone: 1, mineral: 0, brass: 0, steam: 0 };

  const events = stepBoneBeat(model, downbeatStep, { dt: 0.1 });
  assert.ok(events.includes("OVERHEAT"));
  assert.ok(events.includes("QUENCH"));
  assert.equal(model.status, "QUENCHED");
  assert.equal(model.heat, FORGE_AMBIENT_TEMP + 5.0);
});

test("manual strikeBoneForge excites somatic parameters", () => {
  const model = createBoneBeatModel();
  strikeBoneForge(model, { type: "brass", force: 1.5 });
  assert.equal(model.totalStrikes, 1);
  assert.ok(model.heat > FORGE_AMBIENT_TEMP);
  assert.ok(model.voltage > 0);

  // Repeated hard strikes drive it into overheat
  for (let i = 0; i < 30; i += 1) {
    strikeBoneForge(model, { type: "brass", force: 2.0 });
  }
  assert.ok(model.heat >= FORGE_OVERHEAT_TEMP);
  assert.equal(model.status, "OVERHEAT");
});

test("quenchBoneForge restores thermal stability and replenishes dampeners", () => {
  const model = createBoneBeatModel({
    heat: 95.0,
    voltage: 15.0,
    dampeners: 1,
    status: "OVERHEAT",
  });

  quenchBoneForge(model);
  assert.equal(model.heat, FORGE_AMBIENT_TEMP + 5.0);
  assert.ok(model.voltage < 5.0);
  assert.equal(model.status, "QUENCHED");
  assert.equal(model.dampeners, 2, "Quenching in mineral brine restores 1 dampener");
});

test("formatBoneBeatTelemetry reflects somatic states", () => {
  const model = createBoneBeatModel();
  assert.match(formatBoneBeatTelemetry(model), /BONE FORGE · TEMPERED · 24°C · 0\.0V · DAMP 3/);

  model.enabled = false;
  assert.equal(formatBoneBeatTelemetry(model), "BONE FORGE · MUTED");

  model.enabled = true;
  model.status = "OVERHEAT";
  model.heat = 85.2;
  assert.match(formatBoneBeatTelemetry(model), /OVERHEAT \(85°C/);

  model.status = "QUENCHED";
  assert.match(formatBoneBeatTelemetry(model), /QUENCHED · STEAM RELEASED/);

  model.status = "SURGE";
  assert.match(formatBoneBeatTelemetry(model), /SURGE DAMPENED/);
});
