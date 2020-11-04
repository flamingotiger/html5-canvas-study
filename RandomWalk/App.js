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

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.walker = new Walker(this.x, this.y);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.walker.walk();
    this.walker.display(this.ctx);
  }
}
window.onload = () => {
  new App();
};

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display(ctx) {
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
  walk() {
    var size = 4;
    var choice = Math.floor(Math.random() * 4);
    if (choice === 0) {
      this.x += size;
    } else if (choice === 1) {
      this.x -= size;
    } else if (choice === 2) {
      this.y += size;
    } else {
      this.y -= size;
    }
  }
}
