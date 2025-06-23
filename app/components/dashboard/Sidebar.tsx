'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { name: "Jobs", href: "/admin/jobs", icon: "💼" },
  { name: "Applications", href: "/admin/applications", icon: "📝" },
];

const userLinks = [
  { name: "Dashboard", href: "/user/dashboard", icon: "📊" },
  { name: "Applications", href: "/user/applications", icon: "📝" },
  { name: "Profile", href: "/user/profile", icon: "👤" },
];

export function Sidebar({ role }: { role: 'admin' | 'user' }) {
  const pathname = usePathname();
  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-64 border-r bg-white p-4">
      <div className="mb-8 p-2">
        <h2 className="text-xl font-bold">
          {role === 'admin' ? 'Admin Portal' : 'My Dashboard'}
        </h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center p-2 rounded-lg ${
                  pathname === link.href 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}