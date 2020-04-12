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
    for (let i = 0; i < this.effects.length; i++) {
      let theEffect = this.effects[i];
      switch (this.effects[i].type) {
        case "damage":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].hp -= round(theEffect.amount * (1+this.user.offenseChange*0.01) * (1+theEffect.targets[i].defenseChange*0.01));
            theEffect.targets[i].hp = constrain(theEffect.targets[i].hp, 0, theEffect.targets[i].maxHp);
          }
          break;
        case "heal":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            let targetOldHp = theEffect.targets[i2].hp;
            theEffect.targets[i2].hp += theEffect.amount;
            theEffect.targets[i2].hp = constrain(theEffect.targets[i2].hp, 0, theEffect.targets[i2].maxHp);
            // if the target's health went up after being healed, then give heal ult charge
            if (targetOldHp < theEffect.targets[i2].maxHp && theEffect.targets[i2].hp > targetOldHp) {
              healed = true;
            }
          }
          break;
        case "offense_up":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].offenseChange += theEffect.amount;
          }
          break;
        case "offense_down":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].offenseChange -= theEffect.amount;
          }
          break;
        case "defense_up":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].defenseChange += theEffect.amount;
          }
          break;
        case "defense_down":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i].defenseChange -= theEffect.amount;
          }
          break;
        case "ramp":
          for (let i2 = 0; i2 < theEffect.targets.length; i2++) {
            theEffect.targets[i2].energy += theEffect.amount;
            theEffect.targets[i2].energy = constrain(theEffect.targets[i2].energy, 0, theEffect.targets[i2].maxEnergy);
          }
          break;
        // combat only effects
        case "bullet":
          let howManyShots = theEffect.amount;
          let howManyBulletsPerShot = theEffect.perDelay;
          let shotsCount = 0;
          // create timer that creates every shot of bullets
          let allBulletSpawnTimer = setInterval(() => {
            for (let i = 0; i < howManyBulletsPerShot; i++) {
              let newAbilityBullet = new Bullet(this.user, this.user.x, this.user.y, width*(theEffect.bullet.speed/2)/100+height*(theEffect.bullet.speed/2)/100, this.user.angle, theEffect.bullet.moveType, theEffect.bullet.targets, theEffect.bullet.effects, width*(theEffect.bullet.size/2)/100+height*(theEffect.bullet.size/2)/100, theEffect.bullet.changes, theEffect.bullet.images, theEffect.bullet.wall, theEffect.bullet.ifHit, theEffect.bullet.timer);
              // start the interval for changes of each bullet
              for (let i = 0; i < newAbilityBullet.changes.length; i++) {
                switch (newAbilityBullet.changes[i][0]) {
                  case "size":
                    // total change / miliseconds
                    let bulletSizeChange = (newAbilityBullet.changes[i][1]*newAbilityBullet.size/100)/(newAbilityBullet.changes[i][2]/10);
                    let bulletSizeTarget =  newAbilityBullet.size + newAbilityBullet.changes[i][1]*newAbilityBullet.size/100;
                    let bulletSizeTimeCount = 0;
                    let timePerLoop = 10;
                    let whichChange = i;
                    let bulletSizeInterval = setInterval(() => {
                      // change the bullet's size
                      console.log("Oldsize"+newAbilityBullet.size);
                      newAbilityBullet.size += bulletSizeChange;
                      bulletSizeTimeCount++;
                      console.log("size"+newAbilityBullet.size);
                      console.log("bulletSizeChange"+bulletSizeChange);
                      console.log("time"+bulletSizeTimeCount);
                      // if time reaches max, clear timer
                      if (newAbilityBullet.changes[whichChange][2] / bulletSizeTimeCount <= timePerLoop) {
                        clearInterval(bulletSizeInterval);
                      }
                      // if reach target, stop timer
                      if (newAbilityBullet.changes[whichChange][1] > 0) {
                        if (newAbilityBullet.size >= bulletSizeTarget) {
                          clearInterval(bulletSizeInterval);
                        }
                      } else if (newAbilityBullet.changes[whichChange][1] < 0) {
                        if (newAbilityBullet.size <= bulletSizeTarget) {
                          clearInterval(bulletSizeInterval);
                        }
                      }
                      // if bullet would be too small, finish timer
                      if (newAbilityBullet.size <= 0) {
                        let index = projectilesList.indexOf(this);
                        projectilesList.splice(index, 1);
                        clearInterval(bulletSizeInterval);
                      }

                    }, timePerLoop);
                    break;
                  default:
                }
              }
              projectilesList.push(newAbilityBullet);
            }
            shotsCount++;
            if (shotsCount >= howManyShots) {
              clearInterval(allBulletSpawnTimer);
            }
          }, theEffect.delay);
          break;
        // move the user towards the mouse angle direction
        case "dash":
          let dashCounter = 10;
          let currentUserAngle = this.user.angle;
          let dashInterval = setInterval(() => {
            this.user.vx = this.user.currentSpeed * theEffect.amount * cos(currentUserAngle);
            this.user.vy = this.user.currentSpeed * theEffect.amount * sin(currentUserAngle);
            this.user.x += this.user.vx;
            this.user.y += this.user.vy;
            dashCounter--;
            if (dashCounter <= 0) {
              clearInterval(dashInterval);
            }
          }, 10);
          break;
        default: console.log("error");
      }
      for (let i4 = 0; i4 < this.chargeGive.length; i4++) {
        switch (this.chargeGive[i][1]) {
          case "use":
            this.user.ultCharge += this.chargeGive[i4][0];
            break;
          case "heal":
            if (healed === true) {
              this.user.ultCharge += this.chargeGive[i4][0];
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
        this.cooldownTimer = setInterval(() => {
          this.cooldownLeft -= 1;
          if (this.cooldownLeft <= 0) {
            this.onCooldown = false;
            this.cooldownLeft = 0;
            clearInterval(this.cooldownTimer);
          }
        }, 1000);
      //  intervalsList.push(this.cooldownTimer);
      }
      // remove all targets from the ability effect since ability effect is finished
      theEffect.targets = [];
    }
  }
}

// effects: damage, heal,
