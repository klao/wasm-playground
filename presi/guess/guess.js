"use strict";

let guessFunction;

async function init() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./guess.wasm"));
    console.log(instance);
    guessFunction = instance.exports.guess;
}

init();

function log(...args) {
    const log = document.getElementById("convo");
    const p = document.createElement("p");
    p.textContent = args.join(" ");
    log.appendChild(p);
    console.log(...args);
}

document.getElementById("guessForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const guess = document.getElementById("guess").value;
    log("Your guess:", guess);
    const result = guessFunction(guess);
    log("Its response:", result);
    window.scrollTo(0, document.body.scrollHeight);
});
