const fs = require('fs');
// generates an array of names
// receives the length of your desired list of names (defaults to 10M)
console.time('Function #1');



const aggregateGen = (start, end) => {
  let output = [];
  let outputObj = {};
  for (let i = start; i <= end; i += 1) {
    outputObj = {
      id: i,
      product_id: i,
      score: 4,
      five: Math.floor(Math.random() * (10)),
      four: Math.floor(Math.random() * (10)),
      three: Math.floor(Math.random() * (10)),
      two: Math.floor(Math.random() * (10)),
      one: Math.floor(Math.random() * (10)),
    };
    outputObj.qty = outputObj.five + outputObj.four + outputObj.three + outputObj.two + outputObj.one;
    output.push(outputObj);
  }
  return output;
};

for (let i = 0; i < 10; i += 1) {
  let result = aggregateGen(i * 1000000 + 1, (i + 1) * 1000000);
  console.log(i);
  fs.appendFileSync('message.csv', JSON.stringify(result), 'utf8');
}
// result = aggregateGen(1000000);
console.timeEnd('Function #1');


// const renderNamesToIds = (num = 10 ** 7) => {
// 	const names = [
// 		'product',
// 		'item',
// 		'listing',
// 		'page',
// 		'sku',
// 		'info',
// 		'number',
// 		'element',
// 		'asset',
// 		'which',
// 	];
// 	const keys = [];
// 	const renderKey = (string) => {
// 		const index = string[string.length - 1];
// 		return names[index] + string;
// 	};
// 	for (let i = 0; i < num; i++) {
// 		keys.push(renderKey(i.toString()));
// 	}
// 	return keys;
// };

// // incrementing array for a given size
// const fixedArray = (size) => {
//   return Array(size).fill().map((x, i) => i + 1);
// };
