import { SendMoneyCard } from "@/components/SendMoneyCard";

export default function P2PPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">P2P Transfer</h1>
      <div className="max-w-md">
        <SendMoneyCard />
      </div>
    </div>
  );
}
