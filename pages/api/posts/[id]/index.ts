
import { NextApiRequest, NextApiResponse } from 'next';
import { query as dbQuery } from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
       const result = await dbQuery('SELECT * FROM posts WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
       if (error instanceof Error) {
         console.error('Error stack:', error.stack);
       }
      console.error('Error details:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content, author, category, status, updated_at } = req.body;
       const result = await dbQuery(
        'UPDATE posts SET title = $1, content = $2, author = $3, category = $4, status = $5, updated_at = $6 WHERE id = $7 RETURNING *',
        [title, content, author, category, status, updated_at, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
