import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Step 1: Obtain CSRF Cookie (assuming this is a requirement for the API)
        const csrfRes = await fetch("http://128.199.31.7/sanctum/csrf-cookie", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!csrfRes.ok) {
          console.error("Failed to obtain CSRF token");
          throw new Error("Failed to authenticate");
        }

        // Step 2: Login request
        const loginRes = await fetch("http://128.199.31.7/api/admin/login", {
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

        const data = await loginRes.json();

        if (loginRes.ok && data?.data) {
          console.log(data);

          // Here, return a structured user object with necessary details
          return {
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            office: data.data.office,
            warehouse: data.data.warehouse,
            token: data.token, // Include token if you want to attach it in JWT
          };
        } else {
          console.error("Login failed:", data.message || "Invalid credentials");
          throw new Error(data.message || "Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Attach user object to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Attach user object to the session
      console.log("session:" + JSON.stringify(session));

      return session;
    },
  },
};

// Export handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
