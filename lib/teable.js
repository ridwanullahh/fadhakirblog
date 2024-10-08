
import axios from 'axios';
import 'dotenv/config';

console.log('TEABLE_API_TOKEN:', process.env.TEABLE_API_TOKEN);
const api = axios.create({
  baseURL: 'https://app.teable.io/api',
  headers: {
    Authorization: `Bearer ${process.env.TEABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

module.exports = {
  getRecords: async (tableId) => {
    try {
      const response = await api.get(`/table/${tableId}/record`);
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },
  createRecord: async (tableId, record) => {
    try {
      const response = await api.post(`/table/${tableId}/record`, { records: [record] });
      return response.data;
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  },
  updateRecord: async (tableId, recordId, record) => {
    try {
      const response = await api.patch(`/table/${tableId}/record/${recordId}`, { record });
      return response.data;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  },
  deleteRecord: async (tableId, recordId) => {
    try {
      const response = await api.delete(`/table/${tableId}/record/${recordId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  },
};
