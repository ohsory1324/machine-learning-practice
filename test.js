const fs = require('fs');

const Perceptron = require('./perceptron');
const { step, sigmoid } = require('./activations');
const { AND } = require('./logics');

const x = [];
const y = [];
const yMatch = {
  'Iris-setosa': -1,
  'Iris-versicolor': 1,
};

fs.readFileSync('./data/iris.csv', 'utf8')
  .split('\n')
  .map((eachRow) => {
    const columns = eachRow.split(',');
    y.push(yMatch[columns.pop()]);
    x.push(columns.map(eachColumn => +eachColumn));
  });

const perceptron = new Perceptron({ x, y });
perceptron.learn({
  log: true,
  n: 0.01,
  steps: 50,
  activation: sigmoid,
});

fs.writeFileSync('./result.txt', '');
x.forEach((eachX, i) => {
  const sigmaWX = eachX
    .map((columnX, columnIndex) => columnX * perceptron.w[columnIndex])
    .reduce((total, eachWX) => total + eachWX, 0);
  const yh = step(sigmaWX + perceptron.b);
  fs.appendFileSync('./result.txt', `${yh},${y[i]}\n`);
});

