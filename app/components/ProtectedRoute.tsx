'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, allowedRoles }: {
  children: React.ReactNode,
  allowedRoles: string[]
}) {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    if (!allowedRoles.includes(user.role)) {
      router.push('/');
    }
  }, [router, allowedRoles]);

  return <>{children}</>;
}
