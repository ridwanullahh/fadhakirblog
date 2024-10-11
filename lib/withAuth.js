
import { getSession } from 'next-auth/react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!session || session.user.role !== 'admin') {
        router.push('/api/auth/signin');
      }
    }, [session, status, router]);

    if (status === 'loading' || !session || session.user.role !== 'admin') {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
