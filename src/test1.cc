#include <iostream>

extern "C" {

int add(int a, int b) {
  return a + b;
}

long long fib(int i) {
  if (i <= 1) return i;
  return fib(i-1) + fib(i-2);
}

}

// int main() {
//     std::cout << "fib(10) = " << fib(10) << std::endl;
// }
