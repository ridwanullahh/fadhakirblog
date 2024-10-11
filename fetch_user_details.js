
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://l3o06d:xau_652JC3hVSqIPnH6IVaJerJcLK3ctQaPu1@us-east-1.sql.xata.sh/fadhakir:main?sslmode=require',
});

async function fetchUserDetails() {
  await client.connect();
  const res = await client.query('SELECT email, password FROM users LIMIT 1');
  console.log(res.rows);
  await client.end();
}

fetchUserDetails().catch(err => console.error('Error fetching user details:', err));
