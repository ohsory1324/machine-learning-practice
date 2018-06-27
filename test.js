const fs = require('fs');

const { learn, AND, OR, NAND, XOR, activation } = require('./perceptron');

// const x = [[0, 0], [0, 1], [1, 0], [1, 1]];
// const y = x.map(input => XOR(...input));
// const { w, b } = learn({
//   data: {
//     x,
//     y,
//   },
//   log: true,
//   activation: activation.sigmoid,
//   n: 0.01,
//   steps: 10000,
// });

const x = [];
const y = [];
const yMatch = {
  'Iris-setosa': 0,
  'Iris-versicolor': 1,
};

fs.readFileSync('./data/iris.csv', 'utf8')
  .split('\n')
  .map((eachRow) => {
    const columns = eachRow.split(',');
    y.push(yMatch[columns.pop()]);
    x.push(columns.map(eachColumn => +eachColumn));
  });

const { w, b } = learn({
  data: {
    x,
    y,
  },
  log: true,
  activation: activation.sigmoid,
  n: 1,
  steps: 5,
});

fs.writeFileSync('./result.txt', '');
x.forEach((eachX, i) => {
  const sigmaWX = eachX.map((columnX, columnIndex) => columnX * w[columnIndex]).reduce((total, eachWX) => total + eachWX, 0);
  const yh = activation.sigmoid(sigmaWX + b);
  fs.appendFileSync('./result.txt', `${yh},${y[i]}\n`);
});
