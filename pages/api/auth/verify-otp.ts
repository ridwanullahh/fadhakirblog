import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { otp } = req.body;

  if (otp === session.user.otp) {
    // OTP is correct, proceed with login
    return res.status(200).json({ message: 'OTP verified' });
  } else {
    // OTP is incorrect
    return res.status(400).json({ message: 'Invalid OTP' });
  }
};
