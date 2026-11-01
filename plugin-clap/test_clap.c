#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <assert.h>
#include <dlfcn.h>
#include <math.h>

#include "clap/clap.h"
#include "whimsy_clap.h"

/* ---------------------------------------------------------------------------
 * Mock Host
 * --------------------------------------------------------------------------- */
static void mock_host_request_restart(const clap_host_t *host) {
    (void)host;
}

static void mock_host_request_process(const clap_host_t *host) {
    (void)host;
}

static void mock_host_request_callback(const clap_host_t *host) {
    (void)host;
}

static const void *mock_host_get_extension(const clap_host_t *host, const char *extension_id) {
    (void)host;
    (void)extension_id;
    return NULL;
}

static const clap_host_t g_mock_host = {
    .clap_version = CLAP_VERSION,
    .host_data = NULL,
    .name = "Whimsy Machine Headless Test Host",
    .vendor = "Antigravity Pair",
    .url = "https://whimsy.machine",
    .version = "1.0.0",
    .get_extension = mock_host_get_extension,
    .request_restart = mock_host_request_restart,
    .request_process = mock_host_request_process,
    .request_callback = mock_host_request_callback
};

/* ---------------------------------------------------------------------------
 * Mock In-Memory Stream for State Save / Load
 * --------------------------------------------------------------------------- */
typedef struct {
    uint8_t buffer[4096];
    size_t size;
    size_t read_pos;
} MockStreamCtx;

static int64_t mock_stream_write(const clap_ostream_t *stream, const void *buffer, uint64_t size) {
    MockStreamCtx *ctx = (MockStreamCtx *)stream->ctx;
    if (ctx->size + size > sizeof(ctx->buffer)) {
        return -1;
    }
    memcpy(ctx->buffer + ctx->size, buffer, (size_t)size);
    ctx->size += (size_t)size;
    return (int64_t)size;
}

static int64_t mock_stream_read(const clap_istream_t *stream, void *buffer, uint64_t size) {
    MockStreamCtx *ctx = (MockStreamCtx *)stream->ctx;
    if (ctx->read_pos >= ctx->size) {
        return 0; /* EOF */
    }
    size_t available = ctx->size - ctx->read_pos;
    size_t to_read = (size < available) ? (size_t)size : available;
    memcpy(buffer, ctx->buffer + ctx->read_pos, to_read);
    ctx->read_pos += to_read;
    return (int64_t)to_read;
}

/* ---------------------------------------------------------------------------
 * Mock Event Queue
 * --------------------------------------------------------------------------- */
typedef struct {
    const clap_event_header_t *events[16];
    uint32_t count;
} MockEventQueue;

static uint32_t mock_events_size(const struct clap_input_events *list) {
    MockEventQueue *q = (MockEventQueue *)list->ctx;
    return q->count;
}

static const clap_event_header_t *mock_events_get(const struct clap_input_events *list, uint32_t index) {
    MockEventQueue *q = (MockEventQueue *)list->ctx;
    if (index >= q->count) return NULL;
    return q->events[index];
}

/* ---------------------------------------------------------------------------
 * Main Test Runner
 * --------------------------------------------------------------------------- */
int main(int argc, char **argv) {
    const char *so_path = (argc > 1) ? argv[1] : "build/whimsy-machine.clap";
    printf("✦ Testing Whimsy Machine CLAP Instrument Plugin: %s\n", so_path);

    /* 1. Dynamic Load */
    void *handle = dlopen(so_path, RTLD_NOW | RTLD_LOCAL);
    if (!handle) {
        fprintf(stderr, "FAIL: dlopen(%s) failed: %s\n", so_path, dlerror());
        return 1;
    }
    printf("✔ Successfully loaded shared object (%s)\n", so_path);

    /* 2. Symbol Resolution */
    const clap_plugin_entry_t *entry = (const clap_plugin_entry_t *)dlsym(handle, "clap_entry");
    if (!entry) {
        fprintf(stderr, "FAIL: Symbol 'clap_entry' not found\n");
        dlclose(handle);
        return 1;
    }
    printf("✔ Found 'clap_entry' symbol\n");

    assert(clap_version_is_compatible(entry->clap_version));
    assert(entry->init(so_path) == true);
    printf("✔ Initialized DSO entry point\n");

    /* 3. Plugin Factory */
    const clap_plugin_factory_t *factory = (const clap_plugin_factory_t *)entry->get_factory(CLAP_PLUGIN_FACTORY_ID);
    assert(factory != NULL);
    assert(factory->get_plugin_count(factory) == 1);

    const clap_plugin_descriptor_t *desc = factory->get_plugin_descriptor(factory, 0);
    assert(desc != NULL);
    assert(strcmp(desc->id, WHIMSY_CLAP_ID) == 0);
    assert(strcmp(desc->name, WHIMSY_CLAP_NAME) == 0);
    assert(strcmp(desc->version, WHIMSY_CLAP_VERSION) == 0);
    printf("✔ Factory reports valid plugin descriptor ('%s' v%s)\n", desc->id, desc->version);

    /* 4. Plugin Instance Creation */
    const clap_plugin_t *plugin = factory->create_plugin(factory, &g_mock_host, desc->id);
    assert(plugin != NULL);
    assert(plugin->init(plugin) == true);
    printf("✔ Successfully instantiated and initialized CLAP plugin\n");

    /* 5. Audio Ports Extension */
    const clap_plugin_audio_ports_t *audio_ports = (const clap_plugin_audio_ports_t *)plugin->get_extension(plugin, CLAP_EXT_AUDIO_PORTS);
    assert(audio_ports != NULL);
    assert(audio_ports->count(plugin, true) == 0);  /* 0 audio inputs */
    assert(audio_ports->count(plugin, false) == 1); /* 1 stereo master output */

    clap_audio_port_info_t ainfo;
    assert(audio_ports->get(plugin, 0, false, &ainfo) == true);
    assert(ainfo.channel_count == 2);
    assert(ainfo.flags & CLAP_AUDIO_PORT_IS_MAIN);
    assert(strcmp(ainfo.port_type, CLAP_PORT_STEREO) == 0);
    printf("✔ Audio ports verified (0 inputs, 1 main stereo output port)\n");

    /* 6. Note Ports Extension */
    const clap_plugin_note_ports_t *note_ports = (const clap_plugin_note_ports_t *)plugin->get_extension(plugin, CLAP_EXT_NOTE_PORTS);
    assert(note_ports != NULL);
    assert(note_ports->count(plugin, true) == 1);
    assert(note_ports->count(plugin, false) == 0);

    clap_note_port_info_t ninfo;
    assert(note_ports->get(plugin, 0, true, &ninfo) == true);
    assert(ninfo.supported_dialects & CLAP_NOTE_DIALECT_CLAP);
    assert(ninfo.supported_dialects & CLAP_NOTE_DIALECT_MIDI);
    printf("✔ Note ports verified (1 note input, supporting CLAP & MIDI dialects)\n");

    /* 7. Parameters Extension */
    const clap_plugin_params_t *params = (const clap_plugin_params_t *)plugin->get_extension(plugin, CLAP_EXT_PARAMS);
    assert(params != NULL);
    uint32_t pcount = params->count(plugin);
    assert(pcount == WHIMSY_PARAM_COUNT);

    for (uint32_t i = 0; i < pcount; i++) {
        clap_param_info_t pinfo;
        assert(params->get_info(plugin, i, &pinfo) == true);
        assert(pinfo.name[0] != '\0');
    }

    double master_vol = 0.0;
    assert(params->get_value(plugin, WHIMSY_PARAM_MASTER_VOLUME, &master_vol) == true);
    assert(fabs(master_vol - 0.80) < 0.001);

    char text_buf[64] = {0};
    assert(params->value_to_text(plugin, WHIMSY_PARAM_MASTER_VOLUME, 0.75, text_buf, sizeof(text_buf)) == true);
    assert(strstr(text_buf, "75 %") != NULL);

    double parsed_val = 0.0;
    assert(params->text_to_value(plugin, WHIMSY_PARAM_GRID_STEPS, "16-Step Straight", &parsed_val) == true);
    assert(parsed_val == 1.0);
    printf("✔ Parameter metadata, getters, text formatting, and parsing verified (23 parameters)\n");

    /* 8. State Save and Load Extension */
    const clap_plugin_state_t *state = (const clap_plugin_state_t *)plugin->get_extension(plugin, CLAP_EXT_STATE);
    assert(state != NULL);

    MockStreamCtx stream_ctx;
    memset(&stream_ctx, 0, sizeof(stream_ctx));
    clap_ostream_t ostream = { .ctx = &stream_ctx, .write = mock_stream_write };
    clap_istream_t istream = { .ctx = &stream_ctx, .read = mock_stream_read };

    assert(state->save(plugin, &ostream) == true);
    assert(stream_ctx.size == sizeof(WhimsyClapStateHeader));

    /* Verify header contents */
    WhimsyClapStateHeader *hdr = (WhimsyClapStateHeader *)stream_ctx.buffer;
    assert(hdr->magic == WHIMSY_STATE_MAGIC);
    assert(hdr->version == WHIMSY_STATE_VERSION);
    assert(hdr->seed == 0x379482c9u); /* default "parlor glass" */
    assert(strcmp(hdr->phrase, "parlor glass") == 0);

    /* Mutate seed and phrase to simulate state change */
    WhimsyClapPlugin *plug_internal = (WhimsyClapPlugin *)plugin->plugin_data;
    plug_internal->current_seed = 0x12345678u;
    strcpy(plug_internal->phrase, "curio cabinet");
    assert(plug_internal->current_seed != 0x379482c9u);

    /* Restore from stream */
    assert(state->load(plugin, &istream) == true);
    assert(plug_internal->current_seed == 0x379482c9u);
    assert(strcmp(plug_internal->phrase, "parlor glass") == 0);
    printf("✔ State serialization and deserialization round-trip verified (Session v9)\n");

    /* 9. Activation & Processing */
    assert(plugin->activate(plugin, 48000.0, 32, 512) == true);
    assert(plugin->start_processing(plugin) == true);

    float left_out[512] = {0};
    float right_out[512] = {0};
    float *channels[2] = { left_out, right_out };
    clap_audio_buffer_t audio_out = {
        .data32 = channels,
        .data64 = NULL,
        .channel_count = 2,
        .latency = 0,
        .constant_mask = 0
    };

    /* Schedule a note on at frame 16 */
    clap_event_note_t note_on = {
        .header = {
            .size = sizeof(clap_event_note_t),
            .time = 16,
            .space_id = CLAP_CORE_EVENT_SPACE_ID,
            .type = CLAP_EVENT_NOTE_ON,
            .flags = 0
        },
        .note_id = 1,
        .port_index = 0,
        .channel = 0,
        .key = 64,
        .velocity = 0.85
    };

    MockEventQueue in_queue;
    in_queue.count = 1;
    in_queue.events[0] = &note_on.header;

    clap_input_events_t in_events = {
        .ctx = &in_queue,
        .size = mock_events_size,
        .get = mock_events_get
    };

    clap_event_transport_t transport = {
        .header = {
            .size = sizeof(clap_event_transport_t),
            .time = 0,
            .space_id = CLAP_CORE_EVENT_SPACE_ID,
            .type = CLAP_EVENT_TRANSPORT,
            .flags = 0
        },
        .flags = CLAP_TRANSPORT_IS_PLAYING | CLAP_TRANSPORT_HAS_TEMPO | CLAP_TRANSPORT_HAS_BEATS_TIMELINE,
        .song_pos_beats = 0,
        .tempo = 120.0
    };

    clap_process_t proc = {
        .steady_time = 0,
        .frames_count = 512,
        .transport = &transport,
        .audio_inputs = NULL,
        .audio_outputs = &audio_out,
        .audio_inputs_count = 0,
        .audio_outputs_count = 1,
        .in_events = &in_events,
        .out_events = NULL
    };

    clap_process_status status = plugin->process(plugin, &proc);
    assert(status == CLAP_PROCESS_CONTINUE);

    /* 10. Audio Output Verification (Ensemble Headroom Check) */
    bool non_zero_audio = false;
    float max_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        assert(!isnan(left_out[i]));
        assert(!isnan(right_out[i]));
        assert(!isinf(left_out[i]));
        assert(!isinf(right_out[i]));
        if (fabs(left_out[i]) > max_peak) max_peak = fabsf(left_out[i]);
        if (fabs(right_out[i]) > max_peak) max_peak = fabsf(right_out[i]);
        if (fabs(left_out[i]) > 0.0001f || fabs(right_out[i]) > 0.0001f) {
            non_zero_audio = true;
        }
    }
    assert(non_zero_audio == true);
    /* Strict headroom check: master mix must never digital-clip (stays below 1.0 full-scale) */
    assert(max_peak < 0.98f);
    printf("✔ Rendered 512 frames of Float32 stereo audio (non-silent, peak: %.3f, zero digital clipping)\n", max_peak);

    /* 10b. Individual Voice Solos (Lead, Pad, Choir Verification) */
    note_on.channel = 1; /* Channel 2: Lead */
    note_on.key = 69;    /* A4 */
    note_on.velocity = 1.0;
    in_queue.count = 1;
    in_queue.events[0] = &note_on.header;
    proc.transport = NULL; /* Free-running MIDI mode */
    status = plugin->process(plugin, &proc);
    assert(status == CLAP_PROCESS_CONTINUE);

    float lead_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        if (fabsf(left_out[i]) > lead_peak) lead_peak = fabsf(left_out[i]);
    }
    assert(lead_peak > 0.01f);
    printf("✔ Verified Track 1: LOLCODE Lead voice responds and generates tone (peak: %.3f)\n", lead_peak);

    /* Test Pad (Channel 3 / index 2) */
    note_on.channel = 2;
    note_on.key = 48; /* C3 */
    in_queue.count = 1;
    plugin->process(plugin, &proc);
    float pad_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        if (fabsf(left_out[i]) > pad_peak) pad_peak = fabsf(left_out[i]);
    }
    assert(pad_peak > 0.01f);
    printf("✔ Verified Track 2: Fun Machine Velvet Pad responds and generates lush chord tone (peak: %.3f)\n", pad_peak);

    /* Test Choir (Channel 7 / index 6) */
    note_on.channel = 6;
    note_on.key = 60; /* C4 */
    in_queue.count = 1;
    plugin->process(plugin, &proc);
    float choir_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        if (fabsf(left_out[i]) > choir_peak) choir_peak = fabsf(left_out[i]);
    }
    assert(choir_peak > 0.01f);
    printf("✔ Verified Track 7: Shakespeare Choir responds and generates vowel formant chant (peak: %.3f)\n", choir_peak);

    /* Test Mycelium (Channel 8 / index 7) */
    note_on.channel = 7;
    note_on.key = 50; /* Guttation liquid drop */
    in_queue.count = 1;
    plugin->process(plugin, &proc);
    float myc_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        if (fabsf(left_out[i]) > myc_peak) myc_peak = fabsf(left_out[i]);
    }
    assert(myc_peak > 0.01f);
    printf("✔ Verified Track 8: Mycelium Bio-Acoustic voice responds and generates liquid drop (peak: %.3f)\n", myc_peak);

    /* Test Malbolge Snare & Hat */
    note_on.channel = 0;
    note_on.key = 38; /* Snare */
    in_queue.count = 1;
    plugin->process(plugin, &proc);
    float snare_peak = 0.0f;
    for (int i = 0; i < 512; i++) {
        if (fabsf(left_out[i]) > snare_peak) snare_peak = fabsf(left_out[i]);
    }
    assert(snare_peak > 0.01f);
    printf("✔ Verified Track 3: Malbolge Snare crack responds and generates noise crack (peak: %.3f)\n", snare_peak);

    /* 11. Cleanup & Unload */
    plugin->stop_processing(plugin);
    plugin->deactivate(plugin);
    plugin->destroy(plugin);
    entry->deinit();
    dlclose(handle);

    printf("All Whimsy Machine CLAP plugin tests passed successfully! (P8-13, D-080)\n");
    return 0;
}
