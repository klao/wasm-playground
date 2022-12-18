"use strict";

async function main() {
    const memory = new WebAssembly.Memory({ initial: 1 });
    const importObject = {
        env: {
            memory,
        },
    };
    const array = new Uint32Array(memory.buffer);
    for (let i = 0; i < 30; i++) {
        array[i] = i;
    }

    const { instance } = await WebAssembly.instantiateStreaming(fetch("./test1.wasm"), importObject);
    console.log(instance);
    instance.exports.reverse(0, 10);
    console.log(array.slice(0, 32));
}

main();
