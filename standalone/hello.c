#include <unistd.h>

char hello[] = "Hello, world!\n";

int main() {
    write(1, hello, sizeof(hello) - 1);
    return 0;
}
