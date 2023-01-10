WASI_LIBC = ../../wasi-libc/sysroot

CFLAGS = -W -Wall -Os -s
CC = clang

TARGETS = hello hello.wasm hello-simplified.wasm hello-overoptimized.wasm

all: $(TARGETS)

%.wasm: %.c
	$(CC) $(CFLAGS) --target=wasm32-unknown-wasi --sysroot=$(WASI_LIBC) -o $@ $<

%.wasm: %.wat
	wat2wasm $< -o $@

clean:
	rm -f $(TARGETS)

.PHONY: all clean
