"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let $spans;

function setup() {
  console.log("ready");
  setInterval(update, 500);
  $spans = $('span');
  $spans.on("click", spanClicked);
}

function update() {
  $spans.each(updateSpan);
}

function updateSpan() {
  if (Math.random() < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked() {
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}
