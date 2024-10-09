
import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = {
  query: async (text, params) => {
    const result = await client.query(text, params);
    return result;
  },
};
