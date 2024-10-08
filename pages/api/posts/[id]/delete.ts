
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      const response = await fetch(`https://app.teable.io/api/table/${process.env.TEABLE_TABLE_ID}/record/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.TEABLE_API_TOKEN}`,
        }
      });
      if (response.ok) {
        res.status(204).end();
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
      res.status(204).end();
    } catch {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
  }
}
