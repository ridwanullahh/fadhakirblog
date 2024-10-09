
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const createTableAndInsertUser = async () => {
  try {
    await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, role VARCHAR(50) NOT NULL);');

    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    await client.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING', 
      ['Admin', 'admin@example.com', hashedPassword, 'admin']);

    console.log('User table created and default admin user inserted.');
  } catch (err) {
    console.error('Error creating table or inserting user:', err);
  } finally {
    client.end();
  }
};

createTableAndInsertUser();
