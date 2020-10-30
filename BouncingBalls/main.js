// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let testBall;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

function wrapper(){
  console.log(createBall())
}

function createBall(){
  alert("I am an alert box!");
  testBall = new Ball(50, 100, 4, 4, 'blue', 10);
  testBall.draw();
  return testBall;
}

function moveBall() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  testBall.x = 100;
  testBall.draw();
}



