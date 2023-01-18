(module
  (type $t0 (func (param i32 i32 i32 i32) (result i32)))
  (import "wasi_unstable" "fd_write" (func $fd_write (type $t0)))
  (memory (export "memory") 1)
  (data (i32.const 2) "Hello, World!\n\02\00\00\00\0e")
  (func (export "_start")
    (call $fd_write (i32.const 1) (i32.const 16) (i32.const 1) (i32.const 32))
    drop
  )
)
