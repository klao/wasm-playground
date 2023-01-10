WASI_LIBC = ../../wasi-libc/sysroot

CFLAGS = -W -Wall

EXES = exe.O0 exe.O2 exe.AS fib-wasi fib-wasi.wasm

all: $(EXES)

%: %.c
	clang $(CFLAGS) -O2 -o $@ $<

%.wasm: %.c
	clang $(CFLAGS) -O2 --target=wasm32-unknown-wasi --sysroot=$(WASI_LIBC) -o $@ $<

fib.AS.o: fib.s
	$(AS) -o $@ $<

fib.O0.o: fib.c
	$(CC) $(CFLAGS) -O0 -c -o $@ $<

fib.O2.o: fib.c
	$(CC) $(CFLAGS) -O2 -c -o $@ $<

exe.%: main.c fib.%.o
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -f $(EXES) *.o

.PHONY: all clean
