const brain = require('brain.js');

const trainingData = [
  { input: { blue: 1 }, output: [1] },
  { input: { red: 1 }, output: [1] },
  { input: { black: 1 }, output: [0] },
  { input: { green: 1 }, output: [0] },
  { input: { brown: 1 }, output: [0] },
];

const net = new brain.NeuralNetwork();
console.log(trainingData);
net.train(trainingData);
console.log([...(net.run({ blue: 1 }))]);
console.log([...(net.run({ brown: 1 }))]);

trainingData.forEach((data) => {
  if (data.input.brown) {
    data.output = [1];
  }
})
net.train(trainingData);
console.log(trainingData);
console.log([...(net.run({ blue: 1 }))]);
console.log([...(net.run({ brown: 1 }))]);


trainingData.forEach((data) => {
  if (data.input.blue) {
    data.output = [0];
  }
})
net.train(trainingData);
console.log(trainingData);
console.log([...(net.run({ blue: 1 }))]);
console.log([...(net.run({ brown: 1 }))]);
