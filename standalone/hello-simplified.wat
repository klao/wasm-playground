(module
  (type $t0 (func (param i32 i32 i32 i32) (result i32)))
  (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (type $t0)))
  (memory (export "memory") 1)
  (data (i32.const 16) "Hello, World!\n")
  (func (export "_start")
    (i32.store (i32.const 0) (i32.const 16))
    (i32.store (i32.const 4) (i32.const 14))
    (call $fd_write (i32.const 1) (i32.const 0) (i32.const 1) (i32.const 32))
    drop
  )
)
