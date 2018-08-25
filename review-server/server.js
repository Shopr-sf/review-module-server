var cors = require("cors");
var bodyParser = require ("body-parser");
var redis = require("redis");
var express = require("express");
var helper = require("./serverHelpers.js")
var client = redis.createClient();
client.on('ready', function() {
});

client.on('error', function() {
});


const app = express();
const port = process.env.PORT || 3004;

app.use(cors());

const jsonParser = bodyParser.json();
app.use(jsonParser);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);


app.use('/:productId', express.static('../public/index.html'));

app.get('/index.html', express.static('../public/index.html'));

app.get('/loaderio-734a350a1954178baf504e84a791151e', (req, res) => {
  res.sendFile('/home/ec2-user/serverSDC/review-module-server/loaderio-734a350a1954178baf504e84a791151e.txt');
});

app.get('/reviews/all/:productId', (req, res, next) => {
  const product = Number(req.params.productId.replace(/[^0-9]/g, ''));
  if (typeof product !== 'number') {
    res.sendStatus(400);
  }
  client.get(product, (err, reply) => {
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
  helper.getAll(product).then((summary) => {
    client.set(product, JSON.stringify(summary), 'EX', 60);
    return res.send(summary);
  });
});


app.listen(port, () => {
});
