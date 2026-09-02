import db from "@repo/db/client";
import { getOnRampTransactions } from "./getOnRampTransactions";

export type ActivityItem = {
  id: string;
  txnId: string;
  title: string;
  subtitle: string;
  amount: number;
  direction: "in" | "out";
  status: string;
  method: "UPI" | "Bank" | "Wallet";
  phone?: string;
  timestamp: Date;
};

export type RecentContact = {
  name: string;
  phoneNumber: string;
  initials: string;
};

export type WeekSpend = {
  label: string;
  amount: number;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function displayName(name: string | null, phoneNumber: string) {
  return name?.trim() || phoneNumber;
}

function initialsFrom(name: string | null, phoneNumber: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const first = parts[0];
  const second = parts[1];
  if (first && second) {
    return `${first[0]}${second[0]}`.toUpperCase();
  }
  if (first) {
    return first.slice(0, 2).toUpperCase();
  }
  return phoneNumber.slice(-2);
}

export async function getAllActivity(userId: number): Promise<ActivityItem[]> {
  const [onRamps, sent, received] = await Promise.all([
    getOnRampTransactions(userId),
    db.p2pTransfer.findMany({
      where: { fromUserId: userId },
      select: {
        id: true,
        amount: true,
        timestamp: true,
        toUser: { select: { name: true, phoneNumber: true } },
      },
      orderBy: { timestamp: "desc" },
    }),
    db.p2pTransfer.findMany({
      where: { toUserId: userId },
      select: {
        id: true,
        amount: true,
        timestamp: true,
        fromUser: { select: { name: true, phoneNumber: true } },
      },
      orderBy: { timestamp: "desc" },
    }),
  ]);

  const items: ActivityItem[] = [
    ...onRamps.map((txn) => ({
      id: `onramp-${txn.id}`,
      txnId: `T${String(txn.id).padStart(4, "0")}`,
      title: `Received from ${txn.provider}`,
      subtitle: `Add money • ${txn.startTime.toLocaleString("en-IN")}`,
      amount: txn.amount,
      direction: "in" as const,
      status: txn.status === "Processing" ? "Pending" : txn.status,
      method: "Bank" as const,
      timestamp: txn.startTime,
    })),
    ...sent.map((txn) => ({
      id: `sent-${txn.id}`,
      txnId: `P${String(txn.id).padStart(4, "0")}`,
      title: displayName(txn.toUser.name, txn.toUser.phoneNumber),
      subtitle: `P2P sent • ${txn.timestamp.toLocaleString("en-IN")}`,
      amount: txn.amount,
      direction: "out" as const,
      status: "Success",
      method: "UPI" as const,
      phone: txn.toUser.phoneNumber,
      timestamp: txn.timestamp,
    })),
    ...received.map((txn) => ({
      id: `recv-${txn.id}`,
      txnId: `P${String(txn.id).padStart(4, "0")}`,
      title: displayName(txn.fromUser.name, txn.fromUser.phoneNumber),
      subtitle: `P2P received • ${txn.timestamp.toLocaleString("en-IN")}`,
      amount: txn.amount,
      direction: "in" as const,
      status: "Success",
      method: "UPI" as const,
      phone: txn.fromUser.phoneNumber,
      timestamp: txn.timestamp,
    })),
  ];

  return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function getRecentActivity(
  userId: number,
): Promise<ActivityItem[]> {
  const items = await getAllActivity(userId);
  return items.slice(0, 6);
}

export async function getRecentContacts(
  userId: number,
): Promise<RecentContact[]> {
  const sent = await db.p2pTransfer.findMany({
    where: { fromUserId: userId },
    select: {
      timestamp: true,
      toUser: { select: { name: true, phoneNumber: true } },
    },
    orderBy: { timestamp: "desc" },
    take: 20,
  });

  const seen = new Set<string>();
  const contacts: RecentContact[] = [];

  for (const txn of sent) {
    if (seen.has(txn.toUser.phoneNumber)) continue;
    seen.add(txn.toUser.phoneNumber);
    contacts.push({
      name: displayName(txn.toUser.name, txn.toUser.phoneNumber),
      phoneNumber: txn.toUser.phoneNumber,
      initials: initialsFrom(txn.toUser.name, txn.toUser.phoneNumber),
    });
    if (contacts.length === 4) break;
  }

  return contacts;
}

export async function getMonthlySpend(userId: number): Promise<{
  thisMonth: number;
  lastMonth: number;
  weeks: WeekSpend[];
}> {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = addMonths(thisMonthStart, -1);
  const nextMonthStart = addMonths(thisMonthStart, 1);

  const sent = await db.p2pTransfer.findMany({
    where: {
      fromUserId: userId,
      timestamp: { gte: lastMonthStart, lt: nextMonthStart },
    },
    select: { amount: true, timestamp: true },
  });

  let thisMonth = 0;
  let lastMonth = 0;
  const weekTotals = [0, 0, 0, 0, 0];

  for (const txn of sent) {
    if (txn.timestamp >= thisMonthStart) {
      thisMonth += txn.amount;
      const weekIndex = Math.min(
        4,
        Math.floor((txn.timestamp.getDate() - 1) / 7),
      );
      weekTotals[weekIndex] += txn.amount;
    } else {
      lastMonth += txn.amount;
    }
  }

  return {
    thisMonth,
    lastMonth,
    weeks: weekTotals.map((amount, index) => ({
      label: `W${index + 1}`,
      amount,
    })),
  };
}
