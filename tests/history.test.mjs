import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_MAX_HISTORY,
  cloneSnapshot,
  areSnapshotsEqual,
  createHistoryState,
  initHistory,
  pushHistory,
  canUndo,
  canRedo,
  undo,
  redo,
  clearHistory,
  getHistorySummary,
} from "../src/history.mjs";

test("cloneSnapshot and areSnapshotsEqual handle deep objects and immutability", () => {
  const orig = { a: 1, b: { c: "hello", d: [1, 2, 3] } };
  const clone = cloneSnapshot(orig);

  assert.deepEqual(clone, orig);
  assert.notEqual(clone, orig);
  assert.notEqual(clone.b, orig.b);
  assert.notEqual(clone.b.d, orig.b.d);

  assert.equal(areSnapshotsEqual(orig, clone), true);
  clone.b.c = "world";
  assert.equal(areSnapshotsEqual(orig, clone), false);
  assert.equal(areSnapshotsEqual(null, orig), false);
  assert.equal(areSnapshotsEqual(null, null), true);
});

test("createHistoryState initializes empty state with specified or default depth", () => {
  const def = createHistoryState();
  assert.equal(def.maxDepth, DEFAULT_MAX_HISTORY);
  assert.equal(def.past.length, 0);
  assert.equal(def.future.length, 0);
  assert.equal(def.present, null);

  const custom = createHistoryState({ maxDepth: 10 });
  assert.equal(custom.maxDepth, 10);
});

test("initHistory sets initial present and leaves past and future empty", () => {
  const hist = createHistoryState({ maxDepth: 5 });
  const snapshot = { phrase: "test phrase", tempo: 108 };
  const initialized = initHistory(hist, snapshot, "First Summon");

  assert.equal(initialized.past.length, 0);
  assert.equal(initialized.future.length, 0);
  assert.equal(initialized.present.label, "First Summon");
  assert.deepEqual(initialized.present.snapshot, snapshot);
  // Snapshot must be cloned
  assert.notEqual(initialized.present.snapshot, snapshot);
});

test("pushHistory records successive states, deduplicates identical snapshots, and clears future", () => {
  let hist = createHistoryState({ maxDepth: 3 });
  hist = pushHistory(hist, { step: 1 }, "Action 1");
  assert.equal(hist.present.label, "Action 1");
  assert.equal(hist.past.length, 0);

  hist = pushHistory(hist, { step: 2 }, "Action 2");
  assert.equal(hist.past.length, 1);
  assert.equal(hist.past[0].label, "Action 1");
  assert.equal(hist.present.label, "Action 2");

  // Deduplication check: pushing identical state should be a no-op
  const same = pushHistory(hist, { step: 2 }, "Action 2 duplicate");
  assert.equal(same, hist);
  assert.equal(same.past.length, 1);

  hist = pushHistory(hist, { step: 3 }, "Action 3");
  hist = pushHistory(hist, { step: 4 }, "Action 4");
  assert.equal(hist.past.length, 3); // Max depth 3 reached
  assert.equal(hist.past[0].label, "Action 1");
  assert.equal(hist.past[1].label, "Action 2");
  assert.equal(hist.past[2].label, "Action 3");
  assert.equal(hist.present.label, "Action 4");

  hist = pushHistory(hist, { step: 5 }, "Action 5");
  assert.equal(hist.past.length, 3);
  assert.equal(hist.past[0].label, "Action 2"); // Action 1 now dropped
  assert.equal(hist.past[1].label, "Action 3");
  assert.equal(hist.past[2].label, "Action 4");
  assert.equal(hist.present.label, "Action 5");
});

test("undo and redo cycle correctly and respect stack boundaries", () => {
  let hist = createHistoryState();
  hist = pushHistory(hist, { count: 0 }, "Init");
  hist = pushHistory(hist, { count: 1 }, "Increment 1");
  hist = pushHistory(hist, { count: 2 }, "Increment 2");

  assert.equal(canUndo(hist), true);
  assert.equal(canRedo(hist), false);

  // Undo 1
  const u1 = undo(hist);
  assert.equal(u1.label, "Increment 1");
  assert.equal(u1.snapshot.count, 1);
  hist = u1.state;
  assert.equal(canUndo(hist), true);
  assert.equal(canRedo(hist), true);

  // Undo 2
  const u2 = undo(hist);
  assert.equal(u2.label, "Init");
  assert.equal(u2.snapshot.count, 0);
  hist = u2.state;
  assert.equal(canUndo(hist), false);
  assert.equal(canRedo(hist), true);

  // Undo when empty returns original state
  const uEmpty = undo(hist);
  assert.equal(uEmpty.state, hist);
  assert.equal(uEmpty.snapshot, null);

  // Redo 1
  const r1 = redo(hist);
  assert.equal(r1.label, "Increment 1");
  assert.equal(r1.snapshot.count, 1);
  hist = r1.state;
  assert.equal(canUndo(hist), true);
  assert.equal(canRedo(hist), true);

  // Redo 2
  const r2 = redo(hist);
  assert.equal(r2.label, "Increment 2");
  assert.equal(r2.snapshot.count, 2);
  hist = r2.state;
  assert.equal(canUndo(hist), true);
  assert.equal(canRedo(hist), false);

  // Redo when empty returns original state
  const rEmpty = redo(hist);
  assert.equal(rEmpty.state, hist);
  assert.equal(rEmpty.snapshot, null);
});

test("pushing a new action after undo clears future (branching history)", () => {
  let hist = createHistoryState();
  hist = pushHistory(hist, { val: "A" }, "A");
  hist = pushHistory(hist, { val: "B" }, "B");
  hist = pushHistory(hist, { val: "C" }, "C");

  // Undo back to B
  hist = undo(hist).state;
  assert.equal(hist.present.label, "B");
  assert.equal(canRedo(hist), true);

  // Branch with D
  hist = pushHistory(hist, { val: "D" }, "D");
  assert.equal(hist.present.label, "D");
  assert.equal(canRedo(hist), false);
  assert.equal(hist.future.length, 0);
  assert.equal(hist.past.length, 2); // [A, B]
});

test("clearHistory retains present and empties past and future", () => {
  let hist = createHistoryState();
  hist = pushHistory(hist, { val: 1 }, "1");
  hist = pushHistory(hist, { val: 2 }, "2");
  hist = undo(hist).state;

  assert.equal(canUndo(hist), false);
  assert.equal(canRedo(hist), true);

  const cleared = clearHistory(hist);
  assert.equal(canUndo(cleared), false);
  assert.equal(canRedo(cleared), false);
  assert.equal(cleared.present.label, "1");
});

test("getHistorySummary outputs telemetry summary", () => {
  let hist = createHistoryState();
  assert.deepEqual(getHistorySummary(hist), {
    undoCount: 0,
    redoCount: 0,
    currentLabel: "None",
    canUndo: false,
    canRedo: false,
  });

  hist = pushHistory(hist, { x: 10 }, "Move X");
  hist = pushHistory(hist, { x: 20 }, "Move X 20");

  const summary = getHistorySummary(hist);
  assert.equal(summary.undoCount, 1);
  assert.equal(summary.redoCount, 0);
  assert.equal(summary.currentLabel, "Move X 20");
  assert.equal(summary.canUndo, true);
  assert.equal(summary.canRedo, false);
});
