import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // If user is already authenticated, prevent access to the sign-in and sign-up pages
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to the home page or any other authenticated page
  }

  if (!token && (pathname.startsWith("/profile") || pathname.startsWith("/events"))) {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to sign-in page if not authenticated
  }

  // Continue with normal request processing
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/events/:path*", "/profile/"], // Match the sign-in, sign-up and protected routes
};
