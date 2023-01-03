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
