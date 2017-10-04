import Rect from './rect';

class Ball extends Rect {
  velX: number;
  velY: number;
  speed = 100;

  constructor() {
    super(0, 0, 4, 4);
    this.reset();
  }

  reset() {
    this.x = 198;
    this.y = 198;
    this.setDirection((Math.random() * 0.8 - 0.4) * Math.PI);
  }
  
  setDirection(angle:number) {
    this.velX = Math.sin(angle) * this.speed;
    this.velY = -Math.cos(angle) * this.speed;  
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

  increaseSpeed(amount: number) {
    this.speed += amount * 1;
  }
}

export default Ball;
