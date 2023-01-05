#include <emscripten.h>

extern "C" {

long long int EMSCRIPTEN_KEEPALIVE fib(int n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

}
