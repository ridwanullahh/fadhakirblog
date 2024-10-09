
import { getSession, signOut } from 'next-auth/react';

export default async function logout(req, res) {
  const session = await getSession({ req });
  if (session) {
    await signOut({ redirect: false });
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(200).json({ message: 'Not logged in' });
  }
}
