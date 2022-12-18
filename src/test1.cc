#include <emscripten.h>

extern "C" {

int EMSCRIPTEN_KEEPALIVE add(int a, int b) {
  return a + b;
}

long long EMSCRIPTEN_KEEPALIVE fib(int i) {
  if (i <= 1) return i;
  return fib(i-1) + fib(i-2);
}

}
