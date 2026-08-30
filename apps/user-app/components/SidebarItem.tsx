"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: ReactNode;
}

export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <Link
      href={href}
      aria-current={selected ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        selected
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <span className={selected ? "text-indigo-600" : "text-slate-400"}>
        {icon}
      </span>
      {title}
    </Link>
  );
};
