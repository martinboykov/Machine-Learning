const brain = require('brain.js');

const trainingData = [
  { input: 'I am super happy!', output: 'happy' },
  { input: 'What a pill!', output: 'sarcastic' },
  { input: 'I am super unhappy!', output: 'sad' },
  { input: 'Are we therе yet?', output: 'excited' }
];

const net = new brain.recurrent.LSTM();

net.train(trainingData, { iterations: 100, errorThresh: 0.011 })

console.log(net.run('happy'));
console.log(net.run('unhappy'));
console.log(net.run('yet'));
