
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        const configuredEmail = process.env.BISHOPRIC_EMAIL;
        const passwordHash = process.env.BISHOPRIC_PASSWORD_HASH;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !configuredEmail ||
          !passwordHash
        ) {
          return null;
        }

        if (
          email.trim().toLowerCase() !==
          configuredEmail.trim().toLowerCase()
        ) {
          return null;
        }

        const passwordMatches = await compare(password, passwordHash);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: "bishopric-admin",
          name: "Bishopric Administrator",
          email: configuredEmail,
        };
      },
    }),
  ],
});
