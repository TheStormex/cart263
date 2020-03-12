"use strict";

/********************************************************************

The Last Hacktivists
Che Tan

Two brave hacktivists broke into the system of the mega corporation
in control of everyone's information! Can they defeat the system's guards
and free the world from tyranny?
*********************************************************************/

// constants
// sounds
const A_SONG = 0;
const A_BOLT_BASIC = 0;
const A_NUTS_BASIC = 0;
const A_AGENT_BALL = 0;
const A_AGENT_SPEAR = 0;
const A_AGENT_WAVE = 0;
const A_AGENT_ABSORB = 0;
const A_HIT_PLAYER = 0;
const A_HIT_ENEMY = 0;
const A_SERPENT_SSS = 0;
const A_SERPENT_BALL = 0;
const A_SERPENT_RECT = 0;
const A_SUPPORT = 0;
const A_SUPPORT_ULT = 0;
const A_COMBAT_ULT = 0;
// images
const S_BOLT_FACE = 0;
const S_BOLT_FRONT = 0;
const S_BOLT_LEFT = 0;
const S_BOLT_RIGHT = 0;
const S_NUTS_FACE = 0;
const S_NUTS_FRONT = 0;
const S_NUTS_LEFT = 0;
const S_NUTS_RIGHT = 0;
const S_AGENT_FRONT = 0;
const S_AGENT_LEFT = 0;
const S_AGENT_RIGHT = 0;
const S_SERPENT_FRONT = 0;
const S_SERPENT_LEFT = 0;
const S_SERPENT_RIGHT = 0;
const S_SERPENT_CIRCLE = 0;
const S_LOGIC_BOMB = 0;
const S_LOGIC_BOMB_EXPLOSION = 0;
const S_BACK_DOOR = 0;
const S_CLEANUP = 0;
const S_SIGNAL = 0;
const S_BEAM = 0;
const S_FIREWALL = 0;
const S_EXPLOITS = 0;
const S_STUN = 0;
const S_BRUTE_FORCE = 0;
const S_LOGO = 0;
const S_NAME = 0;

// non changing values
const V_BOLT_MAXHP = 20;
const V_NUTS_MAXHP = 30;
const V_AGENT_MAXHP = 50;
const V_SERPENT_MAXHP = 60;
const V_BOLT_ENERGY_TURN = 2;
const V_NUTS_ENERGY_TURN = 2;
const V_INSTRUCTIONS = [
  "Reduce the 2 enemies' health to 0 through combat!",
  "Click one of the two hackers to give commands in their menu!",
  "Choose which of the two hackers to use as the front line fighter by clicking the Front line button in their menu! (Bolt is currently the frontline)",
  "Spend energy to use support skills here in the planning phase and to use combat skills in the battle phase!",
  "Using skills and dealing damage increases the ultimate meter!",
  "Once it is full, that hacker can unleash either a powerful combat skill or support skill!",
  "In combat, dodge enemy projectiles, shoot projectiles at them with the mouse and activate skills with shift, space and ctrl!",
  "Each hacker gains energy at the beginning of turn, if it did not use a skill last turn, it gets more!",
  "Switch between each hacker as the front line often to prevent one from becoming tired!",
  "Good luck! The fate of humanity rests on your fingertips!",
];

// variables
let boltHP = 20;
let boltEnergy = 0;
let boltUltCharge = 0;
let boltFrontlineTurns = 0;
let boltTired = false;
let nutsHP = 30;
let nutsEnergy = 0;
let nutsUltChange = 0;
let nutsFrontlineTurns = 0;
let nutsTired = false;
let frontline = "bolt";
let agentHP = 50;
let serpentHP = 60;

let gameScreen;

$(document).ready(start);

function start() {
  console.log("ready");
}

// p5 setup
function setup() {
  createCanvas(500, 500);
  gameScreen = createGraphics(100, 100);
}

// p5 draw
function draw() {

}
