"use strict";

async function main() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./test1.wasm"));
    console.log(instance);
    const result = instance.exports.fib(10);
    console.log(result);
}

main();
