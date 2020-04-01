class EnemyAbility {
  constructor(moves, bullets, wrap) {
    // how the enemy moves during this ability (noise, straight line, direction)
    this.moves = moves;
    // what bullets the enemy uses during this ability
    this.bullets = bullets;
    // what happens if enemy touches wall (bounce, other side, random)
    this.wrap = wrap;
  }
}
