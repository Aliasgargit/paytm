"use client";

import { useState } from "react";
import { sendMoney } from "@/app/lib/actions/p2pTransfer";
import { Card } from "./Card";

export function SendMoneyCard() {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = number.trim().length > 0 && Number(amount) > 0 && !loading;

  const handleSend = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await sendMoney(number.trim(), Number(amount) * 100);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
      setAmount("");
      setNumber("");
    } catch {
      setError("Could not send money. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Send Money">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="p2p-number"
            className="text-sm font-medium text-slate-700"
          >
            Number
          </label>
          <input
            id="p2p-number"
            type="tel"
            inputMode="numeric"
            placeholder="Recipient phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="p2p-amount"
            className="text-sm font-medium text-slate-700"
          >
            Amount
          </label>
          <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <span className="pl-3 text-slate-500">₹</span>
            <input
              id="p2p-amount"
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

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSend}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </Card>
  );
}
