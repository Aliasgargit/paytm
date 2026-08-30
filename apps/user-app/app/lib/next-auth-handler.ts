import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "./auth";

const nextAuthHandler = NextAuth(authOptions);

export function handleAuth(req: NextRequest, nextauth: string[]) {
  return nextAuthHandler(req, { params: { nextauth } });
}
