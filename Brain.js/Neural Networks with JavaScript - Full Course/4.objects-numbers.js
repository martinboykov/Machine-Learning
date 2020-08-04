const brain = require('brain.js');

// input
const colors = [
  { red: 0.0, green: 0.2, blue: 0.4 },
  { red: 0.0, green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { red: 0.0, green: 1.0, blue: 1.0 },
  { red: 0.8, green: 1.0, blue: 1.0 },
  { red: 1.0, green: 1.0, blue: 1.0 },
  { red: 1.0, green: 0.8, blue: 0.8 },
  { red: 1.0, green: 0.6, blue: 0.6 },
  { red: 1.0, green: 0.4, blue: 0.4 },
  { red: 1.0, green: 0.31, blue: 0.31 },
  { red: 0.8, green: 0.0, blue: 0.0 },
  { red: 0.6, green: 0.2, blue: 0.2 },
];

const brightness = [
  { dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1.0 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 },
];

const trainingData = [];

for (let i = 0; i < colors.length; i++) {
  trainingData.push({
    input: colors[i],
    output: brightness[i],
  });
}
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [4], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};
const net = new brain.NeuralNetworkGPU(config);

const stats = net.train(trainingData);

console.log(stats);

const result = net.run({
  red: 0.9
});

console.log(result);
