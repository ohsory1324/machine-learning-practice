const { expect } = require('chai');

const Perceptron = require('./perceptron');
const { step, sigmoid } = require('./activations');
const { AND, OR, NAND, XOR } = require('./logics');

describe('AND', () => {
  it('should return 1 when x1 === 1 and x2 === 1', () => {
    expect(AND(1, 1)).to.equal(1);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(AND(0, 0)).to.equal(-1);
  });
  it('should return 0 when x1 === 1 and x2 === 0', () => {
    expect(AND(1, 0)).to.equal(-1);
  });
  it('should return 0 when x1 === 0 and x2 === 1', () => {
    expect(AND(0, 1)).to.equal(-1);
  });
});

describe('OR', () => {
  it('should return 1 when x1 === 1 and x2 === 1', () => {
    expect(OR(1, 1)).to.equal(1);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(OR(0, 0)).to.equal(-1);
  });
  it('should return 1 when x1 === 1 and x2 === 0', () => {
    expect(OR(1, 0)).to.equal(1);
  });
  it('should return 1 when x1 === 0 and x2 === 1', () => {
    expect(OR(0, 1)).to.equal(1);
  });
});

describe('NAND', () => {
  it('should return 0 when x1 === 1 and x2 === 1', () => {
    expect(NAND(1, 1)).to.equal(-1);
  });
  it('should return 1 when x1 === 0 and x2 === 0', () => {
    expect(NAND(0, 0)).to.equal(1);
  });
  it('should return 1 when x1 === 1 and x2 === 0', () => {
    expect(NAND(1, 0)).to.equal(1);
  });
  it('should return 1 when x1 === 0 and x2 === 1', () => {
    expect(NAND(0, 1)).to.equal(1);
  });
});

describe('XOR', () => {
  it('should return 0 when x1 === 1 and x2 === 1', () => {
    expect(XOR(1, 1)).to.equal(-1);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(XOR(0, 0)).to.equal(-1);
  });
  it('should return 1 when x1 === 1 and x2 === 0', () => {
    expect(XOR(1, 0)).to.equal(1);
  });
  it('should return 1 when x1 === 0 and x2 === 1', () => {
    expect(XOR(0, 1)).to.equal(1);
  });
});

describe('learn perceptron', () => {
  const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const net = (w, b, x) => w[0] * x[0] + w[1] * x[1] + b;

  describe('step activation', () => {
    it('should solve AND logic with perceptron', () => {
      const perceptron = new Perceptron({ x: inputs, y: inputs.map(x => AND(...x)) });
      perceptron.learn({
        log: true,
        n: 0.01,
        steps: 200,
        activation: step,
      });
      inputs.forEach((input) => {
        const x = net(perceptron.w, perceptron.b, input);
        const y = AND(...input);
        const yh = step(x);
        expect(yh).to.equal(y);
      });
    });
  
    it('should solve OR logic with perceptron', () => {
      const perceptron = new Perceptron({ x: inputs, y: inputs.map(x => OR(...x)) });
      perceptron.learn({
        log: true,
        n: 0.01,
        steps: 200,
        activation: step,
      });
      inputs.forEach((input) => {
        const x = net(perceptron.w, perceptron.b, input);
        const y = OR(...input);
        const yh = step(x);
        expect(yh).to.equal(y);
      });
    });

    it('should solve NAND logic with perceptron', () => {
      const perceptron = new Perceptron({ x: inputs, y: inputs.map(x => NAND(...x)) });
      perceptron.learn({
        log: true,
        n: 0.01,
        steps: 200,
        activation: step,
      });
      inputs.forEach((input) => {
        const x = net(perceptron.w, perceptron.b, input);
        const y = NAND(...input);
        const yh = step(x);
        expect(yh).to.equal(y);
      });
    });
  });
});
