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

async function main2() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./fib.wasm"));
    console.log(instance);

    console.time("fib40");
    console.log(instance.exports.fib(40));
    console.timeEnd("fib40");

    console.time("fib45");
    console.log(instance.exports.fib(45));
    console.timeEnd("fib45");
}

main();
main2();
