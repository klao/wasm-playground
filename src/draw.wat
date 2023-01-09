(module
    (import "env" "memory" (memory 1 512 shared))
    (global $width (mut i32) (i32.const 0))
    (global $height (mut i32) (i32.const 0))
    (global $center (mut i32) (i32.const 0))
    (func (export "draw") (param $width i32) (param $height i32)
        (local $i i32)
        (global.set $width (local.get $width))
        (global.set $height (local.get $height))
        (global.set $center (i32.mul (i32.const 2)
            (i32.mul (local.get $width) (i32.add (local.get $height) (i32.const 1)))))
        ;; Clear the screen
        (local.set $i (i32.mul (i32.const 4) (i32.mul (local.get $width) (local.get $height))))
        (block $clear
            (loop
                (br_if $clear (i32.le_s (local.get $i) (i32.const 0)))
                (local.set $i (i32.sub (local.get $i) (i32.const 4)))
                (i32.store (local.get $i) (i32.const 0xffffffff))
                (br 0)
            )
        )
        ;; Draw circles
        (local.set $i (i32.sub (i32.div_s
            (if (result i32)
                (i32.lt_s (local.get $width) (local.get $height))
                (local.get $width)
                (local.get $height)
            )
            (i32.const 2)) (i32.const 2)))
        (i32.store (global.get $center) (i32.const 0xff000000))
        (block $circles
            (loop
                (br_if $circles (i32.le_s (local.get $i) (i32.const 1)))
                (call $draw_circle (local.get $i))
                (local.set $i (i32.sub (local.get $i) (i32.const 1)))
                (br 0)
            )
        )
    )

    (func $stall (param $n i32)
        (loop
            (br_if 0 (i32.ge_s (local.tee $n (i32.sub (local.get $n) (i32.const 1))) (i32.const 0)))
        )
    )

    (func $draw_circle (param $r i32)
        (local $x i32) (local $y i32)
        (local.set $x (i32.div_s (i32.mul (local.get $r) (i32.const 707)) (i32.const 1000)))
        (loop
            (local.set $y (i32.trunc_f64_s (f64.sqrt (f64.sub
                (f64.convert_i32_s (i32.mul (local.get $r) (local.get $r)))
                (f64.convert_i32_s (i32.mul (local.get $x) (local.get $x)))
            ))))
            (call $draw_pixel (local.get $x) (local.get $y))
            (call $draw_pixel (i32.sub (i32.const 0) (local.get $x)) (local.get $y))
            (call $draw_pixel (i32.sub (i32.const 0) (local.get $x)) (i32.sub (i32.const 0) (local.get $y)))
            (call $draw_pixel (local.get $x) (i32.sub (i32.const 0) (local.get $y)))
            (call $draw_pixel (local.get $y) (local.get $x))
            (call $draw_pixel (i32.sub (i32.const 0) (local.get $y)) (local.get $x))
            (call $draw_pixel (i32.sub (i32.const 0) (local.get $y)) (i32.sub (i32.const 0) (local.get $x)))
            (call $draw_pixel (local.get $y) (i32.sub (i32.const 0) (local.get $x)))
            (br_if 0 (i32.ge_s (local.tee $x (i32.sub (local.get $x) (i32.const 1))) (i32.const 0)))
        )
    )

    (func $draw_pixel (param $x i32) (param $y i32)
        (i32.store (i32.add (global.get $center)
            (i32.mul (i32.const 4) (i32.add
                (i32.mul (local.get $x) (global.get $width))
                (local.get $y)
            ))
        ) (i32.const 0xff775522))
        (call $stall (i32.const 20000))
    )
)
