class Bullet {
  constructor(speed, x, y, damage, affects, size, change, image, wall, timer) {
    this.speed;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.damage = damage;
    this.affects = affects;
    this.size = size;
    // if this changes size, damage, who it affecs, speed, etc.
    // check which ones this have and apply that change every draw
    this.change = change;
    this.image = image;
    // if this touches a wall, what to do
    this.wall = wall;
    // start a timer when this bullet is spawned, when the timer reaches
    this.timer = timer;
  }
  moves() {

  }
  contact() {

  }
}
