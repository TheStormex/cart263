"use strict";

/********************************************************************

Condiments
Che Tan

How to describe a sauce? Like this!

*********************************************************************/
$(document).ready(setup);

let vowels =
["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

// the JSON data file
let data;

// Load the JSON file
function setup() {
  $.getJSON("assets/data/data.json")
    .done(dataLoaded)
    .fail(dataError);
}

// Make a sentence and allow the user to click to make a new sentence
function dataLoaded(theData) {
  data = theData;
  $('body').on("click", makeSentence);
  makeSentence();
}

function makeSentence() {
  $('body').html("");
  let condiment = getRandomElement(data.condiments);
  let verb = "is";
  let a = "a";
  let a2 = "a";
  let a3 = "a";
  let cat = getRandomElement(data.cats);
  let room = getRandomElement(data.rooms);
  let game = getRandomElement(data.games);
  let nationality = getRandomElement(data.nationalities);
  let plantType = getRandomElement(data.plants);
  let genre = getRandomElement(data.genres);
  let plant = plantType.name;
  if (condiment.charAt(condiment.length-1) === "s") {
    verb = "are";
  }
  for (var i = 0; i < vowels.length; i++) {
    if (cat.charAt(0) === vowels[i]) {
      a = "an";
    }
    if (room.charAt(0) === vowels[i]) {
      a2 = "an";
    }
    if (nationality.charAt(0) === vowels[i]) {
      a3 = "an";
    }
  }
   let description = condiment + " " + verb + " like " + a + " " + cat + " in " + a2 + " " + room
   + " playing " + game + " with " + a3 + " " + nationality + " " + plant + " dancing to " + genre + ".";
   $('body').append(description)
}

function dataError(request, text, error) {
  console.error(error);
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];

  return element;
}
