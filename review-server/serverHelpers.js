var Promise = require('bluebird');

var connectServer = require('./connection.js');


const getAll = productId => new Promise((resolve) => {
  connectServer.pool.query('SELECT * FROM alltable WHERE product_id = ($1)', [productId])
    .then((res) => {
      resolve(res.rows);
    })
    .catch(e => console.error(e.stack));
});


module.exports = {
  getAll
};
