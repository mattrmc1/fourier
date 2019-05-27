const USER = 0;
const USER_FOURIER = 1;

let y = [];
let x = [];
let fourierY;
let fourierX;
let time = 0;
let path = [];

let userDrawing = [];
let state = -1;

function mousePressed() {
  userDrawing = [];
  x = [];
  y = [];
  time = 0
  path = [];
  state = USER;
}

function mouseReleased() {
  state = USER_FOURIER;
  const skip = 1;
  for (let i = 0; i < userDrawing.length; i += skip){
    x.push(userDrawing[i].x);
    y.push(userDrawing[i].y);
  }
  fourierX = dftSimple(x);
  fourierY = dftSimple(y);

  fourierX.sort((a,b) => b.amp - a.amp);
  fourierY.sort((a,b) => b.amp - a.amp);
}

function setup() {
  createCanvas(800, 600)
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++){
    let prevX = x;
    let prevY = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);

    stroke(255, 200);
    line(prevX, prevY, x, y);
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

    let vx = epiCycles(width / 2, 100, 0, fourierX);
    let vy = epiCycles(100, height / 2, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v)
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);

    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (time > TWO_PI){
      time = 0;
      path = [];
    }
  }
}