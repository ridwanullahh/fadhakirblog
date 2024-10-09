
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const updateUserTable = async () => {
  try {
    await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(100) NOT NULL;');
    await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL;');
    console.log('User table updated successfully.');
  } catch (err) {
    console.error('Error updating user table:', err);
  } finally {
    client.end();
  }
};

updateUserTable();
