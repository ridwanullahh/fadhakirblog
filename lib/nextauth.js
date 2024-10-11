
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

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const { email, password } = credentials;
      const user = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (user && await compare(password, user.password)) {
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await query('UPDATE users SET otp = $1 WHERE email = $2', [otp, email]);

        // Send OTP to user's email
        await transporter.sendMail({
          to: email,
          from: process.env.EMAIL_FROM,
          subject: 'Your OTP Code',
          text: `Your OTP code is ${otp}`,
        });

        // Return user object with OTP
        return { id: user.id, name: user.name, email: user.email, role: user.role, otp };
      }
      return null;
    },
  }),
];

console.log('Providers:', providers);

export default NextAuth({
  providers,
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
