import { NextRequest, NextResponse } from "next/server";
import { searchDictionary } from "@/lib/dictionary";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = searchDictionary(q, 30);
  return NextResponse.json({ results });
}
