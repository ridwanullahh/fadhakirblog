
import { NextApiRequest, NextApiResponse } from 'next';
import { XataApiClient } from '@xata.io/client';

const xata = new XataApiClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const result = await xata.db.query('SELECT * FROM posts WHERE id = $1', [id]);
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      console.error('Error stack:', error.stack);
      console.error('Error details:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content, author, category, status, updated_at } = req.body;
      const result = await xata.db.query(
        'UPDATE posts SET title = $1, content = $2, author = $3, category = $4, status = $5, updated_at = $6 WHERE id = $7 RETURNING *',
        [title, content, author, category, status, updated_at, id]
      );
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
