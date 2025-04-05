import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/";
  const redirectUrl = `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
