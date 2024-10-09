
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const res = await query('SELECT * FROM users WHERE email = $1', [credentials.email]);
        const user = res.rows[0];

        if (user && await compare(credentials.password, user.password)) {
          // Generate OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          // Send OTP to user's email
          await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
          });
          // Store OTP in session
          user.otp = otp;
          return { id: user.id, name: user.name, email: user.email, role: user.role, otp: otp };
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
