class BulletBoltBasic extends Bullet {
  constructor(x, y) {
    super(width/200+height/200, frontline.angle, x, y, 20, "enemies", ["damage"], frontline, width/100+height/100, "none", S_BOLT_BULLET_BASIC, "done", "done", "none");
  }
}
