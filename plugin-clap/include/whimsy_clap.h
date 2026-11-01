#ifndef WHIMSY_CLAP_H
#define WHIMSY_CLAP_H

#define _GNU_SOURCE
#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <stdarg.h>
#include <math.h>

#include "clap/clap.h"
#include "whimsy_esoteric.h"
#include "whimsy_fm1_synth.h"

#ifdef __cplusplus
extern "C" {
#endif

static inline void whimsy_log(const char *fmt, ...) {
    FILE *f = fopen("/tmp/whimsy_clap.log", "a");
    if (!f) return;
    va_list args;
    va_start(args, fmt);
    vfprintf(f, fmt, args);
    va_end(args);
    fclose(f);
}

/* ---------------------------------------------------------------------------
 * Plugin Metadata & Identifier (P8-13, D-080)
 * --------------------------------------------------------------------------- */
#define WHIMSY_CLAP_ID          "org.whimsymachine.omen-synth"
#define WHIMSY_CLAP_NAME        "The Whimsy Machine"
#define WHIMSY_CLAP_VENDOR      "The Whimsy Machine Guild"
#define WHIMSY_CLAP_URL         "https://whimsy.machine"
#define WHIMSY_CLAP_VERSION     "1.0.0"
#define WHIMSY_CLAP_DESCRIPTION "Esoteric Victorian synthesizer & algorithmic omen generator"

/* ---------------------------------------------------------------------------
 * Parameter Identifiers (23 automatable DAW parameters)
 * --------------------------------------------------------------------------- */
enum {
    WHIMSY_PARAM_MASTER_VOLUME    = 0,
    WHIMSY_PARAM_FILTER_CUTOFF    = 1,
    WHIMSY_PARAM_FILTER_RESO      = 2,
    WHIMSY_PARAM_EULER_STRICTNESS = 3,
    WHIMSY_PARAM_GRID_STEPS       = 4,
    WHIMSY_PARAM_PHRASE_SEED      = 5,
    WHIMSY_PARAM_FADER_1          = 10,
    WHIMSY_PARAM_FADER_2          = 11,
    WHIMSY_PARAM_FADER_3          = 12,
    WHIMSY_PARAM_FADER_4          = 13,
    WHIMSY_PARAM_FADER_5          = 14,
    WHIMSY_PARAM_FADER_6          = 15,
    WHIMSY_PARAM_FADER_7          = 16,
    WHIMSY_PARAM_FADER_8          = 17,
    WHIMSY_PARAM_MUTE_1           = 18,
    WHIMSY_PARAM_MUTE_2           = 19,
    WHIMSY_PARAM_MUTE_3           = 20,
    WHIMSY_PARAM_MUTE_4           = 21,
    WHIMSY_PARAM_MUTE_5           = 22,
    WHIMSY_PARAM_MUTE_6           = 23,
    WHIMSY_PARAM_MUTE_7           = 24,
    WHIMSY_PARAM_MUTE_8           = 25,
    WHIMSY_PARAM_TEMPO_LOCK       = 26
};

#define WHIMSY_PARAM_COUNT 23

/* ---------------------------------------------------------------------------
 * Session v9 Binary State Header (D-080)
 * --------------------------------------------------------------------------- */
#define WHIMSY_STATE_MAGIC   0x5748494DU /* 'WHIM' in ASCII */
#define WHIMSY_STATE_VERSION 9

#pragma pack(push, 1)
typedef struct {
    uint32_t magic;           /* 'WHIM' = 0x5748494D */
    uint32_t version;         /* 9 */
    uint32_t seed;            /* 32-bit FNV-1a hash */
    uint8_t  phrase_len;      /* Length of UTF-8 phrase string */
    char     phrase[128];     /* Original phrase string */
    uint8_t  faders[8];       /* Mixer faders (0..100) */
    uint8_t  mutes;           /* Bitmask of 8 channel mutes */
    uint8_t  grid_steps;      /* 0: 12-step triplet, 1: 16-step straight */
    uint8_t  euler_strict;    /* 3..14 */
    uint16_t filter_cutoff;   /* Q15 fixed-point cutoff */
    uint16_t filter_q;        /* Q15 fixed-point resonance */
    uint8_t  reserved[32];    /* Future somatic flags */
} WhimsyClapStateHeader;
#pragma pack(pop)

/* ---------------------------------------------------------------------------
 * Plugin Instance Context
 * --------------------------------------------------------------------------- */
typedef struct WhimsyClapPlugin {
    clap_plugin_t clap_plugin;
    const clap_host_t *host;

    /* Core sound engine */
    WhimsySynthEngine engine;

    /* Dynamic runtime configuration */
    double sample_rate;
    bool is_active;
    bool is_processing;

    /* Parameter values */
    double master_volume;
    double filter_cutoff;
    double filter_reso;
    double euler_strictness;
    double grid_steps;
    double phrase_seed;
    double faders[8];
    double mutes[8];
    double tempo_lock;

    /* Creature & phrase state derived from canonical LOLCODE score */
    char phrase[128];
    uint32_t current_seed;
    uint8_t root;
    uint8_t scale_idx;
    uint8_t beat_mode;
    uint8_t bass_mode;
    uint8_t harmony_mode;
    uint8_t chime_mode;
    uint8_t chant_mode;
    uint8_t fungal_form;
    uint16_t pulse;

    /* 16-step musical arrangement */
    uint8_t lead_steps[16];
    uint8_t bass_steps[16];
    uint8_t organ_chords[16];
    uint8_t organ_gate[16];
    uint8_t pad_chords[16];
    uint8_t chimes_steps[16];
    uint8_t cadence_kick[16];
    uint8_t cadence_snare[16];
    uint8_t cadence_hat[16];
    uint8_t mycelium_kind[16]; /* 0: none, 1: drop/knock, 2: spore puff */

    /* Sample clock and step tracker */
    uint32_t current_step;
} WhimsyClapPlugin;

/* ---------------------------------------------------------------------------
 * Global Factory & Descriptors
 * --------------------------------------------------------------------------- */
extern const clap_plugin_descriptor_t whimsy_clap_descriptor;
extern const clap_plugin_factory_t whimsy_clap_factory;

/* ---------------------------------------------------------------------------
 * Extension Declarations
 * --------------------------------------------------------------------------- */
extern const clap_plugin_audio_ports_t whimsy_clap_audio_ports;
extern const clap_plugin_note_ports_t  whimsy_clap_note_ports;
extern const clap_plugin_params_t      whimsy_clap_params;
extern const clap_plugin_state_t       whimsy_clap_state;

/* ---------------------------------------------------------------------------
 * Core Helper Functions
 * --------------------------------------------------------------------------- */
void whimsy_clap_reseed(WhimsyClapPlugin *plug, uint32_t seed, const char *phrase);
void whimsy_clap_apply_param(WhimsyClapPlugin *plug, clap_id id, double value);
void whimsy_clap_handle_event(WhimsyClapPlugin *plug, const clap_event_header_t *hdr);
void whimsy_clap_params_flush(const clap_plugin_t *plugin,
                              const clap_input_events_t *in,
                              const clap_output_events_t *out);

#ifdef __cplusplus
}
#endif

#endif /* WHIMSY_CLAP_H */
