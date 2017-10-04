class Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;

  constructor(x: number, y: number, w: number, h: number, color: string = 'white') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  intersects(rect: Rect) {
    const ax = [this.x, this.x + this.w].sort();
    const ay = [this.y, this.y + this.h].sort();
    const bx = [rect.x, rect.x + rect.w].sort();
    const by = [rect.y, rect.y + rect.h].sort();
    return ax[0] <= bx[1] && bx[0] <= ax[1]
      && ay[0] <= by[1] && by[0] <= ay[1];
  }
}

export default Rect;
