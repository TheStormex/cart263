"use strict";

/********************************************************************

Get Happiness Here!
Che Tan

Work and pay off life's expenses to buy happiness! Or can you?

*********************************************************************/

// Sound of paying dues
const AUDIO_PAY = new Audio("assets/sounds/Money.wav");

// Sound of working
const AUDIO_WORK = new Audio("assets/sounds/Sigh.wav");;

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
['Food', 3, 4],
['Relationship Costs', 3, 4],
['Internet Fees', 4, 6],
['Car Fees', 4, 6],
['Robbery', 4.5, 8],
['Insurance', 4.5, 8],
['Home Repair', 5, 10],
['Hospital Bills', 5, 10],
['Market Crash', 6, 12],
['Psych Fees', 6, 12]
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
const JOBS_RATE = 1000;
let duesTimer;
const DUES_RATE = 4000;
let priceCheckTimer;
// Every millisecond, remove 1/1000 for each active option timer
let optionsTimer
let oldAgeTimer;
let age = 0;


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
  // Options availability and time limit ticking down timer
  optionsTimer = setInterval(optionsTicksDown, 10);
  // Die of old age timer
  oldAgeTimer = setInterval(oldAge, 1000);
  // Add all timers to the timers array
  timers = [jobsTimer, duesTimer, staminaTimer, priceCheckTimer, optionsTimer];

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
  let index = jobsCurrent.length;
    if (Math.random() * 101 <= 50) {
      let whichJob = Math.floor(Math.random() * 10);
      let newJob = new Jobs(JOBS_LIST[whichJob], index);
      jobsCurrent.push(newJob);
      $(`#workButton${index}`).on('click', function() {
        staminaCurrent -= 10;
        if (staminaCurrent <= 0) {
          gameOver(0);
        }
        wealthCurrent += jobsCurrent[index].salary;
        $('#playerWealth').html(wealthCurrent);
        AUDIO_WORK.play();
      });
    }
}

// Dues randomly spawning
function duesAppear() {
  let index = duesCurrent.length;
    let whichDue = Math.floor(Math.random() * 10);
    let newDue = new Dues(DUES_LIST[whichDue], duesCurrent.length);
    duesCurrent.push(newDue);
    $(`#payButton${index}`).on('click', function() {
      if (wealthCurrent - duesCurrent[index].totalCost >= 0) {
        wealthCurrent -= duesCurrent[index].totalCost;
        $('#playerWealth').html(wealthCurrent);
        $(`#due${index}`).remove();
        duesCurrent[index].there = false;
        AUDIO_PAY.play();
      }
    });
}

// Increase happiness price if reach the current amount
function priceIncrease() {
  if (wealthCurrent >= happinessPriceCurrent) {
    happinessPriceCurrent += 50;
    $('#happinessCost').html(happinessPriceCurrent);
  }
}

// End the game due to a game over condition being met
// Which alert showing depends on which condition
function gameOver(condition) {
  let endCondition = GAME_OVER_TEXT[condition];
  $(`div`).remove();
  for (var i = 0; i < timers.length; i++) {
    clearInterval(timers[i]);
  }
  $(document.body).append(`<p> ${endCondition} </p>`);
}

function optionsTicksDown() {
  for (var i = 0; i < jobsCurrent.length; i++) {
    let oldAvailability = jobsCurrent[i].availability;
    jobsCurrent[i].availability -= 0.01;
    let newAvailability = jobsCurrent[i].availability;
    if (Math.floor(newAvailability <= 0)) {
      $(`#job${i}`).remove();
   } else if (Math.floor(newAvailability) < Math.floor(oldAvailability)) {
        $(`#availabilityLeft${i}`).html(Math.floor(jobsCurrent[i].availability));
    }
  }
  for (var i = 0; i < duesCurrent.length; i++) {
    // If this due is has not been paid off
    if (duesCurrent[i].there === true) {
      let oldTimeLimit = duesCurrent[i].timeLimit;
      duesCurrent[i].timeLimit -= 0.01;
      let newTimeLimit = duesCurrent[i].timeLimit;
      if (Math.floor(newTimeLimit <= 0)) {
        gameOver(1);
    } else if (Math.floor(newTimeLimit) < Math.floor(oldTimeLimit)) {
          $(`#timeLimitLeft${i}`).html(Math.floor(duesCurrent[i].timeLimit));
      }
    }
  }
}

// If the game goes on for a minute, the player loses by dying of old age
function oldAge() {
  age += 1;
  if (age >= 60) {
    gameOver(2);
  }
}
