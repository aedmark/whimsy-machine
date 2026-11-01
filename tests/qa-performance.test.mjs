import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { composeScore } from "../src/score.mjs";
import {
  cleanupOnEnded,
  scheduleNote,
  scheduleBeatStep,
  scheduleBassStep,
  scheduleHarmonyStep,
  scheduleChimeStep,
  scheduleChantStep,
  scheduleFungalBioStep,
  scheduleClockworkTick,
  triggerPercussion,
  triggerSporePuff,
} from "../src/schedulers.mjs";
import { scheduleMuscariaStep, createMuscariaModel, stepMuscariaModel } from "../src/muscaria.mjs";
import { scheduleSporeHarpStep, createSporeHarpModel } from "../src/spore-harp.mjs";
import { scheduleBoneBeatStep, createBoneBeatModel } from "../src/bone-beat.mjs";
import { scheduleVoicePad, scheduleVoicePluck, scheduleVoiceLead, voiceById } from "../src/voices.mjs";

const oracleSrc = await readFile(new URL("../src/oracle.lol", import.meta.url), "utf8");

function createTrackingAudioContext() {
  const activeNodes = new Set();
  const createdNodes = [];

  function makeParam(initial = 0) {
    return {
      value: initial,
      setValueAtTime(v) { this.value = v; },
      linearRampToValueAtTime(v) { this.value = v; },
      exponentialRampToValueAtTime(v) { this.value = v; },
      setTargetAtTime(v) { this.value = v; },
    };
  }

  function makeNode(kind, extra = {}) {
    const node = {
      kind,
      connections: new Set(),
      connect(target) {
        node.connections.add(target);
        return target;
      },
      disconnect(target) {
        if (target) node.connections.delete(target);
        else node.connections.clear();
        activeNodes.delete(node);
      },
      start() {},
      stop() {},
      onended: null,
      ...extra,
    };
    createdNodes.push(node);
    activeNodes.add(node);
    return node;
  }

  return {
    currentTime: 10.0,
    createdNodes,
    activeNodes,
    createGain: () => makeNode("gain", { gain: makeParam(1) }),
    createOscillator: () => makeNode("oscillator", { frequency: makeParam(440), detune: makeParam(0) }),
    createBiquadFilter: () => makeNode("filter", { frequency: makeParam(1000), Q: makeParam(1) }),
    createBufferSource: () => makeNode("bufferSource", { buffer: null }),
    createBuffer: (channels, frames, sampleRate) => ({
      numberOfChannels: channels,
      length: frames,
      sampleRate,
      getChannelData: () => new Float32Array(frames),
    }),
    createStereoPanner: () => makeNode("panner", { pan: makeParam(0) }),
  };
}

test("QA Stress Test: Web Audio node lifecycle & cleanup prevents graph accumulation", () => {
  const score = { ...composeScore(oracleSrc, "botanical expedition into the cellar"), root: 60 };
  const ctx = createTrackingAudioContext();
  const bus = ctx.createGain();
  const transport = {
    mix: bus,
    beatBus: bus,
    bassBus: bus,
    harmonyBus: bus,
    chimeBus: bus,
    chantBus: bus,
    fungalBus: bus,
    output: bus,
    melody: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5],
  };

  const testBeat = { steps: [{ kick: 2, snare: 1, hat: 1 }] };
  const testBass = { steps: [{ interval: 0, gate: 2, register: 0, accent: true, slide: false }] };
  const testHarmony = { steps: [{ chord: [0, 4, 7], gate: 2, strumMs: 15, mirror: "/" }] };
  const testChimes = { steps: [{ ratioValue: 1.5, gate: 2, exponents: { e3: 1 }, lightnessIndex: 0, hueIndex: 1 }] };
  const testChant = { steps: [{ registerOffset: 0, interval: 0, gate: 2, vibratoHz: 5.5, f1: 500, f2: 1500, f3: 2500 }] };
  const muscaria = createMuscariaModel({ mode: "BIO_PULSE" });
  const sporeHarp = createSporeHarpModel({ enabled: true });
  const boneBeat = createBoneBeatModel();

  // Run 16 consecutive steps across all ensemble channels
  for (let step = 0; step < 16; step += 1) {
    const at = 10.0 + step * 0.125;
    scheduleNote(ctx, transport, score, step, at, 0.1);
    scheduleBeatStep(ctx, transport, score, step, at, 0.125, { currentBeat: testBeat });
    scheduleBassStep(ctx, transport, score, step, at, 0.125, { currentBass: testBass });
    scheduleHarmonyStep(ctx, transport, score, step, at, 0.125, { currentHarmony: testHarmony });
    scheduleChimeStep(ctx, transport, score, step, at, 0.125, { currentChimes: testChimes });
    scheduleChantStep(ctx, transport, score, step, at, 0.125, { currentChant: testChant });
    scheduleFungalBioStep(ctx, transport, score, step, at, 0.125);
    scheduleClockworkTick(ctx, transport.output, at, step, 0.5);
    scheduleMuscariaStep(ctx, transport.mix, muscaria, step, at, 0.125, { score });
    scheduleSporeHarpStep(ctx, transport.mix, sporeHarp, step, at, 0.125);
    scheduleBoneBeatStep(ctx, transport.mix, boneBeat, step, at, 0.125);
  }

  // Verify that source oscillators/buffer sources received onended cleanup callbacks
  const sources = ctx.createdNodes.filter((n) => n.kind === "oscillator" || n.kind === "bufferSource");
  assert.ok(sources.length > 50, "Ensemble generated rich acoustic sources");

  const sourcesWithCleanup = sources.filter((s) => typeof s.onended === "function");
  assert.ok(
    sourcesWithCleanup.length >= sources.length * 0.9,
    `Over 90% of transient audio sources have onended cleanup attached (found ${sourcesWithCleanup.length}/${sources.length})`
  );

  // Simulate note endings as browser audio clock advances
  for (const s of sourcesWithCleanup) {
    s.onended();
  }

  // Verify that intermediate gains and filters were cleanly disconnected
  const deadGains = ctx.createdNodes.filter((n) => n.kind === "gain" && n !== bus && n.connections.size === 0);
  assert.ok(deadGains.length > 50, "Dead intermediate gain nodes were disconnected from downstream audio buses");
});

test("QA Invariants: Canvas 2D Gecko rasterization guardrails", async () => {
  const vitrineSrc = await readFile(new URL("../src/vitrine-canvas.mjs", import.meta.url), "utf8");

  // 1. Organelle linework strictly clears inherited shadowBlur
  assert.match(
    vitrineSrc,
    /function drawAppendageOrganelle[\s\S]*ctx\.shadowBlur = 0;/,
    "drawAppendageOrganelle zeroes shadowBlur before internal linework"
  );

  // 2. Appendage halo blur is safely bounded
  assert.match(
    vitrineSrc,
    /const haloBlur = Math\.min\(10,/,
    "drawCellularAppendage caps shadowBlur <= 10px to protect Gecko/SWGL rasterizer"
  );

  // 3. Body bloom blur is clamped
  assert.match(
    vitrineSrc,
    /ctx\.shadowBlur = this\.reducedMotion \? 0 : Math\.min\(18, score\.bloom \* 0\.28\);/,
    "Body bloom shadowBlur is capped <= 18px and disabled in reduced motion"
  );

  // 4. Pedestal lichen flakes are single-path batched
  assert.match(
    vitrineSrc,
    /for \(let i = 0; i < 24; i \+= 1\) \{[\s\S]*ctx\.moveTo[\s\S]*ctx\.arc[\s\S]*\}\s*ctx\.fill\(\);/,
    "Peat substrate lichen flakes batch 24 circles into a single fill() call"
  );

  // 5. Particles precompute palette colors outside per-frame loop
  assert.match(
    vitrineSrc,
    /const particleColors = colors\.map\(/,
    "Particles precompute palette color strings outside 145-particle loop"
  );
});

test("QA Invariants: High tempo stress and audio param stability across extreme phrases", () => {
  const phrases = [
    "fire in the laboratory",
    "botanical expedition into the cellar",
    "hyperborean crystalline glacier",
    "clockwork automaton with velvet heart",
    "1234567890!@#$%^&*()_+",
    "a",
    "the quick brown fox jumps over the lazy dog in the abandoned conservatory",
  ];

  for (const phrase of phrases) {
    const score = composeScore(oracleSrc, phrase);

    assert.ok(Number.isFinite(score.pulse), `Pulse is finite for "${phrase}"`);
    assert.ok(score.pulse >= 40 && score.pulse <= 240, `Pulse within safe bounds for "${phrase}"`);
    assert.ok(Number.isFinite(score.bloom), `Bloom is finite for "${phrase}"`);
    assert.ok(score.bloom >= 0 && score.bloom <= 100, `Bloom within 0..100 for "${phrase}"`);

    const ctx = createTrackingAudioContext();
    const bus = ctx.createGain();
    const transport = {
      mix: bus,
      beatBus: bus,
      bassBus: bus,
      harmonyBus: bus,
      chimeBus: bus,
      chantBus: bus,
      fungalBus: bus,
      output: bus,
      melody: [0, 2, 4, 7],
    };

    // Fast 240 BPM stress simulation
    for (let step = 0; step < 8; step += 1) {
      scheduleNote(ctx, transport, score, step, 0.05 * step, 0.04);
      scheduleClockworkTick(ctx, transport.output, 0.05 * step, step, 0.5);
    }

    const createdGains = ctx.createdNodes.filter((n) => n.kind === "gain");
    for (const g of createdGains) {
      assert.ok(Number.isFinite(g.gain.value), `Gain value is finite for "${phrase}"`);
    }
  }
});
