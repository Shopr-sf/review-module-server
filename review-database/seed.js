import fs from 'fs';
import Promise from 'bluebird';

import { addUsers } from './seedUsers.js';

import { productIds } from './loadAssets.js';

// TODO: remove unused imports
import {
  inclusiveRandom,
  randomArray,
  thirdOdds,
  seventhOdds,
  assignUser,
  generateTitle,
  generateReview,
  addImage,
  taskChain,
  taskChainCB,
} from './seedHelpers.js';

let reviewId = 1;

const stream = fs.createWriteStream('database/seed.sql');

const createReview = (product) => {
  return new Promise((resolve) => {
    const review = {};
    review.product = product;
    review.user = assignUser();
    review.rating = thirdOdds() ? 4 : inclusiveRandom(1, 5);
    review.title = generateTitle();
    // review.options = {}; // TODO: add generateOptions
    review.verified = thirdOdds() ? 1 : 0;
    review.helpful = thirdOdds() ? inclusiveRandom(1, 15) : 0;
    review.notHelpful = thirdOdds() ? inclusiveRandom(1, 15) : 0;
    review.images = [];
    review.id = reviewId;
    reviewId += 1;
    if (seventhOdds()) {
      randomArray(1, 6).forEach(() => {
        review.images.push(addImage(review.id));
      });
    }
    review.review = generateReview();
    let csv = `INSERT INTO reviews (id, user_id, product_id, rating, title, verified, review, helpful, not_helpful, abuse) VALUES(${review.id}, ${review.user}, ${review.product}, ${review.rating}, "${review.title}", ${review.verified}, "${review.review}", ${review.helpful}, ${review.notHelpful}, 0);`;
    if (review.images) {
      review.images.forEach((image) => {
        csv = `${csv}\nINSERT INTO images (review_id, title, url) VALUES(${image.review}, "${image.title}", "${image.url}");`;
      });
    }
    resolve(stream.write(`${csv}\n`));
  });
  /* if (inclusiveRandom(1, 10) === 7) {
  **   addComments(review);
  ** } TODO: add comments/reply data */
};

const productReviews = product => randomArray(1, 20).map(x => createReview(product));

addUsers().then(csv => stream.write(csv)).then(() => {
  const allReviews = productIds.map((product) => {
    return new Promise((resolve) => {
      resolve(taskChain(productReviews(product)));
    });
  });
  taskChainCB(allReviews, () => stream.end());
});
