#include <iostream>

int main() {
  std::cout << "Hello! What's your name?" << std::endl;
  std::string name;
  std::cin >> name;
  std::cout << "Welcome, " << name << "!" << std::endl;
}
