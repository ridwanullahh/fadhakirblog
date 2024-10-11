
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://l3o06d:xau_652JC3hVSqIPnH6IVaJerJcLK3ctQaPu1@us-east-1.sql.xata.sh/fadhakir:main?sslmode=require',
});

async function updateTable() {
  await client.connect();
  await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS otp VARCHAR(6);');
  await client.end();
}

updateTable().catch(err => console.error('Error updating user table:', err));
