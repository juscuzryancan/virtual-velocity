// Connect to DB
const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/graceshopper?sslmode=disable');

module.exports = {
  client
};
