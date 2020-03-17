class PlanState {
  constructor() {
    // if the mouse is over a player character, get that character's name
    this.mouseOver = 0;
  }
  draw() {
    // draw players, enemies, selected player stats on bottom, click on support skills to use it, mouse over to see what it does
    // ult charge, health, energy,
    this.drawChars();
    this.mouseOverPlayer();
    drawCommonUI(currentChar);
    this.drawPlayerMenu();
  }
  // if the mouse is over an player avatar, that player character becomes the selected current character
  mouseOverPlayer() {
    for (var i = 0; i < playersList.length; i++) {
      if (mouseX > width*(i+1)/(playersList.length+1)-width/12 && mouseX < width*(i+1)/(playersList.length+1)-width/12+width/6  && mouseY > height/2-height/6 && mouseY < height/2-height/6+height/3) {
        currentChar = playersList[i];
        this.mouseOver = playersList[i];
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

  drawPlayerMenu() {
    push();
    noStroke();
    rectMode(CENTER, CENTER);
    pop();
  }

  // if mouse is down
  // if the character that mouse is over is not the front line, click to make frontline
  mouseDown() {
    if (this.mouseOver != 0) {
      frontline = this.mouseOver;
    }
  }
}
