
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    try {
      const { title, content, excerpt } = req.body;
      const response = await fetch(`https://app.teable.io/api/table/${process.env.TEABLE_TABLE_ID}/record/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.TEABLE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          record: {
            fields: {
              title,
              content,
              excerpt
            }
          }
        })
      });
      const result = await response.json();
      res.status(200).json(result.record);
    } catch {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
