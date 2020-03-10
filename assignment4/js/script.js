"use strict";

/********************************************************************

Condiments
Che Tan

How to describe a sauce? Like this!

*********************************************************************/
$(document).ready(setup);

function setup() {
  $.getJSON("assets/data/data.json")
    .done(dataLoaded)
    .fail(dataError);
}

function dataLoaded(data) {
  console.log(data);
  let condiment = getRandomElement(data.condiments);
  let verb = "is";
  let cat = getRandomElement(data.cats);
  let room = getRandomElement(data.rooms);
  if (condiment.charAt(condiment.length-1) === "s") {
    verb = "are";
  }
  let description = condiment + " " + verb + " like a" + cat + " in a " + room;
  $('body').append(description);
}

function dataError(request, text, error) {
  console.error(error);
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];

  return element;
}
