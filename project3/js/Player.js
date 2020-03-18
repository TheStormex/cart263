class Player {
  constructor(name, maxHp, energyTurn, abilities) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.energy = 0;
    this.ultCharge = 0;
    this.frontlineTurns = 0;
    this.tired = false;
    this.energyTurn = energyTurn;
    // this is image
    this.avatar;
    // this char's abilities, [support, support], [support ult], [combat, combat], [combat ult]]
    this.abilities = abilities;
  }

}
