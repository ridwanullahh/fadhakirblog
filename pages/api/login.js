
import { getSession } from 'next-auth/react';

export default async function login(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ message: 'Already logged in' });
  } else {
    res.redirect('/auth/signin');
  }
}
