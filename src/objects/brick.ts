import Rect from './rect';

const brickColors = [
  'red',
  'orange',
  'yellow',
  'limegreen'
];

class Brick extends Rect {
  layer: number;

  constructor(layer: number, x: number) {
    super(x, 120 - 30 * layer, 50, 30, brickColors[layer]);
    this.layer = layer;
  }
}

export function spawnBricks(arr: Brick[]) {
  for (let x = 0; x < 400; x += 50) {
    for (let layer = 0; layer < 4; layer++) {
      arr.push(new Brick(layer, x));
    }
  }
}

export default Brick;
