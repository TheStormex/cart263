class PlayerAbility {
  constructor(name, type, cost, effects, description, button, ultimate, chargeGive, targets) {
    this.name = name;
    // support or combat
    this.type = type;
    // how much energy this costs to activate
    this.cost = cost;
    // what this ability does and how much it does each of it
    this.effects = effects;
    // how this ability is descibed to the player
    this.description = description;
    // what button to click to use this ability
    this.button = button;
    this.image;
    // if this is an ultimate ability
    this.ultimate = ultimate;
    // how much ult charge this gives
    this.chargeGive = chargeGive;
    // what characters this ability can target
    this.canTargets = targets;
    // the character(s) that are being targeted by this ability right now
    this.targets;
    // the character that is using this ability
    this.user;
    // if this ability has been used this turn (support only) so it cannot be used again
    this.used = false;
  }
  // when this ability happens, do its effects (spawn bullets or if is support ability, instant effect)
  happens() {
    if (this.type === "combat") {
      // remove the energy this costs
      frontline.energy -= this.cost;
      // for each effect this ability has, do them
      for (var i = 0; i < this.effects.length; i++) {
        switch (this.effects[i][0]) {
          case "damage":
            for (var i = 0; i < this.targets.length; i++) {
              this.targets[i].hp -= this.effects[i][1];
            }
            break;
          case "dash":
            // move the user in the current / last direction by the amount
            break;
          case "offense_up":
            break;
          case "offense_down":
            break;
          case "defense_up":
            break;
          case "defense_down":
            break;
          default:
        }
      }
    } else
    if (this.type === "support") {
      // remove the energy this costs
      currentChar.energy -= this.cost;
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
}

// effects: damage, heal,
