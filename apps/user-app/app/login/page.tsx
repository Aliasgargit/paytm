import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginScreen } from "@/components/LoginScreen";
import { authOptions } from "../lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return <LoginScreen />;
}
