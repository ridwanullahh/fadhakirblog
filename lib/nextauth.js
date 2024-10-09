
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import nodemailer from 'nodemailer';
import { query } from './db';
import { compare } from 'bcryptjs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationRequest = ({ identifier: email, url, token, baseUrl, provider }) => {
  return transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your sign-in link for ' + baseUrl,
    text: `Sign in to ${baseUrl}

${url}

`,
    html: `<p>Sign in to <strong>${baseUrl}</strong></p><p><a href="${url}">Sign in</a></p>`,
  });
};

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const res = await query('SELECT * FROM users WHERE email = $1', [credentials.email]);
        const user = res.rows[0];

        if (user && await compare(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  events: {
    async signIn(message) {
      const { user } = message;
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: 'New sign-in to your account',
        text: `Hello ${user.name},

A new sign-in to your account was detected.

If this was not you, please contact support immediately.`,
      });
    },
  },
});
