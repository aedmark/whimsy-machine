#include "whimsy_fm1_synth.h"
#include <string.h>

/* Precomputed MIDI note to phase increment table for 44.1 kHz */
static const uint32_t MIDI_PHASE_INC[128] = {
    796254U, 843601U, 893765U, 946911U, 1003217U, 1062871U, 1126073U, 1193033U,
    1263974U, 1339134U, 1418763U, 1503127U, 1592507U, 1687203U, 1787529U, 1893821U,
    2006434U, 2125742U, 2252146U, 2386065U, 2527948U, 2678268U, 2837526U, 3006254U,
    3185015U, 3374406U, 3575058U, 3787642U, 4012867U, 4251485U, 4504291U, 4772130U,
    5055896U, 5356535U, 5675051U, 6012507U, 6370030U, 6748811U, 7150117U, 7575285U,
    8025735U, 8502970U, 9008582U, 9544261U, 10111792U, 10713070U, 11350103U, 12025015U,
    12740059U, 13497623U, 14300233U, 15150569U, 16051469U, 17005939U, 18017165U, 19088521U,
    20223584U, 21426141U, 22700205U, 24050030U, 25480119U, 26995246U, 28600467U, 30301139U,
    32102938U, 34011878U, 36034330U, 38177043U, 40447168U, 42852281U, 45400411U, 48100060U,
    50960238U, 53990491U, 57200933U, 60602278U, 64205876U, 68023757U, 72068660U, 76354085U,
    80894335U, 85704563U, 90800821U, 96200119U, 101920476U, 107980983U, 114401866U, 121204555U,
    128411753U, 136047513U, 144137319U, 152708170U, 161788671U, 171409126U, 181601643U, 192400238U,
    203840952U, 215961966U, 228803732U, 242409110U, 256823506U, 272095026U, 288274639U, 305416341U,
    323577341U, 342818251U, 363203285U, 384800477U, 407681904U, 431923931U, 457607465U, 484818220U,
    513647012U, 544190053U, 576549277U, 610832681U, 647154683U, 685636503U, 726406571U, 769600953U,
    815363807U, 863847862U, 915214929U, 969636441U, 1027294024U, 1088380105U, 1153098554U, 1221665363U
};

/* Convert MIDI note number to phase increment for specified sample rate */
static inline uint32_t midi_to_phase_inc_sr(uint8_t note, uint32_t sample_rate) {
    if (note > 127) note = 127;
    uint32_t base_inc = MIDI_PHASE_INC[note];
    if (sample_rate == 0 || sample_rate == WHIMSY_SAMPLE_RATE) {
        return base_inc;
    }
    double factor = (double)WHIMSY_SAMPLE_RATE / (double)sample_rate;
    return (uint32_t)((double)base_inc * factor);
}

void whimsy_synth_init(WhimsySynthEngine *engine) {
    if (!engine) return;
    memset(engine, 0, sizeof(WhimsySynthEngine));
    engine->sample_rate = WHIMSY_SAMPLE_RATE;
    engine->rng_state = 0x811c9dc5u;

    /* Default mixer levels */
    for (int i = 0; i < 8; i++) {
        engine->mixer.fader[i] = 80; /* FADER_UNITY */
    }
    engine->mixer.master_volume = 80;
    engine->mixer.master_filter.cutoff = 14000;
    engine->mixer.master_filter.resonance = 4000;

    whimsy_synth_set_bpm(engine, 108);
}

void whimsy_synth_set_sample_rate(WhimsySynthEngine *engine, uint32_t sample_rate) {
    if (!engine) return;
    if (sample_rate < 8000) sample_rate = 8000;
    if (sample_rate > 384000) sample_rate = 384000;
    engine->sample_rate = sample_rate;
    whimsy_synth_set_bpm(engine, engine->bpm > 0 ? engine->bpm : 108);
}

void whimsy_synth_set_bpm(WhimsySynthEngine *engine, uint16_t bpm) {
    if (!engine) return;
    if (bpm < 36) bpm = 36;
    if (bpm > 208) bpm = 208;
    engine->bpm = bpm;
    uint32_t sr = engine->sample_rate > 0 ? engine->sample_rate : WHIMSY_SAMPLE_RATE;
    /* 12-step loop: 1 eighth note step = (60 / bpm) / 2 seconds */
    double step_sec = (60.0 / (double)bpm) / 2.0;
    engine->samples_per_step = (uint32_t)(step_sec * (double)sr);
}

void whimsy_synth_trigger_note(WhimsySynthEngine *engine, WhimsyVoiceTrack track, uint8_t note, uint8_t velocity) {
    if (!engine || velocity == 0) return;
    uint32_t inc = midi_to_phase_inc_sr(note, engine->sample_rate);

    switch (track) {
        case WHIMSY_VOICE_LEAD:
            engine->lead_osc.phase_inc = inc;
            engine->lead_osc.env_level = 32767;
            engine->lead_osc.env_decay = 1; /* Sustained singing lead */
            engine->lead_osc.active = true;
            engine->lead_osc.note = note;
            engine->lead_osc.velocity = velocity;
            break;
        case WHIMSY_VOICE_PULSE:
            if (note == 38) {
                /* Malbolge Snare / Rim Crack */
                engine->snare_osc.phase_inc = midi_to_phase_inc_sr(48, engine->sample_rate);
                engine->snare_osc.env_level = 32767;
                engine->snare_osc.env_decay = 45;
                engine->snare_osc.active = true;
                engine->snare_osc.note = 38;
                engine->snare_osc.velocity = velocity;
            } else if (note == 42) {
                /* Malbolge Clockwork Escapement Chime / Tick */
                engine->hat_osc.phase_inc = midi_to_phase_inc_sr(72, engine->sample_rate);
                engine->hat_osc.env_level = 32767;
                engine->hat_osc.env_decay = 80;
                engine->hat_osc.active = true;
                engine->hat_osc.note = 42;
                engine->hat_osc.velocity = velocity;
            } else {
                /* Malbolge Kick / Downbeat Thump */
                engine->pulse_osc.phase_inc = midi_to_phase_inc_sr(36, engine->sample_rate) * 2;
                engine->pulse_osc.env_level = 32767;
                engine->pulse_osc.env_decay = 40;
                engine->pulse_osc.active = true;
                engine->pulse_osc.note = note;
                engine->pulse_osc.velocity = velocity;
            }
            break;
        case WHIMSY_VOICE_BASS:
            engine->bass_osc.phase_inc = inc;
            engine->bass_osc.env_level = 32767;
            engine->bass_osc.env_decay = 4;
            engine->bass_osc.active = true;
            engine->bass_osc.note = note;
            engine->bass_osc.velocity = velocity;
            break;
        case WHIMSY_VOICE_CHIME:
            engine->chime_osc.phase_inc = inc;
            engine->chime_osc.env_level = 32767;
            engine->chime_osc.env_decay = 4;
            engine->chime_osc.active = true;
            engine->chime_osc.note = note;
            engine->chime_osc.velocity = velocity;
            break;
        case WHIMSY_VOICE_MANUAL: {
            int slot = -1;
            for (int i = 0; i < 4; i++) {
                if (!engine->manual_osc[i].active) {
                    slot = i;
                    break;
                }
            }
            if (slot < 0) {
                /* Steal oldest / lowest envelope voice */
                int32_t lowest = 32768;
                slot = 0;
                for (int i = 0; i < 4; i++) {
                    if (engine->manual_osc[i].env_level < lowest) {
                        lowest = engine->manual_osc[i].env_level;
                        slot = i;
                    }
                }
            }
            engine->manual_osc[slot].phase_inc = inc;
            engine->manual_osc[slot].env_level = 32767;
            engine->manual_osc[slot].env_decay = 1; /* Lush pad sustain */
            engine->manual_osc[slot].active = true;
            engine->manual_osc[slot].note = note;
            engine->manual_osc[slot].velocity = velocity;
            break;
        }
        case WHIMSY_VOICE_ORGAN: {
            int slot = -1;
            for (int i = 0; i < 3; i++) {
                if (!engine->organ_osc[i].active) {
                    slot = i;
                    break;
                }
            }
            if (slot < 0) slot = 0;
            engine->organ_osc[slot].phase_inc = inc;
            engine->organ_osc[slot].env_level = 32767;
            engine->organ_osc[slot].env_decay = 2;
            engine->organ_osc[slot].active = true;
            engine->organ_osc[slot].note = note;
            engine->organ_osc[slot].velocity = velocity;
            break;
        }
        case WHIMSY_VOICE_CHOIR:
            for (int i = 0; i < 3; i++) {
                /* Voice 0: fundamental, Voice 1: slight detune (+5 cents), Voice 2: formant octave */
                uint32_t choir_inc = inc;
                if (i == 1) choir_inc = (uint32_t)((double)inc * 1.0029);
                else if (i == 2) choir_inc = (uint32_t)((double)inc * 2.0);

                engine->choir_osc[i].phase_inc = choir_inc;
                engine->choir_osc[i].env_level = 32767;
                engine->choir_osc[i].env_decay = 1;
                engine->choir_osc[i].active = true;
                engine->choir_osc[i].note = note;
                engine->choir_osc[i].velocity = velocity;
            }
            break;
        case WHIMSY_VOICE_MYCELIUM:
            if (note >= 60) {
                /* Bio-acoustic Spore Puff / Hyphal Crackle */
                engine->mycelium_noise.phase_inc = inc;
                engine->mycelium_noise.env_level = 32767;
                engine->mycelium_noise.env_decay = 18;
                engine->mycelium_noise.active = true;
                engine->mycelium_noise.note = note;
                engine->mycelium_noise.velocity = velocity;
            } else {
                /* Bio-acoustic Guttation Droplet / Woody Conk Knock */
                engine->mycelium_osc.phase_inc = midi_to_phase_inc_sr(note, engine->sample_rate) * 3;
                engine->mycelium_osc.env_level = 32767;
                engine->mycelium_osc.env_decay = 12;
                engine->mycelium_osc.active = true;
                engine->mycelium_osc.note = note;
                engine->mycelium_osc.velocity = velocity;
            }
            break;
        default:
            break;
    }
}

void whimsy_synth_release_note(WhimsySynthEngine *engine, WhimsyVoiceTrack track, uint8_t note) {
    if (!engine) return;
    switch (track) {
        case WHIMSY_VOICE_LEAD:
            if (engine->lead_osc.note == note) engine->lead_osc.env_decay = 16;
            break;
        case WHIMSY_VOICE_BASS:
            if (engine->bass_osc.note == note) engine->bass_osc.env_decay = 32;
            break;
        case WHIMSY_VOICE_MANUAL:
            for (int i = 0; i < 4; i++) {
                if (engine->manual_osc[i].active && engine->manual_osc[i].note == note) {
                    engine->manual_osc[i].env_decay = 16;
                }
            }
            break;
        case WHIMSY_VOICE_ORGAN:
            for (int i = 0; i < 3; i++) {
                if (engine->organ_osc[i].active && engine->organ_osc[i].note == note) {
                    engine->organ_osc[i].env_decay = 24;
                }
            }
            break;
        case WHIMSY_VOICE_CHOIR:
            for (int i = 0; i < 3; i++) {
                if (engine->choir_osc[i].active && engine->choir_osc[i].note == note) {
                    engine->choir_osc[i].env_decay = 16;
                }
            }
            break;
        default:
            break;
    }
}

int whimsy_synth_render_block(WhimsySynthEngine *engine, int32_t *output, unsigned frames) {
    if (!engine || !output || frames == 0) return -1;

    for (unsigned f = 0; f < frames; f++) {
        int32_t mix_l = 0;
        int32_t mix_r = 0;

        /* Step sequencer advance */
        engine->step_sample_counter++;
        if (engine->step_sample_counter >= engine->samples_per_step) {
            engine->step_sample_counter = 0;
            engine->current_step = (engine->current_step + 1) % 12;
        }

        /* 1. LOLCODE Lead Voice (Singing pulse / saw blend) */
        if (engine->lead_osc.active && !engine->mixer.muted[WHIMSY_VOICE_LEAD]) {
            uint32_t ph = engine->lead_osc.phase;
            int32_t saw = (int32_t)((ph >> 16) - 32768);
            int32_t pulse = (ph < 0x60000000u) ? 16384 : -16384;
            int32_t sample = (saw + pulse) >> 1;
            sample = (sample * engine->lead_osc.env_level) >> 15;
            sample = (sample * engine->mixer.fader[WHIMSY_VOICE_LEAD]) / 100;

            mix_l += sample;
            mix_r += sample;

            engine->lead_osc.phase += engine->lead_osc.phase_inc;
            engine->lead_osc.env_level -= engine->lead_osc.env_decay;
            if (engine->lead_osc.env_level <= 0) {
                engine->lead_osc.env_level = 0;
                engine->lead_osc.active = false;
            }
        }

        /* 2. Brainfuck Bass Voice (Sub-sine + resonant drive) */
        if (engine->bass_osc.active && !engine->mixer.muted[WHIMSY_VOICE_BASS]) {
            uint32_t ph = engine->bass_osc.phase;
            int32_t sample = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
            sample = (sample * engine->bass_osc.env_level) >> 15;
            sample = (sample * engine->mixer.fader[WHIMSY_VOICE_BASS]) / 100;

            mix_l += sample;
            mix_r += sample;

            engine->bass_osc.phase += engine->bass_osc.phase_inc;
            engine->bass_osc.env_level -= engine->bass_osc.env_decay;
            if (engine->bass_osc.env_level <= 0) {
                engine->bass_osc.env_level = 0;
                engine->bass_osc.active = false;
            }
        }

        /* 3. Befunge Chord Organ */
        for (int i = 0; i < 3; i++) {
            if (engine->organ_osc[i].active && !engine->mixer.muted[WHIMSY_VOICE_ORGAN]) {
                int32_t sample = (int32_t)((engine->organ_osc[i].phase >> 16) - 32768);
                sample = (sample * engine->organ_osc[i].env_level) >> 16;
                sample = (sample * engine->mixer.fader[WHIMSY_VOICE_ORGAN]) / 100;

                mix_l += sample;
                mix_r += sample;

                engine->organ_osc[i].phase += engine->organ_osc[i].phase_inc;
                engine->organ_osc[i].env_level -= engine->organ_osc[i].env_decay;
                if (engine->organ_osc[i].env_level <= 0) {
                    engine->organ_osc[i].env_level = 0;
                    engine->organ_osc[i].active = false;
                }
            }
        }

        /* 4. Fun Machine Pad Manual (Polyphonic lush saw/tri pad) */
        for (int i = 0; i < 4; i++) {
            if (engine->manual_osc[i].active && !engine->mixer.muted[WHIMSY_VOICE_MANUAL]) {
                uint32_t ph = engine->manual_osc[i].phase;
                int32_t tri = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
                int32_t saw = (int32_t)((ph >> 16) - 32768);
                int32_t sample = (tri * 3 + saw) >> 2;
                sample = (sample * engine->manual_osc[i].env_level) >> 16;
                sample = (sample * engine->mixer.fader[WHIMSY_VOICE_MANUAL]) / 100;

                mix_l += sample;
                mix_r += sample;

                engine->manual_osc[i].phase += engine->manual_osc[i].phase_inc;
                engine->manual_osc[i].env_level -= engine->manual_osc[i].env_decay;
                if (engine->manual_osc[i].env_level <= 0) {
                    engine->manual_osc[i].env_level = 0;
                    engine->manual_osc[i].active = false;
                }
            }
        }

        /* 5. FRACTRAN Chimes Voice (Pure high bell) */
        if (engine->chime_osc.active && !engine->mixer.muted[WHIMSY_VOICE_CHIME]) {
            uint32_t ph = engine->chime_osc.phase;
            int32_t sample = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
            sample = (sample * engine->chime_osc.env_level) >> 15;
            sample = (sample * engine->mixer.fader[WHIMSY_VOICE_CHIME]) / 100;

            mix_l += sample;
            mix_r += sample;

            engine->chime_osc.phase += engine->chime_osc.phase_inc;
            engine->chime_osc.env_level -= engine->chime_osc.env_decay;
            if (engine->chime_osc.env_level <= 0) {
                engine->chime_osc.env_level = 0;
                engine->chime_osc.active = false;
            }
        }

        /* 6. Malbolge Percussion Pulse Voice (Kick + Snare + Clockwork Escapement Chime) */
        if (!engine->mixer.muted[WHIMSY_VOICE_PULSE]) {
            int32_t beat_sum = 0;

            /* Kick / Downbeat Thump */
            if (engine->pulse_osc.active) {
                uint32_t ph = engine->pulse_osc.phase;
                int32_t kick_s = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
                kick_s = (kick_s * engine->pulse_osc.env_level) >> 15;
                beat_sum += (kick_s * engine->pulse_osc.velocity) >> 7;

                engine->pulse_osc.phase += engine->pulse_osc.phase_inc;
                if (engine->pulse_osc.phase_inc > 150000U) {
                    engine->pulse_osc.phase_inc -= (engine->pulse_osc.phase_inc >> 6);
                }
                engine->pulse_osc.env_level -= engine->pulse_osc.env_decay;
                if (engine->pulse_osc.env_level <= 0) {
                    engine->pulse_osc.env_level = 0;
                    engine->pulse_osc.active = false;
                }
            }

            /* Snare / Rim Crack (Tonal punch + shaped noise crack) */
            if (engine->snare_osc.active) {
                engine->rng_state = engine->rng_state * 1664525u + 1013904223u;
                int32_t noise = (int32_t)((engine->rng_state >> 16) - 32768);
                int32_t tone = (engine->snare_osc.phase < 0x80000000u) ? 14000 : -14000;
                int32_t snare_s = (noise * 3 + tone) >> 2;
                snare_s = (snare_s * engine->snare_osc.env_level) >> 15;
                beat_sum += (snare_s * engine->snare_osc.velocity) >> 7;

                engine->snare_osc.phase += engine->snare_osc.phase_inc;
                engine->snare_osc.env_level -= engine->snare_osc.env_decay;
                if (engine->snare_osc.env_level <= 0) {
                    engine->snare_osc.env_level = 0;
                    engine->snare_osc.active = false;
                }
            }

            /* Clockwork Tick / Escapement Chime */
            if (engine->hat_osc.active) {
                engine->rng_state = engine->rng_state * 1664525u + 1013904223u;
                int32_t noise = (int32_t)((engine->rng_state >> 16) - 32768);
                int32_t tick_s = (noise * engine->hat_osc.env_level) >> 15;
                beat_sum += (tick_s * engine->hat_osc.velocity) >> 7;

                engine->hat_osc.phase += engine->hat_osc.phase_inc;
                engine->hat_osc.env_level -= engine->hat_osc.env_decay;
                if (engine->hat_osc.env_level <= 0) {
                    engine->hat_osc.env_level = 0;
                    engine->hat_osc.active = false;
                }
            }

            beat_sum = (beat_sum * engine->mixer.fader[WHIMSY_VOICE_PULSE]) / 100;
            mix_l += beat_sum;
            mix_r += beat_sum;
        }

        /* 7. Shakespeare Vowel Formant Choir (/a/, /e/, /o/) */
        if (!engine->mixer.muted[WHIMSY_VOICE_CHOIR]) {
            int32_t choir_sum = 0;
            for (int i = 0; i < 3; i++) {
                if (engine->choir_osc[i].active) {
                    uint32_t ph = engine->choir_osc[i].phase;
                    int32_t tri = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
                    int32_t pulse = (ph < 0x40000000u) ? 12000 : -12000;
                    int32_t s = (tri + pulse) >> 1;
                    s = (s * engine->choir_osc[i].env_level) >> 16;
                    choir_sum += s;

                    engine->choir_osc[i].phase += engine->choir_osc[i].phase_inc;
                    engine->choir_osc[i].env_level -= engine->choir_osc[i].env_decay;
                    if (engine->choir_osc[i].env_level <= 0) {
                        engine->choir_osc[i].env_level = 0;
                        engine->choir_osc[i].active = false;
                    }
                }
            }
            choir_sum = (choir_sum * engine->mixer.fader[WHIMSY_VOICE_CHOIR]) / 100;
            mix_l += choir_sum;
            mix_r += choir_sum;
        }

        /* 8. Mycelium Bio-acoustic Voice (Liquid Guttation Drops + Spore Puffs) */
        if (!engine->mixer.muted[WHIMSY_VOICE_MYCELIUM]) {
            int32_t myc_l = 0;
            int32_t myc_r = 0;

            /* Liquid drop / woody shelf knock */
            if (engine->mycelium_osc.active) {
                uint32_t ph = engine->mycelium_osc.phase;
                int32_t s = (ph < 0x80000000u) ? (int32_t)(ph >> 15) - 32768 : 32767 - (int32_t)((ph - 0x80000000u) >> 15);
                s = (s * engine->mycelium_osc.env_level) >> 15;
                s = (s * engine->mycelium_osc.velocity) >> 7;

                myc_l += (s * 3) >> 2;
                myc_r += (s * 5) >> 2;

                engine->mycelium_osc.phase += engine->mycelium_osc.phase_inc;
                /* Downward chirp sweep for liquid teardrop sound */
                if (engine->mycelium_osc.phase_inc > 80000U) {
                    engine->mycelium_osc.phase_inc -= (engine->mycelium_osc.phase_inc >> 5);
                }
                engine->mycelium_osc.env_level -= engine->mycelium_osc.env_decay;
                if (engine->mycelium_osc.env_level <= 0) {
                    engine->mycelium_osc.env_level = 0;
                    engine->mycelium_osc.active = false;
                }
            }

            /* Spore puff / hyphal crackle noise burst */
            if (engine->mycelium_noise.active) {
                engine->rng_state = engine->rng_state * 1664525u + 1013904223u;
                int32_t noise = (int32_t)((engine->rng_state >> 16) - 32768);
                int32_t s = (noise * engine->mycelium_noise.env_level) >> 15;
                s = (s * engine->mycelium_noise.velocity) >> 7;

                myc_l += (s * 4) >> 2;
                myc_r += (s * 2) >> 2;

                engine->mycelium_noise.env_level -= engine->mycelium_noise.env_decay;
                if (engine->mycelium_noise.env_level <= 0) {
                    engine->mycelium_noise.env_level = 0;
                    engine->mycelium_noise.active = false;
                }
            }

            mix_l += (myc_l * engine->mixer.fader[WHIMSY_VOICE_MYCELIUM]) / 100;
            mix_r += (myc_r * engine->mixer.fader[WHIMSY_VOICE_MYCELIUM]) / 100;
        }

        /* Apply Master Filter (SVF Lowpass with 2x oversampling for stability) */
        if (engine->mixer.master_filter.cutoff < 16000) {
            int32_t f_coef = engine->mixer.master_filter.cutoff >> 2;
            if (f_coef > 8192) f_coef = 8192;
            if (f_coef < 16) f_coef = 16;
            int32_t q_damp = 32768 - engine->mixer.master_filter.resonance;
            if (q_damp < 2048) q_damp = 2048;

            for (int os = 0; os < 2; os++) {
                engine->mixer.master_filter.low += (f_coef * engine->mixer.master_filter.band) >> 15;
                engine->mixer.master_filter.high = mix_l - engine->mixer.master_filter.low - ((q_damp * engine->mixer.master_filter.band) >> 15);
                engine->mixer.master_filter.band += (f_coef * engine->mixer.master_filter.high) >> 15;

                engine->mixer.master_filter.low_r += (f_coef * engine->mixer.master_filter.band_r) >> 15;
                engine->mixer.master_filter.high_r = mix_r - engine->mixer.master_filter.low_r - ((q_damp * engine->mixer.master_filter.band_r) >> 15);
                engine->mixer.master_filter.band_r += (f_coef * engine->mixer.master_filter.high_r) >> 15;
            }
            mix_l = engine->mixer.master_filter.low;
            mix_r = engine->mixer.master_filter.low_r;
        }

        /* Master Headroom Scaling (MIX_LEVEL ~0.28): 72 / 256 prevents master clipping */
        mix_l = (mix_l * 72) >> 8;
        mix_r = (mix_r * 72) >> 8;

        /* Apply Master Volume (0..100) */
        mix_l = (mix_l * engine->mixer.master_volume) / 100;
        mix_r = (mix_r * engine->mixer.master_volume) / 100;

        /* Musical Soft-Saturation Limiter (smooth polynomial knee) */
        if (mix_l > 22000) {
            int32_t over = mix_l - 22000;
            mix_l = 22000 + (over * 9000) / (over + 9000);
        } else if (mix_l < -22000) {
            int32_t over = -mix_l - 22000;
            mix_l = -(22000 + (over * 9000) / (over + 9000));
        }

        if (mix_r > 22000) {
            int32_t over = mix_r - 22000;
            mix_r = 22000 + (over * 9000) / (over + 9000);
        } else if (mix_r < -22000) {
            int32_t over = -mix_r - 22000;
            mix_r = -(22000 + (over * 9000) / (over + 9000));
        }

        /* Q15 to Q23: Shift left 8 */
        int32_t out_l = mix_l << 8;
        int32_t out_r = mix_r << 8;

        if (out_l > 8388607) out_l = 8388607;
        if (out_l < -8388608) out_l = -8388608;
        if (out_r > 8388607) out_r = 8388607;
        if (out_r < -8388608) out_r = -8388608;

        output[f * 2] = out_l;
        output[f * 2 + 1] = out_r;
    }

    return 0;
}
