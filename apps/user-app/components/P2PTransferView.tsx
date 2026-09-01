"use client";

import { useState } from "react";
import { sendMoney } from "@/app/lib/actions/p2pTransfer";
import type { RecentContact } from "@/app/lib/getHomeData";
import { PhoneIcon, TransferIcon } from "./icons";

const QUICK_AMOUNTS = [100, 250, 500, 1000];

export function P2PTransferView({
  contacts,
}: {
  contacts: RecentContact[];
}) {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit =
    number.replace(/\D/g, "").length >= 10 && Number(amount) > 0 && !loading;

  const handleSend = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await sendMoney(number.replace(/\s/g, ""), Number(amount) * 100);

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
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#002E6E]">Send money</h2>
        <p className="mt-1 text-sm text-slate-500">Instant UPI transfer, 24x7.</p>

        <div className="mt-6 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">
              Mobile number
            </span>
            <span className="flex items-center rounded-xl border border-slate-200 px-3 focus-within:border-[#00BAF2] focus-within:ring-1 focus-within:ring-[#00BAF2]">
              <PhoneIcon />
              <input
                id="p2p-number"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-slate-400"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Amount</span>
            <span className="flex items-center rounded-xl border border-slate-200 px-3 focus-within:border-[#00BAF2] focus-within:ring-1 focus-within:ring-[#00BAF2]">
              <span className="text-slate-400">₹</span>
              <input
                id="p2p-amount"
                type="number"
                min="1"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full bg-transparent px-2 py-3 text-slate-900 outline-none placeholder:text-slate-400"
              />
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(String(value))}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  Number(amount) === value
                    ? "border-[#00BAF2] bg-[#E8F7FC] text-[#0078AD]"
                    : "border-[#00BAF2]/40 text-[#0078AD] hover:bg-[#E8F7FC]"
                }`}
              >
                ₹{value}
              </button>
            ))}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSend}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002E6E] to-[#00BAF2] py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <TransferIcon />
            {loading ? "Sending..." : "Send money"}
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#002E6E]">Send again</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tap to fill the mobile number.
          </p>
          {contacts.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              People you pay will show up here.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {contacts.map((contact) => (
                <li key={contact.phoneNumber}>
                  <button
                    type="button"
                    onClick={() => setNumber(contact.phoneNumber)}
                    className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left hover:bg-slate-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7FC] text-sm font-semibold text-[#0078AD]">
                      {contact.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-900">
                        {contact.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        +91 {contact.phoneNumber}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#002E6E]">
            Recent people payments
          </h2>
          {contacts.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No P2P payments yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {contacts.slice(0, 3).map((contact) => (
                <li key={`recent-${contact.phoneNumber}`} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {contact.initials}
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {contact.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
