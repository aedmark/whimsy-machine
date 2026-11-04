import { HARMONY_NAMES, composeHarmony, cycleHarmonyCell } from "./befunge.mjs";
import { BASS_NAMES, composeBass, cycleBassCell } from "./brainfuck.mjs";
import {
  FUN_KEY_BY_CODE,
  FUN_KEY_BY_KEY,
  CREATURE_GENRE,
  FUN_KEY_MAP,
  HARMONIC_PASSES,
  buildFunChord,
  chordLabelFor,
  compiledRulebooks,
  conductEnsemble,
  effectiveRhythmIndex,
  genreBook,
  genreCodes,
  installCreatureBook,
  installRulebooks,
  rulebooksInstalled,
  semitoneGradus,
} from "./conductor.mjs";
import { compileRulebooks } from "./inform.mjs";
import { CHIME_NAMES, composeChimes, cycleChimeCell } from "./fractran.mjs";
import { BEAT_NAMES, composeBeat, cycleBeatStep } from "./malbolge.mjs";
import { MELODY_NAMES, melodyFor } from "./music.mjs";
import { composeScore, deriveScoreVariation, parseVariationPhrase, WAVEFORMS } from "./score.mjs";
import {
  LIVE_REC_STATES,
  buildLiveTakeMidi,
  buildLiveTakeWav,
  createLiveRecorder,
} from "./live-recorder.mjs";
import { MIDI_TRACKS, buildMidiFile, funVoiceTracks, ticksForSeconds, velocitiesFor } from "./midi.mjs";
import {
  MIDI_CHANNELS,
  MIDI_CLOCK_MODES,
  bindMidiInput,
  computeMasterClockWindow,
  createMidiClockSlave,
  getAudioOutputDevices,
  getMidiPorts,
  isFm1Port,
  isSetSinkIdSupported,
  isWebMidiSupported,
  makeAllNotesOff,
  makeClockTick,
  makeControlChange,
  makeMidiContinue,
  makeMidiStart,
  makeMidiStop,
  makeNoteOff,
  makeNoteOn,
  mapFm1NoteEvent,
  requestMidiAccess,
  sendMidiMessage,
  setAudioOutputSink,
} from "./midi-io.mjs";
import {
  TARGET_DEFINITIONS,
  TARGET_GROUPS,
  TARGET_TYPES,
  createMidiLearnState,
  enterLearnMode,
  exitLearnMode,
  toggleLearnMode,
  armTarget,
  disarmTarget,
  learnMapping,
  unmapTarget,
  clearAllMappings,
  resetToBuiltinDefaults,
  getMappingForTarget,
  resolveMidiCC,
  computeOutboundCC,
  loadMidiMapFromStorage,
  saveMidiMapToStorage,
} from "./midi-learn.mjs";
import { createStoredZip } from "./zip.mjs";
import {
  ACCOMPANIMENT_STYLES,
  DEFAULT_ACCOMPANIMENT_STYLE,
  STYLE_LABELS,
  arpeggioNotes,
  buildPerformance,
  chordText,
  leadMidi,
  padVoicing,
  strikeLength,
  toTonicRelative,
} from "./accompaniment.mjs";
import { buildCreatureBook } from "./creature-rulebook.mjs";
import { CREATURE_VOICE_ID, creatureVoice, creatureVoiceLabel, scheduleVoiceLead, scheduleVoicePad, scheduleVoicePluck, voiceById } from "./voices.mjs";
import { buildShareUrl, decodeOmenHash, encodeOmenHash, specimenFilenameFor } from "./share.mjs";
import {
  PEAK_CEILING_DB,
  applyPeakCeiling,
  beatsIn,
  cutRender,
  encodeWav,
  exportFilename,
  keyLabelFor,
  normalizeExportSettings,
} from "./audio-export.mjs";
import { APP_VERSION, ENGINE_VERSION } from "./version.mjs";
import { DEFAULT_GRID_STEPS, applyScoreOverrides, effectiveRhythmTemplate, referencePitch, setReferencePitch, stepUnitSeconds } from "./tuning.mjs";
import { CHANT_NAMES, composeChant, cycleChantCell } from "./shakespeare.mjs";
import { arrangementSectionAt, composeArrangement } from "./intercal.mjs";
import {
  DRONE_DETUNE,
  DRONE_SETTLE,
  DRONE_SWELL,
  PARLOR_CRACKLE_PER_LEVEL,
  PARLOR_REVERB_PER_LEVEL,
  SILENT_GAIN,
  buildEnsembleGraph,
  creatureFilter,
  delayTimeFor,
  droneFrequencies,
  parlorSendLevels,
} from "./ensemble.mjs";
import {
  ACCOMPANIMENT_CHANNEL_IDS,
  FADER_UNITY,
  MIXER_CHANNELS,
  MIXER_CHANNEL_IDS,
  anySoloed,
  channelSettings,
  createMixerState,
  faderDb,
  formatDb,
  formatPan,
  isChannelAudible,
  meterFill,
  meterReading,
  mixerStateFromChannels,
  setFader,
  setMuted,
  setPan,
  silentSettings,
  stemSettings,
  toggleMute,
  toggleSolo,
} from "./mixer.mjs";
import {
  BANK_FILE_EXTENSION,
  BANK_FORMAT,
  BANK_VERSION,
  MAX_BANK_BYTES,
  MAX_SESSION_BYTES,
  PLATE_IDS,
  PRESET_STORAGE_KEY,
  SESSION_FILE_EXTENSION,
  SESSION_FORMAT,
  SESSION_VERSION,
  duplicatePreset,
  emptyPresetStore,
  parsePresetBank,
  parsePresetStore,
  parseSession,
  removePreset,
  renamePreset,
  serializePresetBank,
  serializeSession,
  upsertPreset,
  writePresetStoreTo,
} from "./session.mjs";
import { TRANSPORT_STATES, createTransportState, transportCommandForKey, transportReduce } from "./transport.mjs";
import {
  PART_IDS,
  MIXER_PART_IDS,
  META_PART_IDS,
  createPartLockState,
  countActiveLocks,
  togglePartLock,
  setAllLocks,
  buildChimeraScore,
  mutateUnlockedPlates,
} from "./part-lock.mjs";
import {
  LOOP_STEPS,
  MAX_REPEATS,
  MAX_SONG_PASSES,
  appendLoop,
  canAppendLoop,
  canInsertLoops,
  canOverdub,
  clampSelection,
  deleteLoop,
  emptySong,
  emptyTake,
  idleRecorder,
  insertSection,
  isEmptyTake,
  leadSlotAt,
  makeSlot,
  moveLoop,
  overdubLayer,
  recorderReduce,
  sectionPassForLoop,
  setLoopSlot,
  setRepeats,
  setSectionVoices,
  slotsAt,
  songPasses,
  songPosition,
  transposeSectionLoops,
  undoLayer,
} from "./looper.mjs";
import {
  CABINET_STORAGE_KEY,
  DRAWERS,
  LOOPS_BEFORE_BAND,
  cabinetReduce,
  defaultCabinetState,
  drawerForTrigger,
  isDrawerOpen,
  parseCabinetState,
  serializeCabinetState,
} from "./cabinet.mjs";
import {
  VIEW_MODE_STORAGE_KEY,
  DEFAULT_VIEW_MODE,
  parseViewMode,
  toggleViewMode,
  isSalonMode,
  viewModeLabel,
  unfoldButtonLabels,
} from "./view-mode.mjs";
import {
  createHistoryState,
  initHistory,
  pushHistory,
  canUndo,
  canRedo,
  undo,
  redo,
  clearHistory,
  getHistorySummary,
} from "./history.mjs";
import { OracleVision, interaction } from "./vitrine-canvas.mjs";
import { TEMPERAMENTS, deriveTemperament } from "./temperament.mjs";
import {
  createThereminModel,
  createThereminVoice,
  formatThereminTelemetry,
  pitchForThereminCoordinate,
  updateThereminModel,
} from "./theremin.mjs";
import {
  composeBoneBeat,
  createBoneBeatModel,
  formatBoneBeatTelemetry,
  quenchBoneForge,
  scheduleBoneBeatStep,
  stepBoneBeat,
  strikeBoneForge,
  triggerBoneStrike,
  triggerQuenchSteam,
} from "./bone-beat.mjs";
import {
  HARP_STRING_COUNT,
  HARP_SYMBIOSIS_MODES,
  buildHyphalStrings,
  checkStringIntersection,
  createSporeHarpModel,
  cycleSymbiosis,
  cycleTension,
  formatSporeHarpTelemetry,
  formatTensionLabel,
  pluckHyphalString,
  scheduleSporeHarpStep,
  strumHarp,
  triggerHyphalPluck,
} from "./spore-harp.mjs";
import {
  createMuscariaModel,
  cycleMuscariaMode,
  cycleTripDepth,
  formatMuscariaTelemetry,
  scheduleMuscariaStep,
  stepMuscariaModel,
  stimulateMuscaria,
} from "./muscaria.mjs";
import { renderSpecimenBroadsheetCanvas as renderBroadsheetCanvas } from "./broadsheet.mjs";
import { INSPECTOR_PLATE_IDS, inspectPlateStep } from "./inspector.mjs";
import { DEFAULT_MANUSCRIPT_SOURCE, compileManuscript } from "./manuscript.mjs";
import {
  compareSpecimens,
  emptyHerbariumStore,
  isSpecimenPinned,
  pinSpecimen,
  readHerbariumStoreFrom,
  specimenMiniatureData,
  unpinSpecimen,
  writeHerbariumStoreTo,
} from "./herbarium.mjs";
import {
  LEAD_DUCK_GAIN,
  ensureParlorImpulseResponse,
  ensureWaxCrackleBuffer,
  harmonicField,
  scheduleBassStep as scheduleBrainfuckBassStep,
  scheduleBeatStep as scheduleMalbolgeBeatStep,
  scheduleChantStep as scheduleShakespeareChantStep,
  scheduleChimeStep as schedulePietChimeStep,
  scheduleClockworkTick as scheduleParlorClockworkTick,
  scheduleFungalBioStep as scheduleMyceliumBioStep,
  scheduleHarmonyStep as scheduleBefungeHarmonyStep,
  scheduleNote as scheduleLeadNote,
  triggerPercussion as triggerVitrinePercussion,
  triggerSporePuff as triggerVitrineSporePuff,
} from "./schedulers.mjs";

// Esoteric sources share this module's ?v= stamp from the index.html import map
// (D-035), so a cached old spell is never paired with a fresh interpreter.
function sourceUrl(name) {
  const url = new URL(name, import.meta.url);
  url.search = new URL(import.meta.url).search;
  return url;
}

const SURPRISES = Object.freeze([
  "the moon owes me five dollars",
  "a cucumber with excellent boundaries",
  "Tuesday smells faintly purple",
  "my shadow has joined a union",
  "please hold for the infinite goose",
  "the wallpaper knows jazz",
  "a very small thunderstorm",
  "soup for the final astronaut",
  "the celestial laundromat is closing",
  "three pigeons in a borrowed coat",
  "gravity has submitted its resignation",
  "an accordion at the edge of time",
  "a polite ghost inquiring about tea",
  "the brass raven swallowed a pocket watch",
  "marmalade under excessive pressure",
  "the library on the dark side of the mantelpiece",
  "the pendulum swings both ways and sideways",
  "eighty-four buttons on an invisible waistcoat",
  "the barometer predicts velvet",
  "a turnip with an unlisted telephone number",
  "the taxidermied owl has an opinion",
  "four spoons arguing about soup",
  "an astrolabe calibrated for longing",
  "the parlour organ hums when nobody is looking",
  "the telegram arrived before it was sent",
  "the moth reads braille on the velvet curtain",
  "six biscuits in a state of grace",
  "the fog refuses to give a statement",
  "a gentle mutiny among the teaspoons",
  "the gramophone plays only yesterday",
  "an emergency meeting of the small rocks",
  "the conductor has misplaced the downbeat",
  "a quiet velvet bell",
  "the velvet settee remembers the prime minister",
  "an encyclopedia of forgotten Wednesdays",
  "the ceiling is considering a divorce",
  "a very dignified potato",
  "the kettle whistles in minor thirds",
  "the clock struck thirteen out of spite",
  "a slow parade of damp matchboxes",
  "the cat has been knighted in absentia",
  "the chandelier whispers to the floorboards",
  "a small brass compass that points toward tea",
  "the ghost in the scullery has good references",
  "a conspiracy of pocket handkerchiefs",
  "the barometer is leaking purple ink",
  "an umbrella that only opens underwater",
  "the antimacassar has achieved sentience",
  "thirty-two walnuts and a confession",
  "the drawing room is drifting out to sea",
  "a pocket watch filled with dried lavender",
  "the grandfather clock is losing its patience",
  "a confidential memo to the constellation Orion",
  "the canary sings exclusively in German",
  "a solemn toast to the third dimension",
  "the carpet pattern is slowly rearranging itself",
  "a mechanical nightingale with a loose spring",
  "the fireplace emits a polite clearing of the throat",
  "two snails conducting a census of the windowsill",
  "the teacup contains a localized low-pressure system",
  "a brass padlock with no keyhole",
  "the sofa cushion is hiding seventeen pennies",
  "a diplomatic envoy from the subterranean kingdom",
  "the mirror reflects everything five seconds late",
  "the omnibus to the end of the world is running late",
  "a tin of peppermint lozenges from 1888",
  "the parlor palm is listening very closely",
  "a secret society of retired stationmasters",
  "the bellows breathe in sync with the moon",
  "a treatise on the emotional life of doorknobs",
  "the coal scuttle harbors an ancient grievance",
  "an unfinished portrait of a respectable cabbage",
]);

const elements = {
  canvas: document.querySelector("#vision"),
  stageBellJar: document.querySelector("#stage-bell-jar"),
  stageCaption: document.querySelector("#stage-caption"),
  thereminToggle: document.querySelector("#theremin-toggle"),
  thereminScaleSnap: document.querySelector("#theremin-scale-snap"),
  thereminStatus: document.querySelector("#theremin-status"),
  sporeHarpToggle: document.querySelector("#spore-harp-toggle"),
  sporeHarpStrum: document.querySelector("#spore-harp-strum"),
  sporeHarpSymbiosis: document.querySelector("#spore-harp-symbiosis"),
  sporeHarpTension: document.querySelector("#spore-harp-tension"),
  sporeHarpTelemetry: document.querySelector("#spore-harp-telemetry"),
  muscariaBar: document.querySelector("#muscaria-bar"),
  muscariaToggle: document.querySelector("#muscaria-toggle"),
  muscariaStimulate: document.querySelector("#muscaria-stimulate"),
  muscariaTripDepth: document.querySelector("#muscaria-trip-depth"),
  muscariaTelemetry: document.querySelector("#muscaria-telemetry"),
  form: document.querySelector("#oracle-controls"),
  phrase: document.querySelector("#phrase"),
  surprise: document.querySelector("#surprise"),
  callingSlipTweak: document.querySelector("#calling-slip-tweak"),
  callingSlipPin: document.querySelector("#calling-slip-pin"),
  callingSlipHint: document.querySelector("#calling-slip-hint"),
  replay: document.querySelector("#replay"),
  shareLink: document.querySelector("#share-link"),
  exportPng: document.querySelector("#export-png"),
  exportWav: document.querySelector("#export-wav"),
  exportStems: document.querySelector("#export-stems"),
  exportLiveWav: document.querySelector("#export-live-wav"),
  exportLiveMidi: document.querySelector("#export-live-midi"),
  exportMidi: document.querySelector("#export-midi"),
  exportMidiFormat: document.querySelector("#export-midi-format"),
  exportBitDepth: document.querySelector("#export-bit-depth"),
  exportSampleRate: document.querySelector("#export-sample-rate"),
  exportLoopMode: document.querySelector("#export-loop-mode"),
  exportStemMode: document.querySelector("#export-stem-mode"),
  sound: document.querySelector("#sound-toggle"),
  viewModeToggle: document.querySelector("#view-mode-toggle"),
  viewModeText: document.querySelector("#view-mode-text"),
  workbenchBar: document.querySelector("#workbench-bar"),
  workbenchUnfold: document.querySelector("#workbench-unfold"),
  unfoldIcon: document.querySelector("#unfold-icon"),
  unfoldText: document.querySelector("#unfold-text"),
  unfoldHint: document.querySelector("#unfold-hint"),
  transportDeck: document.querySelector("#transport-deck"),
  transportPlay: document.querySelector("#transport-play"),
  transportPause: document.querySelector("#transport-pause"),
  transportStop: document.querySelector("#transport-stop"),
  transportUndo: document.querySelector("#transport-undo"),
  transportRedo: document.querySelector("#transport-redo"),
  transportLiveRec: document.querySelector("#transport-live-rec"),
  transportRecStatus: document.querySelector("#transport-rec-status"),
  transportBarLock: document.querySelector("#transport-bar-lock"),
  transportGridSteps: document.querySelector("#transport-grid-steps"),
  transportPosition: document.querySelector("#transport-position"),
  transportSection: document.querySelector("#transport-section"),
  mixerStrips: document.querySelector("#mixer-strips"),
  mixerTelemetry: document.querySelector("#mixer-telemetry"),
  mixerReset: document.querySelector("#mixer-reset"),
  partLockBar: document.querySelector("#part-lock-bar"),
  partLockMutate: document.querySelector("#part-lock-mutate"),
  partLockReroll: document.querySelector("#part-lock-reroll"),
  partLockToggleAll: document.querySelector("#part-lock-toggle-all"),
  partLockVisuals: document.querySelector("#part-lock-visuals"),
  partLockTonality: document.querySelector("#part-lock-tonality"),
  partLockSummary: document.querySelector("#part-lock-summary"),
  sessionTelemetry: document.querySelector("#session-telemetry"),
  sessionPresetName: document.querySelector("#session-preset-name"),
  sessionSavePreset: document.querySelector("#session-save-preset"),
  sessionUpdatePreset: document.querySelector("#session-update-preset"),
  sessionPresetList: document.querySelector("#session-preset-list"),
  sessionLoadPreset: document.querySelector("#session-load-preset"),
  sessionClonePreset: document.querySelector("#session-clone-preset"),
  sessionRenamePreset: document.querySelector("#session-rename-preset"),
  sessionDeletePreset: document.querySelector("#session-delete-preset"),
  sessionSaveFile: document.querySelector("#session-save-file"),
  sessionOpenFile: document.querySelector("#session-open-file"),
  sessionFileInput: document.querySelector("#session-file-input"),
  sessionExportBank: document.querySelector("#session-export-bank"),
  sessionOpenBank: document.querySelector("#session-open-bank"),
  sessionBankInput: document.querySelector("#session-bank-input"),
  herbariumTelemetry: document.querySelector("#herbarium-telemetry"),
  herbariumPinBtn: document.querySelector("#herbarium-pin-btn"),
  herbariumCards: document.querySelector("#herbarium-cards"),
  herbariumCompareLeft: document.querySelector("#herbarium-compare-left"),
  herbariumCompareRight: document.querySelector("#herbarium-compare-right"),
  herbariumCompareBtn: document.querySelector("#herbarium-compare-btn"),
  herbariumComparison: document.querySelector("#herbarium-comparison"),
  studioTelemetry: document.querySelector("#studio-telemetry"),
  midiInSelect: document.querySelector("#midi-in-select"),
  midiInChannelSelect: document.querySelector("#midi-in-channel-select"),
  midiConnectBtn: document.querySelector("#midi-connect-btn"),
  midiOutSelect: document.querySelector("#midi-out-select"),
  midiBroadcastBtn: document.querySelector("#midi-broadcast-btn"),
  midiClockModeSelect: document.querySelector("#midi-clock-mode-select"),
  midiClockStatus: document.querySelector("#midi-clock-status"),
  midiLearnStudioBtn: document.querySelector("#midi-learn-studio-btn"),
  midiMapClearBtn: document.querySelector("#midi-map-clear-btn"),
  midiMapResetBtn: document.querySelector("#midi-map-reset-btn"),
  midiFeedbackToggle: document.querySelector("#midi-feedback-toggle"),
  midiLearnStatus: document.querySelector("#midi-learn-status"),
  midiMapSummary: document.querySelector("#midi-map-summary"),
  studioUndoBtn: document.querySelector("#studio-undo-btn"),
  studioRedoBtn: document.querySelector("#studio-redo-btn"),
  studioHistoryClearBtn: document.querySelector("#studio-history-clear-btn"),
  studioHistoryStatus: document.querySelector("#studio-history-status"),
  studioHistoryBreadcrumbs: document.querySelector("#studio-history-breadcrumbs"),
  audioSinkSelect: document.querySelector("#audio-sink-select"),
  studioLocalControlBtn: document.querySelector("#studio-local-control-btn"),
  midiLearnMixerBtn: document.querySelector("#midi-learn-mixer-btn"),
  volume: document.querySelector("#master-volume"),
  volumeValue: document.querySelector("#volume-value"),
  tempo: document.querySelector("#tempo-bpm"),
  tempoValue: document.querySelector("#tempo-value"),
  folioReadout: document.querySelector("#folio-readout"),
  name: document.querySelector("#creature-name"),
  pulse: document.querySelector("#score-pulse"),
  wave: document.querySelector("#score-wave"),
  formValue: document.querySelector("#score-form"),
  melody: document.querySelector("#score-melody"),
  fungal: document.querySelector("#score-fungal"),
  beatName: document.querySelector("#score-beat"),
  beatTelemetry: document.querySelector("#beat-telemetry"),
  beatLock: document.querySelector("#beat-lock"),
  beatToggle: document.querySelector("#beat-toggle"),
  beatMutate: document.querySelector("#beat-mutate"),
  beatGrid: document.querySelector("#beat-grid"),
  boneBeatToggle: document.querySelector("#bone-beat-toggle"),
  boneBeatStrike: document.querySelector("#bone-beat-strike"),
  boneBeatQuench: document.querySelector("#bone-beat-quench"),
  boneBeatTelemetry: document.querySelector("#bone-beat-telemetry"),
  bassName: document.querySelector("#score-bass"),
  bassTelemetry: document.querySelector("#bass-telemetry"),
  bassLock: document.querySelector("#bass-lock"),
  bassToggle: document.querySelector("#bass-toggle"),
  bassMutate: document.querySelector("#bass-mutate"),
  bassGrid: document.querySelector("#bass-grid"),
  harmonyName: document.querySelector("#score-harmony"),
  harmonyTelemetry: document.querySelector("#harmony-telemetry"),
  harmonyLock: document.querySelector("#harmony-lock"),
  harmonyToggle: document.querySelector("#harmony-toggle"),
  harmonyMutate: document.querySelector("#harmony-mutate"),
  harmonyGrid: document.querySelector("#harmony-grid"),
  chimeName: document.querySelector("#score-chime"),
  chimeTelemetry: document.querySelector("#chime-telemetry"),
  chimeLock: document.querySelector("#chime-lock"),
  chimeToggle: document.querySelector("#chime-toggle"),
  chimeMutate: document.querySelector("#chime-mutate"),
  chimeGrid: document.querySelector("#chime-grid"),
  chantName: document.querySelector("#score-chant"),
  chantTelemetry: document.querySelector("#chant-telemetry"),
  chantLock: document.querySelector("#chant-lock"),
  chantToggle: document.querySelector("#chant-toggle"),
  chantMutate: document.querySelector("#chant-mutate"),
  chantGrid: document.querySelector("#chant-grid"),
  bandstandStatus: document.querySelector("#bandstand-status"),
  bandstandTelemetry: document.querySelector("#bandstand-telemetry"),
  bandstandEngageAll: document.querySelector("#bandstand-engage-all"),
  bandstandSoloLead: document.querySelector("#bandstand-solo-lead"),
  bandstandMutateAll: document.querySelector("#bandstand-mutate-all"),
  kapellmeisterEngine: document.querySelector("#kapellmeister-engine"),
  kapellmeisterGenreTitle: document.querySelector("#kapellmeister-genre-title"),
  kapellmeisterGenreMotto: document.querySelector("#kapellmeister-genre-motto"),
  kapellmeisterVariation: document.querySelector("#kapellmeister-variation"),
  kapellmeisterAsWritten: document.querySelector("#kapellmeister-as-written"),
  kapellmeisterManuscriptToggle: document.querySelector("#kapellmeister-manuscript-toggle"),
  kapellmeisterManuscript: document.querySelector("#kapellmeister-manuscript"),
  manuscriptSource: document.querySelector("#manuscript-source"),
  manuscriptCompileBtn: document.querySelector("#manuscript-compile-btn"),
  manuscriptResetBtn: document.querySelector("#manuscript-reset-btn"),
  manuscriptRestoreBtn: document.querySelector("#manuscript-restore-btn"),
  manuscriptDiagnostic: document.querySelector("#manuscript-diagnostic"),
  kapellmeisterGenre: document.querySelector("#kapellmeister-genre"),
  kapellmeisterKeyOverride: document.querySelector("#kapellmeister-key-override"),
  kapellmeisterScaleOverride: document.querySelector("#kapellmeister-scale-override"),
  kapellmeisterTuningA4: document.querySelector("#kapellmeister-tuning-a4"),
  kapellmeisterTelemetry: document.querySelector("#kapellmeister-telemetry"),
  kapellmeisterStrictness: document.querySelector("#kapellmeister-strictness"),
  kapellmeisterStrictnessVal: document.querySelector("#kapellmeister-strictness-val"),
  harmonicStep: document.querySelector("#harmonic-step"),
  harmonicChord: document.querySelector("#harmonic-chord"),
  harmonicVector: document.querySelector("#harmonic-vector"),
  harmonicEuler: document.querySelector("#harmonic-euler"),
  compassReg0: document.querySelector("#compass-reg-0"),
  compassReg1: document.querySelector("#compass-reg-1"),
  compassReg2: document.querySelector("#compass-reg-2"),
  compassReg3: document.querySelector("#compass-reg-3"),
  nodeText0: document.querySelector("#node-text-0"),
  nodeText1: document.querySelector("#node-text-1"),
  nodeText2: document.querySelector("#node-text-2"),
  nodeText3: document.querySelector("#node-text-3"),
  parlorAcousticsToggle: document.querySelector("#parlor-acoustics-toggle"),
  parlorAcousticsLevel: document.querySelector("#parlor-acoustics-level"),
  acousticsLevelVal: document.querySelector("#acoustics-level-val"),
  acousticsStatus: document.querySelector("#acoustics-status"),
  chipCrackle: document.querySelector("#chip-crackle"),
  chipReverb: document.querySelector("#chip-reverb"),
  chipTick: document.querySelector("#chip-tick"),
  funMachineEngine: document.querySelector("#fun-machine-engine"),
  funMachineStatus: document.querySelector("#fun-machine-status"),
  funMachineTelemetry: document.querySelector("#fun-machine-telemetry"),
  funOctaveDown: document.querySelector("#fun-octave-down"),
  funOctaveUp: document.querySelector("#fun-octave-up"),
  funOctaveDisplay: document.querySelector("#fun-octave-display"),
  funKeyboard: document.querySelector("#fun-keyboard"),
  cabinetSwitch: document.querySelector("#cabinet-switch"),
  cabinetSwitchText: document.querySelector("#cabinet-switch-text"),
  cabinetModeToggle: document.querySelector("#cabinet-mode-toggle"),
  cabinetAnnouncer: document.querySelector("#cabinet-announcer"),
  looperRecord: document.querySelector("#looper-record"),
  looperOverdub: document.querySelector("#looper-overdub"),
  looperStepRec: document.querySelector("#looper-step-rec"),
  looperRest: document.querySelector("#looper-rest"),
  looperClear: document.querySelector("#looper-clear"),
  looperSteps: document.querySelector("#looper-steps"),
  looperTiles: document.querySelector("#looper-tiles"),
  looperEditLabel: document.querySelector("#looper-edit-label"),
  looperRepeats: document.querySelector("#looper-repeats"),
  looperRepeatsDown: document.querySelector("#looper-repeats-down"),
  looperRepeatsUp: document.querySelector("#looper-repeats-up"),
  looperMoveEarlier: document.querySelector("#looper-move-earlier"),
  looperMoveLater: document.querySelector("#looper-move-later"),
  looperUndo: document.querySelector("#looper-undo"),
  looperDelete: document.querySelector("#looper-delete"),
  looperInsertIntro: document.querySelector("#looper-insert-intro"),
  looperInsertGroove: document.querySelector("#looper-insert-groove"),
  looperInsertBridge: document.querySelector("#looper-insert-bridge"),
  looperInsertOutro: document.querySelector("#looper-insert-outro"),
  looperAnnouncer: document.querySelector("#looper-announcer"),
  looperReadout: document.querySelector("#looper-readout"),
  casioIntro: document.querySelector("#casio-intro"),
  casioBridge: document.querySelector("#casio-bridge"),
  casioOutro: document.querySelector("#casio-outro"),
  keepTabExport: document.querySelector("#keep-tab-export"),
  keepTabSession: document.querySelector("#keep-tab-session"),
  keepTabStudio: document.querySelector("#keep-tab-studio"),
  keepTabHerbarium: document.querySelector("#keep-tab-herbarium"),
  exportEngine: document.querySelector("#export-engine"),
  sessionEngine: document.querySelector("#session-engine"),
  studioEngine: document.querySelector("#studio-engine"),
  herbariumEngine: document.querySelector("#herbarium-engine"),
  status: document.querySelector("#status"),
};

let oracleSource = "";
let beatSource = "";
let bassSource = "";
let harmonySource = "";
let pietSource = "";
let fractranSource = "";
let chantSource = "";
let conductorSource = "";
let canonicalRulebooksSource = "";
let baseScore = null;
let currentScore = null;
let callingSlipFlavorPin = false;
let pinnedFlavorScore = null;
let rootOverride = null;
let scaleOverride = null;
let barLock44 = false;
let activeGridSteps = DEFAULT_GRID_STEPS;
// The moves this creature made on its genre's changes (D-043), for the readout,
// and whether it may make them: AS WRITTEN plays the rulebook's own changes.
let currentVariation = Object.freeze([]);
let genreVaried = true;
let currentArrangement = null;
let currentBeat = null;
let currentBoneBeat = null;
let boneBeatModel = createBoneBeatModel();
let sporeHarpModel = createSporeHarpModel();
let liveRecorder = createLiveRecorder({
  sampleRate: 44100,
  onStateChange: (...args) => updateLiveRecUI(...args),
  onTakeComplete: (...args) => handleLiveTakeComplete(...args),
});
let liveCaptureProcessor = null;
let liveCaptureSilentGain = null;
let lastLiveTake = null;
let currentBass = null;
let currentHarmony = null;
let currentChimes = null;
let currentChant = null;
let rawBeat = null;
let rawBass = null;
let rawHarmony = null;
let rawChimes = null;
let rawChant = null;
let mixerState = setMuted(createMixerState(), "harp", true);
let beatMutation = 0;
let bassMutation = 0;
let harmonyMutation = 0;
let chimeMutation = 0;
let chantMutation = 0;
let partLockState = createPartLockState();
let activeBeatStep = -1;
let transportState = createTransportState();
let audioContext = null;
let currentTransport = null;
let muted = false;
let masterVolume = Number(elements.volume.value);
let activeTempoBpm = Number(elements.tempo?.value || 108);
// A genre code from src/rulebooks.ni; set once the rulebooks load.
let activeGenre = null;
let activeStrictness = 8;
let currentConductedSpine = null;
// The harmonic cycle (D-044): which pass of four the band is on, and the whole
// twelve-entry spine those passes walk through, for the compass.
let currentHarmonicPass = 0;
let currentCycleSpine = null;
// What the readout shows: the harmony of the step now sounding (null when stopped).
let heardHarmony = null;
let parlorAcousticsEnabled = true;
let parlorAcousticsLevel = 0.55;
let parlorCrackleEnabled = true;
let parlorReverbEnabled = true;
let parlorTickEnabled = true;
let funMachineStyle = DEFAULT_ACCOMPANIMENT_STYLE;
let funMachineDryGain = null;
let thereminModel = createThereminModel();
let thereminVoice = null;
let thereminMasterGain = null;
let lastThereminFrameAt = 0;
let lastThereminLoggedMidi = null;
let lastThereminLoggedTime = 0;

function updateThereminRouting() {
  if (!thereminMasterGain || !audioContext) return;
  try {
    thereminMasterGain.disconnect();
  } catch {}
  const target = currentTransport?.output || audioContext.destination;
  try {
    thereminMasterGain.connect(target);
  } catch {}
}

function getThereminDestination(context) {
  if (!thereminMasterGain || thereminMasterGain.context !== context) {
    thereminMasterGain = context.createGain();
    const gainValue = muted || !localControlEnabled ? 0 : masterGainFor(masterVolume);
    thereminMasterGain.gain.setValueAtTime(gainValue, context.currentTime);
  }
  updateThereminRouting();
  return thereminMasterGain;
}

function ensureThereminVoice() {
  if (!audioContext) return null;
  if (!thereminVoice) {
    const dest = getThereminDestination(audioContext);
    thereminVoice = createThereminVoice(audioContext, dest);
  }
  return thereminVoice;
}

function updateThereminUI(frequency = null) {
  if (!elements.thereminStatus) return;
  elements.thereminStatus.textContent = formatThereminTelemetry(thereminModel, frequency);
  elements.thereminStatus.classList.toggle("is-stuck", thereminModel.isStuck);
  elements.thereminStatus.classList.toggle("is-calcifying", thereminModel.status === "CALCIFYING" && !thereminModel.isStuck);
}

let muscariaModel = createMuscariaModel();
let lastMuscariaFrameAt = 0;

function updateMuscariaUI() {
  if (!elements.muscariaToggle) return;
  const isDormant = muscariaModel.mode === "DORMANT";
  const isPulse = muscariaModel.mode === "BIO_PULSE";
  const isTrippy = muscariaModel.mode === "HALLUCINATING";

  elements.muscariaToggle.setAttribute("aria-pressed", String(!isDormant));
  elements.muscariaBar?.classList.toggle("is-pulse", isPulse);
  elements.muscariaBar?.classList.toggle("is-hallucinating", isTrippy);

  if (isDormant) {
    elements.muscariaToggle.innerHTML = '<span class="muscaria-glyph" aria-hidden="true">🍄</span> MUSCARIA: DORMANT';
  } else if (isPulse) {
    elements.muscariaToggle.innerHTML = '<span class="muscaria-glyph" aria-hidden="true">⚡</span> PLANTWAVE: BIO-PULSE';
  } else {
    elements.muscariaToggle.innerHTML = '<span class="muscaria-glyph" aria-hidden="true">🌀</span> MUSCARIA: HALLUCINATING';
  }

  if (elements.muscariaTripDepth) {
    elements.muscariaTripDepth.textContent = `TRIP: ${muscariaModel.tripDepth}`;
  }

  if (elements.muscariaTelemetry) {
    elements.muscariaTelemetry.textContent = formatMuscariaTelemetry(muscariaModel);
  }
}
let activeHeldFunKey = null;
let activeFunPerformance = null;
let lastFunKeyReleaseTime = 0;
let pendingCasioSection = null;
let scheduledCasio = null;
let audibleCasioSection = null;
let audibleCasioKey = 0;
let audibleCasioPerformance = null;
let casioOutroEnding = false;
let midiAccess = null;
let midiInPortId = "omni";
let inboundMidiChannel = "1";
let midiOutPortId = "none";
let midiBroadcastActive = false;
let midiClockMode = "internal";
const midiClockSlave = createMidiClockSlave();
let midiSustainActive = false;
let localControlEnabled = true;
const broadcastEchoFilter = new Set();
const midiHeldNotes = new Map();
let unbindMidiIn = null;
let selectedAudioSinkId = "default";

function masterGainFor(volume) {
  if (!localControlEnabled || volume <= 0) return 0.0001;
  return Math.min(1.4, (volume / 82) ** 1.6);
}

function setLocalControl(enabled) {
  localControlEnabled = Boolean(enabled);
  if (elements.studioLocalControlBtn) {
    elements.studioLocalControlBtn.setAttribute("aria-pressed", String(localControlEnabled));
    elements.studioLocalControlBtn.classList.toggle("is-active", localControlEnabled);
    elements.studioLocalControlBtn.innerHTML = localControlEnabled
      ? 'LOCAL AUDIO: ON <span aria-hidden="true">☊</span>'
      : 'LOCAL AUDIO: MUTED (DAW ONLY) <span aria-hidden="true">✕</span>';
  }
  if (audioContext && funMachineDryGain) {
    const now = audioContext.currentTime;
    funMachineDryGain.gain.cancelScheduledValues(now);
    funMachineDryGain.gain.setTargetAtTime(masterGainFor(masterVolume), now, 0.018);
  }
  if (audioContext && thereminMasterGain) {
    const now = audioContext.currentTime;
    thereminMasterGain.gain.cancelScheduledValues(now);
    thereminMasterGain.gain.setTargetAtTime(muted || !localControlEnabled ? 0 : masterGainFor(masterVolume), now, 0.018);
  }
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.output.gain.cancelScheduledValues(now);
    currentTransport.output.gain.setTargetAtTime(masterGainFor(masterVolume), now, 0.018);
  }
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = localControlEnabled
      ? "LOCAL SOUND RESTORED · PLAYING THROUGH BROWSER & MIDI"
      : "LOCAL SOUND MUTED · DRIVING DAW SYNTHS IN SILENCE ✦";
  }
}

function setMasterVolume(value) {
  const options = arguments[1] || {};
  masterVolume = Math.max(0, Math.min(100, Number(value)));
  elements.volumeValue.value = `${Math.round(masterVolume)}%`;
  if (audioContext && funMachineDryGain) {
    const now = audioContext.currentTime;
    funMachineDryGain.gain.cancelScheduledValues(now);
    funMachineDryGain.gain.setTargetAtTime(masterGainFor(masterVolume), now, 0.018);
  }
  if (audioContext && thereminMasterGain) {
    const now = audioContext.currentTime;
    thereminMasterGain.gain.cancelScheduledValues(now);
    thereminMasterGain.gain.setTargetAtTime(muted || !localControlEnabled ? 0 : masterGainFor(masterVolume), now, 0.018);
  }
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.output.gain.cancelScheduledValues(now);
    currentTransport.output.gain.setTargetAtTime(masterGainFor(masterVolume), now, 0.018);
  }
  if (!options.fromMidi) {
    sendMidiFeedback("master:volume", masterVolume);
  }
}

function musicalPocketBpm(pulse) {
  let bpm = Math.round(Number(pulse));
  if (bpm < 68) bpm *= 2; // e.g. 42..67 double-times into 84..134 pocket
  else if (bpm > 144) bpm = Math.round(bpm / 2); // e.g. 145..167 half-times into 73..84 pocket
  return Math.max(36, Math.min(208, bpm));
}

function setTempoBpm(value) {
  const options = arguments[1] || {};
  activeTempoBpm = Math.max(36, Math.min(208, Math.round(Number(value))));
  if (elements.tempo) elements.tempo.value = String(activeTempoBpm);
  if (elements.tempoValue) elements.tempoValue.value = `${activeTempoBpm} BPM`;
  if (elements.pulse && currentScore) elements.pulse.textContent = String(activeTempoBpm);
  // The echo was timed once when the loop started. Since the Fun Machine's
  // pads, arpeggios, and lead feed it (D-029), a stale echo after a tempo
  // change made the accompaniment sound faster or slower than the setting.
  if (audioContext && currentTransport?.delay && currentScore) {
    const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(currentScore, activeGenre), activeGridSteps, barLock44);
    const unit = stepUnitSeconds(activeTempoBpm, rhythm, barLock44, activeGridSteps);
    const delayTime = delayTimeFor(currentScore, activeTempoBpm, effectiveRhythmIndex(currentScore, activeGenre), unit);
    currentTransport.delay.delayTime.setTargetAtTime(delayTimeFor(currentScore, activeTempoBpm) && delayTime, audioContext.currentTime, 0.08);
  }
  if (midiClockMode === "master") updateMidiClockStatus();
  if (!options.fromMidi) {
    sendMidiFeedback("master:tempo", activeTempoBpm);
  }
}

const stageContainer = elements.canvas.closest(".vision-stage");
const vision = new OracleVision(elements.canvas, {
  stageContainer,
  stageCaption: elements.stageCaption,
  onUpdateAudioInteraction: () => updateAudioInteraction(),
});

async function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
    if (selectedAudioSinkId && selectedAudioSinkId !== "default" && isSetSinkIdSupported(audioContext)) {
      setAudioOutputSink(audioContext, selectedAudioSinkId);
    }
  }
  if (audioContext.state === "suspended") await audioContext.resume();
  return audioContext;
}

function updateAudioInteraction() {
  if (!audioContext) return;
  const now = audioContext.currentTime;

  // Aetheric Bone Theremin real-time audio interaction (P10-01, D-089)
  if (thereminModel.enabled && interaction.active && !muted) {
    ensureThereminVoice();
    if (thereminVoice) {
      const nowMs = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      const dt = lastThereminFrameAt ? Math.min(0.1, (nowMs - lastThereminFrameAt) / 1000) : 0.016;
      lastThereminFrameAt = nowMs;

      const score = currentScore || vision.score;
      const pitchInfo = pitchForThereminCoordinate(interaction.smoothX, score, thereminModel.scaleSnap);
      const speed = interaction.dragSpeed || 0;
      const events = updateThereminModel(thereminModel, {
        normX: interaction.smoothX,
        normY: interaction.smoothY,
        speed,
        isInteracting: true,
        pitchClass: pitchInfo.pitchClass,
        midi: pitchInfo.midi,
        dt,
      });

      // Only critical collapse discharges crystalline pings; normal note movement glides purely
      if (events.includes("COLLAPSE")) {
        thereminVoice.shatterTine(pitchInfo.frequency);
        triggerPercussion("strike", interaction.smoothX, interaction.smoothY, 0.9);
        vision.burstSpores(2.0);
      }

      const gain = Math.max(0.08, Math.min(0.72, (1 - interaction.smoothY) * 0.45 * (0.35 + 0.65 * interaction.hold)));
      thereminVoice.updateAudio({
        frequency: pitchInfo.frequency,
        gain,
        normX: interaction.smoothX,
        slag: thereminModel.slag,
        isStuck: thereminModel.isStuck,
        now,
      });

      interaction.thereminActive = true;
      interaction.thereminSlag = thereminModel.slag;
      interaction.thereminStuck = thereminModel.isStuck;
      interaction.thereminFrequency = pitchInfo.frequency;

      const roundedMidi = Math.round(pitchInfo.midi);
      if (gain > 0.08 && currentTransport && (roundedMidi !== lastThereminLoggedMidi || (now - lastThereminLoggedTime > 0.35))) {
        logNote(currentTransport, "theremin", roundedMidi, now, Math.max(0.12, dt * 4), gain);
        lastThereminLoggedMidi = roundedMidi;
        lastThereminLoggedTime = now;
      }

      updateThereminUI(pitchInfo.frequency);
    }
  } else {
    lastThereminFrameAt = 0;
    lastThereminLoggedMidi = null;
    if (thereminVoice && interaction.thereminActive) {
      thereminVoice.silence(now);
      interaction.thereminActive = false;
      interaction.thereminSlag = 0;
      interaction.thereminStuck = false;
      updateThereminModel(thereminModel, { isInteracting: false });
      updateThereminUI(null);
    }
  }

  // PlantWave Amanita Muscaria Transducer & Hallucination step
  const nowMs = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  const muscariaDt = lastMuscariaFrameAt ? Math.min(0.1, (nowMs - lastMuscariaFrameAt) / 1000) : 0.016;
  lastMuscariaFrameAt = nowMs;
  stepMuscariaModel(muscariaModel, muscariaDt, { hold: interaction.hold });
  interaction.muscariaModel = muscariaModel;
  if (elements.muscariaTelemetry) {
    elements.muscariaTelemetry.textContent = formatMuscariaTelemetry(muscariaModel);
  }

  if (!currentTransport || muted) return;
  const score = currentScore || vision.score;
  const transport = currentTransport;
  const field = harmonicField();

  // The vitrine sweeps the lead's creature filter around the same resting
  // point the exports use (D-042).
  const creature = creatureFilter(score);
  const agitationExponent = (interaction.agitation || 0) * 0.65;
  const agitationCutoffTremor = Math.sin(now * 28) * ((interaction.agitation || 0) * 0.38);
  const retaliationCutoffSweep = (interaction.retaliationPitchDrop || 0) * 1.85;
  const sulkMuffle = 1 - ((interaction.sulk || 0) * 0.62);

  const harmonicExponent = (interaction.pitchBend * 0.72 + Math.sin(field.angle) * 0.35) * Math.max(0.3, interaction.hold) + interaction.tap * 0.25;
  const targetCutoff = Math.max(160, Math.min(10500, creature.cutoff * (2 ** (harmonicExponent + agitationExponent + agitationCutoffTremor + retaliationCutoffSweep)) * sulkMuffle));
  const targetQ = Math.min(8.5, creature.q + field.radius * 1.6 + interaction.tap * 0.7 + ((interaction.agitation || 0) * 1.8) + ((interaction.retaliationPitchDrop || 0) * 4.2));
  const targetMix = 0.28 * (1 + interaction.hold * 0.2 + interaction.tap * 0.12) * (1 - ((interaction.sulk || 0) * 0.45));
  const baseFeedback = 0.14 + score.bloom / 650;
  const tripBoost = (muscariaModel.mode === "HALLUCINATING" && transport.feedback)
    ? (0.16 * (muscariaModel.tripDepth === "TRANSCENDENT" ? 1.75 : (muscariaModel.tripDepth === "DEEP" ? 1.0 : 0.5)))
    : 0;
  const targetFeedback = Math.min(0.74, baseFeedback + field.radius * 0.14 + ((interaction.agitation || 0) * 0.24) + tripBoost);

  const isRetaliating = nowMs < (interaction.retaliateUntil || 0);

  transport.filter.frequency.setTargetAtTime(targetCutoff, now, 0.045);
  transport.filter.Q.setTargetAtTime(targetQ, now, 0.045);
  if (!isRetaliating) {
    transport.mix.gain.setTargetAtTime(targetMix, now, 0.045);
    transport.feedback.gain.setTargetAtTime(targetFeedback, now, 0.05);
  }

  if (transport.panner) {
    const targetPan = Math.max(-0.85, Math.min(0.85, interaction.smoothX * 0.88));
    transport.panner.pan.setTargetAtTime(targetPan, now, 0.04);
  }

  // Real-time continuous drone choir pitch bend, agitation flutter, retaliation drop, and sulk detune
  const pitchBendCents = interaction.pitchBend * 140 * interaction.hold;
  const agitationVibrato = Math.sin(now * 34) * ((interaction.agitation || 0) * 75);
  const retaliationDetune = (interaction.retaliationPitchDrop || 0) * -420;
  const sulkDetune = Math.sin(now * 1.6) * ((interaction.sulk || 0) * -35);

  const subWeight = 0.045 * (1 + Math.max(0, -interaction.pitchBend) * 0.55 * interaction.hold) * (1 - ((interaction.sulk || 0) * 0.35));
  const fifthWeight = (0.035 + field.radius * 0.065 * (0.5 - 0.5 * Math.cos(field.angle * 2))) * (1 - ((interaction.sulk || 0) * 0.4));
  const shimmerWeight = (field.radius * 0.058 * (0.5 + 0.5 * Math.sin(interaction.pitchBend * Math.PI * 0.5))) * (1 - ((interaction.sulk || 0) * 0.5));
  // The tonic drones step back with the lead while the band follows a held key.
  const isKeyTransition = (nowMs - lastFunKeyReleaseTime) < 220;
  const leadDuck = activeHeldFunKey !== null || isKeyTransition || currentTransport?.songLeading || scheduledCasio !== null || audibleCasioSection !== null ? LEAD_DUCK_GAIN : 1;
  const targetDroneGains = [subWeight * leadDuck, fifthWeight * leadDuck, shimmerWeight * leadDuck];

  for (const [index, drone] of transport.drones.entries()) {
    const baseDetune = [-5, 4, -3][index] || 0;
    const phaseBeating = Math.sin(field.angle + index * 2.094) * (10 + 16 * field.radius);
    const agitationDetuneJitter = ((Math.sin(now * 19.3 + index * 2.1) + Math.cos(now * 43.7)) * 38 * ((interaction.agitation || 0) ** 1.4));
    const muscariaDroneWarp = muscariaModel.mode === "HALLUCINATING" ? muscariaModel.warpCents : 0;
    const totalDetune = baseDetune + pitchBendCents + phaseBeating + agitationVibrato + agitationDetuneJitter + retaliationDetune + sulkDetune + muscariaDroneWarp;
    drone.detune.setTargetAtTime(totalDetune, now, 0.04);
    if (transport.droneGains?.[index]) {
      transport.droneGains[index].gain.setTargetAtTime(targetDroneGains[index] ?? 0.03, now, 0.05);
    }
  }

  // Vitrine bell jar glass acoustic proximity resonance
  if (transport.parlorReverbSend && parlorAcousticsEnabled && parlorReverbEnabled) {
    const glassProximity = Math.max(0, (field.radius - 0.5) / 0.5);
    const agitationAcousticBoost = 1 + ((interaction.agitation || 0) * 0.85);
    const glassBoost = (1 + glassProximity * 0.45) * agitationAcousticBoost;
    transport.parlorReverbSend.gain.setTargetAtTime(PARLOR_REVERB_PER_LEVEL * parlorAcousticsLevel * glassBoost, now, 0.05);
  }
}

function triggerPercussion(kind, normX = 0, normY = 0, strength = 1) {
  triggerVitrinePercussion(kind, normX, normY, strength, {
    audioContext,
    currentTransport,
    muted,
    score: currentScore || vision.score,
    parlorAcousticsEnabled,
    parlorReverbEnabled,
  });
}

function triggerSporePuff(strength = 1, atTime = null) {
  triggerVitrineSporePuff(strength, atTime, {
    audioContext,
    currentTransport,
    muted,
  });
  if (sporeHarpModel.enabled && sporeHarpModel.strings?.length > 0 && !muted) {
    let hitIdx = Math.floor(Math.random() * sporeHarpModel.strings.length);
    const chord = currentConductedSpine?.[currentTransport?.audibleStep % activeGridSteps] || null;
    if (chord?.pitchClasses?.length) {
      const matches = sporeHarpModel.strings
        .map((str, idx) => ({ idx, pc: str.midi % 12 }))
        .filter((s) => chord.pitchClasses.includes(s.pc));
      if (matches.length > 0) {
        hitIdx = matches[Math.floor(Math.random() * matches.length)].idx;
      }
    }
    const pluck = pluckHyphalString(sporeHarpModel, hitIdx, 0.35 * Math.min(1.2, strength));
    if (pluck && audioContext) {
      const dest = currentTransport?.sporeHarpBus || currentTransport?.fungalBus || audioContext.destination;
      const at = atTime || audioContext.currentTime;
      triggerHyphalPluck(audioContext, dest, pluck.frequency, pluck.velocity, {
        symbiosis: sporeHarpModel.symbiosis,
        sporeDensity: pluck.sporeDensity,
        atTime: at,
      });
      if (currentTransport) {
        const soundedMidi = Math.round(pluck.midi + 12 * Math.log2(sporeHarpModel.tension || 1.0));
        logNote(currentTransport, "harp", soundedMidi, at, 0.45, pluck.velocity);
      }
      if (elements.sporeHarpTelemetry) {
        elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
      }
    }
  }
  if (muscariaModel.enabled) {
    stimulateMuscaria(muscariaModel, 0.8 * Math.min(1.5, strength));
    if (elements.muscariaTelemetry) {
      elements.muscariaTelemetry.textContent = formatMuscariaTelemetry(muscariaModel);
    }
  }
}

// Silences the active loop and returns the raw step it should resume from, or
// null when nothing was playing. Steps already queued in the look-ahead window
// are cut by fading the whole output, not just the drone mix.
function stopCurrentSound() {
  silenceExternalMidi();
  releaseFunPads(audioContext, 0.25);
  casioOutroEnding = false;
  scheduledCasio = null;
  audibleCasioSection = null;
  audibleCasioKey = 0;
  audibleCasioPerformance = null;
  pendingCasioSection = null;
  thereminVoice?.silence();
  interaction.thereminActive = false;
  interaction.thereminSlag = 0;
  interaction.thereminStuck = false;
  if (liveRecorder && liveRecorder.getState() !== LIVE_REC_STATES.IDLE) {
    liveRecorder.forceFinalize(audioContext?.currentTime);
  }
  detachLiveAudioTap();
  if (!currentTransport || !audioContext) return null;
  const transport = currentTransport;
  currentTransport = null;
  updateThereminRouting();
  window.clearInterval(transport.timer);
  if (transport.timeouts) {
    for (const tid of transport.timeouts) window.clearTimeout(tid);
    transport.timeouts.clear();
  }
  const now = audioContext.currentTime;
  transport.mix.gain.cancelScheduledValues(now);
  transport.mix.gain.setTargetAtTime(0.0001, now, 0.035);
  transport.output.gain.cancelScheduledValues(now);
  transport.output.gain.setTargetAtTime(0.0001, now, 0.03);
  for (const drone of transport.drones) {
    try {
      drone.stop(now + 0.18);
    } catch {
      // A previously stopped oscillator is harmless during rapid resummoning.
    }
  }
  window.setTimeout(() => transport.output.disconnect(), 350);
  return transport.audibleStep + 1;
}

// Offline renders may set `transport.engageAll` (stems render every part even
// if the console mutes it) and `transport.noteLog` (MIDI export captures every
// pitched event from the same code that makes the sound). Live transports set
// neither.
function transportEngages(transport, id) {
  return transport.engageAll === true || channelEngaged(id);
}

function broadcastLiveMidiNote(channelId, midi, at, duration, peak) {
  if (!midiBroadcastActive || !midiAccess || !audioContext) return;
  const ch = channelId === "fun" ? MIDI_CHANNELS.MANUAL
    : channelId === "lead" ? MIDI_CHANNELS.LEAD
    : channelId === "bass" ? MIDI_CHANNELS.BASS
    : channelId === "harmony" ? MIDI_CHANNELS.HARMONY
    : channelId === "chime" ? MIDI_CHANNELS.CHIME
    : channelId === "chant" ? MIDI_CHANNELS.CHANT
    : channelId === "fungal" ? MIDI_CHANNELS.FUNGAL
    : channelId === "beat" ? MIDI_CHANNELS.BEAT
    : 1;

  const pitch = Math.max(0, Math.min(127, Math.round(midi)));
  const velocity = Math.max(1, Math.min(127, Math.round(peak ? 40 + 87 * Math.min(1, peak) : 100)));

  const delaySec = Math.max(0, at - audioContext.currentTime);
  const nowMs = performance.now();
  const noteOnTime = nowMs + delaySec * 1000;
  const noteOffTime = noteOnTime + Math.max(20, duration * 1000);

  // Suppress loopback echoes so Midi Through does not feed our own notes back into manual keys
  const noteKey = (ch << 8) | pitch;
  broadcastEchoFilter.add(noteKey);
  window.setTimeout(() => {
    broadcastEchoFilter.delete(noteKey);
  }, delaySec * 1000 + Math.max(20, duration * 1000) + 150);

  const noteOnBytes = makeNoteOn(ch, pitch, velocity);
  const noteOffBytes = makeNoteOff(ch, pitch);

  sendMidiMessage(midiAccess, midiOutPortId, noteOnBytes, noteOnTime);
  sendMidiMessage(midiAccess, midiOutPortId, noteOffBytes, noteOffTime);
}

function silenceExternalMidi() {
  if (!midiAccess || !midiBroadcastActive) return;
  for (let ch = 1; ch <= 16; ch++) {
    sendMidiMessage(midiAccess, midiOutPortId, makeAllNotesOff(ch));
  }
}

function logNote(transport, channel, midi, at, duration, peak, voice = null) {
  transport?.noteLog?.push({ channel, midi: Math.round(midi), at, duration, peak, ...(voice ? { voice } : {}) });
  liveRecorder?.logNote({ channel, midi: Math.round(midi), at, duration, peak, ...(voice ? { voice } : {}) });
  if (midiBroadcastActive && audioContext && transport && transport === currentTransport) {
    broadcastLiveMidiNote(channel, midi, at, duration, peak);
  }
}

// How a Fun Machine note names its voice in the MIDI export (one track per
// voice, D-040): the creature's own voice is named with the preset it chose.
function midiVoiceOf(voice) {
  const label = voice.id === CREATURE_VOICE_ID
    ? `THE CREATURE'S OWN (${creatureVoiceLabel(currentScore || vision.score)})`
    : voice.label;
  return { key: voice.id, label, program: voice.program };
}

function scheduleNote(context, transport, score, step, at, duration, options = {}) {
  scheduleLeadNote(context, transport, score, step, at, duration, {
    currentTransport,
    activeHeldFunKey,
    logNote,
    ...options,
  });
}

function scheduleClockworkTick(context, destination, at, stepIndex, level = 0.55, stepsCount = activeGridSteps) {
  scheduleParlorClockworkTick(context, destination, at, stepIndex, level, {
    parlorAcousticsEnabled,
    parlorTickEnabled,
    looperNeedsTick: recorder.mode !== "idle",
    stepsCount,
  });
}

function scheduleBeatStep(context, transport, score, stepIndex, at, stepDuration) {
  scheduleMalbolgeBeatStep(context, transport, score, stepIndex, at, stepDuration, {
    currentBeat,
    engaged: transportEngages(transport, "beat"),
    logNote,
  });
  const activeModel = transport.boneBeatModel || boneBeatModel;
  const forgeEngaged = transportEngages(transport, "forge");
  if (currentBoneBeat && activeModel?.enabled && forgeEngaged) {
    const stepData = currentBoneBeat.steps[stepIndex % currentBoneBeat.gridSteps];
    if (stepData) {
      stepBoneBeat(activeModel, stepData, { dt: stepDuration });
      const dest = transport.forgeBus || transport.beatBus;
      scheduleBoneBeatStep(context, dest, activeModel, stepData, at, stepDuration);
      if (stepData.heavy) logNote(transport, "forge", 35, at, 0.14, 0.9);
      else if (stepData.stone) logNote(transport, "forge", 47, at, 0.20, 0.75);
      else if (stepData.kinetic) logNote(transport, "forge", 56, at, 0.08, 0.70);
      if (!transport.isOffline && elements.boneBeatTelemetry) {
        elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(activeModel);
      }
    }
  }
}

function scheduleBassStep(context, transport, score, stepIndex, at, stepDuration) {
  scheduleBrainfuckBassStep(context, transport, score, stepIndex, at, stepDuration, {
    currentBass,
    engaged: transportEngages(transport, "bass"),
    logNote,
  });
}

function scheduleHarmonyStep(context, transport, score, stepIndex, at, stepDuration) {
  scheduleBefungeHarmonyStep(context, transport, score, stepIndex, at, stepDuration, {
    currentHarmony,
    engaged: transportEngages(transport, "harmony"),
    logNote,
  });
}

function scheduleChimeStep(context, transport, score, stepIndex, at, stepDuration) {
  schedulePietChimeStep(context, transport, score, stepIndex, at, stepDuration, {
    currentChimes,
    engaged: transportEngages(transport, "chime"),
    logNote,
  });
}

function scheduleChantStep(context, transport, score, stepIndex, at, stepDuration, options = {}) {
  scheduleShakespeareChantStep(context, transport, score, stepIndex, at, stepDuration, {
    currentChant,
    engaged: transportEngages(transport, "chant"),
    logNote,
    ...options,
  });
}

function scheduleFungalBioStep(context, transport, score, stepIndex, at, stepDuration) {
  scheduleMyceliumBioStep(context, transport, score, stepIndex, at, stepDuration, {
    logNote,
  });
  const activeModel = transport.sporeHarpModel || sporeHarpModel;
  const harpEngaged = transportEngages(transport, "harp");
  if (activeModel?.enabled && activeModel.autoStrum && harpEngaged) {
    const chord = transport.conductedSpine?.[stepIndex] || currentConductedSpine?.[stepIndex] || null;
    const dest = transport.sporeHarpBus || transport.fungalBus;
    scheduleSporeHarpStep(context, dest, activeModel, stepIndex, at, stepDuration, {
      chord,
      logNote: (midi, start, dur, vel) => logNote(transport, "harp", midi, start, dur, vel),
    });
    if (!transport.isOffline && elements.sporeHarpTelemetry) {
      elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(activeModel);
    }
  }
  const activeMuscaria = transport.muscariaModel || muscariaModel;
  const fungalEngaged = transportEngages(transport, "fungal");
  if (activeMuscaria?.enabled && fungalEngaged) {
    const chord = transport.conductedSpine?.[stepIndex] || currentConductedSpine?.[stepIndex] || null;
    const dest = transport.fungalBus;
    scheduleMuscariaStep(context, dest, activeMuscaria, stepIndex, at, stepDuration, {
      score,
      chord,
      stepsCount: activeGridSteps,
      logNote: (midi, start, dur, vel) => logNote(transport, "fungal", midi, start, dur, vel),
    });
    if (!transport.isOffline && elements.muscariaTelemetry) {
      elements.muscariaTelemetry.textContent = formatMuscariaTelemetry(activeMuscaria);
    }
  }
}

function getFunMachineDirectDestination(context) {
  if (currentTransport?.funBus) return currentTransport.funBus;
  if (currentTransport?.output) return currentTransport.output;
  if (!funMachineDryGain || funMachineDryGain.context !== context) {
    funMachineDryGain = context.createGain();
    funMachineDryGain.connect(context.destination);
  }
  funMachineDryGain.gain.value = masterGainFor(masterVolume);
  return funMachineDryGain;
}

// --- Fun Machine accompanist voices (D-028) ---------------------------------
//
// Three synth voices, none of them an organ: a slow-blooming stereo pad for the
// chords, a soft plucked arpeggio, and a singing lead with glide and delayed
// vibrato. All of them land on the band's own step grid and run through the
// Fun Machine strip, which feeds the delay and chamber reverb.

// Pads still sounding (or scheduled) from held keys, so a key change or release
// can fade them instead of letting an old chord ring under a new one.
const funPadHandles = new Set();

// The voice the Fun Machine plays in, chosen with the VOICE chips: the
// creature's own (from its score) by default, or a preset. Sessions keep it,
// and every recorded slot keeps the voice it was played in (D-040).
let funVoiceId = CREATURE_VOICE_ID;
let creatureVoiceCache = { seed: null, voice: null };
// The patch for a voice id: a preset, or this creature's own voice.
function voicePatch(id) {
  if (id !== CREATURE_VOICE_ID) return voiceById(id);
  const score = currentScore || vision.score;
  if (creatureVoiceCache.seed !== score.seed) creatureVoiceCache = { seed: score.seed, voice: creatureVoice(score) };
  return creatureVoiceCache.voice;
}

function currentFunVoice() {
  return voicePatch(funVoiceId);
}

function funVoiceText() {
  const score = currentScore || vision.score;
  return funVoiceId === CREATURE_VOICE_ID
    ? `VOICE: THE CREATURE'S OWN (${creatureVoiceLabel(score)})`
    : `VOICE: ${currentFunVoice().label}`;
}

/**
 * Schedules one pad chord in the current Fun Machine voice (D-040), under one
 * envelope whose attack scales with the chord's length. The release overlaps
 * the next chord so changes crossfade. Returns a handle for releaseFunPads().
 */
function schedulePadChord(context, destination, chord, at, duration, { level = 1, voicing = null, transport = null, releasable = true, voice = currentFunVoice() } = {}) {
  if (!chord) return null;
  const notes = voicing || padVoicing(chord);
  const start = Math.max(context.currentTime + 0.01, at);
  const sounding = Math.max(0.3, duration);
  const { env, oscillators, stopAt, peak } = scheduleVoicePad(context, destination, voice, notes, { start, sounding, level, hold: interaction.hold });
  if (transport) for (const midi of notes) logNote(transport, "fun", midi, start, sounding, peak, midiVoiceOf(voice));

  const handle = { env, oscillators, stopAt, start };
  // Only live pads can be released; offline renders keep their own clock, and
  // recorded loop layers ring out on their own when a live key lets go.
  if (context === audioContext && releasable) {
    funPadHandles.add(handle);
    window.setTimeout(() => funPadHandles.delete(handle), Math.max(0, (stopAt - context.currentTime) * 1000) + 200);
  }
  return handle;
}

// Fades every live pad (including ones scheduled a moment ahead) cleanly over `fade`.
function releaseFunPads(context, fade = 0.5) {
  if (!context) return;
  const now = context.currentTime;
  for (const handle of funPadHandles) {
    if (!handle || !handle.env) continue;
    const gainParam = handle.env.gain;
    if (handle.start !== undefined && handle.start > now) {
      // Future scheduled pad that has not sounded yet:
      // Cancel its timeline, hold gain at 0.0001, and stop all oscillators immediately
      // so it never bursts or speaks when its start time arrives.
      try {
        gainParam.cancelScheduledValues(now);
        gainParam.setValueAtTime(0.0001, now);
      } catch {}
      for (const osc of handle.oscillators || []) {
        try {
          osc.stop(now);
        } catch {}
      }
    } else {
      // Actively sounding pad:
      // Safely anchor current gain at `now` before ramping down to prevent AudioParam jumps,
      // then decay cleanly to 0.0001 over fade / 4.
      try {
        if (typeof gainParam.cancelAndHoldAtTime === "function") {
          gainParam.cancelAndHoldAtTime(now);
        } else {
          const currentVal = gainParam.value;
          gainParam.cancelScheduledValues(now);
          gainParam.setValueAtTime(currentVal, now);
        }
        gainParam.setTargetAtTime(0.0001, now, Math.max(0.02, fade / 4));
      } catch {}
      for (const osc of handle.oscillators || []) {
        try {
          osc.stop(now + fade * 1.5);
        } catch {}
      }
    }
  }
  funPadHandles.clear();
}

// A pluck for each arpeggio note, in the current voice.
function scheduleArpNote(context, destination, midi, at, duration, { accent = false, pan = 0, transport = null, voice = currentFunVoice() } = {}) {
  const start = Math.max(context.currentTime + 0.005, at);
  const { decay, peak } = scheduleVoicePluck(context, destination, voice, midi, { start, duration, accent, pan, hold: interaction.hold });
  if (transport) logNote(transport, "fun", midi, start, decay, peak, midiVoiceOf(voice));
}

// The composer's line, gliding from the previous note, in the current voice.
function scheduleFunLeadNote(context, destination, midi, at, duration, { glideFrom = null, transport = null, voice = currentFunVoice() } = {}) {
  const start = Math.max(context.currentTime + 0.01, at);
  const { sounding, peak } = scheduleVoiceLead(context, destination, voice, midi, { start, duration, glideFrom, hold: interaction.hold });
  if (transport) logNote(transport, "fun", midi, start, sounding, peak, midiVoiceOf(voice));
}

// A negative step clears every plate's playhead (transport stopped).
function highlightBeatStep(stepIndex) {
  const normalized = stepIndex < 0 ? -1 : stepIndex % 12;
  activeBeatStep = normalized;
  if (elements.beatGrid) {
    for (const button of elements.beatGrid.querySelectorAll(".beat-step")) {
      const idx = Number(button.dataset.step);
      button.classList.toggle("is-current", idx === normalized);
    }
  }
  if (elements.bassGrid) {
    for (const button of elements.bassGrid.querySelectorAll(".bass-step")) {
      const idx = Number(button.dataset.step);
      button.classList.toggle("is-current", idx === normalized);
    }
  }
  if (elements.harmonyGrid) {
    for (const button of elements.harmonyGrid.querySelectorAll(".harmony-step")) {
      const idx = Number(button.dataset.step);
      button.classList.toggle("is-current", idx === normalized);
    }
  }
  if (elements.chimeGrid) {
    for (const button of elements.chimeGrid.querySelectorAll(".chime-step")) {
      const idx = Number(button.dataset.step);
      button.classList.toggle("is-current", idx === normalized);
    }
  }
  if (elements.chantGrid) {
    for (const button of elements.chantGrid.querySelectorAll(".chant-step")) {
      const idx = Number(button.dataset.step);
      button.classList.toggle("is-current", idx === normalized);
    }
  }

  const heard = heardHarmony && normalized >= 0
    ? heardHarmony
    : { pass: currentHarmonicPass, spine: currentConductedSpine, melody: currentConductedMelody, bass: currentBass };
  if (elements.harmonicStep) {
    elements.harmonicStep.textContent = normalized < 0 ? "-- / 12 · -/4" : `${String(normalized + 1).padStart(2, "0")} / 12 · ${heard.pass + 1}/4`;
  }
  if (heard.spine && heard.spine[normalized]) {
    const chord = heard.spine[normalized];
    if (elements.harmonicChord) {
      elements.harmonicChord.textContent = chordLabelFor(chord, currentScore ? currentScore.root : 60);
    }
    if (elements.harmonicVector) {
      elements.harmonicVector.textContent = chord.op || "—";
    }
    if (elements.harmonicEuler) {
      if (chord.quality === "raw") {
        elements.harmonicEuler.textContent = "RAW VM";
      } else {
        const melOffset = heard.melody ? heard.melody[normalized] : 0;
        const bassOffset = heard.bass?.steps?.[normalized]?.interval ?? 0;
        const g = semitoneGradus(melOffset - bassOffset);
        const flavor = g <= 5 ? "Sweet" : g <= 8 ? "Balanced" : "Dissonant";
        elements.harmonicEuler.textContent = `G = ${g} (${flavor})`;
      }
    }
    const regionIdx = heard.pass;
    const compassNodes = [elements.compassReg0, elements.compassReg1, elements.compassReg2, elements.compassReg3];
    compassNodes.forEach((node, idx) => {
      if (node) node.classList.toggle("is-active", idx === regionIdx);
    });
  }

  if (normalized >= 0 && elements.funMachineTelemetry) {
    if (audibleCasioSection !== null && audibleCasioPerformance) {
      const stepInfo = audibleCasioPerformance.steps[normalized];
      const keyLabel = FUN_KEY_MAP[audibleCasioKey]?.note ?? audibleCasioKey;
      elements.funMachineTelemetry.textContent = `[${keyLabel}] · CASIO ${audibleCasioSection.toUpperCase()} · STEP @${String(normalized + 1).padStart(2, "0")} · ${chordText(stepInfo.chord)} · THE BAND FOLLOWS`;
    } else if (activeHeldFunKey !== null && activeFunPerformance) {
      const stepInfo = activeFunPerformance.steps[normalized];
      elements.funMachineTelemetry.textContent = `${funKeyLabel(activeHeldFunKey)} · ${STYLE_LABELS[activeFunPerformance.style]} · STEP @${String(normalized + 1).padStart(2, "0")} · ${chordText(stepInfo.chord)} · THE BAND FOLLOWS`;
    }
  }
  updateAllPlateInspectors(normalized >= 0 ? normalized : 0);
}

// --- Under the Parlor Glass: Interactive Esoteric VM Step Inspector (P5-34) -

const inspectorOpen = {
  beat: false,
  bass: false,
  harmony: false,
  chime: false,
  chant: false,
};

function plateCurrentState(id) {
  switch (id) {
    case "beat": return currentBeat;
    case "bass": return currentBass;
    case "harmony": return currentHarmony;
    case "chime": return currentChimes;
    case "chant": return currentChant;
    default: return null;
  }
}

function updatePlateInspector(id, stepIndex = activeBeatStep >= 0 ? activeBeatStep : 0) {
  if (!inspectorOpen[id]) return;
  const info = inspectPlateStep(id, plateCurrentState(id), stepIndex);
  const headlineEl = document.querySelector(`#${id}-inspector-headline`);
  const registersEl = document.querySelector(`#${id}-inspector-registers`);
  const detailEl = document.querySelector(`#${id}-inspector-detail`);
  if (headlineEl) headlineEl.textContent = info.headline;
  if (registersEl) registersEl.textContent = info.registers;
  if (detailEl) detailEl.textContent = info.detail;
}

function updateAllPlateInspectors(stepIndex = activeBeatStep >= 0 ? activeBeatStep : 0) {
  for (const id of INSPECTOR_PLATE_IDS) {
    updatePlateInspector(id, stepIndex);
  }
}

for (const id of INSPECTOR_PLATE_IDS) {
  const toggleBtn = document.querySelector(`#${id}-inspect-toggle`);
  const panelEl = document.querySelector(`#${id}-inspector`);
  toggleBtn?.addEventListener("click", () => {
    const nextOpen = !inspectorOpen[id];
    inspectorOpen[id] = nextOpen;
    toggleBtn.setAttribute("aria-expanded", String(nextOpen));
    toggleBtn.innerHTML = nextOpen
      ? 'HIDE VM <span aria-hidden="true">⌕</span>'
      : 'INSPECT VM <span aria-hidden="true">⌕</span>';
    if (panelEl) panelEl.hidden = !nextOpen;
    if (nextOpen) updatePlateInspector(id);
  });
}

// --- Plate state shared by cell edits, mutations, and sessions (P5-20) -----

// Clicks per cell since the plate was last composed. Cells cycle independently,
// so these counts (not the click order) are enough to rebuild a plate.
const plateCellCycles = {
  beat: Array(12).fill(0),
  bass: Array(12).fill(0),
  harmony: Array(12).fill(0),
  chime: Array(12).fill(0),
  chant: Array(12).fill(0),
};

const PLATE_CELL_CYCLERS = Object.freeze({
  beat: (step) => cycleBeatStep(step),
  bass: (step) => cycleBassCell(step, melodyFor(currentScore)),
  harmony: (step) => cycleHarmonyCell(step, currentScore),
  chime: (step) => cycleChimeCell(step),
  chant: (step) => cycleChantCell(step, currentScore),
});

function plateRaw(id) {
  switch (id) {
    case "beat": return rawBeat || currentBeat;
    case "bass": return rawBass || currentBass;
    case "harmony": return rawHarmony || currentHarmony;
    case "chime": return rawChimes || currentChimes;
    case "chant": return rawChant || currentChant;
    default: return null;
  }
}

function setPlateRaw(id, value) {
  switch (id) {
    case "beat": rawBeat = value; break;
    case "bass": rawBass = value; break;
    case "harmony": rawHarmony = value; break;
    case "chime": rawChimes = value; break;
    case "chant": rawChant = value; break;
    default: break;
  }
}

function applyCellCycle(id, index, times = 1) {
  const base = plateRaw(id);
  if (!base || times <= 0) return;
  const nextSteps = [...base.steps];
  for (let n = 0; n < times; n += 1) nextSteps[index] = PLATE_CELL_CYCLERS[id](nextSteps[index]);
  setPlateRaw(id, Object.freeze({ ...base, steps: Object.freeze(nextSteps) }));
}

function cyclePlateCell(id, index) {
  applyCellCycle(id, index);
  plateCellCycles[id][index] += 1;
  recordHistoryAction(`Cycle ${id} Cell ${index + 1}`);
}

function plateMutation(id) {
  return { beat: beatMutation, bass: bassMutation, harmony: harmonyMutation, chime: chimeMutation, chant: chantMutation }[id];
}

// Recomposes a plate from its VM at the current mutation count, discarding cell
// edits, and refreshes its telemetry line.
function recomposePlate(id) {
  if (!currentScore) return;
  plateCellCycles[id] = Array(activeGridSteps).fill(0);
  if (id === "beat") {
    if (beatSource) {
      rawBeat = composeBeat(beatSource, currentScore, beatMutation, activeGridSteps);
      currentBeat = rawBeat;
      if (elements.beatTelemetry && beatMutation > 0) {
        elements.beatTelemetry.textContent = `3¹⁰ TAPE · ${currentBeat.stepsExecuted} OPS · MUTATION #${beatMutation}`;
      }
    }
    currentBoneBeat = composeBoneBeat(currentScore, activeGridSteps, beatMutation);
  } else if (id === "bass" && bassSource) {
    rawBass = composeBass(bassSource, currentScore, bassMutation, activeGridSteps);
    currentBass = rawBass;
    if (elements.bassTelemetry && bassMutation > 0) {
      elements.bassTelemetry.textContent = `256-CELL TAPE · ${currentBass.stepsExecuted} OPS · SHIFT #${bassMutation}`;
    }
  } else if (id === "harmony" && harmonySource) {
    rawHarmony = composeHarmony(harmonySource, currentScore, harmonyMutation, activeGridSteps);
    currentHarmony = rawHarmony;
    if (elements.harmonyTelemetry && harmonyMutation > 0) {
      elements.harmonyTelemetry.textContent = `2D TORUS · ${currentHarmony.stepsExecuted} OPS · DEFLECTION #${harmonyMutation}`;
    }
  } else if (id === "chime" && pietSource && fractranSource) {
    rawChimes = composeChimes(pietSource, fractranSource, currentScore, chimeMutation, activeGridSteps);
    currentChimes = rawChimes;
    if (elements.chimeTelemetry && chimeMutation > 0) {
      elements.chimeTelemetry.textContent = `${currentChimes.pietStepsExecuted} CODELS · ${currentChimes.fractranStepsExecuted} RATIOS · REFRACTION #${chimeMutation}`;
    }
  } else if (id === "chant" && chantSource) {
    rawChant = composeChant(chantSource, currentScore, chantMutation, activeGridSteps);
    currentChant = rawChant;
    if (elements.chantTelemetry && chantMutation > 0) {
      elements.chantTelemetry.textContent = `3 ACTS · ${currentChant.statementsExecuted} CUES · RECAST #${chantMutation}`;
    }
  }
}

function updateBeatGrid() {
  if (!elements.beatGrid) return;
  const steps = currentBeat?.steps || [];
  for (const button of elements.beatGrid.querySelectorAll(".beat-step")) {
    const idx = Number(button.dataset.step);
    const step = steps[idx] || { kick: 0, snare: 0, hat: 0, trits: "000" };
    const kickPip = button.querySelector(".pip-kick");
    const snarePip = button.querySelector(".pip-snare");
    const hatPip = button.querySelector(".pip-hat");
    const tritsEl = button.querySelector(".step-trits");
    if (kickPip) kickPip.dataset.level = String(step.kick);
    if (snarePip) snarePip.dataset.level = String(step.snare);
    if (hatPip) hatPip.dataset.level = String(step.hat);
    if (tritsEl) tritsEl.textContent = step.trits;
    button.setAttribute(
      "aria-label",
      `Step ${idx + 1}: ternary ${step.trits}, kick ${step.kick}, snare ${step.snare}, chime ${step.hat}`,
    );
  }
}

function renderBeatGrid() {
  if (!elements.beatGrid) return;
  elements.beatGrid.classList.toggle("is-16-steps", activeGridSteps === 16);
  elements.beatGrid.innerHTML = "";
  for (let index = 0; index < activeGridSteps; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beat-step";
    button.dataset.step = String(index);
    button.innerHTML = `
      <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="step-pips" aria-hidden="true">
        <span class="voice-pip pip-kick" data-level="0"></span>
        <span class="voice-pip pip-snare" data-level="0"></span>
        <span class="voice-pip pip-hat" data-level="0"></span>
      </span>
      <span class="step-trits">000</span>
    `;
    button.addEventListener("click", () => {
      if (!currentBeat) return;
      cyclePlateCell("beat", index);
      applyEnsembleConductor();
      updateBeatGrid();
      updatePlateInspector("beat", index);
      if (audioContext && currentTransport && currentScore && !muted) {
        scheduleBeatStep(audioContext, currentTransport, currentScore, index, audioContext.currentTime + 0.01, 0.18);
      }
    });
    elements.beatGrid.append(button);
  }
}

function updateBassGrid() {
  if (!elements.bassGrid) return;
  const steps = currentBass?.steps || [];
  for (const button of elements.bassGrid.querySelectorAll(".bass-step")) {
    const idx = Number(button.dataset.step);
    const step = steps[idx] || { cell: 0, gate: 0, register: 0, slide: 0, accent: 0, label: "---" };
    const gatePip = button.querySelector(".pip-gate");
    const regPip = button.querySelector(".pip-reg");
    const slidePip = button.querySelector(".pip-slide");
    const labelEl = button.querySelector(".step-trits");
    const byteEl = button.querySelector(".cell-byte");
    button.dataset.gate = String(step.gate);
    button.dataset.accent = String(step.accent);
    if (gatePip) gatePip.dataset.level = String(step.gate);
    if (regPip) regPip.dataset.level = String(step.register ? 2 : 0);
    if (slidePip) slidePip.dataset.level = String(step.slide ? 2 : (step.accent ? 1 : 0));
    if (labelEl) labelEl.textContent = step.label;
    if (byteEl) byteEl.textContent = `[${String(step.cell).padStart(3, "0")}]`;
    button.setAttribute(
      "aria-label",
      `Tape cell ${idx}: ${step.label}, byte ${step.cell}`,
    );
  }
}

function renderBassGrid() {
  if (!elements.bassGrid) return;
  elements.bassGrid.classList.toggle("is-16-steps", activeGridSteps === 16);
  elements.bassGrid.innerHTML = "";
  for (let index = 0; index < activeGridSteps; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beat-step bass-step";
    button.dataset.step = String(index);
    button.innerHTML = `
      <span class="step-index">@${String(index).padStart(2, "0")}</span>
      <span class="step-pips" aria-hidden="true">
        <span class="voice-pip pip-gate" data-level="0"></span>
        <span class="voice-pip pip-reg" data-level="0"></span>
        <span class="voice-pip pip-hat pip-slide" data-level="0"></span>
      </span>
      <span class="step-trits">---</span>
      <span class="cell-byte">[000]</span>
    `;
    button.addEventListener("click", () => {
      if (!currentBass || !currentScore) return;
      cyclePlateCell("bass", index);
      applyEnsembleConductor();
      updatePlateInspector("bass", index);
      if (audioContext && currentTransport && !muted) {
        scheduleBassStep(audioContext, currentTransport, currentScore, index, audioContext.currentTime + 0.01, 0.24);
      }
    });
    elements.bassGrid.append(button);
  }
}

function updateHarmonyGrid() {
  if (!elements.harmonyGrid) return;
  const steps = currentHarmony?.steps || [];
  for (const button of elements.harmonyGrid.querySelectorAll(".harmony-step")) {
    const idx = Number(button.dataset.step);
    const step = steps[idx] || { raw: 0, gate: 0, mirror: "/", label: "REST" };
    const idxEl = button.querySelector(".step-index");
    const rootPip = button.querySelector(".pip-root");
    const thirdPip = button.querySelector(".pip-third");
    const fifthPip = button.querySelector(".pip-fifth");
    const labelEl = button.querySelector(".step-trits");
    const byteEl = button.querySelector(".cell-byte");
    button.dataset.gate = String(step.gate);
    if (idxEl) idxEl.textContent = `${String(idx + 1).padStart(2, "0")}${step.mirror}`;
    if (rootPip) rootPip.dataset.level = String(step.gate);
    if (thirdPip) thirdPip.dataset.level = String(step.gate > 0 ? (step.mirror === "/" ? 2 : 1) : 0);
    if (fifthPip) fifthPip.dataset.level = String(step.gate === 2 ? 2 : (step.gate === 1 ? 1 : 0));
    if (labelEl) labelEl.textContent = step.label;
    if (byteEl) byteEl.textContent = `#${String(step.raw).padStart(3, "0")}`;
    button.setAttribute(
      "aria-label",
      `Mirror node ${idx + 1} (${step.mirror}): ${step.label}, stack ${step.raw}`,
    );
  }
}

function renderHarmonyGrid() {
  if (!elements.harmonyGrid) return;
  elements.harmonyGrid.classList.toggle("is-16-steps", activeGridSteps === 16);
  elements.harmonyGrid.innerHTML = "";
  for (let index = 0; index < activeGridSteps; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beat-step harmony-step";
    button.dataset.step = String(index);
    button.innerHTML = `
      <span class="step-index">${String(index + 1).padStart(2, "0")}/</span>
      <span class="step-pips" aria-hidden="true">
        <span class="voice-pip pip-root" data-level="0"></span>
        <span class="voice-pip pip-third" data-level="0"></span>
        <span class="voice-pip pip-hat pip-fifth" data-level="0"></span>
      </span>
      <span class="step-trits">REST</span>
      <span class="cell-byte">#000</span>
    `;
    button.addEventListener("click", () => {
      if (!currentHarmony || !currentScore) return;
      cyclePlateCell("harmony", index);
      applyEnsembleConductor();
      updatePlateInspector("harmony", index);
      if (audioContext && currentTransport && !muted) {
        scheduleHarmonyStep(audioContext, currentTransport, currentScore, index, audioContext.currentTime + 0.01, 0.28);
      }
    });
    elements.harmonyGrid.append(button);
  }
}

const CODEL_SWATCHES = Object.freeze([
  ["#f38c8c", "#f3e28c", "#98eb98", "#8cebf3", "#98a9f3", "#eb98f3"],
  ["#cf4848", "#cfb83e", "#46b858", "#3eb8cf", "#4d66cf", "#b846cf"],
  ["#7d2222", "#7d6b1a", "#216e2d", "#1c6e7d", "#26367d", "#6e217d"],
]);

function updateChimeGrid() {
  if (!elements.chimeGrid) return;
  const steps = currentChimes?.steps || [];
  for (const button of elements.chimeGrid.querySelectorAll(".chime-step")) {
    const idx = Number(button.dataset.step);
    const step = steps[idx] || {
      gate: 0,
      codelCode: "LC",
      hueIndex: 3,
      lightnessIndex: 0,
      fraction: "35/6",
      exponents: { e2: 1, e3: 1, e5: 0, e7: 0 },
      label: "REST",
    };
    const idxEl = button.querySelector(".step-index");
    const p2Pip = button.querySelector(".pip-p2");
    const p3Pip = button.querySelector(".pip-p3");
    const p57Pip = button.querySelector(".pip-p57");
    const labelEl = button.querySelector(".step-trits");
    const byteEl = button.querySelector(".cell-byte");
    button.dataset.gate = String(step.gate);
    const swatch = CODEL_SWATCHES[step.lightnessIndex % 3]?.[step.hueIndex % 6] || "#8cebf3";
    button.style.setProperty("--codel-color", swatch);
    if (idxEl) idxEl.textContent = `${String(idx + 1).padStart(2, "0")}·${step.codelCode}`;
    if (p2Pip) p2Pip.dataset.level = String(step.gate === 0 ? 0 : Math.min(2, step.exponents.e2));
    if (p3Pip) p3Pip.dataset.level = String(step.gate === 0 ? 0 : Math.min(2, step.exponents.e3));
    if (p57Pip) p57Pip.dataset.level = String(step.gate === 0 ? 0 : Math.min(2, step.exponents.e5 + step.exponents.e7));
    if (labelEl) labelEl.textContent = step.label;
    if (byteEl) byteEl.textContent = step.fraction;
    button.setAttribute(
      "aria-label",
      `Codel ${idx + 1} (${step.codelCode}): ratio ${step.label}, fraction ${step.fraction}`,
    );
  }
}

function renderChimeGrid() {
  if (!elements.chimeGrid) return;
  elements.chimeGrid.classList.toggle("is-16-steps", activeGridSteps === 16);
  elements.chimeGrid.innerHTML = "";
  for (let index = 0; index < activeGridSteps; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beat-step chime-step";
    button.dataset.step = String(index);
    button.innerHTML = `
      <span class="step-index">${String(index + 1).padStart(2, "0")}·LC</span>
      <span class="step-pips" aria-hidden="true">
        <span class="voice-pip pip-p2" data-level="0"></span>
        <span class="voice-pip pip-p3" data-level="0"></span>
        <span class="voice-pip pip-hat pip-p57" data-level="0"></span>
      </span>
      <span class="step-trits">1/1 LC</span>
      <span class="cell-byte">35/6</span>
    `;
    button.addEventListener("click", () => {
      if (!currentChimes || !currentScore) return;
      cyclePlateCell("chime", index);
      applyEnsembleConductor();
      updatePlateInspector("chime", index);
      if (audioContext && currentTransport && !muted) {
        scheduleChimeStep(audioContext, currentTransport, currentScore, index, audioContext.currentTime + 0.01, 0.3);
      }
    });
    elements.chimeGrid.append(button);
  }
}

function updateChantGrid() {
  if (!elements.chantGrid) return;
  const steps = currentChant?.steps || [];
  for (const button of elements.chantGrid.querySelectorAll(".chant-step")) {
    const idx = Number(button.dataset.step);
    const step = steps[idx] || {
      gate: 0,
      scene: `SCENE ${idx + 1}`,
      personaShort: "HAM",
      vowelIpa: "/ɑ/",
      f1: 730,
      f2: 1090,
      label: "SILENT",
    };
    const idxEl = button.querySelector(".step-index");
    const f1Pip = button.querySelector(".pip-f1");
    const f2Pip = button.querySelector(".pip-f2");
    const f3Pip = button.querySelector(".pip-f3");
    const labelEl = button.querySelector(".step-trits");
    const byteEl = button.querySelector(".cell-byte");
    button.dataset.gate = String(step.gate);
    if (idxEl) idxEl.textContent = step.scene.replace("SCENE ", "SC·");
    if (f1Pip) f1Pip.dataset.level = String(step.gate === 0 ? 0 : (step.f1 > 500 ? 2 : 1));
    if (f2Pip) f2Pip.dataset.level = String(step.gate === 0 ? 0 : (step.f2 > 1500 ? 2 : 1));
    if (f3Pip) f3Pip.dataset.level = String(step.gate === 2 ? 2 : (step.gate === 1 ? 1 : 0));
    if (labelEl) labelEl.textContent = step.label;
    if (byteEl) byteEl.textContent = step.vowelIpa;
    button.setAttribute(
      "aria-label",
      `${step.scene} (${step.personaShort}): ${step.label} ${step.vowelIpa}`,
    );
  }
}

function renderChantGrid() {
  if (!elements.chantGrid) return;
  elements.chantGrid.classList.toggle("is-16-steps", activeGridSteps === 16);
  elements.chantGrid.innerHTML = "";
  for (let index = 0; index < activeGridSteps; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beat-step chant-step";
    button.dataset.step = String(index);
    button.innerHTML = `
      <span class="step-index">SC·${index + 1}</span>
      <span class="step-pips" aria-hidden="true">
        <span class="voice-pip pip-f1" data-level="0"></span>
        <span class="voice-pip pip-f2" data-level="0"></span>
        <span class="voice-pip pip-hat pip-f3" data-level="0"></span>
      </span>
      <span class="step-trits">HAM·AH</span>
      <span class="cell-byte">/ɑ/</span>
    `;
    button.addEventListener("click", () => {
      if (!currentChant || !currentScore) return;
      cyclePlateCell("chant", index);
      applyEnsembleConductor();
      updatePlateInspector("chant", index);
      if (audioContext && currentTransport && !muted) {
        scheduleChantStep(audioContext, currentTransport, currentScore, index, audioContext.currentTime + 0.01, 0.32);
      }
    });
    elements.chantGrid.append(button);
  }
}

function updateBandstandStatus() {
  if (!elements.bandstandStatus) return;
  const players = ["lead", ...ACCOMPANIMENT_CHANNEL_IDS];
  const activeCount = players.filter(channelEngaged).length;
  if (activeCount === 6) {
    elements.bandstandStatus.textContent = "ALL SIX ESOTERIC PLAYERS ENGAGED";
  } else if (activeCount === 1 && channelEngaged("lead")) {
    elements.bandstandStatus.textContent = "SOLO LOLCODE BANDLEADER · ACCOMPANIMENT SILENCED";
  } else {
    elements.bandstandStatus.textContent = `${activeCount} OF 6 ESOTERIC PLAYERS ENGAGED`;
  }
}

let funMachineOctave = 0; // -2..+2, default 0

const OCTAVE_REGISTERS = Object.freeze({
  "-2": "OCT −2 · REG C1–C3",
  "-1": "OCT −1 · REG C2–C4",
  "0":  "OCT 0 · REG C3–C5",
  "1":  "OCT +1 · REG C4–C6",
  "2":  "OCT +2 · REG C5–C7",
});

function updateFunOctaveUI() {
  if (elements.funOctaveDisplay) {
    elements.funOctaveDisplay.textContent = OCTAVE_REGISTERS[String(funMachineOctave)] || `OCT ${funMachineOctave}`;
  }
  if (elements.funOctaveDown) {
    elements.funOctaveDown.disabled = funMachineOctave <= -2;
  }
  if (elements.funOctaveUp) {
    elements.funOctaveUp.disabled = funMachineOctave >= 2;
  }
}

function setFunOctave(newOctave) {
  const clamped = Math.max(-2, Math.min(2, Math.trunc(newOctave) || 0));
  if (funMachineOctave === clamped) return;
  funMachineOctave = clamped;
  updateFunOctaveUI();
  if (elements.funMachineTelemetry) {
    elements.funMachineTelemetry.textContent = `OCTAVE ${funMachineOctave >= 0 ? "+" : ""}${funMachineOctave} · ${OCTAVE_REGISTERS[String(funMachineOctave)]}`;
  }
  if (activeHeldFunKey !== null) {
    const held = activeHeldFunKey;
    activeHeldFunKey = null;
    triggerFunKey(held, true);
  }
}

function updateFunKeyboardChordLabels() {
  // Key colours come from the Inform 7 rulebooks; the labels fill in once they load.
  if (!rulebooksInstalled()) return;
  for (let semitone = 0; semitone <= 24; semitone += 1) {
    const el = document.querySelector(`#fun-chord-${semitone}`);
    if (!el) continue;
    el.textContent = chordText(buildFunChord(semitone, "auto", activeGenre, currentScore ? currentScore.root : 0));
  }
}

const FUN_PAD_LEVEL = Object.freeze({
  swell: 1,
  arpeggio: 0.55,
  progression: 0.8,
  intro: 0.8,
  bridge: 0.8,
  outro: 0.8,
});

function loopStepDuration(score, step) {
  const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(score, activeGenre), activeGridSteps, barLock44);
  return stepUnitSeconds(activeTempoBpm || score.pulse, rhythm, barLock44, activeGridSteps) * rhythm[((step % rhythm.length) + rhythm.length) % rhythm.length];
}

function funKeyLabel(semitone) {
  const keyInfo = FUN_KEY_MAP[semitone];
  if (!keyInfo) return `KEY #${semitone}`;
  const shortcut = keyInfo.displayKey ? `[${keyInfo.displayKey}] ` : "";
  return `${shortcut}${keyInfo.note}`;
}

/**
 * A held key becomes a performance in the selected style. The band is
 * re-conducted onto its chords at once; with the loop running, a pad bridges
 * to the next region start, where the scheduler takes over in the band's
 * rhythm. With the loop stopped, the key auditions a sustained pad.
 */
async function triggerFunKey(semitone, isKeyDown = true) {
  // The accompanist plays genre colours, so the manual is silent until the rulebooks load.
  if (semitone === null || semitone === undefined || !rulebooksInstalled()) return;
  const normSemi = Math.max(0, Math.min(24, Math.trunc(semitone) || 0));
  const keyBtn = elements.funKeyboard?.querySelector(`.fun-key[data-semitone="${normSemi}"]`);

  if (!isKeyDown) {
    if (activeHeldFunKey !== normSemi) return;
    activeHeldFunKey = null;
    lastFunKeyReleaseTime = globalThis.performance ? globalThis.performance.now() : Date.now();
    keyBtn?.classList.remove("is-pressed");
    releaseFunPads(audioContext, 0.9);
    if (currentTransport) currentTransport.liveVoice = { voicing: currentTransport.liveVoice?.voicing ?? null, leadMidi: null };
    applyEnsembleConductor();
    if (elements.funMachineTelemetry) {
      elements.funMachineTelemetry.textContent = `${funKeyLabel(normSemi)} RELEASED · THE BAND RETURNS TO ITS OWN SCORE`;
    }
    return;
  }

  if (activeHeldFunKey === normSemi) return; // key repeat
  const changingKey = activeHeldFunKey !== null;
  activeHeldFunKey = normSemi;
  lastFunKeyReleaseTime = 0;
  for (const other of elements.funKeyboard?.querySelectorAll(".fun-key.is-pressed") || []) other.classList.remove("is-pressed");
  keyBtn?.classList.add("is-pressed");

  const performance = performanceOf(normSemi, funMachineStyle);
  activeFunPerformance = performance;
  unlockDrawer("held-key");

  if (currentTransport?.activeTakeLanding) {
    const audible = ((currentTransport.audibleStep % activeGridSteps) + activeGridSteps) % activeGridSteps;
    const liveSlot = makeSlot(normSemi, funMachineStyle, funVoiceId, funMachineOctave);
    const { loopIndex, layerIndex } = currentTransport.activeTakeLanding;
    song = setLoopSlot(song, loopIndex, layerIndex, audible, liveSlot);
    renderLooper();
  } else if (recorder.mode === "recording" && currentTransport) {
    const audible = ((currentTransport.audibleStep % activeGridSteps) + activeGridSteps) % activeGridSteps;
    // Downbeat anticipation grace: if audible step is the last step and take[0] is still empty, latch onto step 0
    const curStep = (audible === activeGridSteps - 1 && recorder.take && recorder.take[0] === null) ? 0 : audible;
    const liveSlot = makeSlot(normSemi, funMachineStyle, funVoiceId, funMachineOctave);
    recorder = recorderReduce(recorder, { type: "slot", step: curStep, slot: liveSlot }).recorder;
    renderLooper();
  } else if (recorder.mode === "armed") {
    // Downbeat anticipation latching during count-in
    const liveSlot = makeSlot(normSemi, funMachineStyle, funVoiceId, funMachineOctave);
    recorder = recorderReduce(recorder, { type: "anticipate", slot: liveSlot }).recorder;
    renderLooper();
  } else if (selectedStepIndex !== null) {
    // Step Sequencer: program the selected step
    const liveSlot = makeSlot(normSemi, funMachineStyle, funVoiceId, funMachineOctave);
    song = setLoopSlot(song, selectedLoop ?? 0, null, selectedStepIndex, liveSlot);
    if (selectedLoop === null) selectedLoop = 0;
    const noteName = FUN_KEY_MAP[normSemi]?.note ?? normSemi;
    if (isStepRecActive) {
      const advancedStep = (selectedStepIndex + 1) % activeGridSteps;
      announceLooper(`STEP ${selectedStepIndex + 1}: ${noteName} SET · ADVANCED TO STEP ${advancedStep + 1}`);
      selectedStepIndex = advancedStep;
    } else {
      announceLooper(`STEP ${selectedStepIndex + 1}: ${noteName} SET`);
    }
    renderLooper();
  }

  applyEnsembleConductor(performance.steps.map((step) => step.chord));

  if (elements.funMachineTelemetry) {
    elements.funMachineTelemetry.textContent = `${funKeyLabel(normSemi)} · ${STYLE_LABELS[performance.style]} · ${performance.summary} · THE BAND FOLLOWS`;
  }

  if (muted) return;
  const context = await ensureAudioContext();
  if (context.state === "suspended") {
    try {
      await context.resume();
    } catch {
      // Resume can fail before any user gesture; the next gesture retries.
    }
  }
  if (activeHeldFunKey !== normSemi) return; // released or changed while the context woke
  releaseFunPads(context, changingKey ? 0.25 : 0.4);

  const transport = currentTransport;
  const level = FUN_PAD_LEVEL[performance.style];
  if (transport?.funBus && currentScore) {
    const nextStep = transport.step;
    const nextIndex = nextStep % activeGridSteps;
    const stepsUntilRegion = performance.steps[nextIndex].isRegionStart ? 0 : strikeLength(performance, nextIndex);
    let regionStart = transport.nextNoteTime;
    for (let k = 0; k < stepsUntilRegion; k += 1) regionStart += loopStepDuration(currentScore, nextStep + k);
    const bridge = regionStart - context.currentTime;
    if (bridge > 0.12) {
      const currentAudibleIndex = Math.max(0, transport.audibleStep % activeGridSteps);
      const chord = performance.steps[currentAudibleIndex].chord;
      const voice = liveVoiceOf(transport);
      voice.voicing = padVoicing(chord, voice.voicing, performance.lift);
      schedulePadChord(context, transport.funBus, chord, context.currentTime, bridge + 0.05, { level, voicing: voice.voicing });
    }
  } else {
    const chord = performance.chords[0];
    schedulePadChord(context, getFunMachineDirectDestination(context), chord, context.currentTime, 30, { level, voicing: padVoicing(chord, null, performance.lift) });
  }
}

renderBeatGrid();
renderBassGrid();
renderHarmonyGrid();
renderChimeGrid();
renderChantGrid();
updateFunKeyboardChordLabels();

// Options shared by the live and offline graphs, read from the current session
// controls so an export captures exactly what the listener has dialed in.
function ensembleGraphOptions(context, { start, unit, fadeIn, stop = null, meters = false, rhythmIndex = undefined }) {
  let impulseBuffer = null;
  let crackleBuffer = null;
  try {
    impulseBuffer = ensureParlorImpulseResponse(context, 1.6);
  } catch {
    // The chamber stays silent if the impulse cannot be synthesized.
  }
  try {
    crackleBuffer = ensureWaxCrackleBuffer(context, 4.0);
  } catch {
    // The wax surface stays silent if its buffer cannot be synthesized.
  }
  return {
    start,
    stop,
    unit,
    fadeIn,
    rhythmIndex,
    outputGain: masterGainFor(masterVolume),
    channels: channelSettings(mixerState),
    meters,
    parlor: parlorSendLevels({
      enabled: parlorAcousticsEnabled,
      reverbEnabled: parlorReverbEnabled,
      crackleEnabled: parlorCrackleEnabled,
      level: parlorAcousticsLevel,
    }),
    impulseBuffer,
    crackleBuffer,
  };
}

// The INTERCAL arrangement in force, or null when the Raw Chaos rulebook
// unfetters the VMs (or the conductor score has not loaded).
function activeArrangement() {
  return rulebooksInstalled() && genreBook(activeGenre).unfettered ? null : currentArrangement;
}

function arrangementPlays(channel, step) {
  const mask = activeArrangement()?.channelMasks[((step % activeGridSteps) + activeGridSteps) % activeGridSteps];
  return !mask || mask[channel];
}

// Every voice that sounds on a loop step, for both the live scheduler and the
// offline render. Live-only behavior (held Fun Machine keys, punch-in) stays
// in the live scheduler. The INTERCAL 1972 dynamic arrangement mask controls
// channel breathing across Exposition, Antiphony, Tutti, and Breakdown.
function scheduleEnsembleStep(context, transport, score, step, at, stepDuration, soundingDuration) {
  const activeMuscaria = transport.muscariaModel || muscariaModel;
  if (activeMuscaria?.mode === "HALLUCINATING" && transport.delay && transport.filter) {
    try {
      const livePulse = activeTempoBpm || score.pulse;
      const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(score, activeGenre), activeGridSteps, barLock44);
      const unit = stepUnitSeconds(livePulse, rhythm, barLock44, activeGridSteps);
      const baseDelayTime = delayTimeFor(score, 60 / (unit * 2), effectiveRhythmIndex(score, activeGenre), unit);
      const modDelay = Math.max(0.02, Math.min(1.4, baseDelayTime + (activeMuscaria.delayModMs / 1000)));
      try {
        transport.delay.delayTime.setTargetAtTime(modDelay, at, 0.08);
      } catch {}
      if (transport.feedback) {
        const baseFeedback = 0.14 + (score.bloom || 0) / 650;
        const modFeedback = Math.min(0.68, baseFeedback + (activeMuscaria.feedbackSwell || 0));
        try {
          transport.feedback.gain.setTargetAtTime(modFeedback, at, 0.08);
        } catch {}
      }
      const creature = creatureFilter(score);
      const modCutoff = Math.max(120, Math.min(18000, creature.cutoff * activeMuscaria.filterModRatio));
      try {
        transport.filter.frequency.setTargetAtTime(modCutoff, at, 0.08);
      } catch {}
      if (transport.parlorReverbSend) {
        const baseReverb = parlorSendLevels({
          enabled: parlorAcousticsEnabled,
          reverbEnabled: parlorReverbEnabled,
          crackleEnabled: parlorCrackleEnabled,
          level: parlorAcousticsLevel,
        }).reverb;
        const modReverb = baseReverb * (activeMuscaria.reverbSwell || 1.0);
        try {
          transport.parlorReverbSend.gain.setTargetAtTime(modReverb, at, 0.08);
        } catch {}
      }
      if (transport.drones) {
        const warp = activeMuscaria.warpCents || 0;
        transport.drones.forEach((drone, idx) => {
          try {
            drone.detune.setTargetAtTime((DRONE_DETUNE[idx] || 0) + warp, at, 0.08);
          } catch {}
        });
      }
    } catch (error) {
      console.error("Muscaria hallucinatory modulation error:", error);
    }
  }

  const mask = activeArrangement()?.channelMasks[step % activeGridSteps];
  const bypassArrangement = !mask;

  if (bypassArrangement || mask.lead) {
    scheduleNote(context, transport, score, step, at, soundingDuration, {
      tripWarpCents: activeMuscaria?.mode === "HALLUCINATING" ? activeMuscaria.warpCents : 0,
    });
  }
  if (bypassArrangement || mask.beat) {
    scheduleBeatStep(context, transport, score, step, at, stepDuration);
  }
  if (bypassArrangement || mask.bass) {
    scheduleBassStep(context, transport, score, step, at, stepDuration);
  }
  if (bypassArrangement || mask.harmony) {
    scheduleHarmonyStep(context, transport, score, step, at, stepDuration);
  }
  if (bypassArrangement || mask.chime) {
    scheduleChimeStep(context, transport, score, step, at, stepDuration);
  }
  if (bypassArrangement || mask.chant) {
    scheduleChantStep(context, transport, score, step, at, stepDuration, {
      formantMultiplier: activeMuscaria?.mode === "HALLUCINATING" ? activeMuscaria.filterModRatio : 1.0,
    });
  }
  if (bypassArrangement || mask.fungal) {
    scheduleFungalBioStep(context, transport, score, step, at, stepDuration);
  }
  const anyAudible = MIXER_CHANNEL_IDS.some((id) => isChannelAudible(mixerState, id));
  if (transport.clockTicks ?? ((parlorAcousticsEnabled && parlorTickEnabled && anyAudible) || recorder.mode !== "idle")) {
    scheduleClockworkTick(context, transport.output, at, step, parlorAcousticsLevel, activeGridSteps);
  }
}

// Plays every recorded layer of a loop on one step: a pad when a held key
// begins (or a region starts), sustained while the same key is held within the
// region, plus that style's arpeggio or lead. Shared by the live loop and the
// offline song render, so an export carries exactly what the loop plays.
function playSongLayers(context, transport, score, absoluteStep, loop, timing) {
  const { stepIndex } = timing;
  transport.layerVoices ??= [];
  for (const { layerIndex, slot } of slotsAt(loop, stepIndex)) {
    const take = loop.layers[layerIndex];
    const previous = stepIndex > 0 ? take[stepIndex - 1] : null;
    const performance = performanceFor(slot);
    const starts = performance.steps[stepIndex].isRegionStart || !sameSlot(previous, slot);
    let padSteps = 0;
    if (starts) {
      do padSteps += 1;
      while (stepIndex + padSteps < activeGridSteps && !performance.steps[stepIndex + padSteps].isRegionStart && sameSlot(take[stepIndex + padSteps], slot));
    }
    transport.layerVoices[layerIndex] ??= { voicing: null, leadMidi: null };
    playPerformanceStep(context, transport, transport.layerVoices[layerIndex], performanceFor(slot), {
      ...timing,
      patch: voicePatch(slot.voice),
      padDuration: starts ? padStepsDuration(score, absoluteStep, padSteps) : null,
      releasable: false,
    });
  }
}

// Each region the tonic drones glide to the conducted chord's root, swell,
// and settle; they fade out while the arrangement rests the lead. They used
// to hold one note at one level for the whole loop (the "stuck note").
function shapeDrones(transport, score, absoluteStep, at) {
  if (!transport.droneEnvelopes) return;
  const stepIndex = absoluteStep % activeGridSteps;
  const prevStepIndex = (stepIndex + (activeGridSteps - 1)) % activeGridSteps;
  const chord = currentConductedSpine?.[stepIndex];
  const prevChord = currentConductedSpine?.[prevStepIndex];
  const isChordChange = chord !== prevChord;
  const isQuarter = absoluteStep % (activeGridSteps === 16 ? 4 : 3) === 0;
  if (!isChordChange && !isQuarter) return;

  const chordRoot = chord && chord.quality !== "raw" ? chord.root : 0;
  const frequencies = droneFrequencies(score, chordRoot);
  transport.drones.forEach((drone, index) => drone.frequency.setTargetAtTime(frequencies[index], at, 0.06));
  const resting = !arrangementPlays("lead", stepIndex);
  const region = padStepsDuration(score, absoluteStep, activeGridSteps === 16 ? 4 : 3);
  for (const envelope of transport.droneEnvelopes) {
    if (typeof envelope.gain.cancelAndHoldAtTime === "function") {
      envelope.gain.cancelAndHoldAtTime(at);
    } else {
      const cur = envelope.gain.value;
      envelope.gain.cancelScheduledValues(at);
      envelope.gain.setValueAtTime(cur, at);
    }
    if (resting) {
      envelope.gain.setTargetAtTime(0, at, 0.12);
    } else {
      envelope.gain.setTargetAtTime(DRONE_SWELL, at, 0.04);
      envelope.gain.setTargetAtTime(DRONE_SETTLE, at + 0.12, Math.max(0.05, region / 3));
    }
  }
}

function liveVoiceOf(transport) {
  transport.liveVoice ??= { voicing: null, leadMidi: null };
  return transport.liveVoice;
}

function sameSlot(a, b) {
  return Boolean(a && b && a.key === b.key && a.style === b.style && a.voice === b.voice);
}

function padStepsDuration(score, absoluteStep, steps) {
  let duration = 0;
  for (let k = 0; k < steps; k += 1) duration += loopStepDuration(score, absoluteStep + k);
  return duration;
}

/**
 * Plays one step of a performance on the band's grid: a pad when
 * `padDuration` is given, then the style's arpeggio pair or lead note. Shared by
 * the live key and every recorded layer; `voice` keeps that player's pad
 * voicing and lead glide.
 */
function playPerformanceStep(context, transport, voice, performance, { stepIndex, absoluteStep = stepIndex, at, stepDuration, soundingDuration, padDuration = null, releasable = true, patch = currentFunVoice() }) {
  const stepInfo = performance.steps[stepIndex];
  if (padDuration !== null) {
    voice.voicing = padVoicing(stepInfo.chord, voice.voicing, performance.lift);
    schedulePadChord(context, transport.funBus, stepInfo.chord, at, padDuration, {
      level: FUN_PAD_LEVEL[performance.style],
      voicing: voice.voicing,
      transport,
      releasable,
      voice: patch,
    });
  }
  if (performance.style === "arpeggio") {
    const half = stepDuration / 2;
    arpeggioNotes(stepInfo.chord, stepIndex, 2, performance.lift).forEach((midi, k) => {
      scheduleArpNote(context, transport.funBus, midi, at + k * half, half, {
        accent: stepInfo.isRegionStart && k === 0,
        pan: k === 0 ? -0.3 : 0.3,
        transport,
        voice: patch,
      });
    });
  } else if ((performance.style === "progression" || performance.style === "intro" || performance.style === "bridge" || performance.style === "outro") && stepInfo.leadPitch !== null) {
    const midi = leadMidi(stepInfo.leadPitch);
    // On the harmonic clock a lead note holds for its steps (D-044).
    const held = (stepInfo.leadSteps ?? 1) > 1 && currentScore ? padStepsDuration(currentScore, absoluteStep, stepInfo.leadSteps) : stepDuration;
    scheduleFunLeadNote(context, transport.funBus, midi, at, Math.max(soundingDuration, held * 0.92), {
      glideFrom: voice.leadMidi ?? null,
      transport,
      voice: patch,
    });
    voice.leadMidi = midi;
  }
}

async function playScore(score, { cursor = 0 } = {}) {
  stopCurrentSound();
  vision.setScore(score);
  if (muted) {
    elements.status.textContent = "OMEN MUTED";
    return;
  }

  const context = await ensureAudioContext();
  // A newer play, pause, or stop may have landed while the context resumed.
  if (muted || transportState.state !== TRANSPORT_STATES.PLAYING || currentScore !== score) return;
  stopCurrentSound();
  const now = context.currentTime + 0.045;
  const initialPulse = activeTempoBpm || score.pulse;
  const initialRhythm = effectiveRhythmTemplate(effectiveRhythmIndex(score, activeGenre), activeGridSteps, barLock44);
  const initialUnit = stepUnitSeconds(initialPulse, initialRhythm, barLock44, activeGridSteps);
  const graph = buildEnsembleGraph(context, score, ensembleGraphOptions(context, {
    start: now,
    unit: initialUnit,
    fadeIn: true,
    meters: true,
    rhythmIndex: effectiveRhythmIndex(score, activeGenre),
  }));
  const transport = {
    ...graph,
    melody: currentConductedMelody || melodyFor(score, activeGridSteps),
    timer: 0,
    timeouts: new Set(),
    activeTakeLanding: null,
    nextNoteTime: now,
    nextClockTime: now,
    step: cursor,
    // Last step that actually sounded; pause resumes after it, not after the
    // look-ahead window, so no scheduled-but-unheard steps are skipped.
    audibleStep: cursor - 1,
  };
  currentTransport = transport;
  updateThereminRouting();
  if (liveRecorder && liveRecorder.getState() !== LIVE_REC_STATES.IDLE) {
    attachLiveAudioTap();
  }

  const scheduleAhead = () => {
    if (currentTransport !== transport) return;
    updateAudioInteraction();
    const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(score, activeGenre), activeGridSteps, barLock44);
    while (transport.nextNoteTime < context.currentTime + 0.28) {
      if (casioOutroEnding) break;
      const livePulse = activeTempoBpm || score.pulse;
      const unit = stepUnitSeconds(livePulse, rhythm, barLock44, activeGridSteps);
      const currentStep = transport.step;
      const lengthMultiplier = rhythm[currentStep % rhythm.length];
      const stepDuration = unit * lengthMultiplier;
      const gateRatio = Math.min(0.94, score.gate / 100 + interaction.hold * 0.12);
      const soundingDuration = Math.max(0.06, stepDuration * gateRatio);
      // Fun Machine and loop machine (D-039): record what is held, let the band
      // follow a live key or else the newest recorded layer, then play the band,
      // the live accompanist, and every recorded layer on this step.
      const stepIndex = currentStep % activeGridSteps;
      const stepPass = Math.floor(currentStep / activeGridSteps);
      const at = transport.nextNoteTime;
      const liveSlot = activeHeldFunKey !== null && activeFunPerformance ? makeSlot(activeHeldFunKey, funMachineStyle, funVoiceId) : null;
      const position = songPosition(song, currentStep, activeGridSteps);
      const loop = position ? song.loops[position.loopIndex] : null;
      transport.songPosition = position;
      // The harmony moves on at the loop's downbeat (D-044).
      if (stepIndex === 0) enterHarmonicPass(transport, harmonicPassAt(currentStep));
      const CASIO_SECTION_PASSES = 4;
      if (stepIndex === 0 && pendingCasioSection !== null) {
        scheduledCasio = {
          role: pendingCasioSection.role,
          key: pendingCasioSection.key,
          startPass: stepPass,
          passes: CASIO_SECTION_PASSES,
          performance: null,
        };
        pendingCasioSection = null;
      }
      const casioSectionPass = scheduledCasio !== null ? stepPass - scheduledCasio.startPass : -1;
      const isCasioStep = scheduledCasio !== null && casioSectionPass >= 0 && casioSectionPass < scheduledCasio.passes;
      if (scheduledCasio !== null && casioSectionPass >= scheduledCasio.passes) {
        scheduledCasio = null;
      }
      if (stepIndex === 0 && isCasioStep) {
        scheduledCasio.performance = buildPerformance(
          scheduledCasio.key,
          scheduledCasio.role,
          activeGenre,
          currentScore ? currentScore.root : 0,
          { pass: casioSectionPass, score: currentScore, varied: genreVaried, stepsCount: activeGridSteps }
        );
      }
      const isLastCasioStep = isCasioStep && casioSectionPass === (scheduledCasio.passes - 1) && stepIndex === activeGridSteps - 1;
      const isLastSongOutroStep = !isCasioStep && position && position.role === "outro"
        && position.loopIndex === (song.loops.length - 1)
        && (position.repeat === (loop?.repeats ?? 1) - 1)
        && stepIndex === activeGridSteps - 1;
      if ((isLastCasioStep && scheduledCasio.role === "outro") || isLastSongOutroStep) {
        casioOutroEnding = true;
      }

      advanceRecorder(stepIndex, position, liveSlot);
      followSong(transport, loop, stepIndex, liveSlot);

      scheduleEnsembleStep(context, transport, score, currentStep, at, stepDuration, soundingDuration);
      shapeDrones(transport, score, currentStep, at);

      if (!arrangementPlays("fun", stepIndex)) {
        // The conductor score rests the player only if src/conductor.i stops
        // IGNOREing register :8; the canonical score never does.
      } else {
        const timing = { stepIndex, absoluteStep: currentStep, at, stepDuration, soundingDuration };
        if (isCasioStep) {
          const padDuration = scheduledCasio.performance.steps[stepIndex].isRegionStart
            ? padStepsDuration(score, currentStep, strikeLength(scheduledCasio.performance, stepIndex))
            : null;
          playPerformanceStep(context, transport, liveVoiceOf(transport), scheduledCasio.performance, { ...timing, padDuration });
        } else {
          if (liveSlot) {
            const padDuration = activeFunPerformance.steps[stepIndex].isRegionStart ? padStepsDuration(score, currentStep, strikeLength(activeFunPerformance, stepIndex)) : null;
            playPerformanceStep(context, transport, liveVoiceOf(transport), activeFunPerformance, { ...timing, padDuration });
          }
          const isRecordingNewLoop = recorder.mode === "recording" && recorder.kind === "new";
          if (loop && !isRecordingNewLoop) playSongLayers(context, transport, score, currentStep, loop, timing);
        }
      }
      const delayMs = Math.max(0, (transport.nextNoteTime - context.currentTime) * 1000);
      // The scheduler runs ahead and re-conducts at the next downbeat before
      // this step sounds, so the readout shows the harmony it was scheduled with.
      const scheduledHarmony = { pass: currentHarmonicPass, spine: currentConductedSpine, melody: currentConductedMelody, bass: currentBass };
      const stepCasioRole = isCasioStep ? scheduledCasio.role : null;
      const stepCasioKey = isCasioStep ? scheduledCasio.key : null;
      const stepCasioPerf = isCasioStep ? scheduledCasio.performance : null;
      const stepIsLast = isLastCasioStep;
      const stepIsLastSongOutro = isLastSongOutroStep;

      const stepTimerId = window.setTimeout(() => {
        transport.timeouts?.delete(stepTimerId);
        if (currentTransport !== transport) return;
        transport.audibleStep = currentStep;
        heardHarmony = scheduledHarmony;
        audibleCasioSection = stepCasioRole;
        audibleCasioKey = stepCasioKey;
        audibleCasioPerformance = stepCasioPerf;
        if (currentStep % activeGridSteps === activeGridSteps - 1) noteLoopHeard();
        if (currentStep % activeGridSteps === 0) {
          transport.audiblePosition = songPosition(song, currentStep, activeGridSteps);
          updateCasioUI();
          liveRecorder?.onDownbeat(context.currentTime, currentStep % activeGridSteps);
        }
        if ((stepIsLast && stepCasioRole !== null) || stepIsLastSongOutro) {
          audibleCasioSection = null;
          audibleCasioPerformance = null;
          if (stepCasioRole === "outro" || stepIsLastSongOutro) {
            const outroTimerId = window.setTimeout(() => {
              transport.timeouts?.delete(outroTimerId);
              if (currentTransport !== transport) return;
              casioOutroEnding = false;
              runTransportCommand("stop");
              updateCasioUI();
              announceLooper("OUTRO COMPLETE · OMEN RESTS");
            }, Math.round(stepDuration * 1000));
            transport.timeouts?.add(outroTimerId);
          } else {
            const sectionTimerId = window.setTimeout(() => {
              transport.timeouts?.delete(sectionTimerId);
              if (currentTransport !== transport) return;
              updateCasioUI();
              if (activeHeldFunKey === null) applyEnsembleConductor();
              announceLooper(`CASIO ${stepCasioRole.toUpperCase()} COMPLETE · RETURNED TO GROOVE`);
            }, Math.round(stepDuration * 1000));
            transport.timeouts?.add(sectionTimerId);
          }
        }
        if (transport.activeTakeLanding && activeHeldFunKey !== null && activeFunPerformance) {
          const heldSlot = makeSlot(activeHeldFunKey, funMachineStyle, funVoiceId);
          const { loopIndex, layerIndex } = transport.activeTakeLanding;
          song = setLoopSlot(song, loopIndex, layerIndex, currentStep % activeGridSteps, heldSlot);
        } else if (recorder.mode === "recording" && activeHeldFunKey !== null && activeFunPerformance) {
          const heldSlot = makeSlot(activeHeldFunKey, funMachineStyle, funVoiceId);
          recorder = recorderReduce(recorder, { type: "slot", step: currentStep % activeGridSteps, slot: heldSlot }).recorder;
        }
        if (transport.activeTakeLanding && currentStep % activeGridSteps === activeGridSteps - 1) {
          transport.activeTakeLanding = null;
        }
        renderLooper();
        highlightBeatStep(currentStep);
        updateTransportPosition(currentStep);
      }, delayMs);
      transport.timeouts?.add(stepTimerId);
      transport.nextNoteTime += stepDuration;
      if (midiClockMode === "master" && midiAccess && midiOutPortId !== "none") {
        const nowMs = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
        const clockWin = computeMasterClockWindow({
          nextClockTimeSec: transport.nextClockTime,
          windowEndSec: transport.nextNoteTime,
          bpm: livePulse,
          audioCurrentTimeSec: context.currentTime,
          nowMs,
        });
        transport.nextClockTime = clockWin.nextClockTimeSec;
        const clockBytes = makeClockTick();
        for (const tickMs of clockWin.tickTimestampsMs) {
          sendMidiMessage(midiAccess, midiOutPortId, clockBytes, tickMs);
        }
      }
      transport.step += 1;
    }
  };

  scheduleAhead();
  transport.timer = window.setInterval(scheduleAhead, 90);
  startMeters();
  elements.status.textContent = "OMEN LOOPING";
}

function updateTransportPosition(step) {
  const stopped = step === null || step < 0;
  if (elements.transportPosition) {
    elements.transportPosition.value = stopped ? `STEP -- / ${activeGridSteps}` : `STEP ${String((step % activeGridSteps) + 1).padStart(2, "0")} / ${activeGridSteps}`;
  }
  updateArrangementDisplay(stopped ? null : step);
}

// Shows where the INTERCAL conductor has the band: the section on the
// transport, and a TACET lamp on every console strip it rests this step.
function updateArrangementDisplay(step) {
  const arrangement = activeArrangement();
  const place = arrangement && step !== null && step >= 0 ? arrangementSectionAt(arrangement, step) : null;
  if (elements.transportSection) {
    elements.transportSection.value = !currentArrangement
      ? ""
      : !arrangement
        ? "INTERCAL · UNFETTERED"
        : place
          ? `${["I", "II", "III", "IV"][place.section.index]} · ${place.section.name}${place.isTurnaround ? " · COME FROM" : ""}`
          : "INTERCAL · 4 SECTIONS";
  }
  for (const { id } of MIXER_CHANNELS) {
    const refs = mixerStripElements[id];
    if (!refs) continue;
    const resting = Boolean(place && place.mask[id] === false);
    refs.strip.classList.toggle("is-tacet", resting);
  }
}

function syncTransportUI() {
  const { state } = transportState;
  const ready = Boolean(currentScore);
  elements.transportDeck?.setAttribute("data-state", state);
  // Buttons stay enabled while ready so a keyboard user never loses focus to a
  // control that disables itself; pressed state carries the transport state.
  for (const button of [elements.transportPlay, elements.transportPause, elements.transportStop, elements.transportLiveRec]) {
    if (button) button.disabled = !ready;
  }
  elements.transportPlay?.setAttribute("aria-pressed", String(state === TRANSPORT_STATES.PLAYING));
  elements.transportPause?.setAttribute("aria-pressed", String(state === TRANSPORT_STATES.PAUSED));
}

function updateLiveRecUI(state, telemetry) {
  if (elements.transportRecStatus) {
    elements.transportRecStatus.textContent = telemetry;
  }
  if (elements.transportLiveRec) {
    elements.transportLiveRec.classList.toggle("is-armed", state === LIVE_REC_STATES.ARMED_START);
    elements.transportLiveRec.classList.toggle("is-recording", state === LIVE_REC_STATES.RECORDING);
    elements.transportLiveRec.classList.toggle("is-stopping", state === LIVE_REC_STATES.ARMED_STOP);
    elements.transportLiveRec.setAttribute("aria-pressed", state !== LIVE_REC_STATES.IDLE ? "true" : "false");
  }
}

function attachLiveAudioTap() {
  if (!liveCaptureProcessor && audioContext && currentTransport?.output) {
    try {
      liveCaptureProcessor = audioContext.createScriptProcessor(4096, 2, 2);
      liveCaptureSilentGain = audioContext.createGain();
      liveCaptureSilentGain.gain.setValueAtTime(0, audioContext.currentTime);
      currentTransport.output.connect(liveCaptureProcessor);
      liveCaptureProcessor.connect(liveCaptureSilentGain).connect(audioContext.destination);
      liveCaptureProcessor.onaudioprocess = (event) => {
        const ch0 = event.inputBuffer.getChannelData(0);
        const ch1 = event.inputBuffer.getChannelData(1);
        liveRecorder?.processAudioBlock(ch0, ch1, audioContext.currentTime);
      };
      if (!currentTransport.noteLog) currentTransport.noteLog = [];
    } catch {
      // Non-fatal fallback
    }
  }
}

function detachLiveAudioTap() {
  if (liveCaptureProcessor) {
    try {
      currentTransport?.output?.disconnect(liveCaptureProcessor);
      liveCaptureProcessor.disconnect();
      liveCaptureSilentGain?.disconnect();
    } catch {}
    liveCaptureProcessor = null;
    liveCaptureSilentGain = null;
  }
}

function handleLiveTakeComplete(take) {
  detachLiveAudioTap();
  if (!take || take.frames === 0 || !currentScore) return;
  try {
    const bitDepth = elements.exportBitDepth?.value || "24";
    const wavBytes = buildLiveTakeWav(take, currentScore, { bitDepth });
    const format = elements.exportMidiFormat?.value || "clean";
    const midiBytes = buildLiveTakeMidi(take, currentScore, { format });
    lastLiveTake = { take, wavBytes, midiBytes };

    if (elements.exportLiveWav) elements.exportLiveWav.disabled = false;
    if (elements.exportLiveMidi) elements.exportLiveMidi.disabled = false;

    const key = keyLabelFor(currentScore.root, currentScore.scale);
    const wavName = exportFilename(currentScore, { bpm: take.bpm, keyAscii: key.ascii, suffix: "live-take", extension: "wav" });
    const midiName = exportFilename(currentScore, { bpm: take.bpm, keyAscii: key.ascii, suffix: "live-take", extension: "mid" });

    if (wavBytes) downloadBlob(new Blob([wavBytes], { type: "audio/wav" }), wavName);
    if (midiBytes) downloadBlob(new Blob([midiBytes], { type: "audio/midi" }), midiName);

    elements.status.textContent = `LIVE TAKE SAVED · ${take.bars} BARS (${take.duration.toFixed(1)}s) · WAV & MIDI`;
  } catch {
    elements.status.textContent = "LIVE RECORDING ENCODE FAILED";
  }
}

// The single path for starting, pausing, and stopping the loop. Audio runs only
// while the transport is playing and the bell is unmuted; muting leaves the
// transport state alone and freezes the cursor where the sound stopped.
async function runTransportCommand(command) {
  if (!currentScore) return;
  const fromMidiRealtime = Boolean(arguments[1]?.fromMidiRealtime);
  const prevState = transportState.state;
  const resumeStep = currentTransport ? currentTransport.audibleStep + 1 : transportState.cursor;
  const next = transportReduce(transportState, command, { cursor: resumeStep });
  if (next === transportState) return;
  transportState = next;
  syncTransportUI();
  if (!fromMidiRealtime && midiClockMode === "master" && midiAccess && midiOutPortId !== "none") {
    if (next.state === TRANSPORT_STATES.PLAYING) {
      const startBytes = command === "restart" || prevState === TRANSPORT_STATES.STOPPED ? makeMidiStart() : makeMidiContinue();
      sendMidiMessage(midiAccess, midiOutPortId, startBytes);
    } else if (prevState === TRANSPORT_STATES.PLAYING) {
      sendMidiMessage(midiAccess, midiOutPortId, makeMidiStop());
    }
  }
  updateMidiClockStatus();
  // A take needs an unbroken pass: stop, pause, and restart (and a new summon,
  // which restarts) abandon it. Playing on from a pause or an arm does not.
  if (command === "restart" || next.state !== TRANSPORT_STATES.PLAYING) {
    cancelRecording();
    casioOutroEnding = false;
    scheduledCasio = null;
    audibleCasioSection = null;
    audibleCasioKey = 0;
    audibleCasioPerformance = null;
    pendingCasioSection = null;
    updateCasioUI();
  }
  if (next.state === TRANSPORT_STATES.PLAYING) {
    await playScore(currentScore, { cursor: next.cursor });
    return;
  }
  stopCurrentSound();
  renderLooper();
  if (next.state === TRANSPORT_STATES.STOPPED) {
    highlightBeatStep(-1);
    updateTransportPosition(null);
    elements.status.textContent = "OMEN STOPPED · REWOUND";
  } else {
    // The position readout holds the last step heard; resume plays the one after.
    elements.status.textContent = `OMEN PAUSED · ${elements.transportPosition?.value || "STEP -- / 12"}`;
  }
}

let currentConductedMelody = null;

// The Kapellmeister menu lists the genres of src/rulebooks.ni in source
// order; nothing about a genre is written into the page itself.
function buildGenreMenu() {
  const menu = elements.kapellmeisterGenre;
  if (!menu) return;
  // THE CREATURE'S OWN comes first: the rulebook each creature writes for
  // itself (D-043); the genres follow in source order.
  const own = document.createElement("option");
  own.value = CREATURE_GENRE;
  own.textContent = "THE CREATURE'S OWN";
  own.title = "A rulebook this creature writes from its own scale";
  // Genres group into their rulebook families (D-041), in source order of
  // each family's first genre; a genre with no family stands on its own.
  const groups = new Map();
  const entries = [own];
  for (const code of genreCodes()) {
    const book = genreBook(code);
    const option = document.createElement("option");
    option.value = code;
    option.textContent = book.title;
    option.title = book.motto;
    if (!book.family) {
      entries.push(option);
      continue;
    }
    if (!groups.has(book.family)) {
      const group = document.createElement("optgroup");
      group.label = book.family;
      groups.set(book.family, group);
      entries.push(group);
    }
    groups.get(book.family).append(option);
  }
  menu.replaceChildren(...entries);
  menu.value = activeGenre;
  menu.disabled = false;
}

function updateKapellmeisterUI() {
  if (!rulebooksInstalled()) return;
  const book = genreBook(activeGenre);
  // Before any creature is summoned there is no book of its own to show.
  const unwritten = activeGenre === CREATURE_GENRE && !currentScore;
  if (elements.kapellmeisterGenreTitle) elements.kapellmeisterGenreTitle.textContent = unwritten ? "THE CREATURE'S OWN RULEBOOK" : book.title;
  if (elements.kapellmeisterGenreMotto) {
    elements.kapellmeisterGenreMotto.textContent = unwritten ? "Summon a creature and it writes its own rulebook from its scale." : book.motto;
  }
  if (elements.kapellmeisterVariation) {
    const text = !genreVaried ? "VARIATION: AS WRITTEN (CREATURE MOVES BYPASSED)"
      : !book.variation?.length ? "VARIATION: THIS RULEBOOK PLAYS AS WRITTEN (NO MOVES PERMITTED)"
      : currentVariation.length ? `VARIATION: ${currentVariation.join(" · ")}`
      : "VARIATION: NONE FOR THIS CREATURE";
    elements.kapellmeisterVariation.textContent = text;
    elements.kapellmeisterVariation.title = text;
  }
  if (elements.kapellmeisterAsWritten) {
    elements.kapellmeisterAsWritten.setAttribute("aria-pressed", String(!genreVaried));
    elements.kapellmeisterAsWritten.classList.toggle("is-active", !genreVaried);
    elements.kapellmeisterAsWritten.textContent = !genreVaried ? "AS WRITTEN [ON]" : "AS WRITTEN [OFF]";
    elements.kapellmeisterAsWritten.title = !genreVaried
      ? "Playing strictly AS WRITTEN (canonical unvaried textbook changes). Click to re-enable creature variations."
      : "Creature variations ACTIVE. Click to bypass variations and play strictly AS WRITTEN.";
  }
  if (elements.kapellmeisterTelemetry) {
    const chord0 = currentConductedSpine?.[0];
    const tonicName = currentScore ? chordLabelFor(chord0, currentScore.root) : "C Maj";
    elements.kapellmeisterTelemetry.textContent = `RULEBOOK: ${book.name.toUpperCase()} · TONIC: ${tonicName} · STRICTNESS: G ≤ ${activeStrictness}`;
  }
  // The compass shows the whole harmonic cycle: one region per pass (D-044).
  const compassSpine = currentCycleSpine || currentConductedSpine;
  if (compassSpine) {
    const nodeIds = [elements.nodeText0, elements.nodeText1, elements.nodeText2, elements.nodeText3];
    const steps = [0, 3, 6, 9];
    steps.forEach((stepIdx, i) => {
      const el = nodeIds[i];
      if (el && compassSpine[stepIdx]) {
        el.textContent = compassSpine[stepIdx].op || "I";
      }
    });
  }
}

function applyEnsembleConductor() {
  if (!currentScore) return;
  let overrideProgression = arguments.length > 0 ? arguments[0] : null;
  if (arguments.length === 0) {
    if (activeHeldFunKey !== null) {
      activeFunPerformance = performanceOf(activeHeldFunKey, funMachineStyle);
      overrideProgression = activeFunPerformance.steps.map((step) => step.chord);
    } else if (scheduledCasio !== null) {
      const stepPass = currentTransport && typeof currentTransport.step === "number" ? Math.floor(currentTransport.step / activeGridSteps) : scheduledCasio.startPass;
      const casioPass = Math.max(0, Math.min(3, stepPass - scheduledCasio.startPass));
      scheduledCasio.performance = buildPerformance(
        scheduledCasio.key,
        scheduledCasio.role,
        activeGenre,
        currentScore.root,
        { pass: casioPass, score: currentScore, varied: genreVaried, stepsCount: activeGridSteps }
      );
      overrideProgression = scheduledCasio.performance.steps.map((step) => step.chord);
    } else if (currentTransport && song.loops.length > 0 && !(recorder.mode === "recording" && recorder.kind === "new")) {
      const curStep = currentTransport.audibleStep >= 0 ? currentTransport.audibleStep : currentTransport.step;
      const pos = songPosition(song, Math.max(0, curStep), activeGridSteps);
      const loop = pos ? song.loops[pos.loopIndex] : null;
      const lead = leadSlotAt(loop, pos ? pos.step : 0);
      if (lead) {
        overrideProgression = performanceFor(lead, null, pos).steps.map((step) => step.chord);
      }
    }
    if (currentTransport) currentTransport.followedSlot = null;
  }
  // A held key's chords are absolute; the conductor works above the tonic.
  // With no key held there is no custom spine at all, so Raw Esoteric Chaos
  // takes its unfettered path (P5-27). An empty array here used to be truthy
  // and quietly conducted the raw VMs anyway; fettered genres are unaffected.
  const spineToUse = overrideProgression
    ? overrideProgression.map((chord) => (chord ? toTonicRelative(chord, currentScore.root) : null))
    : null;
  const conducted = conductEnsemble({
    score: currentScore,
    melody: melodyFor(currentScore, activeGridSteps),
    beat: rawBeat || currentBeat,
    bass: rawBass || currentBass,
    harmony: rawHarmony || currentHarmony,
    chimes: rawChimes || currentChimes,
    chant: rawChant || currentChant,
    mutation: harmonyMutation + bassMutation + chimeMutation + chantMutation,
    genre: activeGenre,
    consonanceStrictness: activeStrictness,
    customSpine: spineToUse,
    // Each creature varies its genre by the moves the rulebook permits (D-043),
    // unless AS WRITTEN is pressed.
    varied: genreVaried,
    harmonicPass: currentHarmonicPass,
    stepsCount: activeGridSteps,
  });
  currentConductedSpine = conducted.spine;
  if (!spineToUse) currentCycleSpine = conducted.cycleSpine;
  currentVariation = conducted.variation;
  currentConductedMelody = conducted.melody;
  if (conducted.bass) currentBass = conducted.bass;
  if (conducted.harmony) currentHarmony = conducted.harmony;
  if (conducted.chimes) currentChimes = conducted.chimes;
  if (conducted.chant) currentChant = conducted.chant;
  if (currentTransport) {
    currentTransport.melody = currentConductedMelody;
  }
  updateKapellmeisterUI();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  highlightBeatStep(activeBeatStep);
}

function showScore(rawScore) {
  baseScore = rawScore;
  const score = applyScoreOverrides(baseScore, { rootOverride, scaleOverride });
  currentScore = score;
  interaction.temperament = currentScore.temperament || deriveTemperament(currentScore);
  // A new creature starts its harmonic cycle at home (D-044).
  currentHarmonicPass = 0;
  showCreatureVoice(score);
  // Each creature writes its own rulebook from its scale (D-043).
  if (rulebooksInstalled()) installCreatureBook(buildCreatureBook(score, compiledRulebooks()));
  if (!partLockState.beat) beatMutation = 0;
  if (!partLockState.bass) bassMutation = 0;
  if (!partLockState.harmony) harmonyMutation = 0;
  if (!partLockState.chime) chimeMutation = 0;
  if (!partLockState.chant) chantMutation = 0;
  for (const id of Object.keys(plateCellCycles)) {
    if (!partLockState[id]) plateCellCycles[id] = Array(activeGridSteps).fill(0);
  }
  if (beatSource) {
    rawBeat = composeBeat(beatSource, score, beatMutation, activeGridSteps);
    currentBeat = rawBeat;
    if (elements.beatName) elements.beatName.textContent = currentBeat.modeName;
    if (elements.beatTelemetry) {
      elements.beatTelemetry.textContent = `3¹⁰ TAPE · ${currentBeat.stepsExecuted} OPS · DENSITY ${score.beatDensity}%`;
    }
    if (elements.beatMutate) elements.beatMutate.disabled = false;
  } else if (elements.beatName) {
    elements.beatName.textContent = BEAT_NAMES[score.beatMode];
  }
  currentBoneBeat = composeBoneBeat(score, activeGridSteps, beatMutation);
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }
  if (bassSource) {
    rawBass = composeBass(bassSource, score, bassMutation, activeGridSteps);
    currentBass = rawBass;
    if (elements.bassName) elements.bassName.textContent = currentBass.modeName;
    if (elements.bassTelemetry) {
      elements.bassTelemetry.textContent = `256-CELL TAPE · ${currentBass.stepsExecuted} OPS · GLIDE ${score.bassGlide}%`;
    }
    if (elements.bassMutate) elements.bassMutate.disabled = false;
  } else if (elements.bassName) {
    elements.bassName.textContent = BASS_NAMES[score.bassMode];
  }
  if (harmonySource) {
    rawHarmony = composeHarmony(harmonySource, score, harmonyMutation, activeGridSteps);
    currentHarmony = rawHarmony;
    if (elements.harmonyName) elements.harmonyName.textContent = currentHarmony.modeName;
    if (elements.harmonyTelemetry) {
      elements.harmonyTelemetry.textContent = `2D TORUS · ${currentHarmony.stepsExecuted} OPS · ${currentHarmony.mirrorsHit} MIRRORS`;
    }
    if (elements.harmonyMutate) elements.harmonyMutate.disabled = false;
  } else if (elements.harmonyName) {
    elements.harmonyName.textContent = HARMONY_NAMES[score.harmonyMode];
  }
  if (pietSource && fractranSource) {
    rawChimes = composeChimes(pietSource, fractranSource, score, chimeMutation, activeGridSteps);
    currentChimes = rawChimes;
    if (elements.chimeName) elements.chimeName.textContent = currentChimes.modeName;
    if (elements.chimeTelemetry) {
      elements.chimeTelemetry.textContent = `${currentChimes.pietStepsExecuted} CODELS · ${currentChimes.fractranStepsExecuted} FRACTRAN RATIOS · SHIMMER ${score.chimeShimmer}%`;
    }
    if (elements.chimeMutate) elements.chimeMutate.disabled = false;
  } else if (elements.chimeName) {
    elements.chimeName.textContent = CHIME_NAMES[score.chimeMode];
  }
  if (chantSource) {
    rawChant = composeChant(chantSource, score, chantMutation, activeGridSteps);
    currentChant = rawChant;
    if (elements.chantName) elements.chantName.textContent = currentChant.modeName;
    if (elements.chantTelemetry) {
      elements.chantTelemetry.textContent = `3 ACTS · ${currentChant.statementsExecuted} CUES · FORMANT ${score.chantFormant}%`;
    }
    if (elements.chantMutate) elements.chantMutate.disabled = false;
  } else if (elements.chantName) {
    elements.chantName.textContent = CHANT_NAMES[score.chantMode];
  }
  if (conductorSource) {
    currentArrangement = composeArrangement(conductorSource, score, activeGridSteps);
  }
  sporeHarpModel.strings = buildHyphalStrings(score, { referencePitch: referencePitch() });
  interaction.sporeHarpModel = sporeHarpModel;
  if (elements.sporeHarpTelemetry) {
    elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
  }
  interaction.muscariaModel = muscariaModel;
  updateMuscariaUI();
  updateArrangementDisplay(currentTransport?.audibleStep ?? null);
  applyEnsembleConductor();
  renderLooper();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
  if (elements.bandstandMutateAll) elements.bandstandMutateAll.disabled = false;
  updateBandstandStatus();
  elements.name.textContent = score.name;
  if (elements.stageBellJar) elements.stageBellJar.textContent = score.bellJar;
  if (elements.folioReadout) {
    elements.folioReadout.textContent = score.temperament?.name
      ? `${score.folioId} · ${score.curiosaClass} · ${score.temperament.name}`
      : `${score.folioId} · ${score.curiosaClass}`;
  }
  setTempoBpm(musicalPocketBpm(score.pulse));
  elements.wave.textContent = WAVEFORMS[score.wave];
  elements.formValue.textContent = score.shapeName;
  elements.melody.textContent = MELODY_NAMES[score.melodyMode];
  if (elements.fungal) elements.fungal.textContent = score.fungalName;
  elements.replay.disabled = false;
  if (elements.callingSlipHint) {
    if (callingSlipFlavorPin && pinnedFlavorScore) {
      elements.callingSlipHint.textContent = `FLAVOR PINNED: "${pinnedFlavorScore.name}" · NOTES TWEAK WITH EACH INPUT`;
    } else if (score.isVariation) {
      elements.callingSlipHint.textContent = `OPUS VARIATION: ${score.opusLabel} · SAME COLOR & FLAVOR, ALTERNATE MELODY`;
    } else {
      elements.callingSlipHint.textContent = 'IDENTICAL WORDS SUMMON THE IDENTICAL SPECIMEN · USE "# 2" FOR OPUS VARIATIONS.';
    }
  }
  syncTransportUI();
  syncSessionButtons();
  syncHerbariumButtons();
  renderHerbarium();
  syncPartLockUI();
  if (elements.shareLink) elements.shareLink.disabled = false;
  if (elements.exportPng) elements.exportPng.disabled = false;
  if (elements.exportWav) elements.exportWav.disabled = false;
  if (elements.exportStems) elements.exportStems.disabled = false;
  if (elements.exportMidi) elements.exportMidi.disabled = false;
  try {
    const nextHash = encodeOmenHash(score.phrase);
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  } catch {
    // Non-standard history environments continue without mutating location.
  }
}

async function summon(phrase, { playAudio = true } = {}) {
  if (!oracleSource) {
    elements.status.textContent = "SPELL UNAVAILABLE";
    return;
  }

  try {
    let candidateScore;
    if (callingSlipFlavorPin && pinnedFlavorScore) {
      candidateScore = deriveScoreVariation(pinnedFlavorScore, phrase, phrase);
    } else {
      candidateScore = composeScore(oracleSource, phrase);
    }
    const lockCounts = countActiveLocks(partLockState);
    const score = (currentScore && lockCounts.isAnyLocked)
      ? buildChimeraScore(currentScore, candidateScore, partLockState)
      : candidateScore;

    if (currentScore && song.loops.length) {
      // Loops follow the key the band will actually play, overrides included (P8-04).
      song = transposeSectionLoops(song, currentScore.root, applyScoreOverrides(score, { rootOverride, scaleOverride }).root);
    }
    showScore(score);
    if (playAudio) {
      await runTransportCommand("restart");
    } else {
      stopCurrentSound();
      transportState = createTransportState();
      syncTransportUI();
      highlightBeatStep(-1);
      updateTransportPosition(null);
      elements.status.textContent = "OMEN RESTORED FROM LINK · PRESS SUMMON OR REPLAY FOR SOUND";
    }
    if (score.chimera?.isChimera) {
      elements.status.textContent = `CHIMERA SUMMONED: ${score.name}`;
    } else if (score.isVariation) {
      elements.status.textContent = `VARIATION SUMMONED: ${score.name}`;
    }
    if (!historyState.present) {
      historyState = initHistory(historyState, captureSession(), `Summon: ${score.name}`);
    } else if (!isHistoryRestoring) {
      recordHistoryAction(`Summon: ${score.name}`);
    }
    syncHistoryUI();
  } catch (error) {
    elements.status.textContent = "THE ORACLE COUGHED";
    console.error(error);
  }
}

function renderSpecimenBroadsheetCanvas(score) {
  return renderBroadsheetCanvas(score, {
    sourceCanvas: elements.canvas,
    currentBeat,
    currentBass,
    currentHarmony,
    currentChimes,
    currentChant,
  });
}

async function copyShareLink() {
  if (!currentScore) return;
  const shareUrl = buildShareUrl(window.location.href, currentScore.phrase);
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      copied = true;
    } catch {
      copied = false;
    }
  }
  if (!copied) {
    const helper = document.createElement("textarea");
    helper.value = shareUrl;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    helper.remove();
  }
  elements.status.textContent = copied ? "OMEN LINK COPIED TO CLIPBOARD" : "OMEN LINK SEALED IN ADDRESS BAR";
  if (elements.shareLink) {
    const original = elements.shareLink.innerHTML;
    elements.shareLink.textContent = copied ? "LINK COPIED ✦" : "LINK IN URL BAR ✦";
    window.setTimeout(() => {
      if (elements.shareLink) elements.shareLink.innerHTML = original;
    }, 1800);
  }
}

function exportSpecimenPng() {
  if (!currentScore) return;
  const plate = renderSpecimenBroadsheetCanvas(currentScore);
  const filename = specimenFilenameFor(currentScore);
  const triggerDownload = (href, revokeAfter = false) => {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    if (revokeAfter) {
      window.setTimeout(() => URL.revokeObjectURL(href), 1500);
    }
    elements.status.textContent = "SPECIMEN PLATE ENGRAVED (PNG)";
  };

  if (typeof plate.toBlob === "function") {
    plate.toBlob((blob) => {
      if (blob) {
        triggerDownload(URL.createObjectURL(blob), true);
      } else {
        triggerDownload(plate.toDataURL("image/png"));
      }
    }, "image/png");
  } else {
    triggerDownload(plate.toDataURL("image/png"));
  }
}

// --- Offline exports: WAV mix, stem bundle, MIDI score (P3-03, P5-21) ------

const LOOP_START_OFFSET = 0.04;
const LOOP_TAIL_SECONDS = 1.35; // Natural decay of delay repeats and resonant reverbs
const STEM_FILES = Object.freeze([
  ["lead", "01-lead", "LEAD · LOLCODE melody and drones"],
  ["fun", "02-manual", "MANUAL · Fun Machine sequenced chords"],
  ["beat", "03-pulse", "PULSE · Malbolge percussion"],
  ["forge", "04-forge", "FORGE · Bone Forge & Crucible beat machine"],
  ["bass", "05-bass", "BASS · Brainfuck walking bass"],
  ["harmony", "06-organ", "ORGAN · Befunge chord organ"],
  ["chime", "07-chimes", "CHIMES · Piet/FRACTRAN bells and pads"],
  ["chant", "08-choir", "CHOIR · Shakespeare formant voices"],
  ["fungal", "09-mycelium", "MYCELIUM · bio-acoustic sonification"],
  ["harp", "10-harp", "HARP · BioParasite Spore Harp"],
]);

function offlineAudioConstructor() {
  return window.OfflineAudioContext || window.webkitOfflineAudioContext || null;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Disables an export button while `task` runs, then restores its label.
async function runExport(button, { idleHtml, busyText, doneText, failStatus }, task) {
  if (!offlineAudioConstructor()) {
    elements.status.textContent = "OFFLINE AUDIO NOT SUPPORTED";
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = busyText;
  }
  try {
    await task();
    if (button) {
      button.textContent = doneText;
      window.setTimeout(() => {
        button.disabled = false;
        button.innerHTML = idleHtml;
      }, 1800);
    }
  } catch (error) {
    console.error(error);
    elements.status.textContent = failStatus;
    if (button) {
      button.disabled = false;
      button.innerHTML = idleHtml;
    }
  }
}

/**
 * Renders one 12-step loop offline through the shared graph. Options override
 * the live console: `channels` and `parlor` replace strip and room levels,
 * `clockTicks` forces the escapement on or off, `engageAll` renders muted
 * plates, and `captureNotes` records every pitched event for MIDI. With
 * `render: false` the loop is only scheduled, which is all MIDI capture needs.
 */
async function renderEnsembleLoop(score, {
  channels,
  parlor,
  clockTicks,
  engageAll = false,
  captureNotes = false,
  render = true,
  sampleRate = 44100,
  loopMode = "oneshot",
  masterDynamics = true,
} = {}) {
  const OfflineAudioCtx = offlineAudioConstructor();
  const bpm = activeTempoBpm || score.pulse;
  const rhythmIndex = effectiveRhythmIndex(score, activeGenre);
  const rhythm = effectiveRhythmTemplate(rhythmIndex, activeGridSteps, barLock44);
  const unit = stepUnitSeconds(bpm, rhythm, barLock44, activeGridSteps);
  // With a loop-machine song the render is the whole song (D-039), at most
  // MAX_SONG_PASSES passes; without one it is the whole harmonic cycle, four
  // loops, so the file holds the full progression and still loops (D-044).
  const passes = songPasses(song) || HARMONIC_PASSES;
  const livePass = currentHarmonicPass;
  const stepsCount = activeGridSteps * passes;
  let loopDuration = 0;
  for (let step = 0; step < stepsCount; step += 1) {
    loopDuration += unit * rhythm[step % rhythm.length];
  }
  const totalDuration = LOOP_START_OFFSET + loopDuration + LOOP_TAIL_SECONDS;
  const offlineCtx = new OfflineAudioCtx(2, Math.ceil(totalDuration * sampleRate), sampleRate);
  // A loop-perfect export folds the tail back onto the start (D-076), so the
  // continuous sources (drones, wax crackle) stop at the loop end; otherwise
  // they would sound twice over the first second of the folded file.
  const sustainStop = loopMode === "loop" ? LOOP_START_OFFSET + loopDuration : totalDuration;
  const options = ensembleGraphOptions(offlineCtx, { start: 0, stop: sustainStop, unit, fadeIn: false, rhythmIndex });
  options.masterDynamics = masterDynamics;
  if (channels) options.channels = channels;
  if (parlor) options.parlor = parlor;
  const graph = buildEnsembleGraph(offlineCtx, score, options);
  const offlineTransport = {
    ...graph,
    isOffline: true,
    boneBeatModel: createBoneBeatModel(boneBeatModel),
    sporeHarpModel: createSporeHarpModel(sporeHarpModel),
    muscariaModel: createMuscariaModel(muscariaModel),
    melody: currentConductedMelody || melodyFor(score, activeGridSteps),
    engageAll,
    clockTicks,
    noteLog: captureNotes ? [] : undefined,
  };

  let stepTime = LOOP_START_OFFSET;
  const stepStarts = [];
  // The chord the band plays on each step, for the MIDI file's chord markers.
  const stepChords = [];
  for (let step = 0; step < stepsCount; step += 1) {
    stepStarts.push(stepTime - LOOP_START_OFFSET);
    const stepDuration = unit * rhythm[step % rhythm.length];
    const gateRatio = Math.min(0.94, score.gate / 100);
    const soundingDuration = Math.max(0.06, stepDuration * gateRatio);
    const position = songPosition(song, step, activeGridSteps);
    const loop = position ? song.loops[position.loopIndex] : null;
    offlineTransport.songPosition = position;
    // Each loop boundary moves the band to its pass of the harmonic cycle.
    if (step % activeGridSteps === 0 && harmonicPassAt(step) !== currentHarmonicPass) {
      currentHarmonicPass = harmonicPassAt(step);
      offlineTransport.followedSlot = "harmonic-pass";
      if (!song.loops.length) applyEnsembleConductor();
    }
    if (song.loops.length) followSong(offlineTransport, loop, step % activeGridSteps, null);
    offlineTransport.melody = currentConductedMelody || offlineTransport.melody;
    stepChords.push(currentConductedSpine?.[step % activeGridSteps] ?? null);
    scheduleEnsembleStep(offlineCtx, offlineTransport, score, step, stepTime, stepDuration, soundingDuration);
    shapeDrones(offlineTransport, score, step, stepTime);
    if (loop && arrangementPlays("fun", step % activeGridSteps)) {
      playSongLayers(offlineCtx, offlineTransport, score, step, loop, { stepIndex: step % activeGridSteps, absoluteStep: step, at: stepTime, stepDuration, soundingDuration });
    }
    stepTime += stepDuration;
  }
  // Walking the harmonic cycle and following the song re-conducted the shared
  // band state; hand it back to the live loop (its pass, a held key, or the
  // band's own score) before rendering.
  currentHarmonicPass = livePass;
  restoreLiveConducting();

  const buffer = render ? await offlineCtx.startRendering() : null;
  return {
    buffer,
    noteLog: offlineTransport.noteLog || [],
    bpm,
    loopDuration,
    stepStarts,
    stepChords,
    passes,
    sampleRate,
    loopStartFrame: Math.round(LOOP_START_OFFSET * sampleRate),
    loopFrames: Math.round(loopDuration * sampleRate),
  };
}

function restoreLiveConducting() {
  if (activeHeldFunKey !== null && activeFunPerformance) applyEnsembleConductor(activeFunPerformance.steps.map((step) => step.chord));
  else applyEnsembleConductor();
  if (currentTransport) currentTransport.followedSlot = activeHeldFunKey !== null ? "live" : null;
}

function currentExportSettings() {
  return normalizeExportSettings({
    bitDepth: elements.exportBitDepth?.value,
    sampleRate: elements.exportSampleRate?.value,
    loopMode: elements.exportLoopMode?.value,
    stemMode: elements.exportStemMode?.value,
  });
}

function bufferChannels(buffer) {
  return Array.from({ length: buffer.numberOfChannels }, (_, channel) => buffer.getChannelData(channel));
}

// Every WAV the export desk writes carries the same studio metadata (D-076).
function encodeExportWav(channels, score, settings, render, { title, oneShot }) {
  const key = keyLabelFor(score.root, score.scale);
  const frames = channels[0]?.length ?? 0;
  return encodeWav(channels, settings.sampleRate, {
    bitDepth: settings.bitDepth,
    seed: score.seed,
    loop: oneShot ? null : { start: 0, end: frames },
    acid: { bpm: render.bpm, beats: beatsIn(render.loopDuration, render.bpm), rootNote: key.rootNote, oneShot },
    info: {
      name: title,
      software: `The Whimsy Machine ${APP_VERSION} (engine ${ENGINE_VERSION})`,
      comment: `${score.name} - seed 0x${(score.seed >>> 0).toString(16).padStart(8, "0")} - ${render.bpm} BPM - ${key.display} - A4 ${referencePitch()} Hz`,
      keywords: `${render.bpm} bpm; ${key.display}; whimsy machine`,
    },
  });
}

function exportFormatLine(settings) {
  const depth = settings.bitDepth === "32f" ? "32-bit float" : `${settings.bitDepth}-bit PCM${settings.bitDepth === "16" ? " (TPDF dither)" : ""}`;
  return `${depth} WAV, ${(settings.sampleRate / 1000).toFixed(1)} kHz stereo`;
}

async function exportSpecimenWav() {
  if (!currentScore) return;
  const score = currentScore;
  const settings = currentExportSettings();
  elements.status.textContent = "RECORDING WAV LOOP...";
  await runExport(elements.exportWav, {
    idleHtml: 'RECORD WAV LOOP <span aria-hidden="true">☊</span>',
    busyText: "RECORDING... ✦",
    doneText: "WAV RECORDED ✦",
    failStatus: "WAV EXPORT FAILED",
  }, async () => {
    const render = await renderEnsembleLoop(score, { sampleRate: settings.sampleRate, loopMode: settings.loopMode });
    const channels = cutRender(bufferChannels(render.buffer), { start: render.loopStartFrame, length: render.loopFrames, mode: settings.loopMode });
    const { gain } = applyPeakCeiling([channels]);
    const key = keyLabelFor(score.root, score.scale);
    const oneShot = settings.loopMode === "oneshot";
    const bytes = encodeExportWav(channels, score, settings, render, { title: `${score.name} - ${key.display}`, oneShot });
    downloadBlob(new Blob([bytes], { type: "audio/wav" }), exportFilename(score, { bpm: render.bpm, keyAscii: key.ascii, suffix: oneShot ? "oneshot" : "loop" }));
    const trim = gain < 1 ? ` · TRIMMED ${(20 * Math.log10(gain)).toFixed(1)} dB` : "";
    elements.status.textContent = `SPECIMEN AUDIO RECORDED · ${settings.bitDepth === "32f" ? "32F" : settings.bitDepth}-BIT ${settings.sampleRate / 1000} kHz · ${oneShot ? "ONE-SHOT" : "LOOP-PERFECT"}${trim}`;
  });
}

// Nine stems: each console channel rendered alone at its fader and pan (mute
// and solo ignored), plus the parlor room's crackle and clockwork on their
// own. All stems share one start (beat one at sample zero) and one length.
// DRY stems skip the chamber reverb and the master compressor, so they sum to
// the dry mix; PRINTED stems keep the room reverb and the compressor (D-076).
async function exportSpecimenStems() {
  if (!currentScore) return;
  const score = currentScore;
  const settings = currentExportSettings();
  const dry = settings.stemMode === "dry";
  await runExport(elements.exportStems, {
    idleHtml: 'EXPORT 9 STEMS (ZIP) <span aria-hidden="true">⧉</span>',
    busyText: "RENDERING STEMS... ✦",
    doneText: "STEMS EXPORTED ✦",
    failStatus: "STEM EXPORT FAILED",
  }, async () => {
    const room = parlorSendLevels({
      enabled: parlorAcousticsEnabled,
      reverbEnabled: parlorReverbEnabled,
      crackleEnabled: parlorCrackleEnabled,
      level: parlorAcousticsLevel,
    });
    const common = { sampleRate: settings.sampleRate, loopMode: settings.loopMode, masterDynamics: !dry };
    const cut = (render) => cutRender(bufferChannels(render.buffer), { start: render.loopStartFrame, length: render.loopFrames, mode: settings.loopMode });
    const stems = [];
    let render = null;
    for (const [index, [id, file]] of STEM_FILES.entries()) {
      elements.status.textContent = `RENDERING STEM ${index + 1}/${STEM_FILES.length + 1} · ${file.slice(3).toUpperCase()}`;
      render = await renderEnsembleLoop(score, {
        ...common,
        channels: stemSettings(mixerState, id),
        parlor: { reverb: dry ? SILENT_GAIN : room.reverb, crackle: SILENT_GAIN },
        clockTicks: false,
        engageAll: true,
      });
      stems.push({ file, channels: cut(render) });
    }
    elements.status.textContent = `RENDERING STEM ${STEM_FILES.length + 1}/${STEM_FILES.length + 1} · PARLOR ROOM`;
    const roomRender = await renderEnsembleLoop(score, { ...common, channels: silentSettings(mixerState), parlor: room });
    stems.push({ file: `${String(STEM_FILES.length + 1).padStart(2, "0")}-parlor-room`, channels: cut(roomRender) });
    const { gain } = applyPeakCeiling(stems.map((stem) => stem.channels));

    const key = keyLabelFor(score.root, score.scale);
    const oneShot = settings.loopMode === "oneshot";
    const stemName = (file) => exportFilename(score, { bpm: render.bpm, keyAscii: key.ascii, suffix: file });
    const entries = stems.map(({ file, channels }) => ({
      name: stemName(file),
      data: encodeExportWav(channels, score, settings, render, { title: `${score.name} - ${file.slice(3).toUpperCase()} - ${key.display}`, oneShot }),
    }));
    const seedHex = (score.seed >>> 0).toString(16).padStart(8, "0");
    const { bpm, loopDuration, stepStarts, passes } = render;
    entries.push({
      name: "README.txt",
      data: [
        "THE WHIMSY MACHINE · STEM BUNDLE",
        "",
        `Specimen: ${score.name}`,
        `Folio: ${score.folioId ?? "FOLIO I"} · ${score.curiosaClass ?? ""} · ${score.bellJar ?? "BELL JAR Nº 01"}`,
        `Seed: 0x${seedHex}`,
        `Engine: ${ENGINE_VERSION} (The Whimsy Machine ${APP_VERSION})`,
        `Key: ${key.display} · A4 = ${referencePitch()} Hz`,
        `Tempo: ${bpm} BPM · ${beatsIn(loopDuration, bpm)} beats · ${passes > 1 ? `a song of ${passes} passes (12 steps each)` : "one 12-step loop"} lasting ${loopDuration.toFixed(3)} s`,
        `Format: ${exportFormatLine(settings)}. Beat one is at sample 0 in every file.`,
        oneShot
          ? `Mode: ONE-SHOT · each file runs the loop once and keeps its ${LOOP_TAIL_SECONDS} s decay.`
          : "Mode: LOOP-PERFECT · each file is exactly one loop long; the decay past the loop end is folded back onto its start, so the files repeat seamlessly. smpl and acid chunks carry the loop, tempo, and root note.",
        dry
          ? "Stems: DRY · no chamber reverb and no master compressor, so the channel stems sum to the dry mix. Add your own room."
          : "Stems: PRINTED · each stem has its own chamber reverb and its own pass through the master compressor, so the stems sum close to, but not exactly to, the full mix.",
        gain < 1 ? `Level: every file was turned down ${(20 * Math.log10(gain)).toFixed(2)} dB together to keep peaks under ${PEAK_CEILING_DB} dBFS.` : `Level: peaks are under ${PEAK_CEILING_DB} dBFS; nothing was changed.`,
        "",
        ...stems.map(({ file }, index) => `${stemName(file)}  ${index < STEM_FILES.length ? STEM_FILES[index][2] : "PARLOR ROOM · wax-cylinder crackle and clockwork escapement"}`),
        "",
        ...arrangementReadme(stepStarts),
        "Each channel stem is rendered alone through the full chain at its console fader",
        "and pan, ignoring mute and solo.",
        "",
      ].join("\n"),
    });
    const zip = createStoredZip(entries);
    downloadBlob(new Blob([zip], { type: "application/zip" }), exportFilename(score, { bpm, keyAscii: key.ascii, suffix: "stems", extension: "zip" }));
    elements.status.textContent = `NINE ${dry ? "DRY" : "PRINTED"} STEMS EXPORTED (ZIP)`;
  });
}

// The INTERCAL sections (and the COME FROM turnaround) as timeline markers,
// seconds from the loop start. Empty when Raw Chaos unfetters the band.
// The INTERCAL sections (and the COME FROM turnaround) as timeline markers,
// seconds from the loop start, for every pass rendered. With a song, each
// marker names its loop (and repeat), and loops are marked even under Raw Chaos.
function arrangementMarkers(stepStarts) {
  const arrangement = activeArrangement();
  const passes = Math.floor(stepStarts.length / activeGridSteps);
  const markers = [];
  for (let pass = 0; pass < passes; pass += 1) {
    const base = pass * activeGridSteps;
    const position = songPosition(song, base, activeGridSteps);
    const repeats = position ? song.loops[position.loopIndex].repeats : 1;
    const roleTag = position?.role && position.role !== "main" ? ` [${position.role.toUpperCase()}]` : "";
    const loopLabel = position ? `LOOP ${position.loopIndex + 1}${roleTag}${repeats > 1 ? ` (${position.repeat + 1}/${repeats})` : ""}` : null;
    const prefix = loopLabel ? `${loopLabel} · ` : "";
    if (!arrangement) {
      if (loopLabel) markers.push({ at: stepStarts[base], text: loopLabel });
      continue;
    }
    for (const section of arrangement.sections) {
      markers.push({ at: stepStarts[base + section.steps[0]], text: `${prefix}${["I", "II", "III", "IV"][section.index]} · ${section.name}` });
    }
    markers.push({ at: stepStarts[base + arrangement.turnaroundStep], text: `${prefix}COME FROM (60) · TURNAROUND` });
  }
  return markers.sort((x, y) => x.at - y.at);
}

// A marker wherever the band's chord changes (D-043, D-044), so a DAW shows
// the creature's own changes, variations included, on its timeline.
function chordMarkers(stepStarts, stepChords, score) {
  const markers = [];
  let previous = null;
  stepChords.forEach((chord, step) => {
    if (!chord) return;
    const text = `CHORD · ${chordLabelFor(chord, score.root)}${chord.op && chord.quality !== "raw" ? ` (${chord.op})` : ""}`;
    if (text !== previous) markers.push({ at: stepStarts[step], text });
    previous = text;
  });
  return markers;
}

function arrangementReadme(stepStarts) {
  const markers = arrangementMarkers(stepStarts);
  if (!markers.length) return ["Arrangement: RAW CHAOS · every voice plays every step.", ""];
  const what = song.loops.length ? "Song and arrangement (loop machine and INTERCAL conductor, seconds after the song begins):" : "Arrangement (INTERCAL conductor, seconds after the loop begins):";
  return [what, ...markers.map(({ at, text }) => `  ${at.toFixed(3).padStart(7)} s  ${text}`), ""];
}

// A Type 1 MIDI file of every pitched part in the loop, captured from the same
// schedulers that make the sound. Muted plates are included.
async function exportSpecimenMidi() {
  if (!currentScore) return;
  const score = currentScore;
  elements.status.textContent = "TRANSCRIBING MIDI SCORE...";
  await runExport(elements.exportMidi, {
    idleHtml: 'WRITE MIDI SCORE <span aria-hidden="true">♪</span>',
    busyText: "TRANSCRIBING... ✦",
    doneText: "MIDI WRITTEN ✦",
    failStatus: "MIDI EXPORT FAILED",
  }, async () => {
    const { noteLog, bpm, loopDuration, stepStarts, stepChords } = await renderEnsembleLoop(score, { engageAll: true, captureNotes: true, render: false });
    // The MANUAL part splits into one track per voice it was played in.
    const parts = MIDI_TRACKS.flatMap((track) => {
      const events = noteLog.filter((event) => event.channel === track.id);
      return track.id === "fun" ? funVoiceTracks(track, events) : [{ ...track, events }];
    });
    const tracks = parts.map(({ events, ...track }) => {
      const velocities = velocitiesFor(events.map((event) => event.peak));
      return {
        ...track,
        notes: events.map((event, index) => ({
          tick: ticksForSeconds(event.at - LOOP_START_OFFSET, bpm),
          duration: Math.max(1, ticksForSeconds(event.duration, bpm)),
          midi: event.midi,
          velocity: velocities[index],
        })),
      };
    });
    const format = elements.exportMidiFormat?.value || "clean";
    const stripPrograms = format !== "full";
    const stripMarkers = format === "clean";
    const flattenChannels = format === "clean";

    const markers = [...arrangementMarkers(stepStarts), ...chordMarkers(stepStarts, stepChords, score)]
      .sort((x, y) => x.at - y.at)
      .map(({ at, text }) => ({ tick: ticksForSeconds(at, bpm), text }));
    const bytes = buildMidiFile({
      bpm,
      tracks,
      lengthTicks: ticksForSeconds(loopDuration, bpm),
      title: score.name,
      stripPrograms,
      stripMarkers,
      flattenChannels,
      rootMidi: score.root,
      scaleIndex: score.scale,
      markers });
    const key = keyLabelFor(score.root, score.scale);
    downloadBlob(new Blob([bytes], { type: "audio/midi" }), exportFilename(score, { bpm, keyAscii: key.ascii, extension: "mid" }));
    elements.status.textContent = `MIDI SCORE WRITTEN · ${noteLog.length} NOTES (${format.toUpperCase()})`;
  });
}

function updateMidiClockStatus(extra = null) {
  if (!elements.midiClockStatus) return;
  if (midiClockMode === "slave") {
    const state = midiClockSlave.getState();
    const bpmText = state.bpm ? `${state.bpm} BPM` : "WAITING 0xF8";
    elements.midiClockStatus.value = extra || `SLAVE · ${bpmText} · STEP ${String(state.stepIndex + 1).padStart(2, "0")}/12`;
  } else if (midiClockMode === "master") {
    const running = transportState.state === TRANSPORT_STATES.PLAYING;
    elements.midiClockStatus.value = extra || `MASTER 24 PPQ · ${activeTempoBpm} BPM · ${running ? "TX 0xF8" : "IDLE"}`;
  } else {
    elements.midiClockStatus.value = extra || "CLOCK: INTERNAL";
  }
}

// ---------------------------------------------------------------------------
// Web MIDI Learn & Controller CC Mapping (P12-02, D-104)
// ---------------------------------------------------------------------------

let midiLearnState = loadMidiMapFromStorage(window.localStorage);

function sendMidiFeedback(targetId, domainValue, options = {}) {
  if (options.fromMidi) return;
  if (!midiLearnState || !midiLearnState.feedbackEnabled) return;
  if (!midiAccess || !midiOutPortId || midiOutPortId === "none") return;
  const msg = computeOutboundCC(midiLearnState, targetId, domainValue);
  if (!msg) return;
  const bytes = makeControlChange(msg.channel, msg.controller, msg.value);
  sendMidiMessage(midiAccess, midiOutPortId, bytes);
}

function setCreatureFilterCutoff(cutoffPercent, options = {}) {
  const pct = Math.max(0, Math.min(100, Number(cutoffPercent) || 0));
  if (audioContext && currentTransport && currentTransport.ensembleFilter) {
    const now = audioContext.currentTime;
    const freq = 120 * Math.pow(16000 / 120, pct / 100);
    currentTransport.ensembleFilter.frequency.setTargetAtTime(freq, now, 0.025);
  }
  if (!options.fromMidi) {
    sendMidiFeedback("master:filterCutoff", pct);
  }
}

function applyResolvedMidiTarget(targetId, domainValue, options = {}) {
  const def = TARGET_DEFINITIONS[targetId];
  if (!def) return;

  if (targetId.startsWith("fader:")) {
    const ch = def.channel;
    updateMixer(setFader(mixerState, ch, domainValue), options);
    recordHistoryAction(`Fader: ${ch}`, { immediate: false });
    return;
  }

  if (targetId.startsWith("mute:")) {
    const ch = def.channel;
    if (domainValue) {
      updateMixer(toggleMute(mixerState, ch), options);
      recordHistoryAction(`Mute: ${ch}`);
    }
    return;
  }

  if (targetId === "master:volume") {
    setMasterVolume(domainValue, options);
    if (elements.volume) elements.volume.value = String(Math.round(masterVolume));
    recordHistoryAction(`Master Volume: ${Math.round(masterVolume)}%`, { immediate: false });
    return;
  }

  if (targetId === "master:tempo") {
    setTempoBpm(domainValue, options);
    recordHistoryAction(`Tempo: ${activeTempoBpm} BPM`, { immediate: false });
    return;
  }

  if (targetId === "master:filterCutoff") {
    setCreatureFilterCutoff(domainValue, options);
    recordHistoryAction("Filter Cutoff", { immediate: false });
    return;
  }

  if (targetId === "master:strictness") {
    activeStrictness = domainValue;
    if (elements.kapellmeisterStrictness) {
      elements.kapellmeisterStrictness.value = String(activeStrictness);
    }
    applyEnsembleConductor();
    if (!options.fromMidi) sendMidiFeedback("master:strictness", activeStrictness);
    recordHistoryAction(`Strictness: ${activeStrictness}`, { immediate: false });
    return;
  }

  // Somatic targets
  if (targetId === "somatic:bone_beat_toggle") {
    if (domainValue) updateMixer(toggleMute(mixerState, "forge"), options);
    return;
  }
  if (targetId === "somatic:bone_beat_strike") {
    if (domainValue) elements.boneBeatStrike?.click();
    return;
  }
  if (targetId === "somatic:bone_beat_quench") {
    if (domainValue) elements.boneBeatQuench?.click();
    return;
  }

  if (targetId === "somatic:spore_harp_toggle") {
    if (domainValue) updateMixer(toggleMute(mixerState, "harp"), options);
    return;
  }
  if (targetId === "somatic:spore_harp_strum") {
    if (domainValue) elements.sporeHarpStrum?.click();
    return;
  }
  if (targetId === "somatic:spore_harp_symbiosis") {
    if (domainValue) elements.sporeHarpSymbiosis?.click();
    return;
  }
  if (targetId === "somatic:spore_harp_tension") {
    if (domainValue) elements.sporeHarpTension?.click();
    return;
  }

  if (targetId === "somatic:muscaria_toggle") {
    if (domainValue) {
      cycleMuscariaMode(muscariaModel);
      updateMuscariaUI();
    }
    return;
  }
  if (targetId === "somatic:muscaria_stimulate") {
    if (domainValue) elements.muscariaStimulate?.click();
    return;
  }
  if (targetId === "somatic:muscaria_trip_depth") {
    if (domainValue) {
      cycleTripDepth(muscariaModel);
      updateMuscariaUI();
    }
    return;
  }

  if (targetId === "somatic:theremin_toggle") {
    if (domainValue) elements.thereminToggle?.click();
    return;
  }
  if (targetId === "somatic:theremin_scale_snap") {
    if (domainValue) elements.thereminScaleSnap?.click();
    return;
  }
}

function syncMidiLearnUI() {
  const isLearning = Boolean(midiLearnState.learning);
  document.body.classList.toggle("is-midi-learning", isLearning);

  if (elements.midiLearnMixerBtn) {
    elements.midiLearnMixerBtn.classList.toggle("is-active", isLearning);
    elements.midiLearnMixerBtn.setAttribute("aria-pressed", String(isLearning));
    elements.midiLearnMixerBtn.innerHTML = isLearning
      ? 'LEARNING... <span class="hotkey-pill">[L]</span> <span aria-hidden="true">●</span>'
      : 'MIDI LEARN <span class="hotkey-pill">[L]</span> <span aria-hidden="true">🎛</span>';
  }

  if (elements.midiLearnStudioBtn) {
    elements.midiLearnStudioBtn.classList.toggle("is-active", isLearning);
    elements.midiLearnStudioBtn.setAttribute("aria-pressed", String(isLearning));
    elements.midiLearnStudioBtn.innerHTML = isLearning
      ? 'LEARNING... [L] <span aria-hidden="true">●</span>'
      : 'MIDI LEARN [L] <span aria-hidden="true">🎛</span>';
  }

  if (elements.midiFeedbackToggle) {
    elements.midiFeedbackToggle.checked = midiLearnState.feedbackEnabled;
  }

  // Update armed states and mapped attributes on DOM
  const targets = document.querySelectorAll("[data-midi-target]");
  for (const el of targets) {
    const tid = el.dataset.midiTarget;
    const isArmed = isLearning && midiLearnState.armedTargetId === tid;
    el.classList.toggle("is-midi-armed", isArmed);
    const hasCustom = Boolean(midiLearnState.customMap[tid]);
    if (hasCustom) {
      el.setAttribute("data-midi-mapped", "true");
    } else {
      el.removeAttribute("data-midi-mapped");
    }
  }

  // Update status readout
  if (elements.midiLearnStatus) {
    if (!isLearning) {
      const count = Object.keys(midiLearnState.customMap).length;
      elements.midiLearnStatus.textContent = count > 0
        ? `LEARN: IDLE (${count} MAPPED)`
        : "LEARN: INACTIVE";
    } else if (midiLearnState.armedTargetId) {
      const def = TARGET_DEFINITIONS[midiLearnState.armedTargetId];
      elements.midiLearnStatus.textContent = `ARMED: ${def?.label || midiLearnState.armedTargetId} ➔ MOVE HW CC`;
    } else {
      elements.midiLearnStatus.textContent = "LEARN ACTIVE · CLICK ANY CONTROL TO ARM";
    }
  }

  // Render summary chips
  if (elements.midiMapSummary) {
    elements.midiMapSummary.innerHTML = "";
    const entries = Object.entries(midiLearnState.customMap);
    if (entries.length === 0) {
      const empty = document.createElement("span");
      empty.className = "midi-map-empty";
      empty.textContent = "No custom CC mappings. Factory FM-1 CC profile active (CC 70–75, CC 1/2/7/11/64).";
      elements.midiMapSummary.appendChild(empty);
    } else {
      for (const [targetId, binding] of entries) {
        const def = TARGET_DEFINITIONS[targetId];
        const chip = document.createElement("span");
        chip.className = "midi-map-chip";

        const label = document.createElement("span");
        label.className = "midi-map-chip-target";
        label.textContent = def?.label || targetId;

        const ccText = document.createElement("span");
        ccText.className = "midi-map-chip-cc";
        ccText.textContent = binding.channel === "omni"
          ? `CC ${binding.controller}`
          : `CH ${binding.channel} · CC ${binding.controller}`;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "midi-map-chip-remove";
        removeBtn.title = `Unmap ${def?.label || targetId}`;
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          unmapTarget(midiLearnState, targetId);
          saveMidiMapToStorage(window.localStorage, midiLearnState);
          syncMidiLearnUI();
        });

        chip.append(label, ccText, removeBtn);
        elements.midiMapSummary.appendChild(chip);
      }
    }
  }
}

function toggleMidiLearnMode() {
  toggleLearnMode(midiLearnState);
  syncMidiLearnUI();
}

// ---------------------------------------------------------------------------
// Global Action History & Transactional Undo/Redo (P12-03, D-105)
// ---------------------------------------------------------------------------

let historyState = createHistoryState();
let isHistoryRestoring = false;
let pendingHistoryTimer = null;
let pendingHistoryLabel = null;

function syncHistoryUI() {
  const summary = getHistorySummary(historyState);
  const undoDisabled = !summary.canUndo;
  const redoDisabled = !summary.canRedo;

  if (elements.transportUndo) {
    elements.transportUndo.disabled = undoDisabled;
    elements.transportUndo.title = summary.canUndo
      ? `Undo last action: ${historyState.present?.label || ""} [Ctrl+Z]`
      : "Nothing to undo";
  }
  if (elements.transportRedo) {
    elements.transportRedo.disabled = redoDisabled;
    elements.transportRedo.title = summary.canRedo
      ? `Redo next action: ${historyState.future[0]?.label || ""} [Ctrl+Y or Ctrl+Shift+Z]`
      : "Nothing to redo";
  }
  if (elements.studioUndoBtn) elements.studioUndoBtn.disabled = undoDisabled;
  if (elements.studioRedoBtn) elements.studioRedoBtn.disabled = redoDisabled;

  if (elements.studioHistoryStatus) {
    elements.studioHistoryStatus.textContent = `HISTORY: ${summary.currentLabel.toUpperCase()} (${summary.undoCount} UNDO / ${summary.redoCount} REDO)`;
  }

  if (elements.studioHistoryBreadcrumbs) {
    elements.studioHistoryBreadcrumbs.innerHTML = "";
    const pastSlice = historyState.past.slice(-5);
    for (const item of pastSlice) {
      const span = document.createElement("span");
      span.className = "history-crumb";
      span.textContent = item.label;
      elements.studioHistoryBreadcrumbs.appendChild(span);
    }
    if (historyState.present) {
      const span = document.createElement("span");
      span.className = "history-crumb history-crumb-present";
      span.textContent = `▶ ${historyState.present.label}`;
      elements.studioHistoryBreadcrumbs.appendChild(span);
    }
    const futureSlice = historyState.future.slice(0, 4);
    for (const item of futureSlice) {
      const span = document.createElement("span");
      span.className = "history-crumb history-crumb-future";
      span.textContent = item.label;
      elements.studioHistoryBreadcrumbs.appendChild(span);
    }
  }
}

function flushPendingHistory() {
  if (pendingHistoryTimer) {
    clearTimeout(pendingHistoryTimer);
    pendingHistoryTimer = null;
  }
  if (pendingHistoryLabel) {
    const label = pendingHistoryLabel;
    pendingHistoryLabel = null;
    commitHistoryAction(label);
  }
}

function commitHistoryAction(label) {
  if (isHistoryRestoring || !currentScore) return;
  try {
    const snapshot = captureSession();
    historyState = pushHistory(historyState, snapshot, label);
    syncHistoryUI();
  } catch {
    // Session capture guard during transitions
  }
}

function recordHistoryAction(label, { immediate = true } = {}) {
  if (isHistoryRestoring || !currentScore) return;
  if (immediate) {
    flushPendingHistory();
    commitHistoryAction(label);
  } else {
    pendingHistoryLabel = label;
    if (pendingHistoryTimer) clearTimeout(pendingHistoryTimer);
    pendingHistoryTimer = setTimeout(() => {
      pendingHistoryTimer = null;
      if (pendingHistoryLabel) {
        const l = pendingHistoryLabel;
        pendingHistoryLabel = null;
        commitHistoryAction(l);
      }
    }, 400);
  }
}

function performUndo() {
  flushPendingHistory();
  if (!canUndo(historyState)) return;
  const res = undo(historyState);
  if (res.snapshot) {
    historyState = res.state;
    isHistoryRestoring = true;
    try {
      applySession(res.snapshot);
    } finally {
      isHistoryRestoring = false;
    }
    syncHistoryUI();
  }
}

function performRedo() {
  flushPendingHistory();
  if (!canRedo(historyState)) return;
  const res = redo(historyState);
  if (res.snapshot) {
    historyState = res.state;
    isHistoryRestoring = true;
    try {
      applySession(res.snapshot);
    } finally {
      isHistoryRestoring = false;
    }
    syncHistoryUI();
  }
}

function handleIncomingMidi(parsed, event) {
  if (!parsed) return;
  // If this note was broadcasted by our own score generator, drop it (suppress loopback echo)
  if (parsed.note !== undefined) {
    const noteKey = (parsed.channel << 8) | parsed.note;
    if (broadcastEchoFilter.has(noteKey)) return;
  }

  // Filter channel for manual organ play (default: Channel 1)
  const isMatchingChannel = inboundMidiChannel === "omni" || parsed.channel === Number(inboundMidiChannel);
  const ts = Number.isFinite(event?.timeStamp) && event.timeStamp > 0
    ? event.timeStamp
    : (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());

  switch (parsed.type) {
    case "noteon": {
      if (!isMatchingChannel) return;
      const fm1Event = mapFm1NoteEvent(parsed.note, true);
      if (fm1Event.type === "command") {
        if (fm1Event.action === "cycleStyle") {
          const styles = ["swell", "arpeggio", "progression"];
          const nextStyle = styles[(styles.indexOf(funMachineStyle) + 1) % styles.length];
          setFunStyle(nextStyle);
        } else if (fm1Event.action === "triggerSection") {
          triggerCasioSection(fm1Event.section);
        } else if (fm1Event.action === "cycleVoice") {
          const voices = [CREATURE_VOICE_ID, "velvet_pad", "harmonium", "glass_harmonica", "theatre_organ", "string_machine", "music_box", "aether_choir"];
          const nextVoice = voices[(voices.indexOf(funVoiceId) + 1) % voices.length];
          setFunVoice(nextVoice);
        } else if (fm1Event.action === "togglePlayPause") {
          runTransportCommand(transportState.state === TRANSPORT_STATES.PLAYING ? "pause" : "play");
        } else if (fm1Event.action === "stop") {
          runTransportCommand("stop");
        }
        return;
      }
      const semitone = fm1Event.semitone ?? parsed.semitone;
      midiHeldNotes.set(parsed.note, semitone);
      triggerFunKey(semitone, true);
      break;
    }
    case "noteoff": {
      if (!isMatchingChannel) return;
      const fm1Event = mapFm1NoteEvent(parsed.note, false);
      if (fm1Event.type === "commandRelease") return;
      const semitone = fm1Event.semitone ?? parsed.semitone;
      midiHeldNotes.delete(parsed.note);
      if (!midiSustainActive) {
        triggerFunKey(semitone, false);
      }
      break;
    }
    case "cc": {
      const resolution = resolveMidiCC(midiLearnState, parsed.channel, parsed.controller, parsed.value);

      if (resolution.type === "learned") {
        saveMidiMapToStorage(window.localStorage, midiLearnState);
        syncMidiLearnUI();
        if (elements.status) {
          elements.status.textContent = `LEARNED CC ${resolution.controller} ➔ ${resolution.definition.label}`;
        }
        applyResolvedMidiTarget(resolution.targetId, resolution.domainValue, { fromMidi: true });
        break;
      }

      if (resolution.type === "mapped") {
        applyResolvedMidiTarget(resolution.targetId, resolution.domainValue, { fromMidi: true });
        break;
      }

      // Fallbacks for unmapped special standard CCs
      if (parsed.isSustain) {
        const isDown = parsed.value >= 64;
        midiSustainActive = isDown;
        if (!isDown && midiHeldNotes.size === 0 && activeHeldFunKey !== null) {
          triggerFunKey(activeHeldFunKey, false);
        }
      } else if (parsed.isModWheel) {
        interaction.agitation = parsed.value / 127;
        interaction.wakeTime = performance.now();
      } else if (parsed.isVolume || parsed.isExpression) {
        setMasterVolume((parsed.value / 127) * 100, { fromMidi: true });
        if (elements.volume) elements.volume.value = String(Math.round(masterVolume));
      }
      break;
    }
    case "clock": {
      if (midiClockMode !== "slave") break;
      const sync = midiClockSlave.onClock(ts);
      if (sync.bpm !== null && sync.bpm !== activeTempoBpm) {
        setTempoBpm(sync.bpm);
      }
      if (sync.stepBoundary && currentTransport && audioContext) {
        const drift = currentTransport.nextNoteTime - audioContext.currentTime;
        if (Math.abs(drift) > 0.015 && drift < 0.25) {
          currentTransport.nextNoteTime = audioContext.currentTime + 0.005;
        }
      }
      updateMidiClockStatus();
      break;
    }
    case "start": {
      midiClockSlave.onStart(ts);
      const cmd = transportState.state === TRANSPORT_STATES.STOPPED ? "play" : "restart";
      runTransportCommand(cmd, { fromMidiRealtime: true });
      updateMidiClockStatus();
      break;
    }
    case "stop": {
      midiClockSlave.onStop();
      runTransportCommand("stop", { fromMidiRealtime: true });
      updateMidiClockStatus();
      break;
    }
    case "continue": {
      midiClockSlave.onContinue(ts);
      runTransportCommand("play", { fromMidiRealtime: true });
      updateMidiClockStatus();
      break;
    }
  }
}

function attachMidiInputListener() {
  if (unbindMidiIn) {
    unbindMidiIn();
    unbindMidiIn = null;
  }
  if (midiAccess) {
    unbindMidiIn = bindMidiInput(midiAccess, midiInPortId, handleIncomingMidi);
  }
}

function refreshMidiPorts() {
  if (!midiAccess || !elements.midiInSelect || !elements.midiOutSelect) return;
  const { inputs, outputs } = getMidiPorts(midiAccess);

  elements.midiInSelect.innerHTML = "";
  const omniOpt = document.createElement("option");
  omniOpt.value = "omni";
  omniOpt.textContent = "ALL INPUTS (OMNI)";
  elements.midiInSelect.appendChild(omniOpt);
  for (const input of inputs) {
    const opt = document.createElement("option");
    opt.value = input.id;
    opt.textContent = input.name;
    elements.midiInSelect.appendChild(opt);
  }
  elements.midiInSelect.value = midiInPortId;
  if (!elements.midiInSelect.value) {
    midiInPortId = "omni";
    elements.midiInSelect.value = "omni";
  }

  const hasFm1Connected = inputs.some((p) => isFm1Port(p)) || outputs.some((p) => isFm1Port(p));
  if (hasFm1Connected && elements.studioTelemetry) {
    elements.studioTelemetry.textContent = "M-VAVE FM-1 DETECTED · HARDWARE PROFILE ENGAGED ✦";
  }

  elements.midiOutSelect.innerHTML = "";
  const noneOpt = document.createElement("option");
  noneOpt.value = "none";
  noneOpt.textContent = "NO OUTPUT SELECTED";
  elements.midiOutSelect.appendChild(noneOpt);
  const allOpt = document.createElement("option");
  allOpt.value = "all";
  allOpt.textContent = "ALL OUTPUTS (BROADCAST)";
  elements.midiOutSelect.appendChild(allOpt);
  for (const output of outputs) {
    const opt = document.createElement("option");
    opt.value = output.id;
    opt.textContent = output.name;
    elements.midiOutSelect.appendChild(opt);
  }
  elements.midiOutSelect.value = midiOutPortId;
  if (!elements.midiOutSelect.value) {
    midiOutPortId = "none";
    elements.midiOutSelect.value = "none";
  }

  attachMidiInputListener();
}

async function refreshAudioOutputDevices() {
  if (!elements.audioSinkSelect) return;
  const devices = await getAudioOutputDevices();
  elements.audioSinkSelect.innerHTML = "";
  const defaultOpt = document.createElement("option");
  defaultOpt.value = "default";
  defaultOpt.textContent = "SYSTEM DEFAULT (PIPEWIRE / JACK)";
  elements.audioSinkSelect.appendChild(defaultOpt);
  for (const d of devices) {
    if (d.deviceId === "default") continue;
    const opt = document.createElement("option");
    opt.value = d.deviceId;
    opt.textContent = d.label;
    elements.audioSinkSelect.appendChild(opt);
  }
}

function vitrineCoordinates(event) {
  const rect = elements.canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
  const y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
  };
}


function triggerRetaliation(normX, normY) {
  const now = performance.now();
  interaction.retaliateUntil = now + 750;
  interaction.cooldownUntil = now + 3400;
  interaction.agitation = 0;
  interaction.tapStreak = 0;
  interaction.lunge = 1.0;
  interaction.retaliationFlash = 1.0;
  interaction.retaliationPoint = { x: normX, y: normY };

  // Generate crystalline glass stress fractures radiating from strike point
  interaction.retaliationFractures = [];
  const branchCount = 7 + Math.floor(Math.random() * 4);
  for (let b = 0; b < branchCount; b += 1) {
    const baseAngle = (b / branchCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
    const segments = [];
    let curR = 0;
    let curA = baseAngle;
    const segCount = 4 + Math.floor(Math.random() * 3);
    for (let s = 0; s < segCount; s += 1) {
      curR += 16 + Math.random() * 24;
      curA += (Math.random() - 0.5) * 0.35;
      segments.push({ r: curR, a: curA });
    }
    interaction.retaliationFractures.push(segments);
  }

  // Explosive shockwave ripple
  interaction.ripples.push({
    x: normX,
    y: normY,
    bornAt: now,
    duration: 1400,
    strength: 3.8,
    isRetaliation: true,
  });

  // Massive spore eruption
  vision.burstSpores(4.0);
  triggerSporePuff(3.0);

  // Audio percussion
  triggerPercussion("retaliation", normX, normY, 1.0);
  strikeBoneForge(boneBeatModel, { type: "mineral", force: 2.0 });
  if (audioContext && currentTransport) {
    const dest = currentTransport.forgeBus || currentTransport.beatBus;
    triggerBoneStrike(audioContext, dest, "mineral", audioContext.currentTime, 1.0);
  }
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }

  // Disruption across the entire audio ensemble:
  if (currentTransport && audioContext) {
    const actxTime = audioContext.currentTime;

    // 1. Duck creature mix & allow violent pitch surge
    currentTransport.mix.gain.cancelScheduledValues(actxTime);
    currentTransport.mix.gain.setValueAtTime(0.04, actxTime);
    currentTransport.mix.gain.exponentialRampToValueAtTime(0.28, actxTime + 0.45);

    // 2. Physical cabinet impact shudder on master output (voltage sag / tape glitch)
    const baseOutputGain = masterGainFor(masterVolume);
    if (baseOutputGain > 0.001) {
      currentTransport.output.gain.cancelScheduledValues(actxTime);
      currentTransport.output.gain.setValueAtTime(baseOutputGain * 0.35, actxTime);
      currentTransport.output.gain.linearRampToValueAtTime(baseOutputGain * 1.12, actxTime + 0.035);
      currentTransport.output.gain.exponentialRampToValueAtTime(baseOutputGain, actxTime + 0.38);
    }

    // 3. Phonograph needle jump and wax crackle spike
    if (currentTransport.parlorCrackleGain && parlorAcousticsEnabled && parlorCrackleEnabled) {
      currentTransport.parlorCrackleGain.gain.cancelScheduledValues(actxTime);
      currentTransport.parlorCrackleGain.gain.setValueAtTime(0.55, actxTime);
      currentTransport.parlorCrackleGain.gain.exponentialRampToValueAtTime(0.0001, actxTime + 0.06);
      currentTransport.parlorCrackleGain.gain.exponentialRampToValueAtTime(0.38, actxTime + 0.12);
      currentTransport.parlorCrackleGain.gain.exponentialRampToValueAtTime(PARLOR_CRACKLE_PER_LEVEL * parlorAcousticsLevel, actxTime + 0.85);
    }

    // 4. Feedback surge in tape delay line
    if (currentTransport.feedback) {
      currentTransport.feedback.gain.cancelScheduledValues(actxTime);
      currentTransport.feedback.gain.setValueAtTime(0.78, actxTime);
      currentTransport.feedback.gain.exponentialRampToValueAtTime(0.22, actxTime + 0.75);
    }
  }

  if (stageContainer) {
    stageContainer.classList.add("is-retaliating");
    stageContainer.classList.remove("is-agitated");
  }

  if (elements.stageCaption) {
    elements.stageCaption.textContent = "RETALIATION! · THE SPECIMEN STRUCK THE GLASS!";
  }
  if (!muted) {
    elements.status.textContent = "ORGANISM RETALIATED · STEP BACK FROM GLASS";
  }
}

function triggerTimidRetreat(normX, normY) {
  const now = performance.now();
  interaction.retreat = 1.0;
  interaction.cooldownUntil = now + 3400;
  interaction.retaliateUntil = now + 750;
  interaction.agitation = 0;
  interaction.tapStreak = 0;
  interaction.lunge = 0;
  interaction.retaliationFlash = 0;
  interaction.retaliationFractures = [];
  interaction.retaliationPoint = { x: normX, y: normY };

  interaction.ripples.push({
    x: normX,
    y: normY,
    bornAt: now,
    duration: 1100,
    strength: 1.2,
    isRetaliation: false,
  });

  vision.burstSpores(1.2);
  triggerSporePuff(0.9);
  triggerPercussion("hush", normX, normY, 1.0);

  if (currentTransport && audioContext) {
    const actxTime = audioContext.currentTime;
    currentTransport.mix.gain.cancelScheduledValues(actxTime);
    currentTransport.mix.gain.setValueAtTime(0.06, actxTime);
    currentTransport.mix.gain.exponentialRampToValueAtTime(0.35, actxTime + 3.0);
  }

  if (stageContainer) {
    stageContainer.classList.add("is-sulking");
    stageContainer.classList.remove("is-agitated", "is-retaliating");
  }

  if (elements.stageCaption) {
    elements.stageCaption.textContent = "SPECIMEN HAS FLED INTO THE SHADOWS";
  }
  if (!muted) {
    elements.status.textContent = "SPECIMEN FLEES FROM CONTACT · HIDING IN DARKNESS";
  }
}

function triggerMusicianCadenza(normX, normY) {
  const now = performance.now();
  interaction.cadenzaFlurry = 1.0;
  interaction.cooldownUntil = now + 2400;
  interaction.retaliateUntil = now + 750;
  interaction.agitation = 0;
  interaction.tapStreak = 0;
  interaction.lunge = 0;
  interaction.retaliationFlash = 0;
  interaction.retaliationFractures = [];
  interaction.retaliationPoint = { x: normX, y: normY };

  interaction.ripples.push({
    x: normX,
    y: normY,
    bornAt: now,
    duration: 1600,
    strength: 2.5,
    isRetaliation: false,
  });

  vision.burstSpores(2.8);
  triggerSporePuff(2.2);
  triggerPercussion("cadenza", normX, normY, 1.2);

  if (stageContainer) {
    stageContainer.classList.remove("is-agitated", "is-retaliating", "is-sulking");
  }

  if (elements.stageCaption) {
    elements.stageCaption.textContent = "VIRTUOSIC CADENZA! · HARMONIC FLURRY";
  }
  if (!muted) {
    elements.status.textContent = "SPECIMEN IMPROVISING CADENZA";
  }
}

function triggerChromatophoreDischarge(normX, normY) {
  const now = performance.now();
  interaction.bioluminescentFlash = 1.0;
  interaction.chromaticShift = (interaction.chromaticShift || 0) + 120;
  interaction.cooldownUntil = now + 2600;
  interaction.retaliateUntil = now + 750;
  interaction.agitation = 0;
  interaction.tapStreak = 0;
  interaction.lunge = 0;
  interaction.retaliationFlash = 0;
  interaction.retaliationFractures = [];
  interaction.retaliationPoint = { x: normX, y: normY };

  interaction.ripples.push({
    x: normX,
    y: normY,
    bornAt: now,
    duration: 1500,
    strength: 2.8,
    isRetaliation: false,
  });

  vision.burstSpores(3.4);
  triggerSporePuff(2.6);
  triggerPercussion("bioluminescent_pulse", normX, normY, 1.2);

  if (stageContainer) {
    stageContainer.classList.remove("is-agitated", "is-retaliating", "is-sulking");
  }

  if (elements.stageCaption) {
    elements.stageCaption.textContent = "PRISMATIC AURORAL DISCHARGE!";
  }
  if (!muted) {
    elements.status.textContent = "BIOLUMINESCENT DISCHARGE · HUE IRIDESCENCE";
  }
}

elements.canvas.addEventListener("pointerdown", async (event) => {
  if (event.button !== undefined && event.button !== 0) return;
  await ensureAudioContext();
  const coords = vitrineCoordinates(event);
  const now = performance.now();

  const temperament = currentScore?.temperament || (currentScore ? deriveTemperament(currentScore) : TEMPERAMENTS.retaliator);
  interaction.temperament = temperament;

  // If organism is in sulk / cooldown recovery, it refuses contact with a temperament-specific response
  if (now < interaction.cooldownUntil) {
    interaction.active = true;
    interaction.pointerId = event.pointerId;
    interaction.x = coords.x;
    interaction.y = coords.y;
    interaction.smoothX = coords.x;
    interaction.smoothY = coords.y;
    interaction.tap = 0.3;
    interaction.hold = Math.max(interaction.hold, 0.2);
    interaction.dragDistance = 0;
    interaction.pitchBend = -coords.y * 0.3;
    interaction.ripples.push({ x: coords.x, y: coords.y, bornAt: now, strength: 0.35 });

    const cooldownSound = temperament.id === "timid"
      ? "flutter"
      : temperament.id === "musician"
      ? "melody_burst"
      : temperament.id === "chromatophore"
      ? "shimmer"
      : temperament.id === "stoic"
      ? "clockwork_tick"
      : "dull_thud";

    triggerPercussion(cooldownSound, coords.x, coords.y, 0.5);
    if (!muted) {
      elements.status.textContent = temperament.cooldownLabel;
    }
    try {
      elements.canvas.setPointerCapture(event.pointerId);
    } catch {}
    return;
  }

  // Track tap streak and annoyance escalation tailored to temperament
  const timeSinceLast = (now - interaction.lastTapAt) / 1000;
  interaction.lastTapAt = now;
  if (timeSinceLast < 1.8) {
    interaction.tapStreak += 1;
    interaction.agitation = Math.min(1.0, interaction.agitation + (temperament.agitationRate || 0.18) + interaction.tapStreak * 0.04);
  } else {
    interaction.tapStreak = 1;
    interaction.agitation = Math.min(1.0, Math.max(0.18, interaction.agitation + (temperament.agitationRate || 0.15)));
  }
  strikeBoneForge(boneBeatModel, { type: "bone", force: 0.8 });
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }
  if (muscariaModel.enabled) {
    stimulateMuscaria(muscariaModel, 0.9);
    updateMuscariaUI();
  }

  // Cross escalation threshold
  const isRetaliatorEscalated = interaction.agitation >= 0.85 || interaction.tapStreak >= 6;
  const isTimidEscalated = temperament.id === "timid" && (interaction.tapStreak >= 4 || interaction.agitation >= 0.7);
  const isMusicianEscalated = temperament.id === "musician" && (interaction.tapStreak >= 5 || interaction.agitation >= 0.7);
  const isChromatophoreEscalated = temperament.id === "chromatophore" && (interaction.tapStreak >= 5 || interaction.agitation >= 0.7);

  if ((temperament.id === "retaliator" && (interaction.agitation >= 0.85 || interaction.tapStreak >= 6)) ||
      (temperament.id === "timid" && isTimidEscalated) ||
      (temperament.id === "musician" && isMusicianEscalated) ||
      (temperament.id === "chromatophore" && isChromatophoreEscalated)) {
    if (temperament.id === "retaliator") {
      triggerRetaliation(coords.x, coords.y);
    } else if (temperament.id === "timid") {
      triggerTimidRetreat(coords.x, coords.y);
    } else if (temperament.id === "musician") {
      triggerMusicianCadenza(coords.x, coords.y);
    } else if (temperament.id === "chromatophore") {
      triggerChromatophoreDischarge(coords.x, coords.y);
    }
    return;
  }

  interaction.active = true;
  interaction.pointerId = event.pointerId;
  interaction.x = coords.x;
  interaction.y = coords.y;
  interaction.smoothX = coords.x;
  interaction.smoothY = coords.y;
  interaction.tap = 1;
  interaction.hold = Math.max(interaction.hold, 0.35);
  interaction.dragTravel = Math.floor((((Math.atan2(coords.y, coords.x) + Math.PI) / (Math.PI * 2)) * 12)) % 12;
  interaction.dragDistance = 0;
  interaction.pitchBend = -coords.y;

  if (temperament.id === "chromatophore") {
    interaction.chromaticShift = (interaction.chromaticShift || 0) + 42;
  }

  const rippleStrength = 1 + interaction.agitation * 0.8;
  interaction.ripples.push({ x: coords.x, y: coords.y, bornAt: now, strength: rippleStrength });
  const sporeMultiplier = 1.2 + interaction.agitation * 1.5;
  vision.burstSpores(sporeMultiplier);
  triggerSporePuff(sporeMultiplier);
  stageContainer?.classList.add("is-interacting");
  try {
    elements.canvas.setPointerCapture(event.pointerId);
  } catch {
    // Synthetic or non-capturable pointers safely continue without capture.
  }

  if (!currentScore && oracleSource) {
    const initialPhrase = elements.phrase.value.trim() || SURPRISES[0];
    elements.phrase.value = initialPhrase;
    await summon(initialPhrase);
  } else if (currentScore && transportState.state === TRANSPORT_STATES.STOPPED && !muted) {
    // Tapping a stopped vitrine wakes the loop; a deliberate pause stays paused.
    await runTransportCommand("play");
  }

  updateAudioInteraction();
  const tapSound = temperament.tapSound || "strike";
  if (tapSound === "strike") {
    triggerPercussion("strike", coords.x, coords.y, 1 + interaction.agitation * 0.5);
  } else {
    triggerPercussion(tapSound, coords.x, coords.y, 1 + interaction.agitation * 0.5);
  }
  if (!muted) {
    if (interaction.agitation >= 0.45) {
      elements.status.textContent = `${temperament.irritatedLabel} · TAP COUNT ${interaction.tapStreak}`;
    } else {
      elements.status.textContent = temperament.calmLabel;
    }
  }
});

elements.canvas.addEventListener("pointermove", (event) => {
  if (!interaction.active || event.pointerId !== interaction.pointerId) return;
  const coords = vitrineCoordinates(event);
  const dx = coords.x - interaction.x;
  const dy = coords.y - interaction.y;
  const delta = Math.hypot(dx, dy);
  interaction.x = coords.x;
  interaction.y = coords.y;
  interaction.dragSpeed = Math.min(1, interaction.dragSpeed + delta * 2.8);
  interaction.pitchBend = -coords.y;
  interaction.dragDistance = (interaction.dragDistance || 0) + delta;
  updateAudioInteraction();

  const now = performance.now();
  const sector = Math.floor((((Math.atan2(coords.y, coords.x) + Math.PI) / (Math.PI * 2)) * 12)) % 12;
  const sectorChanged = sector !== interaction.dragTravel;
  const distanceReached = interaction.dragDistance > 0.12;

  if ((sectorChanged || distanceReached) && (now - interaction.lastTickAt > 110)) {
    interaction.dragTravel = sector;
    interaction.dragDistance = 0;
    interaction.lastTickAt = now;
    interaction.ripples.push({ x: coords.x, y: coords.y, bornAt: now, strength: 0.55 });
    triggerPercussion("ratchet", coords.x, coords.y, Math.min(0.85, 0.4 + interaction.dragSpeed * 0.45));
    triggerSporePuff(0.65);
    vision.burstSpores(0.45);
  }

  // BioParasite Spore Harp: string intersection plucks on vitrine swipe
  if (sporeHarpModel.enabled && sporeHarpModel.strings?.length > 0 && !muted) {
    const prevPt = { x: coords.x - dx, y: coords.y - dy };
    const currPt = { x: coords.x, y: coords.y };
    for (const str of sporeHarpModel.strings) {
      if (checkStringIntersection(prevPt, currPt, str, 0.045) && (now - str.lastPluckedAt > 110)) {
        const vel = Math.max(0.2, Math.min(0.72, 0.28 + delta * 3.0));
        const pluck = pluckHyphalString(sporeHarpModel, str.index, vel);
        if (pluck && audioContext) {
          const dest = currentTransport?.sporeHarpBus || currentTransport?.fungalBus || audioContext.destination;
          triggerHyphalPluck(audioContext, dest, pluck.frequency, pluck.velocity, {
            symbiosis: sporeHarpModel.symbiosis,
            sporeDensity: pluck.sporeDensity,
            atTime: audioContext.currentTime,
          });
          if (currentTransport) {
            const soundedMidi = Math.round(pluck.midi + 12 * Math.log2(sporeHarpModel.tension || 1.0));
            logNote(currentTransport, "harp", soundedMidi, audioContext.currentTime, 0.45, pluck.velocity);
          }
          if (elements.sporeHarpTelemetry) {
            elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
          }
        }
      }
    }
  }
});

function endVitrineInteraction(event) {
  if (!interaction.active) return;
  if (event?.pointerId !== undefined && interaction.pointerId !== null && event.pointerId !== interaction.pointerId) {
    return;
  }
  if (thereminVoice && interaction.thereminActive) {
    thereminVoice.silence();
    interaction.thereminActive = false;
    interaction.thereminSlag = 0;
    interaction.thereminStuck = false;
    updateThereminModel(thereminModel, { isInteracting: false });
    updateThereminUI(null);
  }
  interaction.active = false;
  interaction.pointerId = null;
  stageContainer?.classList.remove("is-interacting");
  if (currentTransport && !muted) {
    const now = performance.now();
    if (now < interaction.retaliateUntil) {
      elements.status.textContent = "ORGANISM RETALIATED · STEP BACK FROM GLASS";
    } else if (now < interaction.cooldownUntil) {
      elements.status.textContent = "SPECIMEN SULKING · REFUSES CONTACT";
    } else if (interaction.agitation >= 0.5) {
      elements.status.textContent = `ORGANISM IRRITATED · TAP COUNT ${interaction.tapStreak}`;
    } else {
      elements.status.textContent = "OMEN LOOPING";
    }
  }
}

elements.canvas.addEventListener("pointerup", endVitrineInteraction);
elements.canvas.addEventListener("pointercancel", endVitrineInteraction);
elements.canvas.addEventListener("lostpointercapture", endVitrineInteraction);

// --- Aetheric Bone Theremin Pedestal Controls (P10-01, D-089) ----------------
elements.thereminToggle?.addEventListener("click", () => {
  thereminModel.enabled = !thereminModel.enabled;
  elements.thereminToggle.setAttribute("aria-pressed", String(thereminModel.enabled));
  elements.thereminToggle.innerHTML = thereminModel.enabled
    ? '<span class="theremin-glyph" aria-hidden="true">⚡</span> BONE THEREMIN: ACTIVE'
    : '<span class="theremin-glyph" aria-hidden="true">○</span> BONE THEREMIN: MUTED';
  if (!thereminModel.enabled) {
    thereminVoice?.silence();
    interaction.thereminActive = false;
  }
  updateThereminUI(null);
  recordHistoryAction(thereminModel.enabled ? "Enable Theremin" : "Mute Theremin");
});

elements.thereminScaleSnap?.addEventListener("click", () => {
  thereminModel.scaleSnap = !thereminModel.scaleSnap;
  elements.thereminScaleSnap.setAttribute("aria-pressed", String(thereminModel.scaleSnap));
  elements.thereminScaleSnap.textContent = thereminModel.scaleSnap
    ? "SCALE SNAP: ON"
    : "SCALE SNAP: OFF (GLIDE)";
  updateThereminUI(null);
  recordHistoryAction(`Theremin Scale Snap: ${thereminModel.scaleSnap ? "ON" : "OFF"}`);
});

// --- The Bone Forge & Crucible Controls (P10-02, D-090) ---------------------
elements.boneBeatToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "forge"));
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }
  recordHistoryAction("Toggle Bone Forge Mute");
});

elements.boneBeatStrike?.addEventListener("click", async () => {
  if (audioContext && audioContext.state === "suspended") {
    await audioContext.resume();
  }
  strikeBoneForge(boneBeatModel, { type: "brass", force: 1.2 });
  if (audioContext) {
    const dest = currentTransport?.forgeBus || currentTransport?.beatBus || audioContext.destination;
    triggerBoneStrike(audioContext, dest, "brass", audioContext.currentTime, 0.95);
  }
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }
});

elements.boneBeatQuench?.addEventListener("click", async () => {
  if (audioContext && audioContext.state === "suspended") {
    await audioContext.resume();
  }
  quenchBoneForge(boneBeatModel);
  if (audioContext) {
    const dest = currentTransport?.forgeBus || currentTransport?.beatBus || audioContext.destination;
    triggerQuenchSteam(audioContext, dest, audioContext.currentTime, 1.0);
  }
  if (elements.boneBeatTelemetry) {
    elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
  }
});

// --- The BioParasite Spore Harp Controls (P10-03, D-091) ---------------------
elements.sporeHarpToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "harp"));
  if (elements.sporeHarpTelemetry) {
    elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
  }
  recordHistoryAction("Toggle Spore Harp Mute");
});

elements.sporeHarpStrum?.addEventListener("click", async () => {
  if (audioContext && audioContext.state === "suspended") {
    await audioContext.resume();
  }
  if (!sporeHarpModel.enabled) {
    updateMixer(setMuted(mixerState, "harp", false));
  }
  const plucks = strumHarp(sporeHarpModel, { direction: 1, velocity: 0.65, staggerMs: 36 });
  if (audioContext) {
    const dest = currentTransport?.sporeHarpBus || currentTransport?.fungalBus || audioContext.destination;
    for (const p of plucks) {
      const at = audioContext.currentTime + (p.delayMs / 1000);
      triggerHyphalPluck(audioContext, dest, p.frequency, p.velocity, {
        symbiosis: sporeHarpModel.symbiosis,
        sporeDensity: p.sporeDensity,
        atTime: at,
      });
      if (currentTransport) {
        const soundedMidi = Math.round(p.midi + 12 * Math.log2(sporeHarpModel.tension || 1.0));
        logNote(currentTransport, "harp", soundedMidi, at, 0.45, p.velocity);
      }
    }
  }
  if (elements.sporeHarpTelemetry) {
    elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
  }
});

elements.sporeHarpSymbiosis?.addEventListener("click", () => {
  const sym = cycleSymbiosis(sporeHarpModel);
  elements.sporeHarpSymbiosis.textContent = `SYMBIOSIS: ${sym}`;
  if (elements.sporeHarpTelemetry) {
    elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
  }
  recordHistoryAction(`Symbiosis: ${sym}`);
});

elements.sporeHarpTension?.addEventListener("click", () => {
  cycleTension(sporeHarpModel);
  elements.sporeHarpTension.textContent = `TENSION: ${formatTensionLabel(sporeHarpModel.tension)}`;
  if (elements.sporeHarpTelemetry) {
    elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
  }
  recordHistoryAction(`Tension: ${formatTensionLabel(sporeHarpModel.tension)}`);
});

// --- PlantWave Amanita Muscaria Transducer Controls (P10-04, D-095) ---------
elements.muscariaToggle?.addEventListener("click", () => {
  cycleMuscariaMode(muscariaModel);
  updateMuscariaUI();
  recordHistoryAction(`Muscaria: ${muscariaModel.mode}`);
});

elements.muscariaStimulate?.addEventListener("click", async () => {
  await ensureAudioContext();
  stimulateMuscaria(muscariaModel, 1.4);
  updateMuscariaUI();
  if (currentTransport && !muted && audioContext) {
    const step = currentTransport.audibleStep ?? 0;
    const chord = currentTransport.conductedSpine?.[step] || currentConductedSpine?.[step] || null;
    scheduleMuscariaStep(
      audioContext,
      currentTransport.fungalBus,
      muscariaModel,
      step,
      audioContext.currentTime,
      0.25,
      { score: currentScore || vision.score, chord, stepsCount: activeGridSteps }
    );
  }
});

elements.muscariaTripDepth?.addEventListener("click", () => {
  cycleTripDepth(muscariaModel);
  updateMuscariaUI();
  recordHistoryAction(`Trip Depth: ${muscariaModel.tripDepth}`);
});

// --- Parlor mixing console (P5-19) ---------------------------------------

const PLATE_TOGGLE_LABELS = Object.freeze({
  beat: "PULSE",
  bass: "BASS",
  harmony: "ORGAN",
  chime: "CHIMES",
  chant: "CHOIR",
});
const mixerStripElements = {};
const meterDisplay = {};
let meterBuffer = null;
let meterFrame = 0;

// A plate's engage/silence toggle is its mixer mute: one switch, two places.
function channelEngaged(id) {
  return !mixerState.channels[id].muted;
}

function updateMixer(nextState, options = {}) {
  const prevState = mixerState;
  mixerState = nextState;
  applyMixerToTransport();
  syncMixerConsole();
  syncPlateToggles();
  updateBandstandStatus();

  if (!options.fromMidi) {
    for (const { id } of MIXER_CHANNELS) {
      if (prevState?.channels?.[id]?.fader !== mixerState?.channels?.[id]?.fader) {
        sendMidiFeedback(`fader:${id}`, mixerState.channels[id].fader);
      }
      if (prevState?.channels?.[id]?.muted !== mixerState?.channels?.[id]?.muted) {
        sendMidiFeedback(`mute:${id}`, !mixerState.channels[id].muted);
      }
    }
  }
}

function applyMixerToTransport() {
  if (!audioContext || !currentTransport?.strips) return;
  const now = audioContext.currentTime;
  const settings = channelSettings(mixerState);
  for (const { id } of MIXER_CHANNELS) {
    const strip = currentTransport.strips[id];
    if (!strip) continue;
    strip.fader.gain.cancelScheduledValues(now);
    strip.fader.gain.setTargetAtTime(settings[id].gain, now, 0.02);
    if (strip.pan) {
      strip.pan.pan.cancelScheduledValues(now);
      strip.pan.pan.setTargetAtTime(settings[id].pan, now, 0.02);
    }
  }
  const anyAudible = MIXER_CHANNEL_IDS.some((id) => isChannelAudible(mixerState, id));
  if (currentTransport.parlorCrackleGain) {
    const crackleTarget = parlorAcousticsEnabled && parlorCrackleEnabled && anyAudible
      ? PARLOR_CRACKLE_PER_LEVEL * parlorAcousticsLevel
      : 0.0001;
    currentTransport.parlorCrackleGain.gain.cancelScheduledValues(now);
    currentTransport.parlorCrackleGain.gain.setTargetAtTime(crackleTarget, now, 0.02);
  }
}

function syncPlateToggles() {
  const toggles = {
    beat: elements.beatToggle,
    bass: elements.bassToggle,
    harmony: elements.harmonyToggle,
    chime: elements.chimeToggle,
    chant: elements.chantToggle,
  };
  for (const [id, toggle] of Object.entries(toggles)) {
    if (!toggle) continue;
    const engaged = channelEngaged(id);
    toggle.setAttribute("aria-pressed", String(engaged));
    toggle.textContent = `${PLATE_TOGGLE_LABELS[id]}: ${engaged ? "ENGAGED" : "SILENCED"}`;
  }
  if (elements.boneBeatToggle) {
    const engaged = channelEngaged("forge");
    elements.boneBeatToggle.setAttribute("aria-pressed", String(engaged));
    elements.boneBeatToggle.textContent = engaged ? "BONE FORGE: ACTIVE" : "BONE FORGE: MUTED";
    boneBeatModel.enabled = engaged;
  }
  if (elements.sporeHarpToggle) {
    const engaged = channelEngaged("harp");
    elements.sporeHarpToggle.setAttribute("aria-pressed", String(engaged));
    elements.sporeHarpToggle.innerHTML = engaged
      ? '<span class="harp-glyph" aria-hidden="true">𝄢</span> SPORE HARP: ACTIVE'
      : '<span class="harp-glyph" aria-hidden="true">○</span> SPORE HARP: MUTED';
    sporeHarpModel.enabled = engaged;
  }
}

function syncMixerConsole() {
  const soloActive = anySoloed(mixerState);
  let mutedCount = 0;
  let soloCount = 0;
  for (const { id, label } of MIXER_CHANNELS) {
    const refs = mixerStripElements[id];
    const channel = mixerState.channels[id];
    if (channel.muted) mutedCount += 1;
    if (channel.soloed) soloCount += 1;
    if (!refs) continue;
    const db = formatDb(faderDb(channel.fader));
    const pan = formatPan(channel.pan);
    refs.fader.value = String(channel.fader);
    refs.fader.setAttribute("aria-valuetext", db);
    refs.db.value = db;
    refs.pan.value = String(channel.pan);
    refs.pan.setAttribute("aria-valuetext", pan === "C" ? "Center" : pan.replace("L", "Left ").replace("R", "Right "));
    refs.panValue.value = pan;
    refs.mute.setAttribute("aria-pressed", String(channel.muted));
    refs.solo.setAttribute("aria-pressed", String(channel.soloed));
    refs.strip.classList.toggle("is-silent", !isChannelAudible(mixerState, id));
    refs.strip.title = `${label}: ${isChannelAudible(mixerState, id) ? "audible" : "silent"}`;
  }
  if (elements.mixerTelemetry) {
    const parts = [`${MIXER_CHANNELS.length} CHANNELS`];
    if (soloActive) parts.push(`${soloCount} SOLO`);
    if (mutedCount) parts.push(`${mutedCount} MUTED`);
    if (!soloActive && !mutedCount) parts.push("ALL OPEN");
    elements.mixerTelemetry.textContent = parts.join(" · ");
  }
}

function renderMixerConsole() {
  if (!elements.mixerStrips) return;
  elements.mixerStrips.replaceChildren();
  for (const { id, label, source } of MIXER_CHANNELS) {
    const strip = document.createElement("div");
    strip.className = "mixer-strip";
    strip.dataset.channel = id;
    strip.setAttribute("role", "group");
    strip.setAttribute("aria-label", `${label} channel`);

    const name = document.createElement("p");
    name.className = "mixer-strip-label";
    name.textContent = label;
    const sourceTag = document.createElement("span");
    sourceTag.className = "mixer-strip-source";
    sourceTag.textContent = source;
    name.append(sourceTag);

    const bay = document.createElement("div");
    bay.className = "mixer-fader-bay";
    const meter = document.createElement("div");
    meter.className = "mixer-meter";
    meter.setAttribute("aria-hidden", "true");
    const fill = document.createElement("span");
    fill.className = "mixer-meter-fill";
    const peak = document.createElement("span");
    peak.className = "mixer-meter-peak";
    meter.append(fill, peak);
    const fader = document.createElement("input");
    fader.type = "range";
    fader.className = "mixer-fader";
    fader.id = `mixer-fader-${id}`;
    fader.dataset.midiTarget = `fader:${id}`;
    fader.min = "0";
    fader.max = "100";
    fader.step = "1";
    fader.setAttribute("aria-label", `${label} level`);
    fader.title = "Drag to set level (double-click for unity)";
    bay.append(meter, fader);

    const db = document.createElement("output");
    db.className = "mixer-db";
    db.htmlFor = fader.id;

    const pan = document.createElement("input");
    pan.type = "range";
    pan.className = "mixer-pan";
    pan.id = `mixer-pan-${id}`;
    pan.min = "-100";
    pan.max = "100";
    pan.step = "1";
    pan.setAttribute("aria-label", `${label} pan`);
    pan.title = "Drag to pan (double-click to center)";
    const panValue = document.createElement("output");
    panValue.className = "mixer-pan-value";
    panValue.htmlFor = pan.id;

    const switches = document.createElement("div");
    switches.className = "mixer-switches";
    const mute = document.createElement("button");
    mute.type = "button";
    mute.className = "mixer-switch mixer-mute";
    mute.dataset.midiTarget = `mute:${id}`;
    mute.textContent = "M";
    mute.setAttribute("aria-label", `Mute ${label}`);
    const solo = document.createElement("button");
    solo.type = "button";
    solo.className = "mixer-switch mixer-solo";
    solo.textContent = "S";
    solo.setAttribute("aria-label", `Solo ${label}`);
    const lock = document.createElement("button");
    lock.type = "button";
    lock.className = "mixer-switch mixer-lock";
    lock.textContent = "🔓";
    lock.setAttribute("aria-label", `Lock ${label}`);
    lock.title = `Freeze ${label} during re-rolls and mutations`;
    switches.append(mute, solo, lock);

    fader.addEventListener("input", () => {
      updateMixer(setFader(mixerState, id, fader.value));
      recordHistoryAction(`Fader: ${label}`, { immediate: false });
    });
    fader.addEventListener("change", () => recordHistoryAction(`Fader: ${label}`, { immediate: true }));
    fader.addEventListener("dblclick", () => {
      updateMixer(setFader(mixerState, id, FADER_UNITY));
      recordHistoryAction(`Reset Fader: ${label}`);
    });
    pan.addEventListener("input", () => {
      updateMixer(setPan(mixerState, id, pan.value));
      recordHistoryAction(`Pan: ${label}`, { immediate: false });
    });
    pan.addEventListener("change", () => recordHistoryAction(`Pan: ${label}`, { immediate: true }));
    pan.addEventListener("dblclick", () => {
      updateMixer(setPan(mixerState, id, 0));
      recordHistoryAction(`Center Pan: ${label}`);
    });
    mute.addEventListener("click", () => {
      updateMixer(toggleMute(mixerState, id));
      recordHistoryAction(`Mute: ${label}`);
    });
    solo.addEventListener("click", () => {
      updateMixer(toggleSolo(mixerState, id));
      recordHistoryAction(`Solo: ${label}`);
    });
    lock.addEventListener("click", () => toggleLock(id));

    const tacet = document.createElement("span");
    tacet.className = "mixer-tacet";
    tacet.textContent = "TACET";
    tacet.title = "The INTERCAL conductor rests this voice for the current section";
    name.append(tacet);

    strip.append(name, bay, db, pan, panValue, switches);
    elements.mixerStrips.append(strip);
    mixerStripElements[id] = { strip, fader, db, pan, panValue, mute, solo, lock, tacet };
  }
  syncMixerConsole();
  syncPartLockUI();
}

// VU meters read each strip's post-fader analyser once per frame: fast attack,
// ~1.2 s fall, and a peak marker that holds for 0.9 s. The loop stops once the
// transport is gone and every meter has fallen to rest.
function drawMeters(timestamp) {
  meterFrame = 0;
  const strips = currentTransport?.strips;
  let moving = false;
  for (const { id } of MIXER_CHANNELS) {
    const display = (meterDisplay[id] ||= { level: 0, peak: 0, peakAt: 0, clipUntil: 0 });
    const analyser = strips?.[id]?.analyser;
    let reading = null;
    if (analyser) {
      if (!meterBuffer || meterBuffer.length !== analyser.fftSize) meterBuffer = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(meterBuffer);
      reading = meterReading(meterBuffer);
    }
    const level = reading ? meterFill(reading.rmsDb) : 0;
    const peak = reading ? meterFill(reading.peakDb) : 0;
    display.level = level >= display.level ? level : Math.max(level, display.level - 0.014);
    if (peak >= display.peak) {
      display.peak = peak;
      display.peakAt = timestamp;
    } else if (timestamp - display.peakAt > 900) {
      display.peak = Math.max(peak, display.peak - 0.012);
    }
    if (reading && reading.peak >= 0.99) display.clipUntil = timestamp + 1200;
    const refs = mixerStripElements[id];
    if (refs) {
      refs.strip.style.setProperty("--level", display.level.toFixed(3));
      refs.strip.style.setProperty("--peak", display.peak.toFixed(3));
      refs.strip.classList.toggle("is-clipping", timestamp < display.clipUntil);
    }
    if (display.level > 0.002 || display.peak > 0.002) moving = true;
  }
  if (currentTransport || moving) meterFrame = window.requestAnimationFrame(drawMeters);
}

function startMeters() {
  if (!meterFrame) meterFrame = window.requestAnimationFrame(drawMeters);
}

function setBandPlayersEnabled(nextState) {
  updateMixer(setMuted(mixerState, ACCOMPANIMENT_CHANNEL_IDS, !nextState));
}

function toggleLock(id) {
  partLockState = togglePartLock(partLockState, id);
  syncPartLockUI();
  recordHistoryAction(`Toggle Lock: ${id}`);
}

function syncPartLockUI() {
  const counts = countActiveLocks(partLockState);

  for (const id of MIXER_PART_IDS) {
    const refs = mixerStripElements[id];
    if (refs && refs.lock) {
      const isLocked = Boolean(partLockState[id]);
      refs.lock.textContent = isLocked ? "🔒" : "🔓";
      refs.lock.setAttribute("aria-pressed", String(isLocked));
      refs.lock.classList.toggle("is-locked", isLocked);
      refs.strip.classList.toggle("is-part-locked", isLocked);
    }
  }

  const plateButtons = {
    beat: elements.beatLock,
    bass: elements.bassLock,
    harmony: elements.harmonyLock,
    chime: elements.chimeLock,
    chant: elements.chantLock,
  };
  for (const [plateId, button] of Object.entries(plateButtons)) {
    if (button) {
      const isLocked = Boolean(partLockState[plateId]);
      button.textContent = isLocked ? "LOCKED 🔒" : "LOCK 🔓";
      button.setAttribute("aria-pressed", String(isLocked));
      button.classList.toggle("is-locked", isLocked);
    }
  }

  if (elements.partLockVisuals) {
    const isLocked = Boolean(partLockState.visuals);
    elements.partLockVisuals.textContent = isLocked ? "BODY 🔒" : "BODY 🔓";
    elements.partLockVisuals.setAttribute("aria-pressed", String(isLocked));
    elements.partLockVisuals.classList.toggle("is-locked", isLocked);
  }
  if (elements.partLockTonality) {
    const isLocked = Boolean(partLockState.tonality);
    elements.partLockTonality.textContent = isLocked ? "KEY 🔒" : "KEY 🔓";
    elements.partLockTonality.setAttribute("aria-pressed", String(isLocked));
    elements.partLockTonality.classList.toggle("is-locked", isLocked);
  }

  if (elements.partLockToggleAll) {
    elements.partLockToggleAll.textContent = counts.isAnyLocked ? "UNLOCK ALL 🔓" : "LOCK ALL 🔒";
    elements.partLockToggleAll.title = counts.isAnyLocked ? "Unlock all frozen instruments" : "Lock all instruments";
  }

  if (elements.partLockSummary) {
    elements.partLockSummary.textContent = counts.isAnyLocked
      ? `${counts.locked} LOCKED · ${counts.free} FREE`
      : "ALL PARTS FREE";
  }
}

function mutateUnlockedParts() {
  if (!currentScore) return;
  const counts = countActiveLocks(partLockState);
  if (counts.locked === counts.total) {
    elements.status.textContent = "ALL PARTS LOCKED · UNLOCK TO MUTATE";
    return;
  }

  if (!partLockState.beat) {
    beatMutation += 1;
    recomposePlate("beat");
  }
  if (!partLockState.bass) {
    bassMutation += 1;
    recomposePlate("bass");
  }
  if (!partLockState.harmony) {
    harmonyMutation += 1;
    recomposePlate("harmony");
  }
  if (!partLockState.chime) {
    chimeMutation += 1;
    recomposePlate("chime");
  }
  if (!partLockState.chant) {
    chantMutation += 1;
    recomposePlate("chant");
  }

  if (!partLockState.forge && boneBeatModel) {
    currentBoneBeat = composeBoneBeat(currentScore, activeGridSteps, beatMutation);
    if (elements.boneBeatTelemetry) {
      elements.boneBeatTelemetry.textContent = formatBoneBeatTelemetry(boneBeatModel);
    }
  }

  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();

  elements.status.textContent = `UNLOCKED ENSEMBLE MUTATED IN-PLACE · ${counts.free} VOICES RE-SEEDED`;
  recordHistoryAction("Mutate Unlocked Parts");

  if (elements.partLockMutate) {
    elements.partLockMutate.classList.add("is-active");
    setTimeout(() => elements.partLockMutate?.classList.remove("is-active"), 200);
  }
}

async function rerollUnlockedParts() {
  const currentPhrase = (currentScore?.phrase || "").toLowerCase();
  const pool = SURPRISES.filter((s) => s.toLowerCase() !== currentPhrase);
  const nextPhrase = pool[Math.floor(Math.random() * pool.length)] || SURPRISES[0];
  if (elements.phrase) elements.phrase.value = nextPhrase;
  await summon(nextPhrase, { playAudio: true });
}

elements.beatToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "beat"));
  recordHistoryAction("Toggle Beat Mute");
});

elements.beatMutate?.addEventListener("click", () => {
  if (!currentScore || !beatSource) return;
  beatMutation += 1;
  recomposePlate("beat");
  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  recordHistoryAction("Mutate Beat Plate");
});

elements.bassToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "bass"));
  recordHistoryAction("Toggle Bass Mute");
});

elements.bassMutate?.addEventListener("click", () => {
  if (!currentScore || !bassSource) return;
  bassMutation += 1;
  recomposePlate("bass");
  applyEnsembleConductor();
  updateBassGrid();
  recordHistoryAction("Mutate Bass Plate");
});

elements.harmonyToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "harmony"));
  recordHistoryAction("Toggle Harmony Mute");
});

elements.harmonyMutate?.addEventListener("click", () => {
  if (!currentScore || !harmonySource) return;
  harmonyMutation += 1;
  recomposePlate("harmony");
  applyEnsembleConductor();
  updateHarmonyGrid();
  updateBassGrid();
  updateChimeGrid();
  updateChantGrid();
  recordHistoryAction("Mutate Harmony Plate");
});

elements.chimeToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "chime"));
  recordHistoryAction("Toggle Chimes Mute");
});

elements.chimeMutate?.addEventListener("click", () => {
  if (!currentScore || !pietSource || !fractranSource) return;
  chimeMutation += 1;
  recomposePlate("chime");
  applyEnsembleConductor();
  updateChimeGrid();
  recordHistoryAction("Mutate Chimes Plate");
});

elements.chantToggle?.addEventListener("click", () => {
  updateMixer(toggleMute(mixerState, "chant"));
  recordHistoryAction("Toggle Chant Mute");
});

elements.chantMutate?.addEventListener("click", () => {
  if (!currentScore || !chantSource) return;
  chantMutation += 1;
  recomposePlate("chant");
  applyEnsembleConductor();
  updateChantGrid();
  recordHistoryAction("Mutate Chant Plate");
});

elements.mixerReset?.addEventListener("click", () => {
  updateMixer(setMuted(createMixerState(), "harp", true));
  recordHistoryAction("Reset Mixer");
});

elements.partLockMutate?.addEventListener("click", () => mutateUnlockedParts());
elements.partLockReroll?.addEventListener("click", () => rerollUnlockedParts());
elements.partLockToggleAll?.addEventListener("click", () => {
  const counts = countActiveLocks(partLockState);
  partLockState = setAllLocks(partLockState, !counts.isAnyLocked);
  syncPartLockUI();
  recordHistoryAction("Toggle All Locks");
});
elements.partLockVisuals?.addEventListener("click", () => toggleLock("visuals"));
elements.partLockTonality?.addEventListener("click", () => toggleLock("tonality"));

elements.beatLock?.addEventListener("click", () => toggleLock("beat"));
elements.bassLock?.addEventListener("click", () => toggleLock("bass"));
elements.harmonyLock?.addEventListener("click", () => toggleLock("harmony"));
elements.chimeLock?.addEventListener("click", () => toggleLock("chime"));
elements.chantLock?.addEventListener("click", () => toggleLock("chant"));

renderMixerConsole();
syncPlateToggles();


// --- Session ledger: .fun files and on-device presets (P5-20, D-026) -------

function captureSession() {
  return {
    format: SESSION_FORMAT,
    version: SESSION_VERSION,
    engineVersion: ENGINE_VERSION,
    phrase: currentScore.phrase,
    tempo: activeTempoBpm,
    volume: Math.round(masterVolume),
    genre: activeGenre,
    strictness: activeStrictness,
    rootOverride,
    scaleOverride,
    referencePitch: referencePitch(),
    barLock: barLock44,
    gridSteps: activeGridSteps,
    acoustics: {
      enabled: parlorAcousticsEnabled,
      level: Math.round(parlorAcousticsLevel * 100),
      crackle: parlorCrackleEnabled,
      reverb: parlorReverbEnabled,
      ticks: parlorTickEnabled,
    },
    varied: genreVaried,
    funMachine: {
      style: funMachineStyle,
      voice: funVoiceId,
      octave: funMachineOctave,
    },
    song,
    plates: Object.fromEntries(PLATE_IDS.map((id) => [id, {
      mutation: plateMutation(id),
      cellCycles: [...plateCellCycles[id]],
    }])),
    mixer: Object.fromEntries(MIXER_CHANNEL_IDS.map((id) => [id, { ...mixerState.channels[id] }])),
    somatic: {
      sporeHarp: {
        symbiosis: (sporeHarpModel?.symbiosis || "silk").toLowerCase(),
        tension: sporeHarpModel?.tension ?? 1.0,
      },
      muscaria: {
        targetMode: (muscariaModel?.mode || "dormant").toLowerCase(),
        tripDepth: (muscariaModel?.tripDepth || "deep").toLowerCase(),
      },
      theremin: {
        scaleSnap: Boolean(thereminModel?.scaleSnap ?? true),
      },
    },
    recorder: {
      wavBitDepth: 16,
      autoMidi: true,
    },
    herbarium: (() => {
      const herbStore = readHerbariumStore();
      const match = herbStore.specimens.find((s) => s.phrase === currentScore.phrase);
      return {
        pinned: Boolean(match),
        specimen: match ? { ...match } : null,
      };
    })(),
    locks: { ...partLockState },
  };
}

function syncSessionControls() {
  if (elements.kapellmeisterGenre) elements.kapellmeisterGenre.value = activeGenre;
  if (elements.kapellmeisterKeyOverride) {
    elements.kapellmeisterKeyOverride.value = rootOverride === null ? "native" : String(rootOverride);
  }
  if (elements.kapellmeisterScaleOverride) {
    elements.kapellmeisterScaleOverride.value = scaleOverride === null ? "native" : String(scaleOverride);
  }
  if (elements.kapellmeisterTuningA4) {
    elements.kapellmeisterTuningA4.value = String(referencePitch());
  }
  elements.transportBarLock?.setAttribute("aria-pressed", String(barLock44));
  elements.transportBarLock?.classList.toggle("is-active", barLock44);
  elements.transportGridSteps?.setAttribute("aria-pressed", String(activeGridSteps === 16));
  if (elements.transportGridSteps) {
    elements.transportGridSteps.textContent = activeGridSteps === 16 ? "16 STEPS (4/4)" : "12 STEPS (TRIPLET)";
  }
  if (elements.kapellmeisterStrictness) {
    elements.kapellmeisterStrictness.value = String(activeStrictness);
    elements.kapellmeisterStrictness.dispatchEvent(new Event("input"));
  }
  if (elements.parlorAcousticsToggle) {
    elements.parlorAcousticsToggle.setAttribute("aria-pressed", String(parlorAcousticsEnabled));
    elements.parlorAcousticsToggle.textContent = parlorAcousticsEnabled ? "ACOUSTICS: ENGAGED" : "ACOUSTICS: SILENCED";
  }
  if (elements.parlorAcousticsLevel) elements.parlorAcousticsLevel.value = String(Math.round(parlorAcousticsLevel * 100));
  if (elements.acousticsLevelVal) elements.acousticsLevelVal.textContent = `${Math.round(parlorAcousticsLevel * 100)}%`;
  updateAcousticsStatus();
  setFunStyle(funMachineStyle);
  setFunVoice(funVoiceId);
  updateFunOctaveUI();
  if (elements.volume) elements.volume.value = String(Math.round(masterVolume));
}

/**
 * Restores a validated session: summons its phrase, then layers the plates'
 * mutations and cell edits, the punched progression, rulebook, room, tempo,
 * volume, and console on top. A playing transport restarts on the new loop.
 */
function applySession(session) {
  if (!oracleSource) throw new Error("Spell unavailable");
  const score = composeScore(oracleSource, session.phrase);
  activeGenre = session.genre;
  activeStrictness = session.strictness;
  rootOverride = session.rootOverride ?? null;
  scaleOverride = session.scaleOverride ?? null;
  setReferencePitch(session.referencePitch ?? 440);
  barLock44 = Boolean(session.barLock);
  if (session.gridSteps === 12 || session.gridSteps === 16) {
    activeGridSteps = session.gridSteps;
  }
  funMachineStyle = session.funMachine.style;
  funVoiceId = session.funMachine.voice;
  setFunOctave(session.funMachine.octave ?? 0);
  // Files from before variation existed open AS WRITTEN (D-043).
  genreVaried = session.varied;
  // The loop machine's song travels with the session (v4); older files bring none.
  song = session.song;
  selectedLoop = clampSelection(song, song.loops.length - 1);
  recorder = idleRecorder();
  if (currentTransport) currentTransport.followedSlot = null;
  parlorAcousticsEnabled = session.acoustics.enabled;
  parlorAcousticsLevel = session.acoustics.level / 100;
  parlorCrackleEnabled = session.acoustics.crackle;
  parlorReverbEnabled = session.acoustics.reverb;
  parlorTickEnabled = session.acoustics.ticks;
  elements.phrase.value = session.phrase;
  showScore(score);

  beatMutation = session.plates.beat.mutation;
  bassMutation = session.plates.bass.mutation;
  harmonyMutation = session.plates.harmony.mutation;
  chimeMutation = session.plates.chime.mutation;
  chantMutation = session.plates.chant.mutation;
  for (const id of PLATE_IDS) {
    recomposePlate(id);
    session.plates[id].cellCycles.forEach((count, index) => applyCellCycle(id, index, count));
    plateCellCycles[id] = [...session.plates[id].cellCycles];
  }

  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
  setTempoBpm(session.tempo);
  setMasterVolume(session.volume);
  syncSessionControls();
  updateMixer(mixerStateFromChannels(session.mixer));
  renderLooper();

  // Bio-somatic restoration (D-101)
  if (session.somatic) {
    if (session.somatic.sporeHarp) {
      sporeHarpModel.symbiosis = (session.somatic.sporeHarp.symbiosis || "silk").toUpperCase();
      sporeHarpModel.tension = session.somatic.sporeHarp.tension ?? 1.0;
      if (elements.sporeHarpSymbiosis) {
        elements.sporeHarpSymbiosis.textContent = `SYMBIOSIS: ${sporeHarpModel.symbiosis}`;
      }
      if (elements.sporeHarpTension) {
        elements.sporeHarpTension.textContent = `TENSION: ${formatTensionLabel(sporeHarpModel.tension)}`;
      }
      if (elements.sporeHarpTelemetry) {
        elements.sporeHarpTelemetry.textContent = formatSporeHarpTelemetry(sporeHarpModel);
      }
    }
    if (session.somatic.muscaria) {
      // Requirement 1: Load dormant until activated!
      muscariaModel.mode = "DORMANT";
      muscariaModel.tripDepth = (session.somatic.muscaria.tripDepth || "deep").toUpperCase();
      muscariaModel.targetMode = (session.somatic.muscaria.targetMode || "bio_pulse").toUpperCase();
      updateMuscariaUI();
    }
    if (session.somatic.theremin) {
      thereminModel.scaleSnap = Boolean(session.somatic.theremin.scaleSnap ?? true);
      if (elements.thereminScaleSnap) {
        elements.thereminScaleSnap.setAttribute("aria-pressed", String(thereminModel.scaleSnap));
        elements.thereminScaleSnap.textContent = thereminModel.scaleSnap
          ? "SCALE SNAP: ON (QUANTIZED)"
          : "SCALE SNAP: OFF (FREE GLIDE)";
      }
      updateThereminUI(null);
    }
  }

  // Herbarium specimen restoration (D-101)
  if (session.herbarium?.pinned && session.herbarium?.specimen) {
    const herbStore = readHerbariumStore();
    if (!herbStore.specimens.some((s) => s.phrase === session.herbarium.specimen.phrase)) {
      writeHerbariumStore(pinSpecimen(herbStore, session.herbarium.specimen));
      renderHerbarium();
      syncHerbariumButtons();
    }
  }

  // Part lock restoration (P12-01, D-102)
  partLockState = createPartLockState(session.locks || {});
  syncPartLockUI();

  if (transportState.state === TRANSPORT_STATES.PLAYING && !muted) {
    runTransportCommand("restart");
  } else {
    stopCurrentSound();
    transportState = createTransportState();
    syncTransportUI();
    highlightBeatStep(-1);
    updateTransportPosition(null);
  }
}

// localStorage can be missing, full, or blocked (private windows, previews);
// every access is guarded and the ledger still works with files alone.
function readPresetStore() {
  let text;
  try {
    text = window.localStorage.getItem(PRESET_STORAGE_KEY);
  } catch {
    return emptyPresetStore();
  }
  // Throws until src/rulebooks.ni is installed, so nothing reads or rewrites
  // presets with an empty genre list.
  return parsePresetStore(text);
}

function writePresetStore(store) {
  try {
    if (store.presets.length) {
      return writePresetStoreTo(window.localStorage, store);
    }
    window.localStorage.removeItem(PRESET_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

function setSessionTelemetry(text) {
  if (elements.sessionTelemetry) elements.sessionTelemetry.textContent = text;
  elements.status.textContent = text;
}

function renderPresetList(selectName = null) {
  const list = elements.sessionPresetList;
  if (!list || !rulebooksInstalled()) return;
  const { presets } = readPresetStore();
  list.replaceChildren();
  if (!presets.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "— NO PRESETS IN THIS BROWSER —";
    list.append(option);
  }
  for (const preset of presets) {
    const option = document.createElement("option");
    option.value = preset.name;
    option.textContent = `${preset.name} · ${preset.session.phrase}`;
    list.append(option);
  }
  if (selectName) list.value = selectName;
  list.disabled = !presets.length;
  syncSessionButtons();
}

function syncSessionButtons() {
  const ready = Boolean(currentScore);
  if (!rulebooksInstalled()) {
    if (elements.sessionSavePreset) elements.sessionSavePreset.disabled = !ready;
    if (elements.sessionUpdatePreset) elements.sessionUpdatePreset.disabled = true;
    if (elements.sessionLoadPreset) elements.sessionLoadPreset.disabled = true;
    if (elements.sessionClonePreset) elements.sessionClonePreset.disabled = true;
    if (elements.sessionRenamePreset) elements.sessionRenamePreset.disabled = true;
    if (elements.sessionDeletePreset) elements.sessionDeletePreset.disabled = true;
    if (elements.sessionSaveFile) elements.sessionSaveFile.disabled = !ready;
    if (elements.sessionExportBank) elements.sessionExportBank.disabled = true;
    return;
  }
  const store = readPresetStore();
  const hasPresets = Boolean(store.presets.length);
  const hasSelected = Boolean(elements.sessionPresetList?.value);

  if (elements.sessionSavePreset) elements.sessionSavePreset.disabled = !ready;
  if (elements.sessionUpdatePreset) elements.sessionUpdatePreset.disabled = !ready || !hasSelected;
  if (elements.sessionLoadPreset) elements.sessionLoadPreset.disabled = !hasSelected;
  if (elements.sessionClonePreset) elements.sessionClonePreset.disabled = !hasSelected;
  if (elements.sessionRenamePreset) elements.sessionRenamePreset.disabled = !hasSelected;
  if (elements.sessionDeletePreset) elements.sessionDeletePreset.disabled = !hasSelected;
  if (elements.sessionSaveFile) elements.sessionSaveFile.disabled = !ready;
  if (elements.sessionExportBank) elements.sessionExportBank.disabled = !hasPresets;
}

elements.sessionPresetList?.addEventListener("change", syncSessionButtons);

function describeSessionError(error) {
  return error?.name === "SessionError" ? error.path.replace(/^session\.?/, "").toUpperCase() || "FILE" : "UNREADABLE";
}

elements.sessionSavePreset?.addEventListener("click", () => {
  if (!currentScore) return;
  const name = elements.sessionPresetName?.value.trim() || currentScore.name.slice(0, 40);
  try {
    const store = upsertPreset(readPresetStore(), name, captureSession(), new Date().toISOString());
    if (!writePresetStore(store)) {
      setSessionTelemetry("BROWSER STORAGE UNAVAILABLE · SAVE A .FUN FILE INSTEAD");
      return;
    }
    renderPresetList(store.presets[0].name);
    setSessionTelemetry(`PRESET SAVED IN THIS BROWSER · ${store.presets[0].name.toUpperCase()}`);
  } catch (error) {
    setSessionTelemetry(`PRESET NOT SAVED · ${describeSessionError(error)}`);
  }
});

// Instant overwrite (D-101)
elements.sessionUpdatePreset?.addEventListener("click", () => {
  if (!currentScore) return;
  const name = elements.sessionPresetList?.value;
  if (!name) return;
  try {
    const store = upsertPreset(readPresetStore(), name, captureSession(), new Date().toISOString(), { overwrite: true });
    if (!writePresetStore(store)) {
      setSessionTelemetry("BROWSER STORAGE UNAVAILABLE · SAVE A .FUN FILE INSTEAD");
      return;
    }
    renderPresetList(name);
    setSessionTelemetry(`PRESET UPDATED IN THIS BROWSER · ${name.toUpperCase()}`);
  } catch (error) {
    setSessionTelemetry(`PRESET NOT UPDATED · ${describeSessionError(error)}`);
  }
});

elements.sessionLoadPreset?.addEventListener("click", () => {
  const name = elements.sessionPresetList?.value;
  const preset = readPresetStore().presets.find((entry) => entry.name === name);
  if (!preset) {
    renderPresetList();
    return;
  }
  try {
    applySession(preset.session);
    recordHistoryAction(`Load Preset: ${preset.name}`);
    const engineWarning = preset.session.engineVersion !== ENGINE_VERSION
      ? ` · WARNING: ENGINE v${preset.session.engineVersion} ≠ CURRENT v${ENGINE_VERSION}`
      : "";
    setSessionTelemetry(`PRESET LOADED · ${preset.name.toUpperCase()}${engineWarning}`);
  } catch (error) {
    console.error(error);
    setSessionTelemetry("PRESET COULD NOT BE LOADED");
  }
});

// Clone / Duplicate preset (D-101)
elements.sessionClonePreset?.addEventListener("click", () => {
  const sourceName = elements.sessionPresetList?.value;
  if (!sourceName) return;
  const newName = window.prompt("Duplicate preset name:", `${sourceName} Copy`);
  if (!newName) return;
  try {
    const store = duplicatePreset(readPresetStore(), sourceName, newName);
    if (!writePresetStore(store)) {
      setSessionTelemetry("BROWSER STORAGE UNAVAILABLE · CANNOT CLONE PRESET");
      return;
    }
    renderPresetList(newName.trim());
    setSessionTelemetry(`PRESET DUPLICATED · ${newName.trim().toUpperCase()}`);
  } catch (error) {
    setSessionTelemetry(`PRESET NOT CLONED · ${describeSessionError(error)}`);
  }
});

// Rename preset (D-101)
elements.sessionRenamePreset?.addEventListener("click", () => {
  const oldName = elements.sessionPresetList?.value;
  if (!oldName) return;
  const newName = window.prompt("Rename preset:", oldName);
  if (!newName || newName.trim() === oldName) return;
  try {
    const store = renamePreset(readPresetStore(), oldName, newName.trim());
    if (!writePresetStore(store)) {
      setSessionTelemetry("BROWSER STORAGE UNAVAILABLE · CANNOT RENAME PRESET");
      return;
    }
    renderPresetList(newName.trim());
    setSessionTelemetry(`PRESET RENAMED · ${newName.trim().toUpperCase()}`);
  } catch (error) {
    setSessionTelemetry(`PRESET NOT RENAMED · ${describeSessionError(error)}`);
  }
});

elements.sessionDeletePreset?.addEventListener("click", () => {
  const name = elements.sessionPresetList?.value;
  if (!name || !window.confirm(`Delete the preset "${name}" from this browser?`)) return;
  if (writePresetStore(removePreset(readPresetStore(), name))) {
    renderPresetList();
    setSessionTelemetry(`PRESET DELETED · ${name.toUpperCase()}`);
  }
});

elements.sessionSaveFile?.addEventListener("click", () => {
  if (!currentScore) return;
  try {
    const text = serializeSession(captureSession());
    downloadBlob(new Blob([text], { type: "application/json" }), specimenFilenameFor(currentScore, SESSION_FILE_EXTENSION));
    setSessionTelemetry("SESSION SEALED INTO A .FUN FILE");
  } catch (error) {
    setSessionTelemetry(`SESSION NOT SAVED · ${describeSessionError(error)}`);
  }
});

elements.sessionOpenFile?.addEventListener("click", () => {
  elements.sessionFileInput?.click();
});

elements.sessionFileInput?.addEventListener("change", async () => {
  const input = elements.sessionFileInput;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  if (file.size > MAX_SESSION_BYTES) {
    setSessionTelemetry("SESSION REJECTED · FILE TOO LARGE");
    return;
  }
  try {
    const parsed = parseSession(await file.text());
    applySession(parsed);
    recordHistoryAction(`Open Session: ${file.name}`);
    const engineWarning = parsed.engineVersion !== ENGINE_VERSION
      ? ` · WARNING: ENGINE v${parsed.engineVersion} ≠ CURRENT v${ENGINE_VERSION}`
      : "";
    setSessionTelemetry(`SESSION RESTORED FROM .FUN FILE${engineWarning}`);
  } catch (error) {
    if (error?.name !== "SessionError") console.error(error);
    setSessionTelemetry(`SESSION REJECTED · ${describeSessionError(error)}`);
  }
});

// Export Preset Bank (.funbank, D-101)
elements.sessionExportBank?.addEventListener("click", () => {
  const store = readPresetStore();
  if (!store.presets.length) return;
  try {
    const text = serializePresetBank(store);
    downloadBlob(new Blob([text], { type: "application/json" }), `whimsy-bank-${new Date().toISOString().slice(0, 10)}.${BANK_FILE_EXTENSION}`);
    setSessionTelemetry(`PRESET BANK EXPORTED · ${store.presets.length} PRESETS`);
  } catch (error) {
    setSessionTelemetry(`BANK EXPORT FAILED · ${describeSessionError(error)}`);
  }
});

// Open Preset Bank (.funbank, D-101)
elements.sessionOpenBank?.addEventListener("click", () => {
  elements.sessionBankInput?.click();
});

elements.sessionBankInput?.addEventListener("change", async () => {
  const input = elements.sessionBankInput;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  if (file.size > MAX_BANK_BYTES) {
    setSessionTelemetry("BANK REJECTED · FILE TOO LARGE");
    return;
  }
  try {
    const text = await file.text();
    // User confirmed decision: Ask whether to merge or replace!
    const merge = window.confirm(
      "Merge presets into this browser?\n\n• Click OK to MERGE (add new presets alongside existing ones)\n• Click Cancel to REPLACE ALL existing presets with this bank"
    );
    const updatedStore = parsePresetBank(text, {
      mergeMode: merge ? "merge" : "replace",
      existingStore: readPresetStore(),
    });
    if (!writePresetStore(updatedStore)) {
      setSessionTelemetry("BROWSER STORAGE UNAVAILABLE · CANNOT STORE BANK");
      return;
    }
    renderPresetList(updatedStore.presets[0]?.name);
    setSessionTelemetry(`BANK INSTALLED · ${updatedStore.presets.length} PRESETS (${merge ? "MERGED" : "REPLACED"})`);
  } catch (error) {
    if (error?.name !== "SessionError") console.error(error);
    setSessionTelemetry(`BANK REJECTED · ${describeSessionError(error)}`);
  }
});

// --- Keep Wing Segmented Decks (P8-16, D-082) -------------------------------

function readKeepDeck() {
  try {
    return window.localStorage.getItem("whimsy-machine.keep-deck");
  } catch {
    return null;
  }
}

function writeKeepDeck(deckId) {
  try {
    window.localStorage.setItem("whimsy-machine.keep-deck", deckId);
  } catch {
    // Local storage disabled or quota full
  }
}

function initKeepDeckTabs() {
  const tabs = [
    { id: "export", tab: elements.keepTabExport, engine: elements.exportEngine },
    { id: "session", tab: elements.keepTabSession, engine: elements.sessionEngine },
    { id: "studio", tab: elements.keepTabStudio, engine: elements.studioEngine },
    { id: "herbarium", tab: elements.keepTabHerbarium, engine: elements.herbariumEngine },
  ];
  let activeDeck = "export";
  const saved = readKeepDeck();
  if (saved && tabs.some((t) => t.id === saved)) activeDeck = saved;

  function selectDeck(deckId) {
    activeDeck = deckId;
    writeKeepDeck(deckId);
    for (const { id, tab, engine } of tabs) {
      if (!tab || !engine) continue;
      const isMatch = id === deckId;
      tab.classList.toggle("is-active", isMatch);
      tab.setAttribute("aria-selected", String(isMatch));
      engine.hidden = !isMatch;
    }
  }

  for (const { id, tab } of tabs) {
    if (!tab) continue;
    tab.addEventListener("click", () => selectDeck(id));
  }
  selectDeck(activeDeck);
}

initKeepDeckTabs();

// --- The Naturalist's Herbarium curio gallery (P5-35, D-070) ----------------

function readHerbariumStore() {
  try {
    return readHerbariumStoreFrom(window.localStorage);
  } catch {
    return emptyHerbariumStore();
  }
}

function writeHerbariumStore(store) {
  try {
    return writeHerbariumStoreTo(window.localStorage, store);
  } catch {
    return false;
  }
}

function setHerbariumTelemetry(text) {
  if (elements.herbariumTelemetry) elements.herbariumTelemetry.textContent = text;
  elements.status.textContent = text;
}

function syncHerbariumButtons() {
  const ready = Boolean(currentScore);
  const store = readHerbariumStore();
  const pinned = ready && isSpecimenPinned(store, currentScore);
  if (elements.herbariumPinBtn) {
    elements.herbariumPinBtn.disabled = !ready;
    elements.herbariumPinBtn.textContent = pinned ? "SPECIMEN PINNED IN HERBARIUM ✦" : "PIN CURRENT SPECIMEN ✦";
  }
}

function createHerbariumMiniatureSvg(specimen) {
  const mini = specimenMiniatureData(specimen, 56);
  const svgNS = elements.compassReg0?.ownerSVGElement?.namespaceURI;
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${mini.size} ${mini.size}`);
  svg.setAttribute("class", "herbarium-miniature");
  svg.setAttribute("aria-hidden", "true");

  const ring = document.createElementNS(svgNS, "circle");
  ring.setAttribute("cx", String(mini.center));
  ring.setAttribute("cy", String(mini.center));
  ring.setAttribute("r", String(mini.size * 0.44));
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", mini.palette.accentColor);
  ring.setAttribute("stroke-opacity", "0.35");
  ring.setAttribute("stroke-width", "1");

  const poly = document.createElementNS(svgNS, "polygon");
  poly.setAttribute("points", mini.points);
  poly.setAttribute("fill", mini.palette.coreColor);
  poly.setAttribute("fill-opacity", "0.42");
  poly.setAttribute("stroke", mini.palette.highlightColor);
  poly.setAttribute("stroke-width", "1.4");

  const pupil = document.createElementNS(svgNS, "circle");
  pupil.setAttribute("cx", String(mini.center));
  pupil.setAttribute("cy", String(mini.center));
  pupil.setAttribute("r", "2.6");
  pupil.setAttribute("fill", mini.palette.highlightColor);

  svg.append(ring, poly, pupil);
  return svg;
}

function renderHerbarium() {
  const store = readHerbariumStore();
  const { specimens } = store;
  if (elements.herbariumTelemetry) {
    elements.herbariumTelemetry.textContent = `${specimens.length} SPECIMEN${specimens.length === 1 ? "" : "S"} PINNED · VALIDATED CURIO DRAWER`;
  }
  if (elements.herbariumCards) {
    elements.herbariumCards.replaceChildren();
    if (!specimens.length) {
      const empty = document.createElement("p");
      empty.className = "looper-empty herbarium-empty";
      empty.textContent = "NO SPECIMENS PINNED YET · SUMMON AN OMEN AND PIN IT TO YOUR HERBARIUM";
      elements.herbariumCards.append(empty);
    } else {
      for (const spec of specimens) {
        const card = document.createElement("div");
        card.className = "herbarium-card";
        card.setAttribute("role", "listitem");
        card.dataset.seed = String(spec.seed);
        if (currentScore && (currentScore.seed === spec.seed || currentScore.phrase === spec.phrase)) {
          card.classList.add("is-active");
        }

        const svg = createHerbariumMiniatureSvg(spec);

        const body = document.createElement("div");
        body.className = "herbarium-card-body";
        const nameEl = document.createElement("p");
        nameEl.className = "herbarium-card-name";
        nameEl.textContent = spec.name;
        const phraseEl = document.createElement("p");
        phraseEl.className = "herbarium-card-phrase";
        phraseEl.textContent = `"${spec.phrase}"`;
        const metaEl = document.createElement("p");
        metaEl.className = "herbarium-card-meta";
        metaEl.textContent = `${spec.folioId} · ${spec.shapeName} · ${spec.pulse} BPM · ${WAVEFORMS[spec.wave] || "SINE"}`;
        body.append(nameEl, phraseEl, metaEl);

        const actions = document.createElement("div");
        actions.className = "herbarium-card-actions";
        const summonBtn = document.createElement("button");
        summonBtn.type = "button";
        summonBtn.className = "herbarium-card-btn";
        summonBtn.textContent = "SUMMON";
        summonBtn.addEventListener("click", () => {
          elements.phrase.value = spec.phrase;
          summon(spec.phrase);
        });
        const unpinBtn = document.createElement("button");
        unpinBtn.type = "button";
        unpinBtn.className = "herbarium-card-btn";
        unpinBtn.textContent = "UNPIN";
        unpinBtn.addEventListener("click", () => {
          const next = unpinSpecimen(readHerbariumStore(), spec.seed);
          writeHerbariumStore(next);
          renderHerbarium();
          syncHerbariumButtons();
          setHerbariumTelemetry(`SPECIMEN UNPINNED · ${spec.name}`);
        });
        actions.append(summonBtn, unpinBtn);

        card.append(svg, body, actions);
        elements.herbariumCards.append(card);
      }
    }
  }

  for (const [idx, select] of [elements.herbariumCompareLeft, elements.herbariumCompareRight].entries()) {
    if (!select) continue;
    const prevValue = select.value;
    select.replaceChildren();
    if (specimens.length < 2) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = `— SPECIMEN ${idx === 0 ? "A" : "B"} —`;
      select.append(opt);
      select.disabled = true;
    } else {
      for (const spec of specimens) {
        const opt = document.createElement("option");
        opt.value = String(spec.seed);
        opt.textContent = `${spec.name} (${spec.folioId})`;
        select.append(opt);
      }
      select.disabled = false;
      if (prevValue && specimens.some((s) => String(s.seed) === prevValue)) {
        select.value = prevValue;
      } else {
        select.value = String(specimens[idx]?.seed ?? specimens[0].seed);
      }
    }
  }
  if (elements.herbariumCompareBtn) {
    elements.herbariumCompareBtn.disabled = specimens.length < 2;
  }
  if (specimens.length < 2 && elements.herbariumComparison) {
    elements.herbariumComparison.hidden = true;
    elements.herbariumComparison.replaceChildren();
  }
}

function renderHerbariumComparison() {
  if (!elements.herbariumComparison) return;
  const store = readHerbariumStore();
  const leftSeed = Number(elements.herbariumCompareLeft?.value);
  const rightSeed = Number(elements.herbariumCompareRight?.value);
  const left = store.specimens.find((s) => s.seed === leftSeed);
  const right = store.specimens.find((s) => s.seed === rightSeed);
  if (!left || !right) {
    elements.herbariumComparison.hidden = true;
    return;
  }
  const report = compareSpecimens(left, right);
  elements.herbariumComparison.replaceChildren();

  const summary = document.createElement("p");
  summary.className = "herbarium-compare-summary";
  summary.textContent = `${left.name} vs. ${right.name} · ${report.summary}`;
  elements.herbariumComparison.append(summary);

  for (const row of report.rows) {
    const rowEl = document.createElement("div");
    rowEl.className = `herbarium-compare-row${row.match ? " is-match" : ""}`;
    const leftCell = document.createElement("span");
    leftCell.className = "herbarium-compare-val is-left";
    leftCell.textContent = row.leftValue;
    const labelCell = document.createElement("span");
    labelCell.className = "herbarium-compare-label";
    labelCell.textContent = `${row.label} (${row.delta})`;
    const rightCell = document.createElement("span");
    rightCell.className = "herbarium-compare-val is-right";
    rightCell.textContent = row.rightValue;
    rowEl.append(leftCell, labelCell, rightCell);
    elements.herbariumComparison.append(rowEl);
  }
  elements.herbariumComparison.hidden = false;
}

elements.herbariumPinBtn?.addEventListener("click", () => {
  if (!currentScore) return;
  try {
    const store = pinSpecimen(readHerbariumStore(), currentScore, new Date().toISOString());
    if (!writeHerbariumStore(store)) {
      setHerbariumTelemetry("BROWSER STORAGE UNAVAILABLE · CANNOT PIN SPECIMEN");
      return;
    }
    unlockDrawer("change");
    renderHerbarium();
    syncHerbariumButtons();
    setHerbariumTelemetry(`SPECIMEN PINNED TO HERBARIUM · ${currentScore.name}`);
  } catch {
    setHerbariumTelemetry("SPECIMEN REJECTED BY HERBARIUM BOUNDARY");
  }
});

elements.herbariumCompareBtn?.addEventListener("click", () => {
  renderHerbariumComparison();
});

elements.herbariumCompareLeft?.addEventListener("change", () => {
  if (elements.herbariumComparison && !elements.herbariumComparison.hidden) {
    renderHerbariumComparison();
  }
});

elements.herbariumCompareRight?.addEventListener("change", () => {
  if (elements.herbariumComparison && !elements.herbariumComparison.hidden) {
    renderHerbariumComparison();
  }
});

renderHerbarium();
syncHerbariumButtons();

// ---------------------------------------------------------------------------
// Discovery and the whole cabinet (D-037). Each drawer target keeps its own
// markup and ids; at load its contents move into a drawer body behind a bar
// with a name, a one-line invitation, and a toggle. Hidden bodies leave the
// tab order and the accessibility tree. Without this script every drawer
// stays open, so nothing becomes unreachable.

let cabinetState = readCabinetState();
let loopsHeard = 0;
const drawerElements = {};

function readCabinetState() {
  try {
    return parseCabinetState(window.localStorage.getItem(CABINET_STORAGE_KEY));
  } catch {
    return defaultCabinetState();
  }
}

function writeCabinetState() {
  try {
    window.localStorage.setItem(CABINET_STORAGE_KEY, serializeCabinetState(cabinetState));
  } catch {
    // Storage can be blocked; the cabinet still works for this visit.
  }
}

function buildDrawers() {
  for (const drawer of DRAWERS) {
    const host = document.getElementById(drawer.target);
    if (!host) continue;
    const header = host.classList.contains("workstation-wing") ? host.querySelector(":scope > .wing-header") : null;
    const body = document.createElement("div");
    body.className = "drawer-body";
    body.id = `drawer-body-${drawer.id}`;
    body.append(...[...host.children].filter((child) => child !== header));
    body.addEventListener("animationend", () => body.classList.remove("is-newly-open"));

    const bar = document.createElement("div");
    bar.className = "drawer-bar";
    const invite = document.createElement("p");
    invite.className = "drawer-invite";
    const name = document.createElement("b");
    name.textContent = drawer.label;
    const line = document.createElement("span");
    invite.append(name, line);
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "drawer-toggle";
    toggle.setAttribute("aria-controls", body.id);
    toggle.addEventListener("click", () => applyCabinet(cabinetReduce(cabinetState, { type: "toggle", drawer: drawer.id })));
    bar.append(invite, toggle);

    host.append(bar, body);
    drawerElements[drawer.id] = { host, bar, body, toggle, line };
  }
  const toggle = elements.cabinetModeToggle;
  toggle?.addEventListener("click", () => {
    const mode = cabinetState.mode === "cabinet" ? "discovery" : "cabinet";
    applyCabinet(cabinetReduce(cabinetState, { type: "mode", mode }));
    announceCabinet(mode === "cabinet" ? "THE WHOLE CABINET IS OPEN" : "BACK TO DISCOVERY · THE DRAWERS OPEN AS YOU PLAY");
  });
  elements.cabinetSwitch?.removeAttribute("hidden");
}

function renderCabinet() {
  const whole = cabinetState.mode === "cabinet";
  for (const drawer of DRAWERS) {
    const refs = drawerElements[drawer.id];
    if (!refs) continue;
    const open = isDrawerOpen(cabinetState, drawer.id);
    refs.body.hidden = !open;
    refs.bar.hidden = whole;
    refs.host.classList.toggle("is-sealed", !open);
    refs.toggle.setAttribute("aria-expanded", String(open));
    refs.toggle.textContent = open ? `CLOSE ${drawer.label}` : `OPEN ${drawer.label}`;
    refs.line.textContent = open ? " · OPEN" : ` · ${drawer.invite.toUpperCase()}`;
  }
  const toggle = elements.cabinetModeToggle;
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(whole));
    toggle.textContent = whole ? "RETURN TO DISCOVERY" : "OPEN THE WHOLE CABINET";
  }
  const text = elements.cabinetSwitchText;
  if (text) text.textContent = whole ? "THE WHOLE CABINET · EVERY DRAWER LAID BARE" : "DISCOVERY · THE DRAWERS OPEN AS YOU PLAY";
}

function announceCabinet(message) {
  const announcer = elements.cabinetAnnouncer;
  if (announcer) announcer.textContent = message;
}

function applyCabinet({ state, opened }) {
  if (state === cabinetState) return;
  cabinetState = state;
  writeCabinetState();
  renderCabinet();
  if (opened) {
    const drawer = DRAWERS.find((entry) => entry.id === opened);
    drawerElements[opened]?.body.classList.add("is-newly-open");
    announceCabinet(`THE ${drawer.label} DRAWER OPENS`);
  }
}

function unlockDrawer(trigger) {
  const drawer = drawerForTrigger(trigger);
  if (drawer) applyCabinet(cabinetReduce(cabinetState, { type: "unlock", drawer }));
}

function noteLoopHeard() {
  loopsHeard += 1;
  unlockDrawer("loop");
  if (loopsHeard >= LOOPS_BEFORE_BAND) unlockDrawer("band");
}

// Anything worth keeping (a rulebook, a fader, a plate edit, an
// accompaniment style) opens the Keep drawer; soloing or silencing a voice
// opens the band.
const KEEPSAKE_AREAS = "#kapellmeister-engine, #wing-mix, #wing-band, .fun-quality-chips";
function noteVisitorChange(event) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest(".drawer-toggle, #cabinet-switch")) return;
  if (target.closest(KEEPSAKE_AREAS)) unlockDrawer("change");
  if (event.type === "click" && target.closest("#mixer-strips button, #bandstand-engine button")) unlockDrawer("band");
}
for (const type of ["input", "change", "click"]) document.addEventListener(type, noteVisitorChange);

buildDrawers();
renderCabinet();

// ---------------------------------------------------------------------------
// Compact Parlor Console & Grand Workbench View Modes (P12-04, D-103)

let viewMode = readViewMode();

function readViewMode() {
  try {
    return parseViewMode(window.localStorage.getItem(VIEW_MODE_STORAGE_KEY));
  } catch {
    return DEFAULT_VIEW_MODE;
  }
}

function writeViewMode(mode) {
  try {
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  } catch {
    // Storage can be blocked; view mode still works for this visit.
  }
}

function applyViewMode(mode) {
  viewMode = mode;
  writeViewMode(mode);
  const isSalon = isSalonMode(mode);
  const cabinet = document.querySelector(".oracle-cabinet");
  if (cabinet) {
    cabinet.classList.toggle("is-salon-view", isSalon);
    cabinet.classList.toggle("is-workbench-view", !isSalon);
  }
  if (elements.viewModeToggle) {
    elements.viewModeToggle.setAttribute("aria-pressed", String(!isSalon));
    elements.viewModeToggle.setAttribute("title", isSalon ? "Switch to Grand Workbench [Hotkey V]" : "Switch to Parlor Salon [Hotkey V]");
  }
  if (elements.viewModeText) {
    elements.viewModeText.textContent = viewModeLabel(mode);
  }
  if (elements.workbenchUnfold) {
    elements.workbenchUnfold.setAttribute("aria-expanded", String(!isSalon));
  }
  const labels = unfoldButtonLabels(mode);
  if (elements.unfoldIcon) elements.unfoldIcon.textContent = labels.icon;
  if (elements.unfoldText) elements.unfoldText.textContent = labels.text;
  if (elements.unfoldHint) elements.unfoldHint.textContent = labels.hint;

  // Accessibility: mark deep machinery inert/aria-hidden in salon mode
  for (const id of ["wing-mix", "wing-band", "wing-keep", "kapellmeister-engine", "looper", "somatic-rack"]) {
    const el = document.getElementById(id);
    if (el) {
      if (isSalon) {
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("aria-hidden");
      }
    }
  }
}

elements.viewModeToggle?.addEventListener("click", () => {
  applyViewMode(toggleViewMode(viewMode));
});
elements.workbenchUnfold?.addEventListener("click", () => {
  applyViewMode(toggleViewMode(viewMode));
});

applyViewMode(viewMode);

// ---------------------------------------------------------------------------
// The loop machine (D-039, P5-26). `song` is the visitor's arrangement of
// recorded takes, kept across summons; the recorder turns held keys into a
// take one step at a time, from the same moment the live accompanist reads.

let song = emptySong();
let recorder = idleRecorder();
let selectedLoop = null;
let selectedStepIndex = null;
let isStepRecActive = false;
const performanceCache = new Map();

function performanceFor(slot, pass = null, position = currentTransport?.songPosition ?? null) {
  const tonic = currentScore ? currentScore.root : 0;
  const isSection = slot.style === "intro" || slot.style === "bridge" || slot.style === "outro";
  const sectionPass = isSection && pass === null ? sectionPassForLoop(song, position?.loopIndex, position?.repeat) : null;
  const effectivePass = pass !== null ? pass : (sectionPass !== null ? sectionPass : currentHarmonicPass);
  const slotOct = slot.octave ?? 0;
  const key = `${slot.key}:${slotOct}:${slot.style}:${activeGenre}:${tonic}:${effectivePass}:${genreVaried}:${currentScore?.seed}:${activeGridSteps}`;
  if (!performanceCache.has(key)) performanceCache.set(key, performanceOf(slot.key, slot.style, effectivePass, activeGridSteps, slotOct));
  return performanceCache.get(key);
}

/**
 * A key's performance on this pass of the harmonic cycle (D-044), varied by
 * this creature unless AS WRITTEN is pressed (D-043).
 */
function performanceOf(rawKey, style, pass = null, steps = activeGridSteps, octave = null) {
  const key = rawKey + ((octave !== null ? octave : funMachineOctave) * 12);
  if (pass !== null) {
    return buildPerformance(key, style, activeGenre, currentScore ? currentScore.root : 0, {
      pass,
      score: currentScore,
      varied: genreVaried,
      stepsCount: steps,
    });
  }
  return buildPerformance(key, style, activeGenre, currentScore ? currentScore.root : 0, {
    pass: currentHarmonicPass,
    score: currentScore,
    varied: genreVaried,
    stepsCount: steps,
  });
}

/**
 * Which pass of the harmonic cycle (D-044) an absolute step falls in. A song
 * restarts the cycle with itself, so its first loop always opens on home.
 */
function harmonicPassAt(absoluteStep, steps = activeGridSteps) {
  const pos = songPosition(song, absoluteStep, steps);
  if (pos && activeHeldFunKey === null) {
    const secPass = sectionPassForLoop(song, pos.loopIndex, pos.repeat);
    if (secPass !== null) return secPass;
  }
  const passes = songPasses(song);
  const pass = Math.floor(absoluteStep / steps);
  const cycle = Math.max(passes || 0, HARMONIC_PASSES);
  return ((pass % cycle) % HARMONIC_PASSES + HARMONIC_PASSES) % HARMONIC_PASSES;
}

/**
 * Moves the band to `pass` of the harmonic cycle at a loop boundary: a held
 * key's progression and the band take that pass's chord, and a recorded
 * leader is followed afresh.
 */
function enterHarmonicPass(transport, pass) {
  if (pass === currentHarmonicPass) return false;
  currentHarmonicPass = pass;
  if (transport) transport.followedSlot = "harmonic-pass";
  if (activeHeldFunKey !== null && activeFunPerformance) {
    activeFunPerformance = performanceOf(activeHeldFunKey, funMachineStyle);
    applyEnsembleConductor(activeFunPerformance.steps.map((step) => step.chord));
  } else {
    applyEnsembleConductor();
  }
  return true;
}

function announceLooper(message) {
  const announcer = elements.looperAnnouncer;
  if (announcer) announcer.textContent = message;
}

function advanceRecorder(stepIndex, position, liveSlot) {
  if (recorder.mode === "idle") return;
  const wasArmed = recorder.mode === "armed";
  const result = recorderReduce(recorder, { type: "step", step: stepIndex, loopIndex: position?.loopIndex ?? null, held: liveSlot });
  recorder = result.recorder;
  if (wasArmed && recorder.mode === "recording") {
    announceLooper(recorder.kind === "new" ? "RECORDING A NEW LOOP" : `OVERDUBBING LOOP ${recorder.loopIndex + 1}`);
  }
  if (result.finished) {
    const landedIndex = landTake(result.finished);
    if (landedIndex !== null && currentTransport) {
      currentTransport.activeTakeLanding = {
        loopIndex: landedIndex,
        layerIndex: (song.loops[landedIndex]?.layers.length ?? 1) - 1,
      };
    }
  }
  renderLooper();
}

function landTake({ kind, loopIndex, take }) {
  if (isEmptyTake(take)) {
    announceLooper("NO KEY WAS HELD · THE TAKE WAS DISCARDED");
    return null;
  }
  const next = kind === "new" ? appendLoop(song, take) : overdubLayer(song, loopIndex, take);
  if (next === song) {
    announceLooper(kind === "new" ? "THE SONG IS FULL" : "THAT LOOP ALREADY HAS FOUR LAYERS");
    return null;
  }
  song = next;
  selectedLoop = kind === "new" ? song.loops.length - 1 : loopIndex;
  announceLooper(kind === "new" ? `LOOP ${song.loops.length} ADDED TO THE SONG` : `LAYER ADDED TO LOOP ${loopIndex + 1}`);
  unlockDrawer("change");
  recordHistoryAction(kind === "new" ? `Record Loop ${song.loops.length}` : `Record Layer in Loop ${loopIndex + 1}`);
  return selectedLoop;
}

// The band follows a live key (conducted when the key goes down), else the
// newest recorded layer holding a key at this step, else its own score.
function followSong(transport, loop, stepIndex, liveSlot) {
  const stepPass = typeof transport.step === "number" ? Math.floor(transport.step / 12) : 0;
  const casioSectionPass = scheduledCasio !== null ? stepPass - scheduledCasio.startPass : -1;
  const isCasioActive = scheduledCasio !== null && casioSectionPass >= 0 && casioSectionPass < scheduledCasio.passes;
  if (isCasioActive && transport === currentTransport && scheduledCasio.performance) {
    transport.songLeading = true;
    const followed = `casio:${scheduledCasio.role}:${casioSectionPass}`;
    if (followed === transport.followedSlot) return;
    transport.followedSlot = followed;
    applyEnsembleConductor(scheduledCasio.performance.steps.map((step) => step.chord));
    return;
  }
  if (liveSlot) {
    transport.songLeading = false;
    transport.followedSlot = "live";
    return;
  }
  if (recorder.mode === "recording" && recorder.kind === "new") {
    transport.songLeading = false;
    if (transport.followedSlot !== null) {
      transport.followedSlot = null;
      applyEnsembleConductor();
    }
    return;
  }
  const lead = leadSlotAt(loop, stepIndex);
  transport.songLeading = Boolean(lead);
  const pos = transport.songPosition ?? null;
  const perf = lead ? performanceFor(lead, null, pos) : null;
  const followed = lead
    ? `${lead.key}:${lead.style}:${activeGenre}:${currentHarmonicPass}:${pos?.loopIndex ?? -1}:${pos?.repeat ?? -1}:${genreVaried}:${currentScore?.seed}`
    : `raw:${activeGenre}:${currentHarmonicPass}:${genreVaried}:${currentScore?.seed}`;
  if (followed === transport.followedSlot) return;
  transport.followedSlot = followed;
  if (perf) applyEnsembleConductor(perf.steps.map((step) => step.chord));
  else applyEnsembleConductor(null);
}

function armRecorder(kind) {
  if (!currentScore) {
    announceLooper("SUMMON A CREATURE FIRST");
    return;
  }
  if (recorder.mode !== "idle" && recorder.kind === kind) {
    recorder = idleRecorder();
    announceLooper("RECORDING CANCELLED");
    renderLooper();
    return;
  }
  if (kind === "new" && !canAppendLoop(song)) {
    announceLooper("THE SONG IS FULL");
    return;
  }
  if (kind === "overdub" && !canOverdub(song, selectedLoop)) {
    announceLooper(song.loops.length ? "THAT LOOP ALREADY HAS FOUR LAYERS" : "RECORD A LOOP FIRST");
    return;
  }

  const isStopped = transportState.state !== TRANSPORT_STATES.PLAYING;
  const currentAudible = currentTransport && !isStopped ? ((currentTransport.audibleStep % 12) + 12) % 12 : 0;
  const stepsRemaining = (12 - currentAudible) % 12 || 12;
  const countIn = isStopped ? LOOP_STEPS : (stepsRemaining + LOOP_STEPS);

  isStepRecActive = false;
  selectedStepIndex = null;
  recorder = recorderReduce(
    idleRecorder(),
    kind === "new"
      ? { type: "arm", kind, countIn }
      : { type: "arm", kind, loopIndex: selectedLoop, countIn }
  ).recorder;

  announceLooper(
    isStopped
      ? "ARMED · 12-STEP COUNT-IN STARTS ON STEP 1"
      : `ARMED · COUNT-IN STARTS ON NEXT DOWNBEAT (IN ${stepsRemaining} STEPS)`
  );
  renderLooper();
  if (isStopped) runTransportCommand("play");
}

function cancelRecording() {
  if (recorder.mode === "idle") return;
  recorder = idleRecorder();
  announceLooper("RECORDING STOPPED · NOTHING WAS KEPT");
  renderLooper();
}

function clearSong() {
  song = emptySong();
  selectedLoop = null;
  selectedStepIndex = null;
  isStepRecActive = false;
  casioOutroEnding = false;
  pendingCasioSection = null;
  scheduledCasio = null;
  audibleCasioSection = null;
  audibleCasioKey = 0;
  audibleCasioPerformance = null;
  updateCasioUI();
  recorder = idleRecorder();
  if (currentTransport) currentTransport.followedSlot = null;
  if (currentTransport) currentTransport.songLeading = false;
  if (activeHeldFunKey === null) applyEnsembleConductor();
  announceLooper("THE SONG IS CLEARED");
  renderLooper();
  recordHistoryAction("Clear All Loops");
}

function updateCasioUI() {
  const roles = ["intro", "bridge", "outro"];
  const activeRole = audibleCasioSection;
  const cuedRole = pendingCasioSection?.role ?? (audibleCasioSection === null ? scheduledCasio?.role : null) ?? null;
  for (const role of roles) {
    const btn = document.querySelector(`#casio-${role}`);
    if (!btn) continue;
    const isActive = activeRole === role;
    const isCued = cuedRole === role;
    btn.setAttribute("aria-pressed", String(isActive || isCued));
    btn.classList.toggle("is-active", isActive);
    btn.classList.toggle("is-cued", isCued);
  }
}

function triggerCasioSection(role) {
  const rawKey = activeHeldFunKey !== null
    ? activeHeldFunKey
    : (currentScore ? (((currentScore.root % 12) + 12) % 12) : 0);
  const key = Math.max(0, Math.min(12, Math.trunc(rawKey) || 0));

  const currentActive = audibleCasioSection ?? scheduledCasio?.role ?? null;
  const currentCued = pendingCasioSection?.role ?? null;

  if (currentActive === role || currentCued === role) {
    pendingCasioSection = null;
    scheduledCasio = null;
    audibleCasioSection = null;
    audibleCasioPerformance = null;
    casioOutroEnding = false;
    if (activeHeldFunKey === null) applyEnsembleConductor();
    updateCasioUI();
    announceLooper(`CASIO ${role.toUpperCase()} CANCELLED`);
    return;
  }

  if (!currentTransport || transportState.state !== TRANSPORT_STATES.PLAYING) {
    pendingCasioSection = { role, key };
    updateCasioUI();
    runTransportCommand("play");
    announceLooper(`CASIO ${role.toUpperCase()} STARTED [${FUN_KEY_MAP[key]?.note ?? key}] · 48 STEPS`);
    return;
  }

  pendingCasioSection = { role, key };
  updateCasioUI();
  announceLooper(`CASIO ${role.toUpperCase()} CUED FOR NEXT DOWNBEAT [${FUN_KEY_MAP[key]?.note ?? key}] · 48 STEPS`);
}

function insertSectionLoops(role) {
  if (recorder.mode !== "idle") return;
  if (!canInsertLoops(song, 4)) {
    announceLooper("CANNOT INSERT SECTION · MAX BUDGET EXCEEDED (NEEDS 4 LOOPS)");
    return;
  }
  let takes;
  let label;
  if (role === "main") {
    if (activeHeldFunKey !== null) {
      const rawKey = activeHeldFunKey;
      const key = Math.max(0, Math.min(12, Math.trunc(rawKey) || 0));
      const voice = funVoiceId;
      const slot = makeSlot(key, funMachineStyle, voice);
      takes = Array.from({ length: 4 }, () => Object.freeze(Array(LOOP_STEPS).fill(slot)));
      const genreTitle = genreBook(activeGenre)?.title ?? activeGenre;
      const noteName = FUN_KEY_MAP[key]?.note ?? key;
      label = `INSERTED GROOVE (4 LOOPS · 48 STEPS) [${noteName}] (${genreTitle})`;
    } else {
      takes = Array.from({ length: 4 }, () => emptyTake());
      label = "INSERTED GROOVE (4 LOOPS · 48 STEPS) (RAW INSTRUMENTATION)";
    }
  } else {
    const rawKey = activeHeldFunKey !== null
      ? activeHeldFunKey
      : (currentScore ? (((currentScore.root % 12) + 12) % 12) : 0);
    const key = Math.max(0, Math.min(12, Math.trunc(rawKey) || 0));
    const voice = funVoiceId;
    const slot = makeSlot(key, role, voice);
    takes = Array.from({ length: 4 }, () => Object.freeze(Array(LOOP_STEPS).fill(slot)));
    const genreTitle = genreBook(activeGenre)?.title ?? activeGenre;
    const noteName = FUN_KEY_MAP[key]?.note ?? key;
    label = `INSERTED ${role.toUpperCase()} (4 LOOPS · 48 STEPS) [${noteName}] (${genreTitle})`;
  }

  let insertIndex = song.loops.length;
  if (role === "intro") {
    insertIndex = 0;
  } else if (role === "bridge" || role === "main") {
    insertIndex = selectedLoop !== null ? selectedLoop + 1 : song.loops.length;
  } else if (role === "outro") {
    insertIndex = song.loops.length;
  }

  song = insertSection(song, role, takes, insertIndex);
  selectedLoop = insertIndex;
  announceLooper(label);
  renderLooper();
  unlockDrawer("change");
}

function looperReadoutText() {
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "S"}`;
  const audible = currentTransport && transportState.state === TRANSPORT_STATES.PLAYING
    ? ((currentTransport.audibleStep % 12) + 12) % 12
    : null;
  const audibleNum = audible !== null ? audible + 1 : 1;

  if (recorder.mode === "armed") {
    if (recorder.anticipatedSlot) {
      const remaining = recorder.countIn > 0 ? recorder.countIn : (audible !== null ? (12 - audible) % 12 || 12 : 1);
      const antNote = FUN_KEY_MAP[recorder.anticipatedSlot.key]?.note ?? recorder.anticipatedSlot.key;
      return `ARMED · [${antNote}] LATCHED FOR STEP 1 · ${remaining} STEP${remaining === 1 ? "" : "S"} TO RECORD`;
    }
    if (recorder.countIn > LOOP_STEPS) {
      const untilCountIn = recorder.countIn - LOOP_STEPS;
      return `ARMED · SYNCING TO DOWNBEAT · ${untilCountIn} STEP${untilCountIn === 1 ? "" : "S"} TO COUNT-IN`;
    }
    if (recorder.countIn > 0) {
      const stepNum = LOOP_STEPS - recorder.countIn + 1;
      return `ARMED · COUNT-IN STEP ${stepNum} OF 12 · ${recorder.countIn} STEP${recorder.countIn === 1 ? "" : "S"} TO RECORD`;
    }
    const stepsUntil = audible !== null ? (12 - audible) % 12 || 12 : 1;
    if (recorder.kind === "new") {
      return `ARMED · SYNCING TO DOWNBEAT · ${stepsUntil} STEP${stepsUntil === 1 ? "" : "S"} TO RECORD`;
    }
    return `ARMED · OVERDUB WAITS FOR LOOP ${recorder.loopIndex + 1} · ${stepsUntil} STEP${stepsUntil === 1 ? "" : "S"}`;
  }

  if (recorder.mode === "recording") {
    const stepNum = audibleNum;
    const finalTag = stepNum === 12 ? " (FINAL STEP)" : "";
    const keyTag = activeHeldFunKey !== null ? ` · [${FUN_KEY_MAP[activeHeldFunKey]?.note ?? activeHeldFunKey}]` : "";
    if (recorder.kind === "new") {
      return `● RECORDING NEW LOOP · STEP ${stepNum} OF 12${finalTag}${keyTag}`;
    }
    return `● OVERDUBBING LOOP ${recorder.loopIndex + 1} · STEP ${stepNum} OF 12${finalTag}${keyTag}`;
  }

  if (isStepRecActive && selectedStepIndex !== null) {
    const currentLoop = selectedLoop !== null ? song.loops[selectedLoop] : null;
    const recordedSlots = currentLoop ? currentLoop.layers[currentLoop.layers.length - 1] : null;
    const curSlot = recordedSlots ? recordedSlots[selectedStepIndex] : null;
    const curNote = curSlot ? ` [${FUN_KEY_MAP[curSlot.key]?.note ?? curSlot.key}]` : " [—]";
    return `STEP REC · STEP ${selectedStepIndex + 1} OF 12${curNote} · PLAY KEY TO ENTER OR REST`;
  }

  if (selectedStepIndex !== null) {
    const currentLoop = selectedLoop !== null ? song.loops[selectedLoop] : null;
    const recordedSlots = currentLoop ? currentLoop.layers[currentLoop.layers.length - 1] : null;
    const curSlot = recordedSlots ? recordedSlots[selectedStepIndex] : null;
    const curNote = curSlot ? ` [${FUN_KEY_MAP[curSlot.key]?.note ?? curSlot.key}]` : " [—]";
    return `STEP ${selectedStepIndex + 1} OF 12${curNote} · PLAY KEY TO SET OR CLICK TO CLEAR`;
  }

  if (audibleCasioSection !== null) {
    const keyLabel = FUN_KEY_MAP[audibleCasioKey]?.note ?? audibleCasioKey;
    const audiblePass = currentTransport?.audibleStep !== undefined ? Math.floor(currentTransport.audibleStep / 12) : 0;
    const sectionStartPass = scheduledCasio?.startPass ?? (audiblePass > 0 ? audiblePass - (audiblePass % 4) : 0);
    const passOffset = Math.max(0, Math.min(3, audiblePass - sectionStartPass));
    const stepNum = audible !== null ? passOffset * 12 + audible + 1 : 1;
    const finalTag = stepNum === 48 ? " (FINAL STEP)" : "";
    return `CASIO ${audibleCasioSection.toUpperCase()} [${keyLabel}] · STEP ${stepNum} OF 48${finalTag}`;
  }
  if (pendingCasioSection !== null) {
    const keyLabel = FUN_KEY_MAP[pendingCasioSection.key]?.note ?? pendingCasioSection.key;
    const stepsUntil = audible !== null ? (12 - audible) % 12 || 12 : 1;
    return `CASIO ${pendingCasioSection.role.toUpperCase()} CUED [${keyLabel}] · STARTS IN ${stepsUntil} STEP${stepsUntil === 1 ? "" : "S"}`;
  }

  if (!song.loops.length) return "NO LOOPS YET · HOLD KEYS AND RECORD WHAT YOU PLAY";
  const playing = currentTransport?.songPosition;
  let now = "";
  if (playing) {
    const loop = song.loops[playing.loopIndex];
    const role = loop?.role;
    const secPass = sectionPassForLoop(song, playing.loopIndex, playing.repeat);
    const isRawGroove = role === "main" && loop?.layers.length === 1 && isEmptyTake(loop.layers[0]);
    const hasOtherMain = song.loops.some((l, idx) => idx !== playing.loopIndex && (l.role ?? "main") === "main");
    const showGroove = role === "main" && (isRawGroove || hasOtherMain);
    const roleName = role === "main" ? "GROOVE" : role?.toUpperCase();
    const roleTag = (role && (role !== "main" || showGroove)) ? ` [${roleName}${secPass !== null ? ` ${secPass + 1}/4` : ""}]` : "";
    now = `NOW LOOP ${playing.loopIndex + 1}${roleTag} · `;
  }
  const target = selectedLoop !== null ? ` · OVERDUB TARGET LOOP ${selectedLoop + 1} (${plural(song.loops[selectedLoop].layers.length, "LAYER")})` : "";
  return `${now}${plural(song.loops.length, "LOOP")} · ${plural(songPasses(song), "PASS")}${target}`.replace("PASSS", "PASSES");
}

function handleStepClick(stepIndex) {
  if (recorder.mode !== "idle") return;
  const currentLoop = selectedLoop !== null ? song.loops[selectedLoop] : null;
  const recordedSlots = currentLoop ? currentLoop.layers[currentLoop.layers.length - 1] : null;
  const existingSlot = recordedSlots ? recordedSlots[stepIndex] : null;

  if (selectedStepIndex === stepIndex) {
    if (existingSlot) {
      song = setLoopSlot(song, selectedLoop ?? 0, null, stepIndex, null);
      announceLooper(`STEP ${stepIndex + 1} CLEARED`);
      renderLooper();
      return;
    }
    selectedStepIndex = null;
    renderLooper();
    return;
  }

  selectedStepIndex = stepIndex;
  if (existingSlot) {
    announceLooper(`STEP ${stepIndex + 1}: ${FUN_KEY_MAP[existingSlot.key]?.note ?? existingSlot.key} SELECTED · CLICK AGAIN TO CLEAR OR STRIKE A KEY TO CHANGE`);
  } else {
    announceLooper(`STEP ${stepIndex + 1} SELECTED · STRIKE A KEY ON THE MANUAL TO SET NOTE`);
  }
  renderLooper();
}

function toggleStepRec() {
  if (recorder.mode !== "idle") {
    cancelRecording();
  }
  isStepRecActive = !isStepRecActive;
  if (isStepRecActive) {
    if (selectedStepIndex === null) selectedStepIndex = 0;
    announceLooper(`STEP RECORD MODE · STEP ${selectedStepIndex + 1} SELECTED · STRIKE KEYS ON MANUAL OR PRESS REST`);
  } else {
    selectedStepIndex = null;
    announceLooper("STEP RECORD FINISHED");
  }
  renderLooper();
}

function handleRestStep() {
  if (selectedStepIndex === null) return;
  song = setLoopSlot(song, selectedLoop ?? 0, null, selectedStepIndex, null);
  if (isStepRecActive) {
    const nextStep = (selectedStepIndex + 1) % activeGridSteps;
    announceLooper(`STEP ${selectedStepIndex + 1}: REST · ADVANCED TO STEP ${nextStep + 1}`);
    selectedStepIndex = nextStep;
  } else {
    announceLooper(`STEP ${selectedStepIndex + 1}: REST`);
  }
  renderLooper();
}

function renderLooperSteps() {
  const container = elements.looperSteps;
  if (!container) return;
  container.classList.toggle("is-16-steps", activeGridSteps === 16);
  if (container.children.length !== activeGridSteps) {
    container.replaceChildren(...Array.from({ length: activeGridSteps }, (_, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "looper-step";
      cell.dataset.step = String(i);
      cell.setAttribute("aria-label", `Step ${i + 1}`);
      const num = document.createElement("b");
      num.className = "looper-step-num";
      num.textContent = String(i + 1);
      const val = document.createElement("span");
      val.className = "looper-step-val";
      val.textContent = "·";
      cell.append(num, val);
      cell.addEventListener("click", () => handleStepClick(i));
      return cell;
    }));
  }

  const audible = currentTransport && transportState.state === TRANSPORT_STATES.PLAYING
    ? ((currentTransport.audibleStep % activeGridSteps) + activeGridSteps) % activeGridSteps
    : null;

  const currentLoop = selectedLoop !== null ? song.loops[selectedLoop] : null;
  const recordedSlots = currentLoop ? currentLoop.layers[currentLoop.layers.length - 1] : null;
  const activeTake = recorder.mode === "recording" ? recorder.take : null;

  for (let i = 0; i < activeGridSteps; i += 1) {
    const cell = container.children[i];
    const val = cell.querySelector(".looper-step-val");
    const isAudible = audible === i;

    cell.classList.remove("is-current", "is-count-in", "is-recording", "has-note", "is-selected-step");
    if (selectedStepIndex === i) {
      cell.classList.add("is-selected-step");
    }

    if (recorder.mode === "armed") {
      if (isAudible) cell.classList.add("is-count-in");
      if (i === 0 && recorder.anticipatedSlot) {
        cell.classList.add("has-note");
        if (val) val.textContent = FUN_KEY_MAP[recorder.anticipatedSlot.key]?.note ?? "●";
      } else {
        if (val) val.textContent = isAudible ? "▶" : "·";
      }
    } else if (recorder.mode === "recording") {
      const takeSlot = activeTake ? activeTake[i] : null;
      if (isAudible) cell.classList.add("is-recording");
      if (takeSlot) {
        cell.classList.add("has-note");
        if (val) val.textContent = FUN_KEY_MAP[takeSlot.key]?.note ?? String(takeSlot.key);
      } else {
        if (val) val.textContent = isAudible ? "●" : "·";
      }
    } else {
      if (isAudible) cell.classList.add("is-current");
      const slot = recordedSlots ? recordedSlots[i] : null;
      if (slot) {
        cell.classList.add("has-note");
        if (val) val.textContent = FUN_KEY_MAP[slot.key]?.note ?? String(slot.key);
      } else {
        if (val) val.textContent = "·";
      }
    }
  }
}

// Tiles are rebuilt only when the song or the selection changes, so a focused
// tile keeps focus while the loop plays; the playing mark is a class toggle.
let renderedTiles = null;
function renderLooperTiles() {
  const list = elements.looperTiles;
  if (!list) return;
  const signature = [song, selectedLoop];
  if (!renderedTiles || renderedTiles[0] !== signature[0] || renderedTiles[1] !== signature[1]) {
    renderedTiles = signature;
    list.replaceChildren(...song.loops.map((loop, index) => {
      const item = document.createElement("li");
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "looper-tile";
      tile.dataset.loop = String(index);
      tile.setAttribute("aria-pressed", String(index === selectedLoop));
      const role = loop.role ? loop.role : null;
      const secPass = sectionPassForLoop(song, index, 0);
      const isRawGroove = role === "main" && loop.layers.length === 1 && isEmptyTake(loop.layers[0]);
      const hasOtherMain = song.loops.some((l, idx) => idx !== index && (l.role ?? "main") === "main");
      const showGrooveTag = role === "main" && (isRawGroove || hasOtherMain);
      if (role && (role !== "main" || showGrooveTag)) tile.dataset.role = role;
      const roleName = role === "main" ? "GROOVE" : role?.toUpperCase();
      const roleTag = (role && (role !== "main" || showGrooveTag)) ? ` [${roleName}${secPass !== null ? ` ${secPass + 1}/4` : ""}]` : "";
      tile.setAttribute("aria-label", `Loop ${index + 1}${roleTag}: ${loop.layers.length} layer${loop.layers.length === 1 ? "" : "s"}, plays ${loop.repeats} time${loop.repeats === 1 ? "" : "s"}`);
      const number = document.createElement("b");
      number.textContent = `L${index + 1}`;
      const detail = document.createElement("span");
      if (role && (role !== "main" || showGrooveTag)) {
        detail.className = "looper-role-tag";
        detail.textContent = `${roleName}${secPass !== null ? ` ${secPass + 1}/4` : ""}${loop.repeats > 1 ? ` · ×${loop.repeats}` : ""}`;
      } else {
        detail.textContent = `${loop.layers.length}L · ×${loop.repeats}`;
      }
      tile.append(number, detail);
      tile.addEventListener("click", () => {
        selectedLoop = index;
        renderLooper();
      });
      item.append(tile);
      return item;
    }));
  }
  const playing = currentTransport?.audiblePosition?.loopIndex ?? null;
  for (const tile of list.querySelectorAll(".looper-tile")) {
    tile.classList.toggle("is-playing", Number(tile.dataset.loop) === playing);
  }
}

function renderLooperEdit() {
  const loop = selectedLoop !== null ? song.loops[selectedLoop] : null;
  const busy = recorder.mode !== "idle";
  const label = elements.looperEditLabel;
  if (label) label.textContent = loop ? `LOOP ${selectedLoop + 1} · ${loop.layers.length} LAYER${loop.layers.length === 1 ? "" : "S"}` : "NO LOOP SELECTED";
  const repeats = elements.looperRepeats;
  if (repeats) repeats.value = loop ? `×${loop.repeats}` : "×1";
  const looperButtons = {
    "#looper-repeats-down": elements.looperRepeatsDown,
    "#looper-repeats-up": elements.looperRepeatsUp,
    "#looper-move-earlier": elements.looperMoveEarlier,
    "#looper-move-later": elements.looperMoveLater,
    "#looper-undo": elements.looperUndo,
    "#looper-delete": elements.looperDelete,
  };
  const enable = (id, on) => {
    const button = looperButtons[id] || document.querySelector(id);
    if (button) button.disabled = !on;
  };
  enable("#looper-repeats-down", loop && loop.repeats > 1);
  enable("#looper-repeats-up", loop && loop.repeats < MAX_REPEATS && songPasses(song) < MAX_SONG_PASSES);
  enable("#looper-move-earlier", loop && !busy && selectedLoop > 0);
  enable("#looper-move-later", loop && !busy && selectedLoop < song.loops.length - 1);
  enable("#looper-undo", loop && !busy);
  enable("#looper-delete", loop && !busy);
}

// Applies a song edit, keeps the selection valid, lets the band re-follow the
// edited song on the next step, and says what happened (or why nothing did).
function editSong(next, { selection = selectedLoop, done, refused }) {
  if (next === song) {
    if (refused) announceLooper(refused);
    renderLooper();
    return;
  }
  song = next;
  selectedLoop = clampSelection(song, selection);
  if (currentTransport) currentTransport.followedSlot = null;
  if (!song.loops.length && activeHeldFunKey === null) applyEnsembleConductor();
  announceLooper(done);
  renderLooper();
  recordHistoryAction(done || "Edit Song");
}

function renderLooper() {
  renderLooperTiles();
  renderLooperEdit();
  renderLooperSteps();
  const record = elements.looperRecord;
  const overdub = elements.looperOverdub;
  const clear = elements.looperClear;
  const readout = elements.looperReadout;
  const active = (kind) => recorder.mode !== "idle" && recorder.kind === kind;

  if (record) {
    const isNew = active("new");
    record.setAttribute("aria-pressed", String(isNew));
    record.classList.toggle("is-armed", isNew && recorder.mode === "armed");
    record.classList.toggle("is-recording", isNew && recorder.mode === "recording");
    record.textContent = isNew
      ? (recorder.mode === "armed" ? "ARMED · SYNCING" : "● RECORDING")
      : "● RECORD NEW LOOP";
  }

  if (overdub) {
    const isOd = active("overdub");
    overdub.setAttribute("aria-pressed", String(isOd));
    overdub.classList.toggle("is-armed", isOd && recorder.mode === "armed");
    overdub.classList.toggle("is-recording", isOd && recorder.mode === "recording");
    overdub.textContent = isOd
      ? (recorder.mode === "armed" ? "ARMED · WAITING" : "● OVERDUBBING")
      : "OVERDUB";
    overdub.disabled = !song.loops.length;
  }

  const stepRec = elements.looperStepRec;
  const rest = elements.looperRest;

  if (stepRec) {
    stepRec.setAttribute("aria-pressed", String(isStepRecActive));
    stepRec.classList.toggle("is-step-rec", isStepRecActive);
    stepRec.disabled = recorder.mode !== "idle";
    stepRec.textContent = isStepRecActive ? "STEP REC: ON" : "STEP REC";
  }

  if (rest) {
    rest.disabled = selectedStepIndex === null || recorder.mode !== "idle";
  }

  if (clear) clear.disabled = !song.loops.length && recorder.mode === "idle";
  const canInsert = recorder.mode === "idle" && canInsertLoops(song, 4);
  if (elements.looperInsertIntro) elements.looperInsertIntro.disabled = !canInsert;
  if (elements.looperInsertGroove) elements.looperInsertGroove.disabled = !canInsert;
  if (elements.looperInsertBridge) elements.looperInsertBridge.disabled = !canInsert;
  if (elements.looperInsertOutro) elements.looperInsertOutro.disabled = !canInsert;
  if (readout) readout.value = looperReadoutText();
  updateCasioUI();
}

elements.looperRecord?.addEventListener("click", () => armRecorder("new"));
elements.looperOverdub?.addEventListener("click", () => armRecorder("overdub"));
elements.looperStepRec?.addEventListener("click", toggleStepRec);
elements.looperRest?.addEventListener("click", handleRestStep);
elements.looperInsertIntro?.addEventListener("click", () => insertSectionLoops("intro"));
/* looper-insert-groove */ elements.looperInsertGroove?.addEventListener("click", () => insertSectionLoops("main"));
elements.looperInsertBridge?.addEventListener("click", () => insertSectionLoops("bridge"));
elements.looperInsertOutro?.addEventListener("click", () => insertSectionLoops("outro"));
elements.casioIntro?.addEventListener("click", () => triggerCasioSection("intro"));
elements.casioBridge?.addEventListener("click", () => triggerCasioSection("bridge"));
elements.casioOutro?.addEventListener("click", () => triggerCasioSection("outro"));
elements.looperClear?.addEventListener("click", clearSong);
elements.looperRepeatsDown?.addEventListener("click", () => {
  const loop = song.loops[selectedLoop];
  if (loop) editSong(setRepeats(song, selectedLoop, loop.repeats - 1), { done: `LOOP ${selectedLoop + 1} PLAYS ${loop.repeats - 1} TIME${loop.repeats - 1 === 1 ? "" : "S"}` });
});
elements.looperRepeatsUp?.addEventListener("click", () => {
  const loop = song.loops[selectedLoop];
  if (!loop) return;
  const next = setRepeats(song, selectedLoop, loop.repeats + 1);
  editSong(next, {
    done: `LOOP ${selectedLoop + 1} PLAYS ${loop.repeats + 1} TIMES`,
    refused: loop.repeats >= MAX_REPEATS ? `A LOOP PLAYS AT MOST ${MAX_REPEATS} TIMES` : `THE SONG IS AT ITS ${MAX_SONG_PASSES}-PASS LIMIT`,
  });
});
elements.looperMoveEarlier?.addEventListener("click", () => {
  if (selectedLoop !== null) editSong(moveLoop(song, selectedLoop, -1), { selection: selectedLoop - 1, done: `LOOP MOVED TO POSITION ${selectedLoop}` });
});
elements.looperMoveLater?.addEventListener("click", () => {
  if (selectedLoop !== null) editSong(moveLoop(song, selectedLoop, 1), { selection: selectedLoop + 1, done: `LOOP MOVED TO POSITION ${selectedLoop + 2}` });
});
elements.looperUndo?.addEventListener("click", () => {
  const loop = song.loops[selectedLoop];
  if (!loop) return;
  editSong(undoLayer(song, selectedLoop), { done: loop.layers.length > 1 ? `NEWEST LAYER OF LOOP ${selectedLoop + 1} REMOVED` : `LOOP ${selectedLoop + 1} REMOVED` });
});
elements.looperDelete?.addEventListener("click", () => {
  if (selectedLoop !== null) editSong(deleteLoop(song, selectedLoop), { done: `LOOP ${selectedLoop + 1} DELETED` });
});
renderLooper();

elements.bandstandEngageAll?.addEventListener("click", () => {
  setBandPlayersEnabled(true);
});

elements.bandstandSoloLead?.addEventListener("click", () => {
  setBandPlayersEnabled(false);
});

elements.bandstandMutateAll?.addEventListener("click", () => {
  if (!currentScore) return;
  elements.beatMutate?.click();
  elements.bassMutate?.click();
  elements.harmonyMutate?.click();
  elements.chimeMutate?.click();
  elements.chantMutate?.click();
  if (elements.bandstandTelemetry) {
    elements.bandstandTelemetry.textContent = `ENSEMBLE JAM MUTATION #${beatMutation} APPLIED ACROSS ALL PLATES`;
  }
});

function updateAcousticsStatus() {
  if (!elements.acousticsStatus) return;
  const crackleActive = parlorAcousticsEnabled && parlorCrackleEnabled;
  const reverbActive = parlorAcousticsEnabled && parlorReverbEnabled;
  const tickActive = parlorAcousticsEnabled && parlorTickEnabled;

  elements.chipCrackle?.classList.toggle("is-active", crackleActive);
  elements.chipCrackle?.setAttribute("aria-pressed", String(crackleActive));
  elements.chipReverb?.classList.toggle("is-active", reverbActive);
  elements.chipReverb?.setAttribute("aria-pressed", String(reverbActive));
  elements.chipTick?.classList.toggle("is-active", tickActive);
  elements.chipTick?.setAttribute("aria-pressed", String(tickActive));

  if (!parlorAcousticsEnabled || (!crackleActive && !reverbActive && !tickActive)) {
    elements.acousticsStatus.textContent = "PARLOR ACOUSTICS MUTED · DRY ISOLATION";
  } else {
    const activeLayers = [];
    if (crackleActive) activeLayers.push("WAX CRACKLE");
    if (reverbActive) activeLayers.push("CHAMBER REVERB");
    if (tickActive) activeLayers.push("CLOCKWORK");
    elements.acousticsStatus.textContent = `${activeLayers.join(" · ")} ACTIVE`;
  }
}

elements.parlorAcousticsToggle?.addEventListener("click", () => {
  parlorAcousticsEnabled = !parlorAcousticsEnabled;
  elements.parlorAcousticsToggle.setAttribute("aria-pressed", String(parlorAcousticsEnabled));
  elements.parlorAcousticsToggle.textContent = parlorAcousticsEnabled ? "ACOUSTICS: ENGAGED" : "ACOUSTICS: SILENCED";
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.parlorReverbSend?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorReverbEnabled ? PARLOR_REVERB_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025,
    );
    currentTransport.parlorCrackleGain?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorCrackleEnabled ? PARLOR_CRACKLE_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025,
    );
  }
  updateAcousticsStatus();
});

elements.parlorAcousticsLevel?.addEventListener("input", (e) => {
  parlorAcousticsLevel = Number(e.target.value) / 100;
  if (elements.acousticsLevelVal) {
    elements.acousticsLevelVal.textContent = `${Math.round(parlorAcousticsLevel * 100)}%`;
  }
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.parlorReverbSend?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorReverbEnabled ? PARLOR_REVERB_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025
    );
    currentTransport.parlorCrackleGain?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorCrackleEnabled ? PARLOR_CRACKLE_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025
    );
  }
});

elements.chipCrackle?.addEventListener("click", () => {
  parlorCrackleEnabled = !parlorCrackleEnabled;
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.parlorCrackleGain?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorCrackleEnabled ? PARLOR_CRACKLE_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025
    );
  }
  updateAcousticsStatus();
});

elements.chipReverb?.addEventListener("click", () => {
  parlorReverbEnabled = !parlorReverbEnabled;
  if (audioContext && currentTransport) {
    const now = audioContext.currentTime;
    currentTransport.parlorReverbSend?.gain.setTargetAtTime(
      parlorAcousticsEnabled && parlorReverbEnabled ? PARLOR_REVERB_PER_LEVEL * parlorAcousticsLevel : 0.0001,
      now,
      0.025
    );
  }
  updateAcousticsStatus();
});

elements.chipTick?.addEventListener("click", () => {
  parlorTickEnabled = !parlorTickEnabled;
  updateAcousticsStatus();
});

function refreshScoreOverrides() {
  if (!baseScore) return;
  const previousRoot = currentScore ? currentScore.root : baseScore.root;
  currentScore = applyScoreOverrides(baseScore, { rootOverride, scaleOverride });
  interaction.temperament = currentScore.temperament || deriveTemperament(currentScore);
  if (song.loops.length && previousRoot !== currentScore.root) {
    song = transposeSectionLoops(song, previousRoot, currentScore.root);
    renderLooper();
  }
  if (rulebooksInstalled()) installCreatureBook(buildCreatureBook(currentScore, compiledRulebooks()));
  applyEnsembleConductor();
  if (currentTransport && audioContext) {
    const chordRoot = currentConductedSpine?.[currentTransport.audibleStep ?? 0]?.root ?? 0;
    const freqs = droneFrequencies(currentScore, chordRoot);
    currentTransport.drones.forEach((drone, index) => {
      drone.frequency.setTargetAtTime(freqs[index], audioContext.currentTime, 0.04);
    });
  }
  updateKapellmeisterUI();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
}

elements.kapellmeisterKeyOverride?.addEventListener("change", (e) => {
  const val = e.target.value;
  rootOverride = val === "native" ? null : Number(val);
  refreshScoreOverrides();
  recordHistoryAction(`Key Override: ${rootOverride === null ? "Native" : rootOverride}`);
});

elements.kapellmeisterScaleOverride?.addEventListener("change", (e) => {
  const val = e.target.value;
  scaleOverride = val === "native" ? null : Number(val);
  refreshScoreOverrides();
  recordHistoryAction(`Scale Override: ${scaleOverride === null ? "Native" : scaleOverride}`);
});

elements.kapellmeisterTuningA4?.addEventListener("change", (e) => {
  setReferencePitch(Number(e.target.value));
  refreshScoreOverrides();
  recordHistoryAction(`Tuning Reference: ${referencePitch()} Hz`);
});

elements.kapellmeisterGenre?.addEventListener("change", (e) => {
  activeGenre = e.target.value;
  if (currentTransport && audioContext && currentScore) {
    const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(currentScore, activeGenre), activeGridSteps, barLock44);
    const unit = stepUnitSeconds(activeTempoBpm || currentScore.pulse, rhythm, barLock44, activeGridSteps);
    currentTransport.delay.delayTime.setTargetAtTime(delayTimeFor(currentScore, activeTempoBpm || currentScore.pulse, effectiveRhythmIndex(currentScore, activeGenre), unit), audioContext.currentTime, 0.08);
  }
  updateKapellmeisterUI();
  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
  updateArrangementDisplay(currentTransport?.audibleStep ?? null);
  recordHistoryAction(`Rulebook: ${activeGenre}`);
});

// AS WRITTEN (D-043): the genre's own changes, without this creature's moves.
elements.kapellmeisterAsWritten?.addEventListener("click", () => {
  genreVaried = !genreVaried;
  if (currentTransport) currentTransport.followedSlot = "as-written";
  if (activeHeldFunKey !== null && activeFunPerformance) {
    activeFunPerformance = performanceOf(activeHeldFunKey, funMachineStyle);
    applyEnsembleConductor(activeFunPerformance.steps.map((step) => step.chord));
  } else {
    applyEnsembleConductor();
  }
  updateKapellmeisterUI();
  if (elements.kapellmeisterTelemetry) {
    elements.kapellmeisterTelemetry.textContent = !genreVaried
      ? "AS WRITTEN [ON] · BYPASSING CREATURE VARIATIONS"
      : "VARIATION [ON] · PLAYING CREATURE'S OWN MOVES";
  }
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateArrangementDisplay(currentTransport?.audibleStep ?? null);
  recordHistoryAction(genreVaried ? "Enable Variations" : "As Written");
});

elements.kapellmeisterStrictness?.addEventListener("input", (e) => {
  activeStrictness = Number(e.target.value);
  if (elements.kapellmeisterStrictnessVal) {
    const flavor = activeStrictness <= 5 ? "Strict" : activeStrictness <= 9 ? "Balanced" : "Permissive";
    elements.kapellmeisterStrictnessVal.textContent = `G ≤ ${activeStrictness} (${flavor})`;
  }
  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  recordHistoryAction(`Strictness: ${activeStrictness}`, { immediate: false });
});

elements.kapellmeisterStrictness?.addEventListener("change", () => {
  recordHistoryAction(`Strictness: ${activeStrictness}`, { immediate: true });
});

// --- The Kapellmeister's Manuscript live Inform 7 sandbox (P5-36, D-071) ---

function setManuscriptDiagnostic(text, isError = false) {
  if (elements.manuscriptDiagnostic) {
    elements.manuscriptDiagnostic.value = text;
    elements.manuscriptDiagnostic.classList.toggle("is-error", isError);
  }
  elements.status.textContent = text;
}

if (elements.manuscriptSource && !elements.manuscriptSource.value) {
  elements.manuscriptSource.value = DEFAULT_MANUSCRIPT_SOURCE;
}

elements.kapellmeisterManuscriptToggle?.addEventListener("click", () => {
  if (!elements.kapellmeisterManuscript) return;
  const open = elements.kapellmeisterManuscript.hidden;
  elements.kapellmeisterManuscript.hidden = !open;
  elements.kapellmeisterManuscriptToggle.setAttribute("aria-expanded", String(open));
  elements.kapellmeisterManuscriptToggle.classList.toggle("is-active", open);
});

elements.manuscriptCompileBtn?.addEventListener("click", () => {
  const source = elements.manuscriptSource?.value ?? "";
  const result = compileManuscript(canonicalRulebooksSource, source);
  if (!result.ok) {
    setManuscriptDiagnostic(result.diagnostic, true);
    return;
  }
  installRulebooks(result.rulebooks);
  if (currentScore) {
    installCreatureBook(buildCreatureBook(currentScore, compiledRulebooks()));
  }
  activeGenre = result.primaryCode;
  buildGenreMenu();
  updateKapellmeisterUI();
  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
  updateArrangementDisplay(currentTransport?.audibleStep ?? null);
  unlockDrawer("change");
  setManuscriptDiagnostic(result.diagnostic, false);
});

elements.manuscriptResetBtn?.addEventListener("click", () => {
  if (elements.manuscriptSource) {
    elements.manuscriptSource.value = DEFAULT_MANUSCRIPT_SOURCE;
  }
  setManuscriptDiagnostic("MANUSCRIPT TEMPLATE RESTORED · PRESS COMPILE & CONDUCT TO INSTALL", false);
});

elements.manuscriptRestoreBtn?.addEventListener("click", () => {
  if (!canonicalRulebooksSource) return;
  installRulebooks(compileRulebooks(canonicalRulebooksSource));
  if (currentScore) {
    installCreatureBook(buildCreatureBook(currentScore, compiledRulebooks()));
  }
  if (activeGenre !== CREATURE_GENRE && !genreCodes().includes(activeGenre)) {
    activeGenre = CREATURE_GENRE;
  }
  buildGenreMenu();
  updateKapellmeisterUI();
  applyEnsembleConductor();
  updateBeatGrid();
  updateBassGrid();
  updateHarmonyGrid();
  updateChimeGrid();
  updateChantGrid();
  updateFunKeyboardChordLabels();
  updateArrangementDisplay(currentTransport?.audibleStep ?? null);
  setManuscriptDiagnostic("CANONICAL RULEBOOKS RESTORED · CUSTOM MANUSCRIPTS UNLOADED", false);
});

function funStatusText() {
  return `ONE-FINGER ACCOMPANIST · ${STYLE_LABELS[funMachineStyle]}`;
}

function setFunStyle(style) {
  funMachineStyle = ACCOMPANIMENT_STYLES.includes(style) ? style : DEFAULT_ACCOMPANIMENT_STYLE;
  for (const chip of document.querySelectorAll(".fun-chip[data-style]")) {
    const active = chip.dataset.style === funMachineStyle;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  }
  if (elements.funMachineStatus) elements.funMachineStatus.textContent = funStatusText();
}

for (const chip of document.querySelectorAll(".fun-chip[data-style]")) {
  chip.addEventListener("click", () => {
    setFunStyle(chip.dataset.style);
    if (elements.funMachineTelemetry) {
      elements.funMachineTelemetry.textContent = `STYLE: ${STYLE_LABELS[funMachineStyle]} · HOLD A KEY AND THE BAND FOLLOWS`;
    }
    // A held key switches style on the spot.
    if (activeHeldFunKey !== null) {
      const held = activeHeldFunKey;
      activeHeldFunKey = null;
      triggerFunKey(held, true);
    }
    recordHistoryAction(`Accompaniment Style: ${chip.dataset.style}`);
  });
}

// The creature chip names the voice this phrase chose, for sighted and
// screen-reader visitors alike, without changing the chip's own text.
function showCreatureVoice(score) {
  const chip = document.querySelector('.fun-chip[data-voice="creature"]');
  if (chip) chip.title = `This creature's own voice: ${creatureVoiceLabel(score)}`;
}

function setFunVoice(id) {
  funVoiceId = id === CREATURE_VOICE_ID ? id : voiceById(id).id;
  for (const chip of document.querySelectorAll(".fun-chip[data-voice]")) {
    const active = chip.dataset.voice === funVoiceId;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  }
}

for (const chip of document.querySelectorAll(".fun-chip[data-voice]")) {
  chip.addEventListener("click", () => {
    setFunVoice(chip.dataset.voice);
    if (recorder.mode === "idle" && song.loops.length) {
      song = setSectionVoices(song, funVoiceId, selectedLoop);
      renderLooper();
    }
    if (elements.funMachineTelemetry) {
      elements.funMachineTelemetry.textContent = `${funVoiceText()} · HOLD A KEY TO HEAR IT`;
    }
    // A held key changes voice on the spot, as it does for a style.
    if (activeHeldFunKey !== null) {
      const held = activeHeldFunKey;
      activeHeldFunKey = null;
      triggerFunKey(held, true);
    }
    recordHistoryAction(`Accompaniment Voice: ${chip.dataset.voice}`);
  });
}

elements.funOctaveDown?.addEventListener("click", () => {
  setFunOctave(funMachineOctave - 1);
  recordHistoryAction(`Keyboard Octave: ${funMachineOctave}`);
});

elements.funOctaveUp?.addEventListener("click", () => {
  setFunOctave(funMachineOctave + 1);
  recordHistoryAction(`Keyboard Octave: ${funMachineOctave}`);
});

if (elements.funKeyboard) {
  let lastPointerTriggerTime = 0;
  for (const keyBtn of elements.funKeyboard.querySelectorAll(".fun-key")) {
    const semitone = Number(keyBtn.dataset.semitone);
    keyBtn.addEventListener("pointerdown", () => {
      lastPointerTriggerTime = Date.now();
      triggerFunKey(semitone, true);
    });
    keyBtn.addEventListener("click", () => {
      if (Date.now() - lastPointerTriggerTime < 250) return;
      triggerFunKey(semitone, true);
    });
    keyBtn.addEventListener("pointerup", () => {
      triggerFunKey(semitone, false);
    });
    keyBtn.addEventListener("pointercancel", () => {
      triggerFunKey(semitone, false);
    });
    keyBtn.addEventListener("pointerleave", () => {
      triggerFunKey(semitone, false);
    });
  }
}

window.addEventListener("pointerup", () => {
  if (activeHeldFunKey !== null) {
    triggerFunKey(activeHeldFunKey, false);
  }
});

window.addEventListener("blur", () => {
  if (activeHeldFunKey !== null) {
    triggerFunKey(activeHeldFunKey, false);
  }
});

// The control most recently focused by a pointer press. Keyboard focus moves
// (Tab, scripted focus) clear it, so Space on that control is native again.
let pointerFocusedControl = null;
document.addEventListener("pointerdown", (event) => {
  pointerFocusedControl = event.target?.closest?.("button, summary, input, [role]") || null;
}, true);
document.addEventListener("focusin", (event) => {
  if (event.target !== pointerFocusedControl) pointerFocusedControl = null;
});

window.addEventListener("keydown", (event) => {
  if (midiLearnState.learning && event.code === "Escape") {
    exitLearnMode(midiLearnState);
    syncMidiLearnUI();
  }
  const transportCommand = transportCommandForKey(event, { pointerFocused: pointerFocusedControl });
  if (transportCommand && currentScore) {
    event.preventDefault();
    if (!event.repeat) runTransportCommand(transportCommand);
    return;
  }
  if (
    event.target === elements.phrase ||
    event.target?.tagName === "INPUT" ||
    event.target?.tagName === "TEXTAREA" ||
    event.target?.isContentEditable
  ) {
    return;
  }
  // Global Action History Undo: Ctrl+Z / Cmd+Z
  if ((event.ctrlKey || event.metaKey) && !event.altKey && event.code === "KeyZ" && !event.shiftKey) {
    event.preventDefault();
    performUndo();
    return;
  }
  // Global Action History Redo: Ctrl+Y / Cmd+Y or Ctrl+Shift+Z / Cmd+Shift+Z
  if ((event.ctrlKey || event.metaKey) && !event.altKey && ((event.code === "KeyZ" && event.shiftKey) || event.code === "KeyY")) {
    event.preventDefault();
    performRedo();
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.repeat) return;
  if (event.code === "KeyZ") {
    event.preventDefault();
    setFunOctave(funMachineOctave - 1);
    return;
  }
  if (event.code === "KeyX") {
    event.preventDefault();
    setFunOctave(funMachineOctave + 1);
    return;
  }
  if (event.code === "KeyM") {
    event.preventDefault();
    mutateUnlockedParts();
    return;
  }
  if (event.code === "KeyL") {
    event.preventDefault();
    toggleMidiLearnMode();
    return;
  }
  if (event.code === "KeyV") {
    event.preventDefault();
    applyViewMode(toggleViewMode(viewMode));
    return;
  }
  const mapped = FUN_KEY_BY_CODE[event.code] || (event.key ? FUN_KEY_BY_KEY[event.key.toUpperCase()] : null);
  if (mapped) {
    event.preventDefault();
    triggerFunKey(mapped.semitone, true);
  }
});

window.addEventListener("keyup", (event) => {
  // Space activates a mouse-focused button on keyup; the transport already
  // consumed this press on keydown.
  if (currentScore && transportCommandForKey(event, { pointerFocused: pointerFocusedControl }) === "toggle") {
    event.preventDefault();
    return;
  }
  if (
    event.target === elements.phrase ||
    event.target?.tagName === "INPUT" ||
    event.target?.tagName === "TEXTAREA" ||
    event.target?.isContentEditable
  ) {
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const mapped = FUN_KEY_BY_CODE[event.code] || (event.key ? FUN_KEY_BY_KEY[event.key.toUpperCase()] : null);
  if (mapped) {
    event.preventDefault();
    triggerFunKey(mapped.semitone, false);
  }
});


elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  summon(elements.phrase.value);
});

elements.surprise.addEventListener("click", () => {
  const next = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
  elements.phrase.value = next;
  summon(next);
});

elements.callingSlipTweak?.addEventListener("click", () => {
  const currentPhrase = (elements.phrase?.value || currentScore?.phrase || "the moon owes me five dollars").trim();
  const parsed = parseVariationPhrase(currentPhrase);
  let nextPhrase;
  if (parsed.hasVariation) {
    if (/^\d+$/.test(parsed.variationKey)) {
      const nextNum = parseInt(parsed.variationKey, 10) + 1;
      nextPhrase = `${parsed.basePhrase} # ${nextNum}`;
    } else {
      nextPhrase = `${parsed.basePhrase} # 2`;
    }
  } else {
    nextPhrase = `${currentPhrase} # 2`;
  }
  if (elements.phrase) elements.phrase.value = nextPhrase;
  summon(nextPhrase, { playAudio: Boolean(audioContext && !muted) });
});

elements.callingSlipPin?.addEventListener("click", () => {
  callingSlipFlavorPin = !callingSlipFlavorPin;
  if (callingSlipFlavorPin) {
    pinnedFlavorScore = currentScore || baseScore;
    elements.callingSlipPin.setAttribute("aria-pressed", "true");
    elements.callingSlipPin.classList.add("is-pinned");
    elements.callingSlipPin.textContent = "FLAVOR: PINNED 🔒";
    if (elements.callingSlipHint && pinnedFlavorScore) {
      elements.callingSlipHint.textContent = `FLAVOR PINNED: "${pinnedFlavorScore.name}" · NOTES TWEAK WITH EACH INPUT`;
    }
  } else {
    pinnedFlavorScore = null;
    elements.callingSlipPin.setAttribute("aria-pressed", "false");
    elements.callingSlipPin.classList.remove("is-pinned");
    elements.callingSlipPin.textContent = "FLAVOR: FREE 🔓";
    if (elements.callingSlipHint) {
      elements.callingSlipHint.textContent = 'IDENTICAL WORDS SUMMON THE IDENTICAL SPECIMEN · USE "# 2" FOR OPUS VARIATIONS.';
    }
  }
});

elements.replay.addEventListener("click", () => {
  runTransportCommand("restart");
});

elements.transportPlay?.addEventListener("click", () => {
  runTransportCommand("play");
});

elements.transportPause?.addEventListener("click", () => {
  runTransportCommand("pause");
});

elements.transportStop?.addEventListener("click", () => {
  runTransportCommand("stop");
});

elements.transportUndo?.addEventListener("click", () => performUndo());
elements.transportRedo?.addEventListener("click", () => performRedo());

elements.transportBarLock?.addEventListener("click", () => {
  barLock44 = !barLock44;
  elements.transportBarLock.setAttribute("aria-pressed", String(barLock44));
  elements.transportBarLock.classList.toggle("is-active", barLock44);
  if (currentTransport && audioContext && currentScore) {
    const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(currentScore, activeGenre), activeGridSteps, barLock44);
    const unit = stepUnitSeconds(activeTempoBpm || currentScore.pulse, rhythm, barLock44, activeGridSteps);
    currentTransport.delay.delayTime.setTargetAtTime(delayTimeFor(currentScore, 60 / (unit * 2), effectiveRhythmIndex(currentScore, activeGenre), unit), audioContext.currentTime, 0.08);
  }
  elements.status.textContent = barLock44
    ? "4/4 BAR LOCK ENGAGED · EACH 12-STEP PASS FITS ONE 4/4 BAR"
    : "4/4 BAR LOCK RELEASED · NATIVE PARLOR PULSE";
  recordHistoryAction(barLock44 ? "Enable 4/4 Bar Lock" : "Release 4/4 Bar Lock");
});

elements.transportGridSteps?.addEventListener("click", () => {
  activeGridSteps = activeGridSteps === 16 ? 12 : 16;
  elements.transportGridSteps.setAttribute("aria-pressed", String(activeGridSteps === 16));
  elements.transportGridSteps.textContent = activeGridSteps === 16 ? "16 STEPS (4/4)" : "12 STEPS (TRIPLET)";
  updateTransportPosition(currentTransport?.audibleStep ?? null);
  performanceCache.clear();
  if (currentScore) {
    for (const id of ["beat", "bass", "harmony", "chime", "chant"]) recomposePlate(id);
    if (conductorSource) currentArrangement = composeArrangement(conductorSource, currentScore, activeGridSteps);
    renderLooper();
    renderBeatGrid();
    renderBassGrid();
    renderHarmonyGrid();
    renderChimeGrid();
    renderChantGrid();
    applyEnsembleConductor();
  }
  if (currentTransport && audioContext && currentScore) {
    const rhythm = effectiveRhythmTemplate(effectiveRhythmIndex(currentScore, activeGenre), activeGridSteps, barLock44);
    const unit = stepUnitSeconds(activeTempoBpm || currentScore.pulse, rhythm, barLock44, activeGridSteps);
    currentTransport.delay.delayTime.setTargetAtTime(delayTimeFor(currentScore, 60 / (unit * 2), effectiveRhythmIndex(currentScore, activeGenre), unit), audioContext.currentTime, 0.08);
  }
  elements.status.textContent = activeGridSteps === 16
    ? "16-STEP GRID ENGAGED · 4/4 STRAIGHT SIXTEENTH NOTES"
    : "12-STEP GRID ENGAGED · VINTAGE PARLOR SHUFFLE";
  recordHistoryAction(activeGridSteps === 16 ? "Grid: 16 Steps (4/4)" : "Grid: 12 Steps (Triplet)");
});

elements.transportLiveRec?.addEventListener("click", async () => {
  if (!currentScore) return;
  await ensureAudioContext();
  if (transportState.state !== TRANSPORT_STATES.PLAYING) {
    await runTransportCommand("play");
  }
  if (!liveRecorder) return;
  if (liveRecorder.getState() === LIVE_REC_STATES.IDLE) {
    if (audioContext) liveRecorder.setSampleRate(audioContext.sampleRate);
    const bpm = activeTempoBpm || currentScore.pulse;
    liveRecorder.arm({ bpm, gridSteps: activeGridSteps, contextTime: audioContext?.currentTime ?? 0 });
    attachLiveAudioTap();
    elements.status.textContent = "LIVE REC ARMED · WILL BEGIN CAPTURE ON NEXT DOWNBEAT";
  } else if (liveRecorder.getState() === LIVE_REC_STATES.ARMED_START) {
    liveRecorder.requestStop();
    detachLiveAudioTap();
    elements.status.textContent = "LIVE REC DISARMED";
  } else if (liveRecorder.getState() === LIVE_REC_STATES.RECORDING) {
    liveRecorder.requestStop();
    elements.status.textContent = "LIVE REC STOPPING · WILL FINISH CAPTURE ON NEXT DOWNBEAT";
  }
});

elements.shareLink?.addEventListener("click", () => {
  copyShareLink();
});

elements.exportPng?.addEventListener("click", () => {
  exportSpecimenPng();
});

elements.exportWav?.addEventListener("click", () => {
  exportSpecimenWav();
});

elements.exportStems?.addEventListener("click", () => {
  exportSpecimenStems();
});

elements.exportMidi?.addEventListener("click", () => {
  exportSpecimenMidi();
});

elements.exportLiveWav?.addEventListener("click", () => {
  if (!lastLiveTake?.wavBytes || !currentScore) return;
  const key = keyLabelFor(currentScore.root, currentScore.scale);
  const wavName = exportFilename(currentScore, { bpm: lastLiveTake.take.bpm, keyAscii: key.ascii, suffix: "live-take", extension: "wav" });
  downloadBlob(new Blob([lastLiveTake.wavBytes], { type: "audio/wav" }), wavName);
  elements.status.textContent = "DOWNLOADED LIVE WAV TAKE ☊";
});

elements.exportLiveMidi?.addEventListener("click", () => {
  if (!lastLiveTake?.midiBytes || !currentScore) return;
  const key = keyLabelFor(currentScore.root, currentScore.scale);
  const midiName = exportFilename(currentScore, { bpm: lastLiveTake.take.bpm, keyAscii: key.ascii, suffix: "live-take", extension: "mid" });
  downloadBlob(new Blob([lastLiveTake.midiBytes], { type: "audio/midi" }), midiName);
  elements.status.textContent = "DOWNLOADED LIVE MIDI TAKE ♪";
});

elements.midiConnectBtn?.addEventListener("click", async () => {
  if (!isWebMidiSupported()) {
    if (elements.studioTelemetry) elements.studioTelemetry.textContent = "WEB MIDI NOT SUPPORTED IN THIS BROWSER";
    return;
  }
  if (elements.studioTelemetry) elements.studioTelemetry.textContent = "REQUESTING MIDI ACCESS...";
  const access = await requestMidiAccess();
  if (!access) {
    if (elements.studioTelemetry) elements.studioTelemetry.textContent = "MIDI ACCESS DENIED OR UNAVAILABLE";
    return;
  }
  midiAccess = access;
  refreshMidiPorts();
  midiAccess.onstatechange = () => refreshMidiPorts();
  if (elements.midiConnectBtn) {
    elements.midiConnectBtn.textContent = "MIDI CONNECTED ✦";
    elements.midiConnectBtn.disabled = true;
  }
  if (elements.studioTelemetry) elements.studioTelemetry.textContent = "MIDI CONNECTED · READY FOR DAW ROUTING";
});

elements.midiInSelect?.addEventListener("change", (event) => {
  midiInPortId = event.target.value;
  attachMidiInputListener();
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = `MIDI IN: ${elements.midiInSelect.options[elements.midiInSelect.selectedIndex]?.text || midiInPortId}`;
  }
});

elements.midiOutSelect?.addEventListener("change", (event) => {
  midiOutPortId = event.target.value;
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = `MIDI OUT: ${elements.midiOutSelect.options[elements.midiOutSelect.selectedIndex]?.text || midiOutPortId}`;
  }
});

elements.midiBroadcastBtn?.addEventListener("click", () => {
  midiBroadcastActive = !midiBroadcastActive;
  elements.midiBroadcastBtn.setAttribute("aria-pressed", String(midiBroadcastActive));
  elements.midiBroadcastBtn.classList.toggle("is-active", midiBroadcastActive);
  if (!midiBroadcastActive) silenceExternalMidi();
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = midiBroadcastActive
      ? "BROADCASTING GENERATIVE SCORE TO MIDI OUT ✦"
      : "MIDI BROADCAST MUTED";
  }
});

elements.midiClockModeSelect?.addEventListener("change", (event) => {
  const nextMode = MIDI_CLOCK_MODES.includes(event.target.value) ? event.target.value : "internal";
  if (midiClockMode === "master" && nextMode !== "master" && midiAccess && midiOutPortId !== "none" && transportState.state === TRANSPORT_STATES.PLAYING) {
    sendMidiMessage(midiAccess, midiOutPortId, makeMidiStop());
  }
  midiClockMode = nextMode;
  midiClockSlave.reset();
  if (midiClockMode === "master" && currentTransport && audioContext) {
    currentTransport.nextClockTime = audioContext.currentTime;
  }
  updateMidiClockStatus();
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = midiClockMode === "slave"
      ? "MIDI CLOCK SLAVE · LOCKING TO INCOMING 24-PPQ 0xF8 & TRANSPORT"
      : midiClockMode === "master"
        ? "MIDI CLOCK MASTER · TRANSMITTING 24-PPQ 0xF8 & TRANSPORT ON MIDI OUT"
        : "MIDI CLOCK INTERNAL · FREE PARLOR OSCILLATOR";
  }
});

elements.audioSinkSelect?.addEventListener("change", async (event) => {
  selectedAudioSinkId = event.target.value;
  if (audioContext && isSetSinkIdSupported(audioContext)) {
    const success = await setAudioOutputSink(audioContext, selectedAudioSinkId);
    if (elements.studioTelemetry) {
      elements.studioTelemetry.textContent = success
        ? `AUDIO ROUTED ➔ ${elements.audioSinkSelect.options[elements.audioSinkSelect.selectedIndex]?.text || selectedAudioSinkId}`
        : "AUDIO ROUTING FAILED";
    }
  } else if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = "AUDIO ROUTING APPLIES ON SOUND START";
  }
});

elements.midiInChannelSelect?.addEventListener("change", (event) => {
  inboundMidiChannel = event.target.value;
  if (elements.studioTelemetry) {
    elements.studioTelemetry.textContent = `MIDI IN CHANNEL: ${inboundMidiChannel === "omni" ? "OMNI (ALL CHANNELS)" : `CH ${inboundMidiChannel} (MANUAL ORGAN)`}`;
  }
});

elements.studioLocalControlBtn?.addEventListener("click", () => {
  setLocalControl(!localControlEnabled);
});

elements.midiLearnStudioBtn?.addEventListener("click", () => {
  toggleMidiLearnMode();
});

elements.midiLearnMixerBtn?.addEventListener("click", () => {
  toggleMidiLearnMode();
});

elements.midiMapClearBtn?.addEventListener("click", () => {
  clearAllMappings(midiLearnState);
  saveMidiMapToStorage(window.localStorage, midiLearnState);
  syncMidiLearnUI();
});

elements.midiMapResetBtn?.addEventListener("click", () => {
  resetToBuiltinDefaults(midiLearnState);
  saveMidiMapToStorage(window.localStorage, midiLearnState);
  syncMidiLearnUI();
});

elements.midiFeedbackToggle?.addEventListener("change", (e) => {
  midiLearnState.feedbackEnabled = e.target.checked;
  saveMidiMapToStorage(window.localStorage, midiLearnState);
});

elements.studioUndoBtn?.addEventListener("click", () => {
  performUndo();
});

elements.studioRedoBtn?.addEventListener("click", () => {
  performRedo();
});

elements.studioHistoryClearBtn?.addEventListener("click", () => {
  if (!currentScore) return;
  historyState = clearHistory(historyState);
  syncHistoryUI();
});

document.addEventListener("click", (event) => {
  if (!midiLearnState.learning) return;
  const targetEl = event.target?.closest?.("[data-midi-target]");
  if (!targetEl) return;
  if (event.target?.closest?.(".midi-map-chip-remove, #midi-learn-mixer-btn, #midi-learn-studio-btn, #midi-map-clear-btn, #midi-map-reset-btn")) return;

  event.preventDefault();
  event.stopPropagation();

  const targetId = targetEl.dataset.midiTarget;
  if (midiLearnState.armedTargetId === targetId) {
    disarmTarget(midiLearnState);
  } else {
    armTarget(midiLearnState, targetId);
  }
  syncMidiLearnUI();
}, true);

window.addEventListener("hashchange", () => {
  const hashPhrase = decodeOmenHash(window.location.hash);
  if (hashPhrase && (!currentScore || currentScore.phrase !== hashPhrase)) {
    elements.phrase.value = hashPhrase;
    summon(hashPhrase, { playAudio: Boolean(audioContext && !muted) });
  }
});

elements.sound.addEventListener("click", () => {
  muted = !muted;
  elements.sound.setAttribute("aria-pressed", String(muted));
  elements.sound.setAttribute("aria-label", muted ? "Enable sound" : "Mute sound");
  if (audioContext && thereminMasterGain) {
    const now = audioContext.currentTime;
    thereminMasterGain.gain.cancelScheduledValues(now);
    thereminMasterGain.gain.setTargetAtTime(muted || !localControlEnabled ? 0 : masterGainFor(masterVolume), now, 0.018);
  }
  if (muted) {
    thereminVoice?.silence();
    interaction.thereminActive = false;
    const resumeStep = stopCurrentSound();
    if (resumeStep !== null) {
      transportState = Object.freeze({ state: transportState.state, cursor: resumeStep });
    }
    elements.status.textContent = currentScore ? "OMEN MUTED" : "AWAITING INPUT";
  } else if (currentScore && transportState.state === TRANSPORT_STATES.PLAYING) {
    playScore(currentScore, { cursor: transportState.cursor });
  } else if (currentScore) {
    elements.status.textContent = transportState.state === TRANSPORT_STATES.PAUSED ? "OMEN PAUSED · BELL UNSEALED" : "BELL UNSEALED · PRESS PLAY";
  }
});

elements.volume.addEventListener("input", (event) => {
  setMasterVolume(event.currentTarget.value);
  recordHistoryAction(`Master Volume: ${Math.round(masterVolume)}%`, { immediate: false });
});

elements.volume.addEventListener("change", () => {
  recordHistoryAction(`Master Volume: ${Math.round(masterVolume)}%`, { immediate: true });
});

elements.tempo?.addEventListener("input", (event) => {
  setTempoBpm(event.currentTarget.value);
  recordHistoryAction(`Tempo: ${activeTempoBpm} BPM`, { immediate: false });
});

elements.tempo?.addEventListener("change", () => {
  recordHistoryAction(`Tempo: ${activeTempoBpm} BPM`, { immediate: true });
});

elements.tempo?.addEventListener("dblclick", () => {
  if (currentScore) {
    setTempoBpm(musicalPocketBpm(currentScore.pulse));
    recordHistoryAction(`Reset Tempo: ${activeTempoBpm} BPM`);
  }
});

try {
  const [oracleResponse, beatResponse, bassResponse, harmonyResponse, pietResponse, fractranResponse, chantResponse, conductorResponse, rulebooksResponse] = await Promise.all([
    fetch(sourceUrl("oracle.lol")),
    fetch(sourceUrl("beat.mal")),
    fetch(sourceUrl("bass.bf")),
    fetch(sourceUrl("harmony.bfg")),
    fetch(sourceUrl("pad.piet")),
    fetch(sourceUrl("chimes.frac")),
    fetch(sourceUrl("chant.spl")),
    fetch(sourceUrl("conductor.i")),
    fetch(sourceUrl("rulebooks.ni")),
  ]);
  if (!oracleResponse.ok) throw new Error(`Oracle source returned ${oracleResponse.status}`);
  if (!beatResponse.ok) throw new Error(`Malbolge source returned ${beatResponse.status}`);
  if (!bassResponse.ok) throw new Error(`Brainfuck source returned ${bassResponse.status}`);
  if (!harmonyResponse.ok) throw new Error(`Befunge source returned ${harmonyResponse.status}`);
  if (!pietResponse.ok) throw new Error(`Piet source returned ${pietResponse.status}`);
  if (!fractranResponse.ok) throw new Error(`FRACTRAN source returned ${fractranResponse.status}`);
  if (!chantResponse.ok) throw new Error(`Shakespeare source returned ${chantResponse.status}`);
  if (!conductorResponse.ok) throw new Error(`INTERCAL source returned ${conductorResponse.status}`);
  if (!rulebooksResponse.ok) throw new Error(`Inform 7 rulebooks returned ${rulebooksResponse.status}`);
  let rulebooksSource;
  [oracleSource, beatSource, bassSource, harmonySource, pietSource, fractranSource, chantSource, conductorSource, rulebooksSource] = await Promise.all([
    oracleResponse.text(),
    beatResponse.text(),
    bassResponse.text(),
    harmonyResponse.text(),
    pietResponse.text(),
    fractranResponse.text(),
    chantResponse.text(),
    conductorResponse.text(),
    rulebooksResponse.text(),
  ]);
  // The Kapellmeister's genres live in Inform 7 (D-033). Nothing that reads a
  // genre (the conductor, the Fun Machine, saved presets) runs before this.
  canonicalRulebooksSource = rulebooksSource;
  installRulebooks(compileRulebooks(rulebooksSource));
  // A fresh creature plays the rulebook it writes for itself (D-043).
  activeGenre = CREATURE_GENRE;
  buildGenreMenu();
  updateKapellmeisterUI();
  updateFunKeyboardChordLabels();
  renderPresetList();
  syncSessionButtons();
  renderHerbarium();
  syncHerbariumButtons();
  refreshAudioOutputDevices();
  syncMidiLearnUI();
  syncHistoryUI();
  if (typeof navigator !== "undefined" && navigator.mediaDevices && typeof navigator.mediaDevices.addEventListener === "function") {
    navigator.mediaDevices.addEventListener("devicechange", () => refreshAudioOutputDevices());
  }
  const initialHashPhrase = decodeOmenHash(window.location.hash);
  if (initialHashPhrase) {
    elements.phrase.value = initialHashPhrase;
    await summon(initialHashPhrase, { playAudio: false });
  } else {
    elements.status.textContent = "AWAITING INPUT";
  }
} catch (error) {
  const rulebookProblem = error?.name === "InformError" || String(error?.message).startsWith("Kapellmeister rulebooks");
  elements.status.textContent = rulebookProblem ? "KAPELLMEISTER RULEBOOKS REJECTED" : "SERVE THIS DIRECTORY OVER HTTP";
  console.error(error);
}
