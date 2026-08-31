import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppbarClient } from "@/components/AppbarClient";
import { LoginButton } from "@/components/LoginButton";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppbarClient showAuthAction={false} />
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold text-slate-900">
          Payments made Simple
        </h1>
        <p className="mt-4 text-slate-600">
          Add money from your bank, transfer to friends, and track every
          transaction in one place.
        </p>
        <div className="mt-10">
          <LoginButton />
        </div>
      </main>
    </div>
  );
}
