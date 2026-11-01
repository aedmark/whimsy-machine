#include "whimsy_clap.h"

/* Forward declaration of plugin constructor */
const clap_plugin_t *whimsy_clap_create(const clap_host_t *host);

/* ---------------------------------------------------------------------------
 * Plugin Descriptor
 * --------------------------------------------------------------------------- */
static const char *const CLAP_FEATURES[] = {
    CLAP_PLUGIN_FEATURE_INSTRUMENT,
    CLAP_PLUGIN_FEATURE_SYNTHESIZER,
    CLAP_PLUGIN_FEATURE_STEREO,
    NULL
};

const clap_plugin_descriptor_t whimsy_clap_descriptor = {
    .clap_version = CLAP_VERSION,
    .id = WHIMSY_CLAP_ID,
    .name = WHIMSY_CLAP_NAME,
    .vendor = WHIMSY_CLAP_VENDOR,
    .url = WHIMSY_CLAP_URL,
    .manual_url = "https://whimsy.machine/manual.html",
    .support_url = "https://whimsy.machine",
    .version = WHIMSY_CLAP_VERSION,
    .description = WHIMSY_CLAP_DESCRIPTION,
    .features = CLAP_FEATURES
};

/* ---------------------------------------------------------------------------
 * Plugin Factory Implementation
 * --------------------------------------------------------------------------- */
static uint32_t whimsy_factory_get_plugin_count(const struct clap_plugin_factory *factory) {
    (void)factory;
    return 1;
}

static const clap_plugin_descriptor_t *whimsy_factory_get_plugin_descriptor(
    const struct clap_plugin_factory *factory,
    uint32_t index)
{
    (void)factory;
    return (index == 0) ? &whimsy_clap_descriptor : NULL;
}

static const clap_plugin_t *whimsy_factory_create_plugin(
    const struct clap_plugin_factory *factory,
    const clap_host_t *host,
    const char *plugin_id)
{
    (void)factory;
    if (!plugin_id || strcmp(plugin_id, WHIMSY_CLAP_ID) != 0) {
        return NULL;
    }
    return whimsy_clap_create(host);
}

const clap_plugin_factory_t whimsy_clap_factory = {
    .get_plugin_count = whimsy_factory_get_plugin_count,
    .get_plugin_descriptor = whimsy_factory_get_plugin_descriptor,
    .create_plugin = whimsy_factory_create_plugin
};

/* ---------------------------------------------------------------------------
 * DSO Entry Point (clap_entry)
 * --------------------------------------------------------------------------- */
static int g_init_counter = 0;

static bool whimsy_entry_init(const char *plugin_path) {
    (void)plugin_path;
    g_init_counter++;
    return true;
}

static void whimsy_entry_deinit(void) {
    if (g_init_counter > 0) {
        g_init_counter--;
    }
}

static const void *whimsy_entry_get_factory(const char *factory_id) {
    if (!factory_id) return NULL;
    if (strcmp(factory_id, CLAP_PLUGIN_FACTORY_ID) == 0) {
        return &whimsy_clap_factory;
    }
    return NULL;
}

CLAP_EXPORT const clap_plugin_entry_t clap_entry = {
    .clap_version = CLAP_VERSION,
    .init = whimsy_entry_init,
    .deinit = whimsy_entry_deinit,
    .get_factory = whimsy_entry_get_factory
};
