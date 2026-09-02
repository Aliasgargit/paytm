"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, PlusIcon, QrIcon, TransferIcon } from "./icons";

function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function WalletBalanceCard({
  amount,
  upiId,
}: {
  amount: number;
  upiId: string;
}) {
  const [hidden, setHidden] = useState(false);

  return (
    <section className="flex flex-col justify-between rounded-2xl bg-gradient-to-r from-[#00BAF2] to-[#002E6E] p-6 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-white/80">
            WALLET BALANCE
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-tight">
            {hidden ? "₹••••••" : formatRupees(amount)}
          </p>
          <p className="mt-2 text-sm text-white/80">UPI ID: {upiId}</p>
        </div>
        <button
          type="button"
          onClick={() => setHidden((value) => !value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/25"
        >
          {hidden ? <EyeIcon /> : <EyeOffIcon />}
          {hidden ? "Show" : "Hide"}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/transfer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#002E6E]"
        >
          <PlusIcon />
          Add money
        </Link>
        <Link
          href="/P2P"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#002E6E]"
        >
          <TransferIcon />
          Send money
        </Link>
        <Link
          href="/P2P"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#002E6E]"
        >
          <QrIcon />
          Scan & pay
        </Link>
      </div>
    </section>
  );
}
