all: public/test1.wasm public/fib.wasm

# TODO: actually test this in the browser
public/%.wasm: src/%.c
	clang -O3 --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -o $@ $<
	chmod a-x $@

public/%.wasm: src/%.cc
	em++ -W -Wall -O2 $< -o $@ -s STANDALONE_WASM -s SIDE_MODULE=1 --no-entry
	chmod a-x $@

public/%.wasm: src/%.wat
	wat2wasm $< -o $@

draw/%.wasm: src/%.wat
	wat2wasm --enable-threads $< -o $@

clean:
	rm -f public/*.wasm

.PHONY: all clean
