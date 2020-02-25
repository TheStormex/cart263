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
// Song
const AUDIO_SONG = new Audio("assets/sounds/song.wav");
// Arrays
// Good words that can appear in titles
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
// Bad words that can appear in titles
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
// Images that can spawn if watch a good video
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
// Images that can appear if watch a bad video
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
// How many videos have been watched
let videoNumber = 0;
// Each of the 8 areas whether the video is good or bad
let allAreas = [];
// All 3 videos currently available
let currentVideos = [];
// Name of a newly spawning video
let videoName = [];
// Number of images in left area
let area1Number = 0;
// Number of images in right area
let area2Number = 0;
// Number of bad images currently screen
let badImageNumber = 0;
// Chance of a word in title being good or bad
let mixedRate = 0.9;
// With each bad video, the title and background color changes
let backgroundDarkness = 89;
let titleColor = 300;

// Timers
let timerAutoplay;
let autoplayTimerText = 5;

// Setup the page when it loads
$(document).ready(setup);

// When start, hide the video section
function setup() {
  console.log("ready");
  $(`#videoSection`).css("opacity", "0%");
}

// When the start button is clicked, begin the simulation
function startGame() {
  $(`#videoSection`).css("opacity", "100%");
  $(`#start`).remove();
  nextVideos('good');
  timerAutoplay = setInterval(timerAutoplayCountdown, 1000)
  autoplayTimerText = 5;
  AUDIO_SONG.play();
  AUDIO_SONG.loop = true;
  AUDIO_SONG.preservesPitch = false;
  AUDIO_SONG.volume = 0.5;
}

// Every second, count down the autoplay timer and its display text
// If it gets to zero, play the first video in the list
function timerAutoplayCountdown() {
  autoplayTimerText -= 1;
  $(`#autoplayCount`).html(autoplayTimerText);
  if (autoplayTimerText <= 0) {
    autoplayTimerText = 5;
    playVideo('0');
  }
}

// When a video's play button clicked, if the video is good then say happy,
// make a good image appear that has not appeared yet, then play the static sound.
// If it is bad, say sad, darken background, redden title, slow down song,
// soawn a bad image, if all slots are taken, replace a good image. If there are
// Eight bad images, end the simulation.
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
    AUDIO_STATIC.play();
    // Good videos make the child's inner voice say happy
    responsiveVoice.speak('happy', "UK English Female", {
      pitch: 1.8,
      rate: 1.2
    })
  } else {
    // choose a random not used one from the bad list
    thisImageIndex = Math.floor(Math.random() * badImages.length);
    thisImage = badImages[thisImageIndex];
    badImages.splice(thisImageIndex, 1);
    // With each bad video, the background darkens
    if (backgroundDarkness > 20) {
      backgroundDarkness -= 10;
      $(`body`).css("background-color", `hsl(207, 100%, ${backgroundDarkness}%)`)
    }
    if (titleColor < 360) {
      titleColor += 10;
      $(`#title`).css("color", `hsl(${titleColor}, 100%, 50%)`)
    }
    badImageNumber++;
    console.log(badImageNumber);
    AUDIO_BOOTUP.play();
    AUDIO_SONG.playbackRate -= 0.1;
    // Bad videos make the child's inner voice say sad
    responsiveVoice.speak('sad', "UK English Female", {
      pitch: 0.3,
      rate: 0.5
    })
  }
  if (area1Number < 4) {
    $(`#area1`).append(`<div id="image${area1Number}"> <img src="assets/images/${thisImage}.png" alt="${thisImage}"> </div>`);
    area1Number += 1;
    allAreas.push(currentVideos[videoId].effect);
  } else
  if (area1Number >= 4 && area2Number < 4) {
    $(`#area2`).append(`<div id="image${area1Number+area2Number}"> <img src="assets/images/${thisImage}.png" alt="${thisImage}"> </div>`);
    area2Number += 1;
    allAreas.push(currentVideos[videoId].effect);
  } else {
    // If the video is bad, then replace the good ones, if it is a good video, nothing happens
    if (currentVideos[videoId].effect === 'bad') {
      // remove the first good one in the list of images currently on screen, replace it with a bad image
      if (badImageNumber < 8) {
        let checkAreaGoodness = 0;
        while (allAreas[checkAreaGoodness] === 'bad') {
          checkAreaGoodness++;
        }
        $(`#image${checkAreaGoodness}`).html(`<img src="assets/images/${thisImage}.png" alt="${thisImage}">`);
        allAreas[checkAreaGoodness] = 'bad';
      } else {
          ending();
      }
    }
  }
  let type;
  if (videoNumber < 4) {
    type = 'good'
  }
  else {
    type = 'mixed'
  }
  nextVideos(type);
}

// When a video has been clicked, the list of videos
// is removed and a new list of three are spawned
function nextVideos(type) {
  $(`.videoChoice`).remove();
  currentVideos = [];
  let goodBadChance;
  switch (type) {
    case 'good':
      goodBadChance = 1;
      break;
    case 'mixed':
      goodBadChance = mixedRate;
      mixedRate -= 0.05;
      break;
    default: console.log('error');
  }
  // Spawn 3 new videos
  for (var i = 0; i < 3; i++) {
    videoName = [];
    let videoEffect;
    // videos are good by default
    videoEffect = 'good';
    let unusedGoodWords = [...GOOD_WORDS];
    let unusedBadWords = [...BAD_WORDS];
    for (var i2 = 0; i2 < 4; i2++) {
      let number;
      let word;
      if (Math.random() < goodBadChance) {
        number = Math.floor(Math.random() * unusedGoodWords.length);
        word = unusedGoodWords[number];
        unusedGoodWords.splice(number, 1);
      } else {
        number = Math.floor(Math.random() * unusedBadWords.length);
        word = unusedBadWords[number];
        unusedBadWords.splice(number, 1);
        // if there is one or more bad words, the video is bad
        videoEffect = 'bad';
      }
      videoName.push(word);
    }
    // Make the name by combining the 4 random words and make the video object
    let videoNameString = videoName.join('');
    let newVideo = new Video(videoNameString, videoEffect, i);
    // Add the video to the list of new videos then display it on screen
    currentVideos.push(newVideo);
    $(`#videoSection`).append(`<div class="videoChoice" id="video${i}"> <p> ${currentVideos[i].name} <button class="videoButton" id="button${i}"> &#x25B6; </button> </p>  </div>`);
    $(`#button${i}`).on('click', function() {
      let id = $(this).attr('id');
      id = id.replace('button', '');
      playVideo(id);
    });
  }
}

// When the simulation ends, end all sounds, play the crying and give the message
function ending() {
  AUDIO_BOOTUP.pause();
  AUDIO_SONG.pause();
  clearInterval(timerAutoplay);
  $(`#title`).css("color", `hsl(${titleColor}, 100%, 50%)`)
  $(`body`).html(`<span id="title"> Please pay attention to what your children watch and do not take for granted that it would be
    appropriate. It could traumatise them and give more ad money to these content farms that exploit children for a quick profit. </span>`);
  AUDIO_CRY.play();
}
