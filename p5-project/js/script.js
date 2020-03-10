"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

let jokes; // A place to store the jokes

function preload() {
  // Load the jokes by accessing the API endpoint
  // Jokes will contain an OBJECT with ten jokes in it
  jokes = loadJSON("https://official-joke-api.appspot.com/jokes/programming/ten");
}

function setup() {}

function mousePressed() {
  // Tell a joke when they click
  tellJoke();
}

function tellJoke() {
  // Get an array with the name of each property in the jokes object
  let keys = Object.keys(jokes);
  // Choose a random property name (they're actually just numbers, yet it's not an array)
  let randomKey = random(keys);
  // Get the joke with that property name
  let joke = jokes[randomKey];
  // Get the setup part
  let jokeSetup = joke.setup;
  // And the punchline part
  let jokePunchline = joke.punchline;
  // Display the setup
  console.log(jokeSetup);
  // After a delay of two seconds...
  setTimeout(function() {
    // ... display the punchline
    console.log(jokePunchline);
  }, 2000);
}
