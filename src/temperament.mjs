// Creature Temperaments & Multi-Archetype Vitrine Tap Dynamics (P12-05, D-106)
//
// In early versions, every summoned specimen reacted identically to vitrine taps:
// a generic chime percussion, escalating to a violent glass-cracking retaliation lunge
// on the 6th tap, followed by sulking.
//
// This module deterministically derives one of five expressive psychological and
// somatic temperaments for each creature from its score traits:
// 1. THE RETALIATOR (Aggressive / Defensive): lunges at glass, fractures vitrine, sub-bass boom
// 2. THE TIMID HERMIT (Shy / Melancholy): retreats into shadows without hitting glass, hushes audio
// 3. THE PLAYFUL MUSICIAN (Responsive / Melodic): plays responsive scale/arpeggio notes, cadenza flurry
// 4. THE CHROMATOPHORE (Bioluminescent / Iridescent): dynamically shifts hue on tap, auroral discharge
// 5. THE STOIC CLOCKWORK (Indifferent / Mechanical): dry escapement ticks, absorbs strikes, remains unmoved

export const TEMPERAMENT_IDS = Object.freeze([
  "retaliator",
  "timid",
  "musician",
  "chromatophore",
  "stoic",
]);

export const TEMPERAMENTS = Object.freeze({
  retaliator: Object.freeze({
    id: "retaliator",
    name: "THE RETALIATOR",
    archetype: "AGGRESSIVE / DEFENSIVE",
    description: "Defends its bell jar fiercely. Rapid tapping provokes violent lunges, stress fractures in the glass, and sub-bass resonance.",
    tapSound: "strike",
    maxAgitation: 1.0,
    agitationRate: 0.18,
    escalationStreak: 6,
    calmLabel: "VITRINE DISTURBED",
    irritatedLabel: "ORGANISM AGITATED",
    escalatedLabel: "SPECIMEN RETALIATES · GLASS FRACTURED",
    cooldownLabel: "SPECIMEN SULKING · REFUSES CONTACT",
  }),
  timid: Object.freeze({
    id: "timid",
    name: "THE TIMID HERMIT",
    archetype: "SHY / MELANCHOLY",
    description: "Shies from physical contact. Taps produce muffled fluttering chimes, and persistent disturbance causes it to flee deep into the shadows without striking the glass.",
    tapSound: "flutter",
    maxAgitation: 0.8,
    agitationRate: 0.22,
    escalationStreak: 4,
    calmLabel: "SPECIMEN FLINCHES",
    irritatedLabel: "SPECIMEN COWERING IN SHADOWS",
    escalatedLabel: "SPECIMEN FLEES INTO CORNER",
    cooldownLabel: "SPECIMEN HIDDEN · AVOIDS THE PERIMETER",
  }),
  musician: Object.freeze({
    id: "musician",
    name: "THE PLAYFUL MUSICIAN",
    archetype: "RESPONSIVE / MELODIC",
    description: "Sings in response to contact. Each tap triggers an improvisation in its native scale, culminating in a virtuosic melodic cadenza under repeated strikes.",
    tapSound: "melody_burst",
    maxAgitation: 0.9,
    agitationRate: 0.14,
    escalationStreak: 5,
    calmLabel: "SPECIMEN SINGS IN RESPONSE",
    irritatedLabel: "SPECIMEN HARMONIZING WITH TAPS",
    escalatedLabel: "SPECIMEN IMPROVISES CADENZA",
    cooldownLabel: "SPECIMEN CATCHING BREATH · WHISPERING MOTIF",
  }),
  chromatophore: Object.freeze({
    id: "chromatophore",
    name: "THE CHROMATOPHORE",
    archetype: "BIOLUMINESCENT / IRIDESCENT",
    description: "Iridescent and photosensitive. Tapping excites its glowing chromatophores, sending ripples of shifting hue across its body and discharging a radiant prismatic auroral flare.",
    tapSound: "shimmer",
    maxAgitation: 0.9,
    agitationRate: 0.16,
    escalationStreak: 5,
    calmLabel: "CHROMATOPHORES EXCITED",
    irritatedLabel: "BIOLUMINESCENT GLOW SURGING",
    escalatedLabel: "AURORAL DISCHARGE · HUE IRIDESCENCE",
    cooldownLabel: "CHROMATOPHORES RESTING · PHOSPHOR COOLING",
  }),
  stoic: Object.freeze({
    id: "stoic",
    name: "THE STOIC CLOCKWORK",
    archetype: "INDIFFERENT / MECHANICAL",
    description: "Unfazed by mortal disturbance. Taps produce dry brass escapement ticks or dull thuds. It neither lunges nor flees, remaining stoically indifferent to strikes.",
    tapSound: "clockwork_tick",
    maxAgitation: 0.35,
    agitationRate: 0.05,
    escalationStreak: 999,
    calmLabel: "SPECIMEN UNMOVED · CLOCKWORK TICK",
    irritatedLabel: "SPECIMEN DISPASSIONATE · DRY ESCAPEMENT",
    escalatedLabel: "SPECIMEN REMAINS UNMOVED",
    cooldownLabel: "SPECIMEN INDIFFERENT TO STRIKES",
  }),
});

// Map the 64 ceremonial adjectives in score.name_a to their natural psychological temperaments
const ADJECTIVE_TEMPERAMENTS = Object.freeze([
  "chromatophore", // 0: CERULEAN
  "musician",      // 1: VELVET
  "timid",         // 2: WOBBLING
  "chromatophore", // 3: LUMINOUS
  "timid",         // 4: TINY
  "stoic",         // 5: ANCIENT
  "musician",      // 6: POLITE
  "retaliator",    // 7: ILLEGAL
  "timid",         // 8: SLEEPY
  "retaliator",    // 9: ELECTRIC
  "musician",      // 10: WAYWARD
  "timid",         // 11: GENTLE
  "retaliator",    // 12: FURIOUS
  "chromatophore", // 13: GLASS
  "timid",         // 14: SECRET
  "timid",         // 15: MOSSY
  "stoic",         // 16: INFINITE
  "timid",         // 17: PAPER
  "musician",      // 18: SIDEWAYS
  "musician",      // 19: HONEYED
  "chromatophore", // 20: ASTRAL
  "retaliator",    // 21: WILD
  "timid",         // 22: LOST
  "musician",      // 23: GIGGLING
  "chromatophore", // 24: ORANGE
  "timid",         // 25: TENDER
  "retaliator",    // 26: UNLICENSED
  "musician",      // 27: FIZZY
  "stoic",         // 28: IMPOSSIBLE
  "timid",         // 29: SOFT
  "retaliator",    // 30: FERAL
  "chromatophore", // 31: NEON
  "musician",      // 32: AERATED
  "chromatophore", // 33: AETHERIAL
  "chromatophore", // 34: AMBER
  "chromatophore", // 35: ASTRONOMICAL
  "timid",         // 36: BEWILDERED
  "stoic",         // 37: BRASS
  "retaliator",    // 38: CADMIUM
  "stoic",         // 39: CHRONIC
  "retaliator",    // 40: CINNABAR
  "stoic",         // 41: CLOCKWORK
  "stoic",         // 42: DAMASK
  "musician",      // 43: ECCENTRIC
  "stoic",         // 44: GILDED
  "chromatophore", // 45: INDIGO
  "retaliator",    // 46: INSOLENT
  "stoic",         // 47: LACQUERED
  "retaliator",    // 48: MAGNETIC
  "timid",         // 49: MELANCHOLY
  "retaliator",    // 50: METEORIC
  "timid",         // 51: NOCTURNAL
  "stoic",         // 52: OBSIDIAN
  "chromatophore", // 53: OPALESCENT
  "musician",      // 54: PARLOR
  "chromatophore", // 55: PHOSPHORESCENT
  "stoic",         // 56: PNEUMATIC
  "retaliator",    // 57: PYRITE
  "stoic",         // 58: QUICKSILVER
  "chromatophore", // 59: SELENITE
  "timid",         // 60: SUBTERRANEAN
  "musician",      // 61: TAROT
  "stoic",         // 62: VERDIGRIS
  "musician",      // 63: VICTORIAN
]);

/**
 * Deterministically derives the creature's temperament from its score parameters.
 *
 * @param {object} score - The validated creature score
 * @returns {object} The frozen temperament object
 */
export function deriveTemperament(score) {
  if (!score) return TEMPERAMENTS.retaliator;

  // If score already has a validated temperament, return it
  if (score.temperament && TEMPERAMENTS[score.temperament.id]) {
    return TEMPERAMENTS[score.temperament.id];
  }

  // Primary mapping via the creature's ceremonial adjective
  const raw = score.rawValues || score;
  const nameA = Number.isInteger(score.name_a) ? score.name_a : (Number.isInteger(raw.name_a) ? raw.name_a : null);
  if (Number.isInteger(nameA) && nameA >= 0 && nameA < ADJECTIVE_TEMPERAMENTS.length) {
    const id = ADJECTIVE_TEMPERAMENTS[nameA];
    if (TEMPERAMENTS[id]) return TEMPERAMENTS[id];
  }

  // Fallback hash mapping using shape, motion, and scale
  const shape = Number.isInteger(score.shape) ? score.shape : (Number.isInteger(raw.shape) ? raw.shape : 0);
  const motion = Number.isInteger(score.motion) ? score.motion : (Number.isInteger(raw.motion) ? raw.motion : 0);
  const scale = Number.isInteger(score.scale) ? score.scale : (Number.isInteger(raw.scale) ? raw.scale : 0);
  const flux = Number.isInteger(score.flux_mode) ? score.flux_mode : (Number.isInteger(raw.flux_mode) ? raw.flux_mode : 0);
  const hash = Math.abs(Math.imul(shape * 17 + motion * 11 + scale * 5 + flux, 0x45d9f3b)) >>> 0;
  const id = TEMPERAMENT_IDS[hash % TEMPERAMENT_IDS.length];

  return TEMPERAMENTS[id] || TEMPERAMENTS.retaliator;
}

/**
 * Returns an engraved catalog badge describing the creature's temperament.
 *
 * @param {object} temperament
 * @returns {string}
 */
export function formatTemperamentBadge(temperament) {
  if (!temperament) return "TEMPERAMENT · UNKNOWN";
  return `TEMPERAMENT: ${temperament.name} · ${temperament.archetype}`;
}
