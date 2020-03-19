class Player {
  constructor(name, maxHp, energyTurn, abilities) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.speed = width/100+height/100;
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
    this.energy = 0;
    this.energyBoost = 0;
    this.ultCharge = 0;
    this.frontlineTurns = 0;
    // if this char is tired (frontline for more than 2 turns)
    this.tired = false;
    this.energyTurn = energyTurn;
    // if this char used an ability this turn
    this.acted = false;
    // this is image
    this.avatar;
    // this char's abilities, [support, support], [support ult], [combat, combat], [combat ult]]
    this.abilities = abilities;
  }
  move() {
    
  }
}
