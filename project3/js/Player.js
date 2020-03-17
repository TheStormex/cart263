class Player {
  constructor(name, maxHp, energyTurn) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.energy = 0;
    this.ultCharge = 0;
    this.frontlineTurns = 0;
    this.tired = false;
    this.energyTurn = energyTurn;
  }
  
}
