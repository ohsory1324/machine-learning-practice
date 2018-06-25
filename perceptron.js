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

const sigmoid = x => 1 / (1 + Math.exp(-x));
const activation = x => x >= 0.5 ? 1 : 0;

const learn = (logic, steps = 1000, n = 0.01) => {
  const w = [Math.random() * 2 - 1, Math.random() * 2 - 1];
  let error = 0;
  let yhList = [];
  let b = 1;
  let count = 0;

  const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const y = inputs.map(([x1, x2]) => logic(x1, x2));
  while (count < steps) {
    inputs.forEach(([x1, x2], i) => {
      const [w1, w2] = w;
      const net = w1 * x1 + w2 * x2 + b;
      const yh = activation(net);

      w[0] = w1 + n * (x1 * (y[i] - yh));
      w[1] = w2 + n * (x2 * (y[i] - yh));
      b += n * (y[i] - yh);
      error += Math.abs(yh - y[i]);
      yhList.push(yh);
    });
    count += 1;
    console.log('step: ', count);
    console.log('실제값: ', y);
    console.log('예측값: ', yhList);
    console.log('w: ', w);
    console.log('b: ', b, '\n');

    if (count === steps) {
      throw new Error('Not solved!');
    } else if (error === 0) {
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
};
