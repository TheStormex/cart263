"use strict";

/********************************************************************

The Last Hacktivists
Che Tan

Two brave hacktivists broke into the system of the mega corporation
in control of everyone's information! Can they defeat the system's guards
and free the world from tyranny?
*********************************************************************/

// constants
// sounds for P5 part
let A_SONG;
let A_BOLT_BASIC;
let A_NUTS_BASIC;
let A_AGENT_BALL;
let A_AGENT_SPEAR;
let A_AGENT_WAVE;
let A_AGENT_ABSORB;
let A_HIT_PLAYER;
let A_HIT_ENEMY;
let A_SERPENT_SSS;
let A_SERPENT_BALL;
let A_SERPENT_RECT;
let A_SUPPORT;
let A_SUPPORT_ULT;
let A_COMBAT_ULT;
// images for P5 part
let S_BOLT_FACE;
let S_BOLT_FRONT;
let S_BOLT_LEFT;
let S_BOLT_RIGHT;
let S_NUTS_FACE;
let S_NUTS_FRONT;
let S_NUTS_LEFT;
let S_NUTS_RIGHT;
let S_AGENT_FRONT;
let S_AGENT_LEFT;
let S_AGENT_RIGHT;
let S_SERPENT_FRONT;
let S_SERPENT_LEFT;
let S_SERPENT_RIGHT;
let S_SERPENT_CIRCLE;
let S_LOGIC_BOMB;
let S_LOGIC_BOMB_EXPLOSION;
let S_BACK_DOOR;
let S_CLEANUP;
let S_SIGNAL;
let S_BEAM;
let S_FIREWALL;
let S_EXPLOITS;
let S_STUN;
let S_BRUTE_FORCE;
let S_LOGO;
let S_NAME;
// images for jquery part
const S_OMNISYT_LOGO = 0;

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

let boltImages;
let nutsImages;
let serpentImages;
let agentImages;

let enemiesList = [];
let playersList = [];

// how many turns has past
let turns = 0;

// nuts and bolt's abilities and effects
let ab_logicBomb_effect = new AbilityEffect("bullet", "", 1, "", false, false);
let ab_logicBomb = new PlayerAbility("Logic Bomb", 3, [ab_logicBomb_effect], "Throw a projectile", 32, "none", false, [[5, "hit"]], 3);
let ab_backdoor_effect = new AbilityEffect("bullet", "", 1, "", false, false);
let ab_backdoor_effect2 = new AbilityEffect("dash", "", 1, "", false, false);
let ab_backdoor = new PlayerAbility("Backdoor", 2, [ab_backdoor_effect, ab_backdoor_effect2], "Dash and weaken enemies", 32, "none", false, [[5, "hit"], [2, "use"]], 2);
let ab_cleanupProtocol_effect = new AbilityEffect("heal", "players", 6, "", false, false);
let ab_cleanupProtocol = new PlayerAbility("Cleanup Protocol",  3, [ab_cleanupProtocol_effect], "Heal a friendly character", 32, "none", false, [[10, "heal"]], 0);
let ab_signalBoost_effect = new AbilityEffect("ramp", "players", 5, "", false, false);
let ab_signalBoost = new PlayerAbility("Signal Boost", 4, [ab_signalBoost_effect], "Give 5 energy to a friendly character", 32, "none", false, [[10, "use"]], 0);
let ab_ult_bitRotWorm_effect = new AbilityEffect("bullet", "", 10, "", false, false);
let ab_ult_bitRotWorm = new PlayerAbility("Bitrot Worm", 3, [ab_ult_bitRotWorm_effect], "Shoot a powerful beam", 32, "none", true, [[5, "hit"]], 0);
let ab_firewall_effect = new AbilityEffect("defense_up", "players", 25, "", false, false);
let ab_firewall = new PlayerAbility("Firewall", 3, [ab_firewall_effect], "Boost defenses", 32, "none", false, [[10, "use"]], 0);
let ab_targetExploits_effect = new AbilityEffect("defense_down", "enemies", 25, "", false, false);
let ab_targetExploits = new PlayerAbility("Target Exploits", 3, [ab_targetExploits_effect], "Weaken enemy character", 32, "none", false, [[10, "use"]], 0);
let ab_DOOS_effect = new AbilityEffect("stun", "", 1.5, "", false, false);
let ab_DDOS = new PlayerAbility("DDoS", 3, [["stun", 1.5]], "Stun enemies hit", 32, "none", false, [[5, "hit"]], 4);
let ab_bruteForce_effect = new AbilityEffect("bullet", "", 1, "", false, false);
let ab_bruteForce_effect2 = new AbilityEffect("dash", "", 1, "", false, false);
let ab_bruteForce = new PlayerAbility("Brute Force Attack", 3, [ab_bruteForce_effect, ab_bruteForce_effect2], "Dash and make enemies frail", 32, "none", false, [[5, "hit"], [2, "use"]], 3);
let ab_ult_vpn_effect = new AbilityEffect("heal", "", 5, "", false, false);
let ab_ult_vpn_effect2 = new AbilityEffect("defense_up", "", 15, "", false, false);
let ab_ult_vpn_effect3= new AbilityEffect("offense_up", "", 15, "", false, false);
let ab_ult_vpn = new PlayerAbility("Activate VPN", 3, [ab_ult_vpn_effect, ab_ult_vpn_effect2, ab_ult_vpn_effect3], "Heal all friendly characters and boost stats", 32, "none", true, [[10, "use"]], 0);

// the ability that is being activated right now
let currentAbility;

// keycodes:
// w - 87 / a - 65/ s - 83/ d - 68 / space -32 / shift - 16 / control - 17
// buttons to press for each combat ability and the keycode
let combatButtons = [["Space", 32], ["Shift", 16], ["Ctrl", 17]];

// enemies abilities
let ab_e_wallStraight = new EnemyAbility("", "", "");
let ab_e_inOut = new EnemyAbility("", "", "");
let ab_e_shoot = new EnemyAbility("noise", "1", "walls");
let ab_e_teleport = new EnemyAbility("line", "1", "through");

let enemyBullets = [];
let playerBullets = [];

let mouseOver = 0;
let currentKeyPressed = 0;
let currentCombatAbilityKey = 0;
let gameScreen;



$(document).ready(start);

function start() {
}

// p5 preload, load image sprites
function preload() {
  S_BOLT_FACE = loadImage(`assets/images/clown.png`);
  S_BOLT_FRONT = loadImage(`assets/images/clown.png`);
  S_BOLT_LEFT = loadImage(`assets/images/clown.png`);
  S_BOLT_RIGHT = loadImage(`assets/images/clown.png`);
  S_NUTS_FACE = loadImage(`assets/images/clown.png`);
  S_NUTS_FRONT = loadImage(`assets/images/clown.png`);
  S_NUTS_LEFT = loadImage(`assets/images/clown.png`);
  S_NUTS_RIGHT = loadImage(`assets/images/clown.png`);
  S_AGENT_FRONT = loadImage(`assets/images/clown.png`);
  S_AGENT_LEFT = loadImage(`assets/images/clown.png`);
  S_AGENT_RIGHT = loadImage(`assets/images/clown.png`);
  S_SERPENT_FRONT = loadImage(`assets/images/clown.png`);
  S_SERPENT_LEFT = loadImage(`assets/images/clown.png`);
  S_SERPENT_RIGHT = loadImage(`assets/images/clown.png`);
  S_SERPENT_CIRCLE = loadImage(`assets/images/clown.png`);
  S_LOGIC_BOMB = loadImage(`assets/images/clown.png`);
  S_LOGIC_BOMB_EXPLOSION = loadImage(`assets/images/clown.png`);
  S_BACK_DOOR = loadImage(`assets/images/clown.png`);
  S_CLEANUP = loadImage(`assets/images/clown.png`);
  S_SIGNAL = loadImage(`assets/images/clown.png`);
  S_BEAM = loadImage(`assets/images/clown.png`);
  S_FIREWALL = loadImage(`assets/images/clown.png`);
  S_EXPLOITS = loadImage(`assets/images/clown.png`);
  S_STUN = loadImage(`assets/images/clown.png`);
  S_BRUTE_FORCE = loadImage(`assets/images/clown.png`);
  S_LOGO = loadImage(`assets/images/clown.png`);
  S_NAME = loadImage(`assets/images/clown.png`);
}

// p5 setup, load sounds,
function setup() {
  gameScreen = createCanvas(windowWidth, windowHeight);
  gameScreen.style('display', 'block');
  // gameScreen.style('display', 'none');
  background(100);
  // create the player characters and enemy characters
  boltImages = new Images(S_BOLT_LEFT, S_BOLT_RIGHT, S_BOLT_FRONT, S_BOLT_FACE);
  bolt = new Player("Bolt", 20, 5, 10, [[ab_cleanupProtocol, ab_signalBoost], [ab_logicBomb, ab_backdoor, ab_ult_bitRotWorm]], boltImages);
  nutsImages = new Images(S_NUTS_LEFT, S_NUTS_RIGHT, S_BOLT_FRONT, S_BOLT_FACE);
  nuts = new Player("Nuts", 30, 4, 12, [[ab_firewall, ab_targetExploits, ab_ult_vpn], [ab_DDOS, ab_bruteForce]], nutsImages);
  agentImages = new Images(S_AGENT_LEFT, S_AGENT_RIGHT, S_AGENT_FRONT, "none");
  agent = new Enemy("Hackshield Agent", 50, width/20+height/20, 1, [ab_e_shoot, ab_e_teleport], agentImages);
  serpentImages = new Images(S_SERPENT_LEFT, S_SERPENT_RIGHT, S_SERPENT_FRONT, "none");
  serpent = new Enemy("Serverspy Serpent", 60, width/20+height/20, 2, [ab_e_shoot, ab_e_teleport], serpentImages);
  playersList = [bolt, nuts];
  enemiesList = [agent, serpent];
// set the number of steps of each ability of each player
  for (var i = 0; i < playersList.length; i++) {
    for (var i2 = 0; i2 <  playersList[i].abilities[0].length; i2++) {
      for (var i3 = 0; i3 < playersList[i].abilities[0][i2].effects.length; i3++) {
        if (playersList[i].abilities[0][i2].effects[i3].step === true) {
          playersList[i].abilities[0][i2].steps++;
        }
      }
    }
  }
  frontline = bolt;
  currentChar = "none";
  // load sounds
  A_SONG = loadSound(`assets/sounds/bark.wav`);
  A_BOLT_BASIC = loadSound(`assets/sounds/bark.wav`);
  A_NUTS_BASIC = loadSound(`assets/sounds/bark.wav`);
  A_AGENT_BALL = loadSound(`assets/sounds/bark.wav`);
  A_AGENT_SPEAR = loadSound(`assets/sounds/bark.wav`);
  A_AGENT_WAVE = loadSound(`assets/sounds/bark.wav`);
  A_AGENT_ABSORB = loadSound(`assets/sounds/bark.wav`);
  A_HIT_PLAYER = loadSound(`assets/sounds/bark.wav`);
  A_HIT_ENEMY = loadSound(`assets/sounds/bark.wav`);
  A_SERPENT_SSS = loadSound(`assets/sounds/bark.wav`);
  A_SERPENT_BALL = loadSound(`assets/sounds/bark.wav`);
  A_SERPENT_RECT = loadSound(`assets/sounds/bark.wav`);
  A_SUPPORT = loadSound(`assets/sounds/bark.wav`);
  A_SUPPORT_ULT = loadSound(`assets/sounds/bark.wav`);
  A_COMBAT_ULT = loadSound(`assets/sounds/bark.wav`);
  // enter the title state and starts the first turn
  whichScreen = PLAN_STATE;
  newTurn();
}

// p5 draw
function draw() {
  clear();
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
    let healthBarLength = map(currentChar.hp, 0, currentChar.maxHp, 0, width/2);
    rect(width/2.8-width/4, height-height/3.63-height/40, healthBarLength, height/20);
    // health text
    fill(0);
    let healthText = currentChar.hp + " " + "/" + " " + currentChar.maxHp;
    textAlign(CENTER, CENTER);
    textSize(width/70+height/100);
    text(healthText, width/3, height-height/3.63);
    // energy
    let energyText = "Energy: " + currentChar.energy + "/" + currentChar.maxEnergy;
    fill(0);
    textSize(width/80+height/60)
    text(energyText, width-width/3.2, height-height/3.6);
    // ult charge
    let ultChargeText = "Ult Charge: " + currentChar.ultCharge + "%";
    text(ultChargeText, width-width/8, height-height/3.6);
    // character head image
    rectMode(CENTER, CENTER);
    rect(width/18, height-height/7, width/10, height/6);
    pop();
  } else {
    currentChar = playersList[0];
  }
}

// when returning to PlanState, give player characters new energy, if a character has not moved, they gain bonus energy
// reset the buffs and debuffs of all characters
function newTurn() {
  for (var i = 0; i < playersList.length; i++) {
    if (playersList[i].acted === false) {
      // if not the first turn, apply the not moved bonus
      if (turns > 0) {
        playersList[i].energyBoost = 3;
      }
    } else if (playersList[i].acted === true) {
      playersList[i].energyBoost = 0;
    }
    playersList[i].energy += playersList[i].energyTurn + playersList[i].energyBoost;
    playersList[i].offenseChange = 0;
    playersList[i].defenseChange = 0;
  }
  for (var i = 0; i < enemiesList.length; i++) {
    enemiesList[i].offenseChange = 0;
    enemiesList[i].defenseChange = 0;
  }
}

// p5 mouse is pressed
function mousePressed() {
  whichScreen.mouseDown();
}

// p5 key is pressed
function keyPressed() {
  currentKeyPressed = keyCode;
  whichScreen.keyDown();
}
