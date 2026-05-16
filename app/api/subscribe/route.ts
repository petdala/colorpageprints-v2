import { NextResponse } from "next/server";
import type { InterestType } from "@/lib/types";

type SubscribePayload = {
  email?: string;
  tag?: string;
  interestSlug?: string;
  interestType?: InterestType;
  themePreference?: string;
  requestNotes?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubscribePayload;
    const email = payload.email?.trim() ?? "";
    const tag = payload.tag?.trim() ?? "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Tag is required" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Connect this endpoint to Kit or another ESP / CRM so launch-list, sampler,
    // preorder-reminder, and theme-vote submissions are stored durably and delivered.
    console.info("ColorPagePrints signup captured", {
      email,
      tag,
      interestSlug: payload.interestSlug?.trim() || null,
      interestType: payload.interestType ?? "global_launch_list",
      themePreference: payload.themePreference?.trim() || null,
      requestNotes: payload.requestNotes?.trim() || null
    });

    return NextResponse.json(
      { success: true, message: "Captured" },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscribe error", error);

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
