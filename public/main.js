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

function fib(n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

function fiba(n) {
    n = n|0;
    if (n <= 1) {
        return n;
    }
    const a = fiba(n-1)|0;
    const b = fiba(n-2)|0;
    const c = (a + b)|0;
    return c;
}

async function main2() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./fib.wasm"));
    console.log(instance);

    /*
    console.time("fib40");
    console.log(instance.exports.fib(40));
    console.timeEnd("fib40");

    console.time("fib45");
    console.log(instance.exports.fib(45));
    console.timeEnd("fib45");
    */

    console.time("fib40");
    console.log(fiba(40));
    console.timeEnd("fib40");

    console.time("fib45");
    console.log(fiba(45));
    console.timeEnd("fib45");
}

main();
main2();
