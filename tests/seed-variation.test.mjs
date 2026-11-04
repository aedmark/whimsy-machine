import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  composeScore,
  deriveScoreVariation,
  parseVariationPhrase,
} from "../src/score.mjs";

const ORACLE_SOURCE = fs.readFileSync(new URL("../src/oracle.lol", import.meta.url), "utf8");

test("parseVariationPhrase detects standard opus and take delimiters", () => {
  // Hash delimiter
  assert.deepEqual(parseVariationPhrase("cat # 2"), {
    basePhrase: "cat",
    variationKey: "2",
    hasVariation: true,
    opusLabel: "OPUS 2",
  });
  assert.deepEqual(parseVariationPhrase("blue moth #take 2"), {
    basePhrase: "blue moth",
    variationKey: "take 2",
    hasVariation: true,
    opusLabel: "TAKE 2",
  });
  assert.deepEqual(parseVariationPhrase("seed#3"), {
    basePhrase: "seed",
    variationKey: "3",
    hasVariation: true,
    opusLabel: "OPUS 3",
  });

  // Tilde delimiter
  assert.deepEqual(parseVariationPhrase("garden ~ 4"), {
    basePhrase: "garden",
    variationKey: "4",
    hasVariation: true,
    opusLabel: "OPUS 4",
  });

  // Double slash delimiter
  assert.deepEqual(parseVariationPhrase("crystal // b"), {
    basePhrase: "crystal",
    variationKey: "b",
    hasVariation: true,
    opusLabel: "TAKE B",
  });

  // Colon delimiter
  assert.deepEqual(parseVariationPhrase("spirit: 5"), {
    basePhrase: "spirit",
    variationKey: "5",
    hasVariation: true,
    opusLabel: "OPUS 5",
  });

  // Parentheses delimiter
  assert.deepEqual(parseVariationPhrase("clockwork (take 2)"), {
    basePhrase: "clockwork",
    variationKey: "2",
    hasVariation: true,
    opusLabel: "OPUS 2",
  });
  assert.deepEqual(parseVariationPhrase("clockwork (3)"), {
    basePhrase: "clockwork",
    variationKey: "3",
    hasVariation: true,
    opusLabel: "OPUS 3",
  });

  // Hyphen with opus / take keyword
  assert.deepEqual(parseVariationPhrase("forest - opus 2"), {
    basePhrase: "forest",
    variationKey: "2",
    hasVariation: true,
    opusLabel: "OPUS 2",
  });
  assert.deepEqual(parseVariationPhrase("forest - take allegro"), {
    basePhrase: "forest",
    variationKey: "allegro",
    hasVariation: true,
    opusLabel: "TAKE ALLEGRO",
  });
});

test("parseVariationPhrase preserves ordinary prose as non-variations", () => {
  assert.deepEqual(parseVariationPhrase("the moon owes me five dollars"), {
    basePhrase: "the moon owes me five dollars",
    variationKey: null,
    hasVariation: false,
    opusLabel: null,
  });
  assert.deepEqual(parseVariationPhrase("three pigeons in a borrowed coat"), {
    basePhrase: "three pigeons in a borrowed coat",
    variationKey: null,
    hasVariation: false,
    opusLabel: null,
  });
  assert.deepEqual(parseVariationPhrase("omen 0"), {
    basePhrase: "omen 0",
    variationKey: null,
    hasVariation: false,
    opusLabel: null,
  });
  assert.deepEqual(parseVariationPhrase("variation test 1"), {
    basePhrase: "variation test 1",
    variationKey: null,
    hasVariation: false,
    opusLabel: null,
  });
  assert.deepEqual(parseVariationPhrase(""), {
    basePhrase: "",
    variationKey: null,
    hasVariation: false,
    opusLabel: null,
  });
});

test("seeds differing by only 1 character via variation syntax share exact color, style & flavor and tweak notes", () => {
  const take1 = composeScore(ORACLE_SOURCE, "cerulean moth # 1");
  const take2 = composeScore(ORACLE_SOURCE, "cerulean moth # 2");

  // Input strings differ by only 1 character ("1" vs "2")
  assert.notEqual(take1.phrase, take2.phrase);

  // Exact species & style identity preserved
  assert.equal(take1.root, take2.root, "root is identical");
  assert.equal(take1.scale, take2.scale, "scale is identical");
  assert.equal(take1.pulse, take2.pulse, "pulse/tempo is identical");
  assert.equal(take1.wave, take2.wave, "wave is identical");
  assert.equal(take1.voice, take2.voice, "voice is identical");
  assert.equal(take1.funVoice, take2.funVoice, "funVoice is identical");
  assert.equal(take1.beatMode, take2.beatMode, "beatMode is identical");
  assert.equal(take1.bassMode, take2.bassMode, "bassMode is identical");
  assert.equal(take1.harmonyMode, take2.harmonyMode, "harmonyMode is identical");
  assert.equal(take1.chimeMode, take2.chimeMode, "chimeMode is identical");
  assert.equal(take1.chantMode, take2.chantMode, "chantMode is identical");

  // Visual morphology & color preserved
  assert.equal(take1.hue, take2.hue, "hue is identical");
  assert.equal(take1.hueShift, take2.hueShift, "hueShift is identical");
  assert.equal(take1.palette, take2.palette, "palette is identical");
  assert.equal(take1.saturation, take2.saturation, "saturation is identical");
  assert.equal(take1.shape, take2.shape, "shape is identical");
  assert.equal(take1.eyes, take2.eyes, "eyes are identical");
  assert.equal(take1.fungalForm, take2.fungalForm, "fungalForm is identical");
  assert.equal(take1.bellJar, take2.bellJar, "bellJar is identical");
  assert.equal(take1.temperament.id, take2.temperament.id, "temperament is identical");

  // Notes are tweaked
  assert.notDeepEqual(take1.steps, take2.steps, "melodic steps are tweaked between takes");

  // Name indicates opus variation
  assert.match(take1.name, /\(OPUS 1\)$/);
  assert.match(take2.name, /\(OPUS 2\)$/);
});

test("composeScore is fully deterministic for variation phrases", () => {
  const scoreA = composeScore(ORACLE_SOURCE, "clockwork monarch of the marsh # 3");
  const scoreB = composeScore(ORACLE_SOURCE, "clockwork monarch of the marsh # 3");

  assert.deepEqual(scoreA, scoreB);
  assert.equal(scoreA.seed, scoreB.seed);
  assert.equal(scoreA.name, scoreB.name);
  assert.deepEqual(scoreA.steps, scoreB.steps);
});

test("derived score variation guarantees valid integer step bounds in [0, 8]", () => {
  const base = composeScore(ORACLE_SOURCE, "astrolabe in the drawing room");

  for (let i = 1; i <= 50; i++) {
    const varied = deriveScoreVariation(base, `${base.phrase} # ${i}`, String(i));
    assert.equal(varied.steps.length, 12);
    for (const step of varied.steps) {
      assert.ok(Number.isInteger(step), "step is an integer");
      assert.ok(step >= 0 && step <= 8, `step ${step} is within [0, 8] bounds`);
    }
    assert.ok(varied.melodyTurn >= 0 && varied.melodyTurn <= 11);
    assert.equal(varied.root, base.root);
    assert.equal(varied.hue, base.hue);
  }
});

test("pinned flavor variation lets arbitrary single-character edit phrases tweak notes while keeping genus intact", () => {
  const pinnedBase = composeScore(ORACLE_SOURCE, "the wallpaper knows jazz");

  // User types "seed1" then "seed2" (1 character difference) while pinned
  const takeA = deriveScoreVariation(pinnedBase, "seed1", "seed1");
  const takeB = deriveScoreVariation(pinnedBase, "seed2", "seed2");

  assert.equal(takeA.root, pinnedBase.root);
  assert.equal(takeB.root, pinnedBase.root);
  assert.equal(takeA.scale, pinnedBase.scale);
  assert.equal(takeB.scale, pinnedBase.scale);
  assert.equal(takeA.hue, pinnedBase.hue);
  assert.equal(takeB.hue, pinnedBase.hue);
  assert.equal(takeA.shape, pinnedBase.shape);
  assert.equal(takeB.shape, pinnedBase.shape);
  assert.equal(takeA.temperament.id, pinnedBase.temperament.id);
  assert.equal(takeB.temperament.id, pinnedBase.temperament.id);

  // Notes are distinct
  assert.notDeepEqual(takeA.steps, takeB.steps);
  assert.match(takeA.name, /\(TAKE SEED1\)$/);
  assert.match(takeB.name, /\(TAKE SEED2\)$/);
});

test("tweak notes sequencing correctly advances opus numbers", () => {
  function nextTweak(phrase) {
    const parsed = parseVariationPhrase(phrase);
    if (parsed.hasVariation) {
      if (/^\d+$/.test(parsed.variationKey)) {
        const nextNum = parseInt(parsed.variationKey, 10) + 1;
        return `${parsed.basePhrase} # ${nextNum}`;
      }
      return `${parsed.basePhrase} # 2`;
    }
    return `${phrase} # 2`;
  }

  assert.equal(nextTweak("cat"), "cat # 2");
  assert.equal(nextTweak("cat # 2"), "cat # 3");
  assert.equal(nextTweak("cat # 3"), "cat # 4");
  assert.equal(nextTweak("blue moth # take 1"), "blue moth # 2");
});
