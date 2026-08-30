"use client";

interface AppbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
  showAuthAction?: boolean;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  showAuthAction = true,
}: AppbarProps) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div className="text-lg font-semibold text-slate-900">PayTM</div>
      {showAuthAction ? (
        <button
          className="rounded bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          onClick={user ? onSignout : onSignin}
        >
          {user ? "Logout" : "Login"}
        </button>
      ) : null}
    </div>
  );
};
