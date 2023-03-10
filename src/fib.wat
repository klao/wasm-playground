(module
    (func $fib (export "fib") (param $i i32) (result i64) (local $a i64)
        (i32.le_s (local.get $i) (i32.const 1))
        (if (result i64)
            (then
                (i64.extend_i32_s (local.get $i))
            )
            (else
                (i32.sub (local.get $i) (i32.const 1))
                (call $fib)
                (local.set $a)
                (i32.sub (local.get $i) (i32.const 2))
                (call $fib)
                (i64.add (local.get $a))
            )
        )
    )
)

;; Results:
;; Hand WASM:
;; Chrome: 13.8s
;; Firefox: 8.5s
;; Clang -O3:
;; Chrome: 9.5s
;; Firefox: 6.3s
;; Further hand optimized:
;; Chrome: 8.9s
;; Firefox: 6.1s
;;
;; Hand assembly: 5.3s
;; C (gcc -O0): 9.3s
;; C (gcc -O2): 2.6s
;; Chrome JS: 17s
;; Firefox JS: 26s
;;
;; Clang -O2: 3.3s
;; Clang -O2 wasm-wasi / wasmtime: 7.6s
