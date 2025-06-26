'use client';
import { useState } from 'react';
import Loading from '../../components/Loading';
export default function UserDashboard() {
  const [loading]=useState()

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
