
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'GET') {
  try {
    const { category } = req.query;
    const response = await fetch(`https://app.teable.io/api/table/tblwt4j33C0EwVySweN/record?filterByFormula={category}='${category}'`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.TEABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    res.status(200).json(result.records);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
} else if (req.method === 'POST') {
    try {
      const { title, content, excerpt } = req.body;
      const response = await fetch(`https://app.teable.io/api/table/${process.env.TEABLE_TABLE_ID}/record`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.TEABLE_API_TOKEN}`,
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
