
import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET || 'a long, randomly-generated string stored in env',
    cookieLifetime: 7200,
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false
  }
});
