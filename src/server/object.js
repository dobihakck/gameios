class Object {
  constructor(id, x, y, dir, speed, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = dir;
    this.speed = speed;
    this.color = color;

  }

  update(dt) {
    this.x += dt * this.speed * Math.sin(1);
    this.y -= dt * this.speed * Math.cos(1);
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setDirection(dir) {
    this.direction = dir;
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      color: this.color,
    };
  }
}

module.exports = Object;
