class FightState {
  constructor() {
    this.abilityClicked = 0;
  }
  draw() {
    // draw frontline player, enemies, movements bullets
    this.moveSprites();
    this.drawCharSprites();
    this.drawUI();
  };
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

  }
  // if mouse is down, check if an ability is clicked, if not, shoot basic bullets
  // if an ability is clicked then shoot that ability in that direction / location
  mouseDown() {

  }
  // move frontline character, enemies, bullets, etc.
  moveSprites() {
    frontline.move();
    for (var i = 0; i < enemiesList.length; i++) {
      enemiesList[i]
    }
    for (var i = 0; i < playerBullets.length; i++) {
      playerBullets[i]
    }
    for (var i = 0; i < enemyBullets.length; i++) {
      enemyBullets[i]
    }
  }
}
