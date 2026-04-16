import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    tag?: string;
  };

  if (!body.email || !body.tag) {
    return NextResponse.json({ ok: false, error: "email and tag are required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Subscription placeholder accepted" });
}
