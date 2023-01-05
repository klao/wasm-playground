(module
    (func (export "guess") (param $n i32) (result i32)
        i32.const 42
        local.get $n
        i32.eq
        (if (then (return (i32.const 42))))

        (i32.lt_s (i32.const 47) (local.get $n))
        (i32.lt_s (local.get $n) (i32.const 47))
        i32.sub
    )
)
