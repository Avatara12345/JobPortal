// app/user-dashboard/layout.tsx
'use client';
import UserSidebar from '../components/UserSidebar';
import { ReactNode } from 'react';

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      
      <UserSidebar />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
