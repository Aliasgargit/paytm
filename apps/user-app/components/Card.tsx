import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <h2 className="border-b border-slate-100 px-6 py-4 text-lg font-semibold text-slate-900">
        {title}
      </h2>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
};
