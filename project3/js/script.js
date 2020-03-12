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

// variables
let boltHP = 20;
let boltEnergy = 0;
let nutsHP = 30;
let nutsEnergy = 0;
let agentHP = 50;
let serpentHP = 60;


$(document).ready(start);

function start() {
  console.log("ready");
}

// p5 setup
function setup() {

}

// p5 draw
function draw() {

}
