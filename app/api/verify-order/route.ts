import { NextResponse } from "next/server";
import { getWaveByNumber } from "@/lib/data";

type VerifyOrderPayload = {
  email?: string;
  order_number?: string;
  wave?: number;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VerifyOrderPayload;
    const email = payload.email?.trim() ?? "";
    const orderNumber = payload.order_number?.trim() ?? "";
    const waveNumber = payload.wave;

    if (!EMAIL_REGEX.test(email) || !orderNumber || typeof waveNumber !== "number") {
      return NextResponse.json(
        { success: false, message: "email, order_number, and wave are required" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const wave = getWaveByNumber(waveNumber);

    if (!wave) {
      return NextResponse.json(
        { success: false, message: "Wave not found" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Add real verification logic — manual review queue or Amazon order API
    console.log("Verify order submission", { email, orderNumber, waveNumber });

    return NextResponse.json(
      { success: true, download_url: wave.exclusive_download_url },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Verify order error", error);

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
