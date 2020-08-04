const brain = require('brain.js');

// same as in 1.propagation
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  // { input: [1, 0], output: [1] },
  // { input: [1, 1], output: [0] },
];
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

net.train(trainingData);

console.log(net.run([0, 0]))
console.log(net.run([1, 0]))

trainingData.push(
  { input: [1, 0], output: [1] }
);
net.train(trainingData);

console.log(net.run([0, 0]))
console.log(net.run([1, 0]))
console.log(net.run([1, 1]))

