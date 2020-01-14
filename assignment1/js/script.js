"use strict";

/********************************************************************

Assignment 1 - Pixel Painter
Che Tan

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

window.onload = setup;

function setup() {
  console.log("Document Loaded");
  for (var i = 0; i < 1000; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute("class", "pixel");
    pixel.addEventListener("mouseover", paint);
    document.body.appendChild(pixel);
  }
}

function paint(e) {
  let pixel = e.target;
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  pixel.style.backgroundColor = rgb(r, g, b);
  setTimeout(resetPixel, 1000, pixel);
}

function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}
