class FightState {
  constructor() {
    // shoot - the player uses the mouse to shoot normal bullets
    // ability - the player is activating an ability
    this.situation = "shoot";
  }
  draw() {
    console.log(this.situation);
    background(200);
    // draw frontline player, enemies, movements bullets
    this.keyDown();
    this.moveSprites();
    this.drawCharSprites();
    this.drawUI();
  }
  drawCharSprites() {
    // if screen is resized, move each char to new locations
    push();
    noStroke();
    // draw the player frontline character
    fill(0,255,0);
    ellipse(frontline.x, frontline.y, width/20, width/20);
    // draw the enemy characters
    fill(255,0,0);
    for (var i = 0; i < enemiesList.length; i++) {
      enemiesList[i]
    }
    pop();
  }
  drawUI() {
    // draw player head, name, health, energy, ultcharge;
    drawCommonUI();
    this.drawPlayerMenu();

  }
  // draw the supporting skills the characters can use in the UI box
  drawPlayerMenu() {
    if (frontline != "none") {
      push();
      // 2 combat skills
      for (var i = 0; i < frontline.abilities[1].length; i++) {
        strokeWeight(3);
        stroke(0);
        let abilityButton = combatButtons[i][1];
        // if activated, it is highlighted
        for (var i2 = 0; i2 < combatButtons.length; i2++) {
          if (currentCombatAbilityKey === abilityButton) {
            fill(0);
          } else {
            fill(255);
          }
        }
        rectMode(CORNER);
        rect(width/7+(i*width/3.5), height-height/4.5, width/4, height/6);
        noStroke();
        // name, cost and ability
        // if activated, it is highlighted
        for (var i2 = 0; i2 < combatButtons.length; i2++) {
          if (currentCombatAbilityKey === abilityButton) {
            fill(255);
          } else {
            fill(0);
          }
        }
        textAlign(CENTER, CENTER);
        textSize(width/80+height/80);
        text(frontline.abilities[1][i].name, width/3.75+(i*width/3.5), height-height/6);
        let abilityCostText = "Cost: "  + frontline.abilities[1][i].cost + " Energy";
        text(abilityCostText, width/3.75+(i*width/3.5), height-height/8);
        textSize(width/150+height/150);
        text(frontline.abilities[1][i].description, width/3.75+(i*width/3.5), height-height/12);
        // what button to press to activate this ability
        let abilityButtonText = combatButtons[i][0];
        textAlign(LEFT, CENTER);
        textSize(width/60+height/60);
        text(abilityButtonText, width/7+(i*width/3.5), height-height/5);
        // if this is an ultimate, then let the player know
        if (frontline.abilities[1][i].ultimate === true) {
          textAlign(CENTER, CENTER);
          textSize(width/100+height/100);
          if (frontline.ultCharge === 100) {
            fill(0, 255, 0);
            text("Ultimate Ready!", width/3.75+(i*width/3.5), height-height/5);
          } else {
            fill(255, 0, 0);
            text("Ultimate Charging", width/3.75+(i*width/3.5), height-height/5);
          }
        }
      }
    pop();
    }
  }
  // if mouse is down, check if an ability is clicked, if not, shoot basic bullets
  // if an ability is clicked then shoot that ability in that direction / location
  mouseDown() {

  }
  // move frontline character, enemies, bullets, etc.
  moveSprites() {
    frontline.move();
    for (var i = 0; i < enemiesList.length; i++) {
      enemiesList[i].move();
    }
    for (var i = 0; i < playerBullets.length; i++) {
      playerBullets[i].move();
    }
    for (var i = 0; i < enemyBullets.length; i++) {
      enemyBullets[i].move();
    }
  }
  // when a key is pressed
  keyDown() {
    // if is ctrl, shift or space, set the current ability to the ability that
    // is assigned to that key, if already activated, then clicking will cancel it
    if (currentKeyPressed === 32 || currentKeyPressed === 16 || currentKeyPressed === 17) {
      if (currentCombatAbilityKey !== currentKeyPressed) {
        if (this.situation === "shoot") {
          this.setAbility();
        } else if (this.situation === "ability") {
          currentAbility = 0;
          this.situation = "shoot";
          this.setAbility();
        }
      } else if (currentCombatAbilityKey === currentKeyPressed) {
        currentAbility = 0;
        this.situation = "shoot";
        currentCombatAbilityKey = "none";
      }
    }
  }
  setAbility() {
    currentCombatAbilityKey = currentKeyPressed;
    for (var i = 0; i < frontline.abilities[1].length; i++) {
      let abilityButton = combatButtons[i][1];
      if (currentCombatAbilityKey === abilityButton) {
        currentAbility = frontline.abilities[1][i];
        this.situation = "ability";
      }
    }
  }
}
