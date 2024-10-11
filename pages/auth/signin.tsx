import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        console.error('Sign-in error:', result.error);
      } else {
        setShowOtpInput(true);
      }
    } else {
      const result = await signIn('otp', {
        redirect: false,
        email,
        otp,
      });
      if (result.error) {
        console.error('OTP verification error:', result.error);
      }
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
         {showOtpInput && (
           <input
             type="text"
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             placeholder="OTP"
           />
         )}
         <button type="submit">{showOtpInput ? 'Verify OTP' : 'Sign In'}</button>
      </form>
    </div>
  );
};

export default SignIn;
