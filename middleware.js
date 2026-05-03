import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";
import {NextResponse} from "next/server";

import {PUBLIC_ROUTES, LOGIN, ROOT} from "@/lib/routes";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const {nextUrl} = req;
    const {pathname} = nextUrl;
    const isAuthenticated = !!req.auth;

    const isPublicRoute =
        pathname === ROOT ||
        PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    const isAuthRoute = pathname === LOGIN || pathname.startsWith("/register");

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL(ROOT, nextUrl));
    }

    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!api/auth|_next|favicon.ico|.*\\..*).*)", // Exclude Next.js internal routes and API routes
        "/", // Include the root route
    ],
};
