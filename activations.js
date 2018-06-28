const step = x => x >= 0 ? 1 : -1;
const sigmoid = x => 1 / (1 + Math.exp(-x));

module.exports = {
  step,
  sigmoid,
};
