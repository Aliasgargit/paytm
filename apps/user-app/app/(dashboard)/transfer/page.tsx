import { AddMoneyCard } from "@/components/AddMoneyCard";

export default function TransferPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Transfer</h1>
      <div className="max-w-md">
        <AddMoneyCard />
      </div>
    </div>
  );
}
