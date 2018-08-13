const fs = require('fs');

console.time('Function #1');
let five;
let four;
let three;
let two;
let one;
let output;
let sum;
const aggregateGen = (start, end) => {
  output = '';
  for (let i = start; i <= end; i += 1) {
    five = Math.floor(Math.random() * (10));
    four = Math.floor(Math.random() * (10));
    three = Math.floor(Math.random() * (10));
    two = Math.floor(Math.random() * (10));
    one = Math.floor(Math.random() * (10));
    sum = five + four + three + two + one;
    output = output.concat(i, ', ', i, ', ', 4, ', ', five, ', ', four, ', ', three, ', ', two, ', ', one, ',', sum, '\n');
  }
  return output;
};
for (let i = 0; i < 10; i += 1) {
  console.log(i);
  fs.appendFileSync('aggregate.csv', aggregateGen(i * 100 + 1, (i + 1) * 100), 'utf8');
}

console.timeEnd('Function #1');