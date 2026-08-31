import db from "@repo/db/client";

type OnRampStatus = "Success" | "Failure" | "Processing";

export type OnRampTransaction = {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
};

export async function getOnRampTransactions(
  userId: number,
): Promise<OnRampTransaction[]> {
  return db.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });
}
