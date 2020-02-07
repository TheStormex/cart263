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


// Images: 20
// good
const IMAGE_FLOWER = 0;
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
`friends`,
`love`,
`happy`,
`kind`,
`cartoon`,
`lesson`,
`nursery`,
`song`,
`dancing`,
`birthday`
]

const BAD_WORDS = [
`hate`,
`death`,
`suicide`,
`torture`,
`kill`,
`war crime`,
`genocide`,
`pain`,
`decapitation`,
`gore`
]

let usedGoodWords = [];
let usedBadWords = [];
let videoNumber = 0;
let emptyAreas = [];
let goodAreas = [];

// Timers

let timerAutoplay = 0;
const AUTOPLAY_AMOUNT = 5000;

$(document).ready(setup);

function setup() {
  console.log("ready");
  //     make 3   <div class="videoChoice"> </div>
}
