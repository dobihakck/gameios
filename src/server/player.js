const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y, color) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED, color);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    //super.update(dt);

    // обновляем кол-во очков
    this.score += dt * Constants.SCORE_PER_SECOND;

    // следим за направлением игрока
    switch (this.direction) {
      case 'W':
        this.y -= dt * this.speed;
        break;
      case 'S':
        this.y += dt * this.speed;
        break;
      case 'D':
        this.x += dt * this.speed;
        break;
      case 'A':
        this.x -= dt * this.speed;
        break;
  }

  // обнуляем направления игрока
//  this.direction = '';

  // следить за координатами игрока, чтобы он не вышел за границу карты
  this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
  this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

  // задержка выстрелов пуль
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction);
    }

    return null;
  }

  takeBulletDamage() { // функция дамага персонажа
    this.hp -= Constants.BULLET_DAMAGE;
  }

  onDealtDamage() { // функция добавления очков персонажу
    this.score += Constants.SCORE_BULLET_HIT;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      username: this.username,
      score: this.score,
    };
  }
}

module.exports = Player;
