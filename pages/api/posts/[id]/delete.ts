
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount && result.rowCount > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
