// View mode state model and transitions for P12-04 (D-103).
// Two presentation modes:
//  - "salon": distraction-free single-screen parlor console (vitrine, transport,
//    compact 10-channel mixer, play-along manual) without vertical scrolling.
//  - "workbench": the full 4-wing grand studio workstation with esoteric VMs,
//    Inform 7 compiler, looper sequencer, and stem export suites.

export const VIEW_MODE_STORAGE_KEY = "whimsy-machine.view-mode.v1";
export const VIEW_MODES = Object.freeze(["salon", "workbench"]);
export const DEFAULT_VIEW_MODE = "salon";

/**
 * Validates and normalizes stored or incoming view mode strings.
 * Falls back to "salon" for first-time visitors or corrupted entries.
 */
export function parseViewMode(value) {
  if (typeof value !== "string") return DEFAULT_VIEW_MODE;
  return VIEW_MODES.includes(value) ? value : DEFAULT_VIEW_MODE;
}

/** Toggles between salon and workbench modes. */
export function toggleViewMode(mode) {
  return mode === "salon" ? "workbench" : "salon";
}

/** Reports whether the active mode is the single-screen salon console. */
export function isSalonMode(mode) {
  return mode === "salon";
}

/** Human-readable label for view toggles. */
export function viewModeLabel(mode) {
  return mode === "salon" ? "PARLOR SALON ⧉" : "GRAND WORKBENCH ▾";
}

/** Unfold button text for the console footer bar. */
export function unfoldButtonLabels(mode) {
  if (mode === "salon") {
    return Object.freeze({
      icon: "▾",
      text: "UNFOLD GRAND WORKBENCH",
      hint: "10-CHANNEL MIXER · ESOTERIC ENGINES · RULEBOOKS · LOOPER [V]",
    });
  }
  return Object.freeze({
    icon: "▴",
    text: "COLLAPSE TO PARLOR SALON",
    hint: "BEGINNER TOY · SINGLE-SCREEN FOCUS [V]",
  });
}
