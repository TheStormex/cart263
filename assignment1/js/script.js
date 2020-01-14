"use strict";

/********************************************************************

Assignment 1 - Pixel Painter
Che Tan

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

window.onload = setup;
let rotation = 0;
let currentKey = "";

function setup() {
  console.log("Document Loaded");
  for (var i = 0; i < 1000; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute("class", "pixel");
    pixel.addEventListener("mouseover", paint);
    pixel.addEventListener("mouseover", addText);
    pixel.addEventListener("click", remove);
    document.body.appendChild(pixel);
  }
  document.addEventListener('keydown', rotate);
  document.addEventListener('keydown', typed);
}

function paint(e) {
  let pixel = e.target;
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  setTimeout(resetPixel, 1000, pixel);
}

function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}

function remove(e) {
  let pixel = e.target;
  pixel.style.opacity = 0;
}

function rotate(e) {
  if (e.keyCode === 39) {
    rotation += 1;
  }
  if (e.keyCode === 37) {
    rotation -= 1;
  }
  let allPixels = document.getElementsByClassName('pixel');
  for (var i = 0; i < allPixels.length; i++) {
    allPixels[i].style.transform = `rotate(${rotation}deg)`
  }
}

function typed(e) {
  currentKey = String.fromCharCode(e.keyCode);
}

function addText(e) {
  let pixel = e.target;
  pixel.style.textAlign = `center`;
  pixel.style.lineHeight = `30px`;
  pixel.innerHTML = currentKey;
}
