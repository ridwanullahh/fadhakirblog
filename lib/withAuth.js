
import auth0 from './auth0';

export default function withAuth(handler) {
  return async (req, res) => {
    try {
      const session = await auth0.getSession(req, res);
if (!session || !session.user || !session.user['https://example.com/roles'].includes('admin')) {
  res.redirect(302, '/api/login');
  return;
}
      return handler(req, res);
    } catch {
      res.writeHead(302, {
        Location: '/api/login'
      });
      res.end();
    }
  };
}
