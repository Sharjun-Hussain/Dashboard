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
        });

        // Check if the response is okay and return user
        if (res.ok) {
          console.log(res.json);

          return res.json; // Return user object
        } else {
          throw new Error(user.message || "Invalid credentials");
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
