(module
    (func $multi (export "multi") (param $x i32) (result i32 i32)
        local.get $x
        local.get $x
    )
    (func $dub (export "dub") (param $x i32) (result i32)
        local.get $x
        call $multi
        i32.add
    )
)
