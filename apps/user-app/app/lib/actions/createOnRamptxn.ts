"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRamptxn(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      message: "Enter a valid amount",
    };
  }

  await db.onRampTransaction.create({
    data: {
      amount,
      provider,
      userId: Number(userId),
      status: "Processing",
      startTime: new Date(),
      token: Math.random().toString(),
    },
  });

  return {
    success: true,
    message: "On Ramp transaction added",
  };
}
