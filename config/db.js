const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: '4510',
    port: 5432
});

pool.connect();

module.exports = pool