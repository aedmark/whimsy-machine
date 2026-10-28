import assert from "node:assert/strict";
import test from "node:test";

import {
  HARP_STRING_COUNT,
  HARP_SYMBIOSIS_MODES,
  buildHyphalStrings,
  checkStringIntersection,
  createSporeHarpModel,
  cycleSymbiosis,
  formatSporeHarpTelemetry,
  pluckHyphalString,
  strumHarp,
} from "../src/spore-harp.mjs";

test("spore harp model initializes with symbiotic defaults", () => {
  const model = createSporeHarpModel();
  assert.equal(model.enabled, true);
  assert.equal(model.symbiosis, "LICHEN");
  assert.equal(model.tension, 1.0);
  assert.equal(model.autoStrum, true);
  assert.equal(model.totalPlucks, 0);
  assert.deepEqual(model.strings, []);

  const custom = createSporeHarpModel({
    enabled: false,
    symbiosis: "CORDYCEPS",
    tension: 1.4,
    autoStrum: false,
    totalPlucks: 12,
  });
  assert.equal(custom.enabled, false);
  assert.equal(custom.symbiosis, "CORDYCEPS");
  assert.equal(custom.tension, 1.4);
  assert.equal(custom.autoStrum, false);
  assert.equal(custom.totalPlucks, 12);
});

test("buildHyphalStrings constructs 8 tuned strings spanning creature scale", () => {
  const score = { root: 60, scale: 0 }; // C Dorian
  const strings = buildHyphalStrings(score, { referencePitch: 440 });

  assert.equal(strings.length, HARP_STRING_COUNT);
  assert.equal(strings.length, 8);

  for (let i = 0; i < strings.length; i += 1) {
    const str = strings[i];
    assert.equal(str.index, i);
    assert.ok(Number.isFinite(str.midi));
    assert.ok(str.frequency > 40 && str.frequency < 2000);
    assert.ok(typeof str.noteName === "string" && str.noteName.length >= 2);
    assert.ok(str.length > 0);
    assert.ok(str.x1 < str.x2, "Strings must stretch from left anchor to right anchor");
  }

  // Pitch must ascend across the strings
  assert.ok(strings[0].frequency < strings[strings.length - 1].frequency);
});

test("pluckHyphalString excites string vibration and deposits spore density", () => {
  const score = { root: 60, scale: 0 };
  const model = createSporeHarpModel();
  model.strings = buildHyphalStrings(score);

  const initialPlucks = model.totalPlucks;
  const pluck = pluckHyphalString(model, 2, 0.85);

  assert.ok(pluck);
  assert.equal(pluck.index, 2);
  assert.equal(model.totalPlucks, initialPlucks + 1);
  assert.equal(model.lastPluckedIndex, 2);
  assert.ok(model.strings[2].vibration > 0);
  assert.ok(model.strings[2].sporeDensity > 0);
  assert.ok(model.strings[2].vibratingUntil > Date.now());

  // String index wraps safely
  const wrapped = pluckHyphalString(model, 10, 0.5);
  assert.equal(wrapped.index, 2); // 10 % 8 = 2
});

test("strumHarp sweeps all 8 strings in ascending and descending directions", () => {
  const score = { root: 60, scale: 0 };
  const model = createSporeHarpModel();
  model.strings = buildHyphalStrings(score);

  const ascending = strumHarp(model, { direction: 1, velocity: 0.8, staggerMs: 30 });
  assert.equal(ascending.length, 8);
  assert.equal(ascending[0].index, 0);
  assert.equal(ascending[7].index, 7);
  assert.equal(ascending[0].delayMs, 0);
  assert.equal(ascending[7].delayMs, 210);

  const descending = strumHarp(model, { direction: -1, velocity: 0.8, staggerMs: 25 });
  assert.equal(descending.length, 8);
  assert.equal(descending[0].index, 7);
  assert.equal(descending[7].index, 0);
});

test("cycleSymbiosis cycles sequentially through all 4 symbiosis modes", () => {
  const model = createSporeHarpModel({ symbiosis: "LICHEN" });

  assert.equal(cycleSymbiosis(model), "CORDYCEPS");
  assert.equal(cycleSymbiosis(model), "SILK");
  assert.equal(cycleSymbiosis(model), "MUTUAL");
  assert.equal(cycleSymbiosis(model), "LICHEN");
});

test("checkStringIntersection detects crossing movements and proximity", () => {
  const str = { x1: -0.5, y1: 0.0, x2: 0.5, y2: 0.0 };

  // Vertical stroke crossing the horizontal string
  const crossingP1 = { x: 0.0, y: -0.2 };
  const crossingP2 = { x: 0.0, y: 0.2 };
  assert.equal(checkStringIntersection(crossingP1, crossingP2, str), true);

  // Distant stroke not crossing the string
  const distantP1 = { x: 0.0, y: 0.6 };
  const distantP2 = { x: 0.0, y: 0.8 };
  assert.equal(checkStringIntersection(distantP1, distantP2, str), false);

  // Proximity to midpoint
  const nearPoint = { x: 0.0, y: 0.02 };
  assert.equal(checkStringIntersection(nearPoint, nearPoint, str, 0.05), true);
});

test("formatSporeHarpTelemetry reflects active and muted states", () => {
  const model = createSporeHarpModel();
  model.strings = [{}, {}, {}, {}, {}, {}, {}, {}];

  assert.match(formatSporeHarpTelemetry(model), /SPORE HARP · 8 HYPHAE · LICHEN · TENS 1\.0 · 0 PLUCKS/);

  model.enabled = false;
  assert.equal(formatSporeHarpTelemetry(model), "SPORE HARP · MUTED");

  model.enabled = true;
  model.lastPluckedIndex = 0;
  model.strings[0] = { noteName: "C3" };
  model.lastPluckedAt = Date.now();
  assert.match(formatSporeHarpTelemetry(model), /PLUCK \[C3\]/);
});
