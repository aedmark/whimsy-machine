import assert from "node:assert/strict";
import test from "node:test";
import {
  TEMPERAMENT_IDS,
  TEMPERAMENTS,
  deriveTemperament,
  formatTemperamentBadge,
} from "../src/temperament.mjs";

test("temperament dictionary defines all 5 archetypes with required properties", () => {
  assert.equal(TEMPERAMENT_IDS.length, 5);
  for (const id of TEMPERAMENT_IDS) {
    const t = TEMPERAMENTS[id];
    assert.ok(t, `Temperament ${id} exists`);
    assert.equal(t.id, id);
    assert.ok(typeof t.name === "string" && t.name.length > 0);
    assert.ok(typeof t.archetype === "string" && t.archetype.length > 0);
    assert.ok(typeof t.description === "string" && t.description.length > 0);
    assert.ok(typeof t.tapSound === "string" && t.tapSound.length > 0);
    assert.ok(typeof t.agitationRate === "number" && t.agitationRate > 0);
    assert.ok(typeof t.escalationStreak === "number" && t.escalationStreak > 0);
    assert.ok(typeof t.calmLabel === "string");
    assert.ok(typeof t.irritatedLabel === "string");
    assert.ok(typeof t.escalatedLabel === "string");
    assert.ok(typeof t.cooldownLabel === "string");
  }
});

test("deriveTemperament returns retaliator for missing or null scores", () => {
  assert.equal(deriveTemperament(null).id, "retaliator");
  assert.equal(deriveTemperament(undefined).id, "retaliator");
  assert.equal(deriveTemperament({}).id, "retaliator");
});

test("deriveTemperament respects existing valid temperament on score", () => {
  const custom = { temperament: TEMPERAMENTS.timid };
  assert.equal(deriveTemperament(custom).id, "timid");
});

test("deriveTemperament maps evocative adjectives to intended archetypes", () => {
  // Retaliators: furious, electric, illegal, feral
  assert.equal(deriveTemperament({ name_a: 12 }).id, "retaliator"); // FURIOUS
  assert.equal(deriveTemperament({ name_a: 9 }).id, "retaliator");  // ELECTRIC
  assert.equal(deriveTemperament({ name_a: 7 }).id, "retaliator");  // ILLEGAL
  assert.equal(deriveTemperament({ name_a: 30 }).id, "retaliator"); // FERAL

  // Timid: sleepy, gentle, mossy, tiny
  assert.equal(deriveTemperament({ name_a: 8 }).id, "timid");  // SLEEPY
  assert.equal(deriveTemperament({ name_a: 11 }).id, "timid"); // GENTLE
  assert.equal(deriveTemperament({ name_a: 15 }).id, "timid"); // MOSSY
  assert.equal(deriveTemperament({ name_a: 4 }).id, "timid");  // TINY

  // Musician: giggling, polite, velvet, fizzy
  assert.equal(deriveTemperament({ name_a: 23 }).id, "musician"); // GIGGLING
  assert.equal(deriveTemperament({ name_a: 6 }).id, "musician");  // POLITE
  assert.equal(deriveTemperament({ name_a: 1 }).id, "musician");  // VELVET
  assert.equal(deriveTemperament({ name_a: 27 }).id, "musician"); // FIZZY

  // Chromatophore: luminous, astral, neon, phosphorescent
  assert.equal(deriveTemperament({ name_a: 3 }).id, "chromatophore");  // LUMINOUS
  assert.equal(deriveTemperament({ name_a: 20 }).id, "chromatophore"); // ASTRAL
  assert.equal(deriveTemperament({ name_a: 31 }).id, "chromatophore"); // NEON
  assert.equal(deriveTemperament({ name_a: 55 }).id, "chromatophore"); // PHOSPHORESCENT

  // Stoic: ancient, clockwork, obsidian, brass
  assert.equal(deriveTemperament({ name_a: 5 }).id, "stoic");  // ANCIENT
  assert.equal(deriveTemperament({ name_a: 41 }).id, "stoic"); // CLOCKWORK
  assert.equal(deriveTemperament({ name_a: 52 }).id, "stoic"); // OBSIDIAN
  assert.equal(deriveTemperament({ name_a: 37 }).id, "stoic"); // BRASS
});

test("all 64 adjectives map cleanly and provide balanced coverage across all 5 archetypes", () => {
  const counts = {
    retaliator: 0,
    timid: 0,
    musician: 0,
    chromatophore: 0,
    stoic: 0,
  };

  for (let i = 0; i < 64; i += 1) {
    const t = deriveTemperament({ name_a: i });
    assert.ok(TEMPERAMENT_IDS.includes(t.id));
    counts[t.id] += 1;
  }

  // Ensure every archetype has substantial representation (> 8 adjectives)
  for (const id of TEMPERAMENT_IDS) {
    assert.ok(counts[id] >= 10, `Archetype ${id} has ${counts[id]} adjectives (>= 10 expected)`);
  }
});

test("fallback hash mapping provides deterministic assignment for synthetic scores without name_a", () => {
  const score1 = { shape: 3, motion: 2, scale: 5, flux_mode: 1 };
  const score2 = { shape: 3, motion: 2, scale: 5, flux_mode: 1 };
  const score3 = { shape: 8, motion: 7, scale: 2, flux_mode: 6 };

  const t1 = deriveTemperament(score1);
  const t2 = deriveTemperament(score2);
  const t3 = deriveTemperament(score3);

  assert.equal(t1.id, t2.id);
  assert.ok(TEMPERAMENT_IDS.includes(t1.id));
  assert.ok(TEMPERAMENT_IDS.includes(t3.id));
});

test("formatTemperamentBadge returns formatted human-readable badge", () => {
  const badge = formatTemperamentBadge(TEMPERAMENTS.timid);
  assert.equal(badge, "TEMPERAMENT: THE TIMID HERMIT · SHY / MELANCHOLY");
  assert.equal(formatTemperamentBadge(null), "TEMPERAMENT · UNKNOWN");
});

test("paletteFor supports dynamic chromaticShift from temperament taps", async () => {
  const { paletteFor, wrapHue } = await import("../src/vitrine-canvas.mjs");
  const score = { hue: 100, hueShift: 40, palette: 0 };
  const basePalette = paletteFor(score, 0);
  const shiftedPalette = paletteFor(score, 50);

  assert.equal(basePalette.length, 3);
  assert.equal(shiftedPalette.length, 3);
  for (let i = 0; i < 3; i += 1) {
    assert.equal(shiftedPalette[i], wrapHue(basePalette[i] + 50));
  }
});

test("triggerPercussion synthesizes all temperament sound kinds without error", async () => {
  const { triggerPercussion } = await import("../src/schedulers.mjs");
  const nodes = [];
  const param = (initial = 0) => ({
    value: initial,
    setValueAtTime(v) { this.value = v; },
    exponentialRampToValueAtTime(v) { this.value = v; },
    setTargetAtTime(v) { this.value = v; },
  });
  const node = (kind, extra = {}) => {
    const created = {
      kind,
      connect(target) { return target; },
      ...extra,
    };
    nodes.push(created);
    return created;
  };
  const ctx = {
    currentTime: 1.0,
    sampleRate: 8000,
    nodes,
    createGain: () => node("gain", { gain: param(1) }),
    createBiquadFilter: () => node("biquad", { type: "lowpass", frequency: param(350), Q: param(1) }),
    createBufferSource: () => node("bufferSource", { buffer: null, start() {}, stop() {} }),
    createOscillator: () => node("oscillator", { type: "sine", frequency: param(440), detune: param(), start() {}, stop() {} }),
    createBuffer: (channels, frames, sampleRate) => {
      const data = Array.from({ length: channels }, () => new Float32Array(frames));
      return {
        numberOfChannels: channels,
        length: frames,
        sampleRate,
        getChannelData(ch) { return data[ch]; },
      };
    },
  };
  const bus = ctx.createGain();
  const transport = {
    step: 0,
    melody: [0, 2, 4, 5, 7, 9, 11, 12],
    mix: bus,
  };
  const score = { root: 48 };

  const kinds = [
    "flutter",
    "hush",
    "melody_burst",
    "cadenza",
    "shimmer",
    "bioluminescent_pulse",
    "clockwork_tick",
  ];

  for (const kind of kinds) {
    const countBefore = nodes.length;
    triggerPercussion(kind, 0.2, -0.3, 1.0, {
      audioContext: ctx,
      currentTransport: transport,
      score,
    });
    assert.ok(nodes.length > countBefore, `expected ${kind} to create Web Audio nodes`);
  }
});

test("stepInteraction decays temperament dynamics and drives context-aware captions", async () => {
  const { interaction, stepInteraction } = await import("../src/vitrine-canvas.mjs");
  const stageCaption = { textContent: "" };

  interaction.temperament = TEMPERAMENTS.timid;
  interaction.retreat = 0.8;
  interaction.cooldownUntil = performance.now() + 2000;
  stepInteraction(performance.now(), false, { stageCaption });
  assert.equal(stageCaption.textContent, "SPECIMEN HIDDEN · AVOIDS THE PERIMETER");

  interaction.temperament = TEMPERAMENTS.musician;
  interaction.retaliateUntil = performance.now() + 500;
  stepInteraction(performance.now(), false, { stageCaption });
  assert.equal(stageCaption.textContent, "VIRTUOSIC CADENZA! · HARMONIC FLURRY");

  interaction.temperament = TEMPERAMENTS.chromatophore;
  interaction.retaliateUntil = performance.now() + 500;
  stepInteraction(performance.now(), false, { stageCaption });
  assert.equal(stageCaption.textContent, "PRISMATIC AURORAL DISCHARGE!");

  interaction.temperament = TEMPERAMENTS.stoic;
  interaction.retaliateUntil = performance.now() + 500;
  stepInteraction(performance.now(), false, { stageCaption });
  assert.equal(stageCaption.textContent, "SPECIMEN REMAINS UNMOVED");

  // Reset interaction state
  interaction.retreat = 0;
  interaction.cooldownUntil = 0;
  interaction.retaliateUntil = 0;
  interaction.temperament = null;
});
