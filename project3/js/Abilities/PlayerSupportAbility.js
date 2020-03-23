class PlayerSupportAbility {
  constructor(name, cost, effects, description, button, ultimate, chargeGive) {
    this.name = name;
    // how much energy this costs to activate
    this.cost = cost;
    // what this ability does
    this.effects = effects;
    // how this ability is descibed to the player
    this.description = description;
    // what button to click to use this ability
    this.button = button;
    this.image;
    // if this is an ultimate ability
    this.ultimate = ultimate;
    // how much ult charge this gives upon use
    this.chargeGive = chargeGive;
    // the character that is using this ability
    this.user;
    // if this ability has been used this turn so it cannot be used again
    this.used = false;
  }
  // when this ability happens, do its effects (spawn bullets or if is support ability, instant effect)
  happens() {
      // remove the energy this costs
      this.user.energy -= this.cost;
      // for each effect, apply
      for (var i = 0; i < this.effects.length; i++) {
        switch (this.effects[i][0]) {
          case "heal":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp += this.effects[i][1];
            }
            break;
          case "offense_up":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp += this.effects[i][1];
            }
            break;
          case "offense_down":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp += this.effects[i][1];
            }
            break;
          case "defense_up":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp += this.effects[i][1];
            }
            break;
          case "defense_down":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp += this.effects[i][1];
            }
            break;
          default:

        }
        this.effects[i]
      }
  }
}

// effects: damage, heal,
