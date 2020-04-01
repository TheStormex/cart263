class Enemy {
  constructor(name, maxHp, size, abilities) {
    this.name = name;
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.maxHp = maxHp;
    this.speed = width/200+height/200;
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
    this.offenseChange = 0;
    this.defenseChange = 0;
    this.size = size;
    this.abilities = abilities;
    this.currentAbility;
  }
  draw() {
    push();
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
  move() {
    let moveType = this.currentAbility.moves;
    if (moveType === "noise")  {
      this.vx += random(-width/1000, width/1000);
      this.vx = constrain(this.vx, -width/500, width/500);
      this.vy += random(-height/1000, height/1000);
      this.vy = constrain(this.vy, -height/500, height/500);
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  wrap() {
    let wrapType = this.currentAbility.wrap;
    if (wrapType === "walls") {
      // prevent going outside of walls
      if (this.x-this.size/2 <= 0) {
        this.x = this.size/2;
      }
      if (this.x+this.size/2 > width) {
        this.x = width-this.size/2;
      }
      if (this.y-this.size/2 < 0) {
        this.y = this.size/2;
      }
      if (this.y+this.size/2 > height-height/3) {
        this.y = height-height/3-this.size/2;
      }
    }
  }
}
