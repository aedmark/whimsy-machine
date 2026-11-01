// Downbeat-quantized live stream audio & MIDI recording engine (P11-02, D-099).
//
// Pure state machine and buffer collector: taps master stereo Float32 PCM audio
// and logs live musical events (chords, leads, drums, bass, arpeggios, and
// vitrine gestures). Synchronizes arming on downbeat step 0 and finishes capture
// cleanly on the next downbeat loop boundary, guaranteeing integer-bar loop
// alignment for DAW production.

import { encodeWav, PEAK_CEILING_DB } from "./audio-export.mjs";
import { MIDI_TRACKS, buildMidiFile, funVoiceTracks, ticksForSeconds, velocitiesFor } from "./midi.mjs";

export const LIVE_REC_STATES = Object.freeze({
  IDLE: "idle",
  ARMED_START: "armed_start",
  RECORDING: "recording",
  ARMED_STOP: "armed_stop",
});

export const MAX_RECORDING_MINUTES = 10;

export const LIVE_MIDI_TRACKS = Object.freeze([
  ...MIDI_TRACKS,
  Object.freeze({ id: "forge", name: "FORGE · BONE BEAT", channel: 9, program: null }),
  Object.freeze({ id: "harp", name: "HARP · SPORE HARP", channel: 6, program: 46 }),
  Object.freeze({ id: "fungal", name: "MYCELIUM · PLANTWAVE", channel: 7, program: 98 }),
  Object.freeze({ id: "theremin", name: "THEREMIN · AETHERIC BONE", channel: 8, program: 54 }),
]);

/**
 * Creates a downbeat-quantized live stream recorder instance.
 */
export function createLiveRecorder({
  sampleRate = 44100,
  maxMinutes = MAX_RECORDING_MINUTES,
  onStateChange = null,
  onTakeComplete = null,
} = {}) {
  let state = LIVE_REC_STATES.IDLE;
  let chunksL = [];
  let chunksR = [];
  let totalCapturedFrames = 0;
  let streamStartContextTime = null;
  let startContextTime = null;
  let endContextTime = null;
  let startFrame = 0;
  let endFrame = 0;
  let barsRecorded = 0;
  let activeBpm = 108;
  let activeGridSteps = 12;
  let noteLog = [];
  let lastTake = null;

  const maxFrames = Math.round(maxMinutes * 60 * sampleRate);

  function notify() {
    if (typeof onStateChange === "function") {
      onStateChange(state, getTelemetry());
    }
  }

  function getTelemetry() {
    switch (state) {
      case LIVE_REC_STATES.IDLE:
        return lastTake ? `REC: READY (${lastTake.bars} BARS)` : "REC: IDLE";
      case LIVE_REC_STATES.ARMED_START:
        return "● ARMED (DOWNBEAT SYNC)";
      case LIVE_REC_STATES.RECORDING:
        return `● REC [BAR ${barsRecorded + 1}]`;
      case LIVE_REC_STATES.ARMED_STOP:
        return "■ STOPPING ON DOWNBEAT...";
      default:
        return "REC: IDLE";
    }
  }

  function arm({ bpm = 108, gridSteps = 12, contextTime = null } = {}) {
    if (state !== LIVE_REC_STATES.IDLE) return false;
    state = LIVE_REC_STATES.ARMED_START;
    chunksL = [];
    chunksR = [];
    totalCapturedFrames = 0;
    streamStartContextTime = contextTime;
    startContextTime = null;
    endContextTime = null;
    startFrame = 0;
    endFrame = 0;
    barsRecorded = 0;
    activeBpm = Number(bpm) || 108;
    activeGridSteps = Number(gridSteps) || 12;
    noteLog = [];
    notify();
    return true;
  }

  function requestStop() {
    if (state === LIVE_REC_STATES.ARMED_START) {
      state = LIVE_REC_STATES.IDLE;
      chunksL = [];
      chunksR = [];
      totalCapturedFrames = 0;
      notify();
      return true;
    }
    if (state === LIVE_REC_STATES.RECORDING) {
      state = LIVE_REC_STATES.ARMED_STOP;
      notify();
      return true;
    }
    return false;
  }

  function processAudioBlock(ch0, ch1, contextTime = null) {
    if (state === LIVE_REC_STATES.IDLE) return;
    if (streamStartContextTime === null && contextTime !== null) {
      streamStartContextTime = contextTime;
    }
    const len = ch0?.length || 0;
    if (len === 0) return;

    chunksL.push(new Float32Array(ch0));
    chunksR.push(new Float32Array(ch1 || ch0));
    totalCapturedFrames += len;

    if (totalCapturedFrames >= maxFrames) {
      forceFinalize(contextTime);
    }
  }

  function onDownbeat(downbeatContextTime, stepIndex = 0) {
    if (state === LIVE_REC_STATES.ARMED_START) {
      state = LIVE_REC_STATES.RECORDING;
      startContextTime = downbeatContextTime;
      if (streamStartContextTime !== null && downbeatContextTime >= streamStartContextTime) {
        const elapsed = downbeatContextTime - streamStartContextTime;
        startFrame = Math.min(totalCapturedFrames, Math.round(elapsed * sampleRate));
      } else {
        startFrame = totalCapturedFrames;
      }
      barsRecorded = 0;
      notify();
      return;
    }
    if (state === LIVE_REC_STATES.RECORDING) {
      barsRecorded += 1;
      notify();
      return;
    }
    if (state === LIVE_REC_STATES.ARMED_STOP) {
      barsRecorded += 1;
      endContextTime = downbeatContextTime;
      if (streamStartContextTime !== null && downbeatContextTime >= streamStartContextTime) {
        const elapsed = downbeatContextTime - streamStartContextTime;
        endFrame = Math.min(totalCapturedFrames, Math.round(elapsed * sampleRate));
      } else {
        endFrame = totalCapturedFrames;
      }
      finalizeTake();
    }
  }

  function forceFinalize(contextTime = null) {
    if (state === LIVE_REC_STATES.IDLE) return;
    if (state === LIVE_REC_STATES.ARMED_START) {
      state = LIVE_REC_STATES.IDLE;
      chunksL = [];
      chunksR = [];
      totalCapturedFrames = 0;
      notify();
      return;
    }
    endContextTime = contextTime ?? (startContextTime !== null ? startContextTime + (totalCapturedFrames - startFrame) / sampleRate : null);
    endFrame = totalCapturedFrames;
    finalizeTake();
  }

  function finalizeTake() {
    state = LIVE_REC_STATES.IDLE;
    const finalStart = Math.min(startFrame, totalCapturedFrames);
    const finalEnd = Math.max(finalStart, Math.min(endFrame || totalCapturedFrames, totalCapturedFrames));
    const capturedLength = finalEnd - finalStart;

    let sliceL;
    let sliceR;
    if (capturedLength <= 0 || chunksL.length === 0) {
      sliceL = new Float32Array(0);
      sliceR = new Float32Array(0);
    } else {
      const fullL = new Float32Array(totalCapturedFrames);
      const fullR = new Float32Array(totalCapturedFrames);
      let offset = 0;
      for (let i = 0; i < chunksL.length; i++) {
        fullL.set(chunksL[i], offset);
        fullR.set(chunksR[i], offset);
        offset += chunksL[i].length;
      }
      sliceL = fullL.slice(finalStart, finalEnd);
      sliceR = fullR.slice(finalStart, finalEnd);
    }

    // Peak ceiling enforcement (-1 dBFS)
    const ceilingLinear = Math.pow(10, PEAK_CEILING_DB / 20);
    let peak = 0;
    for (let i = 0; i < sliceL.length; i++) {
      const a = Math.abs(sliceL[i]);
      const b = Math.abs(sliceR[i]);
      if (a > peak) peak = a;
      if (b > peak) peak = b;
    }
    if (peak > ceilingLinear && peak > 0) {
      const attenuation = ceilingLinear / peak;
      for (let i = 0; i < sliceL.length; i++) {
        sliceL[i] *= attenuation;
        sliceR[i] *= attenuation;
      }
    }

    const durationSeconds = sliceL.length / sampleRate;
    const finalBars = Math.max(1, barsRecorded);

    // Filter MIDI noteLog for notes sounding during the active window
    const activeNotes = noteLog.filter((note) => {
      if (startContextTime === null || endContextTime === null) return true;
      return note.at >= startContextTime && note.at < endContextTime;
    });

    const take = Object.freeze({
      sliceL,
      sliceR,
      sampleRate,
      frames: sliceL.length,
      duration: durationSeconds,
      bars: finalBars,
      bpm: activeBpm,
      gridSteps: activeGridSteps,
      startContextTime,
      endContextTime,
      noteLog: Object.freeze(activeNotes),
    });
    lastTake = take;

    chunksL = [];
    chunksR = [];
    totalCapturedFrames = 0;
    notify();

    if (typeof onTakeComplete === "function") {
      onTakeComplete(take);
    }
  }

  function logNote(event) {
    if (state === LIVE_REC_STATES.RECORDING || state === LIVE_REC_STATES.ARMED_STOP) {
      noteLog.push(event);
    }
  }

  return {
    arm,
    requestStop,
    forceFinalize,
    processAudioBlock,
    onDownbeat,
    logNote,
    getState: () => state,
    getTelemetry,
    getLastTake: () => lastTake,
    setSampleRate: (rate) => { sampleRate = rate; },
    getBarsRecorded: () => barsRecorded,
  };
}

/**
 * Builds a studio-grade master WAV from a completed live take.
 */
export function buildLiveTakeWav(take, score, {
  bitDepth = "24",
} = {}) {
  if (!take || !take.frames) return null;
  const loop = { start: 0, end: take.frames };
  const beats = Math.max(1, Math.round(take.duration * (take.bpm / 60)));
  const acid = {
    oneShot: false,
    rootNote: score?.root ?? 60,
    beats,
  };
  const info = {
    name: score?.name ? `${score.name} (Live Take)` : "Live Take",
    software: "The Whimsy Machine",
    comment: `Recorded live; ${take.bars} bar(s) at ${take.bpm} BPM`,
  };
  return encodeWav([take.sliceL, take.sliceR], take.sampleRate, {
    bitDepth,
    dither: true,
    loop,
    acid,
    info,
  });
}

/**
 * Builds a Standard MIDI File (Type 1) from notes transcribed during the live take.
 */
export function buildLiveTakeMidi(take, score, {
  format = "clean",
} = {}) {
  if (!take) return null;
  const bpm = take.bpm || 108;
  const t0 = take.startContextTime ?? 0;
  const duration = Math.max(0.01, take.duration || 1);
  const lengthTicks = ticksForSeconds(duration, bpm);

  // Group notes into MIDI parts: include somatic and bio-acoustic channels when events exist
  const parts = LIVE_MIDI_TRACKS.flatMap((track) => {
    const events = take.noteLog.filter((event) => event.channel === track.id);
    if (!events.length && !MIDI_TRACKS.some((mt) => mt.id === track.id)) {
      return [];
    }
    return track.id === "fun" ? funVoiceTracks(track, events) : [{ ...track, events }];
  });

  const tracks = parts.map(({ events, ...track }) => {
    const velocities = velocitiesFor(events.map((event) => event.peak));
    return {
      ...track,
      notes: events.map((event, index) => {
        const relAt = Math.max(0, event.at - t0);
        return {
          tick: ticksForSeconds(relAt, bpm),
          duration: Math.max(1, ticksForSeconds(event.duration, bpm)),
          midi: event.midi,
          velocity: velocities[index],
        };
      }),
    };
  });

  const stripPrograms = format !== "full";
  const stripMarkers = format === "clean";
  const flattenChannels = format === "clean";

  return buildMidiFile({
    bpm,
    tracks,
    lengthTicks,
    title: score?.name ? `${score.name} (Live Take)` : "Live Take",
    stripPrograms,
    stripMarkers,
    flattenChannels,
    rootMidi: score?.root ?? null,
    scaleIndex: score?.scale ?? 0,
  });
}
