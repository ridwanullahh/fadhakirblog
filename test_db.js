
const db = require('./lib/db');

async function testConnection() {
  try {
    const res = await db.query('SELECT * FROM blog_post LIMIT 1');
    console.log('Connection successful:', res.rows);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
