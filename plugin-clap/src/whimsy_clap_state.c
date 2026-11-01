#include "whimsy_clap.h"

static bool whimsy_state_save(const clap_plugin_t *plugin, const clap_ostream_t *stream) {
    if (!plugin || !plugin->plugin_data || !stream || !stream->write) {
        return false;
    }
    const WhimsyClapPlugin *plug = (const WhimsyClapPlugin *)plugin->plugin_data;

    WhimsyClapStateHeader header;
    memset(&header, 0, sizeof(header));

    header.magic = WHIMSY_STATE_MAGIC;
    header.version = WHIMSY_STATE_VERSION;
    header.seed = plug->current_seed;

    size_t phrase_len = strlen(plug->phrase);
    if (phrase_len > sizeof(header.phrase) - 1) {
        phrase_len = sizeof(header.phrase) - 1;
    }
    header.phrase_len = (uint8_t)phrase_len;
    memcpy(header.phrase, plug->phrase, phrase_len);
    header.phrase[phrase_len] = '\0';

    for (int i = 0; i < 8; i++) {
        header.faders[i] = plug->engine.mixer.fader[i];
    }

    uint8_t mutes = 0;
    for (int i = 0; i < 8; i++) {
        if (plug->engine.mixer.muted[i]) {
            mutes |= (uint8_t)(1 << i);
        }
    }
    header.mutes = mutes;

    header.grid_steps = (uint8_t)(plug->grid_steps >= 0.5 ? 1 : 0);
    header.euler_strict = (uint8_t)plug->euler_strictness;
    header.filter_cutoff = (uint16_t)plug->engine.mixer.master_filter.cutoff;
    header.filter_q = (uint16_t)plug->engine.mixer.master_filter.resonance;

    const uint8_t *ptr = (const uint8_t *)&header;
    uint64_t to_write = sizeof(header);

    while (to_write > 0) {
        int64_t written = stream->write(stream, ptr, to_write);
        if (written <= 0) {
            return false;
        }
        ptr += written;
        to_write -= (uint64_t)written;
    }

    return true;
}

static bool whimsy_state_load(const clap_plugin_t *plugin, const clap_istream_t *stream) {
    if (!plugin || !plugin->plugin_data || !stream || !stream->read) {
        return false;
    }
    WhimsyClapPlugin *plug = (WhimsyClapPlugin *)plugin->plugin_data;

    WhimsyClapStateHeader header;
    uint8_t *ptr = (uint8_t *)&header;
    uint64_t to_read = sizeof(header);

    while (to_read > 0) {
        int64_t bytes_read = stream->read(stream, ptr, to_read);
        if (bytes_read <= 0) {
            return false;
        }
        ptr += bytes_read;
        to_read -= (uint64_t)bytes_read;
    }

    if (header.magic != WHIMSY_STATE_MAGIC || header.version != WHIMSY_STATE_VERSION) {
        return false;
    }

    if (header.phrase_len > 0 && header.phrase_len < sizeof(header.phrase)) {
        header.phrase[header.phrase_len] = '\0';
        whimsy_clap_reseed(plug, header.seed, header.phrase);
    } else {
        whimsy_clap_reseed(plug, header.seed, NULL);
    }

    for (int i = 0; i < 8; i++) {
        plug->engine.mixer.fader[i] = header.faders[i];
        plug->faders[i] = (double)header.faders[i] / 100.0;

        bool m = (header.mutes & (1 << i)) != 0;
        plug->engine.mixer.muted[i] = m;
        plug->mutes[i] = m ? 1.0 : 0.0;
    }

    plug->grid_steps = (header.grid_steps != 0) ? 1.0 : 0.0;
    plug->euler_strictness = (double)header.euler_strict;
    plug->engine.mixer.master_filter.cutoff = header.filter_cutoff;
    plug->engine.mixer.master_filter.resonance = header.filter_q;

    return true;
}

const clap_plugin_state_t whimsy_clap_state = {
    .save = whimsy_state_save,
    .load = whimsy_state_load
};
