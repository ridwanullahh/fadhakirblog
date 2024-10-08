
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      const response = await fetch(`https://app.teable.io/api/table/tblwt4j33C0EwVySweN/record/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer teable_accu6zdOIvs6FaWYaKt_dBtNWpw9DTd1y4VJQh5yj+IL/G6uDxkTLsV+ENum56Y='
        }
      });
      if (response.ok) {
        res.status(204).end();
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
  }
}
