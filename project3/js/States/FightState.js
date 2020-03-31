class FightState {
  constructor() {
    this.abilityClicked = 0;
  }
  draw() {
    background(200);
    // draw frontline player, enemies, movements bullets
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
        // if activated, it is highlighted
        if (mouseOver.name === frontline.abilities[1][i].name) {
          fill(0);
        } else {
          fill(255);
        }
        rectMode(CORNER);
        rect(width/7+(i*width/3.5), height-height/4.5, width/4, height/6);
        // name, cost and ability
        noStroke();
        // if activated, it is highlighted
        if (mouseOver.name === frontline.abilities[1][i].name) {
          fill(255);
        } else {
          fill(0);
        }
        textAlign(CENTER, CENTER);
        textSize(width/80+height/80);
        text(frontline.abilities[1][i].name, width/3.75+(i*width/3.5), height-height/6);
        let abilityCostText = "Cost: "  + frontline.abilities[1][i].cost + " Energy";
        text(abilityCostText, width/3.75+(i*width/3.5), height-height/8);
        textSize(width/150+height/150);
        text(frontline.abilities[1][i].description, width/3.75+(i*width/3.5), height-height/12);
        // if this is an ultimate, then let the player know
        if (frontline.abilities[1][i].ultimate === true) {
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
}
