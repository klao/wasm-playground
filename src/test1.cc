#include <emscripten.h>

extern "C" {

void EMSCRIPTEN_KEEPALIVE reverse(int *array, int size) {
  for (int i = 0; i < size / 2; i++) {
    int temp = array[i];
    array[i] = array[size - i - 1];
    array[size - i - 1] = temp;
  }
}

}
