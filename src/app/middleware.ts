import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();
  if (cookies.get("refreshToken")) {
    return res;
  }

  const winxClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WINX_ID! }),
  });

  const tokens = await winxClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });

  return res
};
