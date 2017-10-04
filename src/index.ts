import Paddle from './objects/paddle';
import Ball from './objects/ball';

const vw = 400, vh = 300;
let score = 0, lives = 5;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
if (!ctx)
  throw 'could not initialize canvas context';

function resize() {
  if (!ctx) return;

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

let lastDraw = 0;
function draw() {
  requestAnimationFrame(draw);
  if (!ctx) return;

  const thisDraw = performance.now() / 1000; // time in milliseconds
  const dt = thisDraw - lastDraw; // difference in time

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, vw, vh);

  paddle.update(dt);
  ball.update(dt);
  ball.bounceOff(paddle, true);
  
  paddle.draw(ctx);
  ball.draw(ctx);

  lastDraw = thisDraw;
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
