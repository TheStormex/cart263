class PlayerAbility {
  constructor(name, type, cost, effects, button, ultimate, chargeGive, targets) {
    this.name = name;
    // support or combat
    this.type = type;
    // how much energy this costs to activate
    this.cost = cost;
    this.effects = effects;
    // what button to click to use this ability
    this.button = button;
    this.image;
    // if this is an ultimate ability
    this.ultimate = ultimate;
    // how much ult charge this gives
    this.chargeGive = chargeGive;
    // what characters this ability can target
    this.targets = targets;
  }
}

// effects: damage, heal,
