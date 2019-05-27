class Complex {
  constructor(a, b){
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

function dft(x) {
  let X = [];
  let N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);

    for (let n = 0; n < N; n++){
      const angle = (TWO_PI * k * n) / N;
      const c = new Complex(cos(angle), -sin(angle));
      sum.add(x[n].mult(c));
    };
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    let freq = k;
    let amp = sqrt(sum.re * sum.re + sum.im * sum.im);
    let phase = atan2(sum.im, sum.re);

    X[k] = {
      re: sum.re,
      im: sum.im,
      freq,
      amp,
      phase
    };
    
  }
  return X
}

function dftSimple(x) {
  let X = [];
  let N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n++){
      const angle = (TWO_PI * k * n) / N;
      re += x[n] * cos(angle);
      im -= x[n] * sin(angle);
    };
    re = re / N;
    im = im / N;

    let freq = k;
    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);

    X[k] = { re, im, freq, amp, phase };
    
  }
  return X
}