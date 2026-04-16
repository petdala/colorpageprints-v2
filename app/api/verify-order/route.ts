import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    email?: string;
    order_number?: string;
    wave?: number;
  };

  if (!payload.email || !payload.order_number) {
    return NextResponse.json({ ok: false, error: "email and order_number are required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, verified: true, wave: payload.wave ?? null });
}
