import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const url = req.nextUrl;

        const artistProfileComplete = token?.artistProfileComplete;
        const isOnArtistSignInPage = url.pathname.startsWith("/artistSignIn");

        // If user is authenticated but has NOT completed artist profile and is NOT on artistSignIn page
        if (token && !artistProfileComplete && !isOnArtistSignInPage) {
            const redirectUrl = new URL("/artistSignIn", req.url);
            return NextResponse.redirect(redirectUrl);
        }

        // Otherwise, allow request
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Only require that user is logged in
        },
        pages: {
            signIn: '/signIn',
            error: '/signIn',
        },
    }
);

export const config = {
    matcher: [
        '/Dashboard/:path*',
        '/earnings/:path*',
        '/courses/:path*',
        '/courseDetails/:path*',
        '/songs/:path*',
        '/newRelease/:path*',
        '/albums/:path*',
        '/music/:path*',
        '/create-artist/:path*',
        '/artistSignIn/:path*', // Still protect it from unauthenticated users
    ],
};
