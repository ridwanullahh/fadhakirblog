
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  getRecords: async () => {
    try {
      const result = await pool.query('SELECT * FROM posts');
      return result.rows;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },
  createRecord: async (record) => {
    try {
      const result = await pool.query(
        'INSERT INTO posts (title, content, author, category, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [record.title, record.content, record.author, record.category, record.status, record.created_at, record.updated_at]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  },
  updateRecord: async (recordId, record) => {
    try {
      const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2, author = $3, category = $4, status = $5, updated_at = $6 WHERE id = $7 RETURNING *',
        [record.title, record.content, record.author, record.category, record.status, record.updated_at, recordId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  },
  deleteRecord: async (recordId) => {
    try {
      const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [recordId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  },
};
