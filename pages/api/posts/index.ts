
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const result = await pool.query('SELECT * FROM posts WHERE category = $1', [category]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, author, category, status, created_at, updated_at } = req.body;
      const result = await pool.query(
        'INSERT INTO posts (title, content, author, category, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, content, author, category, status, created_at, updated_at]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
