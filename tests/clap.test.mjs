import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

test("Whimsy Machine CLAP instrument plugin compiles and passes headless DAW host verification (P8-13, D-080)", () => {
  assert.ok(existsSync("plugin-clap/include/whimsy_clap.h"), "whimsy_clap.h exists");
  assert.ok(existsSync("plugin-clap/src/whimsy_clap_entry.c"), "whimsy_clap_entry.c exists");
  assert.ok(existsSync("plugin-clap/src/whimsy_clap_plugin.c"), "whimsy_clap_plugin.c exists");
  assert.ok(existsSync("plugin-clap/src/whimsy_clap_params.c"), "whimsy_clap_params.c exists");
  assert.ok(existsSync("plugin-clap/src/whimsy_clap_state.c"), "whimsy_clap_state.c exists");
  assert.ok(existsSync("plugin-clap/src/whimsy_clap_ports.c"), "whimsy_clap_ports.c exists");
  assert.ok(existsSync("plugin-clap/Makefile"), "Makefile exists");
  assert.ok(existsSync("plugin-clap/test_clap.c"), "test_clap.c exists");

  // Compile and run the CLAP test suite
  const output = execFileSync("make", ["-C", "plugin-clap", "test"], { encoding: "utf8" });

  assert.match(output, /All Whimsy Machine CLAP plugin tests passed successfully!/);
  assert.match(output, /Successfully loaded shared object/);
  assert.match(output, /Found 'clap_entry' symbol/);
  assert.match(output, /Factory reports valid plugin descriptor/);
  assert.match(output, /Audio ports verified/);
  assert.match(output, /Note ports verified/);
  assert.match(output, /Parameter metadata, getters, text formatting, and parsing verified/);
  assert.match(output, /State serialization and deserialization round-trip verified/);
  assert.match(output, /Rendered 512 frames of Float32 stereo audio/);

  assert.ok(existsSync("plugin-clap/build/whimsy-machine.clap"), "whimsy-machine.clap binary exists");
});
