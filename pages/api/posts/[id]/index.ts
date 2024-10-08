
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    try {
      const { title, content, excerpt } = req.body;
      const response = await fetch(`https://app.teable.io/api/table/tblwt4j33C0EwVySweN/record/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer teable_accu6zdOIvs6FaWYaKt_dBtNWpw9DTd1y4VJQh5yj+IL/G6uDxkTLsV+ENum56Y=',
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
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
