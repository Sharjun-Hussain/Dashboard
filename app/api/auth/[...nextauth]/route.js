import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        username: { label: "email", type: "email", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await fetch("http://128.199.31.7/sanctum/csrf-cookie", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const res = await fetch("http://128.199.31.7/api/admin/login", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          credentials: "include",
        })

        const data = await res.json();
          
        // Check if the response is okay and return user
        if (res.ok && data) {
          // Log and return the user object
          console.log("User data:", data);
          return data; // Return the user object received from API
        } else {
          throw new Error(data.message || "Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Redirect to your login page
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Attach user object to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Attach user object to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
