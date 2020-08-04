const brain = require('brain.js');
let rawData = [
  {
    // 'date': '2018-11-02',
    open: 141.0716,
    high: 141.1014,
    low: 138.7762,
    close: 139.7898
  },
  {
    // 'date': '2018-11-05',
    open: 140.0716,
    high: 141.8014,
    low: 138.1762,
    close: 141.7898
  },
  {
    // 'date': '2018-11-06',
    open: 140.6716,
    high: 141.9014,
    low: 140.1762,
    close: 141.6898
  },
]

let scaledMin = 0;
let scaledMax = 1;
let min = getMin(rawData);
let max = getMax(rawData);
const scaledDownData = rawData.map((step) => scale(step, scaledMin, scaledMax, min, max));
scaledMin = min; // the initial min value
scaledMax = max; // the initial max value
min = getMin(scaledDownData); // the scaledDown min value
max = getMax(scaledDownData); // the scaledDown max value
// const scaledUpData = scaledDownData.map((step) => scale(step, scaledMin, scaledMax, min, max ));
// console.log(scaledDownData);
// console.log(scaledUpData);
// console.log(rawData);
const chunks = 3;
const trainingData = [];
for (let i = 0; i < scaledDownData.length; i += chunks) {
  trainingData.push(scaledDownData.slice(i, i + chunks));
}
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4
});
const stats = net.train(
  trainingData,
  {
    learningRate: 0.005,
    errorThresh: 0.02,
    log: (stats) => console.log(stats)
  }
);
// --------------------
// One step Forecast
// --------------------

const oneStepForecast = [];
trainingData.forEach((data) => {
  const scaledDownResult = net.run(data);
  const scaledUpResult = scale(scaledDownResult, scaledMin, scaledMax, min, max);
  oneStepForecast.push(scaledUpResult);
});
// console.log(resultForOneStepForecast);

// --------------------
// Many steps Forecast
// --------------------
const stepsNumber = 3;
let manyStepsForecast = net.forecast([
  trainingData[0][0],
  trainingData[0][1],
], stepsNumber);
manyStepsForecast = manyStepsForecast.map((step) => scale(step, scaledMin, scaledMax, min, max));
console.log(manyStepsForecast);


// Utility functions
// --------------------

function getMin(dataArr) {
  return Math.min(...dataArr.map((step) => {
    return Math.min(
      ...Object.values(step).filter((num) => {
        if (!isNaN(num)) {
          return num.toFixed(4);
        }
      }))
  }));
}
function getMax(dataArr) {
  return Math.max(...dataArr.map((step) => {
    return Math.max(
      ...Object.values(step).filter((num) => {
        if (!isNaN(num)) {
          return num.toFixed(4);
        }
      }))
  }));
}

// https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value/28957910
//         (b-a)(x - min)
// f(x) = --------------  + a
//           max - min

// https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value/28957910
// Array.prototype.scaleBetween = function(scaledMin, scaledMax) {
//   var max = Math.max.apply(Math, this);
//   var min = Math.min.apply(Math, this);
//   return this.map(num => (scaledMax - scaledMin) * (num - min) / (max - min) + scaledMin);
// }
function scale(step, scaledMin, scaledMax, min, max) {
  if (max - min == 0) {
    return {
      open: (scaledMin + scaledMax) / 2,
      high: (scaledMin + scaledMax) / 2,
      low: (scaledMin + scaledMax) / 2,
      close: (scaledMin + scaledMax) / 2,
    }
  }
  return {
    open: (scaledMax - scaledMin) * (step.open - min) / (max - min) + scaledMin,
    high: (scaledMax - scaledMin) * (step.high - min) / (max - min) + scaledMin,
    low: (scaledMax - scaledMin) * (step.low - min) / (max - min) + scaledMin,
    close: (scaledMax - scaledMin) * (step.close - min) / (max - min) + scaledMin,
  }
}
