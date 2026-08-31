import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppbarClient } from "@/components/AppbarClient";
import { LogoutButton } from "@/components/LogoutButton";
import { SidebarItem } from "@/components/SidebarItem";
import { P2PTransferIcon } from "@/components/icons";
import {
  HomeIcon,
  TransactionsIcon,
  TransferIcon,
} from "@/components/icons";
import { authOptions } from "../lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppbarClient showAuthAction={false} />
      <div className="flex">
        <aside className="flex min-h-[calc(100vh-57px)] w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
          <nav className="flex flex-1 flex-col gap-1">
            <SidebarItem href="/dashboard" title="Home" icon={<HomeIcon />} />
            <SidebarItem
              href="/transfer"
              title="Transfer"
              icon={<TransferIcon />}
            />
            <SidebarItem
              href="/transactions"
              title="Transactions"
              icon={<TransactionsIcon />}
            />
            <SidebarItem 
              href="/P2P"
              title="P2P Transfer"
              icon={<P2PTransferIcon />}
            />
          </nav>
          <div className="border-t border-slate-100 pt-2">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
