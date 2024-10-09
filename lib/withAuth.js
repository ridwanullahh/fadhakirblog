
import { getSession } from 'next-auth/react';

export default function withAuth(handler) {
  return async (req, res) => {
    const session = await getSession({ req });
    if (!session || !session.user || session.user.role !== 'admin') {
      res.writeHead(302, { Location: '/api/auth/signin' });
      res.end();
      return;
    }
    return handler(req, res);
  };
}
