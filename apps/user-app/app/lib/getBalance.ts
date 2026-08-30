import db from "@repo/db/client";

export async function getBalance(userId: number) {
  const balance = await db.balance.findUnique({
    where: { userId },
  });

  return {
    amount: balance?.amount ?? 0,
    locked: balance?.locked ?? 0,
  };
}
