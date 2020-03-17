class Bullet {
  constructor(speed, x, y, damage, affects, size, change, image) {
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
  }
}
