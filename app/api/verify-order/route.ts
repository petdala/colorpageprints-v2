import { NextResponse } from "next/server";
import { getWaveByNumber } from "@/lib/data";
import { verifyOrderRequest } from "@/lib/verify-order";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = verifyOrderRequest(payload, getWaveByNumber);

    return NextResponse.json(
      result.body,
      { status: result.status, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Verify order error", error);

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
