
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://read_only_role_bseYTIApw5hBXcSbm9D:tHMZXQqI81wgtkOs0Rq57@viaduct.proxy.rlwy.net:31408/railway',
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    try {
      const { title, content, excerpt } = req.body;
      const query = 'UPDATE posts SET title = $1, content = $2, excerpt = $3 WHERE id = $4 RETURNING *';
      const values = [title, content, excerpt, id];
      const result = await client.query(query, values);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
