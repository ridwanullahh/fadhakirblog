
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://read_only_role_bseYTIApw5hBXcSbm9D:tHMZXQqI81wgtkOs0Rq57@viaduct.proxy.rlwy.net:31408/railway',
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      const query = 'DELETE FROM posts WHERE id = $1';
      const values = [id];
      await client.query(query, values);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
