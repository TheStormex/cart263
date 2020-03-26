class AbilityEffect {
  constructor(type, canTargets, amount, bullet, step, aoe) {
    // type of the effect
    this.type = type;
    // what characters this ability effect can target, gets a list when used (support)
    this.canTargets = canTargets;
    this.canTargetsList;
    // the character(s) that are being targeted by this ability effect right now (support)
    this.targets = [];
    // how much of the effect is applied, if make bullet, how many
    this.amount = amount;
    // if this makes a bullet, what type
    this.bullet = bullet;
    // if this effect requires another step in the ability
    this.step = step;
    // if this is an area of effect ability that affect all targets of group (support)
    this.aoe = aoe;
    if (this.aoe === true) {
      for (var i = 0; i < this.canTargets.length; i++) {
        this.targets.push(this.canTargetsList[i]);
      }
    }
  }
}
