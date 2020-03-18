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
const TITLE_STATE = new TitleState();
const PLAN_STATE = new PlanState();
const FIGHT_STATE = new FightState();
const END_STATE = new EndState();

// variables
let frontline = "bolt";
let currentChar;
let whichScreen;
// players and enemy objects
let bolt;
let nuts;
let serpent;
let agent;

// nuts and bolt's abilities
let ab_logicBomb = new PlayerAbility("Logic Bomb", "combat", 3, [["damage", 5]], 32, "none", false);
let ab_backdoor = new PlayerAbility("Backdoor", "combat", 2, [["damage", 2], ["dash", "# added to speed"]], 32, "none", false);
let ab_cleanupProtocol = new PlayerAbility("Cleanup Protocol", "support", 3, [["heal", 5]], 32, "none", false);
let ab_signalBoost = new PlayerAbility("Signal Boost", "support", 2, [["ramp", 5]], 32, "none", false);
let ab_ult_bitRotWorm = new PlayerAbility("Bitrot Worm", "combat", 3, [["damage", 5]], 32, "none", true);
let ab_firewall = new PlayerAbility("Firewall", "support", 3, [["damage", 5]], 32, "none", false);
let ab_targetExploits = new PlayerAbility("Target Exploits", "support", 3, [["damage", 5]], 32, "none", false);
let ab_DDOS = new PlayerAbility("DDoS", "combat", 3, [["damage", 5]], 32, "none", false);
let ab_bruteForce = new PlayerAbility("Brute Force Attack", "combat", 3, [["damage", 5]], 32, "none", false);
let ab_ult_vpn = new PlayerAbility("Activate VPN", "support", 3, [["damage", 5]], 32, "none", true);

// enemies abilities
let ab_e_wallStraight;
let ab_e_inOut;
let ab_e_circle;
let ab_e_shoot;
let ab_e_absorb;
let ab_e_teleport;

let enemiesList = [];
let playersList = [];

let enemyBullets = [];
let playerBullets = [];

let gameScreen;

// keycodes:
// w - 87 / a - 65/ s - 83/ d - 68 / space -32 / shift - 16 / control - 17

$(document).ready(start);

function start() {
  console.log("ready");
}

// p5 preload
function preload() {

}

// p5 setup
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  background(100);
  // create the player characters and enemy characters
  bolt = new Player("Bolt", 20, 5, [[ab_cleanupProtocol, ab_signalBoost],[],[ab_logicBomb, ab_backdoor], [ab_ult_bitRotWorm]]);
  nuts = new Player("Nuts", 30, 4, [[ab_firewall, ab_targetExploits], [ab_ult_vpn], [ab_DDOS, ab_bruteForce], []]);
  agent = new Enemy("Hackshield Agent", 50);
  serpent = new Enemy("Serverspy Serpent", 60);
  playersList = [bolt, nuts];
  enemiesList = [agent, serpent];
  // create the player and enemies's abilities
  frontline = bolt;
  currentChar = "none";
  whichScreen = PLAN_STATE;
}

// p5 draw
function draw() {
  clear();
  background(100);
  whichScreen.draw();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// draw current character name, head, health bar, energy, ult charge if there is one
function drawCommonUI() {
  if (currentChar != "none") {
    push();
    // make the menu box
    rectMode(CENTER, CENTER);
    noStroke();
    fill(255);
    rect(width/2, height-height/6, width, height/3);
    // name of char, health bar, energy, ult charge
    textSize(width/30+height/60);
    textAlign(CENTER);
    fill(0);
    // name
    text(currentChar.name, width/20, height-height/4);
    fill(255);
    strokeWeight(5);
    stroke(0);
    // health bar
    rect(width/2.8, height-height/3.63, width/2, height/20);
    noStroke();
    fill(255, 0 , 0);
    rectMode(CORNER);
    rect(width/2.8-width/4, height-height/3.63-height/40, width/2, height/20);
    // energy
    let energyText = "Energy: " + currentChar.energy;
    fill(0);
    textSize(width/60+height/60)
    text(energyText, width-width/3.2, height-height/4);
    // ult charge
    let ultChargeText = "Ult Charge: " + currentChar.ultCharge + "%";
    text(ultChargeText, width-width/8, height-height/4);
    // character head image
    rectMode(CENTER, CENTER);
    rect(width/18, height-height/7, width/10, height/6);
    pop();
  }
}

// p5 mouse is pressed
function mousePressed() {
  whichScreen.mouseDown();
}
