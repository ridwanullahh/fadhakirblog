
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import nodemailer from 'nodemailer';
import { query } from './db';
import { compare } from 'bcryptjs';

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



export default NextAuth({
  providers: [],
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
