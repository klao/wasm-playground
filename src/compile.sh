#!/bin/bash

set -euo pipefail

em++ -W -Wall -O2 test1.cc -o ../public/test1.wasm -s STANDALONE_WASM -s EXPORTED_FUNCTIONS='["_add","_fib"]' --no-entry
chmod a-x ../public/test1.wasm
