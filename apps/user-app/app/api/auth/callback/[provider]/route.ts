import { NextRequest } from "next/server";
import { handleAuth } from "../../../../lib/next-auth-handler";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  return handleAuth(req, ["callback", provider]);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  return handleAuth(req, ["callback", provider]);
}
