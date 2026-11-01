#include "whimsy_clap.h"

/* ---------------------------------------------------------------------------
 * Parameter Definitions Table (23 Parameters)
 * --------------------------------------------------------------------------- */
typedef struct {
    clap_id id;
    const char *name;
    const char *module;
    clap_param_info_flags flags;
    double min_value;
    double max_value;
    double default_value;
} WhimsyParamMeta;

static const WhimsyParamMeta PARAMS_METADATA[WHIMSY_PARAM_COUNT] = {
    {
        .id = WHIMSY_PARAM_MASTER_VOLUME,
        .name = "Master Volume",
        .module = "Master",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 0.0,
        .max_value = 1.0,
        .default_value = 0.80
    },
    {
        .id = WHIMSY_PARAM_FILTER_CUTOFF,
        .name = "Filter Cutoff",
        .module = "Master",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 20.0,
        .max_value = 20000.0,
        .default_value = 1850.0
    },
    {
        .id = WHIMSY_PARAM_FILTER_RESO,
        .name = "Filter Resonance",
        .module = "Master",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 0.5,
        .max_value = 16.0,
        .default_value = 2.4
    },
    {
        .id = WHIMSY_PARAM_EULER_STRICTNESS,
        .name = "Euler Strictness",
        .module = "Harmony",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 3.0,
        .max_value = 14.0,
        .default_value = 8.0
    },
    {
        .id = WHIMSY_PARAM_GRID_STEPS,
        .name = "Step Metre",
        .module = "Transport",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 0.0,
        .max_value = 1.0,
        .default_value = 0.0
    },
    {
        .id = WHIMSY_PARAM_PHRASE_SEED,
        .name = "Creature Seed",
        .module = "Omen",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 0.0,
        .max_value = 4294967295.0,
        .default_value = 0x379482c9 /* "parlor glass" */
    },
    { .id = WHIMSY_PARAM_FADER_1, .name = "Lead Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_2, .name = "Pad Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_3, .name = "Beat Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_4, .name = "Bass Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_5, .name = "Organ Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_6, .name = "Chime Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_7, .name = "Choir Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_FADER_8, .name = "Mycelium Fader", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.80 },
    { .id = WHIMSY_PARAM_MUTE_1, .name = "Lead Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_2, .name = "Pad Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_3, .name = "Beat Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_4, .name = "Bass Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_5, .name = "Organ Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_6, .name = "Chime Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_7, .name = "Choir Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    { .id = WHIMSY_PARAM_MUTE_8, .name = "Mycelium Mute", .module = "Mixer", .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS, .min_value = 0.0, .max_value = 1.0, .default_value = 0.0 },
    {
        .id = WHIMSY_PARAM_TEMPO_LOCK,
        .name = "Host Tempo Lock",
        .module = "Transport",
        .flags = CLAP_PARAM_IS_AUTOMATABLE | CLAP_PARAM_IS_STEPPED | CLAP_PARAM_IS_ENUM | CLAP_PARAM_REQUIRES_PROCESS,
        .min_value = 0.0,
        .max_value = 1.0,
        .default_value = 1.0
    }
};

static const WhimsyParamMeta *find_meta_by_id(clap_id id) {
    for (uint32_t i = 0; i < WHIMSY_PARAM_COUNT; i++) {
        if (PARAMS_METADATA[i].id == id) {
            return &PARAMS_METADATA[i];
        }
    }
    return NULL;
}

/* ---------------------------------------------------------------------------
 * Canonical Modal Scales (src/music.mjs)
 * --------------------------------------------------------------------------- */
static const uint8_t CANONICAL_SCALES[8][9] = {
    {0, 2, 3, 5, 7, 9, 10, 12, 14},  /* 0: DORIAN */
    {0, 2, 4, 7, 9, 12, 14, 16, 19},  /* 1: MAJOR PENTATONIC */
    {0, 1, 4, 5, 7, 8, 11, 12, 13},  /* 2: DOUBLE HARMONIC */
    {0, 3, 5, 6, 7, 10, 12, 15, 17},  /* 3: BLUES */
    {0, 2, 4, 6, 8, 10, 12, 14, 16},  /* 4: WHOLE TONE */
    {0, 1, 3, 5, 7, 8, 10, 12, 13},  /* 5: PHRYGIAN */
    {0, 2, 3, 6, 7, 9, 10, 12, 14},  /* 6: UKRAINIAN DORIAN */
    {0, 4, 7, 11, 14, 16, 19, 23, 24} /* 7: MAJOR NINTH */
};

/* ---------------------------------------------------------------------------
 * Canonical Malbolge Ternary Cadence Masks (src/malbolge.mjs)
 * Each step: [kick, snare, clockwork_hat] (0=none, 1=hit, 2=accent)
 * --------------------------------------------------------------------------- */
static const uint8_t MALBOLGE_CADENCE[8][12][3] = {
    /* 0: AUTOMATON MARCH (4/4 driving pulse) */
    {{2,0,1}, {0,0,1}, {0,1,0}, {1,2,1}, {0,0,1}, {1,0,1}, {2,0,1}, {0,1,1}, {0,0,1}, {1,2,0}, {0,0,1}, {0,1,2}},
    /* 1: SEANCE WALTZ (triple-time parlor knock) */
    {{2,0,1}, {0,1,1}, {0,1,0}, {1,0,2}, {0,1,1}, {0,2,0}, {2,0,1}, {0,1,1}, {0,1,0}, {1,2,1}, {0,1,1}, {0,1,2}},
    /* 2: PENDULUM GALOP (syncopated escapement gallop) */
    {{2,0,2}, {0,1,1}, {1,0,1}, {0,2,1}, {1,0,0}, {1,0,1}, {2,0,2}, {0,1,1}, {1,0,1}, {0,2,1}, {0,1,1}, {1,1,2}},
    /* 3: OSSUARY POLYRHYTHM (3-against-4 cross) */
    {{2,0,2}, {0,1,0}, {0,0,1}, {1,2,0}, {2,0,1}, {0,0,1}, {0,2,2}, {0,1,0}, {2,0,1}, {0,2,0}, {0,0,1}, {1,1,2}},
    /* 4: TELEGRAM CLATTER (rapid telegraph relay) */
    {{1,1,2}, {0,2,1}, {1,0,1}, {1,1,0}, {0,2,2}, {1,0,1}, {1,1,2}, {0,2,1}, {1,0,1}, {1,1,0}, {0,2,2}, {1,1,1}},
    /* 5: BELL-TOWER TOLL (sparse heavy bell toll) */
    {{2,0,0}, {0,0,1}, {0,0,1}, {0,1,0}, {0,0,1}, {0,0,2}, {2,0,0}, {0,0,1}, {0,1,1}, {0,0,0}, {0,1,1}, {0,0,2}},
    /* 6: ECTOPLASM SHUFFLE (loping off-beat groove) */
    {{2,0,1}, {0,0,2}, {0,1,0}, {1,0,1}, {0,0,2}, {0,1,1}, {2,0,1}, {0,0,2}, {0,1,0}, {1,2,1}, {0,0,2}, {0,1,2}},
    /* 7: INFERNAL HABANERA (dotted syncopation) */
    {{2,0,1}, {0,0,1}, {0,1,0}, {1,0,2}, {0,0,1}, {0,1,0}, {2,0,1}, {0,0,1}, {0,1,0}, {1,2,2}, {0,0,1}, {0,1,0}}
};

/* ---------------------------------------------------------------------------
 * Canonical Befunge-93 Organ Gates (src/befunge.mjs)
 * --------------------------------------------------------------------------- */
static const uint8_t BEFUNGE_GATES[8][12] = {
    {2, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1}, /* 0: PARLOR REED ORGAN */
    {1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 2}, /* 1: HARPSICHORD PINBALL */
    {2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1}, /* 2: CATHEDRAL SWELL */
    {1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 2}, /* 3: CLOCKWORK CELESTA */
    {0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1}, /* 4: PHANTOM CALLIOPE */
    {2, 0, 1, 0, 0, 2, 2, 0, 1, 0, 0, 2}, /* 5: GLASS HARMONICA */
    {2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1}, /* 6: VICTORIAN HARMONIUM */
    {1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 2}  /* 7: ASTRAL CARILLON */
};

/* ---------------------------------------------------------------------------
 * Canonical Fungal Bio-Acoustic Step Masks (src/mycelium.mjs)
 * 0: silent, 1: liquid drop / woody knock, 2: spore puff noise burst
 * --------------------------------------------------------------------------- */
static const uint8_t FUNGAL_MASKS[8][12] = {
    {1, 2, 0, 1, 1, 2, 1, 0, 0, 2, 1, 0}, /* 0: AGARIC CAP */
    {1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 1, 2}, /* 1: BRACKET CONK */
    {2, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0}, /* 2: CORAL CLAVARIA */
    {1, 0, 0, 1, 0, 0, 1, 0, 2, 1, 0, 0}, /* 3: BIOLUMINESCENT BONNET */
    {1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2}, /* 4: CUP PEZIZA */
    {1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2}, /* 5: MOREL HONEYCOMB */
    {0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 1}, /* 6: GLOBULAR PUFFBALL */
    {0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1}  /* 7: HYPHAL HYDRA */
};

/* ---------------------------------------------------------------------------
 * Reseeding & Creature Harmonic Progression (HAI, ORACLE! Spec, D-003, D-043)
 * --------------------------------------------------------------------------- */
void whimsy_clap_reseed(WhimsyClapPlugin *plug, uint32_t seed, const char *phrase) {
    if (!plug) return;

    if (phrase && phrase[0] != '\0') {
        plug->current_seed = whimsy_hash_phrase(phrase);
        strncpy(plug->phrase, phrase, sizeof(plug->phrase) - 1);
        plug->phrase[sizeof(plug->phrase) - 1] = '\0';
    } else {
        plug->current_seed = seed;
        snprintf(plug->phrase, sizeof(plug->phrase), "omen-%08x", seed);
    }
    plug->phrase_seed = (double)plug->current_seed;

    uint32_t s = plug->current_seed;

    /* Canonical score fields parsed identically to src/oracle.lol */
    plug->pulse         = (uint16_t)(42 + (s % 126));
    plug->root          = (uint8_t)(30 + ((s / 7) % 36));
    plug->scale_idx     = (uint8_t)((s / 13) % 8);
    plug->beat_mode     = (uint8_t)((s / 251) % 8);
    plug->bass_mode     = (uint8_t)((s / 263) % 8);
    plug->harmony_mode  = (uint8_t)((s / 271) % 8);
    plug->chime_mode    = (uint8_t)((s / 281) % 8);
    plug->chant_mode    = (uint8_t)((s / 293) % 8);
    plug->fungal_form   = (uint8_t)((s / 311) % 8);

    /* 12 LOLCODE melody steps */
    static const uint16_t STEP_DIVISORS[12] = {
        103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163
    };
    uint8_t melody_steps[12];
    for (int i = 0; i < 12; i++) {
        melody_steps[i] = (uint8_t)((s / STEP_DIVISORS[i]) % 9);
    }

    const uint8_t *scale = CANONICAL_SCALES[plug->scale_idx];

    /* 16-Step Ensemble Generation */
    for (unsigned i = 0; i < 16; i++) {
        unsigned m_idx = i % 12;

        /* 1. LOLCODE Lead Voice: Authentic modal scale degrees in singing register */
        uint8_t scale_deg = melody_steps[m_idx];
        uint8_t lead_interval = scale[scale_deg];
        int raw_lead = plug->root + lead_interval + (i >= 8 ? 12 : 0);
        /* Lift into singing lead register (MIDI 60..84, D-085) */
        while (raw_lead < 60) raw_lead += 12;
        while (raw_lead > 84) raw_lead -= 12;
        plug->lead_steps[i] = (uint8_t)raw_lead;

        /* 2 & 5. Chords for Velvet Pad & Befunge Organ (Harmonic progression across 4-step regions) */
        int region = (i / 4) % 4;
        int chord_root = plug->root;
        if (region == 1) chord_root += scale[2]; /* Mediant */
        else if (region == 2) chord_root += scale[4]; /* Dominant fifth */
        else if (region == 3) chord_root += (plug->scale_idx == 1 ? 7 : (scale[5] % 12)); /* Cadence */

        while (chord_root < 48) chord_root += 12;
        while (chord_root > 60) chord_root -= 12;
        plug->organ_chords[i] = (uint8_t)chord_root;
        plug->organ_gate[i]   = BEFUNGE_GATES[plug->harmony_mode][m_idx];
        plug->pad_chords[i]   = (uint8_t)chord_root;

        /* 4. Walking Bass: Root, fifth, and walking scale tones in deep sub register */
        int b_note = chord_root - 12;
        if (i % 4 == 2) b_note += 7; /* Arrive on fifth */
        else if (i % 4 == 1 || i % 4 == 3) b_note += (scale[(i + plug->bass_mode) % 5]);
        while (b_note < 30) b_note += 12;
        while (b_note > 48) b_note -= 12;
        plug->bass_steps[i] = (uint8_t)b_note;

        /* 3. Malbolge Ternary Cadence Mask */
        plug->cadence_kick[i]  = MALBOLGE_CADENCE[plug->beat_mode][m_idx][0];
        plug->cadence_snare[i] = MALBOLGE_CADENCE[plug->beat_mode][m_idx][1];
        plug->cadence_hat[i]   = MALBOLGE_CADENCE[plug->beat_mode][m_idx][2];

        /* 6. FRACTRAN Just Intonation Chimes */
        static const uint8_t JI_OVERTONES[4] = {0, 7, 12, 16};
        plug->chimes_steps[i] = (uint8_t)(chord_root + 24 + JI_OVERTONES[(i + plug->chime_mode) % 4]);

        /* 8. Mycelium Bio-Acoustic Trigger Mask */
        plug->mycelium_kind[i] = FUNGAL_MASKS[plug->fungal_form][m_idx];
    }

    /* Set creature internal BPM when free-running */
    if (plug->tempo_lock < 0.5) {
        whimsy_synth_set_bpm(&plug->engine, plug->pulse);
    }
}

/* ---------------------------------------------------------------------------
 * Apply Parameter Changes
 * --------------------------------------------------------------------------- */
void whimsy_clap_apply_param(WhimsyClapPlugin *plug, clap_id id, double value) {
    if (!plug) return;

    switch (id) {
        case WHIMSY_PARAM_MASTER_VOLUME:
            if (value < 0.0) value = 0.0;
            if (value > 1.0) value = 1.0;
            plug->master_volume = value;
            plug->engine.mixer.master_volume = (uint8_t)(value * 100.0);
            break;

        case WHIMSY_PARAM_FILTER_CUTOFF: {
            if (value < 20.0) value = 20.0;
            if (value > 20000.0) value = 20000.0;
            plug->filter_cutoff = value;
            double sr = plug->sample_rate > 0 ? plug->sample_rate : 44100.0;
            double fc = value;
            if (fc > sr * 0.45) fc = sr * 0.45;
            double f_norm = 2.0 * sin(3.1415926535 * fc / sr);
            int32_t q15_f = (int32_t)(f_norm * 16384.0);
            if (q15_f > 16000) q15_f = 16000;
            if (q15_f < 64) q15_f = 64;
            plug->engine.mixer.master_filter.cutoff = q15_f;
            break;
        }

        case WHIMSY_PARAM_FILTER_RESO: {
            if (value < 0.5) value = 0.5;
            if (value > 16.0) value = 16.0;
            plug->filter_reso = value;
            double damping = 1.0 / value;
            int32_t q15_damp = (int32_t)(damping * 16384.0);
            int32_t reso = 32768 - q15_damp;
            if (reso < 1000) reso = 1000;
            if (reso > 32000) reso = 32000;
            plug->engine.mixer.master_filter.resonance = reso;
            break;
        }

        case WHIMSY_PARAM_EULER_STRICTNESS:
            if (value < 3.0) value = 3.0;
            if (value > 14.0) value = 14.0;
            plug->euler_strictness = value;
            break;

        case WHIMSY_PARAM_GRID_STEPS:
            plug->grid_steps = (value >= 0.5) ? 1.0 : 0.0;
            break;

        case WHIMSY_PARAM_PHRASE_SEED:
            if (value < 0.0) value = 0.0;
            if (value > 4294967295.0) value = 4294967295.0;
            if ((uint32_t)value != plug->current_seed) {
                whimsy_clap_reseed(plug, (uint32_t)value, NULL);
            }
            break;

        case WHIMSY_PARAM_TEMPO_LOCK:
            plug->tempo_lock = (value >= 0.5) ? 1.0 : 0.0;
            if (plug->tempo_lock < 0.5) {
                uint16_t bpm = (uint16_t)(60 + ((plug->current_seed >> 8) % 100));
                whimsy_synth_set_bpm(&plug->engine, bpm);
            }
            break;

        default:
            if (id >= WHIMSY_PARAM_FADER_1 && id <= WHIMSY_PARAM_FADER_8) {
                uint32_t ch = id - WHIMSY_PARAM_FADER_1;
                if (value < 0.0) value = 0.0;
                if (value > 1.0) value = 1.0;
                plug->faders[ch] = value;
                plug->engine.mixer.fader[ch] = (uint8_t)(value * 100.0);
            } else if (id >= WHIMSY_PARAM_MUTE_1 && id <= WHIMSY_PARAM_MUTE_8) {
                uint32_t ch = id - WHIMSY_PARAM_MUTE_1;
                bool m = (value >= 0.5);
                plug->mutes[ch] = m ? 1.0 : 0.0;
                plug->engine.mixer.muted[ch] = m;
            }
            break;
    }
}

/* ---------------------------------------------------------------------------
 * CLAP Params Extension Interface
 * --------------------------------------------------------------------------- */
static uint32_t whimsy_params_count(const clap_plugin_t *plugin) {
    (void)plugin;
    return WHIMSY_PARAM_COUNT;
}

static bool whimsy_params_get_info(const clap_plugin_t *plugin,
                                   uint32_t param_index,
                                   clap_param_info_t *param_info)
{
    (void)plugin;
    if (!param_info || param_index >= WHIMSY_PARAM_COUNT) return false;

    const WhimsyParamMeta *meta = &PARAMS_METADATA[param_index];
    memset(param_info, 0, sizeof(clap_param_info_t));
    param_info->id = meta->id;
    param_info->flags = meta->flags;
    param_info->cookie = NULL;
    param_info->min_value = meta->min_value;
    param_info->max_value = meta->max_value;
    param_info->default_value = meta->default_value;

    strncpy(param_info->name, meta->name, sizeof(param_info->name) - 1);
    strncpy(param_info->module, meta->module, sizeof(param_info->module) - 1);

    return true;
}

static bool whimsy_params_get_value(const clap_plugin_t *plugin,
                                    clap_id param_id,
                                    double *out_value)
{
    if (!plugin || !plugin->plugin_data || !out_value) return false;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    switch (param_id) {
        case WHIMSY_PARAM_MASTER_VOLUME:    *out_value = plug->master_volume; return true;
        case WHIMSY_PARAM_FILTER_CUTOFF:    *out_value = plug->filter_cutoff; return true;
        case WHIMSY_PARAM_FILTER_RESO:      *out_value = plug->filter_reso; return true;
        case WHIMSY_PARAM_EULER_STRICTNESS: *out_value = plug->euler_strictness; return true;
        case WHIMSY_PARAM_GRID_STEPS:       *out_value = plug->grid_steps; return true;
        case WHIMSY_PARAM_PHRASE_SEED:      *out_value = (double)plug->current_seed; return true;
        case WHIMSY_PARAM_TEMPO_LOCK:       *out_value = plug->tempo_lock; return true;
        default:
            if (param_id >= WHIMSY_PARAM_FADER_1 && param_id <= WHIMSY_PARAM_FADER_8) {
                *out_value = plug->faders[param_id - WHIMSY_PARAM_FADER_1];
                return true;
            }
            if (param_id >= WHIMSY_PARAM_MUTE_1 && param_id <= WHIMSY_PARAM_MUTE_8) {
                *out_value = plug->mutes[param_id - WHIMSY_PARAM_MUTE_1];
                return true;
            }
            return false;
    }
}

static bool whimsy_params_value_to_text(const clap_plugin_t *plugin,
                                        clap_id param_id,
                                        double value,
                                        char *out_buffer,
                                        uint32_t out_buffer_capacity)
{
    (void)plugin;
    if (!out_buffer || out_buffer_capacity == 0) return false;

    switch (param_id) {
        case WHIMSY_PARAM_MASTER_VOLUME:
            snprintf(out_buffer, out_buffer_capacity, "%.0f %%", value * 100.0);
            return true;
        case WHIMSY_PARAM_FILTER_CUTOFF:
            snprintf(out_buffer, out_buffer_capacity, "%.1f Hz", value);
            return true;
        case WHIMSY_PARAM_FILTER_RESO:
            snprintf(out_buffer, out_buffer_capacity, "%.2f Q", value);
            return true;
        case WHIMSY_PARAM_EULER_STRICTNESS:
            snprintf(out_buffer, out_buffer_capacity, "%d (Gradus)", (int)round(value));
            return true;
        case WHIMSY_PARAM_GRID_STEPS:
            snprintf(out_buffer, out_buffer_capacity, "%s",
                     value >= 0.5 ? "16-Step Straight" : "12-Step Triplet");
            return true;
        case WHIMSY_PARAM_PHRASE_SEED:
            snprintf(out_buffer, out_buffer_capacity, "0x%08X", (uint32_t)value);
            return true;
        case WHIMSY_PARAM_TEMPO_LOCK:
            snprintf(out_buffer, out_buffer_capacity, "%s",
                     value >= 0.5 ? "Host Locked" : "Internal Free");
            return true;
        default:
            if (param_id >= WHIMSY_PARAM_FADER_1 && param_id <= WHIMSY_PARAM_FADER_8) {
                snprintf(out_buffer, out_buffer_capacity, "%.0f %%", value * 100.0);
                return true;
            }
            if (param_id >= WHIMSY_PARAM_MUTE_1 && param_id <= WHIMSY_PARAM_MUTE_8) {
                snprintf(out_buffer, out_buffer_capacity, "%s",
                         value >= 0.5 ? "Muted" : "Unmuted");
                return true;
            }
            return false;
    }
}

static bool whimsy_params_text_to_value(const clap_plugin_t *plugin,
                                        clap_id param_id,
                                        const char *param_value_text,
                                        double *out_value)
{
    (void)plugin;
    if (!param_value_text || !out_value) return false;

    const WhimsyParamMeta *meta = find_meta_by_id(param_id);
    if (!meta) return false;

    char *endptr = NULL;
    if (param_id == WHIMSY_PARAM_PHRASE_SEED && (param_value_text[0] == '0' && (param_value_text[1] == 'x' || param_value_text[1] == 'X'))) {
        unsigned long val = strtoul(param_value_text, &endptr, 16);
        *out_value = (double)val;
        return true;
    }

    double val = strtod(param_value_text, &endptr);
    if (endptr == param_value_text) {
        /* Textual match for enums */
        if (strcasestr(param_value_text, "16") || strcasestr(param_value_text, "straight")) {
            *out_value = 1.0;
            return true;
        }
        if (strcasestr(param_value_text, "12") || strcasestr(param_value_text, "triplet")) {
            *out_value = 0.0;
            return true;
        }
        if (strcasestr(param_value_text, "mute")) {
            *out_value = 1.0;
            return true;
        }
        if (strcasestr(param_value_text, "unmute")) {
            *out_value = 0.0;
            return true;
        }
        return false;
    }

    if (val < meta->min_value) val = meta->min_value;
    if (val > meta->max_value) val = meta->max_value;
    *out_value = val;
    return true;
}

void whimsy_clap_params_flush(const clap_plugin_t *plugin,
                              const clap_input_events_t *in,
                              const clap_output_events_t *out)
{
    (void)out;
    if (!plugin || !plugin->plugin_data || !in) return;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    uint32_t count = in->size(in);
    for (uint32_t i = 0; i < count; i++) {
        const clap_event_header_t *hdr = in->get(in, i);
        if (hdr && hdr->space_id == CLAP_CORE_EVENT_SPACE_ID && hdr->type == CLAP_EVENT_PARAM_VALUE) {
            const clap_event_param_value_t *pval = (const clap_event_param_value_t *)hdr;
            whimsy_clap_apply_param(plug, pval->param_id, pval->value);
        }
    }
}

const clap_plugin_params_t whimsy_clap_params = {
    .count = whimsy_params_count,
    .get_info = whimsy_params_get_info,
    .get_value = whimsy_params_get_value,
    .value_to_text = whimsy_params_value_to_text,
    .text_to_value = whimsy_params_text_to_value,
    .flush = whimsy_clap_params_flush
};
