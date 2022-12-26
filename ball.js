import { ctx, width, height } from './canvas.js';

export default class Ball {
  constructor({ x, y, speed, radius, color }) {
    this.x = x;
    this.y = y;
    this.velX = speed;
    this.velY = speed;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounce() {
    // 벽에 부딪히면 반대방향으로 이동
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.velX *= -1;
    }

    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.velY *= -1;
    }

    // 좌표에 속도를 붙임 - 공이 움직인다
    this.x += this.velX;
    this.y += this.velY;
  }
}
