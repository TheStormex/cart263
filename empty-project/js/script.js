"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
const BUZZ = new Audio('assets/sounds/buzz.mp3');
const CHEW = new Audio('assets/sounds/crunch.wav');

$(document).ready(setup);

function setup() {
  console.log("ready");
  $('#fly').draggable().
    mousedown(function() {
      BUZZ.play();
      BUZZ.loop = true;
  }).mouseup(function() {
      BUZZ.pause();
  });

  $('#mouth').droppable({
    drop: onDrop});
}


function onDrop() {
  console.log('drop');
  $('#fly').remove();
  setInterval(chew, 250);
}

function chew() {
  if ($('#mouth').attr("src") === "assets/images/mouth-closed.png") {
      $('#mouth').attr("src", "assets/images/mouth-open.png")
      CHEW.play();
  }
  else if ($('#mouth').attr("src") === "assets/images/mouth-open.png") {
      $('#mouth').attr("src", "assets/images/mouth-closed.png")
      CHEW.play();
  }
}
