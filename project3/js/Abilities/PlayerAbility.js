class PlayerAbility {
  constructor(name, cost, effects, description, button, image, ultimate, chargeGive, cooldown) {
    this.name = name;
    // how much energy this costs to activate
    this.cost = cost;
    // what this ability does
    this.effects = effects;
    // how this ability is descibed to the player
    this.description = description;
    // what button to click to use this ability
    this.button = button;
    this.image = image;
    // if this is an ultimate ability
    this.ultimate = ultimate;
    // how much ult charge this gives upon use
    this.chargeGive = chargeGive;
    // wait time before this ability can be used again (combat only)
    this.cooldown = cooldown;
    // the cooldown number shown to the player
    this.cooldownLeft = 0;
    // if this ability is on cooldown
    this.onCooldown = false;
    // the ability's cooldown timer
    this.cooldownTimer;
    // the character that is using this ability
    this.user;
    // if this ability has been used this turn so it cannot be used again
    this.used = false;
    // which step is currently happening
    this.currentStep = 0;
    // which effect is currently happening
    this.currentEffect = 0;
    // how many steps this ability has before it is finished
    this.steps = 0;
  }
  // when this ability happens, do its effects (spawn bullets or if is support ability, instant effect)
  happens() {
    // check if the ability did what it needs to give ult charge
    let hitTarget = false;
    let healed = false;
    // remove the energy this costs and set the player's acted to yes
    this.user.energy -= this.cost;
    this.user.acted = true;
    // for each effect, apply
    for (var i = 0; i < this.effects.length; i++) {
      let theEffect = this.effects[i];
      switch (this.effects[i].type) {
        case "damage":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].hp -= round(theEffect.amount * (1+this.user.offenseChange*0.01) * (1+theEffect.targets[i].defenseChange*0.01));
            theEffect.targets[i].hp = constrain(theEffect.targets[i].hp, 0, theEffect.targets[i].maxHp);
          }
          break;
        case "heal":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            let targetOldHp = theEffect.targets[i].hp;
            theEffect.targets[i].hp += theEffect.amount;
            theEffect.targets[i].hp = constrain(theEffect.targets[i].hp, 0, theEffect.targets[i].maxHp);
            // if the target's health went up after being healed, then give heal ult charge
            if (targetOldHp < theEffect.targets[i].maxHp && theEffect.targets[i].hp > targetOldHp) {
              healed = true;
            }
          }
          break;
        case "offense_up":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].offenseChange += theEffect.amount;
          }
          break;
        case "offense_down":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].offenseChange -= theEffect.amount;
          }
          break;
        case "defense_up":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].defenseChange += theEffect.amount;
          }
          break;
        case "defense_down":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].defenseChange -= theEffect.amount;
          }
          break;
        case "ramp":
          for (var i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].energy += theEffect.amount;
            theEffect.targets[i].energy = constrain(theEffect.targets[i].energy, 0, theEffect.targets[i].maxEnergy);
          }
        // combat only effects
        case "bullet":
          for (var i = 0; i < theEffect.amount; i++) {
          //  let newAbilityBullet = new Bullet();
          }
          break;
        case "dash":
          break;
        default: console.log("error");
      }
      for (var i = 0; i < this.chargeGive.length; i++) {
        switch (this.chargeGive[i][1]) {
          case "use":
            this.user.ultCharge += this.chargeGive[i][0];
            break;
          case "heal":
            if (healed === true) {
              this.user.ultCharge += this.chargeGive[i][0];
            }
            break;
          default:
        }
      }
      // this ability is now used this turn
      this.used = true;
      // if this is a combat ability with a cooldown, then after use, set the timer
      if (this.cooldown !== 0) {
        this.onCooldown = true;
        this.cooldownLeft = this.cooldown;
        console.log(this.cooldownLeft);
        this.cooldownTimer = setInterval(() => {
          this.cooldownLeft -= 1;
          console.log(this);
          if (this.cooldownLeft === 0) {
            this.onCooldown = false;
            clearInterval(this.cooldownTimer);
          }
        }, 1000);
        intervalsList.push(this.cooldownTimer);
      }
      // remove all targets from the ability effect since ability effect is finished
      theEffect.targets = [];
    }
  }
}

// effects: damage, heal,
