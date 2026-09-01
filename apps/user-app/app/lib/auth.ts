import db from "@repo/db/client";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter your phone number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: { phoneNumber: credentials.phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );
          if (!passwordValidation) {
            return null;
          }
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
          };
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const user = await db.user.create({
            data: {
              phoneNumber: credentials.phone,
              password: hashedPassword,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev-nextauth-secret",
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
