
const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: 'https://app.teable.io/api',
  headers: {
    Authorization: `Bearer ${process.env.TEABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function listTables() {
  try {
    const response = await api.get(`/base/${process.env.TEABLE_BASE_ID}/table`);
    console.log('Tables:', response.data);
  } catch (error) {
    console.error('Error fetching tables:', error);
  }
}

listTables();
