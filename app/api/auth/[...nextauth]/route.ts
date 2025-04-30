import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

// Helper function removed - no longer needed
// const checkArtistProfileStatus = async (userId: string, token: string): Promise<boolean> => { ... };

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        let userId: string | null = null;
        let userEmail: string | null = null;
        let userName: string | null = null; // Store username from login
        let backendToken: string | null = null;
        let artistId: string | null = null;
        let artistName: string | null = null;   
        let artistImage: string | null = null;
        // --- Step 1: Login User ---
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const responseJson = await res.json(); 
          if (!res.ok) {
            const errorMessage = responseJson?.message || `Login failed (Status: ${res.status})`;
            throw new Error(errorMessage);
          }

          const user = responseJson?.data?.user;
          const token = responseJson?.data?.token;

          if (!user || !token) {
            throw new Error("Login successful, but failed to retrieve user data.");
          }

          // Store successful login details
          userId = user.id;
          userEmail = user.email;
          userName = user.username; // Use username from login response
          backendToken = token;

        } catch (error: any) {
          console.error("[Authorize Error - Login Step]:", error);
          // Re-throw specific errors or a generic one
          if (error instanceof Error && (error.message.startsWith("Login failed") || error.message.includes("user data"))) {
             throw error; 
          } else if (error.message === "Failed to fetch") {
             throw new Error("Cannot connect to authentication server.");
          }
          throw new Error(error.message || "An unknown error occurred during login.");
        }

        // --- Step 2: Fetch Artist Profile (if login succeeded) ---
        if (userId && backendToken) {
          try {
            console.log(`[Authorize] Fetching artist profile for user ID: ${userId}`);
            const profileRes = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/artists/profile/${userId}`,
              {
                headers: {
                  'Authorization': `Bearer ${backendToken}`,
                  'Content-Type': 'application/json',
                },
                validateStatus: (status) => status >= 200 && status < 500, // Handle 404/400 gracefully
              }
            );

            if (profileRes.status === 200 && profileRes.data?.data) {
              // Profile exists, extract ID and name
              // Adjust '.data.id' and '.data.name' based on your actual API response structure for the artist profile
              artistId = profileRes.data.data.id; 
              artistName = profileRes.data.data.name;
              artistImage = profileRes.data.data.image;

            } else if (profileRes.status === 400 || profileRes.status === 404) {
              console.log(`[Authorize] No artist profile found for user ${userId} (Status: ${profileRes.status}).`);
              // artistId and artistName remain null
            } else {
              // Log other errors but don't block login
              console.error(`[Authorize] Error fetching artist profile: Status ${profileRes.status}, Data:`, profileRes.data);
            }
          } catch (profileError) {
            console.error("[Authorize Error - Profile Fetch Step]:", profileError);
            // Allow login even if profile fetch fails, artistId/Name will be null
          }
        }

        // --- Step 3: Return Combined User Object ---
        if (userId && userEmail && backendToken) {
            return {
                id: userId, // User ID
                email: userEmail,
                name: userName, // User's login name (username)
                accessToken: backendToken,
                // Convert null to undefined to match the User type definition
                artistId: artistId || undefined, 
                artistName: artistName || undefined, 
                artistImage: artistImage || undefined,
            };
        } else {
             // This should technically not be reached if login succeeded, but acts as a safeguard
             throw new Error("Failed to assemble user data after login.");
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async signIn({ user, account }) {

      // Only apply custom redirect logic for successful credentials logins
      // Check user.artistId obtained from the authorize callback
      if (account?.provider === "credentials" && user) {
        const isProfileComplete = !!user.artistId; // Profile is complete if artistId exists
        if (!isProfileComplete) {
          return true // Redirect to complete profile
        } 
        return true; // Allow default redirect if profile is complete
      } 
      
      return true; // Allow default for other cases
    },

    async jwt({ token, user, account }) {
      // If user object exists (occurs on initial sign in), persist its data to the token
      if (account && user) {
        console.log("[JWT Callback] Initial sign in, adding data to token", { userId: user.id, artistId: user.artistId });
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.artistId = user.artistId;
        token.artistName = user.artistName;
        token.artistImage = user.artistImage;
        token.artistProfileComplete = !!user.artistId; // Set completeness flag
      }
      return token;
    },

    async session({ session, token }) {
      // Transfer data from token to session object to be available client-side
      session.accessToken = token.accessToken as string;
      if (session.user) {
         session.user.id = token.id as string;
         session.user.artistId = token.artistId as string | undefined;
         session.user.artistName = token.artistName as string | undefined;
         session.user.artistProfileComplete = token.artistProfileComplete as boolean;
         session.user.artistImage = token.artistImage as string | undefined;
      } else {
         console.warn("[Session Callback] session.user missing");
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 