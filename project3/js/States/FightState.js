class FightState {
  constructor() {

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
}
