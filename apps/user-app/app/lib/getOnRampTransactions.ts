import db from "@repo/db/client";

export async function getOnRampTransactions(userId: number) {
  return db.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });
}
