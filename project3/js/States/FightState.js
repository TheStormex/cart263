class FightState {
  constructor() {
    this.abilityClicked = 0;
  }
  draw() {
    // draw frontline player, enemies, movements bullets
    this.drawCharSprites();
    this.drawUI();
  };
  drawCharSprites() {

  }
  drawUI() {
    // draw player head, name, health, energy, ultcharge;
    drawCommonUI();
  }
  // if mouse is down, check if an ability is clicked, if not, shoot basic bullets
  // if an ability is clicked then shoot that ability in that direction / location
  mouseDown() {

  }
}
