const brain = require('brain.js');
// provide optional config object (or undefined). Defaults shown.
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [4], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];
net.train(
  trainingData,
  {
    log: (error) => console.log(error),
    logPeriod: 100
  }
);

const output = net.run([1, 0]); // [0.987]
console.log(output);
