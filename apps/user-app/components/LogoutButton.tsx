"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v2" />
        <path d="M10 12h10" />
        <path d="m17 9 3 3-3 3" />
      </svg>
      Logout
    </button>
  );
};
