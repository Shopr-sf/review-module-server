import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import {
  getAggregate,
  getReviews,
  getImages,
  addReview,
  updateReview,
  deleteReview,
} from './serverHelpers';

// import { db } from '../review-database/connection';

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());

const jsonParser = bodyParser.json();
app.use(jsonParser);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('*/reviewBundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/reviewBundle.js'));
});

app.get('*/reviews/summary/:productId', (req, res) => {
  const product = Number(req.params.productId.replace(/[^0-9]/g,''));
	if (typeof product !== 'number') {
    res.sendStatus(400);
  }
  getAggregate(product).then(summary => (res.send(summary)));
});

app.get('*/reviews/:productId', (req, res) => {
  const product = Number(req.params.productId.replace(/[^0-9]/g,''));
	if (typeof product !== 'number') res.sendStatus(400);
  getReviews(product, getImages).then(results => res.send(results));
});

app.get('*/reviews/comments/:reviewId', (req, res) => {
  // TODO: add comment viewing
  res.send();
});

app.post('*/reviews/adduser', (req, res) => {
  const { username, img } = req.body;
  addReview(username, img, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(201);
    return null;
  });
});

app.put('*/reviews/updateuser', (req, res) => {
  const { username, img, id } = req.body;
  updateReview(username, img, id, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(201);
    return null;
  });
});

app.delete('*/reviews/deleteuser', (req, res) => {
  const { id } = req.body;
  deleteReview(id, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(201);
    return null;
  });
});

app.use('*/*', express.static('public'));

app.listen(port, () => {
  console.log('Listening on port:', port);
});
