all: public/test1.wasm public/add.wasm

# TODO: actually test this in the browser
public/%.wasm: src/%.c
	clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -o $@ $<

public/%.wasm: src/%.cc
	em++ -W -Wall -O2 $< -o $@ -s STANDALONE_WASM -s SIDE_MODULE=1 --no-entry
	chmod a-x $@

public/%.wasm: src/%.wat
	wat2wasm $< -o $@

clean:
	rm -f public/*.wasm

.PHONY: all clean
