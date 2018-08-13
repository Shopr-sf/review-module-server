import Promise from 'bluebird';

import { db } from '../review-database/connection';
// import { generateUsername } from '../review-database/seedHelpers';

// getAggregate is a function that passes in 'prouctId' as parameter, and ouputs a promise
const getAggregate = productId => new Promise((resolve) => {
  db.query(`SELECT * FROM aggregates WHERE product_id=${productId};`, (err, data) => {
    if (err) return 404;
    resolve(data);
    return null;
  });
});

const getReviews = (product, callback) => new Promise((resolve) => {
  console.log(product);
  db.query(`SELECT * FROM reviews INNER JOIN users ON reviews.user_id=users.id WHERE product_id=${product}`, (err, data) => {
    if (err) return 404;
    console.log('Db data: ', data);
    resolve(callback(data));
    return null;
  });
});

// const getImages = (reviews) => {
//   const results = {};
//   results.reviews = reviews;
//   let queryString = '';
//   return new Promise((resolve) => {
//     reviews.forEach((review) => {
//       queryString += `SELECT review_id, title, url FROM images WHERE review_id=${review.id};`;
//     });
//     db.query(queryString, (err, data) => {
//       if (err) return 404;
//       results.images = data;
//       resolve(results);
//       return null;
//     });
//   });
// };


const getImages = (reviews) => {
  const results = {};
  results.reviews = reviews;
  return new Promise((resolve) => {
    results.images = [[{ url: 'images (18) copy.jpeg' }, { url: 'images (18) copy.jpeg' }, { url: 'images (18) copy.jpeg' }, { url: 'images (18) copy.jpeg' }, { url: 'images (18) copy.jpeg' }, { url: 'images (18) copy.jpeg' }]];
    resolve(results);
  });
};


// TODO: complete
const getComments = review => new Promise((resolve) => {
  db.query(`SELECT * FROM comments WHERE review_id=${review};`, (err, data) => {
    if (err) return 404;
    resolve(data);
    return null;
  });
});

// TODO: complete
const addReview = (username, img, callback) => {
// add users record if new
// add reviews record (w/ foreign key user_id)
// add images record if applicable (w/ foreign key review_id)
// update/get aggregates
  db.query('INSERT INTO users(username, img) VALUES(?, ?)', [username, img], callback);
};


// TODO: complete
const updateReview = (username, img, id, callback) => {
  db.query('UPDATE users SET username = ?, img = ? WHERE (id = ?)', [username, img, id], callback);
// increment/decrement helpful, not_helpful, or abuse in review record
};

const deleteReview = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

export {
  getAggregate,
  getReviews,
  getImages,
  getComments,
  addReview,
  updateReview,
  deleteReview,
};
