"use strict";

/********************************************************************

Child-Friendly Videos Simulator 2020
Che Tan

What is it like for a child to carelessly browse through the seemingly innocent
videos marketed towards them? How is their mind influenced and altered by these
online entertinament? Let's find out!

*********************************************************************/

// Sounds:
const AUDIO_STATIC = new Audio("assets/sounds/static.wav");
const AUDIO_CRY = new Audio("assets/sounds/cry.wav");
const AUDIO_BOOTUP = new Audio("assets/sounds/bootup.wav");

const AUDIO_SONG = 0;
// array
const GOOD_WORDS = [
`Friends `,
`Love `,
`Happy `,
`Kind `,
`Cartoon `,
`Lesson `,
`Nursery `,
`Song `,
`Dancing `,
`Birthday `,
`Cute `,
`Kittens `,
`Puppies `,
`Birds `,
`Spelling `,
`Counting `,
`Singing `,
`Magical `,
`Learning `,
`Playing `
]

const BAD_WORDS = [
`Hate `,
`Death `,
`Suicide `,
`Torture `,
`Kill `,
`War `,
`Genocide `,
`Pain `,
`Decapitation `,
`Gore `,
`Sexual `,
`Brutal `,
`Fatality `,
`Inflation `,
`Blood `,
`Screaming `,
`Violent `,
`Disembowel `,
`Execution `,
`Crucifixion `
]

let goodImages = [
'happy',
'friend',
'heart',
'book',
'school',
'vegetable',
'fruit',
'teddy',
'parents',
'music'
];

let badImages = [
'gun',
'blood',
'bully',
'knife',
'cry',
'monster',
'dead',
'noose',
'anger',
'sick'
]

let usedGoodWords = [];
let usedBadWords = [];
let videoNumber = 0;
let emptyAreas = [];
let goodAreas = [];
let currentVideos = [];
let videoName = [];
let area1Number = 0;
let area2Number = 0;
let badImageNumber = 0;

// Timers

let timerAutoplay;
let autoplayTimerText = 5;

$(document).ready(setup);

function setup() {
  console.log("ready");
  nextVideos('good');
  timerAutoplay = setInterval(timerAutoplayCountdown, 1000)
  autoplayTimerText = 5;
}

function timerAutoplayCountdown() {
  autoplayTimerText -= 1;
  $(`#autoplayCount`).html(autoplayTimerText);
  if (autoplayTimerText <= 0) {
    autoplayTimerText = 5;
    playVideo('0');
  }
}

function playVideo(id) {
  let videoId = id;
  clearInterval(timerAutoplay);
  timerAutoplay = setInterval(timerAutoplayCountdown, 1000)
  autoplayTimerText = 5;
  $(`#autoplayCount`).html(autoplayTimerText);
  videoNumber += 1;
  let thisImage;
  let thisImageIndex;
  if (currentVideos[videoId].effect === 'good') {
    // choose a random not used one from the good list
    thisImageIndex = Math.floor(Math.random() * goodImages.length);
    thisImage = goodImages[thisImageIndex];
    goodImages.splice(thisImageIndex, 1);
  } else {
    // choose a random not used one from the bad list
    thisImageIndex = Math.floor(Math.random() * badImages.length);
    thisImage = badImages[thisImageIndex];
    badImages.splice(thisImageIndex, 1);
  }
  if (area1Number < 4) {
    $(`#area1`).append(`<div id="image${area1Number}"> <img src="assets/images/${thisImage}.png" alt="${thisImage}"> </div>`);
    area1Number += 1;
  } else
  if (area1Number >= 4 && area2Number < 4) {
    $(`#area2`).append(`<div id="image${area1Number+area2Number}"> <img src="assets/images/${thisImage}.png" alt="${thisImage}"> </div>`);
    area2Number += 1;
  } else {
    // remove the first good one in the list of images currently on screen, replace it with a bad image
    if (badImageNumber < 8) {
      $(`#image${badImageNumber}`).html(`<img src="assets/images/${thisImage}.png" alt="${thisImage}">`);
      badImageNumber++;
    }
    console.log('done');
  }
  let type;
  if (videoNumber < 4) {
    type = 'good'
  }
  else if (videoNumber < 8) {
    type = 'mixed'
  } else {
    type = 'bad'
  }
  nextVideos(type);
}

function nextVideos(type) {
  $(`.videoChoice`).remove();
  currentVideos = [];
  let goodBadChance;
  switch (type) {
    case 'good':
      goodBadChance = 1;
      break;
    case 'mixed':
      goodBadChance = 0.8;
      break;
    case 'bad':
      goodBadChance = 0;
      break;
    default: console.log('error');
  }
  for (var i = 0; i < 3; i++) {
    videoName = [];
    let videoEffect;
    for (var i2 = 0; i2 < 4; i2++) {
      let number = Math.floor(Math.random() * 20);
      let word;
      // videos are good by default
      videoEffect = 'good';
      if (Math.random() < goodBadChance) {
        word = GOOD_WORDS[number];
      } else {
        word = BAD_WORDS[number];
        // if there is one or more bad words, the video is bad
        videoEffect = 'bad';
      }
      videoName.push(word);
    }
    let videoNameString = videoName.join('');
    let newVideo = new Video(videoNameString, videoEffect, i);
    currentVideos.push(newVideo);
    $(`#videoSection`).append(`<div class="videoChoice" id="video${i}"> <p> ${currentVideos[i].name} <button id="button${i}"> &#x25B6; </button> </p>  </div>`);
    $(`#button${i}`).on('click', function() {
      let id = $(this).attr('id');
      id = id.replace('button', '');
      playVideo(id);
    });
  }
}

function ending() {
  clearInterval(timerAutoplay);

}
