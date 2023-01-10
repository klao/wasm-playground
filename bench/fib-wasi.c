#include <stdio.h>

long long int fib(int n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

int main() {
    printf("%lld\n", fib(45));
    return 0;
}
