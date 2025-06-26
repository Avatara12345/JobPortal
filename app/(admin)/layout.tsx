import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
     
      <div className="min-h-screen bg-gray-100 ">
        <div className="flex">
          <div className="w-64 bg-gray-800 text-white p-4 absolute h-full">
            <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin-dashboard"
                    className="block px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin-dashboard/users"
                    className="block px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="ml-64 flex-1 p-8">{children}</div>
        </div>
      </div>
    </>
  );
}
