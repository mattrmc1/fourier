const USER = 0;
const USER_FOURIER = 1;

let values = [];
let fourier;
let time = 0;
let path = [];

let userDrawing = [];
let state = -1;

function mousePressed() {
  userDrawing = [];
  values = [];
  time = 0
  path = [];
  state = USER;
}

function mouseReleased() {
  state = USER_FOURIER;
  for (let i = 0; i < userDrawing.length; i ++){
    values.push(new Complex(userDrawing[i].x, userDrawing[i].y));
  }
  fourier = dft(values);
  fourier.sort((a,b) => b.amp - a.amp);
}

function setup() {
  createCanvas(800, 600)
}

function epicycles(x, y, fourier) {
  for (let i = 0; i < fourier.length; i++){
    let { freq, phase, amp } = fourier[i];
    let prevX = x;
    let prevY = y;

    x += amp * cos(freq * time + phase);
    y += amp * sin(freq * time + phase);

    stroke(255, 80);
    noFill();
    ellipse(prevX, prevY, amp * 2);
  }
  return createVector(x, y)
}

function draw() {
  background(0);

  if (state === USER){
    let point = createVector(mouseX - width / 2, mouseY - height / 2);
    userDrawing.push(point);
    stroke(255);
    noFill();
    beginShape();
    for (let v of userDrawing) {
      vertex(v.x + width / 2, v.y + height / 2)
    }
    endShape();

  } else if (state === USER_FOURIER){

    let v = epicycles(width / 2, height / 2, fourier);
    path.unshift(v)

    stroke(255)
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    time += TWO_PI / fourier.length;

    if (time > TWO_PI){
      time = 0;
      path = [];
    }
  }
}