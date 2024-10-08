
import auth0 from './auth0';

export default function withAuth(handler) {
  return async (req, res) => {
    try {
      await auth0.handleProfile(req, res);
      return handler(req, res);
    } catch (error) {
      res.writeHead(302, {
        Location: '/api/login'
      });
      res.end();
    }
  };
}
