const brain = require('brain.js');


const restaurants = {
  "Restaurant 1": "Monday",
  "Restaurant 2": "Tuesday",
  "Restaurant 3": "Wednesday",
  "Restaurant 4": "Thursday",
  "Restaurant 5": "Friday",
  "Restaurant 6": "Saturday",
  "Restaurant 7": "Sunday",
};
// input: { 'Monday', 'Saturday', ...}
// output: { 'Restaurant 1', 'Restaurant 6', ...}


const trainingData = [];
for (const restaurantName in restaurants) {
  if (restaurants.hasOwnProperty(restaurantName)) {
    const dayOfWeek = restaurants[restaurantName];
    trainingData.push({
      input: { [dayOfWeek]: 1 },
      output: { [restaurantName]: 1 },
    });
  }
}
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [4], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};
const net = new brain.NeuralNetwork(config);

const stats = net.train(trainingData);

console.log(stats);

const result = net.run({
  'Monday': 1
});

console.log(result);


// string in => string out
function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  let highestValue = 0;
  let highestRestaurantName = '';
  for (const restaurantName in result) {
    if (result.hasOwnProperty(restaurantName)) {
      if (result[restaurantName] > highestValue) {
        highestValue = result[restaurantName];
        highestRestaurantName = restaurantName;
      }
    }
  }
  return highestRestaurantName;
}

for (const restaurant in restaurants) {
  if (restaurants.hasOwnProperty(restaurant)) {
    const dayOfWeek = restaurants[restaurant];
    console.log(restaurantForDay(dayOfWeek));
  }
}

const dayOfWeekMap = [
  ...Object.values(restaurants)
]
console.log(dayOfWeekMap);
for (let i = 0; i < 100; i++) {
  const randomDay = Math.floor(Math.random() * 7);
  const dayOfWeek = dayOfWeekMap[randomDay];
  const restaurant = restaurantForDay(dayOfWeek);
  console.log(`${dayOfWeek} we go to ${restaurant}.`);
}
