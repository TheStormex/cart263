"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A place to store the jQuery selection of all spans
let $spans;

// How many redactable spans
let redactables;

// Store the secret spans
let $secretSpans;

// Secrets found and total
let secretsFound = 0;
let secretsTotal = 0;

// Variable for the reveal interval
let revealTimer

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all redacted spans (since we do stuff to them multiple times)
  $spans = $('.redacted');
  // Remember how many redactable spans we have
  redactables = $('.redacted').length;
  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click', spanClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  revealTimer = setInterval(update, UPDATE_FREQUENCY);
  // Set secret spans variable
  $secretSpans = $('.secret');
  // Update the secrets found if mouseovered
  $secretSpans.on('mouseover', secretReveal);
  // Show the amount of secrets found and total
  $('#found').text(`${secretsFound}`);
  // Find out how many secrets total
  secretsTotal = $('.secret').length;
  // Show the total amount of secrets
  $('#total').text(`${secretsTotal}`);
};

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// With random chance it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
    // If all are revealed, lose the game
    if ($('.revealed').length === redactables) {
      clearInterval(revealTimer);
      $spans.off('click');
      $secretSpans.off('mouseover');
      $('body').append('<p id="ending"> You let everything leak! You lose! </p>')
    }
  }
}

// secretReveal
//
// When mouseover, secret is revealed
function secretReveal() {
//  if ($(this).css('color') === 'black') {
    $(this).css('color', 'orange');
    secretsFound++;
    $('#found').text(`${secretsFound}`);
    $(this).off('mouseover');
//  }
  if (secretsFound === secretsTotal) {
    $('body').append('<p id="ending"> You found all the secrets! </p>')
  }
}
