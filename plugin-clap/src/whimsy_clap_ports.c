#include "whimsy_clap.h"

/* ---------------------------------------------------------------------------
 * Audio Ports Extension
 * --------------------------------------------------------------------------- */
static uint32_t whimsy_audio_ports_count(const clap_plugin_t *plugin, bool is_input) {
    (void)plugin;
    /* Synthesizer instrument: 0 audio inputs, 1 stereo master output port */
    return is_input ? 0 : 1;
}

static bool whimsy_audio_ports_get(const clap_plugin_t *plugin,
                                   uint32_t index,
                                   bool is_input,
                                   clap_audio_port_info_t *info)
{
    (void)plugin;
    if (is_input || !info || index != 0) return false;

    memset(info, 0, sizeof(clap_audio_port_info_t));
    info->id = 0;
    info->channel_count = 2;
    info->port_type = CLAP_PORT_STEREO;
    info->in_place_pair = CLAP_INVALID_ID;
    info->flags = CLAP_AUDIO_PORT_IS_MAIN | CLAP_AUDIO_PORT_SUPPORTS_64BITS | CLAP_AUDIO_PORT_REQUIRES_COMMON_SAMPLE_SIZE;

    strncpy(info->name, "Master Stereo Out", sizeof(info->name) - 1);
    return true;
}

const clap_plugin_audio_ports_t whimsy_clap_audio_ports = {
    .count = whimsy_audio_ports_count,
    .get = whimsy_audio_ports_get
};

/* ---------------------------------------------------------------------------
 * Note Ports Extension
 * --------------------------------------------------------------------------- */
static uint32_t whimsy_note_ports_count(const clap_plugin_t *plugin, bool is_input) {
    (void)plugin;
    /* 1 note input port, 0 note output ports */
    return is_input ? 1 : 0;
}

static bool whimsy_note_ports_get(const clap_plugin_t *plugin,
                                  uint32_t index,
                                  bool is_input,
                                  clap_note_port_info_t *info)
{
    (void)plugin;
    if (!is_input || !info || index != 0) return false;

    memset(info, 0, sizeof(clap_note_port_info_t));
    info->id = 0;
    info->supported_dialects = CLAP_NOTE_DIALECT_CLAP | CLAP_NOTE_DIALECT_MIDI;
    info->preferred_dialect = CLAP_NOTE_DIALECT_CLAP;
    strncpy(info->name, "MIDI / Note In", sizeof(info->name) - 1);

    return true;
}

const clap_plugin_note_ports_t whimsy_clap_note_ports = {
    .count = whimsy_note_ports_count,
    .get = whimsy_note_ports_get
};
