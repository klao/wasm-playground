"use strict";

async function main(mem, width, height) {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("draw.wasm"), {
        env: {
            memory: mem,
        },
    });
    const { draw } = instance.exports;
    draw(width, height);
}

self.addEventListener("message", (e) => {
    const { mem, width, height } = e.data;
    main(mem, width, height);
});
