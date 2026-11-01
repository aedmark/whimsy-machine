import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  PART_IDS,
  MIXER_PART_IDS,
  META_PART_IDS,
  PART_LABELS,
  createPartLockState,
  countActiveLocks,
  togglePartLock,
  setAllLocks,
  fuseCreatureNames,
  buildChimeraScore,
  mutateUnlockedPlates,
} from "../src/part-lock.mjs";
import { composeScore } from "../src/score.mjs";

const source = await readFile(new URL("../src/oracle.lol", import.meta.url), "utf8");

test("part lock state tracks all 12 parts and defaults to unlocked", () => {
  const state = createPartLockState();
  assert.equal(PART_IDS.length, 12);
  assert.equal(MIXER_PART_IDS.length, 10);
  assert.equal(META_PART_IDS.length, 2);

  for (const part of PART_IDS) {
    assert.equal(state[part], false);
    assert.ok(typeof PART_LABELS[part] === "string");
  }

  const counts = countActiveLocks(state);
  assert.equal(counts.locked, 0);
  assert.equal(counts.total, 12);
  assert.equal(counts.free, 12);
  assert.equal(counts.isAnyLocked, false);
});

test("togglePartLock and setAllLocks update lock states immutably", () => {
  let state = createPartLockState();
  state = togglePartLock(state, "bass");
  assert.equal(state.bass, true);
  assert.equal(state.beat, false);

  let counts = countActiveLocks(state);
  assert.equal(counts.locked, 1);
  assert.equal(counts.isAnyLocked, true);
  assert.deepEqual(counts.lockedKeys, ["bass"]);

  state = togglePartLock(state, "beat");
  assert.equal(state.beat, true);
  counts = countActiveLocks(state);
  assert.equal(counts.locked, 2);

  const lockedAll = setAllLocks(state, true);
  assert.equal(countActiveLocks(lockedAll).locked, 12);

  const cleared = setAllLocks(lockedAll, false);
  assert.equal(countActiveLocks(cleared).locked, 0);
});

test("fuseCreatureNames produces authentic algorithmic fusion names", () => {
  const scoreA = composeScore(source, "ancient skeleton");
  const scoreB = composeScore(source, "cerulean moth");

  // Visuals unlocked: takes noun from B, adjective from A
  const fusedA = fuseCreatureNames(scoreA.rawValues, scoreB.rawValues, { lockVisuals: false });
  assert.ok(typeof fusedA === "string" && fusedA.length > 5);

  // Visuals locked: takes noun from A, adjective from B
  const fusedB = fuseCreatureNames(scoreA.rawValues, scoreB.rawValues, { lockVisuals: true });
  assert.ok(typeof fusedB === "string" && fusedB.length > 5);
  assert.notEqual(fusedA, fusedB);
});

test("buildChimeraScore returns newScore when unlocked and baseScore when fully locked", () => {
  const scoreA = composeScore(source, "ancient skeleton");
  const scoreB = composeScore(source, "cerulean moth");

  const noneLocked = createPartLockState();
  const res1 = buildChimeraScore(scoreA, scoreB, noneLocked);
  assert.equal(res1.phrase, scoreB.phrase);
  assert.equal(res1.chimera, undefined);

  const allLocked = setAllLocks(noneLocked, true);
  const res2 = buildChimeraScore(scoreA, scoreB, allLocked);
  assert.equal(res2.phrase, scoreA.phrase);
});

test("buildChimeraScore synthesizes chimera inheriting locked parts strictly", () => {
  const scoreA = composeScore(source, "ancient skeleton");
  const scoreB = composeScore(source, "cerulean moth");

  const locks = createPartLockState({ beat: true, bass: true });
  const chimera = buildChimeraScore(scoreA, scoreB, locks);

  // Locked beat and bass strictly match scoreA
  assert.equal(chimera.beatMode, scoreA.beatMode);
  assert.equal(chimera.beatDensity, scoreA.beatDensity);
  assert.equal(chimera.bassMode, scoreA.bassMode);
  assert.equal(chimera.bassGlide, scoreA.bassGlide);

  // Unlocked chime and chant strictly match scoreB
  assert.equal(chimera.chimeMode, scoreB.chimeMode);
  assert.equal(chimera.chimeShimmer, scoreB.chimeShimmer);
  assert.equal(chimera.chantMode, scoreB.chantMode);
  assert.equal(chimera.chantFormant, scoreB.chantFormant);

  // Chimera metadata
  assert.ok(chimera.chimera?.isChimera);
  assert.equal(chimera.chimera.basePhrase, scoreA.phrase);
  assert.equal(chimera.chimera.newPhrase, scoreB.phrase);
  assert.deepEqual(chimera.chimera.lockedParts, ["beat", "bass"]);
});

test("mutateUnlockedPlates advances unlocked mutation counters while freezing locked plates", () => {
  const current = { beat: 0, bass: 0, harmony: 2, chime: 1, chant: 0 };
  const locks = { beat: true, bass: false, harmony: true, chime: false, chant: false };

  const mutated = mutateUnlockedPlates(current, locks);
  assert.equal(mutated.beat, 0); // locked, frozen
  assert.equal(mutated.bass, 1); // unlocked, incremented
  assert.equal(mutated.harmony, 2); // locked, frozen
  assert.equal(mutated.chime, 2); // unlocked, incremented
  assert.equal(mutated.chant, 1); // unlocked, incremented
});
