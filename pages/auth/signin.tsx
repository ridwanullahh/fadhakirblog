import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      console.error('Sign-in error:', result.error);
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
