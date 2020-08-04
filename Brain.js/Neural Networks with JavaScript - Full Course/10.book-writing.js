const brain = require('brain.js');

const trainingData = [
  'Jain saw Doug.',
  'Doug saw Jane.',
  'Spot saw Doug and Jane looking at each other.',
  'It was love at first sight, and Spot had frontrow seat. It was very special moment for all.',
];

const net = new brain.recurrent.LSTM();

net.train(trainingData, { iterations: 1500, errorThresh: 0.010 })

console.log(net.run('Jane'));
console.log(net.run('It was'));
