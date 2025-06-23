'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromLocalStorage } from '../../utils/auth';
import Loading from '@/app/components/Loading';
export default function UserDashboard() {

  const router = useRouter();
  const [loading]=useState();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user || (user.role !== 'user' && user.role !== 'admin')) {
      router.push('/login');
    }
  });

  if (loading) {
    return <Loading/>
  }
  return (
    <div className="flex min-h-screen">

      <div className="flex-1 p-6">
        
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
            <p>Select a section from the sidebar.</p>
          </div>

      </div>
    </div>
  );
}
