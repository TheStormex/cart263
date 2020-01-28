"use strict";

/********************************************************************

Get Happiness Here!
Che Tan

Work and pay off life's expenses to buy happiness! Or can you?

*********************************************************************/

// When there is nothing in an option slot
const NOTHING = `<p> Currently Nothing </p>`

// All possible jobs, their name, duration, money per click, chance of appearing
const JOBS_LIST = [
['Waiter', 10000, 1, 50],
['Cashier', 10000, 1, 50],
['Janitor', 8000, 2, 25],
['Mover', 8000, 2, 25],
['Customer Service', 6000, 3, 12.5],
['Garbageman', 6000, 3, 12.5],
['Taxi Driver', 4000, 4, 7.5],
['Tour Guide', 4000, 4, 7.5],
['Game Tester', 2000, 4, 5],
['Web Designer', 2000, 4, 5]
];
// All possible dues, their name, time limit, total to pay, chance of appearing
const DUES_LIST = [
['Food', 2000, 4, 40],
['Relationship Costs', 2000, 4, 40],
['Internet Fees', 2500, 6, 30],
['Car Fees', 2500, 6, 30],
['Robbery', 3000, 8, 15],
['Insurance', 3000, 8, 15],
['Home Repair', 3500, 10, 9],
['Hospital Bills', 3500, 10, 9],
['Market Crash', 4000, 12, 6],
['Psych Fees', 4000, 12, 6]
];

// All possible defeat messages
const GAME_OVER_TEXT = [
['You died from exhaustion! Clearly, you were not strong enough to be happy!'],
['You went broke since you did not pay your dues! Clearly you just did not work hard enough!'],
['You died of old age! Was that a happy life?'],
]

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
const JOB_RATE = 500;
let duesTimer;
const DUES_RATE = 500;



$(document).ready(setup);

function setup() {
  console.log("ready");
  // There are nothing in the options at the beginning
  $(".option").append(NOTHING);
  // Start with no money
  $("#playerWealth").append(wealthCurrent);
  // Start with maximum stamina
  $("#stamina").append(STAMINA_MAX);
  // Happiness costs 100 at the beginning
  $("#happinessCost").append(happinessPriceCurrent);
  // Set stamina timer
  staminaTimer = setInterval(staminaRecovery, STAMINA_RATE);
  // Set jobs appearing timer
  jobsTimer = setInterval(jobsAppear, JOB_RATE);
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
}

// Jobs randomly spawning
function jobsAppear() {

}

// Dues randomly spawning
function duesAppear() {
  
}

// Increase happiness price if reach the current amount
function priceIncrease() {
  happinessPriceCurrent += 50;
}

// End the game due to a game over condition being met
// Which alert showing depends on which condition
function gameOver(condition) {
  let endCondition = condition;
  alert(GAME_OVER_TEXT[endCondition]);
}
