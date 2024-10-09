import { useState } from 'react';
import { useRouter } from 'next/router';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verify OTP logic here
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });

    if (response.ok) {
      router.push('/admin');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
