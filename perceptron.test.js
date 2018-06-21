const expect = require('chai').expect;

const { AND, OR, NAND, XOR } = require('./perceptron');

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
