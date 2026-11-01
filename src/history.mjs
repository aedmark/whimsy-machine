// History action stack for multi-level transactional undo/redo (P12-03, D-105).
// Pure functions only. Zero dependencies.

export const DEFAULT_MAX_HISTORY = 50;

/**
 * Deep-clones a session snapshot to guarantee full detachment from live objects.
 * @param {object} snapshot
 * @returns {object}
 */
export function cloneSnapshot(snapshot) {
  if (snapshot === null || typeof snapshot !== "object") return snapshot;
  return JSON.parse(JSON.stringify(snapshot));
}

/**
 * Checks if two snapshots are structurally equal.
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
export function areSnapshotsEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Creates an initial empty history state.
 * @param {{ maxDepth?: number }} options
 * @returns {object}
 */
export function createHistoryState({ maxDepth = DEFAULT_MAX_HISTORY } = {}) {
  const depth = Number.isInteger(maxDepth) && maxDepth > 0 ? maxDepth : DEFAULT_MAX_HISTORY;
  return Object.freeze({
    past: Object.freeze([]),
    present: null,
    future: Object.freeze([]),
    maxDepth: depth,
  });
}

/**
 * Initializes the history with an initial state snapshot (e.g. on first summon).
 * @param {object} history
 * @param {object} initialSnapshot
 * @param {string} [label="Initial Summon"]
 * @returns {object}
 */
export function initHistory(history, initialSnapshot, label = "Initial Summon") {
  return Object.freeze({
    past: Object.freeze([]),
    present: Object.freeze({
      snapshot: cloneSnapshot(initialSnapshot),
      label: String(label || "Initial Summon"),
      timestamp: Date.now(),
    }),
    future: Object.freeze([]),
    maxDepth: history?.maxDepth || DEFAULT_MAX_HISTORY,
  });
}

/**
 * Pushes a new snapshot onto the history stack.
 * If the new snapshot matches the present snapshot, returns the existing state unmodified.
 * @param {object} history
 * @param {object} snapshot
 * @param {string} [label="Edit"]
 * @returns {object}
 */
export function pushHistory(history, snapshot, label = "Edit") {
  if (!history || !history.present) {
    return initHistory(history || createHistoryState(), snapshot, label);
  }

  // Deduplicate identical state pushes
  if (areSnapshotsEqual(history.present.snapshot, snapshot)) {
    return history;
  }

  const past = [...history.past, history.present];
  while (past.length > history.maxDepth) {
    past.shift();
  }

  return Object.freeze({
    past: Object.freeze(past),
    present: Object.freeze({
      snapshot: cloneSnapshot(snapshot),
      label: String(label || "Edit"),
      timestamp: Date.now(),
    }),
    future: Object.freeze([]),
    maxDepth: history.maxDepth,
  });
}

/**
 * Checks if undo is possible.
 * @param {object} history
 * @returns {boolean}
 */
export function canUndo(history) {
  return Boolean(history && Array.isArray(history.past) && history.past.length > 0);
}

/**
 * Checks if redo is possible.
 * @param {object} history
 * @returns {boolean}
 */
export function canRedo(history) {
  return Boolean(history && Array.isArray(history.future) && history.future.length > 0);
}

/**
 * Performs an undo operation.
 * @param {object} history
 * @returns {{ state: object, snapshot: object|null, label: string|null }}
 */
export function undo(history) {
  if (!canUndo(history)) {
    return { state: history, snapshot: null, label: null };
  }

  const past = [...history.past];
  const previous = past.pop();
  const future = [history.present, ...history.future];

  const newState = Object.freeze({
    past: Object.freeze(past),
    present: previous,
    future: Object.freeze(future),
    maxDepth: history.maxDepth,
  });

  return {
    state: newState,
    snapshot: previous.snapshot,
    label: previous.label,
  };
}

/**
 * Performs a redo operation.
 * @param {object} history
 * @returns {{ state: object, snapshot: object|null, label: string|null }}
 */
export function redo(history) {
  if (!canRedo(history)) {
    return { state: history, snapshot: null, label: null };
  }

  const future = [...history.future];
  const next = future.shift();
  const past = [...history.past, history.present];

  const newState = Object.freeze({
    past: Object.freeze(past),
    present: next,
    future: Object.freeze(future),
    maxDepth: history.maxDepth,
  });

  return {
    state: newState,
    snapshot: next.snapshot,
    label: next.label,
  };
}

/**
 * Clears the history stack, retaining only the current present snapshot.
 * @param {object} history
 * @returns {object}
 */
export function clearHistory(history) {
  return Object.freeze({
    past: Object.freeze([]),
    present: history?.present ?? null,
    future: Object.freeze([]),
    maxDepth: history?.maxDepth || DEFAULT_MAX_HISTORY,
  });
}

/**
 * Formats a summary of the current history state for telemetry / UI.
 * @param {object} history
 * @returns {{ undoCount: number, redoCount: number, currentLabel: string, canUndo: boolean, canRedo: boolean }}
 */
export function getHistorySummary(history) {
  const undoCount = history?.past?.length || 0;
  const redoCount = history?.future?.length || 0;
  const currentLabel = history?.present?.label || "None";
  return Object.freeze({
    undoCount,
    redoCount,
    currentLabel,
    canUndo: undoCount > 0,
    canRedo: redoCount > 0,
  });
}
