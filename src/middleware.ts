import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/profile");
  const isAuthRoute = pathname === "/signin";

  // If trying to access protected route without token, redirect to signin
  if (isProtectedRoute && !token) {
    const redirectUrl = new URL("/signin", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If already logged in with token and visiting signin page, redirect to dashboard
  if (isAuthRoute && token) {
    const redirectUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/signin"],
};
