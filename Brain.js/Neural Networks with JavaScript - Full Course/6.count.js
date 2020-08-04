const brain = require('brain.js');

const trainingData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
];

const net = new brain.recurrent.LSTMTimeStep();

const stats = net.train(trainingData);

console.log(stats);

const testMap = [
  [0],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2],
  [5, 4, 3],
  [5, 4],
  [5],
  [6],
]
const result = net.run([1, 2, 3]);
testMap.forEach((test, index)=>console.log(testMap[index], ` - ` , net.run(test)));
