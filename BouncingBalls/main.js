// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

var testBall;

var balls = [];

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  collideWith(otherBall) {
    let distBetween = Math.sqrt(Math.pow(Math.abs(this.x - otherBall.x), 2) + Math.pow(Math.abs(this.y - otherBall.y), 2));
    return distBetween < (this.size + otherBall.size);
  }
}

function createBalls(instances) {
  i = 0;
  while (i < instances) {
    let toAdd = new Ball(random(10, width - 10), random(10, height - 10), random(1,5), random(1,5), 'red', random(5,10));
    shouldAdd = true;
    for (b of balls) {
      if (b.collideWith(toAdd)) {
        shouldAdd = false; 
      }
    }
    if (shouldAdd){
      balls.push(toAdd);
      i++;
    }
  }
}



function createList(count = 10) {
  createBalls(count);
  for (b of balls) {
    console.log(b);
    b.draw();
  }
}


