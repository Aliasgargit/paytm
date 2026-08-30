"use client";

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export const AppbarClient = ({
  showAuthAction = true,
}: {
  showAuthAction?: boolean;
}) => {
  const session = useSession();

  return (
    <Appbar
      user={session.data?.user ?? undefined}
      onSignin={() => signIn(undefined, { callbackUrl: "/dashboard" })}
      onSignout={() => signOut({ callbackUrl: "/" })}
      showAuthAction={showAuthAction}
    />
  );
};
