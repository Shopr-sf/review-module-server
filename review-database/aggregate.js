import fs from 'fs';
import Promise from 'bluebird';

import { productIds } from './loadAssets';
import { taskChainCB } from './seedHelpers';
import { db } from './connection';

const generateAggregate = product => new Promise((resolve) => {
  db.query(`SELECT rating FROM reviews WHERE product_id=${product};`, (err, data) => {
    if (err) throw err;
    const aggregates = {};
    let total = 0;
    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;
    data.forEach((rating) => {
      total += rating.rating;
      if (rating.rating === 5) five += 1;
      if (rating.rating === 4) four += 1;
      if (rating.rating === 3) three += 1;
      if (rating.rating === 2) two += 1;
      if (rating.rating === 1) one += 1;
    });
    aggregates.score = Math.round(total / data.length * 2) / 2;
    aggregates.qty = data.length;
    resolve(`INSERT INTO aggregates (product_id, score, qty, five, four, three, two, one) VALUES(${product}, ${aggregates.score}, ${aggregates.qty}, ${five}, ${four}, ${three}, ${two}, ${one});\n`);
  });
});

const aggregates = productIds.map(product => generateAggregate(product));

const stream = fs.createWriteStream('database/aggregate.sql');

taskChainCB(aggregates, csv => stream.write(`USE reviews;\n${csv.join('')}`)).then(() => stream.end());
