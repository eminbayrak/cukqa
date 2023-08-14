import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import TwitchProvider from "next-auth/providers/twitch";
import EmailProvider from "next-auth/providers/email";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from '../../../server/env';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // TwitterProvider({
    //   clientId: env.TWITTER_CLIENT_ID || '',
    //   clientSecret: env.TWITTER_CLIENT_SECRET || ''
    // }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || ''
    })
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     name: {
    //       label: "Name",
    //       type: "text",
    //       placeholder: "Enter your name",
    //     },
    //   },
    //   async authorize(credentials, _req) {
    //     const user = { id: 1, name: credentials?.name ?? "J Smith" };
    //     return user;
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin'
  }
};

export default NextAuth(authOptions);
