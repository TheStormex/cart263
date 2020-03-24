class PlanState {
  constructor() {
    // if the mouse is over a player character, get that character's name
    this.mouseOver = 0;
    this.situation = "choose";
  }
  draw() {
    // draw players, enemies, selected player stats on bottom, click on support skills to use it, mouse over to see what it does
    // ult charge, health, energy,
    this.drawChars();
    this.mouseOverPlayer();
    drawCommonUI();
    this.drawPlayerMenu();
  }
  // if the mouse is over an player avatar, that player character becomes the selected character, if not using an ability, then that character becomes the current character
  mouseOverPlayer() {
    this.mouseOver = 0;
    // draw depending on the situation: choose, ability, happen
    switch (this.situation) {
      case "choose":
        for (var i = 0; i < playersList.length; i++) {
          if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
            this.mouseOver = playersList[i];
            currentChar = playersList[i];
          }
        }
        // if a character is selected, then if mouse over one of their abilities, put it into the mouse over
        if (currentChar !== "none") {
          for (var i = 0; i < currentChar.abilities[0].length; i++) {
            if (mouseX > width/7+(i*width/3.5) && mouseX < width/7+(i*width/3.5)+width/4 && mouseY > height-height/4.5 && mouseY < height-height/4.5+height/6) {
              this.mouseOver = currentChar.abilities[0][i];
            }
          }
        }
        break;
      case "ability":
        // check what is being moused over, player or enemy
        for (var i = 0; i < playersList.length; i++) {
          if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
            this.mouseOver = playersList[i];
          }
        }
        for (var i = 0; i < enemiesList.length; i++) {
          if (mouseX > width*(i+1)/(enemiesList.length+1)-width/12 && mouseX < width*(i+1)/(enemiesList.length+1)-width/12+width/6  && mouseY > height/5-height/6 && mouseY < height/5-height/6+height/3) {
            this.mouseOver = enemiesList[i];
          }
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
      rectMode(CENTER, CENTER);
      // if this is the frontline character, mark it
      if (frontline.name === playersList[i].name) {
        fill(255, 150, 0);
        rect(width*(i+1)/(playersList.length+1), height/2, width/6, height/3);
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
    }
    // draw the enemy sprites
    for (var i = 0; i < enemiesList.length; i++) {
      fill(255);
      rectMode(CENTER, CENTER);
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
        fill(255);
        rectMode(CORNER);
        rect(width/7+(i*width/3.5), height-height/4.5, width/4, height/6);
        // name, cost and ability
        noStroke();
        fill(0);
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
      }
    pop();
    }
  }

  // if mouse is down and a player character is not using an ability,
  // if the character that mouse is over is not the front line, click to make frontline
  // if a character is using an ability, if over an appropriate target, then ability happens
  mouseDown() {
    if (this.mouseOver != 0) {
      if (this.situation === "choose") {
        // if a player is moused over, that player character is now the front line
        if (playersList.includes(this.mouseOver)) {
          frontline = this.mouseOver;
          // if a player's ability is moused over, then clicking selects that ability to be used
        } else if (currentChar.abilities[0].includes(this.mouseOver)) {
          // if this ability is not an ultimate and the player character does not have enough to use it, then it works
          if (this.mouseOver.ultimate !== true && currentChar.ultCharge < 100) {
            currentAbility = this.mouseOver;
            // remove the ability from mouseOver since what will be mousedOver will be a character
            this.mouseOver = 0;
            this.situation = "ability";
          } else {
            console.log("not enough");
          }
        }
      }
      if (this.situation === "ability") {
        // if this ability can target this moused over character
        if (this.mouseOver !== 0) {
                  console.log(currentAbility);
          if (currentAbility.effects[currentAbility.currentEffect].canTargets.includes(this.mouseOver)) {
            currentAbility.effects[currentAbility.currentEffect].targets.push(this.mouseOver);
            console.log(currentAbility.effects[currentAbility.currentEffect].targets);
          }
            currentAbility.targets = this.mouseOver;
            currentAbility.happens();
        }
      }
    }
  }
}
