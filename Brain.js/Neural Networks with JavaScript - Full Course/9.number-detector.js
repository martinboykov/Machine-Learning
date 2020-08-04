const brain = require('brain.js');
function toArray(string) {
  if (string.length !== 7 * 7) throw new Error('string in wrong size');
  return string.split('').map(toNumber);
}
function toNumber(char) {
  return char === '#' ? 1 : 0;
}

const numberMap = [

  toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#######'
  ),

  toArray(
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   '
  ),
  toArray(
    '#######' +
    '#     #' +
    '      #' +
    '    #  ' +
    '  #    ' +
    '#      ' +
    '#######'
  ),

  toArray(
    '#######' +
    '      #' +
    '      #' +
    '#######' +
    '      #' +
    '      #' +
    '#######'
  ),

  toArray(
    '#     #' +
    '#     #' +
    '#     #' +
    '#######' +
    '      #' +
    '      #' +
    '      #'
  ),

  toArray(
    '#######' +
    '#      ' +
    '#      ' +
    '#######' +
    '      #' +
    '      #' +
    '#######'
  ),

  toArray(
    '      #' +
    '    #  ' +
    '  #    ' +
    ' ######' +
    '#     #' +
    '#     #' +
    '#######'
  ),

  toArray(
    '#######' +
    '     # ' +
    '    #  ' +
    '   #   ' +
    '  #    ' +
    ' #     ' +
    '#      '
  ),

  toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '#######' +
    '#     #' +
    '#     #' +
    '#######'
  ),

  toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '###### ' +
    '    #  ' +
    '  #    ' +
    '#      '
  ),
];

const outputMap = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];


const net = new brain.NeuralNetwork();
const trainingData = [
  { input: numberMap[0], output: { zero: 1 } },
  { input: numberMap[1], output: { one: 1 } },
  { input: numberMap[2], output: { two: 1 } },
  { input: numberMap[3], output: { three: 1 } },
  { input: numberMap[4], output: { four: 1 } },
  { input: numberMap[5], output: { five: 1 } },
  { input: numberMap[6], output: { six: 1 } },
  { input: numberMap[7], output: { seven: 1 } },
  { input: numberMap[8], output: { eight: 1 } },
  { input: numberMap[9], output: { nine: 1 } },
];

net.train(trainingData, { log: (stats) => console.log(stats) })

const result = net.run(toArray(
  '#######' +
  '#     #' +
  '#     #' +
  '#######' +
  '#     #' +
  '#     #' +
  '#######'
));
console.log(result);

const resultLikely = brain.likely(toArray(
  '#######' +
  '#     #' +
  '#     #' +
  '#######' +
  '#     #' +
  '#     #' +
  '#######'
), net);
console.log(resultLikely);
