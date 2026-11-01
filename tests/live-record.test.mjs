import assert from "node:assert/strict";
import test from "node:test";

import {
  LIVE_MIDI_TRACKS,
  LIVE_REC_STATES,
  buildLiveTakeMidi,
  buildLiveTakeWav,
  createLiveRecorder,
} from "../src/live-recorder.mjs";

test("live recorder lifecycle transitions: IDLE -> ARMED_START -> RECORDING -> ARMED_STOP -> IDLE", () => {
  const transitions = [];
  const recorder = createLiveRecorder({
    sampleRate: 1000, // 1000 samples/sec for easy arithmetic
    onStateChange: (state, telemetry) => {
      transitions.push({ state, telemetry });
    },
  });

  assert.equal(recorder.getState(), LIVE_REC_STATES.IDLE);
  assert.equal(recorder.getTelemetry(), "REC: IDLE");

  // 1. Arming
  assert.equal(recorder.arm({ bpm: 120, gridSteps: 12, contextTime: 1.0 }), true);
  assert.equal(recorder.getState(), LIVE_REC_STATES.ARMED_START);
  assert.equal(recorder.getTelemetry(), "● ARMED (DOWNBEAT SYNC)");
  assert.equal(recorder.arm(), false, "cannot double-arm");

  // Stream some audio blocks before downbeat arrives
  recorder.processAudioBlock(new Float32Array(500), new Float32Array(500), 1.0); // 0.5s audio

  // 2. Downbeat triggers recording start
  recorder.onDownbeat(1.5, 0); // 1.5s = streamStart (1.0) + 0.5s = frame 500
  assert.equal(recorder.getState(), LIVE_REC_STATES.RECORDING);
  assert.equal(recorder.getTelemetry(), "● REC [BAR 1]");
  assert.equal(recorder.getBarsRecorded(), 0);

  // Stream 1 bar of audio (1000 samples = 1s = 2 beats at 120 bpm)
  recorder.processAudioBlock(new Float32Array(1000), new Float32Array(1000), 1.5);
  recorder.onDownbeat(2.5, 0);
  assert.equal(recorder.getBarsRecorded(), 1);
  assert.equal(recorder.getTelemetry(), "● REC [BAR 2]");

  // Stream another bar
  recorder.processAudioBlock(new Float32Array(1000), new Float32Array(1000), 2.5);
  recorder.onDownbeat(3.5, 0);
  assert.equal(recorder.getBarsRecorded(), 2);
  assert.equal(recorder.getTelemetry(), "● REC [BAR 3]");

  // 3. Request stop
  assert.equal(recorder.requestStop(), true);
  assert.equal(recorder.getState(), LIVE_REC_STATES.ARMED_STOP);
  assert.equal(recorder.getTelemetry(), "■ STOPPING ON DOWNBEAT...");

  // Stream final bar before next downbeat
  recorder.processAudioBlock(new Float32Array(1000), new Float32Array(1000), 3.5);

  // 4. Final downbeat finishes take
  let completedTake = null;
  const completingRecorder = createLiveRecorder({
    sampleRate: 1000,
    onTakeComplete: (take) => {
      completedTake = take;
    },
  });
  completingRecorder.arm({ bpm: 120, gridSteps: 12, contextTime: 0.0 });
  completingRecorder.onDownbeat(0.0, 0);
  completingRecorder.processAudioBlock(new Float32Array(2000), new Float32Array(2000), 0.0);
  completingRecorder.onDownbeat(1.0, 0); // bar 1
  completingRecorder.requestStop();
  completingRecorder.onDownbeat(2.0, 0); // bar 2 finishes

  assert.ok(completedTake);
  assert.equal(completedTake.bars, 2);
  assert.equal(completedTake.frames, 2000);
  assert.equal(completedTake.duration, 2.0);
  assert.equal(completingRecorder.getState(), LIVE_REC_STATES.IDLE);
  assert.equal(completingRecorder.getTelemetry(), "REC: READY (2 BARS)");
});

test("live recorder cancels cleanly from ARMED_START", () => {
  const recorder = createLiveRecorder({ sampleRate: 1000 });
  recorder.arm({ bpm: 100, gridSteps: 12, contextTime: 1.0 });
  assert.equal(recorder.getState(), LIVE_REC_STATES.ARMED_START);

  // Stop before any downbeat
  assert.equal(recorder.requestStop(), true);
  assert.equal(recorder.getState(), LIVE_REC_STATES.IDLE);
  assert.equal(recorder.getLastTake(), null);
});

test("forceFinalize immediately captures live take if transport halts", () => {
  let completedTake = null;
  const recorder = createLiveRecorder({
    sampleRate: 1000,
    onTakeComplete: (take) => {
      completedTake = take;
    },
  });
  recorder.arm({ bpm: 120, gridSteps: 12, contextTime: 0.0 });
  recorder.onDownbeat(0.0, 0);
  recorder.processAudioBlock(new Float32Array(750), new Float32Array(750), 0.0);

  // Transport suddenly stopped by user pressing Escape
  recorder.forceFinalize(0.75);
  assert.equal(recorder.getState(), LIVE_REC_STATES.IDLE);
  assert.ok(completedTake);
  assert.equal(completedTake.frames, 750);
  assert.equal(completedTake.duration, 0.75);
});

test("audio peak ceiling is strictly applied to prevent digital clipping", () => {
  let completedTake = null;
  const recorder = createLiveRecorder({
    sampleRate: 1000,
    onTakeComplete: (take) => {
      completedTake = take;
    },
  });
  recorder.arm({ bpm: 120, gridSteps: 12, contextTime: 0.0 });
  recorder.onDownbeat(0.0, 0);

  // Audio exceeding 1.0 (clipping)
  const hotSignal = new Float32Array([0.5, 1.5, -2.0, 0.8]);
  recorder.processAudioBlock(hotSignal, hotSignal, 0.0);
  recorder.forceFinalize(0.004);

  assert.ok(completedTake);
  const maxL = Math.max(...completedTake.sliceL.map(Math.abs));
  // -1 dBFS is ~0.89125
  assert.ok(maxL <= 0.8913, `Peak must be <= -1 dBFS (~0.89125), was ${maxL}`);
});

test("buildLiveTakeWav produces a valid studio WAV file with metadata", () => {
  const take = {
    sliceL: new Float32Array(44100),
    sliceR: new Float32Array(44100),
    sampleRate: 44100,
    frames: 44100,
    duration: 1.0,
    bars: 1,
    bpm: 120,
    gridSteps: 12,
    startContextTime: 0,
    endContextTime: 1.0,
    noteLog: [],
  };
  const mockScore = { name: "Aetheric Organism", root: 60, scale: 0 };
  const wavBytes = buildLiveTakeWav(take, mockScore, { bitDepth: "24" });
  assert.ok(wavBytes instanceof Uint8Array);
  assert.ok(wavBytes.length > 44100 * 3 * 2);

  const header = String.fromCharCode(...wavBytes.slice(0, 4));
  const format = String.fromCharCode(...wavBytes.slice(8, 12));
  assert.equal(header, "RIFF");
  assert.equal(format, "WAVE");

  // Check for acid chunk and smpl chunk in the WAV
  const fullText = String.fromCharCode(...wavBytes.slice(0, 500));
  assert.ok(fullText.includes("fmt "));
  assert.ok(fullText.includes("acid"));
  assert.ok(fullText.includes("smpl"));
});

test("buildLiveTakeMidi produces an SMF Type 1 file with logged notes", () => {
  const noteLog = [
    { channel: "lead", midi: 60, at: 1.0, duration: 0.5, peak: 0.8 },
    { channel: "fun", midi: 64, at: 1.25, duration: 0.75, peak: 0.9, voice: { key: "velvet_pad", label: "VELVET PAD", program: 89 } },
    { channel: "beat", midi: 36, at: 1.0, duration: 0.1, peak: 1.0 },
    { channel: "bass", midi: 36, at: 1.5, duration: 0.4, peak: 0.7 },
  ];
  const take = {
    sliceL: new Float32Array(88200),
    sliceR: new Float32Array(88200),
    sampleRate: 44100,
    frames: 88200,
    duration: 2.0,
    bars: 2,
    bpm: 120,
    gridSteps: 12,
    startContextTime: 1.0,
    endContextTime: 3.0,
    noteLog,
  };
  const mockScore = { name: "Aetheric Organism", root: 60, scale: 0 };
  const midiBytes = buildLiveTakeMidi(take, mockScore, { format: "full" });
  assert.ok(midiBytes instanceof Uint8Array);

  // Verify SMF Header MThd
  assert.equal(String.fromCharCode(...midiBytes.slice(0, 4)), "MThd");
  // SMF Type 1 (format 1, >1 tracks)
  assert.equal(midiBytes[9], 1);
});

test("buildLiveTakeMidi transcribes somatic and bio-acoustic channels (harp, forge, fungal, theremin)", () => {
  const noteLog = [
    { channel: "lead", midi: 60, at: 1.0, duration: 0.5, peak: 0.8 },
    { channel: "harp", midi: 64, at: 1.1, duration: 0.4, peak: 0.85 },
    { channel: "forge", midi: 35, at: 1.2, duration: 0.2, peak: 0.9 },
    { channel: "fungal", midi: 72, at: 1.3, duration: 0.3, peak: 0.7 },
    { channel: "theremin", midi: 67, at: 1.4, duration: 0.25, peak: 0.6 },
  ];
  const take = {
    sliceL: new Float32Array(44100),
    sliceR: new Float32Array(44100),
    sampleRate: 44100,
    frames: 44100,
    duration: 1.0,
    bars: 1,
    bpm: 120,
    gridSteps: 12,
    startContextTime: 1.0,
    endContextTime: 2.0,
    noteLog,
  };
  const mockScore = { name: "Bio-Organism", root: 60, scale: 0 };
  const midiBytes = buildLiveTakeMidi(take, mockScore, { format: "full" });
  assert.ok(midiBytes instanceof Uint8Array);
  assert.equal(String.fromCharCode(...midiBytes.slice(0, 4)), "MThd");

  // Track count in header bytes 10-11 should include standard tracks plus the 4 somatic channels
  const trackCount = (midiBytes[10] << 8) | midiBytes[11];
  assert.ok(trackCount >= 11, `Expected >= 11 tracks including somatic channels, got ${trackCount}`);

  // Check LIVE_MIDI_TRACKS ids
  assert.ok(LIVE_MIDI_TRACKS.some((t) => t.id === "harp"));
  assert.ok(LIVE_MIDI_TRACKS.some((t) => t.id === "forge"));
  assert.ok(LIVE_MIDI_TRACKS.some((t) => t.id === "fungal"));
  assert.ok(LIVE_MIDI_TRACKS.some((t) => t.id === "theremin"));
});
