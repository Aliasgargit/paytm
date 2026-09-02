"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

type AuthMethod = "pin" | "otp";

export function LoginScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>("pin");
  const [phone, setPhone] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    phone.replace(/\D/g, "").length >= 10 && secret.length >= 4 && !loading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        phone: phone.replace(/\s/g, ""),
        password: secret,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!result?.ok) {
        setError("Could not log in. Check your number and PIN.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Could not log in. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-white text-slate-900 md:grid-cols-2">
      <section className="relative hidden flex-col justify-between bg-gradient-to-br from-[#002E6E] to-[#00BAF2] px-10 py-10 text-white md:flex lg:px-14">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00BAF2] text-lg font-semibold text-white">
            ₹
          </span>
          <span className="text-2xl font-semibold tracking-tight">paytm</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
            Your money, always a tap away.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/85 lg:text-lg">
            Instant transfers, smart reminders and a spending timeline that
            actually makes sense.
          </p>
        </div>

        <p className="text-sm text-white/80">
          Protected by 2-factor UPI authentication and 24x7 fraud monitoring.
        </p>
      </section>

      <section className="flex flex-col bg-white px-6 py-8 sm:px-10">
        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00BAF2] text-base font-semibold text-white">
              ₹
            </span>
            <span className="text-xl font-semibold text-[#002E6E]">paytm</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[#002E6E]">
            Log in to Paytm
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Use any number and a 4-digit PIN for this demo.
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMethod("pin")}
              className={`rounded-full py-2 text-sm font-medium transition ${
                method === "pin"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              UPI PIN
            </button>
            <button
              type="button"
              onClick={() => setMethod("otp")}
              className={`rounded-full py-2 text-sm font-medium transition ${
                method === "otp"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              OTP
            </button>
          </div>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                Mobile number
              </span>
              <span className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-[#00BAF2] focus-within:ring-1 focus-within:ring-[#00BAF2]">
                <PhoneIcon />
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                {method === "pin" ? "UPI PIN" : "OTP"}
              </span>
              <span className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-[#00BAF2] focus-within:ring-1 focus-within:ring-[#00BAF2]">
                <LockIcon />
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="current-password"
                  placeholder="••••"
                  value={secret}
                  onChange={(event) => setSecret(event.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-1 rounded-xl bg-gradient-to-r from-[#002E6E] to-[#00BAF2] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Log in securely"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
            By continuing you agree to the Paytm terms of service and privacy
            policy.
          </p>
        </div>
      </section>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0 text-slate-400"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0 text-slate-400"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="11" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
