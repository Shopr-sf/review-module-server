var nr = require('newrelic');
require('babel-register')({
  presets: ['env'],
});

module.exports = require('./server.js');
