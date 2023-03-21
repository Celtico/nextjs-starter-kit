import NextAuth from "next-auth";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";

const GitHub = {
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
};
// https://console.cloud.google.com/apis/credentials?hl=es-419&project=reference-fact-273509
const Google = {
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
    // @ts-ignore
    GitHubProvider(GitHub),
    // @ts-ignore
    GoogleProvider(Google),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  debug: true,
  session: { strategy: "jwt" }
}

// @ts-ignore
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

/**
 * callbacks: {
 *     async session({session, token, user}) {
 *       session.user.role = user.role; // Add role value to user object so it is passed along with session
 *       return session;
 *     },
 *     async jwt({token}) {
 *       token.userRole = "admin"
 *       return token
 *     },
 *     async signIn({ account, profile }) {
 *       if (account.provider === "google") {
 *         return profile.email_verified && profile.email.endsWith("@gmail.com")
 *       }
 *       return true // Do different verification for other providers that don't have `email_verified`
 *     },
 *   },
 */
