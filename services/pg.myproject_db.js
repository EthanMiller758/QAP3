const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myproject',
  password: 'Amazing@2334',
  port: 5432,
});

// this will connect PostgreSQL to my directory.

if(DEBUG) console.log("connected to PostgreSQL...");

module.exports = pool;

