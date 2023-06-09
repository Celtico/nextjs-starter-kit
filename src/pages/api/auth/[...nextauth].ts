import NextAuth from "next-auth";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

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
        if (email) {
          const user = await prisma.user.findUnique({
            where: {
              // @ts-ignore
              email,
            },
          });
          // if user doesn't exist or password doesn't match
          if (!user || !(await compare(password, user.encryptedPassword))) {
            throw new Error("Invalid username or password");
          }
          return user;
        }
      },
    }),
    // @ts-ignore
    GitHubProvider(GitHub),
    // @ts-ignore
    GoogleProvider(Google),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
     // console.log({ url, baseUrl })
      return baseUrl
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  debug: true,
  session: {
    strategy: "jwt",
  },
};
// @ts-ignore
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;
