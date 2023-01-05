EXES = exe.O0 exe.O2 exe.AS

all: $(EXES)

fib.AS.o: fib.s
	$(AS) -o $@ $<

fib.O0.o: fib.c
	$(CC) -W -Wall -O0 -c -o $@ $<

fib.O2.o: fib.c
	$(CC) -W -Wall -O2 -c -o $@ $<

exe.%: main.c fib.%.o
	$(CC) -W -Wall -o $@ $^

clean:
	rm -f $(EXES) *.o

.PHONY: all clean
