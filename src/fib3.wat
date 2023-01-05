;; Based on clang optimized output
(module
  (func $fib (param i32) (result i64)
    (local i64)
    local.get 0
    i32.const 1
    i32.gt_s
    if  ;; label = @1
      loop  ;; label = @2
        local.get 0
        i32.const 1
        i32.sub
        call $fib
        local.get 1
        i64.add
        local.set 1
        local.get 0
        i32.const 2
        i32.sub
        local.tee 0
        i32.const 2
        i32.ge_u
        br_if 0 (;@2;)
      end
    end
    local.get 1
    local.get 0
    i64.extend_i32_s
    i64.add)
  (export "fib" (func $fib))
)
