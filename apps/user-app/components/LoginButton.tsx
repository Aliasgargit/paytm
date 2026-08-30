"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
      className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
    >
      Login
    </button>
  );
};
