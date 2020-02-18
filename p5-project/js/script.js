"use strict";

/*****************

Music box
Che Tan

Play a randomly generated song

******************/

const FREQUENCIES = [
  440.00,
  493.88,
  554.37,
  587.33,
  659.25,
  739.99,
  830.61
];

let pattern = [
  'x',
  '*',
  '*',
  'o',
  'x',
  '*',
  'o',
  'o',
  'x',
  '*',
  'o',
  '*',
  'x',
  'o',
  '*',
  'o'
];

let beat = 0;

let kick = new Pizzicato.Sound({
  source: 'file',
  options: {path: './assets/sounds/kick.wav'}
});
let hihat = new Pizzicato.Sound({
  source: 'file',
  options: {path: './assets/sounds/hihat.wav'}
});
let snare = new Pizzicato.Sound({
  source: 'file',
  options: {path: './assets/sounds/snare.wav'}
});
let synth = new Pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'sine',
    frequency: FREQUENCIES[0]
  }
})
function setup() {}
function draw() {}
function playNote() {
  synth.frequency = FREQUENCIES[Math.floor(Math.random() * FREQUENCIES.length)];
  synth.play();
}
function mousePressed() {
  setInterval(playNote, 500);
  setInterval(playDrum, 125);
}

function playDrum() {
  let symbols = pattern[beat];
  if (symbols.includes('x')) {
    kick.play();
  }
  if (symbols.includes('*')) {
    hihat.play();
  }
  if (symbols.includes('o')) {
    snare.play();
  }
  if (beat >= pattern.length-1) {
    beat = 0;
  } else {
    beat++;
  }
}
