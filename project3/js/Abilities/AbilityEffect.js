class AbilityEffect {
  constructor(type, targets) {
    // type of the effect
    this.type = type;
    // what characters this ability effect can target
    this.canTargets = targets;
    // the character(s) that are being targeted by this ability effect right now
    this.targets;
    // how much of the effect is applied
    this.amount;
    // if this makes a bullet, what type and how many are made
    this.bullets = [];
  }
}
