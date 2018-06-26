const { expect } = require('chai');

const { learn, AND, OR, NAND, XOR, activation } = require('./perceptron');

describe('AND', () => {
  it('should return 1 when x1 === 1 and x2 === 1', () => {
    expect(AND(1, 1)).to.equal(1);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(AND(0, 0)).to.equal(0);
  });
  it('should return 0 when x1 === 1 and x2 === 0', () => {
    expect(AND(1, 0)).to.equal(0);
  });
  it('should return 0 when x1 === 0 and x2 === 1', () => {
    expect(AND(0, 1)).to.equal(0);
  });
});

describe('OR', () => {
  it('should return 1 when x1 === 1 and x2 === 1', () => {
    expect(OR(1, 1)).to.equal(1);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(OR(0, 0)).to.equal(0);
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
    expect(NAND(1, 1)).to.equal(0);
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
    expect(XOR(1, 1)).to.equal(0);
  });
  it('should return 0 when x1 === 0 and x2 === 0', () => {
    expect(XOR(0, 0)).to.equal(0);
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
    const defaultOptions = {
      logic: AND,
      activation: activation.step,
      log: false,
      n: 0.1,
      steps: 1000,
    };

    it('should solve AND logic with perceptron', () => {
      const { w, b } = learn(defaultOptions);
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.step(x);
        const yh = AND(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    it('should solve OR logic with perceptron', () => {
      const { w, b } = learn({ ...defaultOptions, logic: OR });
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.step(x);
        const yh = OR(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    it('should solve NAND logic with perceptron', () => {
      const { w, b } = learn({ ...defaultOptions, logic: NAND });
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.step(x);
        const yh = NAND(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    // it('should NOT solve XOR logic with perceptron', () => {
    // });
  });

  describe('sigmoid activation', () => {
    const defaultOptions = {
      logic: AND,
      activation: activation.sigmoid,
      log: false,
      n: 0.1,
      steps: 10000,
    };

    it('should solve AND logic with perceptron', () => {
      const { w, b } = learn({ ...defaultOptions });
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.sigmoid(x);
        const yh = AND(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    it('should solve OR logic with perceptron', () => {
      const { w, b } = learn({ ...defaultOptions, logic: OR });
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.sigmoid(x);
        const yh = OR(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    it('should solve NAND logic with perceptron', () => {
      const { w, b } = learn({ ...defaultOptions, logic: NAND });
      inputs.forEach((input) => {
        const x = net(w, b, input);
        const y = activation.sigmoid(x);
        const yh = NAND(...input);
        expect(Math.abs(y - yh)).to.lessThan(0.01);
      });
    });
  
    // it('should NOT solve XOR logic with perceptron', () => {
    // });
  });
});
