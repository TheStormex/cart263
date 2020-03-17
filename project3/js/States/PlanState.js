class PlanState {
  constructor() {

  }
  draw() {
    // draw players, enemies, selected player stats on bottom, click on support skills to use it, mouse over to see what it does
    // ult charge, health, energy,
    drawCommonUI();
    this.drawChars();
    this.drawPlayerMenu();
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
      fill(255);
      rectMode(CENTER, CENTER);
      text(playersList[i].name, width*(i+1)/(playersList.length+1), height/2-height/7);
      // replace with images later
      rect(width*(i+1)/(playersList.length+1), height/2, width/10, height/7);
      // health bar
      fill(255);
      rect(width*(i+1)/(playersList.length+1), height/2-height/10, width/10, height/40);
      fill(255, 0 ,0);
      rectMode(CORNER);
      rect(width*(i+1)/(playersList.length+1)-width/20, height/2-height/10-height/80, playersList[i].hp*(width/10)/playersList[i].maxHp, height/40);
    }
    for (var i = 0; i < enemiesList.length; i++) {
      fill(255);
      rectMode(CENTER, CENTER);
      text(enemiesList[i].name, width*(i+1)/(enemiesList.length+1), height/6-height/10);
      rect(width*(i+1)/(enemiesList.length+1), height/5, width/10, height/7);
    }
    pop();
  }

  drawPlayerMenu() {
    push();
    noStroke();
    rectMode(CENTER, CENTER);
    pop();
  }
}
