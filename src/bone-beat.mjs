// The Bone Forge & Crucible Beat Machine (P10-02, D-090).
//
// A physical acoustic percussion machine modeling struck bone, resonant mineral
// plates, tempered brass, and quenching steam. Inspired directly by BoneAmanita's
// TheForge (machine/forge.py) and TheCrucible (machine/crucible.py):
//
//   "Gordon: The Janitor. Focus on concrete physical nouns. Use heavy mass
//    and kinetic strikes. Hammer the alloy, regulate the voltage, dampen surges,
//    and quench overheating metal in cold mineral brine."
//
// Four Physical Acoustic Percussion Materials:
// 1. Struck Bone (bone / heavy): Hollow, dry, resonant keratin-and-marrow impacts.
// 2. Resonant Mineral Plate (mineral / stone): Deep subterranean lithophone gong thuds.
// 3. Tempered Brass Anvil (brass / kinetic): Piercing, bright metallic rimshots and smithy pings.
// 4. Quenching Steam (steam / quench): Sizzling thermal vapor hiss serving as an organic shaker/hat.
//
// Thermal & Electrical Somatic Engine:
// - Impacts accumulate thermal energy (Heat in °C) and electrical somatic excitation (Voltage in V).
// - Crossing OVERHEAT_TEMPERATURE (80°C) triggers automatic quenching steam discharge on the next downbeat.
// - Dampeners absorb voltage surges, tightening or relaxing polyrhythmic groove flams.

export const FORGE_AMBIENT_TEMP = 24.0;
export const FORGE_OVERHEAT_TEMP = 80.0;
export const FORGE_MAX_VOLTAGE = 20.0;
export const CRUCIBLE_DEFAULT_DAMPENERS = 3;

/**
 * Creates a new state model for The Bone Forge & Crucible Beat Machine.
 */
export function createBoneBeatModel(initial = {}) {
  return {
    enabled: initial.enabled !== undefined ? Boolean(initial.enabled) : true,
    heat: Number(initial.heat) >= 0 ? Number(initial.heat) : FORGE_AMBIENT_TEMP,
    voltage: Number(initial.voltage) >= 0 ? Number(initial.voltage) : 0.0,
    dampeners: Number.isInteger(initial.dampeners) ? initial.dampeners : CRUCIBLE_DEFAULT_DAMPENERS,
    instability: Number(initial.instability) || 0.0,
    status: initial.status || "TEMPERED", // "TEMPERED" | "OVERHEAT" | "QUENCHED" | "SURGE"
    totalStrikes: Number(initial.totalStrikes) || 0,
    lastQuenchAt: 0,
  };
}

/**
 * Deterministically composes a polyrhythmic Bone Beat sequence for a creature score.
 * Generates an array of step objects across gridSteps (12 or 16).
 */
export function composeBoneBeat(score, gridSteps = 12, mutation = 0) {
  const stepsCount = gridSteps === 16 ? 16 : 12;
  const seed = ((score?.seed ?? 132071) + mutation * 7919) >>> 0;
  const pulse = score?.pulse ?? 72;
  const beatMode = (score?.beatMode ?? 0) % 8;

  // LCG pseudo-random generator seeded from creature and mutation
  let state = seed;
  const nextRnd = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };

  const steps = [];
  // Build Euclidean and cross-rhythm masks based on beatMode:
  // beatMode 0: Automaton March (heavy steady bone pulse)
  // beatMode 1: Seance Waltz (3 against 4 polyrhythm)
  // beatMode 2: Pendulum Galop (rapid kinetic brass anvil hockets)
  // beatMode 3: Telegram Clatter (syncopated mineral rolls)
  // beatMode 4: Subterranean Foundry (heavy stone & bone downbeats)
  // beatMode 5: Bell-Tower Toll (sparse deep mineral plates)
  // beatMode 6: Alchemical Loom (dense polyrhythmic weaving)
  // beatMode 7: Infernal Habanera (syncopated Spanish habanera swing)

  for (let i = 0; i < stepsCount; i += 1) {
    const isDownbeat = i % 4 === 0;
    const isQuarter = stepsCount === 12 ? (i % 3 === 0) : (i % 4 === 0);
    const isOffbeat = !isQuarter;

    let bone = 0;
    let mineral = 0;
    let brass = 0;
    let steam = 0;

    // 1. Struck Bone: steady rhythmic foundation with organic flams
    if (stepsCount === 12) {
      if (i === 0 || i === 6) bone = 2; // accented strikes
      else if (i === 3 || i === 9) bone = 1;
      else if (beatMode === 2 || beatMode === 6) {
        if (i === 4 || i === 10) bone = 1;
      }
    } else {
      // 16-step straight grid
      if (i === 0 || i === 8) bone = 2;
      else if (i === 4 || i === 12) bone = 1;
      else if (i === 6 || i === 14) bone = 1;
    }

    // 2. Resonant Mineral Plate: deep grounding subterranean plates
    if (stepsCount === 12) {
      if (i === 0) mineral = 2;
      else if (i === 6 && (beatMode === 1 || beatMode === 4 || beatMode === 5)) mineral = 1;
      else if (i === 8 && beatMode === 7) mineral = 1;
    } else {
      if (i === 0) mineral = 2;
      else if (i === 8) mineral = 1;
      else if (i === 10 && beatMode === 7) mineral = 1;
    }

    // 3. Tempered Brass Anvil: syncopated kinetic clinks and smithy pings
    if (stepsCount === 12) {
      if (i === 2 || i === 8) brass = 1;
      else if ((i === 5 || i === 11) && (beatMode === 0 || beatMode === 2 || beatMode === 6)) brass = 2;
    } else {
      if (i === 2 || i === 6 || i === 10 || i === 14) brass = 1;
      if (i === 4 || i === 12) brass = (beatMode % 2 === 0) ? 2 : 1;
    }

    // 4. Quenching Steam: rhythmic offbeat sizzles and periodic vapor releases
    if (stepsCount === 12) {
      if (i === 4 || i === 10) steam = 1;
      else if (i === 7 && nextRnd() > 0.4) steam = 1;
    } else {
      if (i === 2 || i === 6 || i === 10 || i === 14) steam = 1;
      if (i === 12 && nextRnd() > 0.3) steam = 2;
    }

    // Dynamic variation based on creature pulse
    const velocity = 0.65 + nextRnd() * 0.35;

    steps.push({
      step: i,
      bone,
      mineral,
      brass,
      steam,
      velocity: Math.round(velocity * 100) / 100,
    });
  }

  return {
    steps,
    gridSteps: stepsCount,
    mutation,
    seed,
  };
}

/**
 * Advances the physical Forge & Crucible state by one playback step.
 * Returns an array of events: ["OVERHEAT", "QUENCH", "DAMPEN", "SURGE"]
 */
export function stepBoneBeat(model, stepData, {
  dt = 0.125,
  externalImpacts = 0,
} = {}) {
  const events = [];
  if (!model.enabled) return events;

  const hits = (stepData?.bone > 0 ? 1 : 0)
    + (stepData?.mineral > 0 ? 1 : 0)
    + (stepData?.brass > 0 ? 1 : 0)
    + externalImpacts;

  model.totalStrikes += hits;

  // Thermal excitation: strikes generate heat; natural cooling dissipates toward ambient
  const heatAdded = hits * 1.8;
  const cooling = (model.heat - FORGE_AMBIENT_TEMP) * Math.min(1, dt * 0.45);
  model.heat = Math.max(FORGE_AMBIENT_TEMP, model.heat + heatAdded - cooling);

  // Electrical excitation: voltage rises with kinetic strikes
  const voltAdded = hits * 0.65;
  const voltDissipation = model.voltage * Math.min(1, dt * 0.85);
  model.voltage = Math.max(0.0, Math.min(FORGE_MAX_VOLTAGE, model.voltage + voltAdded - voltDissipation));

  // Instability calculation
  model.instability = Math.max(0.0, Math.min(1.0, (model.voltage / FORGE_MAX_VOLTAGE) * 0.7 + ((model.heat - FORGE_AMBIENT_TEMP) / (FORGE_OVERHEAT_TEMP - FORGE_AMBIENT_TEMP)) * 0.3));

  // Crucible dampener check on high voltage surge
  if (model.voltage > 14.0 && model.dampeners > 0) {
    model.dampeners -= 1;
    model.voltage *= 0.55;
    model.status = "SURGE";
    events.push("DAMPEN");
  }

  // Automatic quenching on overheat downbeat
  if (model.heat >= FORGE_OVERHEAT_TEMP) {
    model.status = "OVERHEAT";
    events.push("OVERHEAT");
    // Quench on downbeat (step 0 or when steam hits)
    if (stepData?.step === 0 || stepData?.steam === 2) {
      quenchBoneForge(model);
      events.push("QUENCH");
    }
  } else if (model.status !== "QUENCHED" && model.status !== "SURGE") {
    model.status = "TEMPERED";
  }

  return events;
}

/**
 * Triggers an immediate manual or vitrine hammer strike on the forge.
 */
export function strikeBoneForge(model, {
  type = "bone", // "bone" | "mineral" | "brass"
  force = 1.0,
} = {}) {
  model.totalStrikes += 1;
  const heatDelta = type === "brass" ? 3.2 * force : (type === "mineral" ? 2.4 * force : 1.8 * force);
  const voltDelta = type === "brass" ? 1.4 * force : (type === "mineral" ? 0.9 * force : 0.6 * force);

  model.heat = Math.min(120.0, model.heat + heatDelta);
  model.voltage = Math.min(FORGE_MAX_VOLTAGE, model.voltage + voltDelta);

  if (model.heat >= FORGE_OVERHEAT_TEMP) {
    model.status = "OVERHEAT";
  }
}

/**
 * Quenches the hot forge in cold mineral brine, releasing steam and cooling the metals.
 */
export function quenchBoneForge(model) {
  model.heat = FORGE_AMBIENT_TEMP + 5.0;
  model.voltage = Math.max(0.0, model.voltage * 0.25);
  model.status = "QUENCHED";
  model.lastQuenchAt = Date.now();
  if (model.dampeners < CRUCIBLE_DEFAULT_DAMPENERS) {
    model.dampeners = Math.min(CRUCIBLE_DEFAULT_DAMPENERS, model.dampeners + 1);
  }
}

/**
 * Formats user-facing status line for the stage telemetry display.
 */
export function formatBoneBeatTelemetry(model) {
  if (!model.enabled) {
    return "BONE FORGE · MUTED";
  }
  const temp = Math.round(model.heat);
  const volt = model.voltage.toFixed(1);
  const damp = model.dampeners;

  if (model.status === "OVERHEAT") {
    return `BONE FORGE · OVERHEAT (${temp}°C · ${volt}V) · QUENCH READY ♨`;
  }
  if (model.status === "QUENCHED") {
    return `BONE FORGE · QUENCHED · STEAM RELEASED (${temp}°C)`;
  }
  if (model.status === "SURGE") {
    return `BONE FORGE · SURGE DAMPENED (${volt}V · DAMP ${damp})`;
  }
  return `BONE FORGE · TEMPERED · ${temp}°C · ${volt}V · DAMP ${damp}`;
}

// --- Web Audio Physical Acoustic Voice Schedulers ---------------------------

/**
 * Schedules the physical acoustic percussion voices for one Bone Beat step.
 */
export function scheduleBoneBeatStep(context, destination, model, stepData, atTime, stepDuration) {
  if (!context || !destination || !model?.enabled || !stepData) return;

  const vel = stepData.velocity ?? 0.8;

  // 1. Struck Bone (hollow resonant clack)
  if (stepData.bone > 0) {
    const isAccent = stepData.bone === 2;
    triggerBoneStrike(context, destination, "bone", atTime, (isAccent ? 1.0 : 0.75) * vel);
  }

  // 2. Resonant Mineral Plate (subterranean lithophone gong)
  if (stepData.mineral > 0) {
    const isAccent = stepData.mineral === 2;
    triggerBoneStrike(context, destination, "mineral", atTime, (isAccent ? 1.0 : 0.72) * vel);
  }

  // 3. Tempered Brass Anvil (bright smithy ping)
  if (stepData.brass > 0) {
    const isAccent = stepData.brass === 2;
    triggerBoneStrike(context, destination, "brass", atTime, (isAccent ? 1.0 : 0.68) * vel);
  }

  // 4. Quenching Steam (hot vapor sizzle)
  if (stepData.steam > 0) {
    const isAccent = stepData.steam === 2;
    triggerQuenchSteam(context, destination, atTime, (isAccent ? 1.0 : 0.55) * vel);
  }
}

/**
 * Synthesizes a single physical acoustic strike: struck bone, mineral plate, or brass anvil.
 */
export function triggerBoneStrike(context, destination, type = "bone", atTime = null, velocity = 0.8) {
  if (!context || !destination) return;
  const time = atTime ?? context.currentTime;
  const gainScale = Math.max(0.1, Math.min(1.0, velocity));

  if (type === "bone") {
    // Struck Bone: high keratin impact transient + hollow marrow body resonance
    // A) Fast pitch-drop click (1400 -> 380 Hz in 8 ms)
    const clickOsc = context.createOscillator();
    const clickGain = context.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(1400, time);
    clickOsc.frequency.exponentialRampToValueAtTime(380, time + 0.008);

    clickGain.gain.setValueAtTime(0.0001, time);
    clickGain.gain.linearRampToValueAtTime(0.45 * gainScale, time + 0.002);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.022);

    clickOsc.connect(clickGain).connect(destination);
    clickOsc.start(time);
    clickOsc.stop(time + 0.025);

    // B) Hollow marrow cavity body resonance (210 Hz bandpass)
    const bodyOsc = context.createOscillator();
    const bodyGain = context.createGain();
    bodyOsc.type = "triangle";
    bodyOsc.frequency.setValueAtTime(210, time);
    bodyOsc.frequency.exponentialRampToValueAtTime(160, time + 0.08);

    const bodyFilter = context.createBiquadFilter();
    bodyFilter.type = "bandpass";
    bodyFilter.frequency.setValueAtTime(220, time);
    bodyFilter.Q.setValueAtTime(3.8, time);

    bodyGain.gain.setValueAtTime(0.0001, time);
    bodyGain.gain.linearRampToValueAtTime(0.55 * gainScale, time + 0.003);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.095);

    bodyOsc.connect(bodyFilter).connect(bodyGain).connect(destination);
    bodyOsc.start(time);
    bodyOsc.stop(time + 0.10);
  } else if (type === "mineral") {
    // Resonant Mineral Plate: deep subterranean stone gong thud with plate Bessel modes
    const fundamental = 82; // E2 mineral plate
    const partialRatios = [1.0, 2.29, 3.42];
    const partialGains = [0.65, 0.28, 0.14];

    for (let p = 0; p < partialRatios.length; p += 1) {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = p === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(fundamental * partialRatios[p], time);

      const decay = p === 0 ? 0.22 : (0.16 / partialRatios[p]);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(partialGains[p] * gainScale, time + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

      osc.connect(gain).connect(destination);
      osc.start(time);
      osc.stop(time + decay + 0.01);
    }
  } else if (type === "brass") {
    // Tempered Brass Anvil: piercing metallic ping with ringing anvil partials
    const pingFreqs = [1680, 2940, 4410];
    const pingWeights = [0.45, 0.35, 0.20];

    for (let i = 0; i < pingFreqs.length; i += 1) {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(pingFreqs[i], time);

      const decay = 0.18 + (2 - i) * 0.08;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(pingWeights[i] * 0.5 * gainScale, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

      osc.connect(gain).connect(destination);
      osc.start(time);
      osc.stop(time + decay + 0.01);
    }
  }
}

/**
 * Synthesizes quenching steam hiss (thermal shock vapor release).
 */
export function triggerQuenchSteam(context, destination, atTime = null, intensity = 0.8) {
  if (!context || !destination) return;
  const time = atTime ?? context.currentTime;
  const duration = Math.min(0.45, Math.max(0.12, 0.18 + intensity * 0.22));

  // Synthesize white noise buffer
  const sampleRate = context.sampleRate || 44100;
  const bufferLength = Math.floor(sampleRate * duration);
  const buffer = context.createBuffer(1, bufferLength, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferLength; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - (i / bufferLength) ** 0.85);
  }

  const noise = context.createBufferSource();
  noise.buffer = buffer;

  // Sweeping bandpass filter: hot high sizzle dropping to dispersing steam vapor
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(5800, time);
  filter.frequency.exponentialRampToValueAtTime(1600, time + duration);
  filter.Q.setValueAtTime(2.8, time);

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.42 * intensity, time + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  noise.connect(filter).connect(gain).connect(destination);
  noise.start(time);
  noise.stop(time + duration + 0.01);
}
