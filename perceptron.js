const checkZeroOrOne = (x1, x2) => {
  if ((x1 !== 0 && x1 !== 1) || (x2 !== 0 && x2 !== 1)) {
    throw new Error('Invalid parameters!');
  }
};

const AND = (x1, x2) => {
  checkZeroOrOne(x1, x2);
  return x1 && x2;
};

const OR = (x1, x2) => {
  checkZeroOrOne(x1, x2);
  return x1 || x2;
};

const NAND = (x1, x2) => {
  checkZeroOrOne(x1, x2);
  return +!(x1 && x2);
};

const XOR = (x1, x2) => {
  const s1 = NAND(x1, x2);
  const s2 = OR(x1, x2);
  return AND(s1, s2);
};

const step = x => x >= 0 ? 1 : 0;
const sigmoid = x => 1 / (1 + Math.exp(-x));

const learn = ({
  data,
  steps = 1000,
  n = 0.01,
  activation = step,
  log = false,
}) => {
  const { x, y } = data || {};
  if (!x || !y) {
    throw new Error('Invalid Data!');
  }
  const { w: wInit, b: bInit } = data || {};
  let w = wInit || x[0].map(() => Math.random() * 2 - 1);
  let b = bInit || 1;
  let error = 0;
  let yhList = [];
  let count = 0;

  while (count < steps) {
    x.forEach((eachX, i) => {
      const sigmaWX = eachX.map((columnX, columnIndex) => columnX * w[columnIndex]).reduce((total, eachWX) => total + eachWX, 0);
      const yh = activation(sigmaWX + b);
      const correction = n * (y[i] - yh);

      w = w.map((columnW, columnIndex) => columnW + eachX[columnIndex] * correction);
      b += correction;
      error += Math.abs(yh - y[i]);
      yhList.push(yh);
    });
    count += 1;
    if (log) {
      console.log('step: ', count);
      console.log('실제값: ', y);
      console.log('예측값: ', yhList);
      console.log('w: ', w);
      console.log('b: ', b, '\n');
    }

    if (count === steps || error === 0) {
      break;
    } else {
      yhList = [];
      error = 0;
    }
  }

  console.log(`
    w: ${w}
    b: ${b}
  `);
  return { w, b };
};

module.exports = {
  learn,
  AND,
  OR,
  NAND,
  XOR,
  activation: {
    step,
    sigmoid,
  }
};
