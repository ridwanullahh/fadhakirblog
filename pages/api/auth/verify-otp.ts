import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface UserWithOTP {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  otp?: string;
}

const verifyOtpHandler = async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getSession({ req });

   if (!session || !session.user) {
     return res.status(401).json({ message: 'Unauthorized' });
   }

   const user = session.user as UserWithOTP;
   const { otp } = req.body;

   if (otp === user.otp) {
     // OTP is correct, proceed with login
     return res.status(200).json({ message: 'OTP verified' });
   } else {
     // OTP is incorrect
     return res.status(400).json({ message: 'Invalid OTP' });
   }
}
export default verifyOtpHandler;
