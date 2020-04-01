class Enemy {
  constructor(name, maxHp, size, contactDamage, abilities) {
    this.name = name;
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.maxHp = maxHp;
    this.speed = width/500+height/500;
    this.x = width/2;
    this.y = height/5;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.offenseChange = 0;
    this.defenseChange = 0;
    this.contactDamage = contactDamage;
    this.size = size;
    this.abilities = abilities;
    this.currentAbility;
  }
  draw() {
    push();
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
  move() {
    let moveType = this.currentAbility.moves;
    if (moveType === "noise")  {
      this.angle += random(-0.2, 0.2);
    }
    else if (moveType === "line") {
    }
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle);
    this.x += this.vx;
    this.y += this.vy;
  }
  wrap() {
    let wrapType = this.currentAbility.wrap;
    if (wrapType === "walls") {
      // prevent going outside of walls
      if (this.x-this.size/2 <= 0) {
        this.x = this.size/2;
        this.angle = random(-30, 30);
      }
      if (this.x+this.size/2 > width) {
        this.x = width-this.size/2;
        this.angle = random(-30, 30);
      }
      if (this.y-this.size/2 < 0) {
        this.y = this.size/2;
        this.angle = random(-30, 30);
      }
      if (this.y+this.size/2 > height-height/3) {
        this.y = height-height/3-this.size/2;
        this.angle = random(-30, 30);
      }
    }
    if (wrapType === "through") {
      this.angle += random(-0.2, 0.2);
      // reappear on the other side
      if (this.x-this.size/2 <= 0) {
        this.x += width;
      }
      if (this.x+this.size/2 > width) {
        this.x -= width;
      }
      if (this.y-this.size/2 < 0) {
        this.y += (height-height/3);
      }
      if (this.y+this.size/2 > height-height/3) {
        this.y -= (height-height/3);
      }
    }
  }
  // if touch player
  contact() {
    let d = dist(this.x, this.y, frontline.x, frontline.y);
    if (d < this.size) {
      if (frontline.invincible === false) {
          frontline.hp -= (this.contactDamage*(1+this.offenseChange/100)/(1+frontline.defenseChange/100));
          frontline.hp = constrain(frontline.hp, 0, frontline.maxHp);
          console.log(frontline.name + frontline.hp);
          frontline.invincible = true;
          setTimeout(function() {frontline.invincible = false}, 250);
      }
    }
  }
}
