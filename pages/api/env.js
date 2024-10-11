
export default function handler(req, res) {
  res.status(200).json({
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
  });
}
