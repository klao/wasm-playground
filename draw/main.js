"use strict";


const canvas = document.getElementById("canvas");
// TODO: experiment with anti-aliasing etc.
const ctx = canvas.getContext("2d");

const rect = document.body.getBoundingClientRect();
console.log(rect);
// TODO: devicePixelRatio
// Size that definitely fits and is a multiple of 16.
const width = (rect.width - 1 | 0) & ~0xf;
const height = (rect.height - 1 | 0) & ~0xf;

// const width = 640;
// const height = 480;

console.log(width, height);
canvas.width = width;
canvas.height = height;
ctx.width = width;
ctx.height = height;

const imageData = ctx.createImageData(width, height);
const buf = imageData.data;
for (let i = 3; i < buf.length; i += 4) {
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
