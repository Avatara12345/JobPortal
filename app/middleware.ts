// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;
//   const { pathname } = request.nextUrl;

//   // Protected admin routes
//   const adminRoutes = ['/admin-dashboard', '/jobs/create-job'];
//   if (adminRoutes.some(route => pathname.startsWith(route))) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//     // Additional check for admin role would go here
//   }

//   // Protected user routes
//   const userRoutes = ['/user-dashboard', '/jobs/apply', '/jobs/my-applications'];
//   if (userRoutes.some(route => pathname.startsWith(route))) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }