class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ball = new Ball(this.canvas.width, this.canvas.height);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ball.display(this.ctx);
    this.ball.move();
  }
}
window.onload = () => {
  new App();
};

class Ball {
  constructor(width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 5;
    this.ySpeed = 10;
    this.width = width;
    this.height = height;
    this.circleWidth = 200;
  }
  display(ctx) {
    ctx.beginPath();
    // arc (centerX, centerY, startAngle, endAngle)
    // 그리는 방향 : true 이면 시계 반대방향 / false 이면 시계 방향
    ctx.arc(this.x, this.y, this.circleWidth / 2, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.stroke();
  }
  move() {
    const halfLineWidth = this.circleWidth / 2;
    if (this.x + halfLineWidth > this.width || this.x < halfLineWidth) {
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.y + halfLineWidth > this.height || this.y < halfLineWidth) {
      this.ySpeed = this.ySpeed * -1;
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
}
