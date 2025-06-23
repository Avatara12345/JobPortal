// components/UserSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function UserSidebar() {
  const pathname = usePathname();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const navItems = [
    { label: "Dashboard Home", href: "/user-dashboard" },
    { label: "Applied Jobs", href: "/user-dashboard/appliedJobs" },
    { label: "Edit Profile", href: "/user-dashboard/editProfile" },
  ];

  return (
    <div className="w-64 bg-gray-100 p-6">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {user.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <div>
          <p className="font-medium text-sm">{user.name || "User"}</p>
          <p className="text-xs text-gray-500 truncate max-w-[180px]">
            {user.email || ""}
          </p>
        </div>
      </div>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={clsx(
                "block px-4 py-2 rounded hover:bg-blue-100",
                pathname === item.href && "bg-blue-500 text-white"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
