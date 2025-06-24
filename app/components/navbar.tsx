// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import {
  FiHome,
  FiBriefcase,
  FiInfo,
  FiMail,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { RiDashboardLine, RiAdminLine } from "react-icons/ri";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showUserInfo, setShowUserInfo] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserInfo(false);
      }
    };

    if (showUserInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserInfo]);

  if (!isHydrated) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" icon={<FiHome className="mr-1" />}>
              Home
            </NavLink>
            <NavLink href="/jobs" icon={<FiBriefcase className="mr-1" />}>
              Jobs
            </NavLink>
            <NavLink href="/about" icon={<FiInfo className="mr-1" />}>
              About
            </NavLink>
            <NavLink href="/contact" icon={<FiMail className="mr-1" />}>
              Contact
            </NavLink>

            {user && (
              <NavLink
                href="/user-dashboard"
                icon={<RiDashboardLine className="mr-1" />}
              >
                Dashboard
              </NavLink>
            )}

            {user?.role === "admin" && (
              <NavLink
                href="/admin-dashboard"
                icon={<RiAdminLine className="mr-1" />}
              >
                Admin
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserInfo((prev) => !prev)}
                    className="text-gray-600 font-medium flex items-center focus:outline-none"
                  >
                    <FiUser className="mr-1" />
                  </button>

                  {showUserInfo && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        Hello, {user?.role || "User"} 👋
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" icon={<FiHome className="mr-2" />}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/jobs" icon={<FiBriefcase className="mr-2" />}>
              Jobs
            </MobileNavLink>
            <MobileNavLink href="/about" icon={<FiInfo className="mr-2" />}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" icon={<FiMail className="mr-2" />}>
              Contact
            </MobileNavLink>

            {user && (
              <MobileNavLink
                href="/user-dashboard"
                icon={<RiDashboardLine className="mr-2" />}
              >
                Dashboard
              </MobileNavLink>
            )}

            {user?.role === "admin" && (
              <MobileNavLink
                href="/admin-dashboard"
                icon={<RiAdminLine className="mr-2" />}
              >
                Admin
              </MobileNavLink>
            )}

            <div className="border-t border-gray-200 pt-4 mt-2">
              {!user ? (
                <div className="flex space-x-2">
                  <Link
                    href="/login"
                    className="w-full px-4 py-2 text-center text-indigo-600 font-medium rounded-lg hover:bg-indigo-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full px-4 py-2 text-center bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-gray-600 font-medium flex items-center">
                    <FiUser className="mr-2" />
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-red-600 font-medium rounded-lg hover:bg-red-50 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
const NavLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
  >
    {icon}
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
  >
    {icon}
    {children}
  </Link>
);
