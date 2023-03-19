import NextAuth from "next-auth";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const GitHub = {
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
};

const Google = {
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
};

export default NextAuth({
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
  session: { strategy: "jwt" }
});
