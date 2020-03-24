class AbilityEffect {
  constructor(type, canTargets, targets, amount, bullet, aoe) {
    // type of the effect
    this.type = type;
    // what characters this ability effect can target (support)
    this.canTargets = canTargets;
    // the character(s) that are being targeted by this ability effect right now (support_)
    this.targets;
    // how much of the effect is applied, if make bullet, how many
    this.amount;
    // if this makes a bullet, what type
    this.bullet = bullet;
    // if this is an area of effect ability that affect all targets of group
    this.aoe = aoe;
    if (this.aoe === true) {
      for (var i = 0; i < this.canTargets.length; i++) {
        this.targets.push(this.canTargets[i]);
      }
    }
  }
}
