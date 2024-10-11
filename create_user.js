
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: 'postgresql://l3o06d:xau_652JC3hVSqIPnH6IVaJerJcLK3ctQaPu1@us-east-1.sql.xata.sh/fadhakir:main?sslmode=require',
});

async function createUser() {
  await client.connect();
  const hashedPassword = await bcrypt.hash('password123', 10);
  await client.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', ['Test User', 'testuser@example.com', hashedPassword, 'user']);
  await client.end();
}

createUser().catch(err => console.error('Error creating user:', err));
