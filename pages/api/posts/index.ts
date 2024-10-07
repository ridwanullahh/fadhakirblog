
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://read_only_role_bseYTIApw5hBXcSbm9D:tHMZXQqI81wgtkOs0Rq57@viaduct.proxy.rlwy.net:31408/railway',
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content, excerpt } = req.body;
      const query = 'INSERT INTO posts (title, content, excerpt) VALUES ($1, $2, $3) RETURNING *';
      const values = [title, content, excerpt];
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
