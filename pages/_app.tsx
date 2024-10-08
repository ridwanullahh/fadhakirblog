
import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp
