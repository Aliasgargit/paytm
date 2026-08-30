import { getServerSession } from "next-auth";
import { Card } from "@/components/Card";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../../lib/getBalance";

export const dynamic = "force-dynamic";

function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const balance = Number.isFinite(userId)
    ? await getBalance(userId)
    : { amount: 0, locked: 0 };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Home</h1>
      <div className="max-w-md">
        <Card title="Balance">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Unlocked balance</span>
              <span className="font-medium text-slate-900">
                {formatRupees(balance.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Locked balance</span>
              <span className="font-medium text-slate-900">
                {formatRupees(balance.locked)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3">
              <span className="text-slate-600">Total balance</span>
              <span className="font-semibold text-slate-900">
                {formatRupees(balance.amount + balance.locked)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
