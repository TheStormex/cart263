class Enemy {
  constructor(name, maxHp, size, abilities) {
    this.name = name;
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.speed = width/200+height/200;
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
    this.abilities = abilities;
    this.currentAbility;
  }
  move() {
    let moveType = this.currentAbility.moves;
    if (moveType === "noise")  {

    }
  }
}