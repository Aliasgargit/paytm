import "dotenv/config";
import express from "express";
import db from "@repo/db/client";

const app = express();
const PORT = Number(process.env.PORT) || 3003;

app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
  const token = req.body?.token;

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  try {
    await db.$transaction(async (tx: typeof db) => {
      const existing = await tx.onRampTransaction.findUnique({
        where: { token },
      });

      if (!existing || existing.status !== "Processing") {
        return;
      }

      await tx.onRampTransaction.update({
        where: { token },
        data: { status: "Success" },
      });

      await tx.balance.upsert({
        where: { userId: existing.userId },
        update: {
          amount: { increment: existing.amount },
        },
        create: {
          userId: existing.userId,
          amount: existing.amount,
          locked: 0,
        },
      });
    });

    return res.json({ message: "Captured" });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("WEBHOOK ERROR", detail);
    return res.status(411).json({
      error: "Error while processing webhook",
      detail,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Bank webhook listening on http://localhost:${PORT}`);
});
