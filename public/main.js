"use strict";

// The `test.wasm` file was created with https://mbebenita.github.io/WasmExplorer/
// Options: -O2
// The C++ code is:

/*
extern "C" {
  int add(int, int);
  long long fib(int);
}

int add(int a, int b) {
  return a + b;
}

long long fib(int i) {
  if (i <= 1) return 1;
  return fib(i-1) + fib(i-2);
}
*/

async function main() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./test.wasm"));
    console.log(instance);
    const result = instance.exports.fib(5);
    console.log(result);
}

main();
