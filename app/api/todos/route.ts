import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return 
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ name: "John Doe" });
}