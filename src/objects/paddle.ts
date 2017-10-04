import Rect from './rect';

class Paddle extends Rect {
  right: boolean;
  left: boolean;
  speed = 100;

  constructor() {
    super(175, 270, 50, 5);
  }

  update(dt: number) {
    if (this.right)
      this.x += this.speed * dt;
    if (this.left)
      this.x -= this.speed * dt;

    if (this.x > 400 - this.w)
      this.x = 400 - this.w;
    if (this.x < 0)
      this.x = 0;
  }
}

export default Paddle;
