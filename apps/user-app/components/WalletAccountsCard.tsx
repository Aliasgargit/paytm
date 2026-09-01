import { formatRupees } from "@/app/lib/formatRupees";
import { BankIcon, CardIcon, WalletIcon } from "./icons";

const LINKED_ACCOUNTS = [
  { name: "HDFC Bank .... 4821", detail: "Savings account", icon: "bank" },
  { name: "State Bank of India .... 7714", detail: "Savings account", icon: "bank" },
  { name: "ICICI Bank .... 3390", detail: "Current account", icon: "bank" },
  { name: "Visa Credit .... 9032", detail: "Credit card", icon: "card" },
] as const;

export function WalletAccountsCard({ walletAmount }: { walletAmount: number }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#002E6E]">Wallet balance</h2>
      <ul className="mt-5 flex flex-col gap-3">
        <li className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7FC] text-[#00BAF2]">
              <WalletIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {formatRupees(walletAmount)}
              </p>
              <p className="text-xs text-slate-500">Paytm Wallet</p>
            </div>
          </div>
        </li>
        {LINKED_ACCOUNTS.map((account) => (
          <li
            key={account.name}
            className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              {account.icon === "card" ? <CardIcon /> : <BankIcon />}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">{account.name}</p>
              <p className="text-xs text-slate-500">{account.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
