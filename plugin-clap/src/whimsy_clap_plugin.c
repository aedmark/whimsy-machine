#include "whimsy_clap.h"

/* ---------------------------------------------------------------------------
 * Note Scheduling on Step Advancement
 * --------------------------------------------------------------------------- */
static inline void whimsy_clap_trigger_step(WhimsyClapPlugin *plug, uint32_t step) {
    if (!plug) return;
    if (step >= 16) step = 0;

    /* 1. LOLCODE Lead Voice: Singing Melodic Line in the Creature's Modal Scale */
    whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_LEAD, plug->lead_steps[step], 100);

    /* 2. Fun Machine Velvet Pad: Lush Chord Voicing (Root + Fifth) */
    whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MANUAL, plug->pad_chords[step], 80);
    whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MANUAL, (uint8_t)(plug->pad_chords[step] + 7), 70);

    /* 3. Malbolge Percussion Kit: Authentic Ternary Cadence (Kick + Snare + Clockwork Tick) */
    if (plug->cadence_kick[step] > 0) {
        uint8_t vel = (plug->cadence_kick[step] == 2) ? 120 : 90;
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_PULSE, 36, vel);
    }
    if (plug->cadence_snare[step] > 0) {
        uint8_t vel = (plug->cadence_snare[step] == 2) ? 115 : 85;
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_PULSE, 38, vel);
    }
    if (plug->cadence_hat[step] > 0) {
        uint8_t vel = (plug->cadence_hat[step] == 2) ? 105 : 75;
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_PULSE, 42, vel);
    }

    /* 4. Walking Bass: Resonant 303-style Sub-Bass following Progression */
    whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_BASS, plug->bass_steps[step], 105);

    /* 5. Befunge-93 Chord Organ (Authentic Torus Playfield Gates) */
    if (plug->organ_gate[step] > 0) {
        uint8_t vel = (plug->organ_gate[step] == 2) ? 95 : 75;
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_ORGAN, plug->organ_chords[step], vel);
    }

    /* 6. FRACTRAN Just Intonation Prime Chimes */
    if (step % 2 == 1) {
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHIME, plug->chimes_steps[step], 80);
    }

    /* 7. Shakespeare Vowel Formant Choir (/a/, /e/, /o/) */
    if (step % 4 == 0) {
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHOIR, (uint8_t)(plug->organ_chords[step] + 12), 85);
    }

    /* 8. Mycelium Bio-Acoustics: Guttation Drops & Spore Puffs */
    if (plug->mycelium_kind[step] == 1) {
        uint8_t drop_pitch = (uint8_t)(45 + (plug->current_seed % 10));
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MYCELIUM, drop_pitch, 110);
    } else if (plug->mycelium_kind[step] == 2) {
        whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MYCELIUM, 72, 110);
    }
}

/* ---------------------------------------------------------------------------
 * Event Handling (Sample-Accurate Notes & Parameters)
 * --------------------------------------------------------------------------- */
void whimsy_clap_handle_event(WhimsyClapPlugin *plug, const clap_event_header_t *hdr) {
    if (!plug || !hdr) return;
    if (hdr->space_id != CLAP_CORE_EVENT_SPACE_ID) return;

    if (hdr->type == CLAP_EVENT_NOTE_ON) {
        const clap_event_note_t *note_evt = (const clap_event_note_t *)hdr;
        uint8_t note = (uint8_t)(note_evt->key & 0x7f);
        uint8_t vel = (uint8_t)(note_evt->velocity * 127.0);

        if (vel == 0) {
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_LEAD, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_ORGAN, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_MANUAL, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_BASS, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note + 12);
            return;
        }

        int16_t ch = note_evt->channel;
        if (ch == 1) {
            /* Channel 2 (0-indexed 1): Dedicated Lead Synth */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_LEAD, note, vel);
        } else if (ch == 2) {
            /* Channel 3: Dedicated Manual Pad */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MANUAL, note, vel);
        } else if (ch == 3) {
            /* Channel 4: Dedicated Bass */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_BASS, note, vel);
        } else if (ch == 4) {
            /* Channel 5: Dedicated Organ */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_ORGAN, note, vel);
        } else if (ch == 5) {
            /* Channel 6: Dedicated Chimes */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHIME, note, vel);
        } else if (ch == 6) {
            /* Channel 7: Dedicated Choir */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHOIR, note, vel);
        } else if (ch == 7) {
            /* Channel 8: Dedicated Mycelium */
            whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MYCELIUM, note, vel);
        } else {
            /* Channel 1 / Default: Split keyboard (chords/pad left, lead right) */
            if (note < 60) {
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_ORGAN, note, vel);
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MANUAL, note, vel);
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHOIR, note + 12, vel);
            } else {
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_LEAD, note, vel);
            }
        }
    } else if (hdr->type == CLAP_EVENT_NOTE_OFF || hdr->type == CLAP_EVENT_NOTE_CHOKE) {
        const clap_event_note_t *note_evt = (const clap_event_note_t *)hdr;
        uint8_t note = (uint8_t)(note_evt->key & 0x7f);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_LEAD, note);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_ORGAN, note);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_MANUAL, note);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_BASS, note);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note);
        whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note + 12);
    } else if (hdr->type == CLAP_EVENT_MIDI) {
        const clap_event_midi_t *midi_evt = (const clap_event_midi_t *)hdr;
        uint8_t status = midi_evt->data[0];
        uint8_t note = midi_evt->data[1] & 0x7f;
        uint8_t vel = midi_evt->data[2] & 0x7f;
        uint8_t type = status & 0xf0;

        if (type == 0x90 && vel > 0) {
            if (note < 60) {
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_ORGAN, note, vel);
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_MANUAL, note, vel);
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_CHOIR, note + 12, vel);
            } else {
                whimsy_synth_trigger_note(&plug->engine, WHIMSY_VOICE_LEAD, note, vel);
            }
        } else if (type == 0x80 || (type == 0x90 && vel == 0)) {
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_LEAD, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_ORGAN, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_MANUAL, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_BASS, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note);
            whimsy_synth_release_note(&plug->engine, WHIMSY_VOICE_CHOIR, note + 12);
        }
    } else if (hdr->type == CLAP_EVENT_PARAM_VALUE) {
        const clap_event_param_value_t *pval = (const clap_event_param_value_t *)hdr;
        whimsy_clap_apply_param(plug, pval->param_id, pval->value);
    }
}

/* ---------------------------------------------------------------------------
 * Plugin Lifecycle Implementation
 * --------------------------------------------------------------------------- */
static bool whimsy_plugin_init(const struct clap_plugin *plugin) {
    if (!plugin || !plugin->plugin_data) return false;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    whimsy_synth_init(&plug->engine);

    /* Initialize parameters to defaults */
    plug->master_volume = 0.80;
    plug->filter_cutoff = 1850.0;
    plug->filter_reso = 2.4;
    plug->euler_strictness = 8.0;
    plug->grid_steps = 0.0;
    plug->tempo_lock = 1.0;

    for (int i = 0; i < 8; i++) {
        plug->faders[i] = 0.80;
        plug->mutes[i] = 0.0;
        plug->engine.mixer.fader[i] = 80;
        plug->engine.mixer.muted[i] = false;
    }
    plug->engine.mixer.master_volume = 80;

    /* Initialize creature from default omen phrase */
    whimsy_clap_reseed(plug, 0x379482c9, "parlor glass");

    /* Apply initial filter settings */
    whimsy_clap_apply_param(plug, WHIMSY_PARAM_FILTER_CUTOFF, plug->filter_cutoff);
    whimsy_clap_apply_param(plug, WHIMSY_PARAM_FILTER_RESO, plug->filter_reso);

    return true;
}

static void whimsy_plugin_destroy(const struct clap_plugin *plugin) {
    if (plugin && plugin->plugin_data) {
        free(plugin->plugin_data);
    }
}

static bool whimsy_plugin_activate(const struct clap_plugin *plugin,
                                  double sample_rate,
                                  uint32_t min_frames_count,
                                  uint32_t max_frames_count)
{
    (void)min_frames_count;
    (void)max_frames_count;
    if (!plugin || !plugin->plugin_data) return false;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    plug->sample_rate = sample_rate;
    whimsy_synth_set_sample_rate(&plug->engine, (uint32_t)sample_rate);

    /* Recalculate filter coefficients for new sample rate */
    whimsy_clap_apply_param(plug, WHIMSY_PARAM_FILTER_CUTOFF, plug->filter_cutoff);
    whimsy_clap_apply_param(plug, WHIMSY_PARAM_FILTER_RESO, plug->filter_reso);

    plug->is_active = true;
    return true;
}

static void whimsy_plugin_deactivate(const struct clap_plugin *plugin) {
    if (!plugin || !plugin->plugin_data) return;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;
    plug->is_active = false;
}

static bool whimsy_plugin_start_processing(const struct clap_plugin *plugin) {
    if (!plugin || !plugin->plugin_data) return false;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;
    plug->is_processing = true;
    return true;
}

static void whimsy_plugin_stop_processing(const struct clap_plugin *plugin) {
    if (!plugin || !plugin->plugin_data) return;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;
    plug->is_processing = false;
}

static void whimsy_plugin_reset(const struct clap_plugin *plugin) {
    if (!plugin || !plugin->plugin_data) return;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    memset(&plug->engine.lead_osc, 0, sizeof(plug->engine.lead_osc));
    memset(plug->engine.manual_osc, 0, sizeof(plug->engine.manual_osc));
    memset(&plug->engine.bass_osc, 0, sizeof(plug->engine.bass_osc));
    memset(plug->engine.organ_osc, 0, sizeof(plug->engine.organ_osc));
    memset(&plug->engine.chime_osc, 0, sizeof(plug->engine.chime_osc));
    memset(&plug->engine.pulse_osc, 0, sizeof(plug->engine.pulse_osc));
    memset(plug->engine.choir_osc, 0, sizeof(plug->engine.choir_osc));
    memset(&plug->engine.mycelium_osc, 0, sizeof(plug->engine.mycelium_osc));

    plug->engine.step_sample_counter = 0;
    plug->current_step = 0;
}

static const void *whimsy_plugin_get_extension(const struct clap_plugin *plugin, const char *id) {
    (void)plugin;
    if (!id) return NULL;
    if (strcmp(id, CLAP_EXT_AUDIO_PORTS) == 0) return &whimsy_clap_audio_ports;
    if (strcmp(id, CLAP_EXT_NOTE_PORTS) == 0)  return &whimsy_clap_note_ports;
    if (strcmp(id, CLAP_EXT_PARAMS) == 0)      return &whimsy_clap_params;
    if (strcmp(id, CLAP_EXT_STATE) == 0)       return &whimsy_clap_state;
    return NULL;
}

static void whimsy_plugin_on_main_thread(const struct clap_plugin *plugin) {
    (void)plugin;
}

/* ---------------------------------------------------------------------------
 * Core Audio Processing Loop (Sample-Accurate Float32 & Float64)
 * --------------------------------------------------------------------------- */
static clap_process_status whimsy_plugin_process(const struct clap_plugin *plugin,
                                                const clap_process_t *process)
{
    if (!plugin || !plugin->plugin_data || !process) return CLAP_PROCESS_ERROR;
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    const uint32_t nframes = process->frames_count;
    if (nframes == 0) return CLAP_PROCESS_CONTINUE;

    /* If no audio outputs provided, flush parameters and continue */
    if (!process->audio_outputs || process->audio_outputs_count == 0) {
        whimsy_clap_params_flush(plugin, process->in_events, process->out_events);
        return CLAP_PROCESS_CONTINUE;
    }

    const clap_audio_buffer_t *out_buf = &process->audio_outputs[0];
    const uint32_t ch_count = out_buf->channel_count;
    if (ch_count == 0) {
        whimsy_clap_params_flush(plugin, process->in_events, process->out_events);
        return CLAP_PROCESS_CONTINUE;
    }

    /* Safely extract 32-bit or 64-bit output pointers respecting channel_count */
    float *out_l_32 = (out_buf->data32 && ch_count >= 1) ? out_buf->data32[0] : NULL;
    float *out_r_32 = (out_buf->data32 && ch_count >= 2) ? out_buf->data32[1] : NULL;
    double *out_l_64 = (out_buf->data64 && ch_count >= 1) ? out_buf->data64[0] : NULL;
    double *out_r_64 = (out_buf->data64 && ch_count >= 2) ? out_buf->data64[1] : NULL;

    if (!out_l_32 && !out_l_64) {
        whimsy_clap_params_flush(plugin, process->in_events, process->out_events);
        return CLAP_PROCESS_CONTINUE;
    }

    /* Transport information */
    const clap_event_transport_t *transport = process->transport;
    bool is_playing = (transport && (transport->flags & CLAP_TRANSPORT_IS_PLAYING));
    bool has_tempo = (transport && (transport->flags & CLAP_TRANSPORT_HAS_TEMPO));
    bool has_beats = (transport && (transport->flags & CLAP_TRANSPORT_HAS_BEATS_TIMELINE));

    if (has_tempo && plug->tempo_lock >= 0.5 && transport->tempo > 20.0 && transport->tempo < 400.0) {
        whimsy_synth_set_bpm(&plug->engine, (uint16_t)round(transport->tempo));
    }

    double start_beat = 0.0;
    if (has_beats) {
        start_beat = (double)transport->song_pos_beats / (double)CLAP_BEATTIME_FACTOR;
    }

    const uint32_t num_events = process->in_events ? process->in_events->size(process->in_events) : 0;
    uint32_t event_idx = 0;

    const uint32_t max_steps = (plug->grid_steps >= 0.5) ? 16 : 12;
    const double steps_per_beat = (plug->grid_steps >= 0.5) ? 4.0 : 3.0;
    const double bpm = (double)plug->engine.bpm;
    const double sample_rate = plug->sample_rate > 0 ? plug->sample_rate : 44100.0;
    const double beats_per_sample = bpm / (60.0 * sample_rate);

    const float inv_q23_f = 1.0f / 8388608.0f;
    const double inv_q23_d = 1.0 / 8388608.0;

    /* Render sample by sample with sample-accurate event and step handling */
    for (uint32_t f = 0; f < nframes; f++) {
        /* 1. Process all events scheduled at or before frame f */
        while (event_idx < num_events) {
            const clap_event_header_t *hdr = process->in_events->get(process->in_events, event_idx);
            if (!hdr || hdr->time > f) break;
            whimsy_clap_handle_event(plug, hdr);
            event_idx++;
        }

        /* 2. Transport step advancement */
        if (is_playing && has_beats) {
            double cur_beat = start_beat + (double)f * beats_per_sample;
            double step_float = cur_beat * steps_per_beat;
            int64_t step_int = (int64_t)floor(step_float);
            uint32_t step = (uint32_t)((step_int % (int64_t)max_steps + (int64_t)max_steps) % (int64_t)max_steps);

            if (step != plug->current_step) {
                plug->current_step = step;
                whimsy_clap_trigger_step(plug, step);
            }
        } else if (is_playing) {
            plug->engine.step_sample_counter++;
            if (plug->engine.step_sample_counter >= plug->engine.samples_per_step) {
                plug->engine.step_sample_counter = 0;
                plug->current_step = (plug->current_step + 1) % max_steps;
                whimsy_clap_trigger_step(plug, plug->current_step);
            }
        }

        /* 3. Render 1 frame of stereo Q23 signed audio */
        int32_t pcm[2];
        whimsy_synth_render_block(&plug->engine, pcm, 1);

        /* 4. Convert Q23 integer PCM to Float32 or Float64 */
        if (out_l_32) out_l_32[f] = (float)pcm[0] * inv_q23_f;
        if (out_r_32) out_r_32[f] = (float)pcm[1] * inv_q23_f;
        if (out_l_64) out_l_64[f] = (double)pcm[0] * inv_q23_d;
        if (out_r_64) out_r_64[f] = (double)pcm[1] * inv_q23_d;
    }

    /* Process any trailing events */
    while (event_idx < num_events) {
        const clap_event_header_t *hdr = process->in_events->get(process->in_events, event_idx);
        if (hdr) whimsy_clap_handle_event(plug, hdr);
        event_idx++;
    }

    /* Safely clear any extra multi-channel sub-ports if host provided extra buffers */
    for (uint32_t s = 1; s < process->audio_outputs_count; s++) {
        const clap_audio_buffer_t *stem_buf = &process->audio_outputs[s];
        if (!stem_buf) continue;
        for (uint32_t c = 0; c < stem_buf->channel_count; c++) {
            if (stem_buf->data32 && stem_buf->data32[c]) {
                memset(stem_buf->data32[c], 0, nframes * sizeof(float));
            } else if (stem_buf->data64 && stem_buf->data64[c]) {
                memset(stem_buf->data64[c], 0, nframes * sizeof(double));
            }
        }
    }

    return CLAP_PROCESS_CONTINUE;
}

/* ---------------------------------------------------------------------------
 * Plugin Constructor
 * --------------------------------------------------------------------------- */
const clap_plugin_t *whimsy_clap_create(const clap_host_t *host) {
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)calloc(1, sizeof(WhimsyClapPlugin));
    if (!plug) return NULL;

    plug->clap_plugin.desc = &whimsy_clap_descriptor;
    plug->clap_plugin.plugin_data = plug;
    plug->clap_plugin.init = whimsy_plugin_init;
    plug->clap_plugin.destroy = whimsy_plugin_destroy;
    plug->clap_plugin.activate = whimsy_plugin_activate;
    plug->clap_plugin.deactivate = whimsy_plugin_deactivate;
    plug->clap_plugin.start_processing = whimsy_plugin_start_processing;
    plug->clap_plugin.stop_processing = whimsy_plugin_stop_processing;
    plug->clap_plugin.reset = whimsy_plugin_reset;
    plug->clap_plugin.process = whimsy_plugin_process;
    plug->clap_plugin.get_extension = whimsy_plugin_get_extension;
    plug->clap_plugin.on_main_thread = whimsy_plugin_on_main_thread;

    plug->host = host;
    plug->sample_rate = 44100.0;

    return &plug->clap_plugin;
}
