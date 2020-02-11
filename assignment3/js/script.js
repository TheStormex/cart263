"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
let correctAnimal;
let answers = [];
let score = 0;
const NUM_OPTIONS = 5;
// annyang
let speechRepeat;
let speechSurrender;
let speechGuess;

$(document).ready(setup);

function setup() {
  $('body').append(`<p id="theScore"> Score: ${score} </p>`)
  speechRepeat = {"Say it again": repeat};
  speechSurrender = {"I give up": surrender};
  speechGuess = {"The answer is *animal": guess};
  annyang.addCommands(speechRepeat);
  annyang.addCommands(speechSurrender);
  annyang.addCommands(speechGuess);
  annyang.start({autoRestart: false});
  newRound();
}

function addButton(label) {
  let $div = $(`<div class='guess'>${label}</div>`);
  $div.button();
  $('body').append($div);
  $div.on(`click`, handleGuess);
}

function newRound() {
  answers = [];
  $(`div`).remove();
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let theAnswer = animals[Math.floor(Math.random() * animals.length)];
    addButton(theAnswer);
    answers.push(theAnswer);
  }
    correctAnimal = answers[Math.floor(Math.random() * answers.length)];
    sayBackward(correctAnimal);
}

function handleGuess() {
  let name = $(this).text();
  if (name === correctAnimal) {
    correct();
  } else {
    incorrect();
  }
}

function sayBackward(text) {
  let backwardText = text.split('').reverse().join('');
  let options = {
    rate: Math.random(),
    pitch: Math.random()
  }
  responsiveVoice.speak(backwardText, "UK English Male", options);
}

function correct() {
  $(`.guess`).remove();
  setTimeout(newRound, 1000);
  score += 1;
  $(`#theScore`).text(`Score: ${score}`);
}

function incorrect() {
  $(this).effect(`shake`);
  $(this).remove();
  sayBackward(correctAnimal);
  score = 0;
  $(`#theScore`).text(`Score: ${score}`);
}

function repeat() {
  responsiveVoice.speak("Listen closely now!", "UK English Male");
  sayBackward(correctAnimal);
}

function surrender() {
  score = 0;
  $(`#theScore`).text(`Score: ${score}`);
  responsiveVoice.speak("Try harder you donkey!", "UK English Male");
  newRound();
}

function guess(animal) {
  if (animal === correctAnimal) {
    correct();
  } else {
    incorrect();
  }
}
