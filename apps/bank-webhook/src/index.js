import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const app = express();
const PORT = Number(process.env.PORT) || 3003;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json());

function log(message) {
  console.log(message);
  fs.appendFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../webhook.log"),
    `${new Date().toISOString()} ${message}\n`,
  );
}

app.post("/hdfcwebhook", async (req, res) => {
  log(`HIT ${JSON.stringify(req.body)}`);
  const token = req.body?.token;

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT status, "userId", amount FROM "onRampTransaction" WHERE token = $1`,
      [token],
    );

    if (existing.rowCount === 0 || existing.rows[0].status !== "Processing") {
      await client.query("COMMIT");
      return res.json({ message: "Captured" });
    }

    const userId = existing.rows[0].userId;
    const amount = existing.rows[0].amount;

    await client.query(
      `UPDATE "onRampTransaction" SET status = 'Success' WHERE token = $1`,
      [token],
    );

    await client.query(
      `INSERT INTO "Balance" ("userId", amount, locked)
       VALUES ($1, $2, 0)
       ON CONFLICT ("userId")
       DO UPDATE SET amount = "Balance".amount + $2`,
      [userId, amount],
    );

    await client.query("COMMIT");
    return res.json({ message: "Captured" });
  } catch (error) {
    await client.query("ROLLBACK");
    log(`ERROR ${error.message}`);
    return res.status(411).json({
      error: "Error while processing webhook",
      detail: error.message,
    });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Bank webhook listening on http://localhost:${PORT}`);
});
