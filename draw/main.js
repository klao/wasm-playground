"use strict";

const params = new URLSearchParams(window.location.search);
// TODO: select pixelation based on screen size
const pixelation = Number(params.get("pix")) || 2;
console.log("pixelation", pixelation);


const canvas = document.getElementById("canvas");
// TODO: experiment with anti-aliasing etc.
// So far we have:
//   antialias: definitely helps
//   depth: doesn't seem to matter
//   alpha: turning it off, but then drawing transparent pixels, makes it much worse (and weird)
const ctx = canvas.getContext("2d", {
    // alpha: false,
    antialias: false,
    // depth: false,
});

const rect = document.body.getBoundingClientRect();
console.log(rect);
console.log(window.devicePixelRatio);
const ourDPR = window.devicePixelRatio / pixelation;
// Size that definitely fits and is a multiple of 16.
// TODO: do we need the -0.5?
const width = (((rect.width - 0.0) * ourDPR) | 0) & ~0xf;
const height = (((rect.height - 0.0) * ourDPR) | 0) & ~0xf;
const cssWidth = width / ourDPR;
const cssHeight = height / ourDPR;

document.getElementById("dpr").textContent = window.devicePixelRatio;
document.getElementById("size").textContent = `${width}x${height}`;

console.log(width, height);
canvas.width = width;
canvas.height = height;
canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";

setTimeout(() => {
    console.log(document.getElementById("canvas").getBoundingClientRect());
}, 1000);

////////////////////////////////////////////

const pageSize = 1 << 16;
const memSize = Math.ceil(width * height * 4 / pageSize);
const mem = new WebAssembly.Memory({ initial: memSize, maximum: 512, shared: true });
const memArray = new Uint8ClampedArray(mem.buffer, 0, width * height * 4);

// We will not use the ArrayBuffer of this ImageData data directly, but always copy from the
// shared one.
const imageData = ctx.createImageData(width, height);

// Unfortunately, this requires quite a hassle to set up:
// Passing SharedArrayBuffer to a worker is only allowed if some security headers are set
// on the server. There is a workaround:
// https://stefnotch.github.io/web/COOP%20and%20COEP%20Service%20Worker/
// Additional reading:
// https://web.dev/coop-coep/
// https://github.com/community/community/discussions/13309
//
// For 'live server' in VS Code see:
// https://github.com/ritwickdey/vscode-live-server/issues/657
const worker = new Worker("worker.js");
worker.postMessage({ mem, width, height });

////////////////////////////////////////////

let frames = 0;
let startTime = 0;

const fpsSpan = document.getElementById("fps");

function logFPS(frames, time) {
    const fps = frames / time * 1000;
    fpsSpan.textContent = fps.toFixed(1);
}

function draw(now) {
    imageData.data.set(memArray);
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);
    frames++;
    if (now - startTime > 1000) {
        logFPS(frames, now - startTime);
        frames = 0;
        startTime = now;
    }
}

requestAnimationFrame(draw);
