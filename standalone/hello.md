# How big is hello-world in WASM?

Question, asked by Pts (thanks Pts!): How large (or rather, small!) would be a wasm-wasi program
that prints the standard "Hello, World!" message.

## Start from C

See the [hello.c](./hello.c) program. It uses only the `write` syscall, to avoid all possible cruft.

Unfortunately we've ran into some problems compiling it with `-O2` (actually anything other than
`-O0`) flag with emscipten.  TODO(klao): investigate why. So, we learned how to do it with bare
`clang`. For that we had to grab a WASI + libc from here: https://github.com/WebAssembly/wasi-libc

WASI Libc is a rare gem, btw. You just `make` it. That's it.

Result: 235 bytes
Btw, the linux ELF binary is 14576 bytes. Yes, that's not optimal.

## Understand and simplify

Then we looked at that resulting binary, tried to understand and simplify it. Remove everything
that's unnecessary.

The important part was to understand how the `wasi_snapshot_preview1.fd_write` function works.
It has 4 i32 parameters and they are not what we expected. Briefly, it's more like the `writev`
syscall and not like `write`:

```wat
(func $fd_write
    (param $fd i32) (param $iovec i32) (param $iovcnt i32) (param $writtenptr i32)
    (result (;errno;) i32))
```

The result is in [hello-simplified.wat](./hello-simplified.wat), size: 142 bytes

## Overoptimizing

We don't need to use const/store instructions to store in memory where our string is located
and how long it is. We can bake it in as part of the `data`.

Result: [hello-overoptimized.wat](hello-overoptimized.wat), size: 133 bytes
