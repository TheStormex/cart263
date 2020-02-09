"use strict";

/********************************************************************

Child-Friendly Videos Simulator 2020
Che Tan

What is it like for a child to carelessly browse through the seemingly innocent
videos marketed towards them? How is their mind influenced and altered by these
online entertinament? Let's find out!

*********************************************************************/

// Sounds:
const AUDIO_STATIC = 0;
const AUDIO_CRY = 0;
const AUDIO_BOOTUP = 0;

const AUDIO_SONG = 0;

// Images: 20
// good
const IMAGE_FLOWER = new Image;
const IMAGE_SUN = 0;
const IMAGE_HAPPY = 0;
const IMAGE_HEART = 0;
const IMAGE_BOY = 0;
const IMAGE_GIRL = 0;
const IMAGE_BOOK = 0;
const IMAGE_VEGETABLE = 0;
const IMAGE_FRUIT = 0;
const IMAGE_SCHOOL = 0;
// bad
const IMAGE_CORPSE = 0;
const IMAGE_KNIFE = 0;
const IMAGE_GUN = 0;
const IMAGE_BLOOD = 0;
const IMAGE_BULLY = 0;
const IMAGE_HATE = 0;
const IMAGE_ANGRY = 0;
const IMAGE_CRY = 0;
const IMAGE_MONSTER = 0;
const IMAGE_DESTROY = 0;
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

let usedGoodWords = [];
let usedBadWords = [];
let videoNumber = 0;
let emptyAreas = [];
let goodAreas = [];
let currentVideos = [];
let videoName = [];
let area1Number = 0;
let area2Number = 0;

// Timers

let timerAutoplay;
let autoplayTimerText = 5;

$(document).ready(setup);

function setup() {
  console.log("ready");
  nextGoodVideos();
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
  if (currentVideos[videoId].effect === 'good') {
    let thisImage = 0;
    // choose a random not used one from the good list
  } else {
    // choose a random not used one from the bad list
  }
  if (area1Number < 4) {
    $(`#area1`).append(`<div> <img src="assets/images/clown.png" alt="good image"> </div>`);
    area1Number += 1;
  } else
  if (area1Number >= 4 && area2Number < 4) {
    $(`#area2`).append(`<div> <img src="assets/images/clown.png" alt="good image"> </div>`);
    area2Number += 1;
  } else {
    console.log('too many');
    // remove the first good one in the list of images currently on screen, replace it 
  }
  if (videoNumber < 4) {
    nextGoodVideos();
  }
  else if (videoNumber < 8) {
    nextGoodVideos();
  } else {
    nextGoodVideos();
  }

}

function nextGoodVideos() {
  $(`.videoChoice`).remove();
  currentVideos = [];
  for (var i = 0; i < 3; i++) {
    videoName = [];
    for (var i2 = 0; i2 < 4; i2++) {
      let number = Math.floor(Math.random() * 20);
      let word = GOOD_WORDS[number];
      videoName.push(word);
    }
    let videoNameString = videoName.join('');
    let newVideo = new Video(videoNameString, 'good', i);
    currentVideos.push(newVideo);
    $(`#videoSection`).append(`<div class="videoChoice" id="video${i}"> <p> ${currentVideos[i].name} <button id="button${i}"> &#x25B6; </button> </p>  </div>`);
    $(`#button${i}`).on('click', function() {
      let id = $(this).attr('id');
      id = id.replace('button', '');
      playVideo(id);
    });
  }
}
