"use client";

import { useMemo, useState } from "react";
import { formatRupees } from "@/app/lib/formatRupees";
import { ArrowInIcon, ArrowOutIcon, DownloadIcon, SearchIcon } from "./icons";

export type TransactionRow = {
  id: string;
  txnId: string;
  title: string;
  subtitle: string;
  method: string;
  status: string;
  amount: number;
  direction: "in" | "out";
};

type Filter = "all" | "in" | "out";

export function TransactionsPanel({ items }: { items: TransactionRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.direction !== filter) return false;
      if (!term) return true;
      return (
        item.title.toLowerCase().includes(term) ||
        item.txnId.toLowerCase().includes(term) ||
        item.method.toLowerCase().includes(term)
      );
    });
  }, [filter, items, query]);

  const moneyIn = items
    .filter((item) => item.direction === "in")
    .reduce((sum, item) => sum + item.amount, 0);
  const moneyOut = items
    .filter((item) => item.direction === "out")
    .reduce((sum, item) => sum + item.amount, 0);

  const downloadStatement = () => {
    const header = "Txn ID,Details,Method,Status,Direction,Amount";
    const rows = filtered.map((item) =>
      [
        item.txnId,
        `"${item.title} ${item.subtitle}"`,
        item.method,
        item.status,
        item.direction,
        (item.amount / 100).toFixed(2),
      ].join(","),
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "paytm-statement.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#002E6E]">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            All payments across wallet, UPI, cards and bank.
          </p>
        </div>
        <button
          type="button"
          onClick={downloadStatement}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <DownloadIcon />
          Download statement
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Money in" value={formatRupees(moneyIn)} tone="in" />
        <StatCard label="Money out" value={formatRupees(moneyOut)} tone="out" />
        <StatCard label="Transactions" value={String(items.length)} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 px-3 py-2">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or txn ID"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="flex gap-2">
            {(
              [
                ["all", "All"],
                ["in", "Received"],
                ["out", "Sent"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  filter === value
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-[minmax(0,2fr)_100px_80px_90px_120px] gap-3 px-2 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400 md:grid">
          <span>Details</span>
          <span>Txn ID</span>
          <span>Method</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
        </div>

        {filtered.length === 0 ? (
          <p className="px-2 py-8 text-sm text-slate-500">
            No transactions match this filter.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="grid gap-3 py-3.5 md:grid-cols-[minmax(0,2fr)_100px_80px_90px_120px] md:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      item.direction === "in"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#E8F7FC] text-[#00BAF2]"
                    }`}
                  >
                    {item.direction === "in" ? (
                      <ArrowInIcon />
                    ) : (
                      <ArrowOutIcon />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-slate-500">{item.txnId}</span>
                <span className="text-sm text-slate-500">{item.method}</span>
                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                  {item.status}
                </span>
                <span
                  className={`text-sm font-semibold md:text-right ${
                    item.direction === "in"
                      ? "text-emerald-600"
                      : "text-[#002E6E]"
                  }`}
                >
                  {item.direction === "in" ? "+" : "-"}
                  {formatRupees(item.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "in" | "out";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          tone === "in"
            ? "text-emerald-600"
            : tone === "out"
              ? "text-[#002E6E]"
              : "text-[#002E6E]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
