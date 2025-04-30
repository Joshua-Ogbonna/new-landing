// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token); // Optional: Log token for debugging
    // You could add additional logic here based on the token if needed
    // e.g., role-based authorization
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // If there is a token, the user is authorized
    },
    pages: {
      signIn: '/signIn', // Redirect to custom sign-in page
      error: '/signIn', // Redirect errors (e.g., invalid credentials) back to sign-in
    },
  }
);

// See "Matching Paths" below to learn more
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
    '/create-artist/:path*', // Protect create-artist route
    '/artistSignIn/:path*', // Protect artist profile setup route
    // Add any other specific authenticated API routes if they exist outside /api/auth
    // Example: '/api/my-protected-endpoint/:path*'
  ],
}; 