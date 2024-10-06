
import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://fadhakir.pockethost.io');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await pb.collection('posts').getFullList();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
