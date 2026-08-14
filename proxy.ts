import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((request) => {
  const isLoggedIn = Boolean(request.auth);
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/account",
    "/shop/checkout",
  ];

  const requiresAuthentication = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  if (!requiresAuthentication || isLoggedIn) {
    return NextResponse.next();
  }

  const signInUrl = new URL(
    "/sign-in",
    request.nextUrl.origin,
  );

  signInUrl.searchParams.set(
    "callbackUrl",
    `${pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: [
    "/account/:path*",
    "/shop/checkout/:path*",
  ],
};