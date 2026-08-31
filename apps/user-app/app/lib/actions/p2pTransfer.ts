"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function sendMoney(
  to: string,
  amount: number,
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  if (!to) {
    return {
      success: false,
      message: "Enter a recipient number",
    };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      message: "Enter a valid amount",
    };
  }

  const toUser = await db.user.findFirst({
    where: { phoneNumber: to },
  });

  if (!toUser) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (toUser.id === Number(from)) {
    return {
      success: false,
      message: "Cannot send money to yourself",
    };
  }

  try {
    await db.$transaction(async (tx) => {
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: {
          amount: { decrement: amount },
        },
      });

      await tx.balance.upsert({
        where: { userId: toUser.id },
        update: {
          amount: { increment: amount },
        },
        create: {
          userId: toUser.id,
          amount,
          locked: 0,
        },
      });

      await tx.p2pTransfer.create({
           data: {
               fromUserId: Number(from),
               toUserId: toUser.id,
               amount,
               timestamp: new Date(),
           },
      });
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error while sending",
    };
  }

  return {
    success: true,
    message: "Money sent",
  };
}
