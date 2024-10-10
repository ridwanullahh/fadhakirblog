
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('Connected to the database successfully.');
    client.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
