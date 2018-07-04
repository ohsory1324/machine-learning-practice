const Perceptron = require('./perceptron');

class AdaptiveLinearNeuron extends Perceptron {
  constructor(data) {
    super(data);
  }

  learn({
    steps = 1000,
    log = false,
    n = 0.01,
  }) {
    let error = 0;
    let yhList = [];
    let count = 0;

    while (count < steps) {
      this.x.forEach((eachX, i) => {
        const sigmaWX = eachX
          .map((columnX, columnIndex) => columnX * this.w[columnIndex])
          .reduce((total, eachWX) => total + eachWX, 0);
        const yh = sigmaWX + this.b;
        const correction = n * (this.y[i] - yh);
  
        this.w = this.w.map((columnW, columnIndex) => columnW + eachX[columnIndex] * correction);
        this.b += correction;
        error += Math.abs(yh - this.y[i]);
        yhList.push(yh);
      });
      count += 1;
      if (log) {
        console.log('step: ', count);
        console.log('실제값: ', this.y);
        console.log('예측값: ', yhList);
        console.log('w: ', this.w);
        console.log('b: ', this.b, '\n');
      }
  
      if (count === steps || error === 0) {
        break;
      } else {
        yhList = [];
        error = 0;
      }
    }
  
    console.log(`
      w: ${this.w}
      b: ${this.b}
    `);
  }
}

module.exports = AdaptiveLinearNeuron;
