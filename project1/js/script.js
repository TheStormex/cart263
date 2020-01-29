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

// All possible jobs, their name, duration, money per click, chance of appearing
const JOBS_LIST = [
['Waiter', 10, 1, 50],
['Cashier', 10, 1, 50],
['Janitor', 8, 2, 25],
['Mover', 8, 2, 25],
['Customer Service', 6, 3, 12.5],
['Garbageman', 6, 3, 12.5],
['Taxi Driver', 4, 4, 7.5],
['Tour Guide', 4, 4, 7.5],
['Game Tester', 2, 4, 5],
['Web Designer', 2, 4, 5]
];
// All possible dues, their name, time limit, total to pay, chance of appearing
const DUES_LIST = [
['Food', 2, 4, 40],
['Relationship Costs', 2, 4, 40],
['Internet Fees', 2.5, 6, 30],
['Car Fees', 2.5, 6, 30],
['Robbery', 3, 8, 15],
['Insurance', 3, 8, 15],
['Home Repair', 3.5, 10, 9],
['Hospital Bills', 3.5, 10, 9],
['Market Crash', 4, 12, 6],
['Psych Fees', 4, 12, 6]
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
  for (var i = 0; i < 3; i++) {
    let newJob = new Jobs(JOBS_LIST[1], i);
    jobsCurrent.push(newJob);
  }
  for (var i = 0; i < 3; i++) {
    let newDue = new Dues(DUES_LIST[1], i);
    duesCurrent.push(newDue);
  }
  // Start with no money
  $("#playerWealth").append(wealthCurrent);
  // Start with maximum stamina
  $("#stamina").html(0);
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
    //  let newJob = new Jobs()
    }
  }
}

// Dues randomly spawning
function duesAppear() {

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
