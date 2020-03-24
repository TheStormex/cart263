class EnemyAbility {
  constructor(moves, bullet) {
    // how the enemy moves during this ability (noise, straight line, direction)
    this.moves;
    // what bullets the enemy uses during this ability
    this.bullets;
    // what happens if enemy touches wall (bounce, other side, random)
    this.wrap;
  }
}
