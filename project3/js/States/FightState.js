class FightState {
  constructor() {
    // shoot - the player uses the mouse to shoot normal bullets
    // ability - the player is activating an ability
    this.situation = "shoot";
  }
  draw() {
    background(200);
    // move, check for actions and draw frontline player, enemies, movements bullets
    this.drawSprites();
    this.drawUI();
  }
  drawSprites() {
    // if screen is resized, move each char to new locations
    push();
    // draw enemies
    for (var i = 0; i < enemiesList.length; i++) {
      enemiesList[i].move();
      enemiesList[i].wrap();
      enemiesList[i].contact();
      enemiesList[i].checkAlive();
      if (enemiesList[i].alive === false) {
        enemiesList.splice(i, 1);
      }
      enemiesList[i].draw();
      enemiesList[i].shoot();
    }
    // draw projectiles
    for (var i = 0; i < projectilesList.length; i++) {
      projectilesList[i].move();
      projectilesList[i].draw();
      projectilesList[i].contact();
      if (typeof projectilesList[i] != "undefined") {
        projectilesList[i].wrap();
      }
      // if this projectile is to be destroyed now, then removed it from the array
      // if (projectilesList[i].isDestroyed === true) {
      //   projectilesList.splice(i, 1);
      // }
    }
    noStroke();
    // draw the player frontline character
    fill(0,255,0);
    frontline.move();
    let vector1 = createVector(frontline.x, frontline.y);
    let vector2 = createVector(mouseX - frontline.x, mouseY - frontline.y);
    frontline.angle = vector2.heading();
    imageMode(CENTER);
    image(frontline.images.front, frontline.x, frontline.y, width/20, width/20);
    pop();
  }
  drawUI() {
    // draw player head, name, health, energy, ultcharge;
    drawCommonUI();
    this.drawPlayerMenu();
    // draw the aim triangle
    push();
    noStroke();
    fill(250, 0, 0);
    translate(frontline.x, frontline.y);
    rotate(frontline.angle+PI/2);
    triangle(0, -height/10, -width/80, -height/18, width/80, -height/18);
    pop();
    // draw enemies health bar
    // health bar
    for (var i = 0; i < enemiesList.length; i++) {
      push();
      rectMode(CENTER);
      fill(255);
      rect(enemiesList[i].x, enemiesList[i].y-height/10, width/10, height/40);
      fill(255, 0 ,0);
      rectMode(CORNER);
      let healthBarLength = map(enemiesList[i].hp, 0, enemiesList[i].maxHp, 0, width/10);
      rect(enemiesList[i].x-width/20, enemiesList[i].y-height/10-height/80, healthBarLength, height/40);
      pop();
    }
    // draw progess bar of the fight until go back to plan state
    push();
    rectMode(CORNER);
    fill(255);
    noStroke();
    rect(0, height-height/3, width, height/50);
    let progressBarLength = map(currentFightTime/100, 0, fightTime, 0, width);
    colorMode(HSB, 100);
    let colorOfBar = map(currentFightTime/100, 0, fightTime, 0, 100);
    fill(colorOfBar, 100, 100);
    rect(0, height-height/3, progressBarLength, height/50);
    pop();
  }
  // draw the combat skills the characters can use in the UI box
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
        // name, cost and ability, cooldown
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
        // the cooldown of each ability if it is on cooldown
        if (frontline.abilities[1][i].onCooldown === true) {
          text(frontline.abilities[1][i].cooldownLeft, width/3.75+(i*width/3.5), height-height/5);
        }
      }
    pop();
    }
  }
  // if mouse is down, check if an ability is clicked, if not, shoot basic bullets
  // if an ability is clicked then shoot that ability in that direction / location
  mouseDown() {
    if (this.situation === "shoot") {
      if (frontline.basicBulletCooldown === false) {
        let playerBasicBullet = new Bullet(frontline, frontline.x, frontline.y, width*(frontline.basicBullet.speed/2)/100+height*(frontline.basicBullet.speed/2)/100, frontline.angle, frontline.basicBullet.moveType, frontline.basicBullet.targets, frontline.basicBullet.effects, width*(frontline.basicBullet.size/2)/100+height*(frontline.basicBullet.size/2)/100, frontline.basicBullet.changes, frontline.basicBullet.images, frontline.basicBullet.wall, frontline.basicBullet.ifHit, frontline.basicBullet.timer);
        projectilesList.push(playerBasicBullet);
        frontline.basicBulletCooldown = true;
        setTimeout(function() {frontline.basicBulletCooldown = false}, frontline.basicBullet[11]);
      }
    } else if (this.situation === "ability") {
      currentAbility.user = frontline;
      currentAbility.happens();
      // if this is a combat ability with a cooldown, then after use, set the timer
      let thisAbility = currentAbility;
      // if (thisAbility.cooldown !== 0) {
      //   thisAbility.onCooldown = true;
      //   thisAbility.cooldownLeft = thisAbility.cooldown;
      //   console.log(thisAbility.cooldownLeft);
      //   thisAbility.cooldownTimer = setInterval(function() {
      //     thisAbility.cooldownLeft -= 1;
      //     console.log(thisAbility);
      //     if (thisAbility.cooldownLeft <= 0) {
      //       thisAbility.onCooldown = false;
      //       clearInterval(thisAbility.cooldownTimer);
      //     }
      //   }, 1000, thisAbility);
      // }
      currentCombatAbilityKey = "0";
      this.situation = "shoot";
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
        let abilityToBeActivated = frontline.abilities[1][i];
        // if this ability is not an ultimate and the player character does not have enough to use it, and if they have enough energy to use it, and it is not on cooldown then it works
        if (abilityToBeActivated.ultimate === false && currentChar.ultCharge < 100 && currentChar.energy - abilityToBeActivated.cost >= 0 && abilityToBeActivated.cooldownLeft === 0) {
          currentAbility = frontline.abilities[1][i];
          this.situation = "ability";
        } else {
          currentAbility = 0;
          currentCombatAbilityKey = 0;
          console.log("not enough");
          console.log(abilityToBeActivated.cooldownLeft);
        }
      }
    }
  }
}
