// import redis from 'redis';
// import cors from 'cors';
var cors = require("cors");
// import path from 'path';
var bodyParser = require ("body-parser");
// import bodyParser from 'body-parser';
var redis = require("redis");
var express = require("express");
// import express from 'express';
var getAll = require("./serverHelpers.js")
// import {
//   getAll,
//   getAggregate,
//   getReviews,
//   getImages,
//   addReview,
//   updateReview,
//   deleteReview,
// } from './serverHelpers';
// import newrelic from 'newrelic';
// import { db } from '../review-database/connection';


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '54.193.1.144',
  database: 'testingsdc',
  password: '',
  port: '5432',
});


var client = redis.createClient();
client.on('ready', function() {
  console.log('ReDiS is ready');
});

client.on('error', function() {
  console.log('ErRoR in Redis');
});

// client.set(9000000, `[{"product_id":9000000,"five":11,"four":16,"three":7,"two":8,"one":10,"qty":52,"score":"3.2","username":" dolores nihil","img":" images (14).jpeg","title":" quos dolorem","rating":3,"date":" 2000-July-20","verified":false,"review":" corrupti eum facere qui saepe sapiente voluptatem iste"}]`)

// client.get(9000000, function(err,reply) {
//   console.log('ErRoR', err);
//   console.log('RePlY', reply);
// });

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());

const jsonParser = bodyParser.json();
app.use(jsonParser);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('https://s3-us-west-1.amazonaws.com/reviewsdc/reviewBundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/reviewBundle.js'));
});


// app.get('*/reviews/all/:productId', (req, res) => {
//   const product = Number(req.params.productId.replace(/[^0-9]/g,''));
// 	if (typeof product !== 'number') {
//     res.sendStatus(400);
//   }
//   getAll(product).then(summary => (res.send(summary)));
// });


app.get('*/reviews/all/:productId', (req, res, next) => {
  const product = Number(req.params.productId.replace(/[^0-9]/g, ''));
  if (typeof product !== 'number') {
    res.sendStatus(400);
  }
  client.get(product, (err, reply) => {
    // console.log('HiTtInG Redis', reply);
    if (reply !== null) {
      res.send(reply);
    } else {
      next();
    }
  });
}, (req, res) => {
  const product = Number(req.params.productId.replace(/[^0-9]/g, ''));
  if (typeof product !== 'number') {
    res.sendStatus(400);
  }
  // console.log('HiTtInG database');
  getAll(product).then((summary) => {
    client.set(product, JSON.stringify(summary));
    // console.log('PrOdUcT from promise', product);
    // console.log('SuMmArY from promise', summary);
    return res.send(summary);
  });
});

app.use('*/*', express.static('public'));

app.listen(port, () => {
  console.log('Listening on port:', port);
});


module.exports = {
  pool
}