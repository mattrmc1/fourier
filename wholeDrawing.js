let x = [];
let fourierX;
let time = 0;
let path = [];

function setup() {
  createCanvas(800, 600)
  const skip = 5;
  for (let i = 0; i < drawing.length; i += skip){
    const c = new Complex(drawing[i].x, drawing[i].y)
    x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a,b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) {
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

  let v = epicycles(width / 2, height / 2, 0, fourierX);
  path.unshift(v)

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI){
    time = 0;
    path = [];
  }
}