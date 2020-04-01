class PlanState {
  constructor() {
    // if the mouse is over a player character, get that character's name
    this.situation = "choose";
    this.currentAbilityStepNumber = 0;
  }
  draw() {
    background(100);
    // draw players, enemies, selected player stats on bottom, click on support skills to use it, mouse over to see what it does
    // ult charge, health, energy,
    this.drawChars();
    this.mouseOverPlayer();
    drawCommonUI();
    this.drawPlayerMenu();
    this.drawExtraUI();
  }
  // if the mouse is over an player avatar, that player character becomes the selected character, if not using an ability, then that character becomes the current character
  mouseOverPlayer() {
    mouseOver = 0;
    // draw depending on the situation: choose, ability, happen
    switch (this.situation) {
      case "choose":
        for (var i = 0; i < playersList.length; i++) {
          if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
            mouseOver = playersList[i];
            currentChar = playersList[i];
          }
        }
        // if a character is selected, then if mouse over one of their abilities, put it into the mouse over
        if (currentChar !== "none") {
          for (var i = 0; i < currentChar.abilities[0].length; i++) {
            if (mouseX > width/7+(i*width/3.5) && mouseX < width/7+(i*width/3.5)+width/4 && mouseY > height-height/4.5 && mouseY < height-height/4.5+height/6) {
              mouseOver = currentChar.abilities[0][i];
            }
          }
        }
        // check if mousing over the fight button
        if (mouseX > width-width/10-width/20 && mouseX < width-width/10+width/10-width/20 && mouseY > height/2-height/30 && mouseY < height/2+height/15-height/30) {
          mouseOver = "fight"
        }
        break;
      case "ability":
        // check what is being moused over, player or enemy
        for (var i = 0; i < playersList.length; i++) {
          if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
            mouseOver = playersList[i];
          }
        }
        for (var i = 0; i < enemiesList.length; i++) {
          if (mouseX > width*(i+1)/(enemiesList.length+1)-width/12 && mouseX < width*(i+1)/(enemiesList.length+1)-width/12+width/6  && mouseY > height/5-height/6 && mouseY < height/5-height/6+height/3) {
            mouseOver = enemiesList[i];
          }
        }
        // check if mousing over the cancel button
        if (mouseX > width-width/10-width/20 && mouseX < width-width/10+width/10-width/20 && mouseY > height/2-height/30 && mouseY < height/2+height/15-height/30) {
          mouseOver = "cancel"
        }
        break;
      case "happen":

        break;
      default:
        console.log("error");
    }
  }


  // draw all characters
  drawChars() {
    push();
    noStroke();
    textSize(width/100+height/100);
    textAlign(CENTER, CENTER);
    rectMode(CENTER, CENTER);
    fill(255);
    // check enemy / player amount, for each enemy / player, draw name, sprites and stats
    for (var i = 0; i < playersList.length; i++) {
      textSize(width/100+height/100);
      rectMode(CENTER, CENTER);
      // mark the selected character with a square depending on the situation, if choose, then friendly only (can be selected to act)
      // if ability, then those who can be selected will glow and those moused over will have another square
      if (this.situation === "choose") {
        if (currentChar.name === playersList[i].name) {
          fill(0, 100, 255);
          rect(width*(i+1)/(playersList.length+1), height/2, width/5, height/3);
        }
      } else if (this.situation === "ability") {
        if (currentAbility.currentEffect.canTargetsList.includes(playersList[i])) {
          fill(255, 200, 50);
          rect(width*(i+1)/(playersList.length+1), height/2, width/5, height/3);
        }
      }

      // if this is the frontline character, mark it
      if (frontline.name === playersList[i].name) {
        fill(255, 150, 0);
        rect(width*(i+1)/(playersList.length+1), height/2, width/7, height/3.2);
      }
      // replace with images later
      fill(255);
      rect(width*(i+1)/(playersList.length+1), height/2, width/10, height/7);
      // health bar
      fill(255);
      rect(width*(i+1)/(playersList.length+1), height/2-height/10, width/10, height/40);
      fill(255, 0 ,0);
      rectMode(CORNER);
      rect(width*(i+1)/(playersList.length+1)-width/20, height/2-height/10-height/80, playersList[i].hp*(width/10)/playersList[i].maxHp, height/40);
      // names and hp amount
      fill(255)
      let healthText = playersList[i].hp + " " + "/" + " " + playersList[i].maxHp;
      textAlign(CENTER, CENTER);
      text(playersList[i].name, width*(i+1)/(playersList.length+1), height/2-height/7);
      text(healthText, width*(i+1)/(playersList.length+1), height/2-height/10);
      // if is frontline, show it, if not, say click to make front line
      if (playersList[i].name === frontline.name) {
        text("Frontline", width*(i+1)/(playersList.length+1), height/2+height/9);
      } else {
        text("Click to make Frontline", width*(i+1)/(playersList.length+1), height/2+height/9);
      }
      // draw the status changes of each character if they are not 0
      rectMode(CENTER);
      if (playersList[i].offenseChange !== 0) {
        fill(255, 0, 0)
        rect(width*(i+1)/(playersList.length+1)+width/12, height/2-height/18, width/20, height/20);
        fill(0);
        textSize(width/80, height/80);
        text("ATK", width*(i+1)/(playersList.length+1)+width/12, height/2-height/18-height/80);
        let offenseText;
        if (playersList[i].offenseChange > 0) {
          offenseText = "+" + playersList[i].offenseChange + "%";
        } else if (playersList[i].offenseChange < 0) {
          offenseText = playersList[i].offenseChange + "%";
        }
        text(offenseText, width*(i+1)/(playersList.length+1)+width/12, height/2-height/23);
      }
      if (playersList[i].defenseChange !== 0) {
        fill(0, 255, 0)
        rect(width*(i+1)/(playersList.length+1)+width/12, height/2, width/20, height/20);
        fill(0);
        textSize(width/80, height/80);
        text("DEF", width*(i+1)/(playersList.length+1)+width/12, height/2-height/80);
        let defenseText;
        if (playersList[i].defenseChange > 0) {
          defenseText = "+" + playersList[i].defenseChange + "%";
        } else if (playersList[i].defenseChange < 0) {
          defenseText = playersList[i].defenseChange + "%";
        }
        text(defenseText, width*(i+1)/(playersList.length+1)+width/12, height/2+height/80);
      }
    }
    // draw the enemy sprites
    for (var i = 0; i < enemiesList.length; i++) {
      textSize(width/100+height/100);
      fill(255);
      rectMode(CENTER, CENTER);
      // if the current ability can select enemies, mark them
      if (this.situation === "ability") {
        if (currentAbility.currentEffect.canTargetsList.includes(enemiesList[i])) {
          fill(255, 200, 50);
          rect(width*(i+1)/(enemiesList.length+1), height/6, width/5, height/3.4);
        }
      }
      fill(255);
      rect(width*(i+1)/(enemiesList.length+1), height/5, width/10, height/7);
      // health bar
      fill(255);
      rect(width*(i+1)/(enemiesList.length+1), height/5-height/10, width/10, height/40);
      fill(255, 0 ,0);
      rectMode(CORNER);
      rect(width*(i+1)/(enemiesList.length+1)-width/20, height/5-height/10-height/80, enemiesList[i].hp*(width/10)/enemiesList[i].maxHp, height/40);
      // names and hp amount
      fill(255)
      let healthText = enemiesList[i].hp + " " + "/" + " " + enemiesList[i].maxHp;
      textAlign(CENTER, CENTER);
      text(enemiesList[i].name, width*(i+1)/(enemiesList.length+1), height/5-height/7);
      text(healthText, width*(i+1)/(enemiesList.length+1), height/5-height/10);
      // draw the status changes of each character if they are not 0
      rectMode(CENTER);
      if (enemiesList[i].offenseChange !== 0) {
        fill(255, 0, 0)
        rect(width*(i+1)/(enemiesList.length+1)+width/12, height/5-height/18, width/20, height/20);
        fill(0);
        textSize(width/80, height/80);
        text("ATK", width*(i+1)/(enemiesList.length+1)+width/12, height/5-height/18-height/80);
        let offenseText2;
        if (enemiesList[i].offenseChange > 0) {
          offenseText2 = "+" + enemiesList[i].offenseChange + "%";
        } else if (playersList[i].offenseChange < 0) {
          offenseText2 = enemiesList[i].offenseChange + "%";
        }
        text(offenseText, width*(i+1)/(enemiesList.length+1)+width/12, height/2-height/23);
      }
      if (enemiesList[i].defenseChange !== 0) {
        fill(0, 255, 0)
        rect(width*(i+1)/(enemiesList.length+1)+width/12, height/5, width/20, height/20);
        fill(0);
        textSize(width/80, height/80);
        text("DEF", width*(i+1)/(enemiesList.length+1)+width/12, height/5-height/80);
        let defenseText2;
        if (enemiesList[i].defenseChange > 0) {
          defenseText2 = "+" + enemiesList[i].defenseChange + "%";
        } else if (enemiesList[i].defenseChange < 0) {
          defenseText2 = enemiesList[i].defenseChange + "%";
        }
        text(defenseText2, width*(i+1)/(enemiesList.length+1)+width/12, height/5+height/80);
      }
    }
    pop();
  }


  // draw the supporting skills the characters can use in the UI box
  drawPlayerMenu() {
    if (currentChar != "none") {
      push();
      // 2 supporting skills
      for (var i = 0; i < currentChar.abilities[0].length; i++) {
        strokeWeight(3);
        stroke(0);
        // if moused over, it is highlighted
        if (mouseOver.name === currentChar.abilities[0][i].name) {
          fill(0);
        } else {
          fill(255);
        }
        rectMode(CORNER);
        rect(width/7+(i*width/3.5), height-height/4.5, width/4, height/6);
        // name, cost and ability
        noStroke();
        // if moused over, it is highlighted
        if (mouseOver.name === currentChar.abilities[0][i].name) {
          fill(255);
        } else {
          fill(0);
        }
        textAlign(CENTER, CENTER);
        textSize(width/80+height/80);
        text(currentChar.abilities[0][i].name, width/3.75+(i*width/3.5), height-height/6);
        let abilityCostText = "Cost: "  + currentChar.abilities[0][i].cost + " Energy";
        text(abilityCostText, width/3.75+(i*width/3.5), height-height/8);
        textSize(width/150+height/150);
        text(currentChar.abilities[0][i].description, width/3.75+(i*width/3.5), height-height/12);
        // if this is an ultimate, then let the player know
        if (currentChar.abilities[0][i].ultimate === true) {
          textSize(width/100+height/100);
          if (currentChar.ultCharge === 100) {
            fill(0, 255, 0);
            text("Ultimate Ready!", width/3.75+(i*width/3.5), height-height/5);
          } else {
            fill(255, 0, 0);
            text("Ultimate Charging", width/3.75+(i*width/3.5), height-height/5);
          }
        }
        // if this ability has been used this turn and cannot be used again
        if (currentChar.abilities[0][i].used === true) {
          textSize(width/100+height/100);
          fill(255, 0, 0);
          text("Used This Turn", width/3.75+(i*width/3.5), height-height/5);
        }
      }
    pop();
    }
  }

  // draw the buttons for canceling abilities, for going to the fight mode
  drawExtraUI() {
    // draw the button for canceling ability if an ability is being used if it has not been used partly
    if (this.situation === "ability") {
      if (currentAbility.currentStep === 1) {
        push();
        rectMode(CENTER);
        noStroke();
        // if moused over, it is highlighted
        if (mouseOver === "cancel") {
          fill(0);
        } else {
          fill(255,50,0);
        }
        rect(width-width/10, height/2, width/10, height/15);
        // if moused over, it is highlighted
        if (mouseOver === "cancel") {
          fill(255, 0, 0);
        } else {
          fill(0);
        }
        textAlign(CENTER, CENTER);
        textSize(width/120+height/120);
        text("Cancel Ability", width-width/10, height/2);
        pop();
      }
    }
    // draw the button to go to the fight mode
    if (this.situation === "choose") {
      push();
      rectMode(CENTER);
      noStroke();
      // if moused over, it is highlighted
      if (mouseOver === "fight") {
        fill(0);
      } else {
        fill(255,255,0);
      }
      rect(width-width/10, height/2, width/10, height/15);
      // if moused over, it is highlighted
      if (mouseOver === "fight") {
        fill(255, 255, 0);
      } else {
        fill(0);
      }
      textAlign(CENTER, CENTER);
      textSize(width/80+height/50);
      text("Fight!", width-width/10, height/2);
      pop();
    }
  }

  // if mouse is down and a player character is not using an ability,
  // if the character that mouse is over is not the front line, click to make frontline
  // if a character is using an ability, if over an appropriate target, then ability happens
  mouseDown() {
    if (mouseOver != 0) {
      if (this.situation === "choose") {
        // if the fight button is clicked, go to fight state
        if (mouseOver === "fight") {
          currentChar = frontline;
          // for each enemy, give them a random moveset for the fight sequence
          for (var i = 0; i < enemiesList.length; i++) {
            let moveset = random(enemiesList[i].abilities);
            enemiesList[i].currentAbility = moveset;
            // if line then set it here
            if (enemiesList[i].currentAbility.moves === "line")  {
              enemiesList[i].angle = random(0, 360);
            }
          }
          whichScreen = FIGHT_STATE;
        }
        // if a player is moused over, that player character is now the front line
         else if (playersList.includes(mouseOver)) {
          frontline = mouseOver;
          // if a player's ability is moused over, then clicking selects that ability to be used
        } else if (currentChar.abilities[0].includes(mouseOver)) {
          // if this ability is not an ultimate and the player character does not have enough to use it, and if they have enough energy to use it, and it has not been used this turn then it works
          if (mouseOver.ultimate === false && currentChar.ultCharge < 100 && currentChar.energy - mouseOver.cost >= 0 && mouseOver.used === false) {
            currentAbility = mouseOver;
            // remove the ability from mouseOver since what will be mousedOver will be a character
            mouseOver = 0;
            currentAbility.currentStep = 1;
            currentAbility.currentEffect = currentAbility.effects[0];
            // if the first effect can target players, then make the canTargetsList into an array of all player characters, same if enemies
            if (currentAbility.currentEffect.canTargets === "players") {
              currentAbility.currentEffect.canTargetsList = playersList;
            } else if (currentAbility.currentEffect.canTargets === "enemies") {
              currentAbility.currentEffect.canTargetsList = enemiesList;
            }
            this.situation = "ability";
          } else {
            console.log("not enough");
          }
        }
      }
      if (this.situation === "ability") {
        // if this ability can target this moused over character activate ability
        if (mouseOver !== 0) {
        if (currentAbility.currentEffect.canTargetsList.includes(mouseOver)) {
            currentAbility.currentEffect.targets.push(mouseOver);
            console.log("works");
            currentAbility.user = currentChar;
            currentAbility.happens();
            this.situation = "choose";
          // if the cancel button is moused over, cancel the ability
          } else if (mouseOver === "cancel") {
            this.situation = "choose";
          }
        }
      }
    }
  }
}
