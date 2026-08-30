import { getServerSession } from "next-auth";
import { Card } from "@/components/Card";
import { authOptions } from "../../lib/auth";
import { getOnRampTransactions } from "../../lib/getOnRampTransactions";

export const dynamic = "force-dynamic";

function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const transactions = Number.isFinite(userId)
    ? await getOnRampTransactions(userId)
    : [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Transactions</h1>
      <div className="max-w-2xl">
        <Card title="Recent transactions">
          {transactions.length === 0 ? (
            <p className="text-sm text-slate-500">No transactions yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      Received INR
                    </span>
                    <span className="text-xs text-slate-500">
                      {transaction.startTime.toLocaleString("en-IN")} ·{" "}
                      {transaction.provider}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900">
                      + {formatRupees(transaction.amount)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {transaction.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
