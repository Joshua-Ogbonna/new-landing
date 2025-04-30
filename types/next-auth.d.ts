import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extend the built-in session/user types

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    accessToken?: string; // Add the backend access token
    user?: {
      id?: string; // User ID
      artistId?: string; // Add Artist ID
      artistName?: string; // Add Artist Name
      artistImage?: string; // Add Artist Image
      artistProfileComplete?: boolean; // Flag for artist profile status
    } & DefaultSession["user"]; // Merge with default user fields like name, email, image
  }

  /**
   * The shape of the user object returned by the authorize callback.
   */
  interface User extends DefaultUser {
    id: string; // User ID (ensure it's always present)
    accessToken?: string; 
    artistId?: string; // Artist ID (from artist profile)
    artistName?: string; // Artist Name (from artist profile)
    artistImage?: string; // Artist Image (from artist profile)
    // artistProfileComplete is determined based on artistId presence
  }
}

// Extend the built-in JWT type

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    accessToken?: string; 
    id?: string; // User ID
    artistId?: string; // Artist ID
    artistName?: string; // Artist Name
    artistProfileComplete?: boolean; 
  }
} 