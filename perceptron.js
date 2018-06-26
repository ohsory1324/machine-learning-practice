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

const step = x => x >= 0.5 ? 1 : 0;
const sigmoid = x => 1 / (1 + Math.exp(-x));;

const learn = ({
  logic = AND,
  steps = 1000,
  n = 0.01,
  activation = step,
  log = false,
  init,
}) => {
  const { w: wInit, b: bInit } = init || {};
  const w = wInit || [Math.random() * 2 - 1, Math.random() * 2 - 1];
  let b = bInit || 1;
  let error = 0;
  let yhList = [];
  let count = 0;

  const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const y = inputs.map(([x1, x2]) => logic(x1, x2));
  while (count < steps) {
    inputs.forEach(([x1, x2], i) => {
      const [w1, w2] = w;
      const yh = activation(w1 * x1 + w2 * x2 + b);
      const correction = n * (y[i] - yh);

      w[0] = w1 + x1 * correction;
      w[1] = w2 + x2 * correction;
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
