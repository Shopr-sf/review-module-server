import Promise from 'bluebird';

import {
  hipsum,
  profilePics,
  productPics,
} from './loadAssets.js';

import { db } from './connection.js';

const inclusiveRandom = (min, max) => {
  const minR = Math.ceil(min);
  const maxR = Math.floor(max);
  return Math.floor(Math.random() * (maxR - minR + 1)) + minR;
};

const randomArray = (min, max) => {
  return Array.apply(null, Array(inclusiveRandom(min, max))).map((x, i) => i);
};

const fixedArray = (size) => {
  return Array(size).fill().map((x, i) => i + 1);
};

const thirdOdds = () => inclusiveRandom(1, 3) === 3;

const seventhOdds = () => inclusiveRandom(1, 7) === 3;

const randomHipsum = () => hipsum[inclusiveRandom(0, 14)];

const randomProfilePic = () => profilePics[inclusiveRandom(0, 25)];

const randomProductPic = () => productPics[inclusiveRandom(0, productPics.length - 1)];

const generateUsername = () => {
  const startIndex = inclusiveRandom(0, 100);
  return randomHipsum().slice(startIndex).split(' ')[0];
};

const assignUser = () => {
  return thirdOdds() ? inclusiveRandom(200, 250) : inclusiveRandom(1, 199);
};

const generateTitle = () => {
  const startIndex = inclusiveRandom(0, 100);
  const endIndex = inclusiveRandom(startIndex + 5, startIndex + 100);
  return randomHipsum().slice(startIndex, endIndex);
};

const generateReview = () => {
  let review = '';
  randomArray(1, 7).forEach(() => {
    review = `${review}${randomHipsum()}\n`;
  });
  return review.slice(0, review.length - 3);
};
/** TODO: improve review algorithm
** const length = inclusiveRandom(1, 5);
** hipsum.forEach((paragraph) => {
** if (inclusiveRandom(1, 7) === 3) {
** const sentences = paragraph.split('.');
** sentences.forEach((sentence) => {
** inclusiveRandom(1, 5) === 3 ? review.push(sentence); */

const addImage = (review) => {
  const img = {};
  img.review = review;
  img.title = generateTitle();
  img.url = randomProductPic();
  return img;
};

/* TODO: generate comments/replies
** const addComments = (review) => {
**  assignUser();
** }; */

const taskChain = (array) => {
  return array.reduce((promiseChain, task) => {
    return promiseChain.then(chainResults => task.then(currentResult => [...chainResults, currentResult]));
  }, Promise.resolve([]));
};

const taskChainCB = (array, callback) => {
  if (!array) return [];
  return array.reduce((promiseChain, task) => {
    return promiseChain.then(chainResults => task.then(currentResult => [...chainResults, currentResult]));
  }, Promise.resolve([]))
    .then(arrayOfResults => callback(arrayOfResults));
};

export {
  inclusiveRandom,
  randomArray,
  fixedArray,
  thirdOdds,
  seventhOdds,
  generateUsername,
  randomProfilePic,
  assignUser,
  generateTitle,
  generateReview,
  addImage,
  taskChain,
  taskChainCB,
};
