class Bullet {
  constructor(origin, x, y, speed, angle, damage, targets, effects, size, change, image, wall, ifHit, timer) {
    // who shot this bullet
    this.origin = origin;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.vx = 0;
    this.vy = 0;
    this.damage = damage;
    // what char can this bullet hit?
    this.targets = targets;
    // what effects this bullet has when hit a target
    this.effects = effects;
    // how larget is this bullet
    this.size = size;
    // if this changes size, damage, who it affecs, speed, etc.
    // check which ones this have and apply that change every draw
    this.change = change;
    this.image = image;
    // if this touches a wall, what to do
    this.wall = wall;
    // if this hits a target what to do 0 = if disappear, 1 = others
    this.ifHit = ifHit;
    // start a timer when this bullet is spawned, when the timer reaches
    this.timer = timer;
    // if this bullet should be destroyed in the next frame
    this.isDestroyed = false;
  }
  move() {
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle)
    this.x += this.vx;
    this.y += this.vy;
  }
  contact() {
    if (this.targets === "enemies") {
      for (var i = 0; i < enemiesList.length; i++) {
        let d = dist(this.x, this.y, enemiesList[i].x, enemiesList[i].y);
        if (d < enemiesList[i].size/2 + this.size/2) {
          this.effectHappens(enemiesList[i]);
        }
      }
    }
    else if (this.targets === "players") {
      let d = dist(this.x, this.y, frontline.x, frontline.y);
      if (d < frontline.size/2 + this.size/2) {
        this.effectHappens(frontline);
      }
    }
  }
  draw() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
  effectHappens(target) {
    for (var i2 = 0; i2 < this.effects.length; i2++) {
      switch (this.effects[i2]) {
        case "damage":
          target.hp -= round((this.damage*(1+this.origin.offenseChange/100)/(1+target.defenseChange/100)));
          target.hp = constrain(target.hp, 0, target.maxHp);
          break;
        // spawn more bullets
        case "spawn":

        default:
      }
    }
    switch (this.ifHit[0]) {
      case "done":
        this.isDestroyed = true;
        break;
      case "through":
        // nothing
        break;
      default:
    }
    switch (this.ifHit[1]) {
      case "spawn":
        // create new bullets
        break;
      case "nothing":
        // nothing
        break;
      default:

    }
  }
}
