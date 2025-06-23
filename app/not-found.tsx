
'use client';
import Link from 'next/link';
import { CiFaceFrown } from "react-icons/ci";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
    <CiFaceFrown className="w-15 h-15 text-gray-400" />
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        href="/"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Go back home
      </Link>
    </div>
  );
}
