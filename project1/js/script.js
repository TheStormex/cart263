"use strict";

/********************************************************************

Get Happiness Here!
Che Tan

Work and pay off life's expenses to buy happiness! Or can you?

*********************************************************************/

// Sound of paying dues
const AUDIO_PAY = 0;

// Sound of working
const AUDIO_WORK = 0;

// Sound of losing
const AUDIO_LOSE = 0;

// All possible jobs, their name, duration, money per click
const JOBS_LIST = [
['Waiter', 10, 1],
['Cashier', 10, 1],
['Janitor', 8, 2],
['Mover', 8, 2],
['Customer Service', 6, 3],
['Garbageman', 6, 3],
['Taxi Driver', 4, 4],
['Tour Guide', 4, 4],
['Game Tester', 2, 4],
['Web Designer', 2, 4]
];
// All possible dues, their name, time limit, total to pay
const DUES_LIST = [
['Food', 2, 4],
['Relationship Costs', 2, 4],
['Internet Fees', 2.5, 6],
['Car Fees', 2.5, 6],
['Robbery', 3, 8],
['Insurance', 3, 8],
['Home Repair', 3.5, 10],
['Hospital Bills', 3.5, 10],
['Market Crash', 4, 12],
['Psych Fees', 4, 12]
];

// All possible defeat messages
const GAME_OVER_TEXT = [
['You died from exhaustion! Clearly, you were not strong enough to be happy!'],
['You went broke since you did not pay your dues! Clearly you just did not work hard enough!'],
['You died of old age! Was that a happy life?'],
];

let wealthCurrent = 0;
let staminaCurrent = 0;
const STAMINA_MAX = 100;
const STAMINA_RATE = 100;

let happinessPriceCurrent = 100;


// Current jobs ()
let jobsCurrent = [];
// Current dues
let duesCurrent = [];

// All timers (to make game over stop all timers at the same time without naming each one)
let timers = [];
let staminaTimer;
let jobsTimer;
const JOBS_RATE = 500;
let duesTimer;
const DUES_RATE = 500;
let priceCheckTimer;


$(document).ready(setup);

function setup() {
  console.log("ready");
  // There are nothing in the options at the beginning
  // Start with no money
  $("#playerWealth").append(wealthCurrent);
  // Start with maximum stamina
  staminaCurrent = STAMINA_MAX;
  $("#stamina").html(STAMINA_MAX);
  // Happiness costs 100 at the beginning
  $("#happinessCost").append(happinessPriceCurrent);
  // Set stamina timer
  staminaTimer = setInterval(staminaRecovery, STAMINA_RATE);
  // Set jobs appearing timer
  jobsTimer = setInterval(jobsAppear, JOBS_RATE);
  // Set dues appearing timer
  duesTimer = setInterval(duesAppear, DUES_RATE);
  // Set price increase timer
  priceCheckTimer = setInterval(priceIncrease, 10);
  // Add all timers to the timers array
  timers = [jobsTimer, duesTimer];
  // Add jobs to the array
  // jobsCurrent = $('.jobs');
  // Add dues to the array
  console.log(jobsCurrent);
}

// If the player tries to buy happiness
function buyHappiness() {
  alert("You do not have enough! Get richer!");
}

// Gradual recovery of stamina
function staminaRecovery() {
  staminaCurrent += 1;
  if (staminaCurrent > STAMINA_MAX) {
    staminaCurrent = STAMINA_MAX;
  }
  $("#stamina").html(staminaCurrent);
}

// Jobs randomly spawning
function jobsAppear() {
  if (jobsCurrent.length < 3) {
    if (Math.random() * 101 <= 30 - jobsCurrent.length * 10) {
      let whichJob = Math.floor(Math.random() * 10);
      console.log(whichJob);
      let newJob = new Jobs(JOBS_LIST[whichJob], jobsCurrent.length);
      jobsCurrent.push(newJob);
    }
  }
}

// Dues randomly spawning
function duesAppear() {
  if (duesCurrent.length < 3) {
    if (Math.random() * 101 <= 10 - duesCurrent.length * 2) {
      let whichDue = Math.floor(Math.random() * 10);
      let newDue = new Dues(DUES_LIST[whichDue], duesCurrent.length);
      console.log(newDue);
      duesCurrent.push(newDue);
    }
  }
}

// Increase happiness price if reach the current amount
function priceIncrease() {
  if (wealthCurrent >= happinessPriceCurrent) {
    happinessPriceCurrent += 50;
  }
}

// End the game due to a game over condition being met
// Which alert showing depends on which condition
function gameOver(condition) {
  let endCondition = condition;
  alert(GAME_OVER_TEXT[endCondition]);
  for (var i = 0; i < timers.length; i++) {
    clearInterval(timers[i]);
  }
}

// Run the code for each
function workButtonPressed(index) {

}
