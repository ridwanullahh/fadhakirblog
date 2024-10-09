const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const updateTable = async () => {
  try {
    await client.query('ALTER TABLE users ADD COLUMN otp VARCHAR(6)');
    console.log('User table updated successfully.');
  } catch (err) {
    console.error('Error updating user table:', err);
  } finally {
    client.end();
  }
};

updateTable();
