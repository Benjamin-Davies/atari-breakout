import Paddle from './objects/paddle';
import Ball from './objects/ball';
import Brick, { spawnBricks } from './objects/brick';

const vw = 400, vh = 300;
let score = 0, lives = 5;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
if (!ctx)
  throw 'Could not initialize canvas context';

function resize() {
  const unit = Math.min(
    window.innerWidth / vw,
    window.innerHeight / vh
  );

  canvas.width = unit * vw;
  canvas.height = unit * vh;

  ctx.restore();
  ctx.scale(unit, unit);
}

const paddle = new Paddle();
const ball = new Ball();
const bricks = [] as Brick[];

let lastDraw = 0;
function draw() {
  requestAnimationFrame(draw);

  const thisDraw = performance.now() / 1000; // time in milliseconds
  const dt = Math.min(thisDraw - lastDraw, 0.05); // difference in time or 0.05s

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, vw, vh);

  paddle.update(dt);
  ball.update(dt);
  ball.bounceOff(paddle, true);
  if (ball.y > 300 - ball.h) {
    lives--;
    ball.reset();
  }

  if (bricks.length <= 0)
    spawnBricks(bricks);

  paddle.draw(ctx);
  ball.draw(ctx);
  bricks.forEach(brick => brick.draw(ctx));
  drawStatus(ctx);

  lastDraw = thisDraw;
}

function drawStatus(ctx: CanvasRenderingContext2D) {
  ctx.font = '10px monospace';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 5, 10);
  ctx.fillText(`Lives: ${lives}`, 5, 20);
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      paddle.left = true;
      break;
    case 'd':
      paddle.right = true;
      break;
  }
});
document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'a':
      paddle.left = false;
      break;
    case 'd':
      paddle.right = false;
      break;
  }
});

window.addEventListener('resize', resize);
resize();
draw();
