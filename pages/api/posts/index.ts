
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content, excerpt } = req.body;
      const response = await fetch('https://app.teable.io/api/table/tblwt4j33C0EwVySweN/record', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer teable_accu6zdOIvs6FaWYaKt_dBtNWpw9DTd1y4VJQh5yj+IL/G6uDxkTLsV+ENum56Y=',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                title,
                content,
                excerpt
              }
            }
          ]
        })
      });
      const result = await response.json();
      res.status(201).json(result.records[0]);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
