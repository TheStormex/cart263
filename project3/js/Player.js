class Player {
  constructor(name, maxHp, energyTurn, maxEnergy, abilities, basicBullet, images) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.speed = width/200+height/200;
    this.x = width/2;
    this.y = height/2;
    this.angle = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = width/20;
    this.energy = 0;
    this.maxEnergy = maxEnergy;
    // bonus energy gained if not move last turn
    this.energyBoost = 0;
    this.offenseChange = 0;
    this.defenseChange = 0;
    this.ultCharge = 0;
    this.frontlineTurns = 0;
    // if this char is tired (frontline for more than 2 turns)
    this.tired = false;
    this.energyTurn = energyTurn;
    // if this char used an ability this turn
    this.acted = false;
    // this character's basic bullet
    this.basicBullet = basicBullet;
    // this is image
    this.images;
    // this char's abilities, [support, support], [support ult], [combat, combat], [combat ult]]
    this.abilities = abilities;
  }
  move() {
    this.vx = 0;
    this.vy = 0;
    if (keyIsDown(87)) {
      this.vy = -this.speed;
    }
    if (keyIsDown(65)) {
      this.vx = -this.speed;
    }
    if (keyIsDown(83)) {
      this.vy = this.speed;
    }
    if (keyIsDown(68)) {
      this.vx = this.speed;
    }
    this.x += this.vx;
    this.y += this.vy;
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
