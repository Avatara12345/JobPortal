import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin-dashboard/:path*", "/user-dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    console.log("⛔ No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());
    const userRole = payload.role;

    // 🛑 Block non-admins from /admin-dashboard
    if (pathname.startsWith("/admin-dashboard") && userRole !== "admin") {
      console.log("⛔ Non-admin trying to access admin area");
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // 🛑 Block users (not admins) from /user-dashboard
    // ✅ Admins can access both admin and user dashboard
    if (pathname.startsWith("/user-dashboard") && userRole !== "user" && userRole !== "admin") {
      console.log("⛔ Invalid role for user-dashboard");
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch {
    console.log("⛔ Invalid token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
