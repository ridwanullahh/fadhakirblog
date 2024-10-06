
import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://fadhakir.pockethost.io');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const record = await pb.collection('posts').getOne(id as string);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}
