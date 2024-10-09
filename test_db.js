const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    client.end();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
    client.end();
  });
