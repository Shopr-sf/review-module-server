const { Pool } = require('pg');

const pool = new Pool({
  user: 'power_user',
  host: '54.193.1.144',
  database: 'testingsdc',
  password: 'p4ssw0rd',
  port: '5432',
});

module.exports = {
  pool
};
