let y = [];
let time = 0;
let wave = [];

function setup() {
  createCanvas(600, 400)
}

function draw() {
  background(0);
  translate(150, 200);
  
  

  let x = 0;
  let y = 0;

  for (let i = 0; i < 5; i++){
    let prevX = x;
    let prevY = y;
    let n = 2 * i + 1;

    let radius = 50 * (4 / (n * PI));
    x += radius * -cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);

    stroke(255, 200);
    line(prevX,prevY,x,y);
  }

  wave.unshift(y)

  translate(200, 0);
  line( x - 200, y, 0, wave[0] );

  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
    
  }
  endShape();


  time += 0.03;

  if (wave.length > 200){
    wave.pop();
  }
}