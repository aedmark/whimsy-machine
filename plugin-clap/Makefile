CC ?= gcc
CFLAGS ?= -std=c11 -O3 -Wall -Wextra -fPIC -Iinclude -I../firmware-c
LDFLAGS ?= -shared -lm

SOURCES = src/whimsy_clap_entry.c \
          src/whimsy_clap_plugin.c \
          src/whimsy_clap_params.c \
          src/whimsy_clap_state.c \
          src/whimsy_clap_ports.c \
          ../firmware-c/whimsy_esoteric.c \
          ../firmware-c/whimsy_fm1_synth.c

TARGET = build/whimsy-machine.clap
TEST_BIN = build/test_clap

all: $(TARGET)

$(TARGET): $(SOURCES)
	@mkdir -p build
	$(CC) $(CFLAGS) $(SOURCES) $(LDFLAGS) -o $(TARGET)

test: $(TARGET)
	@mkdir -p build
	$(CC) -std=c11 -O2 -Wall -Wextra -Iinclude -I../firmware-c test_clap.c -ldl -lm -o $(TEST_BIN)
	./$(TEST_BIN)

clean:
	rm -rf build

install: $(TARGET)
	@mkdir -p $(HOME)/.clap
	cp $(TARGET) $(HOME)/.clap/
	@echo "Installed $(TARGET) to $(HOME)/.clap/"

.PHONY: all test clean install
