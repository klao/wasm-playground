"use strict";

const params = new URLSearchParams(window.location.search);
const pixelation = Number(params.get("pix")) || 1;
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

const imageData = ctx.createImageData(width, height);
const buf = imageData.data;
const moire = 16;
for (let i = 3, p = 0; i < buf.length; i += 4, ++p) {
    if (p == moire) {
        i += 4 * moire;
        p = 0;
    }
    buf[i] = 255;
}

let frames = 0;
let startTime = 0;

const fpsSpan = document.getElementById("fps");

function logFPS(frames, time) {
    const fps = frames / time * 1000;
    fpsSpan.textContent = fps.toFixed(1);
}

function draw(now) {
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
