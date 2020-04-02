class BulletNutsBasic extends Bullet {
  constructor(x, y) {
    super(width/100+height/100, frontline.angle, x, y, 1, "enemies", ["damage"], frontline, width/100+height/100, "none", S_NUTS_BULLET_BASIC, "done", "done", "none");
  }
}
