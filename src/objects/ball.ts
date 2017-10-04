import Rect from './rect';

class Ball extends Rect {
  velX: number;
  velY: number;

  constructor() {
    super(0, 0, 4, 4);
    this.reset();
  }

  reset() {
    const dir = (Math.random() * 0.5 + 0.25) * Math.PI;
    const speed = 100;

    this.x = 198;
    this.y = 198;

    this.velX = Math.cos(dir) * speed;
    this.velY = Math.sin(dir) * speed;
  }

  update(dt: number) {
    this.x += dt * this.velX;
    this.y += dt * this.velY;

    if ((this.x < 0 && this.velX < 0) ||
      (this.x > 400 - this.w && this.velX > 0))
      this.velX *= -1;
    if ((this.y < 0 && this.velY < 0) ||
      (this.y > 300 - this.h && this.velY > 0))
      this.velY *= -1;
  }

  bounceOff(rect: Rect, upOnly = false) {
    if (this.intersects(rect) && (!upOnly || this.velY > 0)) {
      this.velY *= -1;
      return true;
    }
    return false;
  }
}

export default Ball;
