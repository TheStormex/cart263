class PlanState {
  constructor() {
    // if the mouse is over a player character, get that character's name
    this.mouseOver = 0;
    this.useAbility = 0;
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

        break;
      case "choose":

        break;
      case "choose":

        break;
      default:
        console.log("error");
    }
    for (var i = 0; i < playersList.length; i++) {
      if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
        this.mouseOver = playersList[i];
        if (this.useAbility === 0) {
          currentChar = playersList[i];
        }
      }
    }
  }

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
        rect(width/7+(i*width/3), height-height/4.5, width/3.5, height/6);
        textAlign(CENTER, CENTER);
        textSize(width/60+height/60);
        text(currentChar.abilities[0][i].name, width/3.5+(i*width/3), height-height/6);
      }
      // ultimate ability if is a supporting skill
      rect(width-width/7, height-height/4.5, width/10, height/6);
      pop();
    }
  }

  // if mouse is down and a player character is not using an ability,
  // if the character that mouse is over is not the front line, click to make frontline
  // if a character is using an ability, if over an appropriate target, then ability happens
  mouseDown() {
    if (this.mouseOver != 0) {
      frontline = this.mouseOver;
    }
  }
}
