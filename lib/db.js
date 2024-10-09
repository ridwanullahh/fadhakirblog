
import { XataClient } from '@xata.io/client';
import 'dotenv/config';

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.DATABASE_URL,
});

module.exports = {
  query: async (text, params) => {
    const result = await xata.db.query(text, params);
    return result;
  },
};
