import test from "node:test";
import assert from "node:assert/strict";
import {
  VIEW_MODE_STORAGE_KEY,
  VIEW_MODES,
  DEFAULT_VIEW_MODE,
  parseViewMode,
  toggleViewMode,
  isSalonMode,
  viewModeLabel,
  unfoldButtonLabels,
} from "../src/view-mode.mjs";

test("VIEW_MODES and defaults", () => {
  assert.equal(VIEW_MODE_STORAGE_KEY, "whimsy-machine.view-mode.v1");
  assert.deepEqual(VIEW_MODES, ["salon", "workbench"]);
  assert.equal(DEFAULT_VIEW_MODE, "salon");
});

test("parseViewMode handles valid, missing, and malformed inputs", () => {
  assert.equal(parseViewMode(null), "salon");
  assert.equal(parseViewMode(undefined), "salon");
  assert.equal(parseViewMode(""), "salon");
  assert.equal(parseViewMode("studio"), "salon");
  assert.equal(parseViewMode("123"), "salon");
  assert.equal(parseViewMode("workbench"), "workbench");
  assert.equal(parseViewMode("salon"), "salon");
});

test("toggleViewMode cycles between salon and workbench", () => {
  assert.equal(toggleViewMode("salon"), "workbench");
  assert.equal(toggleViewMode("workbench"), "salon");
  assert.equal(toggleViewMode("other"), "salon");
});

test("isSalonMode correctly identifies parlor console mode", () => {
  assert.equal(isSalonMode("salon"), true);
  assert.equal(isSalonMode("workbench"), false);
  assert.equal(isSalonMode("unknown"), false);
});

test("viewModeLabel and unfoldButtonLabels provide frozen localized copy", () => {
  assert.equal(viewModeLabel("salon"), "PARLOR SALON ⧉");
  assert.equal(viewModeLabel("workbench"), "GRAND WORKBENCH ▾");

  const salonUnfold = unfoldButtonLabels("salon");
  assert.equal(salonUnfold.icon, "▾");
  assert.equal(salonUnfold.text, "UNFOLD GRAND WORKBENCH");
  assert.ok(salonUnfold.hint.includes("10-CHANNEL MIXER"));
  assert.ok(salonUnfold.hint.includes("[V]"));
  assert.ok(Object.isFrozen(salonUnfold));

  const benchUnfold = unfoldButtonLabels("workbench");
  assert.equal(benchUnfold.icon, "▴");
  assert.equal(benchUnfold.text, "COLLAPSE TO PARLOR SALON");
  assert.ok(benchUnfold.hint.includes("BEGINNER TOY"));
  assert.ok(benchUnfold.hint.includes("[V]"));
  assert.ok(Object.isFrozen(benchUnfold));
});
