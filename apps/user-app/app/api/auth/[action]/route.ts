import { NextRequest } from "next/server";
import { handleAuth } from "../../../lib/next-auth-handler";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;
  return handleAuth(req, [action]);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;
  return handleAuth(req, [action]);
}
