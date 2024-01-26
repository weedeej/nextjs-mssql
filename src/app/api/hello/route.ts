import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("param");
  return NextResponse.json({data: `Hello ${param} <-- try adding a param. /api/hello?param=world `});
}