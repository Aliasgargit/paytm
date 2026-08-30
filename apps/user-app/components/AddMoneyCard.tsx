"use client";

import { useState } from "react";
import { createOnRamptxn } from "@/app/lib/actions/createOnRamptxn";
import { Card } from "./Card";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com" },
  { name: "State Bank of India", redirectUrl: "https://www.onlinesbi.sbi" },
];

export const AddMoneyCard = () => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("HDFC Bank");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedBank = SUPPORTED_BANKS.find((bank) => bank.name === bankName);
  const canSubmit = Number(amount) > 0 && selectedBank !== undefined && !loading;

  const handleAddMoney = async () => {
    if (!selectedBank) return;

    setError(null);
    setLoading(true);

    try {
      const result = await createOnRamptxn(
        Number(amount) * 100,
        selectedBank.name,
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      window.location.href = selectedBank.redirectUrl;
    } catch {
      setError("Could not start the transfer. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add Money">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-slate-700"
          >
            Amount
          </label>
          <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <span className="pl-3 text-slate-500">₹</span>
            <input
              id="amount"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg px-2 py-2.5 text-slate-900 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="bank" className="text-sm font-medium text-slate-700">
            Bank
          </label>
          <select
            id="bank"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {SUPPORTED_BANKS.map((bank) => (
              <option key={bank.name} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleAddMoney}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Redirecting..." : "Add Money"}
        </button>
      </div>
    </Card>
  );
};
