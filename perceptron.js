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

module.exports = {
  AND,
  OR,
  NAND,
  XOR,
};
